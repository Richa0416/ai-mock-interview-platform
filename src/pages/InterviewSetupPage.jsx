import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Code,
  Layers,
  Mic,
  Sparkles,
  Terminal,
  Users,
} from 'lucide-react';
import QuestionPreview from '../components/interview/QuestionPreview';
import Button from '../components/ui/Button';
import Card, { CardHeader } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import {
  DIFFICULTY_LEVELS,
  DURATION_OPTIONS,
  EXPERIENCE_LEVELS,
  INTERVIEW_TYPES,
  ROLE_OPTIONS,
  ROUTES,
  TECH_STACK_OPTIONS,
} from '../utils/constants';
import {
  generateInterviewQuestions,
  saveInterviewSession,
} from '../utils/generateQuestions';

const typeIcons = {
  technical: Code,
  behavioral: Users,
  'system-design': Layers,
  dsa: Terminal,
};

const defaultConfig = {
  title: '',
  company: '',
  role: 'fullstack',
  experience: 'mid',
  techStack: ['react', 'javascript'],
  type: 'technical',
  difficulty: 'medium',
  duration: 45,
  focusAreas: '',
};

export default function InterviewSetupPage() {
  const navigate = useNavigate();
  const [config, setConfig] = useState(defaultConfig);
  const [generated, setGenerated] = useState(null);
  const [generating, setGenerating] = useState(false);

  const canGenerate =
    config.role && config.experience && config.techStack.length > 0;

  const runGenerate = useCallback(async () => {
    if (!canGenerate) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 600));
    const result = generateInterviewQuestions(config);
    setGenerated(result);
    setGenerating(false);
  }, [config, canGenerate]);

  useEffect(() => {
    if (!canGenerate) {
      setGenerated(null);
      return undefined;
    }
    let cancelled = false;
    const timer = setTimeout(async () => {
      setGenerating(true);
      await new Promise((r) => setTimeout(r, 600));
      if (cancelled) return;
      setGenerated(generateInterviewQuestions(config));
      setGenerating(false);
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [
    config.role,
    config.experience,
    config.techStack.join(','),
    config.type,
    config.difficulty,
    config.duration,
    canGenerate,
  ]);

  const toggleTech = (techId) => {
    setConfig((prev) => {
      const has = prev.techStack.includes(techId);
      const techStack = has
        ? prev.techStack.filter((t) => t !== techId)
        : [...prev.techStack, techId];
      return { ...prev, techStack };
    });
  };

  const handleStart = () => {
    if (!generated?.questions?.length) return;
    saveInterviewSession(config, generated);
    navigate(ROUTES.SESSION);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
          Interview Setup
        </h1>
        <p className="mt-1 text-slate-400">
          Configure your session — AI questions adapt to role, experience, and tech stack
        </p>
      </div>

      <Card glow>
        <CardHeader
          title="Target Role"
          subtitle="Questions are tailored to this position"
        />
        <div className="grid gap-2 sm:grid-cols-2">
          {ROLE_OPTIONS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setConfig({ ...config, role: id })}
              className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all ${
                config.role === id
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400'
                  : 'border-slate-600/40 text-slate-400 hover:border-slate-500/50'
              }`}
            >
              <Briefcase className="h-4 w-4 shrink-0" />
              {label}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Experience Level"
          subtitle="Adjusts depth and seniority of questions"
        />
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERIENCE_LEVELS.map(({ id, label, years }) => (
            <button
              key={id}
              type="button"
              onClick={() => setConfig({ ...config, experience: id })}
              className={`rounded-xl border px-4 py-3 text-left transition-all ${
                config.experience === id
                  ? 'border-violet-500/50 bg-violet-500/10'
                  : 'border-slate-600/40 hover:border-slate-500/50'
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  config.experience === id ? 'text-violet-300' : 'text-slate-300'
                }`}
              >
                {label}
              </p>
              <p className="text-xs text-slate-500">{years}</p>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader
          title="Tech Stack"
          subtitle="Select all technologies relevant to your interview"
        />
        <div className="flex flex-wrap gap-2">
          {TECH_STACK_OPTIONS.map(({ id, label }) => {
            const selected = config.techStack.includes(id);
            return (
              <button
                key={id}
                type="button"
                onClick={() => toggleTech(id)}
                className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-all ${
                  selected
                    ? 'border-cyan-500/50 bg-cyan-500/15 text-cyan-300'
                    : 'border-slate-600/40 text-slate-400 hover:border-slate-500/50'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {config.techStack.length === 0 && (
          <p className="mt-2 text-xs text-amber-400">
            Select at least one technology to generate questions.
          </p>
        )}
      </Card>

      <Card glow>
        <CardHeader
          title="Session Details"
          subtitle="Optional context for your practice session"
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
        <CardHeader title="Duration" subtitle="More time = more AI-generated questions" />
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

      <QuestionPreview
        questions={generated?.questions}
        meta={generated?.meta}
        loading={generating}
        onRegenerate={canGenerate ? runGenerate : undefined}
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={() => navigate(ROUTES.DASHBOARD)}>
          Cancel
        </Button>
        <Button
          icon={canGenerate && !generating ? Mic : Sparkles}
          size="lg"
          onClick={handleStart}
          disabled={!generated?.questions?.length || generating}
        >
          Start Interview
        </Button>
      </div>
    </div>
  );
}
