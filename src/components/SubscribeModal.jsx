import React, { useState } from 'react';
import { X, Sparkles, Check, Mail, ShieldCheck, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubscribeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setIsSuccess(true);
    
    // Trigger celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      // keep success message visible
    }, 500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-6 sm:p-8 text-left shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSuccess ? (
            <div>
              {/* Top icon */}
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 text-white flex items-center justify-center shadow-lg shadow-rose-500/30 mb-5">
                <Mail className="w-6 h-6" />
              </div>

              {/* Title & description */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>NEWSHUB Premium Daily</span>
              </div>
              <h3 className="font-serif-editorial text-2xl font-extrabold text-slate-900 dark:text-white leading-snug">
                Stay ahead of the world with verified editorial journalism.
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Join over 250,000 discerning readers. Get in-depth investigative reports, real-time alerts, and curated morning digests.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                <div>
                  <label htmlFor="email-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-rose-600 focus:ring-rose-500" />
                    <span>Daily Morning Briefing (7:00 AM)</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-rose-600 focus:ring-rose-500" />
                    <span>Breaking News Real-Time Alerts</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 py-3 px-6 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold text-sm rounded-xl shadow-md shadow-rose-600/30 transition-all active:scale-98"
                >
                  Get Free Subscription
                </button>
              </form>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Zero spam. Unsubscribe anytime with 1-click.</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-slate-900 dark:text-white mb-2">
                Welcome to NEWSHUB!
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto mb-6">
                We've sent a welcome briefing to <strong className="text-slate-900 dark:text-white">{email}</strong>. Check your inbox to confirm!
              </p>
              <button
                onClick={handleClose}
                className="w-full py-2.5 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm rounded-xl transition-colors"
              >
                Back to News
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
