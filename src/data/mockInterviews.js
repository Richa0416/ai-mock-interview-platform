export const mockUser = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@example.com',
  avatar: null,
  plan: 'Pro',
  streak: 12,
};

export const mockDashboardStats = {
  totalInterviews: 24,
  avgScore: 78,
  hoursPracticed: 18.5,
  improvement: 12,
  weeklyGoal: 5,
  completedThisWeek: 3,
};

export const mockScoreTrend = [
  { week: 'W1', score: 62, technical: 58, communication: 65 },
  { week: 'W2', score: 68, technical: 70, communication: 66 },
  { week: 'W3', score: 71, technical: 72, communication: 70 },
  { week: 'W4', score: 75, technical: 78, communication: 72 },
  { week: 'W5', score: 78, technical: 80, communication: 76 },
  { week: 'W6', score: 82, technical: 84, communication: 80 },
];

export const mockSkillBreakdown = [
  { skill: 'Problem Solving', score: 85, fullMark: 100 },
  { skill: 'Communication', score: 78, fullMark: 100 },
  { skill: 'Code Quality', score: 82, fullMark: 100 },
  { skill: 'System Design', score: 71, fullMark: 100 },
  { skill: 'Time Mgmt', score: 76, fullMark: 100 },
];

export const mockAnalytics = {
  strengths: ['Clear explanations', 'Structured approach', 'Edge case handling'],
  weaknesses: ['Time complexity analysis', 'Trade-off discussion'],
  recommendations: [
    'Practice system design patterns',
    'Review Big-O for common algorithms',
    'Record yourself explaining solutions',
  ],
};

export const mockInterviewHistory = [
  {
    id: 'int-001',
    title: 'Amazon SDE – Technical Round',
    type: 'technical',
    difficulty: 'hard',
    duration: 45,
    score: 82,
    date: '2026-06-01T14:30:00Z',
    status: 'completed',
    company: 'Amazon',
  },
  {
    id: 'int-002',
    title: 'Google L4 – System Design',
    type: 'system-design',
    difficulty: 'hard',
    duration: 60,
    score: 74,
    date: '2026-05-28T10:00:00Z',
    status: 'completed',
    company: 'Google',
  },
  {
    id: 'int-003',
    title: 'Behavioral – Leadership Principles',
    type: 'behavioral',
    difficulty: 'medium',
    duration: 30,
    score: 88,
    date: '2026-05-25T16:15:00Z',
    status: 'completed',
    company: 'Meta',
  },
  {
    id: 'int-004',
    title: 'DSA – Arrays & Dynamic Programming',
    type: 'dsa',
    difficulty: 'medium',
    duration: 45,
    score: 79,
    date: '2026-05-20T09:00:00Z',
    status: 'completed',
    company: 'Microsoft',
  },
  {
    id: 'int-005',
    title: 'Startup Full-Stack Interview',
    type: 'technical',
    difficulty: 'easy',
    duration: 30,
    score: 91,
    date: '2026-05-15T11:30:00Z',
    status: 'completed',
    company: 'Stripe',
  },
];

export const mockRecentActivity = [
  { id: 1, action: 'Completed interview', target: 'Amazon SDE', time: '2 days ago' },
  { id: 2, action: 'Score improved', target: '+6% vs last week', time: '3 days ago' },
  { id: 3, action: 'Started practice', target: 'System Design', time: '5 days ago' },
];

export const mockSessionQuestions = [
  {
    id: 'q1',
    text: 'Tell me about a challenging technical problem you solved recently.',
    category: 'Behavioral',
    timeLimit: 180,
  },
  {
    id: 'q2',
    text: 'Design a URL shortener that handles 100M requests per day.',
    category: 'System Design',
    timeLimit: 600,
  },
  {
    id: 'q3',
    text: 'Implement a function to find the longest increasing subsequence.',
    category: 'DSA',
    timeLimit: 900,
  },
];

export const mockLatestResult = {
  id: 'result-001',
  interviewId: 'int-001',
  overallScore: 82,
  scores: {
    technical: 85,
    communication: 78,
    problemSolving: 84,
    confidence: 80,
  },
  feedback: {
    summary:
      'Strong performance with clear communication. You demonstrated solid problem-solving skills and handled follow-up questions well.',
    highlights: [
      'Structured your answer using STAR method',
      'Identified edge cases proactively',
      'Good pacing throughout the session',
    ],
    improvements: [
      'Elaborate more on scalability trade-offs',
      'Quantify impact with metrics when possible',
    ],
  },
  duration: 42,
  completedAt: '2026-06-01T15:12:00Z',
};

export const mockCategoryScores = [
  { name: 'Technical', value: 85 },
  { name: 'Communication', value: 78 },
  { name: 'Problem Solving', value: 84 },
  { name: 'Confidence', value: 80 },
];
