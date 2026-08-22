import React from 'react';
import NewsCard from './NewsCard';
import FeaturedCard from './FeaturedCard';
import { Newspaper, RefreshCw, SearchX, Sparkles, ChevronDown } from 'lucide-react';

export default function NewsGrid({
  articles = [],
  visibleCount = 12,
  onLoadMore,
  hasMore = false,
  searchTerm = '',
  activeFilter = '',
  onResetFilters
}) {
  if (!articles || articles.length === 0) {
    return (
      <div className="w-full my-12 p-8 sm:p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center mb-4 shadow-inner">
          <SearchX className="w-8 h-8" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold font-serif-editorial text-slate-900 dark:text-white mb-2">
          No news articles found
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mb-6">
          We couldn't find any stories matching {searchTerm ? `"${searchTerm}"` : `the "${activeFilter}" category`}. Try searching with different keywords or exploring all topics.
        </p>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold text-sm hover:bg-rose-600 dark:hover:bg-rose-600 dark:hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Filters & Search</span>
        </button>
      </div>
    );
  }

  // Articles to render up to visibleCount
  const visibleArticles = articles.slice(0, visibleCount);

  return (
    <section className="w-full my-6">
      
      {/* 3-Column Responsive Grid: 1 col on mobile, 2 col on tablet (md), 3 col on desktop (lg) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
        {visibleArticles.map((article, index) => {
          // Every 7th card (index 6, 13, 20...), render a wider 2-col FeaturedCard to break the grid rhythm
          const isFeaturedSlot = index > 0 && index % 7 === 0;

          if (isFeaturedSlot) {
            return (
              <FeaturedCard
                key={article.id || `feat-${index}`}
                article={article}
              />
            );
          }

          return (
            <NewsCard
              key={article.id || `card-${index}`}
              article={article}
            />
          );
        })}
      </div>

      {/* "Load More" Pagination Button */}
      {hasMore && (
        <div className="mt-12 mb-8 flex flex-col items-center justify-center">
          <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 mb-3">
            Showing {visibleArticles.length} of {articles.length} stories
          </div>
          <button
            onClick={onLoadMore}
            className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm sm:text-base border border-slate-200 dark:border-slate-700 hover:border-rose-500 dark:hover:border-rose-500 shadow-sm hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
          >
            <span>Load More Stories</span>
            <ChevronDown className="w-4 h-4 text-rose-600 dark:text-rose-400 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      )}

    </section>
  );
}
