import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Code,
  Layers,
  Mic,
  Terminal,
  Users,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card, { CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import {
  DIFFICULTY_LEVELS,
  DURATION_OPTIONS,
  INTERVIEW_TYPES,
  ROUTES,
} from '../utils/constants';

const typeIcons = {
  technical: Code,
  behavioral: Users,
  'system-design': Layers,
  dsa: Terminal,
};

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    title: '',
    company: '',
    type: 'technical',
    difficulty: 'medium',
    duration: 45,
    focusAreas: '',
  });

  const handleStart = () => {
    sessionStorage.setItem('interviewConfig', JSON.stringify(config));
    navigate(ROUTES.SESSION);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
          Interview Setup
        </h1>
        <p className="mt-1 text-slate-400">
          Configure your AI mock interview session
        </p>
      </div>

      <Card glow>
        <CardHeader
          title="Session Details"
          subtitle="Tailor the interview to your target role"
        />

        <div className="space-y-5">
          <Input
            label="Interview title"
            placeholder="e.g. Amazon SDE – Technical Round"
            value={config.title}
            onChange={(e) => setConfig({ ...config, title: e.target.value })}
          />
          <Input
            label="Target company (optional)"
            placeholder="Google, Meta, startup..."
            icon={Building2}
            value={config.company}
            onChange={(e) => setConfig({ ...config, company: e.target.value })}
          />
          <Input
            label="Focus areas (optional)"
            placeholder="Arrays, system design, leadership..."
            value={config.focusAreas}
            onChange={(e) => setConfig({ ...config, focusAreas: e.target.value })}
          />
        </div>
      </Card>

      <Card>
        <CardHeader title="Interview Type" />
        <div className="grid gap-3 sm:grid-cols-2">
          {INTERVIEW_TYPES.map(({ id, label }) => {
            const Icon = typeIcons[id];
            const selected = config.type === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setConfig({ ...config, type: id })}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  selected
                    ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                    : 'border-slate-600/40 bg-surface-800/40 text-slate-400 hover:border-slate-500/50'
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader title="Difficulty" />
        <div className="flex flex-wrap gap-2">
          {DIFFICULTY_LEVELS.map(({ id, label, color }) => (
            <button
              key={id}
              type="button"
              onClick={() => setConfig({ ...config, difficulty: id })}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                config.difficulty === id
                  ? 'ring-2 ring-offset-2 ring-offset-surface-900'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Badge color={color}>{label}</Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Duration" subtitle="Estimated session length" />
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((mins) => (
            <button
              key={mins}
              type="button"
              onClick={() => setConfig({ ...config, duration: mins })}
              className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                config.duration === mins
                  ? 'border-violet-500/50 bg-violet-500/15 text-violet-300'
                  : 'border-slate-600/40 text-slate-400 hover:border-slate-500/50'
              }`}
            >
              {mins} min
            </button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => navigate(ROUTES.DASHBOARD)}>
          Cancel
        </Button>
        <Button icon={Mic} size="lg" onClick={handleStart}>
          Start Interview
        </Button>
      </div>
    </div>
  );
}
