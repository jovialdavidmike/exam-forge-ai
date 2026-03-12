import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AdContextType {
  isPremium: boolean;
  setPremium: (v: boolean) => void;
  // Rewarded ads
  questionsAnswered: number;
  incrementQuestions: () => void;
  resetQuestions: () => void;
  showRewardedAd: boolean;
  setShowRewardedAd: (v: boolean) => void;
  bonusQuestions: number;
  addBonusQuestions: (n: number) => void;
  useBonusQuestion: () => void;
  // AI generations
  bonusAIGenerations: number;
  addBonusAIGenerations: (n: number) => void;
  useBonusAIGeneration: () => boolean;
  // Interstitial
  interstitialShownThisSession: boolean;
  markInterstitialShown: () => void;
  showInterstitial: boolean;
  setShowInterstitial: (v: boolean) => void;
  // Content unlocking
  unlockedTopics: string[];
  unlockTopic: (topicId: string) => void;
  isTopicUnlocked: (topicId: string) => boolean;
  showUnlockAd: boolean;
  setShowUnlockAd: (v: boolean) => void;
  pendingUnlockTopicId: string | null;
  setPendingUnlockTopicId: (id: string | null) => void;
}

const UNLOCKED_KEY = 'examforge_unlocked_topics';

function getStoredUnlocked(): string[] {
  try {
    const raw = localStorage.getItem(UNLOCKED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

const AdContext = createContext<AdContextType | null>(null);

export function useAds() {
  const ctx = useContext(AdContext);
  if (!ctx) throw new Error('useAds must be inside AdProvider');
  return ctx;
}

export function AdProvider({ children }: { children: ReactNode }) {
  const [isPremium, setPremium] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [showRewardedAd, setShowRewardedAd] = useState(false);
  const [bonusQuestions, setBonusQuestions] = useState(0);
  const [interstitialShownThisSession, setInterstitialShown] = useState(false);
  const [showInterstitial, setShowInterstitial] = useState(false);
  const [unlockedTopics, setUnlockedTopics] = useState<string[]>(getStoredUnlocked());
  const [showUnlockAd, setShowUnlockAd] = useState(false);
  const [pendingUnlockTopicId, setPendingUnlockTopicId] = useState<string | null>(null);
  const [bonusAIGenerations, setBonusAIGenerations] = useState(0);

  const addBonusAIGenerations = useCallback((n: number) => {
    setBonusAIGenerations(prev => prev + n);
  }, []);

  const useBonusAIGeneration = useCallback(() => {
    if (bonusAIGenerations <= 0) return false;
    setBonusAIGenerations(prev => prev - 1);
    return true;
  }, [bonusAIGenerations]);

  const incrementQuestions = useCallback(() => {
    setQuestionsAnswered(prev => {
      const next = prev + 1;
      if (next > 0 && next % 10 === 0) {
        setShowRewardedAd(true);
      }
      return next;
    });
  }, []);

  const resetQuestions = useCallback(() => setQuestionsAnswered(0), []);

  const addBonusQuestions = useCallback((n: number) => {
    setBonusQuestions(prev => prev + n);
  }, []);

  const useBonusQuestion = useCallback(() => {
    setBonusQuestions(prev => Math.max(0, prev - 1));
  }, []);

  const markInterstitialShown = useCallback(() => {
    setInterstitialShown(true);
  }, []);

  const unlockTopic = useCallback((topicId: string) => {
    setUnlockedTopics(prev => {
      if (prev.includes(topicId)) return prev;
      const next = [...prev, topicId];
      localStorage.setItem(UNLOCKED_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isTopicUnlocked = useCallback((topicId: string) => {
    return isPremium || unlockedTopics.includes(topicId);
  }, [isPremium, unlockedTopics]);

  return (
    <AdContext.Provider value={{
      isPremium, setPremium,
      questionsAnswered, incrementQuestions, resetQuestions,
      showRewardedAd, setShowRewardedAd,
      bonusQuestions, addBonusQuestions, useBonusQuestion,
      interstitialShownThisSession, markInterstitialShown,
      showInterstitial, setShowInterstitial,
      unlockedTopics, unlockTopic, isTopicUnlocked,
      showUnlockAd, setShowUnlockAd,
      pendingUnlockTopicId, setPendingUnlockTopicId,
    }}>
      {children}
    </AdContext.Provider>
  );
}
