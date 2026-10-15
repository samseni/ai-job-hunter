import { forwardRef } from 'react'

const Button = forwardRef(({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false, 
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  type = 'button',
  ...props 
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl hover:shadow-indigo-500/40 focus:ring-indigo-500',
    secondary: 'bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400',
    ghost: 'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400',
    danger: 'bg-red-600 text-white shadow-lg shadow-red-500/30 hover:bg-red-700 hover:shadow-xl focus:ring-red-500',
    outline: 'bg-transparent border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-400',
    success: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:shadow-xl focus:ring-emerald-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
    xl: 'px-8 py-4 text-lg gap-3',
  }

  const width = fullWidth ? 'w-full' : ''

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${width} ${className}`}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : leftIcon ? (
        <span aria-hidden="true">{leftIcon}</span>
      ) : null}
      {children}
      {!loading && rightIcon && <span aria-hidden="true">{rightIcon}</span>}
    </button>
  )
})

Button.displayName = 'Button'

export default Button