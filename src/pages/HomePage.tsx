import { useNavigate } from 'react-router-dom';
import { Flame, Zap, Target, ChevronRight, Sparkles, CalendarDays, User, Gift } from 'lucide-react';
import { subjects } from '@/data/questions';
import { getStats, getSubjectAccuracy } from '@/data/store';
import BannerAd from '@/components/ads/BannerAd';
import RewardButton from '@/components/ads/RewardButton';
import { useAds } from '@/contexts/AdContext';

export default function HomePage() {
  const navigate = useNavigate();
  const stats = getStats();
  const today = new Date().toISOString().split('T')[0];
  const dailyDone = stats.dailyCompleted.includes(today);

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* Greeting */}
      <div>
        <p className="text-sm text-muted-foreground">AI-powered exam prep for JAMB, WAEC & NECO</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-xl p-3 border border-border text-center">
          <Flame className="w-5 h-5 mx-auto text-streak mb-1" />
          <p className="text-xl font-bold text-foreground">{stats.streak}</p>
          <p className="text-[10px] text-muted-foreground font-medium">Day Streak</p>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border text-center">
          <Zap className="w-5 h-5 mx-auto text-primary mb-1" />
          <p className="text-xl font-bold text-foreground">{stats.points}</p>
          <p className="text-[10px] text-muted-foreground font-medium">Points</p>
        </div>
        <div className="bg-card rounded-xl p-3 border border-border text-center">
          <Target className="w-5 h-5 mx-auto text-info mb-1" />
          <p className="text-xl font-bold text-foreground">
            {stats.totalAttempted > 0 ? Math.round((stats.totalCorrect / stats.totalAttempted) * 100) : 0}%
          </p>
          <p className="text-[10px] text-muted-foreground font-medium">Accuracy</p>
        </div>
      </div>

      {/* Daily Practice CTA */}
      <button
        onClick={() => navigate('/practice?daily=true')}
        className={`w-full rounded-xl p-4 flex items-center justify-between transition-all ${
          dailyDone
            ? 'bg-muted border border-border'
            : 'bg-primary text-primary-foreground shadow-lg'
        }`}
      >
        <div className="text-left">
          <p className="font-bold text-base">{dailyDone ? '✅ Daily Practice Done!' : '🎯 Daily Practice'}</p>
          <p className={`text-xs mt-0.5 ${dailyDone ? 'text-muted-foreground' : 'opacity-90'}`}>
            {dailyDone ? 'Come back tomorrow' : '10 questions across all subjects'}
          </p>
        </div>
        {!dailyDone && <ChevronRight className="w-5 h-5" />}
      </button>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => navigate('/ai-tutor')}
          className="bg-card rounded-xl border border-border p-3 flex flex-col items-center gap-1.5"
        >
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="text-[10px] font-semibold text-foreground">AI Tutor</span>
        </button>
        <button
          onClick={() => navigate('/study-plan')}
          className="bg-card rounded-xl border border-border p-3 flex flex-col items-center gap-1.5"
        >
          <CalendarDays className="w-5 h-5 text-accent" />
          <span className="text-[10px] font-semibold text-foreground">Study Plan</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          className="bg-card rounded-xl border border-border p-3 flex flex-col items-center gap-1.5"
        >
          <User className="w-5 h-5 text-muted-foreground" />
          <span className="text-[10px] font-semibold text-foreground">Profile</span>
        </button>
      </div>

      {/* Subjects */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Subjects</h2>
        <div className="space-y-2.5">
          {subjects.map(sub => {
            const acc = getSubjectAccuracy(sub.id);
            return (
              <button
                key={sub.id}
                onClick={() => navigate(`/practice?subject=${sub.id}`)}
                className="w-full bg-card rounded-xl p-3.5 border border-border flex items-center gap-3 hover:bg-muted transition-colors text-left"
              >
                <span className="text-2xl">{sub.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {acc.attempted > 0 ? `${acc.percentage}% accuracy · ${acc.attempted} answered` : 'Not started'}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
      {/* Ad Banner */}
      <BannerAd />
    </div>
  );
}
