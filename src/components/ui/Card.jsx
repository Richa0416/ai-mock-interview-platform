export default function Card({
  children,
  className = '',
  glow = false,
  hover = false,
  ...props
}) {
  return (
    <div
      className={`glass-panel rounded-2xl p-5 md:p-6 ${glow ? 'glow-border' : ''} ${
        hover
          ? 'transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/10'
          : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action }) {
  return (
    <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
      <div>
        {title && (
          <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        )}
        {subtitle && (
          <p className="mt-0.5 text-sm text-slate-400">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}
