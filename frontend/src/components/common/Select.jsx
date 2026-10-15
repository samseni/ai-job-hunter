import { forwardRef } from 'react'

const Select = forwardRef(({ 
  label, 
  error, 
  helperText,
  options = [], 
  placeholder = 'Select an option',
  className = '', 
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
        <select
          ref={ref}
          id={id}
          className={`input appearance-none pr-10 ${error ? 'input-error' : ''} ${className}`}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : helperText ? `${id}-helper` : undefined}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" aria-hidden="true">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

Select.displayName = 'Select'

export default Select