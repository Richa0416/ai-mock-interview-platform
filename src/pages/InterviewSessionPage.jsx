import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Mic,
  MicOff,
  Pause,
  Play,
  SkipForward,
  Sparkles,
  Square,
  Video,
  Volume2,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import PageLoader from '../components/ui/PageLoader';
import { mockSessionQuestions } from '../data/mockInterviews';
import { ROUTES } from '../utils/constants';
import {
  loadInterviewConfig,
  loadInterviewQuestions,
  loadInterviewSessionMeta,
} from '../utils/generateQuestions';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function InterviewSessionPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [transcript, setTranscript] = useState('');

  const generatedQuestions = useMemo(
    () => loadInterviewQuestions(),
    [ready]
  );

  const questions = useMemo(
    () =>
      generatedQuestions?.length ? generatedQuestions : mockSessionQuestions,
    [generatedQuestions]
  );

  const hasCustomQuestions = Boolean(generatedQuestions?.length);

  const sessionMeta = useMemo(
    () => loadInterviewSessionMeta(),
    [ready]
  );
  const sessionConfig = useMemo(() => loadInterviewConfig(), [ready]);

  useEffect(() => {
    setReady(true);
  }, []);

  const question = questions[questionIndex];
  const total = questions.length;

  useEffect(() => {
    if (isPaused) return undefined;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleEnd = () => {
    navigate(ROUTES.RESULTS);
  };

  const handleNext = () => {
    if (questionIndex < total - 1) {
      setQuestionIndex((i) => i + 1);
      setTranscript('');
    } else {
      handleEnd();
    }
  };

  if (!ready || !question) {
    return <PageLoader message="Loading interview session..." />;
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge color="rose" className="animate-pulse-glow">
              LIVE
            </Badge>
            {sessionMeta?.isAiGenerated && (
              <Badge color="cyan">
                <Sparkles className="mr-1 inline h-3 w-3" />
                AI Questions
              </Badge>
            )}
          </div>
          <h1 className="mt-2 text-xl font-bold text-slate-100 md:text-2xl">
            {sessionConfig?.title || 'Mock Interview Session'}
          </h1>
          <p className="text-sm text-slate-400">
            Question {questionIndex + 1} of {total}
            {sessionMeta?.roleLabel && (
              <span className="text-slate-500">
                {' '}
                · {sessionMeta.roleLabel} · {sessionMeta.experienceLabel}
              </span>
            )}
          </p>
        </div>
        <div className="font-mono text-2xl font-bold text-cyan-400">
          {formatTime(elapsed)}
        </div>
      </div>

      {sessionMeta?.techLabels?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sessionMeta.techLabels.map((label) => (
            <Badge key={label} color="slate">
              {label}
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          <Card glow className="min-h-[200px]">
            <div className="mb-3 flex items-center justify-between">
              <Badge color="violet">{question.category}</Badge>
              <span className="text-xs text-slate-500">
                Suggested: {Math.floor(question.timeLimit / 60)} min
              </span>
            </div>
            <p className="text-lg leading-relaxed text-slate-100 md:text-xl">
              {question.text}
            </p>
          </Card>

          <Card>
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-500">
              Your response (live transcript)
            </p>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Start speaking — your answer will appear here..."
              className="min-h-[140px] w-full resize-none rounded-xl border border-slate-600/40 bg-surface-800/60 p-4 text-slate-200 placeholder:text-slate-600 focus:border-violet-500/50 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            />
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card className="aspect-video flex flex-col items-center justify-center bg-surface-800/80">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-600/30 to-cyan-500/30 animate-pulse-glow">
              <Video className="h-8 w-8 text-violet-400" />
            </div>
            <p className="text-sm font-medium text-slate-300">AI Interviewer</p>
            <p className="mt-1 text-xs text-slate-500">Listening...</p>
            <div className="mt-4 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full bg-cyan-400/60 animate-pulse"
                  style={{
                    height: `${12 + Math.sin(elapsed + i) * 8}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          </Card>

          <Card>
            <p className="mb-3 text-xs font-medium uppercase text-slate-500">
              Controls
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={isRecording ? 'danger' : 'primary'}
                icon={isRecording ? MicOff : Mic}
                onClick={() => setIsRecording(!isRecording)}
              >
                {isRecording ? 'Mute' : 'Unmute'}
              </Button>
              <Button
                variant="secondary"
                icon={isPaused ? Play : Pause}
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? 'Resume' : 'Pause'}
              </Button>
              <Button variant="ghost" icon={Volume2}>
                Audio
              </Button>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                variant="outline"
                icon={SkipForward}
                className="flex-1"
                onClick={handleNext}
              >
                {questionIndex < total - 1 ? 'Next Question' : 'Finish'}
              </Button>
              <Button variant="danger" icon={Square} onClick={handleEnd}>
                End
              </Button>
            </div>
          </Card>

          <div className="h-2 overflow-hidden rounded-full bg-surface-700">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-violet-600 transition-all duration-500"
              style={{
                width: `${((questionIndex + 1) / total) * 100}%`,
              }}
            />
          </div>

          {!hasCustomQuestions && (
            <p className="text-center text-xs text-slate-500">
              Using default questions.{' '}
              <Link to={ROUTES.SETUP} className="text-cyan-400 hover:underline">
                Configure setup
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
