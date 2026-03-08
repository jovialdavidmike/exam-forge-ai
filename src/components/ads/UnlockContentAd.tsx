import { useState } from 'react';
import { useAds } from '@/contexts/AdContext';
import { isMedianApp, showInterstitialAd } from '@/lib/median';
import { Lock, Play, X, CheckCircle } from 'lucide-react';

export default function UnlockContentAd() {
  const {
    isPremium, showUnlockAd, setShowUnlockAd,
    pendingUnlockTopicId, setPendingUnlockTopicId,
    unlockTopic,
  } = useAds();
  const [watching, setWatching] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  if (isPremium || !showUnlockAd || !pendingUnlockTopicId) return null;

  const handleWatch = () => {
    if (isMedianApp()) {
      showInterstitialAd();
      setUnlocked(true);
      unlockTopic(pendingUnlockTopicId);
    } else {
      setWatching(true);
      setTimeout(() => {
        setWatching(false);
        setUnlocked(true);
        unlockTopic(pendingUnlockTopicId);
      }, 3000);
    }
  };

  const handleClose = () => {
    setShowUnlockAd(false);
    setPendingUnlockTopicId(null);
    setUnlocked(false);
    setWatching(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/80 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl border border-border w-full max-w-sm overflow-hidden shadow-2xl">
        {unlocked ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Topic Unlocked! 🎉</h3>
            <p className="text-sm text-muted-foreground mb-6">
              You now have access to all notes and questions for this topic!
            </p>
            <button
              onClick={handleClose}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold"
            >
              Start Learning
            </button>
          </div>
        ) : watching ? (
          <div className="p-8 text-center">
            <div className="w-full aspect-video bg-secondary/30 rounded-xl flex flex-col items-center justify-center mb-4">
              <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-3" />
              <span className="text-xs text-muted-foreground">Playing ad...</span>
            </div>
            <p className="text-xs text-muted-foreground">Please wait while the ad plays</p>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-1">Premium Content 🔒</h3>
            <p className="text-sm text-muted-foreground mb-1">
              This topic includes advanced notes and questions.
            </p>
            <p className="text-xs text-muted-foreground mb-6">
              Watch a short video to <span className="font-semibold text-primary">unlock this topic for free</span>, or go premium for unlimited access.
            </p>
            <button
              onClick={handleWatch}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mb-3"
            >
              <Play className="w-4 h-4" />
              Watch Ad & Unlock
            </button>
            <button
              onClick={handleClose}
              className="w-full text-muted-foreground py-2 text-sm font-medium flex items-center justify-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
