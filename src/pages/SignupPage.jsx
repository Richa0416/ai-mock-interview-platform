import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, User } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import { ROUTES } from '../utils/constants';
import { setToken, setUser } from '../utils/storage';
import { mockUser } from '../data/mockInterviews';

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setToken('mock-jwt-token');
    setUser({ ...mockUser, name: form.name || mockUser.name, email: form.email });
    setLoading(false);
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <Card glow className="animate-fade-in">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-100">Create your account</h1>
        <p className="mt-1 text-sm text-slate-400">
          Start practicing with AI-powered mock interviews
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full name"
          type="text"
          placeholder="Alex Chen"
          icon={User}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          placeholder="Min. 8 characters"
          icon={Lock}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={8}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          error={error}
          required
        />

        <Button type="submit" className="w-full" size="lg" loading={loading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-400">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-medium text-cyan-400 hover:text-cyan-300">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
