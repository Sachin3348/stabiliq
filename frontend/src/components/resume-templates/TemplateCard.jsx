import React from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Star, Lock } from 'lucide-react';
import ATSBadge from './ATSBadge';

const TemplateCard = ({ template, onPreview, onUseTemplate, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 cursor-pointer flex flex-col"
    >
      {/* Popular Badge */}
      {template.isPopular && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-full shadow">
          <Star className="w-3 h-3 fill-amber-900" />
          Popular
        </div>
      )}

      {/* Pro Badge */}
      {!template.isFree && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-slate-800 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          <Lock className="w-3 h-3" />
          Pro
        </div>
      )}

      {/* Resume Preview Area */}
      <div
        className="relative bg-slate-50 flex justify-center items-start overflow-hidden"
        style={{ height: 300 }}
        onClick={() => onPreview(template)}
      >
        <img
          src={template.thumbnail}
          alt={template.title}
          className="w-full h-full object-cover object-top"
        />

        {/* Hover Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] flex items-center justify-center"
        >
          <motion.button
            initial={{ scale: 0.9, opacity: 0 }}
            whileHover={{ scale: 1 }}
            whileTap={{ scale: 0.97 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => { e.stopPropagation(); onPreview(template); }}
            className="flex items-center gap-2 bg-white text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-xl shadow-lg hover:bg-slate-50 transition"
          >
            <Eye className="w-4 h-4" />
            Quick Preview
          </motion.button>
        </motion.div>
      </div>

      {/* Card Footer */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight">{template.title}</h3>
              <p className="text-slate-500 text-xs mt-0.5">{template.subtitle}</p>
            </div>
            <ATSBadge score={template.atsScore} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {template.tags.map(tag => (
              <span
                key={tag}
                className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <button
            onClick={() => onPreview(template)}
            className="flex-shrink-0 text-sm font-medium text-slate-700 border border-slate-200 rounded-xl px-4 py-2.5 hover:border-slate-400 hover:bg-slate-50 transition-all"
          >
            Preview
          </button>
          <button
            onClick={() => window.open(template.copyUrl, '_blank')}
            className="flex-1 text-sm font-semibold text-white rounded-xl py-2.5 flex items-center justify-center gap-1.5 transition-all bg-blue-600 hover:bg-blue-700 whitespace-nowrap min-w-0"
          >
            Use Template
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TemplateCard;
