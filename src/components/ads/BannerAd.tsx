import { useEffect } from 'react';
import { useAds } from '@/contexts/AdContext';
import { isMedianApp, enableBannerAd, disableBannerAd } from '@/lib/median';

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className = '' }: BannerAdProps) {
  const { isPremium } = useAds();

  useEffect(() => {
    if (isPremium) {
      disableBannerAd();
    } else {
      enableBannerAd();
    }

    return () => {
      disableBannerAd();
    };
  }, [isPremium]);

  // In the native app, Median renders the banner ad natively at the bottom.
  // We only show a placeholder in the web preview (non-Median environment).
  if (isPremium) return null;
  if (isMedianApp()) return null; // Median handles banner rendering natively

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-center">
        <div className="w-full h-[50px] bg-secondary/50 rounded flex items-center justify-center">
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
            Ad Space (native only)
          </span>
        </div>
        <p className="text-[8px] text-muted-foreground mt-1">Advertisement</p>
      </div>
    </div>
  );
}
