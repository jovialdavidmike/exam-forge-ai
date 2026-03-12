import { useState, useCallback, useEffect } from 'react';
import { Gift, Loader2, CheckCircle, Play } from 'lucide-react';

interface RewardButtonProps {
  label: string;
  onReward: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const COOLDOWN_MS = 30_000;
const AD_WAIT_MS = 3_000;

function loadVignetteAd() {
  // Dynamically inject the Monetag vignette script to trigger the ad
  const script = document.createElement('script');
  script.dataset.zone = '10708804';
  script.src = 'https://gizokraijaw.net/vignette.min.js';
  document.body.appendChild(script);
  // Clean up after load
  script.onload = () => {
    setTimeout(() => {
      try { document.body.removeChild(script); } catch {}
    }, 5000);
  };
}

export default function RewardButton({ label, onReward, icon, className = '' }: RewardButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'rewarded'>('idle');
  const [cooldown, setCooldown] = useState(0);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(t); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleClick = useCallback(() => {
    if (state !== 'idle' || cooldown > 0) return;

    setState('loading');

    // Trigger the Monetag vignette ad
    loadVignetteAd();

    // Wait for the ad duration, then grant reward
    setTimeout(() => {
      onReward();
      setState('rewarded');
      setCooldown(30);

      // Reset to idle after showing confirmation
      setTimeout(() => setState('idle'), 2500);
    }, AD_WAIT_MS);
  }, [state, cooldown, onReward]);

  const isDisabled = state !== 'idle' || cooldown > 0;

  return (
    <button
      onClick={handleClick}
      disabled={isDisabled}
      className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
        state === 'rewarded'
          ? 'bg-success/10 text-success border border-success/30'
          : isDisabled
          ? 'bg-muted text-muted-foreground border border-border cursor-not-allowed'
          : 'bg-primary text-primary-foreground shadow-md hover:opacity-90 active:scale-[0.98]'
      } ${className}`}
    >
      {state === 'loading' ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading reward...
        </>
      ) : state === 'rewarded' ? (
        <>
          <CheckCircle className="w-4 h-4" />
          Reward unlocked. Continue practicing.
        </>
      ) : cooldown > 0 ? (
        <>
          <Gift className="w-4 h-4" />
          Wait {cooldown}s
        </>
      ) : (
        <>
          {icon || <Play className="w-4 h-4" />}
          {label}
        </>
      )}
    </button>
  );
}
