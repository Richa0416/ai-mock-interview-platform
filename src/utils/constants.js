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

export const ROLE_OPTIONS = [
  { id: 'frontend', label: 'Frontend Engineer' },
  { id: 'backend', label: 'Backend Engineer' },
  { id: 'fullstack', label: 'Full Stack Engineer' },
  { id: 'devops', label: 'DevOps / SRE' },
  { id: 'data', label: 'Data Engineer' },
  { id: 'mobile', label: 'Mobile Engineer' },
];

export const EXPERIENCE_LEVELS = [
  { id: 'intern', label: 'Intern / New Grad', years: '0–1 yrs' },
  { id: 'junior', label: 'Junior', years: '1–2 yrs' },
  { id: 'mid', label: 'Mid-Level', years: '3–5 yrs' },
  { id: 'senior', label: 'Senior', years: '5–8 yrs' },
  { id: 'staff', label: 'Staff / Principal', years: '8+ yrs' },
];

export const TECH_STACK_OPTIONS = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'react', label: 'React' },
  { id: 'node', label: 'Node.js' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'spring', label: 'Spring Boot' },
  { id: 'django', label: 'Django' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'sql', label: 'SQL' },
  { id: 'redis', label: 'Redis' },
  { id: 'aws', label: 'AWS' },
  { id: 'docker', label: 'Docker' },
  { id: 'kubernetes', label: 'Kubernetes' },
  { id: 'kafka', label: 'Kafka' },
];
