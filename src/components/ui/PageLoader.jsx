import LoadingSpinner from './LoadingSpinner';

export default function PageLoader({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 animate-fade-in">
      <LoadingSpinner size="lg" />
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}
