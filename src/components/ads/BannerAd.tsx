import { useEffect, useRef } from 'react';
import { useAds } from '@/contexts/AdContext';

interface BannerAdProps {
  className?: string;
  zone?: string;
}

export default function BannerAd({ className = '', zone }: BannerAdProps) {
  const { isPremium } = useAds();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Monetag ads are injected globally via the meta tag;
    // this container acts as a tracking placeholder per screen.
    // If Monetag provides a zone-specific script in the future,
    // it can be appended here.
  }, [isPremium]);

  if (isPremium) return null;

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-[50px] flex items-center justify-center ${className}`}
      data-monetag-zone={zone}
    >
      {/* Monetag fills ad slots globally; this div reserves space */}
    </div>
  );
}
