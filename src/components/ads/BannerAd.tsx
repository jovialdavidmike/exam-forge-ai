import { useAds } from '@/contexts/AdContext';

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className = '' }: BannerAdProps) {
  const { isPremium } = useAds();
  if (isPremium) return null;

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-muted/50 border border-border rounded-lg px-3 py-2 text-center">
        {/* AdMob banner slot — replaced by native ad when wrapped */}
        <div
          id="admob-banner"
          className="w-full h-[50px] bg-secondary/50 rounded flex items-center justify-center"
        >
          <span className="text-[10px] text-muted-foreground font-medium tracking-wide uppercase">
            Ad Space
          </span>
        </div>
        <p className="text-[8px] text-muted-foreground mt-1">Advertisement</p>
      </div>
    </div>
  );
}
