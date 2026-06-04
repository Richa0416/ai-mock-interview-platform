import { NavLink } from 'react-router-dom';
import {
  History,
  LayoutDashboard,
  Mic,
  Settings,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { APP_NAME, ROUTES } from '../../utils/constants';

const navItems = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
  { to: ROUTES.SETUP, label: 'New Interview', icon: Mic },
  { to: ROUTES.HISTORY, label: 'History', icon: History },
  { to: ROUTES.RESULTS, label: 'Latest Results', icon: Trophy },
];

export default function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-slate-700/50 bg-surface-900/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center gap-2 border-b border-slate-700/50 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gradient">{APP_NAME}</span>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/15 to-violet-600/15 text-cyan-400 border border-cyan-500/20'
                    : 'text-slate-400 hover:bg-surface-700/50 hover:text-slate-200'
                }`
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-700/50 p-4">
          <NavLink
            to={ROUTES.SETUP}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-surface-700/50 hover:text-slate-200"
          >
            <Settings className="h-5 w-5" />
            Settings
          </NavLink>
        </div>
      </aside>
    </>
  );
}
