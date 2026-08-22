import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="w-full space-y-8 animate-pulse">
      
      {/* 1. Hero Skeleton */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm">
        <div className="lg:col-span-7 aspect-[16/9] rounded-2xl skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
        <div className="lg:col-span-5 space-y-4">
          <div className="w-24 h-5 rounded-full skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
          <div className="w-full h-8 rounded-lg skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
          <div className="w-4/5 h-8 rounded-lg skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
          <div className="w-full h-16 rounded-lg skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
          <div className="w-32 h-10 rounded-xl skeleton-shimmer bg-slate-200 dark:bg-slate-800 pt-4"></div>
        </div>
      </div>

      {/* 2. Grid Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 space-y-4 shadow-sm"
          >
            <div className="w-full aspect-[16/9] rounded-xl skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
            <div className="flex justify-between">
              <div className="w-20 h-4 rounded skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
              <div className="w-16 h-4 rounded skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
            </div>
            <div className="w-full h-6 rounded skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
            <div className="w-3/4 h-6 rounded skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
            <div className="w-full h-10 rounded skeleton-shimmer bg-slate-200 dark:bg-slate-800"></div>
          </div>
        ))}
      </div>

    </div>
  );
}
