import React, { useState } from 'react';
import { Flame, TrendingUp, ArrowUpRight, CloudSun, Mail, CheckCircle2, ChevronRight, Calendar } from 'lucide-react';

export default function TrendingSidebar({ trendingArticles = [], onOpenSubscribe }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const top5 = trendingArticles.slice(0, 5);

  const handleQuickSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 2500);
    }
  };

  return (
    <aside className="w-full space-y-6">
      
      {/* 1. TRENDING NOW SECTION (01 - 05) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 sm:p-6 shadow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center shadow-xs">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight uppercase">
                Trending Now
              </h3>
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Most Read Today
              </p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-rose-500 live-pulse-dot"></span>
        </div>

        {/* List of 01 - 05 articles */}
        <div className="space-y-4">
          {top5.map((art, idx) => {
            const rankStr = `0${idx + 1}`;
            return (
              <a
                key={art.id || `trend-${idx}`}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5 pb-3.5 border-b border-slate-100 last:border-b-0 dark:border-slate-800/60 last:pb-0"
              >
                {/* Number indicator: 01, 02, etc. */}
                <span className="font-serif-editorial text-2xl font-black text-slate-300 dark:text-slate-700 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors shrink-0 w-8 leading-none mt-0.5">
                  {rankStr}
                </span>

                {/* Small Thumbnail */}
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100 dark:bg-slate-800 relative">
                  <img
                    src={art.image}
                    alt={art.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=300&q=80';
                    }}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Article Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif-editorial text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug line-clamp-2 mb-1">
                    {art.title}
                  </h4>
                  {art.date && (
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {art.date}
                    </span>
                  )}
                </div>
              </a>
            );
          })}
        </div>

      </div>

      {/* 2. LIVE MARKET SNAPSHOT */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-sm border border-slate-800">
        <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800 text-xs">
          <span className="font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            Global Markets
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            ● Markets Open
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
            <div className="text-[10px] text-slate-400 font-bold uppercase">NIFTY 50</div>
            <div className="font-mono font-bold text-xs sm:text-sm text-white mt-0.5">25,124</div>
            <div className="text-[10px] font-semibold text-emerald-400">+0.82%</div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
            <div className="text-[10px] text-slate-400 font-bold uppercase">SENSEX</div>
            <div className="font-mono font-bold text-xs sm:text-sm text-white mt-0.5">82,040</div>
            <div className="text-[10px] font-semibold text-emerald-400">+0.76%</div>
          </div>
          <div className="bg-slate-800/60 p-2.5 rounded-xl border border-slate-700/50">
            <div className="text-[10px] text-slate-400 font-bold uppercase">NASDAQ</div>
            <div className="font-mono font-bold text-xs sm:text-sm text-white mt-0.5">18,340</div>
            <div className="text-[10px] font-semibold text-emerald-400">+1.14%</div>
          </div>
        </div>
      </div>

      {/* 3. WEATHER WIDGET */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center">
              <CloudSun className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white">New Delhi, India</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Mostly Clear • AQI 54 (Good)</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display font-extrabold text-xl text-slate-900 dark:text-white">29°C</div>
            <div className="text-[10px] text-slate-400">H: 33° L: 24°</div>
          </div>
        </div>
      </div>

      {/* 4. NEWSLETTER FAST BOX */}
      <div className="bg-gradient-to-br from-rose-500 to-red-600 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none"></div>
        
        <div className="flex items-center gap-2 text-rose-100 text-xs font-bold uppercase tracking-wider mb-2">
          <Mail className="w-4 h-4" />
          <span>Editor's Morning Brief</span>
        </div>

        <h4 className="font-serif-editorial text-lg font-bold text-white mb-2 leading-tight">
          Start your morning smarter.
        </h4>
        <p className="text-xs text-rose-100/90 leading-relaxed mb-4">
          Get verified news highlights, geopolitical analysis, and markets breakdown delivered at 7:00 AM daily.
        </p>

        {subscribed ? (
          <div className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center text-xs font-bold flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>Thank you! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={handleQuickSubscribe} className="space-y-2">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs text-slate-900 bg-white rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-slate-950 hover:bg-black text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
            >
              Get Free Briefing
            </button>
          </form>
        )}
      </div>

    </aside>
  );
}
