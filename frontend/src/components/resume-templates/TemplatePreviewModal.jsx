import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle, ArrowRight, Lock, Lightbulb, FileText } from 'lucide-react';
import ATSBadge from './ATSBadge';

const TemplatePreviewModal = ({ template, onClose, onUseTemplate }) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {template && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed inset-4 md:inset-8 z-50 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            {/* ── Left: Resume Preview ──────────────────────────────── */}
            <div className="flex-1 bg-slate-100 flex flex-col overflow-hidden min-w-0">
              {/* Label bar */}
              <div className="flex items-center justify-between px-5 py-3 bg-slate-800 text-white">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold tracking-widest uppercase text-slate-400">Resume Preview</span>
                  <span className="text-xs text-white font-medium">- {template.title}</span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Resume scrollable area */}
              <div className="flex-1 overflow-y-auto flex justify-center items-start p-6">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="shadow-2xl rounded-lg overflow-hidden w-full max-w-2xl"
                >
                  <img
                    src={template.thumbnail}
                    alt={template.title}
                    className="w-full h-auto object-top"
                  />
                </motion.div>
              </div>

              {/* PDF link */}
              <div className="flex justify-center pb-4">
                <button
                  onClick={() => window.open(template.pdfPreview, '_blank')}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-800 transition underline underline-offset-2"
                >
                  <FileText className="w-4 h-4" />
                  View full PDF preview
                </button>
              </div>
            </div>

            {/* ── Right: Details Panel ──────────────────────────────── */}
            <div className="w-full md:w-[340px] flex-shrink-0 flex flex-col overflow-y-auto border-l border-slate-100">
              {/* Header */}
              <div className="p-6 border-b border-slate-100">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 leading-tight">{template.title}</h2>
                    <p className="text-sm text-slate-500 mt-0.5">{template.subtitle}</p>
                  </div>
                  {!template.isFree && (
                    <span className="flex items-center gap-1 text-xs font-semibold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full flex-shrink-0">
                      <Lock className="w-3 h-3" /> Pro
                    </span>
                  )}
                </div>
                <ATSBadge score={template.atsScore} size="lg" />

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {template.tags.map(tag => (
                    <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="p-5 border-b border-slate-100">
                <button
                  onClick={() => window.open(template.copyUrl, '_blank')}
                  className="w-full flex items-center justify-center gap-2 text-white font-semibold py-3 rounded-xl transition-all hover:opacity-90 active:scale-[0.98] text-sm bg-blue-600 hover:bg-blue-700"
                >
                  Use This Template
                  <ArrowRight className="w-4 h-4" />
                </button>
                {/* <p className="text-xs text-slate-400 text-center mt-2">
                  {template.isFree ? 'Free - included in your membership' : 'Available with Pro membership'}
                </p> */}
              </div>

              {/* Overview */}
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <ExternalLink className="w-4 h-4 text-slate-400" />
                  Overview
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{template.overview}</p>
              </div>

              {/* ATS Compatibility */}
              <div className="p-5 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  ATS Compatibility
                </h3>
                <div className="space-y-2">
                  {[
                    'Standard section headings detected correctly',
                    'No tables or multi-column layouts that confuse parsers',
                    'All fonts are ATS-readable and web-safe',
                    'Contact information is clearly structured',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-xs text-slate-600 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="p-5">
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  Tips on why this template works
                </h3>
                <div className="space-y-3">
                  {template.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl border border-amber-100">
                      <div className="w-5 h-5 rounded-full bg-amber-400 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-xs text-amber-900 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TemplatePreviewModal;
