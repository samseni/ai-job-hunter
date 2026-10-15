import { forwardRef } from 'react'

const Card = forwardRef(({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'p-6',
  bordered = true,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`card ${hover ? 'card-hover' : ''} ${bordered ? '' : 'border-0 shadow-none'} ${padding} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export const CardHeader = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
))

CardHeader.displayName = 'CardHeader'

export const CardTitle = ({ children, className = '', ...props }) => (
  <h3 className={`text-lg font-semibold text-slate-900 ${className}`} {...props}>
    {children}
  </h3>
)

export const CardDescription = ({ children, className = '', ...props }) => (
  <p className={`mt-1 text-sm text-slate-500 ${className}`} {...props}>
    {children}
  </p>
)

export const CardContent = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={className} {...props}>
    {children}
  </div>
))

CardContent.displayName = 'CardContent'

export const CardFooter = forwardRef(({ children, className = '', ...props }, ref) => (
  <div ref={ref} className={`mt-4 pt-4 border-t border-slate-200 ${className}`} {...props}>
    {children}
  </div>
))

CardFooter.displayName = 'CardFooter'

export default Card