import React from 'react';
import { Globe, Shield, Send, ArrowUp, Sparkles, Heart } from 'lucide-react';

export default function Footer({ onSelectCategory }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', cat: 'All' },
    { label: 'Latest', cat: 'Latest' },
    { label: 'India', cat: 'India' },
    { label: 'World', cat: 'World' },
    { label: 'Business', cat: 'Business' },
    { label: 'Technology', cat: 'Technology' },
    { label: 'Sports', cat: 'Sports' },
    { label: 'Entertainment', cat: 'Entertainment' },
    { label: 'Science', cat: 'Science' },
  ];

  return (
    <footer className="w-full bg-slate-900 dark:bg-[#070a11] text-slate-300 border-t border-slate-800 transition-colors">
      
      {/* Upper Footer: Branding & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column (Col 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-rose-500/20">
                N
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                NEWS<span className="text-rose-500">HUB</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Latest news, stories and updates in one place. Delivering verified journalism, geopolitical insights, and objective reporting around the clock.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 live-pulse-dot"></span>
                Global News Desk Live
              </span>
              <span>•</span>
              <span>Updated 24/7</span>
            </div>
          </div>

          {/* Editorial Sections (Col 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              News Sections
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      onSelectCategory(link.cat);
                      scrollToTop();
                    }}
                    className="text-slate-400 hover:text-rose-400 transition-colors py-1 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Legal (Col 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#" className="hover:text-rose-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Editorial Standards</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-rose-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Live Feeds & Back to Top (Col 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Direct Data Source
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/60 text-xs space-y-2">
              <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-rose-400" />
                Live Google Sheets Feed
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                All articles are dynamically synced from Google Sheets with real-time updates and zero static stubs.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors pt-1"
            >
              <ArrowUp className="w-4 h-4 text-rose-500" />
              <span>Back to top of page</span>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Attribution */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © 2026 NewsHub. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Terms</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Sitemap</a>
            <span>•</span>
            <span className="text-slate-500">Live Edition 2026</span>
          </div>
        </div>
      </div>

    </footer>
  );
}
