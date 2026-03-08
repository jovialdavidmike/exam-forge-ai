import { getStats, badges } from '@/data/store';
import { Trophy, Flame, Star, Zap } from 'lucide-react';

export default function ProfilePage() {
  const stats = getStats();

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl">🎓</span>
        </div>
        <h1 className="text-xl font-extrabold text-foreground">Student</h1>
        <p className="text-sm text-muted-foreground">JAMB · WAEC · NECO</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <Star className="w-5 h-5 mx-auto text-streak mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.points}</p>
          <p className="text-[10px] text-muted-foreground font-medium">Total Points</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <Flame className="w-5 h-5 mx-auto text-streak mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.longestStreak}</p>
          <p className="text-[10px] text-muted-foreground font-medium">Longest Streak</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <Zap className="w-5 h-5 mx-auto text-primary mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.totalAttempted}</p>
          <p className="text-[10px] text-muted-foreground font-medium">Questions Done</p>
        </div>
        <div className="bg-card rounded-xl border border-border p-3 text-center">
          <Trophy className="w-5 h-5 mx-auto text-badge-gold mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.earnedBadges.length}</p>
          <p className="text-[10px] text-muted-foreground font-medium">Badges Earned</p>
        </div>
      </div>

      {/* Badges */}
      <div>
        <h2 className="text-sm font-bold text-foreground mb-3">Badges</h2>
        <div className="grid grid-cols-2 gap-2.5">
          {badges.map(badge => {
            const earned = stats.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`rounded-xl border p-3 text-center transition-all ${
                  earned ? 'bg-card border-primary/30' : 'bg-muted/50 border-border opacity-50'
                }`}
              >
                <span className="text-2xl block mb-1">{badge.icon}</span>
                <p className="text-xs font-bold text-foreground">{badge.name}</p>
                <p className="text-[10px] text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
