import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:from-cyan-400 hover:to-violet-500 shadow-lg shadow-violet-500/25',
  secondary:
    'bg-surface-700 text-slate-200 border border-slate-600/50 hover:bg-surface-600 hover:border-violet-500/30',
  ghost: 'text-slate-300 hover:bg-surface-700/80 hover:text-white',
  danger: 'bg-rose-600/90 text-white hover:bg-rose-500',
  outline:
    'border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400/60',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  icon: Icon,
  ...props
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : Icon ? (
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
      ) : null}
      {children}
    </button>
  );
}
