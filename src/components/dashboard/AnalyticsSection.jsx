import { AlertCircle, CheckCircle2, Lightbulb, Sparkles } from 'lucide-react';
import Card, { CardHeader } from '../ui/Card';
import Badge from '../ui/Badge';

export default function AnalyticsSection({ analytics }) {
  const { strengths, weaknesses, recommendations } = analytics;

  return (
    <Card glow className="animate-slide-up" style={{ animationDelay: '200ms' }}>
      <CardHeader
        title="AI Interview Analytics"
        subtitle="Personalized insights from your recent sessions"
        action={
          <Badge color="cyan">
            <Sparkles className="mr-1 inline h-3 w-3" />
            AI Powered
          </Badge>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span className="text-sm font-semibold">Strengths</span>
          </div>
          <ul className="space-y-2">
            {strengths.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-amber-400">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-semibold">Areas to Improve</span>
          </div>
          <ul className="space-y-2">
            {weaknesses.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
          <div className="mb-3 flex items-center gap-2 text-violet-400">
            <Lightbulb className="h-4 w-4" />
            <span className="text-sm font-semibold">Recommendations</span>
          </div>
          <ul className="space-y-2">
            {recommendations.map((item) => (
              <li key={item} className="text-sm text-slate-300">
                • {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
