import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import TemplateCard from './TemplateCard';
import { SORT_OPTIONS } from '../../data/resumeTemplates';

const TemplateGrid = ({ templates, searchQuery, onSearchChange, sortBy, onSortChange, onPreview, onUseTemplate }) => {
  return (
    <section className="py-6">
      <div className="w-full">

        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates by name, style, or role..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-10 py-3 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-sm border border-slate-200 rounded-xl px-4 py-3 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-slate-500 mb-6">
          <span className="font-semibold text-slate-900">{templates.length}</span> template{templates.length !== 1 ? 's' : ''} found
          {searchQuery && <span> for "<span className="text-blue-600">{searchQuery}</span>"</span>}
        </p>

        {/* Grid */}
        <AnimatePresence mode="wait">
          {templates.length > 0 ? (
            <motion.div
              key={`grid-${templates.map(t => t.id).join('-')}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {templates.map((template, index) => (
                <TemplateCard
                  key={template.id}
                  template={template}
                  index={index}
                  onPreview={onPreview}
                  onUseTemplate={onUseTemplate}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No templates found</h3>
              <p className="text-slate-500 text-sm">Try a different search term or clear your filters</p>
              <button
                onClick={() => onSearchChange('')}
                className="mt-4 text-sm text-blue-600 hover:underline font-medium"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TemplateGrid;
