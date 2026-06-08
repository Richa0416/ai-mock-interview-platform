import { RefreshCw, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Card, { CardHeader } from '../ui/Card';

export default function QuestionPreview({
  questions,
  meta,
  loading,
  onRegenerate,
}) {
  if (loading) {
    return (
      <Card className="animate-pulse">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-surface-700/50"
            />
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-slate-500">
          AI is generating tailored questions...
        </p>
      </Card>
    );
  }

  if (!questions?.length) {
    return (
      <Card>
        <p className="text-center text-sm text-slate-500 py-6">
          Select role, experience level, and at least one tech stack, then generate questions.
        </p>
      </Card>
    );
  }

  return (
    <Card glow className="animate-fade-in">
      <CardHeader
        title="AI-Generated Questions"
        subtitle={
          meta
            ? `${meta.questionCount} questions for ${meta.roleLabel} · ${meta.experienceLabel}${
                meta.techLabels?.length
                  ? ` · ${meta.techLabels.join(', ')}`
                  : ''
              }`
            : `${questions.length} questions ready`
        }
        action={
          <div className="flex items-center gap-2">
            <Badge color="cyan">
              <Sparkles className="mr-1 inline h-3 w-3" />
              AI Generated
            </Badge>
            {onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                icon={RefreshCw}
                onClick={onRegenerate}
              >
                Regenerate
              </Button>
            )}
          </div>
        }
      />

      <ol className="space-y-3">
        {questions.map((q, index) => (
          <li
            key={q.id}
            className="rounded-xl border border-slate-700/40 bg-surface-800/40 p-4 transition-colors hover:border-violet-500/20"
          >
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-500/20 text-xs font-bold text-violet-300">
                {index + 1}
              </span>
              <Badge color="violet">{q.category}</Badge>
              <span className="text-xs text-slate-500">
                ~{Math.floor(q.timeLimit / 60)} min
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-200">{q.text}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}
