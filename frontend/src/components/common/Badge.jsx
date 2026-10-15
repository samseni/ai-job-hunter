import { forwardRef } from 'react'

const Badge = forwardRef(({ 
  children, 
  variant = 'slate', 
  size = 'md', 
  className = '', 
  dot = false,
  dotColor,
  ...props 
}, ref) => {
  const variants = {
    primary: 'bg-indigo-100 text-indigo-700',
    success: 'bg-emerald-100 text-emerald-700',
    warning: 'bg-amber-100 text-amber-700',
    danger: 'bg-red-100 text-red-700',
    slate: 'bg-slate-100 text-slate-700',
    info: 'bg-sky-100 text-sky-700',
    violet: 'bg-violet-100 text-violet-700',
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1 text-sm',
  }

  return (
    <span
      ref={ref}
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {dot && (
        <span 
          className="w-1.5 h-1.5 rounded-full" 
          style={{ backgroundColor: dotColor || 'currentColor' }} 
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  )
})

Badge.displayName = 'Badge'

export default Badge