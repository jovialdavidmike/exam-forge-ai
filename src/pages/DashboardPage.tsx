import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogOut, Trophy, Target, BookOpen, ChevronRight, CheckCircle, User, Pencil } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const { profile, signOut, loading, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const handleEditName = async () => {
    const name = newName.trim();
    if (name.length < 3 || name.length > 20) {
      toast({ title: 'Invalid name', description: 'Must be 3–20 characters.', variant: 'destructive' });
      return;
    }
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      toast({ title: 'Invalid name', description: 'Letters and numbers only.', variant: 'destructive' });
      return;
    }

    setSaving(true);
    // Check duplicate
    const { data: existing } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', name)
      .neq('user_id', profile?.user_id ?? '')
      .limit(1);

    if (existing && existing.length > 0) {
      toast({ title: 'Name taken', description: 'That display name is already in use.', variant: 'destructive' });
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ username: name })
      .eq('user_id', profile?.user_id ?? '');

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Display name updated successfully.' });
      await refreshProfile();
      setEditing(false);
    }
    setSaving(false);
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

      {/* Profile Settings */}
      <div className="bg-card rounded-xl p-4 border border-border space-y-3">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-bold text-sm text-foreground">Profile Settings</h2>
        </div>
        {editing ? (
          <div className="space-y-2">
            <Input
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="New display name"
              maxLength={20}
            />
            <p className="text-xs text-muted-foreground">3–20 characters, letters and numbers only</p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleEditName} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Display Name</p>
              <p className="font-semibold text-sm text-foreground">{profile?.username}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={() => { setNewName(profile?.username || ''); setEditing(true); }}>
              <Pencil className="w-4 h-4 mr-1" /> Edit
            </Button>
          </div>
        )}
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
          <p className="text-2xl font-bold text-foreground">{profile?.questions_answered ?? 0}</p>
          <p className="text-xs text-muted-foreground font-medium">Questions Answered</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <CheckCircle className="w-6 h-6 mx-auto text-success mb-2" />
          <p className="text-2xl font-bold text-foreground">{profile?.correct_answers ?? 0}</p>
          <p className="text-xs text-muted-foreground font-medium">Correct Answers</p>
        </div>
        <div className="bg-card rounded-xl p-4 border border-border text-center">
          <BookOpen className="w-6 h-6 mx-auto text-primary mb-2" />
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
