import React, { useState } from 'react';
import { Flame, Radio, ExternalLink, ChevronRight } from 'lucide-react';

export default function BreakingNews({ articles = [] }) {
  // Use actual articles from Google Sheet
  const breakingItems = articles.slice(0, 10);

  if (!breakingItems || breakingItems.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white shadow-sm overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10 sm:h-11">
        
        {/* Left Badge: 🔴 BREAKING */}
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full shrink-0 mr-4 border border-white/20 shadow-inner">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center gap-1 font-display">
            BREAKING
          </span>
        </div>

        {/* Scrolling Headlines Ticker */}
        <div className="relative overflow-hidden flex-1 h-full flex items-center">
          <div className="animate-marquee flex items-center gap-8 py-1 group">
            {/* Double the list for seamless continuous infinite marquee */}
            {[...breakingItems, ...breakingItems].map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium hover:underline underline-offset-4 text-white/95 hover:text-white transition-opacity whitespace-nowrap"
              >
                <span className="text-white/40 text-xs">◆</span>
                <span className="font-semibold text-rose-100 uppercase text-[10px] tracking-wider px-1.5 py-0.5 rounded bg-black/20">
                  {item.category || 'News'}
                </span>
                <span>{item.title}</span>
                <ExternalLink className="w-3 h-3 text-white/70" />
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
