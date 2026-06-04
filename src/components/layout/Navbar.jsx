import { Link } from 'react-router-dom';
import { Bell, LogOut, Menu, Search, User } from 'lucide-react';
import { mockUser } from '../../data/mockInterviews';
import { ROUTES } from '../../utils/constants';
import Button from '../ui/Button';

export default function Navbar({ onMenuClick, onLogout }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-700/50 bg-surface-900/80 px-4 backdrop-blur-xl md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 hover:bg-surface-700 lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-600/40 bg-surface-800/60 px-3 py-2 md:w-72">
          <Search className="h-4 w-4 text-slate-500" />
          <input
            type="search"
            placeholder="Search interviews..."
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          type="button"
          className="relative rounded-lg p-2 text-slate-400 hover:bg-surface-700 hover:text-slate-200"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-cyan-400" />
        </button>

        <div className="hidden items-center gap-3 md:flex">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">{mockUser.name}</p>
            <p className="text-xs text-slate-500">{mockUser.plan} Plan</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-violet-600/30 text-cyan-400">
            <User className="h-4 w-4" />
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          icon={LogOut}
          onClick={onLogout}
          className="hidden sm:inline-flex"
        >
          Logout
        </Button>
        <Link
          to={ROUTES.SETUP}
          className="sm:hidden rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 px-3 py-2 text-xs font-medium text-white"
        >
          Start
        </Link>
      </div>
    </header>
  );
}
