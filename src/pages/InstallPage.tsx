import { useState, useEffect } from 'react';
import { Download, Smartphone, Share, MoreVertical, CheckCircle } from 'lucide-react';

export default function InstallPage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
  };

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  if (isInstalled) {
    return (
      <div className="px-4 pt-12 text-center">
        <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold text-foreground mb-2">Already Installed!</h1>
        <p className="text-muted-foreground">ExamForge is on your home screen. Open it anytime!</p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-8 pb-24">
      <div className="text-center mb-8">
        <Smartphone className="w-14 h-14 text-primary mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold text-foreground mb-2">Install ExamForge</h1>
        <p className="text-muted-foreground text-sm">Add to your home screen for the best experience — works offline!</p>
      </div>

      {deferredPrompt && (
        <button
          onClick={handleInstall}
          className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 mb-8"
        >
          <Download className="w-5 h-5" />
          Install Now
        </button>
      )}

      {isAndroid && !deferredPrompt && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <MoreVertical className="w-5 h-5 text-primary" />
            Android Instructions
          </h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Tap the <strong className="text-foreground">⋮ menu</strong> (three dots) in Chrome</li>
            <li>2. Select <strong className="text-foreground">"Add to Home Screen"</strong></li>
            <li>3. Tap <strong className="text-foreground">"Install"</strong></li>
          </ol>
        </div>
      )}

      {isIOS && (
        <div className="bg-card border border-border rounded-xl p-5 mb-6">
          <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Share className="w-5 h-5 text-primary" />
            iPhone / iPad Instructions
          </h3>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Tap the <strong className="text-foreground">Share</strong> button (square with arrow)</li>
            <li>2. Scroll down and tap <strong className="text-foreground">"Add to Home Screen"</strong></li>
            <li>3. Tap <strong className="text-foreground">"Add"</strong></li>
          </ol>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-bold text-foreground text-sm">Why install?</h3>
        {['Works offline — study without internet', 'Launches instantly from home screen', 'Full-screen experience like a real app', 'Free — no app store needed'].map((text, i) => (
          <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
            <span>{text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
