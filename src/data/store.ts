const STORAGE_KEY = 'examforge_progress';

export interface QuestionAttempt {
  questionId: string;
  subject: string;
  topic: string;
  correct: boolean;
  timestamp: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: (stats: UserStats) => boolean;
}

export interface UserStats {
  totalAttempted: number;
  totalCorrect: number;
  streak: number;
  longestStreak: number;
  lastPracticeDate: string;
  points: number;
  attempts: QuestionAttempt[];
  dailyCompleted: string[];
  earnedBadges: string[];
}

const defaultStats: UserStats = {
  totalAttempted: 0,
  totalCorrect: 0,
  streak: 0,
  longestStreak: 0,
  lastPracticeDate: '',
  points: 0,
  attempts: [],
  dailyCompleted: [],
  earnedBadges: [],
};

export const badges: Badge[] = [
  { id: 'first-step', name: 'First Step', description: 'Answer your first question', icon: '🌟', requirement: (s) => s.totalAttempted >= 1 },
  { id: 'ten-down', name: 'Getting Started', description: 'Answer 10 questions', icon: '🔥', requirement: (s) => s.totalAttempted >= 10 },
  { id: 'fifty-club', name: 'Fifty Club', description: 'Answer 50 questions', icon: '🏆', requirement: (s) => s.totalAttempted >= 50 },
  { id: 'century', name: 'Century', description: 'Answer 100 questions', icon: '💯', requirement: (s) => s.totalAttempted >= 100 },
  { id: 'streak-3', name: 'Consistent', description: '3-day practice streak', icon: '⚡', requirement: (s) => s.streak >= 3 },
  { id: 'streak-7', name: 'Dedicated', description: '7-day practice streak', icon: '🌈', requirement: (s) => s.streak >= 7 },
  { id: 'sharp-mind', name: 'Sharp Mind', description: 'Get 10 correct in a row', icon: '🧠', requirement: (s) => s.totalCorrect >= 10 },
  { id: 'point-master', name: 'Point Master', description: 'Earn 500 points', icon: '💎', requirement: (s) => s.points >= 500 },
];

export function getStats(): UserStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultStats };
    return { ...defaultStats, ...JSON.parse(raw) };
  } catch {
    return { ...defaultStats };
  }
}

export function saveStats(stats: UserStats): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
}

export function recordAttempt(questionId: string, subject: string, topic: string, correct: boolean): UserStats {
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];

  stats.totalAttempted++;
  if (correct) {
    stats.totalCorrect++;
    stats.points += 10;
  }

  // Streak logic
  if (stats.lastPracticeDate !== today) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (stats.lastPracticeDate === yesterdayStr) {
      stats.streak++;
    } else if (stats.lastPracticeDate !== today) {
      stats.streak = 1;
    }
    stats.lastPracticeDate = today;
  }
  if (stats.streak > stats.longestStreak) stats.longestStreak = stats.streak;

  stats.attempts.push({ questionId, subject, topic, correct, timestamp: Date.now() });

  // Check badges
  badges.forEach(badge => {
    if (!stats.earnedBadges.includes(badge.id) && badge.requirement(stats)) {
      stats.earnedBadges.push(badge.id);
    }
  });

  saveStats(stats);
  return stats;
}

export function getSubjectAccuracy(subject: string): { attempted: number; correct: number; percentage: number } {
  const stats = getStats();
  const subjectAttempts = stats.attempts.filter(a => a.subject === subject);
  const correct = subjectAttempts.filter(a => a.correct).length;
  const attempted = subjectAttempts.length;
  return {
    attempted,
    correct,
    percentage: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
  };
}

export function getWeakTopics(): { topic: string; subject: string; accuracy: number }[] {
  const stats = getStats();
  const topicMap = new Map<string, { correct: number; total: number; subject: string }>();

  stats.attempts.forEach(a => {
    const existing = topicMap.get(a.topic) || { correct: 0, total: 0, subject: a.subject };
    existing.total++;
    if (a.correct) existing.correct++;
    topicMap.set(a.topic, existing);
  });

  return Array.from(topicMap.entries())
    .map(([topic, data]) => ({
      topic,
      subject: data.subject,
      accuracy: Math.round((data.correct / data.total) * 100),
    }))
    .filter(t => t.accuracy < 60)
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function markDailyComplete(): void {
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  if (!stats.dailyCompleted.includes(today)) {
    stats.dailyCompleted.push(today);
    stats.points += 50; // Bonus for completing daily
    saveStats(stats);
  }
}
