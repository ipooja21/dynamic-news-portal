import React from 'react';
import { Layers, Zap, Clock, Cpu, Briefcase, Trophy, Globe2, MapPin, Film } from 'lucide-react';

const FILTERS = [
  { id: 'All', label: 'All', icon: Layers },
  { id: 'Latest', label: 'Latest', icon: Zap },
  { id: 'Today', label: 'Today', icon: Clock },
  { id: 'Technology', label: 'Technology', icon: Cpu },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Sports', label: 'Sports', icon: Trophy },
  { id: 'World', label: 'World', icon: Globe2 },
  { id: 'India', label: 'India', icon: MapPin },
  { id: 'Entertainment', label: 'Entertainment', icon: Film },
];

export default function FilterChips({ activeFilter, onSelectFilter, counts = {} }) {
  return (
    <div className="w-full my-4">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Filter by Topic
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {FILTERS.map((chip) => {
          const isActive = activeFilter?.toLowerCase() === chip.id.toLowerCase();
          const Icon = chip.icon;
          const count = counts[chip.id];

          return (
            <button
              key={chip.id}
              onClick={() => onSelectFilter(chip.id)}
              className={`group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm shadow-slate-900/10 dark:shadow-white/10 scale-100 font-bold'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-rose-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'}`} />
              <span>{chip.label}</span>
              {typeof count === 'number' && count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ml-0.5 ${
                  isActive
                    ? 'bg-slate-800 dark:bg-slate-200 text-slate-200 dark:text-slate-800'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
