import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, Star, Sparkles } from 'lucide-react';

export default function FeaturedCard({ article }) {
  const [imgError, setImgError] = useState(false);

  if (!article) return null;

  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'
    : article.image;

  return (
    <article className="col-span-1 md:col-span-2 group relative bg-gradient-to-br from-white via-slate-50/50 to-rose-50/20 dark:from-slate-900 dark:via-slate-900/90 dark:to-rose-950/20 rounded-[16px] border border-slate-200/90 dark:border-slate-800 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      
      <div className="grid grid-cols-1 sm:grid-cols-12 h-full items-stretch">
        
        {/* LEFT / TOP: IMAGE (IMAGE | CONTENT layout) */}
        <div className="sm:col-span-5 relative aspect-[16/10] sm:aspect-auto min-h-[220px] sm:min-h-full overflow-hidden bg-slate-900">
          <img
            src={displayImage}
            alt={article.title}
            onError={() => setImgError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Featured Spotlight Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow-md">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Editor's Pick</span>
          </div>

          {article.readTime && (
            <div className="absolute bottom-3 left-3 sm:hidden text-[11px] text-white/90 font-medium bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full">
              {article.readTime}
            </div>
          )}
        </div>

        {/* RIGHT / BOTTOM: CONTENT */}
        <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
          <div>
            {/* Category & Date */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-950/80 border border-rose-200 dark:border-rose-900/60">
                {article.category || 'Featured'}
              </span>

              {article.date && article.date !== 'null' && (
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
              )}
            </div>

            {/* Large Headline */}
            <h2 className="font-serif-editorial text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-200 leading-snug line-clamp-3 mb-3">
              {article.title}
            </h2>

            {/* Description */}
            {article.description && article.description.trim() !== '' && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                {article.description}
              </p>
            )}
          </div>

          {/* Read Story CTA */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
            <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300">
              <span>Read In-Depth Story</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-200" />
            </span>

            {article.readTime && (
              <span className="hidden sm:flex text-xs text-slate-400 dark:text-slate-500 items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </span>
            )}
          </div>

        </div>

      </div>

      {/* Whole Card Clickable Link */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`Read featured story: ${article.title}`}
      >
        <span className="sr-only">Read featured story</span>
      </a>

    </article>
  );
}
