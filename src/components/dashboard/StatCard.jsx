import { TrendingDown, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendLabel,
  delay = 0,
}) {
  const isPositive = trend >= 0;

  return (
    <Card
      hover
      className="animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 text-cyan-400">
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center gap-1.5 text-xs">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-rose-400" />
          )}
          <span className={isPositive ? 'text-emerald-400' : 'text-rose-400'}>
            {isPositive ? '+' : ''}
            {trend}%
          </span>
          <span className="text-slate-500">{trendLabel}</span>
        </div>
      )}
    </Card>
  );
}
