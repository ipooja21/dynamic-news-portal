import React, { useRef, useEffect } from 'react';
import { Search, X, Sparkles } from 'lucide-react';

const SUGGESTIONS = ['AI', 'Cricket', 'Chennai', 'Trump', 'Economy', 'Science', 'Election'];

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  resultsCount,
  totalCount,
  isOpen,
  onClose
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={`w-full transition-all duration-300 ${
      isOpen ? 'opacity-100 max-h-48 py-4 mb-4' : 'opacity-0 max-h-0 overflow-hidden py-0 mb-0 pointer-events-none'
    }`}>
      <div className="bg-slate-100/90 dark:bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 backdrop-blur-md shadow-lg">
        
        {/* Main Search Input */}
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search verified news by headline, keyword, entity or topic (e.g. AI, Cricket, Trump, Tech)..."
            className="w-full pl-12 pr-24 py-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500/40 focus:border-rose-500 text-sm sm:text-base font-medium shadow-sm transition-all"
          />
          
          <div className="absolute right-3 flex items-center gap-1.5">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips & Results Feedback */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Trending queries:
            </span>
            {SUGGESTIONS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchTerm(tag)}
                className={`px-2.5 py-1 rounded-lg border transition-colors ${
                  searchTerm.toLowerCase() === tag.toLowerCase()
                    ? 'bg-rose-600 text-white border-rose-600 font-semibold'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-500 hover:text-rose-600'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {searchTerm.trim() && (
            <div className="font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
              <span className="text-rose-600 dark:text-rose-400">{resultsCount}</span> {resultsCount === 1 ? 'result' : 'results'} found
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
