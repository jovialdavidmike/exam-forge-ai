// Median.co JavaScript Bridge helpers
// These only work inside a Median native app wrapper

declare global {
  interface Window {
    median?: {
      admob?: {
        banner: {
          enable: () => void;
          disable: () => void;
        };
        showInterstitialIfReady: () => void;
        showInterstitialOnNextPageLoadIfReady: () => void;
        request?: {
          tracking: (opts: { callback: (result: any) => void }) => void;
        };
      };
    };
  }
}

export function isMedianApp(): boolean {
  return typeof window !== 'undefined' && !!window.median;
}

export function enableBannerAd() {
  window.median?.admob?.banner.enable();
}

export function disableBannerAd() {
  window.median?.admob?.banner.disable();
}

export function showInterstitialAd() {
  window.median?.admob?.showInterstitialIfReady();
}

export function showInterstitialOnNextPage() {
  window.median?.admob?.showInterstitialOnNextPageLoadIfReady();
}
