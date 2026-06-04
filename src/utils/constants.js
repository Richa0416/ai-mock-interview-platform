export const APP_NAME = 'InterviewAI';

export const ROUTES = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  SETUP: '/interview/setup',
  SESSION: '/interview/session',
  RESULTS: '/interview/results',
  HISTORY: '/interview/history',
};

export const INTERVIEW_TYPES = [
  { id: 'technical', label: 'Technical', icon: 'Code' },
  { id: 'behavioral', label: 'Behavioral', icon: 'Users' },
  { id: 'system-design', label: 'System Design', icon: 'Layers' },
  { id: 'dsa', label: 'DSA / Coding', icon: 'Terminal' },
];

export const DIFFICULTY_LEVELS = [
  { id: 'easy', label: 'Easy', color: 'emerald' },
  { id: 'medium', label: 'Medium', color: 'amber' },
  { id: 'hard', label: 'Hard', color: 'rose' },
];

export const DURATION_OPTIONS = [15, 30, 45, 60];
