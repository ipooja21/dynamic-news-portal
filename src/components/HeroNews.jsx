import React, { useState } from 'react';
import { ArrowRight, Clock, Calendar, Bookmark, Share2, Sparkles, TrendingUp } from 'lucide-react';

export default function HeroNews({ article }) {
  const [imgSrc, setImgSrc] = useState(article?.image);

  if (!article) return null;

  const handleImageError = () => {
    setImgSrc('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80');
  };

  return (
    <section className="w-full my-6 sm:my-8">
      <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          
          {/* LEFT: Large Image with zoom effect (col 7 on desktop) */}
          <div className="lg:col-span-7 relative overflow-hidden bg-slate-950 aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto min-h-[280px] sm:min-h-[380px] lg:min-h-[440px]">
            <img
              src={imgSrc || article.image}
              alt={article.title}
              onError={handleImageError}
              loading="eager"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Gradient overlay on mobile/desktop for text contrast if overlaid */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:hidden"></div>

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-rose-600 rounded-full shadow-lg flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-white live-pulse-dot"></span>
                Lead Story
              </span>
              {article.category && (
                <span className="px-3 py-1 text-xs font-semibold text-white bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                  {article.category}
                </span>
              )}
            </div>

            {article.readTime && (
              <div className="absolute bottom-4 left-4 lg:hidden text-xs text-white/90 font-medium flex items-center gap-1.5 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </div>
            )}
          </div>

          {/* RIGHT: Content Section (col 5 on desktop) */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
            <div>
              {/* Category & Editorial Indicators */}
              <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-900/60">
                  <TrendingUp className="w-3.5 h-3.5" />
                  {article.category || 'Featured Article'}
                </span>
                
                {article.date && (
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                )}
              </div>

              {/* Headline */}
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group/link"
              >
                <h1 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white leading-[1.2] tracking-tight group-hover/link:text-rose-600 dark:group-hover/link:text-rose-400 transition-colors duration-200">
                  {article.title}
                </h1>
              </a>

              {/* Short Description */}
              {article.description && (
                <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 sm:line-clamp-4 font-normal">
                  {article.description}
                </p>
              )}
            </div>

            {/* Bottom Metadata and CTA */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-300">
                  NH
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {article.author || 'The Hindu / NEWSHUB Editorial'}
                  </div>
                  {article.readTime && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  )}
                </div>
              </div>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-rose-600 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-rose-600 dark:hover:text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm group-hover:shadow-md"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
