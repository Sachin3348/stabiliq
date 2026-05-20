import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../../data/resumeTemplates';

const FilterTabs = ({ active, onChange, counts }) => {
  const containerRef = useRef(null);

  return (
    <div className="sticky top-[65px] z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="w-full py-0">
        <div
          ref={containerRef}
          className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3"
          style={{ scrollbarWidth: 'none' }}
        >
          {CATEGORIES.map((cat) => {
            const isActive = active === cat.id;
            const count = counts[cat.id] ?? 0;
            return (
              <button
                key={cat.id}
                onClick={() => onChange(cat.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #1d4ed8, #0891b2)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
                <span className={`relative z-10 text-xs px-1.5 py-0.5 rounded-full font-semibold tabular-nums ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {cat.id === 'all' ? counts.all : count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FilterTabs;
