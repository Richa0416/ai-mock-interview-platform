export default function Input({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        )}
        <input
          className={`w-full rounded-xl border bg-surface-800/80 px-4 py-2.5 text-slate-100 placeholder:text-slate-500 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500/50 ${
            Icon ? 'pl-10' : ''
          } ${error ? 'border-rose-500/50' : 'border-slate-600/40 hover:border-slate-500/50'}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-rose-400">{error}</p>}
    </div>
  );
}
