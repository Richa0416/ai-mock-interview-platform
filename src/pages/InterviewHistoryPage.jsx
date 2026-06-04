import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Calendar,
  ChevronRight,
  Filter,
  Search,
} from 'lucide-react';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import PageLoader from '../components/ui/PageLoader';
import { mockInterviewHistory } from '../data/mockInterviews';
import { formatDate, formatDuration, formatScore, getScoreColor } from '../utils/format';
import { ROUTES } from '../utils/constants';

const difficultyColors = {
  easy: 'emerald',
  medium: 'amber',
  hard: 'rose',
};

const typeLabels = {
  technical: 'Technical',
  behavioral: 'Behavioral',
  'system-design': 'System Design',
  dsa: 'DSA',
};

export default function InterviewHistoryPage() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const filtered = mockInterviewHistory.filter((item) => {
    const matchesSearch =
      !search ||
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.company?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || item.type === filter;
    return matchesSearch && matchesFilter;
  });

  if (loading) return <PageLoader message="Loading interview history..." />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 md:text-3xl">
          Interview History
        </h1>
        <p className="mt-1 text-slate-400">
          Review past sessions and track your progress
        </p>
      </div>

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              placeholder="Search by title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-600/40 bg-surface-800/60 py-2.5 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="rounded-xl border border-slate-600/40 bg-surface-800/60 px-3 py-2 text-sm text-slate-200 focus:border-violet-500/50 focus:outline-none"
            >
              <option value="all">All types</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="system-design">System Design</option>
              <option value="dsa">DSA</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader
          title={`${filtered.length} Interviews`}
          subtitle="Click any session to view detailed results"
        />

        <div className="divide-y divide-slate-700/40">
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-slate-500">No interviews found.</p>
          ) : (
            filtered.map((interview, index) => (
              <Link
                key={interview.id}
                to={ROUTES.RESULTS}
                className="flex flex-col gap-3 py-4 transition-colors hover:bg-surface-800/30 sm:flex-row sm:items-center sm:justify-between animate-slide-up first:pt-0"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-slate-100 truncate">
                      {interview.title}
                    </h3>
                    <Badge color={difficultyColors[interview.difficulty]}>
                      {interview.difficulty}
                    </Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    {interview.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {interview.company}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(interview.date)}
                    </span>
                    <span>{formatDuration(interview.duration)}</span>
                    <Badge color="slate">{typeLabels[interview.type]}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-xl font-bold ${getScoreColor(interview.score)}`}
                  >
                    {formatScore(interview.score)}
                  </span>
                  <ChevronRight className="h-5 w-5 text-slate-500" />
                </div>
              </Link>
            ))
          )}
        </div>
      </Card>
    </div>
  );
}
