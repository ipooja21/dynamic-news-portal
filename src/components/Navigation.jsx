import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Flame, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'Home', isHome: true },
  { id: 'latest', label: 'Latest', badge: 'New' },
  { id: 'India', label: 'India' },
  { id: 'World', label: 'World' },
  { id: 'Business', label: 'Business' },
  { id: 'Technology', label: 'Technology' },
  { id: 'Sports', label: 'Sports' },
  { id: 'Entertainment', label: 'Entertainment' },
  { id: 'Science', label: 'Science' },
  { id: 'trending', label: 'Trending', icon: Flame },
];

export default function Navigation({ activeCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full bg-white/80 dark:bg-[#0b0f19]/80 border-b border-slate-200/70 dark:border-slate-800/70 sticky top-16 sm:top-20 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Left Arrow Button for Desktop Scroll */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          aria-label="Scroll navigation left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2.5 scroll-smooth"
        >
          {CATEGORIES.map((cat) => {
            const isActive =
              (cat.id === 'all' && (activeCategory === 'All' || activeCategory === 'all')) ||
              (cat.id === 'latest' && activeCategory === 'Latest') ||
              (cat.id === 'trending' && activeCategory === 'Trending') ||
              activeCategory?.toLowerCase() === cat.id.toLowerCase();

            const Icon = cat.icon;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (cat.id === 'all') onSelectCategory('All');
                  else if (cat.id === 'latest') onSelectCategory('Latest');
                  else if (cat.id === 'trending') onSelectCategory('Trending');
                  else onSelectCategory(cat.label);
                }}
                className={`relative px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30 font-bold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                {Icon && <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-500'}`} />}
                <span>{cat.label}</span>
                {cat.badge && !isActive && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
                    {cat.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button for Desktop Scroll */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 z-10 w-7 h-7 items-center justify-center rounded-full bg-white/90 dark:bg-slate-800/90 shadow-md text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          aria-label="Scroll navigation right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
