import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Loader2, CheckCircle, Lightbulb } from 'lucide-react';
import { subjects } from '@/data/questions';
import { getWeakTopics } from '@/data/store';

interface PlanDay {
  day: number;
  date: string;
  subject: string;
  topic: string;
  duration: string;
  tasks: string[];
}

interface StudyPlan {
  totalDays: number;
  plan: PlanDay[];
  tips: string[];
  error?: string;
}

const PLAN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/study-plan`;

export default function StudyPlanPage() {
  const navigate = useNavigate();
  const [examDate, setExamDate] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(['mathematics', 'english', 'biology', 'chemistry']);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const weakTopics = getWeakTopics();

  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const generatePlan = async () => {
    if (!examDate) { setError('Please select your exam date'); return; }
    if (selectedSubjects.length === 0) { setError('Select at least one subject'); return; }
    
    const examDateObj = new Date(examDate);
    if (examDateObj <= new Date()) { setError('Exam date must be in the future'); return; }

    setLoading(true);
    setError('');
    setPlan(null);

    try {
      const { supabase } = await import('@/integrations/supabase/client');
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setError('Please sign in to generate a study plan.');
        setLoading(false);
        return;
      }

      const resp = await fetch(PLAN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          examDate,
          subjects: selectedSubjects.map(id => subjects.find(s => s.id === id)?.name || id),
          weakTopics: weakTopics.map(t => t.topic),
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        setError(err.error || 'Failed to generate plan. Try again.');
        setLoading(false);
        return;
      }

      const data = await resp.json();
      if (data.error) {
        setError(data.error);
      } else {
        setPlan(data);
      }
    } catch {
      setError('Network error. Check your connection.');
    }
    setLoading(false);
  };

  return (
    <div className="px-4 pt-4 pb-4 space-y-5">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-extrabold text-foreground">Study Plan</h1>
          <p className="text-xs text-muted-foreground">AI-generated daily schedule</p>
        </div>
      </div>

      {!plan && (
        <>
          {/* Exam date */}
          <div>
            <label className="text-sm font-semibold text-foreground block mb-2">
              <Calendar className="w-4 h-4 inline mr-1.5" />
              Exam Date
            </label>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
              className="w-full bg-card border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Subject selection */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-2">Subjects</p>
            <div className="flex flex-wrap gap-2">
              {subjects.map(sub => {
                const active = selectedSubjects.includes(sub.id);
                return (
                  <button
                    key={sub.id}
                    onClick={() => toggleSubject(sub.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      active ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-foreground border-border'
                    }`}
                  >
                    <span>{sub.icon}</span>
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {weakTopics.length > 0 && (
            <div className="bg-warning/5 border border-warning/20 rounded-xl p-3">
              <p className="text-xs font-semibold text-foreground mb-1">⚠️ Weak topics detected</p>
              <p className="text-[10px] text-muted-foreground">
                {weakTopics.map(t => t.topic).join(', ')} — these will be prioritized in your plan.
              </p>
            </div>
          )}

          {error && (
            <p className="text-sm text-destructive font-medium">{error}</p>
          )}

          <button
            onClick={generatePlan}
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Study Plan'
            )}
          </button>
        </>
      )}

      {plan && !plan.error && (
        <div className="space-y-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-center">
            <p className="text-sm font-bold text-foreground">{plan.totalDays}-Day Study Plan</p>
            <p className="text-[10px] text-muted-foreground">{plan.plan.length} days planned</p>
          </div>

          {plan.plan.map((day, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-3.5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-primary">Day {day.day}</span>
                <span className="text-[10px] text-muted-foreground">{day.date}</span>
              </div>
              <p className="text-sm font-bold text-foreground">{day.subject}: {day.topic}</p>
              <p className="text-[10px] text-muted-foreground mb-2">⏱ {day.duration}</p>
              <div className="space-y-1">
                {day.tasks.map((task, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-foreground">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {plan.tips && plan.tips.length > 0 && (
            <div className="bg-card border border-border rounded-xl p-3.5">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                <p className="text-sm font-bold text-foreground">Tips</p>
              </div>
              <ul className="space-y-1">
                {plan.tips.map((tip, i) => (
                  <li key={i} className="text-xs text-muted-foreground">• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={() => setPlan(null)}
            className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-semibold"
          >
            Generate New Plan
          </button>
        </div>
      )}
    </div>
  );
}
