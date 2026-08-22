import React from 'react';
import { X, ChevronRight, Sun, Moon, Sparkles, Mail, Globe, Bookmark, ShieldCheck, Heart } from 'lucide-react';

const DRAWER_LINKS = [
  { label: 'Home', category: 'All' },
  { label: 'Latest News', category: 'Latest' },
  { label: 'India', category: 'India' },
  { label: 'World', category: 'World' },
  { label: 'Business & Economy', category: 'Business' },
  { label: 'Technology & AI', category: 'Technology' },
  { label: 'Sports', category: 'Sports' },
  { label: 'Entertainment & Arts', category: 'Entertainment' },
  { label: 'Science & Health', category: 'Science' },
  { label: 'Opinion & Editorial', category: 'Opinion' },
  { label: 'Food & Lifestyle', category: 'Lifestyle' },
  { label: 'Education & Career', category: 'Education' }
];

export default function DrawerMenu({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  darkMode,
  toggleDarkMode,
  onOpenSubscribe
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slide-out Panel */}
      <div className="absolute inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-r border-slate-200 dark:border-slate-800 z-10 transition-transform duration-300">
        
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              N
            </div>
            <div>
              <div className="font-display font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                NEWS<span className="text-rose-600">HUB</span>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                Digital Edition
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="p-4 overflow-y-auto no-scrollbar flex-1 space-y-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            News Sections
          </div>

          {DRAWER_LINKS.map((link) => {
            const isActive = activeCategory?.toLowerCase() === link.category.toLowerCase();
            return (
              <button
                key={link.label}
                onClick={() => {
                  onSelectCategory(link.category);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              </button>
            );
          })}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 my-2 px-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Preferences
            </div>
            
            {/* Dark Mode in Drawer */}
            <button
              onClick={toggleDarkMode}
              className="w-full flex items-center justify-between py-2 text-sm text-slate-700 dark:text-slate-300 hover:text-rose-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
                Theme
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                {darkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenSubscribe();
            }}
            className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Join Premium Membership</span>
          </button>
          <div className="text-center text-[11px] text-slate-400">
            © 2026 NewsHub Media Network
          </div>
        </div>

      </div>
    </div>
  );
}
