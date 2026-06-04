import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  RefreshCw,
  Share2,
  Star,
} from 'lucide-react';
import PerformanceChart from '../components/charts/PerformanceChart';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import PageLoader from '../components/ui/PageLoader';
import {
  mockCategoryScores,
  mockLatestResult,
} from '../data/mockInterviews';
import { formatDateTime, formatScore, getScoreColor, getScoreLabel } from '../utils/format';
import { ROUTES } from '../utils/constants';

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);
  const result = mockLatestResult;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <PageLoader message="Analyzing your performance..." />;

  return (
    <div className="mx-auto max-w-4xl space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to={ROUTES.DASHBOARD}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" icon={Share2}>
            Share
          </Button>
          <Button variant="ghost" size="sm" icon={Download}>
            Export
          </Button>
        </div>
      </div>

      <Card glow className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20">
          <Star className="h-8 w-8 text-amber-400" />
        </div>
        <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
          Interview Complete!
        </h1>
        <p className="mt-1 text-slate-400">
          {formatDateTime(result.completedAt)} · {result.duration} min session
        </p>

        <div className="mt-8 inline-flex flex-col items-center">
          <span
            className={`text-6xl font-bold tracking-tight ${getScoreColor(result.overallScore)}`}
          >
            {formatScore(result.overallScore)}
          </span>
          <Badge color="emerald" className="mt-2">
            {getScoreLabel(result.overallScore)}
          </Badge>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader title="Category Breakdown" subtitle="Scores by dimension" />
          <PerformanceChart data={mockCategoryScores} />
        </Card>

        <Card>
          <CardHeader title="Detailed Scores" />
          <div className="space-y-4">
            {Object.entries(result.scores).map(([key, value]) => (
              <div key={key}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="capitalize text-slate-300">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className={`font-semibold ${getScoreColor(value)}`}>
                    {value}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 transition-all duration-700"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader title="AI Feedback Summary" />
        <p className="text-slate-300 leading-relaxed">{result.feedback.summary}</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              Highlights
            </h4>
            <ul className="space-y-2">
              {result.feedback.highlights.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  ✓ {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
            <h4 className="mb-3 text-sm font-semibold text-amber-400">
              Areas to Improve
            </h4>
            <ul className="space-y-2">
              {result.feedback.improvements.map((item) => (
                <li key={item} className="text-sm text-slate-300">
                  → {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Link to={ROUTES.SETUP}>
          <Button icon={RefreshCw} size="lg">
            Practice Again
          </Button>
        </Link>
        <Link to={ROUTES.HISTORY}>
          <Button variant="secondary" size="lg">
            View History
          </Button>
        </Link>
      </div>
    </div>
  );
}
