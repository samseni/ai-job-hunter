export default function Progress({ value = 0, max = 100, className = '' }) {
  const width = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-slate-100 ${className}`} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
      <div className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500" style={{ width: `${width}%` }} />
    </div>
  )
}
