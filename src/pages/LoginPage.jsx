import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { ROUTES } from '../utils/constants';
import { setToken, setUser } from '../utils/storage';
import { mockUser } from '../data/mockInterviews';

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setToken('mock-jwt-token');
    setUser(mockUser);
    setLoading(false);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <Card glow className="animate-fade-in">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-100">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-400">
          Sign in to continue your interview prep
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          icon={Mail}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              className="rounded border-slate-600 bg-surface-800 text-violet-500 focus:ring-violet-500/40"
            />
            Remember me
          </label>
          <button
  onClick={() =>
    alert("Password reset link sent successfully!")
  }
  className="text-cyan-400 hover:text-cyan-300"
>
  Forgot Password?
</button>
        </div>

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.SIGNUP} className="font-medium text-cyan-400 hover:text-cyan-300">
          Create account
        </Link>
      </p>
    </Card>
  );
}
