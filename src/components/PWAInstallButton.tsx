import React, { useState } from 'react';
import { Download, Smartphone, X, Share, PlusSquare, CheckCircle2, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { DistinctionAppIcon } from './DistinctionAppIcon';

interface PWAInstallButtonProps {
  variant?: 'header' | 'banner' | 'compact';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'header',
  className = '',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  // If already installed and running in standalone mode, suppress the prompt
  if (isInstalled) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setInstallSuccess(true);
        setTimeout(() => setInstallSuccess(false), 4000);
      }
    } else if (isIOS) {
      setShowIOSGuide(true);
    } else {
      // General webapp fallback instructions
      setShowIOSGuide(true);
    }
  };

  const renderIOSModal = () => {
    if (!showIOSGuide) return null;

    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in"
        onClick={() => setShowIOSGuide(false)}
      >
        <div
          className="relative w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <DistinctionAppIcon size={32} className="shrink-0" />
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">
                  Install Distinction ZA
                </h3>
                <p className="text-[11px] text-slate-500 font-medium">
                  Add to Phone or Tablet Home Screen
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-3 text-xs text-slate-600">
            <p className="font-medium text-slate-700">
              Install Distinction ZA as a webapp on your device for instant offline access and full-screen learning:
            </p>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-xs">
                1
              </div>
              <div className="leading-snug">
                <span className="font-bold text-slate-800">Tap the Share icon</span>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <Share className="w-3.5 h-3.5 text-blue-600" />
                  <span>At the bottom or top of your Safari/Chrome browser.</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-xs">
                2
              </div>
              <div className="leading-snug">
                <span className="font-bold text-slate-800">Select "Add to Home Screen"</span>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                  <PlusSquare className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scroll down the menu and choose Add to Home Screen.</span>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div className="leading-snug">
                <span className="font-bold text-slate-800">Launch from Home Screen</span>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  The Distinction ZA icon will appear on your phone like a native app with fast offline lessons!
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowIOSGuide(false)}
            className="mt-5 w-full rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-md shadow-emerald-600/20"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    );
  };

  if (installSuccess) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300 animate-in fade-in">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        <span>Installed as Webapp!</span>
      </div>
    );
  }

  // Variant: Banner (e.g. at the top or in the learner dashboard)
  if (variant === 'banner') {
    return (
      <>
        <div className={`p-4 rounded-2xl bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white shadow-lg border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 ${className}`}>
          <div className="flex items-center gap-3">
            <DistinctionAppIcon size={40} className="shrink-0" />
            <div>
              <div className="font-extrabold text-sm flex items-center gap-2">
                <span>Install Distinction ZA Webapp</span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-300/30">
                  PWA Ready
                </span>
              </div>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                Install on your phone or computer for fast offline access, home screen icon, and zero app store downloads.
              </p>
            </div>
          </div>
          <button
            onClick={handleInstallClick}
            className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5 transition-all transform active:scale-95 shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install App</span>
          </button>
        </div>
        {renderIOSModal()}
      </>
    );
  }

  // Variant: Header (Compact button in top navigation bar)
  return (
    <>
      <button
        onClick={handleInstallClick}
        title="Install Distinction ZA webapp on your device"
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs border ${
          isInstallable
            ? 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 border-amber-300/60 shadow-amber-500/20 active:scale-95'
            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
        } ${className}`}
      >
        <Smartphone className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">Install Webapp</span>
        <span className="sm:hidden">Install</span>
      </button>
      {renderIOSModal()}
    </>
  );
};
