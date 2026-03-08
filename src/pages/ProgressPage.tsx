import { subjects } from '@/data/questions';
import { getStats, getSubjectAccuracy, getWeakTopics } from '@/data/store';
import { TrendingUp, AlertTriangle } from 'lucide-react';

export default function ProgressPage() {
  const stats = getStats();
  const weakTopics = getWeakTopics();
  const overallPct = stats.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0;

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-foreground">Progress</h1>
        <p className="text-sm text-muted-foreground">Track your exam preparation</p>
      </div>

      {/* Overall */}
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <div className="relative w-24 h-24 mx-auto mb-3">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="hsl(var(--primary))" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${overallPct * 2.64} 264`}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-xl font-extrabold text-foreground">{overallPct}%</span>
        </div>
        <p className="text-sm font-semibold text-foreground">Overall Accuracy</p>
        <p className="text-xs text-muted-foreground">{stats.totalCorrect} correct out of {stats.totalAttempted} questions</p>
      </div>

      {/* Per subject */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-bold text-foreground">By Subject</h2>
        </div>
        <div className="space-y-2.5">
          {subjects.map(sub => {
            const acc = getSubjectAccuracy(sub.id);
            return (
              <div key={sub.id} className="bg-card rounded-xl border border-border p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{sub.icon}</span>
                    <span className="text-sm font-semibold text-foreground">{sub.name}</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">{acc.percentage}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${acc.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1.5">{acc.attempted} questions attempted</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weak topics */}
      {weakTopics.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <h2 className="text-sm font-bold text-foreground">Needs Improvement</h2>
          </div>
          <div className="space-y-2">
            {weakTopics.map((t, i) => (
              <div key={i} className="bg-warning/5 border border-warning/20 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.topic}</p>
                  <p className="text-[10px] text-muted-foreground capitalize">{t.subject}</p>
                </div>
                <span className="text-sm font-bold text-warning">{t.accuracy}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {stats.totalAttempted === 0 && (
        <div className="text-center py-8">
          <p className="text-3xl mb-2">📊</p>
          <p className="text-sm text-muted-foreground">Start practicing to see your progress here!</p>
        </div>
      )}
    </div>
  );
}
