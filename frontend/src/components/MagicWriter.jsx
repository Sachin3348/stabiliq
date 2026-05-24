import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ChevronDown, ChevronUp, Check, Loader2,
  FileText, AlertCircle, X, Wand2, ArrowRight, RotateCcw,
  Briefcase, FolderOpen
} from 'lucide-react';
import axios from 'axios';
import { usePdfRenderer } from '../hooks/usePdfRenderer';
import BulletOptimizeModal from './BulletOptimizeModal';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ─── PDF Preview (left panel) ─────────────────────────────────────────────────
const PdfPreview = ({ pdfUrl }) => {
  const { canvases, numPages, loading, error } = usePdfRenderer(pdfUrl);

  if (!pdfUrl) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
        <FileText className="w-10 h-10" />
        <p className="text-sm">No PDF available</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
        <p className="text-sm font-medium">Loading PDF preview…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-rose-500 px-6 text-center">
        <AlertCircle className="w-8 h-8" />
        <p className="text-sm">{error}</p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-teal-600 underline hover:text-teal-800 mt-1"
        >
          Open PDF directly ↗
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-1">
      {canvases.map((dataUrl, i) => (
        <div key={i} className="rounded-xl overflow-hidden shadow-md border border-slate-200">
          <img
            src={dataUrl}
            alt={`Resume page ${i + 1}`}
            className="w-full h-auto block"
          />
        </div>
      ))}
      {numPages > 0 && (
        <p className="text-xs text-slate-400 text-center pb-2">{numPages} page{numPages > 1 ? 's' : ''}</p>
      )}
    </div>
  );
};

// ─── Single Bullet item (clickable to open modal) ─────────────────────────────
const BulletItem = ({ bullet, chosenSuggestion, onClick, hasOptimized }) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(bullet)}
      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-150 leading-relaxed group ${
        chosenSuggestion
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-400 shadow-sm'
          : 'bg-white border-slate-200 hover:border-violet-400 hover:shadow-md'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${
          chosenSuggestion ? 'bg-green-500' : 'bg-slate-300 group-hover:bg-violet-400'
        }`} />
        <div className="flex-1">
          <p className={`text-sm ${chosenSuggestion ? 'text-green-900 font-medium' : 'text-slate-700'}`}>
            {chosenSuggestion || bullet.text}
          </p>
          {chosenSuggestion && (
            <p className="text-xs text-slate-400 mt-1 line-through">
              {bullet.text.substring(0, 60)}...
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {chosenSuggestion ? (
            <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-lg">
              <Check className="w-3 h-3" />
              Improved
            </div>
          ) : hasOptimized ? (
            <div className="text-xs font-semibold text-violet-600 bg-violet-100 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
              <Sparkles className="w-3 h-3 inline mr-1" />
              Click to optimize
            </div>
          ) : (
            <Wand2 className="w-4 h-4 text-slate-400 group-hover:text-violet-500 transition" />
          )}
        </div>
      </div>
    </motion.button>
  );
};

// ─── Section accordion (Experience or Project section) ────────────────────────
const BulletSection = ({ 
  title, 
  icon: Icon, 
  color, 
  sectionData,
  chosenSuggestions,
  onBulletClick,
  onOptimizeAll,
  isOptimizing 
}) => {
  const [open, setOpen] = useState(true);
  
  if (!sectionData?.bullets?.length) return null;

  const { company, role, name, bullets } = sectionData;
  const displayTitle = company ? `${role} at ${company}` : name;
  
  // Count optimized bullets
  const optimizedCount = bullets.filter(b => chosenSuggestions?.[b.id]).length;

  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden">
      {/* Section Header */}
      <div className="p-4 border-b border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-3 flex-1 hover:opacity-70 transition"
          >
            <div className={`p-2 rounded-lg ${color}`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">{title}</span>
                <span className="text-xs text-slate-400">
                  ({bullets.length} bullet{bullets.length > 1 ? 's' : ''})
                </span>
                {optimizedCount > 0 && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {optimizedCount} optimized
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-600 font-medium mt-0.5">{displayTitle}</p>
            </div>
            <div className="ml-auto">
              {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
            </div>
          </button>
        </div>

        {/* Optimize All Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onOptimizeAll(sectionData)}
          disabled={isOptimizing}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-sm hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isOptimizing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Optimizing all bullets...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              ✨ Optimize All Bullets at Once
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>

      {/* Section Content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-2 bg-slate-50/50">
              <p className="text-xs text-slate-500 mb-2">
                💡 Click any bullet below to optimize it individually
              </p>
              {bullets.map(bullet => (
                <BulletItem
                  key={bullet.id}
                  bullet={bullet}
                  chosenSuggestion={chosenSuggestions?.[bullet.id]}
                  onClick={onBulletClick}
                  hasOptimized={!!chosenSuggestions?.[bullet.id]}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Suggestion card ─────────────────────────────────────────────────────────
const SuggestionCard = ({ text, index, isChosen, onChoose }) => (
  <motion.button
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.07 }}
    onClick={() => onChoose(text)}
    className={`w-full text-left px-4 py-3.5 rounded-xl border text-sm leading-relaxed transition-all ${
      isChosen
        ? 'bg-green-50 border-green-400 text-green-900 shadow-sm'
        : 'bg-white border-slate-200 text-slate-700 hover:border-teal-400 hover:bg-teal-50'
    }`}
  >
    <div className="flex items-start gap-2.5">
      <div className={`mt-1 w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
        isChosen ? 'bg-green-500 text-white' : 'bg-slate-100 text-slate-500'
      }`}>
        {isChosen ? <Check className="w-3 h-3" /> : index + 1}
      </div>
      <span>{text}</span>
    </div>
  </motion.button>
);

// ─── Magic Writer right panel ─────────────────────────────────────────────────
const MagicWriterPanel = ({ parsedResume, token }) => {
  const [optimizedSections, setOptimizedSections] = useState({});
  const [optimizingSection, setOptimizingSection] = useState(null);
  const [chosenSuggestions, setChosenSuggestions] = useState({});
  const [selectedBulletForModal, setSelectedBulletForModal] = useState(null);
  const [error, setError] = useState(null);

  const experienceSections = parsedResume?.experience || [];
  const projectSections = parsedResume?.projects || [];
  const hasAnySections = experienceSections.length > 0 || projectSections.length > 0;

  // Generate unique key for each section
  const getSectionKey = (section) => {
    return section.company 
      ? `exp_${section.company}_${section.role}`.replace(/\s+/g, '_')
      : `proj_${section.name}`.replace(/\s+/g, '_');
  };

  // Get context for a bullet
  const getBulletContext = (bullet) => {
    // Find which section this bullet belongs to
    for (const exp of experienceSections) {
      if (exp.bullets.some(b => b.id === bullet.id)) {
        return { role: exp.role, company: exp.company };
      }
    }
    for (const proj of projectSections) {
      if (proj.bullets.some(b => b.id === bullet.id)) {
        return { projectName: proj.name };
      }
    }
    return {};
  };

  // Handle clicking a bullet to open modal
  const handleBulletClick = (bullet) => {
    setSelectedBulletForModal(bullet);
  };

  // Handle choosing a suggestion from modal
  const handleChooseSuggestionFromModal = (bulletId, suggestion) => {
    setChosenSuggestions(prev => ({
      ...prev,
      [bulletId]: suggestion
    }));
  };

  // Optimize entire section (batch)
  const handleOptimizeAll = useCallback(async (sectionData) => {
    const sectionKey = getSectionKey(sectionData);
    setOptimizingSection(sectionKey);
    setError(null);

    try {
      const payload = {
        bullets: sectionData.bullets.map(b => b.text)
      };

      if (sectionData.company) {
        payload.role = sectionData.role;
        payload.company = sectionData.company;
      } else if (sectionData.name) {
        payload.role = 'Project';
        payload.company = sectionData.name;
      }

      const res = await axios.post(
        `${API}/profile/optimize-experience`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const results = res.data?.results || res.data?.optimized_bullets || [];
      
      // Auto-select first suggestion for each bullet
      const newChosenSuggestions = {};
      sectionData.bullets.forEach((bullet, index) => {
        const result = results[index];
        if (result?.suggestions?.[0]) {
          newChosenSuggestions[bullet.id] = result.suggestions[0];
        }
      });

      setChosenSuggestions(prev => ({
        ...prev,
        ...newChosenSuggestions
      }));

    } catch (err) {
      console.error('[MagicWriter] optimize error:', err);
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        'Failed to generate suggestions. Please try again.'
      );
    } finally {
      setOptimizingSection(null);
    }
  }, [token]);

  const handleReset = () => {
    setOptimizedSections({});
    setChosenSuggestions({});
    setError(null);
  };

  const totalChosen = Object.keys(chosenSuggestions).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="bg-gradient-to-br from-violet-500 to-purple-600 p-2 rounded-xl shadow">
            <Wand2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Magic Writer</h3>
            <p className="text-xs text-slate-400">AI-powered bullet optimizer</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {totalChosen > 0 && (
            <div className="px-3 py-1.5 rounded-lg bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" />
              {totalChosen} improved
            </div>
          )}
          {totalChosen > 0 && (
            <button
              onClick={handleReset}
              className="text-slate-400 hover:text-slate-600 transition p-1 rounded-lg hover:bg-slate-100"
              title="Start over"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl"
          >
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-rose-700">{error}</p>
          </motion.div>
        )}

        {!hasAnySections ? (
          <div className="text-center py-12 text-slate-400">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-50" />
            <p className="text-sm font-medium">No bullet points extracted from this resume yet.</p>
            <p className="text-xs mt-1">Bullet extraction runs automatically on upload.</p>
          </div>
        ) : (
          <>
            <div className="space-y-2 pb-4 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                Two Ways to Optimize
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <div className="w-5 h-5 rounded-lg bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wand2 className="w-3 h-3 text-violet-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-violet-700">Bulk Mode:</span>
                    <span className="ml-1">Click "Optimize All" to improve all bullets at once with AI's top suggestions</span>
                  </div>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <div className="w-5 h-5 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-purple-700">Individual Mode:</span>
                    <span className="ml-1">Click any bullet to open an interactive modal with 4 AI suggestions to choose from</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Sections */}
            {experienceSections.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" />
                  Work Experience
                </p>
                {experienceSections.map(expSection => {
                  const sectionKey = getSectionKey(expSection);
                  return (
                    <BulletSection
                      key={sectionKey}
                      title="Experience"
                      icon={Briefcase}
                      color="bg-blue-500"
                      sectionData={expSection}
                      chosenSuggestions={chosenSuggestions}
                      onBulletClick={handleBulletClick}
                      onOptimizeAll={handleOptimizeAll}
                      isOptimizing={optimizingSection === sectionKey}
                    />
                  );
                })}
              </div>
            )}

            {/* Project Sections */}
            {projectSections.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-2">
                  <FolderOpen className="w-3.5 h-3.5" />
                  Projects
                </p>
                {projectSections.map(projSection => {
                  const sectionKey = getSectionKey(projSection);
                  return (
                    <BulletSection
                      key={sectionKey}
                      title="Project"
                      icon={FolderOpen}
                      color="bg-indigo-500"
                      sectionData={projSection}
                      chosenSuggestions={chosenSuggestions}
                      onBulletClick={handleBulletClick}
                      onOptimizeAll={handleOptimizeAll}
                      isOptimizing={optimizingSection === sectionKey}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bullet Optimize Modal */}
      {selectedBulletForModal && (
        <BulletOptimizeModal
          bullet={selectedBulletForModal}
          context={getBulletContext(selectedBulletForModal)}
          token={token}
          backendUrl={BACKEND_URL}
          onClose={() => setSelectedBulletForModal(null)}
          onChoose={handleChooseSuggestionFromModal}
        />
      )}
    </div>
  );
};

// ─── Main MagicWriter component ───────────────────────────────────────────────
/**
 * Props:
 *  - resumeUrl     : string — direct URL to the PDF file
 *  - parsedResume  : object — the already-parsed resume data with experience & projects
 *  - token         : string — auth JWT
 *  - onClose       : () => void
 */
const MagicWriter = ({ resumeUrl, parsedResume, token, onClose }) => {
  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 16 }}
        transition={{ type: 'spring', stiffness: 340, damping: 30 }}
        className="fixed inset-3 md:inset-6 z-50 bg-slate-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            <span className="font-bold text-slate-900 text-sm">Resume Magic Writer</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content — two-panel layout */}
        <div className="flex flex-1 overflow-hidden">

          {/* LEFT — PDF Preview */}
          <div className="flex-1 overflow-y-auto bg-slate-100 p-4 border-r border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-1">
              Resume Preview (read-only)
            </p>
            <PdfPreview pdfUrl={resumeUrl} />
          </div>

          {/* RIGHT — Magic Writer Panel */}
          <div className="w-full max-w-sm flex-shrink-0 bg-white flex flex-col">
            <MagicWriterPanel
              parsedResume={parsedResume}
              token={token}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MagicWriter;
