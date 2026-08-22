import React, { useState, useEffect } from 'react';
import { Menu, Search, Sun, Moon, Bell, Bookmark, Globe, Sparkles, X } from 'lucide-react';

export default function Header({
  darkMode,
  toggleDarkMode,
  onOpenDrawer,
  onOpenSubscribe,
  onToggleSearch,
  isSearchOpen,
  searchTerm,
  setSearchTerm,
  totalArticlesCount
}) {
  const [currentDate, setCurrentDate] = useState('');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Format date: Saturday, August 22, 2026
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-[#0b0f19]/95 shadow-md backdrop-blur-md border-b border-slate-200 dark:border-slate-800' 
        : 'bg-white dark:bg-[#0b0f19] border-b border-slate-200/80 dark:border-slate-800/80'
    }`}>
      {/* Top Editorial Bar */}
      <div className="hidden lg:block border-b border-slate-100 dark:border-slate-800/60 py-1.5 bg-slate-50/70 dark:bg-slate-900/40 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 live-pulse-dot"></span>
              LIVE EDITION
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>{currentDate || 'Saturday, August 22, 2026'}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              New Delhi & Global
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600 dark:text-slate-300 font-medium">
              Verified Stories: <strong className="text-rose-600 dark:text-rose-400">{totalArticlesCount || 48}</strong>
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <button 
              onClick={onOpenSubscribe} 
              className="hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-1 font-medium"
            >
              <Sparkles className="w-3 h-3 text-amber-500" />
              Daily Morning Briefing
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* LEFT: Hamburger Menu & Brand Title */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1">
            <button
              onClick={onOpenDrawer}
              className="p-2 -ml-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a href="#" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                N
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white leading-none">
                  NEWS<span className="text-rose-600 dark:text-rose-500">HUB</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-widest text-slate-400 dark:text-slate-500 mt-0.5 hidden sm:block">
                  The Editorial Standard
                </span>
              </div>
            </a>
          </div>

          {/* CENTER: Prominent Newspaper Title (Hidden on small screens) */}
          <div className="hidden md:flex flex-col items-center justify-center flex-1 text-center">
            <div className="font-serif-editorial text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
              NEWSHUB
            </div>
            <div className="text-[11px] font-medium tracking-wider text-slate-500 dark:text-slate-400 uppercase">
              Truth • Clarity • Perspective
            </div>
          </div>

          {/* RIGHT: Actions (Search, Dark Mode, Subscribe) */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-3 flex-1">
            {/* Search Trigger */}
            <button
              onClick={onToggleSearch}
              className={`p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all ${
                isSearchOpen ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400' : ''
              }`}
              aria-label="Toggle Search"
              title="Search news"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all focus:outline-none"
              aria-label="Toggle theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 transition-transform rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Subscribe Button */}
            <button
              onClick={onOpenSubscribe}
              className="relative inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-xl shadow-md shadow-rose-600/25 hover:shadow-lg hover:shadow-rose-600/35 transition-all duration-200 active:scale-95"
            >
              <span className="hidden sm:inline">Subscribe</span>
              <span className="sm:hidden">Join</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
