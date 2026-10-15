import { forwardRef } from 'react'

const Input = forwardRef(({ 
  label, 
  error, 
  helperText,
  className = '', 
  leftIcon,
  rightIcon,
  ...props 
}, ref) => {
  const id = props.id || props.name

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label">
          {label}
          {props.required && <span className="text-red-500 ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          id={id}
          className={`input ${error ? 'input-error' : ''} ${leftIcon ? 'pl-12' : ''} ${rightIcon ? 'pr-12' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500 flex items-center gap-1" role="alert">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      {helperText && !error && (
        <p id={`${id}-helper`} className="mt-1.5 text-sm text-slate-500">{helperText}</p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input