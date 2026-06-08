import { mockQuestionBank } from '../data/mockQuestionBank';
import {
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
  TECH_STACK_OPTIONS,
} from './constants';

const QUESTION_COUNT_BY_DURATION = {
  15: 2,
  30: 3,
  45: 4,
  60: 5,
};

const SESSION_QUESTIONS_KEY = 'interviewQuestions';
const SESSION_CONFIG_KEY = 'interviewConfig';

function getRoleLabel(roleId) {
  return ROLE_OPTIONS.find((r) => r.id === roleId)?.label ?? roleId;
}

function getExperienceLabel(expId) {
  return EXPERIENCE_LEVELS.find((e) => e.id === expId)?.label ?? expId;
}

function getTechLabels(techIds) {
  return techIds.map(
    (id) => TECH_STACK_OPTIONS.find((t) => t.id === id)?.label ?? id
  );
}

function personalizeText(text, { roleLabel, techLabels }) {
  const primaryTech = techLabels[0] ?? 'your stack';
  const techList =
    techLabels.length > 1
      ? `${techLabels.slice(0, -1).join(', ')} and ${techLabels.at(-1)}`
      : primaryTech;

  return text
    .replace(/\{role\}/gi, roleLabel)
    .replace(/\{tech\}/gi, techList)
    .replace(/\{primaryTech\}/gi, primaryTech);
}

function matchesTechStack(question, selectedTech) {
  if (!question.techStack?.length) return true;
  if (!selectedTech?.length) return true;
  return selectedTech.some((t) => question.techStack.includes(t));
}

function scoreQuestion(question, config) {
  let score = 0;
  const techOverlap = (config.techStack ?? []).filter((t) =>
    question.techStack?.includes(t)
  ).length;
  score += techOverlap * 3;
  if (question.types?.includes(config.type)) score += 2;
  if (question.experience?.includes(config.experience)) score += 2;
  if (question.difficulty?.includes(config.difficulty)) score += 1;
  return score;
}

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Mock AI question generation — filters bank by role, experience, tech stack, type, difficulty.
 */
export function generateInterviewQuestions(config) {
  const {
    role = 'fullstack',
    experience = 'mid',
    techStack = [],
    type = 'technical',
    difficulty = 'medium',
    duration = 45,
  } = config;

  const roleLabel = getRoleLabel(role);
  const experienceLabel = getExperienceLabel(experience);
  const techLabels = getTechLabels(techStack);
  const count = QUESTION_COUNT_BY_DURATION[duration] ?? 4;

  const filtered = mockQuestionBank.filter(
    (q) =>
      q.roles.includes(role) &&
      q.experience.includes(experience) &&
      q.types.includes(type) &&
      q.difficulty.includes(difficulty) &&
      matchesTechStack(q, techStack)
  );

  const pool =
    filtered.length >= count
      ? filtered
      : mockQuestionBank.filter(
          (q) =>
            q.roles.includes(role) &&
            q.experience.includes(experience) &&
            matchesTechStack(q, techStack)
        );

  const ranked = shuffle(pool).sort(
    (a, b) => scoreQuestion(b, config) - scoreQuestion(a, config)
  );

  const seenCategories = new Set();
  const selected = [];

  for (const q of ranked) {
    if (selected.length >= count) break;
    if (seenCategories.has(q.category) && selected.length < count - 1) continue;
    selected.push(q);
    seenCategories.add(q.category);
  }

  while (selected.length < count && ranked.length > selected.length) {
    const next = ranked.find((q) => !selected.includes(q));
    if (!next) break;
    selected.push(next);
  }

  const questions = selected.map((q, index) => ({
    id: `${q.id}-${Date.now()}-${index}`,
    text: personalizeText(q.text, { roleLabel, techLabels }),
    category: q.category,
    timeLimit: q.timeLimit,
    sourceId: q.id,
  }));

  return {
    questions,
    meta: {
      generatedAt: new Date().toISOString(),
      role,
      roleLabel,
      experience,
      experienceLabel,
      techStack,
      techLabels,
      questionCount: questions.length,
      isAiGenerated: true,
    },
  };
}

export function saveInterviewSession(config, questionsPayload) {
  sessionStorage.setItem(SESSION_CONFIG_KEY, JSON.stringify(config));
  sessionStorage.setItem(
    SESSION_QUESTIONS_KEY,
    JSON.stringify(questionsPayload)
  );
}

export function loadInterviewQuestions() {
  const raw = sessionStorage.getItem(SESSION_QUESTIONS_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed.questions ?? parsed;
  } catch {
    return null;
  }
}

export function loadInterviewSessionMeta() {
  const raw = sessionStorage.getItem(SESSION_QUESTIONS_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed.meta ?? null;
  } catch {
    return null;
  }
}

export function loadInterviewConfig() {
  const raw = sessionStorage.getItem(SESSION_CONFIG_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
