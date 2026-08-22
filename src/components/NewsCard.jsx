import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, ExternalLink, Bookmark, Share2 } from 'lucide-react';

const CATEGORY_COLORS = {
  Technology: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900/60',
  Business: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-900/60',
  World: 'text-sky-700 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/50 border-sky-200 dark:border-sky-900/60',
  India: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-900/60',
  Sports: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/60',
  Entertainment: 'text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900/60',
  Science: 'text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/50 border-teal-200 dark:border-teal-900/60',
  Education: 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900/60',
  Opinion: 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700',
  Lifestyle: 'text-orange-700 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/50 border-orange-200 dark:border-orange-900/60',
  Default: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-900/60',
};

export default function NewsCard({ article }) {
  const [imgError, setImgError] = useState(false);

  if (!article) return null;

  const categoryStyle = CATEGORY_COLORS[article.category] || CATEGORY_COLORS.Default;

  // Fallback image url
  const displayImage = imgError
    ? 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'
    : article.image;

  return (
    <article className="group h-full flex flex-col bg-white dark:bg-slate-900 rounded-[16px] border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden relative">
      
      {/* 1. IMAGE CONTAINER (16:9 Aspect Ratio) */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
        <img
          src={displayImage}
          alt={article.title || 'News image'}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-[1.04] transition-transform duration-300 ease-out"
        />

        {/* Category Overlay Tag */}
        {article.category && (
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-xs border ${categoryStyle}`}>
              {article.category}
            </span>
          </div>
        )}

        {/* Breaking Badge */}
        {article.isBreaking && (
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase text-white bg-rose-600 rounded-full shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Live
            </span>
          </div>
        )}
      </div>

      {/* 2. CARD CONTENT */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* CATEGORY / DATE HEADER */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2.5">
            <span className="font-semibold text-slate-700 dark:text-slate-300 text-[11px] uppercase tracking-wider">
              {article.category || 'News'}
            </span>

            {/* Formatted Date (Hide if missing) */}
            {article.date && article.date !== 'null' && (
              <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                <Calendar className="w-3 h-3" />
                {article.date}
              </span>
            )}
          </div>

          {/* 3. NEWS TITLE */}
          <h2 className="font-serif-editorial text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors duration-200 leading-snug line-clamp-3 mb-2.5">
            {article.title}
          </h2>

          {/* 4. SHORT DESCRIPTION (2-3 lines line-clamp, hidden if empty) */}
          {article.description && article.description.trim() !== '' && article.description !== 'null' && (
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {article.description}
            </p>
          )}
        </div>

        {/* 5. READ STORY BUTTON / LINK */}
        <div className="pt-3 mt-auto border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300 transition-colors">
            <span>Read Story</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
          </span>

          {article.readTime && (
            <span className="text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          )}
        </div>

      </div>

      {/* Whole Card Clickable Link */}
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-10"
        aria-label={`Read full story: ${article.title}`}
      >
        <span className="sr-only">Read full story</span>
      </a>

    </article>
  );
}
