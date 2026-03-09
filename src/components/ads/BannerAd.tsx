import { useEffect, useRef } from 'react';
import { useAds } from '@/contexts/AdContext';

interface BannerAdProps {
  className?: string;
}

export default function BannerAd({ className = '' }: BannerAdProps) {
  const { isPremium } = useAds();
  const adRef = useRef<HTMLDivElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    if (isPremium || adPushed.current) return;

    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      adPushed.current = true;
    } catch (e) {
      console.warn('AdSense push failed:', e);
    }
  }, [isPremium]);

  if (isPremium) return null;

  return (
    <div className={`w-full ${className}`} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-4174682271524746"
        data-ad-slot="YOUR_AD_SLOT_ID"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
