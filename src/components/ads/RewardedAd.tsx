import { useState } from 'react';
import { useAds } from '@/contexts/AdContext';
import { Gift, Play, X, CheckCircle } from 'lucide-react';

export default function RewardedAd() {
  const { isPremium, showRewardedAd, setShowRewardedAd, addBonusQuestions } = useAds();
  const [watching, setWatching] = useState(false);
  const [rewarded, setRewarded] = useState(false);

  if (isPremium || !showRewardedAd) return null;

  const handleWatch = () => {
    setWatching(true);
    // Simulate ad watching (in real native app, AdMob SDK handles this)
    setTimeout(() => {
      setWatching(false);
      setRewarded(true);
      addBonusQuestions(5);
    }, 3000);
  };

  const handleClose = () => {
    setShowRewardedAd(false);
    setRewarded(false);
    setWatching(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/80 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl border border-border w-full max-w-sm overflow-hidden shadow-2xl">
        {rewarded ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Reward Unlocked! 🎉</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You've earned <span className="font-bold text-primary">5 bonus questions</span> and AI explanations!
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold"
            >
              Continue Practicing
            </button>
          </div>
        ) : watching ? (
          <div className="p-8 text-center">
            <div id="admob-rewarded" className="w-full aspect-video bg-secondary/30 rounded-xl flex flex-col items-center justify-center mb-4">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-3" />
              <span className="text-xs text-muted-foreground">Playing ad...</span>
            </div>
            <p className="text-xs text-muted-foreground">Please wait while the ad plays</p>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
              <Gift className="w-7 h-7 text-accent" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Earn a Reward!</h3>
            <p className="text-sm text-muted-foreground mb-1">
              You've answered <span className="font-bold text-foreground">10 questions</span>! 🔥
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Watch a short video to unlock <span className="font-semibold text-primary">5 bonus questions</span> + AI explanations
            </p>
            <button
              onClick={handleWatch}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-3"
            >
              <Play className="w-4 h-4" />
              Watch Ad & Earn Reward
            </button>
            <button
              onClick={handleClose}
              className="w-full text-muted-foreground py-2 text-sm font-medium flex items-center justify-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Skip
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
