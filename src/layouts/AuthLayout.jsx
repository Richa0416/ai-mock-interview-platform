import { Link, Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { APP_NAME, ROUTES } from '../utils/constants';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen grid-bg overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link
          to={ROUTES.LOGIN}
          className="mb-8 flex items-center gap-2 transition-opacity hover:opacity-90"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 shadow-lg shadow-violet-500/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-gradient">{APP_NAME}</span>
        </Link>

        <div className="w-full max-w-md animate-slide-up">
          <Outlet />
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          © 2026 {APP_NAME}. Ace your next interview with AI.
        </p>
      </div>
    </div>
  );
}
