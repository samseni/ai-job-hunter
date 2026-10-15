import { forwardRef, useState } from 'react'

const Textarea = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '', 
  showCharCount = false,
  maxLength,
  rows = 4,
  ...props 
}, ref) => {
  const [charCount, setCharCount] = useState(0)
  const id = props.id || props.name

  const handleChange = (e) => {
    const value = e.target.value
    setCharCount(value.length)
    props.onChange?.(e)
  }

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        <textarea
          ref={ref}
          id={id}
          rows={rows}
          className={`input resize-y ${error ? 'input-error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText || showCharCount ? `${id}-helper` : undefined}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
      </div>
      {(helperText || showCharCount) && !error && (
        <p id={`${id}-helper`} className="mt-1.5 text-sm text-slate-500 flex justify-between">
          {helperText}
          {showCharCount && (
            <span className={charCount > (maxLength || 1000) * 0.9 ? 'text-amber-500' : ''}>
              {charCount}{maxLength && ` / ${maxLength}`}
            </span>
          )}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea