import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut, Trophy, Target, BookOpen, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  const { profile, signOut, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60dvh]">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-6 pb-4 space-y-6">
      {/* Welcome */}
      <div className="text-center space-y-1">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto text-2xl font-bold text-primary">
          {profile?.username?.charAt(0)?.toUpperCase() || '?'}
        </div>
        <h1 className="text-xl font-extrabold text-foreground">
          Welcome, {profile?.username || 'User'}!
        </h1>
        <p className="text-sm text-muted-foreground">Your learning dashboard</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <Trophy className="w-6 h-6 mx-auto text-accent mb-2" />
          <p className="text-2xl font-bold text-foreground">{profile?.points ?? 0}</p>
          <p className="text-xs text-muted-foreground font-medium">Total Points</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <Target className="w-6 h-6 mx-auto text-primary mb-2" />
          <p className="text-2xl font-bold text-foreground">{profile?.quizzes_completed ?? 0}</p>
          <p className="text-xs text-muted-foreground font-medium">Quizzes Done</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="space-y-2">
        <button
          onClick={() => navigate('/leaderboard')}
          className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-3 hover:bg-muted transition-colors"
        >
          <Trophy className="w-5 h-5 text-accent" />
          <span className="flex-1 text-left font-semibold text-sm text-foreground">Leaderboard</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
        <button
          onClick={() => navigate('/practice')}
          className="w-full bg-card rounded-xl p-4 border border-border flex items-center gap-3 hover:bg-muted transition-colors"
        >
          <BookOpen className="w-5 h-5 text-primary" />
          <span className="flex-1 text-left font-semibold text-sm text-foreground">Practice Now</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Logout */}
      <Button variant="outline" className="w-full" onClick={handleLogout}>
        <LogOut className="w-4 h-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
}
