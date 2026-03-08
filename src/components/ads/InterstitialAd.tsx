import { useEffect } from 'react';
import { useAds } from '@/contexts/AdContext';
import { isMedianApp, showInterstitialAd } from '@/lib/median';
import { X } from 'lucide-react';

export default function InterstitialAd() {
  const { isPremium, showInterstitial, setShowInterstitial, markInterstitialShown } = useAds();

  useEffect(() => {
    // When triggered inside the native app, show a real interstitial via Median bridge
    if (showInterstitial && !isPremium && isMedianApp()) {
      showInterstitialAd();
      setShowInterstitial(false);
      markInterstitialShown();
    }
  }, [showInterstitial, isPremium, setShowInterstitial, markInterstitialShown]);

  // In the native app Median handles interstitial rendering — no fallback needed
  if (isPremium || !showInterstitial || isMedianApp()) return null;

  // Web-only fallback placeholder
  const handleClose = () => {
    setShowInterstitial(false);
    markInterstitialShown();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/80 flex items-center justify-center p-6">
      <div className="bg-card rounded-2xl border border-border w-full max-w-sm overflow-hidden shadow-2xl">
        <div className="aspect-[4/5] bg-secondary/30 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <span className="text-2xl">📢</span>
          </div>
          <p className="text-sm font-bold text-foreground mb-1">Sponsored Content</p>
          <p className="text-xs text-muted-foreground">
            This ad helps keep ExamForge free for all students
          </p>
          <div className="w-full h-32 bg-muted rounded-lg mt-4 flex items-center justify-center">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Ad Space (native only)</span>
          </div>
        </div>
        <div className="p-4 border-t border-border">
          <button
            onClick={handleClose}
            className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2.5 rounded-xl text-sm font-semibold"
          >
            <X className="w-4 h-4" />
            Close Ad
          </button>
        </div>
      </div>
    </div>
  );
}
