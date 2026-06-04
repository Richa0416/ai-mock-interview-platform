import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Clock,
  Flame,
  Mic,
  Target,
  TrendingUp,
} from 'lucide-react';
import AnalyticsSection from '../components/dashboard/AnalyticsSection';
import StatCard from '../components/dashboard/StatCard';
import ScoreChart from '../components/charts/ScoreChart';
import RadarSkillChart from '../components/charts/RadarSkillChart';
import Card, { CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import PageLoader from '../components/ui/PageLoader';
import Badge from '../components/ui/Badge';
import {
  mockAnalytics,
  mockDashboardStats,
  mockRecentActivity,
  mockScoreTrend,
  mockSkillBreakdown,
  mockUser,
} from '../data/mockInterviews';
import { formatScore } from '../utils/format';
import { ROUTES } from '../utils/constants';

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  if (loading) return <PageLoader message="Loading dashboard..." />;

  const stats = mockDashboardStats;
  const progress = (stats.completedThisWeek / stats.weeklyGoal) * 100;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
            Welcome back, {mockUser.name.split(' ')[0]} 👋
          </h1>
          <p className="mt-1 text-slate-400">
            You&apos;re on a <span className="text-amber-400 font-medium">{mockUser.streak}-day</span> practice streak
          </p>
        </div>
        <Link to={ROUTES.SETUP}>
          <Button icon={Mic} size="lg">
            Start Mock Interview
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Interviews"
          value={stats.totalInterviews}
          icon={Target}
          trend={8}
          trendLabel="vs last month"
          delay={0}
        />
        <StatCard
          title="Average Score"
          value={formatScore(stats.avgScore)}
          icon={Award}
          trend={stats.improvement}
          trendLabel="improvement"
          delay={50}
        />
        <StatCard
          title="Hours Practiced"
          value={`${stats.hoursPracticed}h`}
          icon={Clock}
          subtitle="This month"
          delay={100}
        />
        <StatCard
          title="Practice Streak"
          value={`${mockUser.streak} days`}
          icon={Flame}
          trend={5}
          trendLabel="personal best"
          delay={150}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <CardHeader
            title="Score Progress"
            subtitle="Your performance over the last 6 weeks"
            action={<Badge color="emerald"><TrendingUp className="mr-1 inline h-3 w-3" />+12%</Badge>}
          />
          <ScoreChart data={mockScoreTrend} />
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: '150ms' }}>
          <CardHeader title="Weekly Goal" subtitle={`${stats.completedThisWeek} of ${stats.weeklyGoal} interviews`} />
          <div className="flex flex-col items-center py-4">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1e293b" strokeWidth="8" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#goalGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${progress * 2.64} 264`}
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-slate-100">{Math.round(progress)}%</span>
                <span className="text-xs text-slate-500">complete</span>
              </div>
            </div>
            <Link to={ROUTES.SETUP} className="mt-4 text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              Schedule next <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-slide-up" style={{ animationDelay: '180ms' }}>
          <CardHeader title="Skill Radar" subtitle="Multi-dimensional assessment" />
          <RadarSkillChart data={mockSkillBreakdown} />
        </Card>

        <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
          <CardHeader title="Recent Activity" subtitle="Your latest milestones" />
          <ul className="space-y-3">
            {mockRecentActivity.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between rounded-xl border border-slate-700/40 bg-surface-800/40 px-4 py-3 transition-colors hover:border-violet-500/20"
              >
                <div>
                  <p className="text-sm font-medium text-slate-200">{item.action}</p>
                  <p className="text-xs text-slate-500">{item.target}</p>
                </div>
                <span className="text-xs text-slate-500">{item.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <AnalyticsSection analytics={mockAnalytics} />
    </div>
  );
}
