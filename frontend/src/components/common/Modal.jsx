import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { createPortal } from 'react-dom'

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  children, 
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true 
}) {
  const modalRef = useRef(null)
  const previousActiveElement = useRef(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement
      document.body.style.overflow = 'hidden'
      modalRef.current?.focus()
    } else {
      document.body.style.overflow = 'unset'
      previousActiveElement.current?.focus()
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return
      if (e.key === 'Escape' && closeOnEscape) {
        onClose()
      }
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusableElements?.length) {
          const firstElement = focusableElements[0]
          const lastElement = focusableElements[focusableElements.length - 1]
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, closeOnEscape, onClose])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4',
  }

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby={title ? 'modal-title' : undefined}>
      <div className="flex min-h-full items-center justify-center p-4">
        <div 
          className="fixed inset-0 bg-black/50 transition-opacity" 
          aria-hidden="true"
          onClick={closeOnOverlayClick ? onClose : undefined}
        />
        <div
          ref={modalRef}
          tabIndex={-1}
          className={`relative w-full ${sizes[size]} bg-white rounded-2xl shadow-xl transform transition-all`}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b border-slate-200">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-xl font-semibold text-slate-900">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-slate-500">{description}</p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} aria-hidden="true" />
                </button>
              )}
            </div>
          )}
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )

  if (typeof window === 'undefined') return null

  return createPortal(modalContent, document.body)
}