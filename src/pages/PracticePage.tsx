import { useState, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, Bookmark, Lock } from 'lucide-react';
import { questions as allQuestions, subjects } from '@/data/questions';
import { recordAttempt, markDailyComplete, toggleBookmark, getBookmarks } from '@/data/store';
import { useAds } from '@/contexts/AdContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export default function PracticePage() {
  const [searchParams] = useSearchParams();
  const { user, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const subjectId = searchParams.get('subject');
  const isDaily = searchParams.get('daily') === 'true';

  const { incrementQuestions, interstitialShownThisSession, setShowInterstitial, isPremium, isTopicUnlocked } = useAds();

  const questionSet = useMemo(() => {
    let pool = allQuestions;

    // Filter out premium questions the user hasn't unlocked
    if (!isPremium) {
      pool = pool.filter(q => !q.premium || isTopicUnlocked(q.topic));
    }

    if (subjectId) {
      pool = pool.filter(q => q.subject === subjectId);
    }

    // Deduplicate by ID
    const seen = new Set<string>();
    pool = pool.filter(q => {
      if (seen.has(q.id)) return false;
      seen.add(q.id);
      return true;
    });

    // Shuffle using Fisher-Yates for true randomness
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    if (isDaily) {
      return shuffled.slice(0, 10);
    }
    return shuffled;
  }, [subjectId, isDaily, isPremium, isTopicUnlocked]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(getBookmarks());

  const current = questionSet[currentIdx];
  const answered = selectedOption !== null;
  const isCorrect = selectedOption === current?.correctIndex;

  const subjectName = subjectId ? subjects.find(s => s.id === subjectId)?.name : isDaily ? 'Daily Practice' : 'All Subjects';

  const handleSelect = useCallback(async (idx: number) => {
    if (answered) return;
    setSelectedOption(idx);
    const correct = idx === current.correctIndex;
    if (correct) setScore(prev => prev + 1);
    recordAttempt(current.id, current.subject, current.topic, correct);
    incrementQuestions();

    // Sync to Supabase via secure RPC
    if (user) {
      await supabase.rpc('update_user_stats', {
        p_user_id: user.id,
        p_points_to_add: correct ? 3 : 0,
        p_questions_to_add: 1,
        p_correct_to_add: correct ? 1 : 0,
        p_quizzes_to_add: 0,
      });
      refreshProfile();
    }
  }, [answered, current, incrementQuestions, user, refreshProfile]);

  const handleNext = useCallback(() => {
    if (currentIdx + 1 >= questionSet.length) {
      if (isDaily) markDailyComplete();
      setFinished(true);
      if (!interstitialShownThisSession) {
        setShowInterstitial(true);
      }
    } else {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
    }
  }, [currentIdx, questionSet.length, isDaily, interstitialShownThisSession, setShowInterstitial]);

  if (!current && !finished) {
    return (
      <div className="px-4 pt-6 text-center">
        <p className="text-muted-foreground">No questions available.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-primary font-semibold">Go Home</button>
      </div>
    );
  }

  if (finished) {
    const pct = Math.round((score / questionSet.length) * 100);
    return (
      <div className="px-4 pt-12 flex flex-col items-center text-center">
        <div className="animate-score-pop">
          <p className="text-6xl mb-4">{pct >= 70 ? '🎉' : pct >= 50 ? '💪' : '📚'}</p>
          <h2 className="text-2xl font-extrabold text-foreground">{pct}% Score</h2>
        </div>
        <p className="text-muted-foreground mt-2">{score}/{questionSet.length} correct answers</p>
        <p className="text-sm text-muted-foreground mt-1">
          {pct >= 70 ? 'Excellent work! Keep it up!' : pct >= 50 ? 'Good effort! Review the topics you missed.' : 'Keep practicing! Review the explanations carefully.'}
        </p>
        <div className="mt-8 space-y-3 w-full">
          <button onClick={() => navigate('/')} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold">
            Back to Home
          </button>
          <button onClick={() => { setCurrentIdx(0); setSelectedOption(null); setScore(0); setFinished(false); }} className="w-full bg-secondary text-secondary-foreground py-3 rounded-xl font-semibold">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const optionLabels = ['A', 'B', 'C', 'D'];
  const difficultyColor = current.difficulty === 'easy' ? 'text-success' : current.difficulty === 'medium' ? 'text-accent' : 'text-destructive';

  return (
    <div className="px-4 pt-4 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => navigate(-1)} className="text-muted-foreground">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground font-medium">{subjectName}</p>
          <p className="text-[10px] text-muted-foreground">
            {current.topic} · <span className={`font-semibold ${difficultyColor}`}>{current.difficulty}</span>
          </p>
        </div>
        <button
          onClick={() => { toggleBookmark(current.id); setBookmarks(getBookmarks()); }}
          className="p-1.5"
        >
          <Bookmark className={`w-4.5 h-4.5 ${bookmarks.includes(current.id) ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
        </button>
        <span className="text-xs font-bold text-foreground bg-secondary px-2.5 py-1 rounded-full">
          {currentIdx + 1}/{questionSet.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-secondary rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questionSet.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <h2 className="text-base font-bold text-foreground leading-relaxed mb-6">{current.question}</h2>

      {/* Options */}
      <div className="space-y-3">
        {current.options.map((option, idx) => {
          let cls = 'bg-card border-border';
          if (answered) {
            if (idx === current.correctIndex) cls = 'bg-success/10 border-success';
            else if (idx === selectedOption) cls = 'bg-destructive/10 border-destructive';
          } else {
            cls = 'bg-card border-border active:bg-muted';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={answered}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 text-left transition-all ${cls}`}
            >
              <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                answered && idx === current.correctIndex
                  ? 'bg-success text-success-foreground'
                  : answered && idx === selectedOption
                  ? 'bg-destructive text-destructive-foreground'
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {optionLabels[idx]}
              </span>
              <span className="text-sm font-medium text-foreground flex-1">{option}</span>
              {answered && idx === current.correctIndex && <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />}
              {answered && idx === selectedOption && idx !== current.correctIndex && <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {answered && (
        <div className={`mt-5 p-4 rounded-xl border ${isCorrect ? 'bg-success/5 border-success/30' : 'bg-destructive/5 border-destructive/30'}`}>
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? <CheckCircle className="w-4 h-4 text-success" /> : <XCircle className="w-4 h-4 text-destructive" />}
            <span className={`text-sm font-bold ${isCorrect ? 'text-success' : 'text-destructive'}`}>
              {isCorrect ? 'Correct! +3 pts' : 'Incorrect'}
            </span>
          </div>
          <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">{current.explanation}</p>
        </div>
      )}

      {/* Next button */}
      {answered && (
        <button
          onClick={handleNext}
          className="w-full mt-5 bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2"
        >
          {currentIdx + 1 >= questionSet.length ? 'See Results' : 'Next Question'}
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
