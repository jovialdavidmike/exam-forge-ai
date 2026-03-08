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
  // Interstitial
  interstitialShownThisSession: boolean;
  markInterstitialShown: () => void;
  showInterstitial: boolean;
  setShowInterstitial: (v: boolean) => void;
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

  return (
    <AdContext.Provider value={{
      isPremium, setPremium,
      questionsAnswered, incrementQuestions, resetQuestions,
      showRewardedAd, setShowRewardedAd,
      bonusQuestions, addBonusQuestions, useBonusQuestion,
      interstitialShownThisSession, markInterstitialShown,
      showInterstitial, setShowInterstitial,
    }}>
      {children}
    </AdContext.Provider>
  );
}
