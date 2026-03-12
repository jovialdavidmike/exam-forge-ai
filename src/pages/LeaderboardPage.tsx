import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  username: string;
  points: number;
  quizzes_completed: number;
  user_id: string;
}

export default function LeaderboardPage() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username, points, quizzes_completed, user_id')
        .order('points', { ascending: false })
        .limit(50);
      if (data) setEntries(data as LeaderboardEntry[]);
      setLoading(false);
    };
    fetch();
  }, []);

  const medalColors = ['text-[hsl(var(--badge-gold))]', 'text-[hsl(var(--badge-silver))]', 'text-[hsl(var(--badge-bronze))]'];

  return (
    <div className="px-4 pt-6 pb-4 space-y-4">
      <div className="text-center space-y-1">
        <Trophy className="w-8 h-8 mx-auto text-accent" />
        <h1 className="text-xl font-extrabold text-foreground">Leaderboard</h1>
        <p className="text-sm text-muted-foreground">Top performers</p>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">Loading...</p>
      ) : entries.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">No entries yet. Start practicing!</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, i) => {
            const isMe = entry.user_id === user?.id;
            return (
              <div
                key={entry.user_id}
                className={`flex items-center gap-3 p-3 rounded-xl border ${
                  isMe ? 'bg-primary/5 border-primary/30' : 'bg-card border-border'
                }`}
              >
                <div className="w-8 text-center font-bold text-sm">
                  {i < 3 ? (
                    <Medal className={`w-5 h-5 mx-auto ${medalColors[i]}`} />
                  ) : (
                    <span className="text-muted-foreground">{i + 1}</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {entry.username} {isMe && <span className="text-primary">(You)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{entry.quizzes_completed} quizzes</p>
                </div>
                <p className="font-bold text-sm text-foreground">{entry.points} pts</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
