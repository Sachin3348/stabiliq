import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Sparkles, ChevronDown, ChevronUp, Check,
  Loader2, AlertCircle, Brain, Zap, TrendingUp, Target, Star,
  ArrowRight, RefreshCw, Download, ExternalLink, Info, X,
  User, Briefcase, Award, MessageSquare, Search, BarChart2, ShieldCheck, Hash
} from 'lucide-react';
import axios from 'axios';
import LinkedInReviewDashboard from './LinkedInReviewDashboard';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ─── Constants ──────────────────────────────────────────────────────────────────
const DOWNLOAD_STEPS = [
  { step: 1, title: 'Go to your LinkedIn profile', description: 'Open LinkedIn and navigate to your own profile page.' },
  { step: 2, title: 'Click "More" button', description: 'Under your profile photo, click the "More" dropdown button.' },
  { step: 3, title: 'Select "Save to PDF"', description: 'From the dropdown menu, choose "Save to PDF".' },
  { step: 4, title: 'Upload the PDF here', description: 'Once downloaded, upload it below and we\'ll analyze your profile!' },
];

const SECTION_META = {
  headline:     { label: 'Headline',      icon: User,        max: 100 },
  summary:      { label: 'Summary',       icon: MessageSquare, max: 100 },
  experience:   { label: 'Experience',    icon: Briefcase,   max: 100 },
  keywords:     { label: 'Keywords',      icon: Hash,        max: 100 },
  positioning:  { label: 'Positioning',   icon: Target,      max: 100 },
  completeness: { label: 'Completeness',  icon: ShieldCheck, max: 100 },
  searchability:{ label: 'Searchability', icon: Search,      max: 100 },
};

const COMPETITIVENESS_CONFIG = {
  low:           { label: 'Low Competitiveness',           bg: 'bg-rose-100',   text: 'text-rose-700',   border: 'border-rose-200' },
  below_average: { label: 'Below Average',                 bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
  average:       { label: 'Average',                       bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200' },
  above_average: { label: 'Above Average',                 bg: 'bg-teal-100',   text: 'text-teal-700',   border: 'border-teal-200' },
  high:          { label: 'High Competitiveness',          bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200' },
  elite:         { label: 'Elite',                         bg: 'bg-violet-100', text: 'text-violet-700', border: 'border-violet-200' },
};

const SENIORITY_CONFIG = {
  junior:    { label: 'Junior',    bg: 'bg-slate-100',   text: 'text-slate-700' },
  mid:       { label: 'Mid-Level', bg: 'bg-blue-100',    text: 'text-blue-700' },
  senior:    { label: 'Senior',    bg: 'bg-indigo-100',  text: 'text-indigo-700' },
  staff:     { label: 'Staff',     bg: 'bg-purple-100',  text: 'text-purple-700' },
  principal: { label: 'Principal', bg: 'bg-violet-100',  text: 'text-violet-700' },
  director:  { label: 'Director',  bg: 'bg-teal-100',    text: 'text-teal-700' },
  vp:        { label: 'VP',        bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'c-level': { label: 'C-Level',   bg: 'bg-amber-100',   text: 'text-amber-700' },
};

// ─── Error mapper ──────────────────────────────────────────────────────────────
const getErrorMessage = (err) => {
  if (!err.response) return 'Could not reach the server. Check your connection.';
  const { status, data } = err.response;
  if (status === 502) return 'AI evaluation failed. Please try again.';
  if (status === 504) return 'Request timed out. The AI is taking too long — please try again.';
  if (status === 400 || status === 413 || status === 422) return data?.error || 'Invalid request.';
  return data?.error || 'Something went wrong. Please try again.';
};

// ─── How to Download Guide ────────────────────────────────────────────────────
// ─── How to Download Guide ────────────────────────────────────────────────────
const HowToDownloadGuide = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: 'auto' }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.3 }}
    className="overflow-hidden"
  >
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 relative mt-2">
      <button onClick={onClose} className="absolute top-4 right-4 text-blue-400 hover:text-blue-600 transition">
        <X className="w-4 h-4" />
      </button>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center">
          <Download className="w-3.5 h-3.5 text-white" />
        </div>
        <h3 className="font-bold text-blue-900 text-sm">How to Download Your LinkedIn Profile PDF</h3>
      </div>
      <div className="space-y-3">
        {DOWNLOAD_STEPS.map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
              {item.step}
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">{item.title}</p>
              <p className="text-xs text-blue-600 mt-0.5">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <a
        href="https://www.linkedin.com/in/me/"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Open LinkedIn Profile →
      </a>
    </div>
  </motion.div>
);

// ─── Processing Animation ─────────────────────────────────────────────────────
const PROCESSING_MESSAGES = [
  { icon: Brain,      text: 'Reading your LinkedIn profile...',        color: 'from-violet-500 to-purple-600' },
  { icon: Search,     text: 'Analyzing headline & summary...',         color: 'from-blue-500 to-cyan-600' },
  { icon: Briefcase,  text: 'Evaluating work experience...',           color: 'from-teal-500 to-emerald-600' },
  { icon: Target,     text: 'Checking keyword optimization...',        color: 'from-orange-500 to-amber-600' },
  { icon: TrendingUp, text: 'Scoring your profile sections...',        color: 'from-pink-500 to-rose-600' },
  { icon: Sparkles,   text: 'Generating improvement suggestions...',   color: 'from-indigo-500 to-violet-600' },
];

const ProcessingAnimation = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const msgInterval = setInterval(() => setMsgIdx(p => (p + 1) % PROCESSING_MESSAGES.length), 2500);
    // Slow crawl: reaches ~80% in ~40s, then barely moves — API resolves it
    const progressInterval = setInterval(() => setProgress(p => p < 80 ? p + 0.33 : p < 93 ? p + 0.05 : p), 150);
    return () => { clearInterval(msgInterval); clearInterval(progressInterval); };
  }, []);

  const current = PROCESSING_MESSAGES[msgIdx];
  const Icon = current.icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      <div className="relative w-32 h-32 mb-8">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-300" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-4 border-transparent border-t-blue-500 border-l-blue-300" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-6 rounded-full border-4 border-transparent border-t-teal-500" />
        <AnimatePresence mode="wait">
          <motion.div
            key={msgIdx}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-10 rounded-full bg-gradient-to-br ${current.color} flex items-center justify-center shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={msgIdx}
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="text-xl font-bold text-slate-800 text-center mb-2"
        >
          {current.text}
        </motion.p>
      </AnimatePresence>
      <p className="text-sm text-slate-500 mb-8 text-center">Deep analysis in progress — this can take up to 60 seconds</p>

      <div className="w-80 space-y-2">
        <div className="flex justify-between text-xs text-slate-500 font-medium">
          <span>Analyzing...</span><span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 via-blue-500 to-teal-500"
            animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }}
          />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
        {PROCESSING_MESSAGES.map((msg, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i <= msgIdx ? 1 : 0.3, scale: i === msgIdx ? 1.05 : 1 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
              i < msgIdx  ? 'bg-green-50 border-green-200 text-green-700'
              : i === msgIdx ? 'bg-violet-50 border-violet-300 text-violet-700'
              : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            {i < msgIdx && <Check className="w-3 h-3" />}
            {i === msgIdx && <Loader2 className="w-3 h-3 animate-spin" />}
            {msg.text.split('...')[0]}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Score Ring ───────────────────────────────────────────────────────────────
const ScoreRing = ({ score, size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const color = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444';

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        <motion.circle
          cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round" strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (score / 100) * circumference }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-3xl font-extrabold text-slate-900"
        >
          {score}
        </motion.span>
        <span className="text-xs text-slate-500 font-medium">/ 100</span>
      </div>
    </div>
  );
};

// ─── Section Card (expandable) ────────────────────────────────────────────────
const SectionCard = ({ sectionKey, data, delay }) => {
  const [open, setOpen] = useState(false);
  const meta = SECTION_META[sectionKey] || { label: sectionKey, icon: Star, max: 100 };
  const Icon = meta.icon;
  const pct = Math.round((data.score / meta.max) * 100);
  const barColor   = pct >= 70 ? 'bg-green-500'    : pct >= 40 ? 'bg-amber-500'    : 'bg-rose-500';
  const textColor  = pct >= 70 ? 'text-green-700'  : pct >= 40 ? 'text-amber-700'  : 'text-rose-700';
  const bgColor    = pct >= 70 ? 'bg-green-50'     : pct >= 40 ? 'bg-amber-50'     : 'bg-rose-50';
  const borderColor= pct >= 70 ? 'border-green-200': pct >= 40 ? 'border-amber-200': 'border-rose-200';

  const issues  = data.issues  || [];
  const missing = data.missing_keywords || data.missing_sections || [];
  const recs    = data.recommendations || [];
  const hasDetail = issues.length > 0 || missing.length > 0 || recs.length > 0 || data.optimized_example;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
      className={`border ${borderColor} rounded-2xl overflow-hidden bg-white`}
    >
      <button
        onClick={() => hasDetail && setOpen(v => !v)}
        className={`w-full flex items-center gap-3 px-5 py-4 ${bgColor} ${hasDetail ? 'cursor-pointer' : 'cursor-default'}`}
      >
        <div className={`w-9 h-9 rounded-xl ${bgColor} border ${borderColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-4 h-4 ${textColor}`} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-bold text-slate-800">{meta.label}</span>
            <span className={`text-sm font-extrabold ${textColor}`}>
              {data.score}<span className="text-xs font-medium text-slate-400">/{meta.max}</span>
            </span>
          </div>
          <div className="h-1.5 bg-white/60 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: delay + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        {hasDetail && (open
          ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-4 space-y-3 bg-white border-t border-slate-100">
              {issues.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Issues</p>
                  <ul className="space-y-1.5">
                    {issues.map((issue, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {missing.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    {data.missing_keywords ? 'Missing Keywords' : 'Missing Sections'}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {missing.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {recs.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recommendations</p>
                  <ul className="space-y-1.5">
                    {recs.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <ArrowRight className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.optimized_example && (
                <div className="bg-slate-50 rounded-xl px-4 py-3">
                  <p className="text-xs font-bold text-slate-500 mb-1">💡 Optimized Example</p>
                  <p className="text-sm text-slate-700 italic">"{data.optimized_example}"</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Results Panel ────────────────────────────────────────────────────────────
const ResultsPanel = ({ result, onReanalyze, reviewedAt }) => {
  const {
    overall_score,
    market_competitiveness,
    seniority_level,
    detected_domain,
    primary_specialization,
    current_market_signal,
    biggest_problem,
    highest_roi_fix,
    section_scores,
    top_3_improvements,
  } = result;

  const compCfg  = COMPETITIVENESS_CONFIG[market_competitiveness] || COMPETITIVENESS_CONFIG.average;
  const senCfg   = SENIORITY_CONFIG[seniority_level]  || SENIORITY_CONFIG.mid;
  const scoreLabel = overall_score >= 75 ? 'Great Profile!' : overall_score >= 50 ? 'Good Start' : 'Needs Improvement';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

      {/* ── Last analyzed banner ── */}
      {reviewedAt && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
          <p className="text-xs text-slate-500">
            Last analyzed:{' '}
            <span className="font-semibold text-slate-700">
              {new Date(reviewedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          </p>
          <button
            onClick={onReanalyze}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-600 hover:text-violet-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Re-analyze
          </button>
        </div>
      )}
      <div className="grid md:grid-cols-2 gap-4">

        {/* Score */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm">
          <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Overall Score</h3>
          <ScoreRing score={overall_score} />
          <motion.p
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
            className="mt-3 font-bold text-slate-900"
          >
            {scoreLabel}
          </motion.p>
          <p className="text-xs text-slate-500 mt-1">Aim for 80+</p>

          {/* Badges */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${compCfg.bg} ${compCfg.text} ${compCfg.border}`}>
              {compCfg.label}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${senCfg.bg} ${senCfg.text}`}>
              {senCfg.label}
            </span>
            {detected_domain && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">{detected_domain}</span>
            )}
            {primary_specialization && (
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">{primary_specialization}</span>
            )}
          </div>
        </div>

        {/* Callout cards */}
        <div className="space-y-3">
          {current_market_signal && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
              <BarChart2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Market Signal</p>
                <p className="text-sm text-slate-700">{current_market_signal}</p>
              </div>
            </div>
          )}
          {biggest_problem && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex gap-3">
              <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-rose-700 uppercase tracking-wider mb-1">Biggest Problem</p>
                <p className="text-sm text-slate-700">{biggest_problem}</p>
              </div>
            </div>
          )}
          {highest_roi_fix && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3">
              <Zap className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Highest ROI Fix</p>
                <p className="text-sm text-slate-700">{highest_roi_fix}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Top 3 Improvements ── */}
      {top_3_improvements?.length > 0 && (
        <div className="bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-200 rounded-2xl p-6">
          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-violet-500" />
            Top 3 Improvements
          </h3>
          <ol className="space-y-3">
            {top_3_improvements.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 leading-relaxed pt-1">{item}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Section breakdown ── */}
      {section_scores && (
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-slate-500" />
            Section Breakdown
            <span className="text-sm font-normal text-slate-500">(click any section to see details)</span>
          </h3>
          {Object.entries(section_scores).map(([key, val], i) => (
            <SectionCard key={key} sectionKey={key} data={val} delay={i * 0.07} />
          ))}
        </div>
      )}

      {/* ── Reset ── */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={onReanalyze}
          className="flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-400 transition"
        >
          <RefreshCw className="w-4 h-4" />
          Analyze another profile
        </button>
      </div>
    </motion.div>
  );
};

// ─── Upload Panel ─────────────────────────────────────────────────────────────
const UploadPanel = ({ onSubmit, error }) => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const fileInputRef = useRef(null);

  const validate = (f) => {
    if (!f) return '';
    if (f.type !== 'application/pdf') return 'Only PDF files are accepted.';
    if (f.size > 10 * 1024 * 1024) return 'File exceeds maximum size of 10MB.';
    return '';
  };

  const handleFile = (f) => {
    const err = validate(f);
    setValidationError(err);
    setFile(err ? null : f);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const displayError = validationError || error;

  return (
    <div className="space-y-5">
      {/* Hero */}
      <div className="text-center py-6">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl mb-4"
        >
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </motion.div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">LinkedIn Profile Optimizer</h2>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">
          Upload your LinkedIn profile PDF and get an instant AI-powered score with actionable improvements to land more interviews.
        </p>
      </div>

      {/* Guide toggle */}
      <div>
        <button
          onClick={() => setShowGuide(v => !v)}
          className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 hover:bg-blue-100 transition"
        >
          <Info className="w-4 h-4 flex-shrink-0 text-blue-500" />
          <span><span className="font-semibold">Not sure how to get the PDF?</span> Click for a step-by-step guide</span>
          {showGuide ? <ChevronUp className="w-4 h-4 ml-auto text-blue-400" /> : <ChevronDown className="w-4 h-4 ml-auto text-blue-400" />}
        </button>
        <AnimatePresence>{showGuide && <HowToDownloadGuide onClose={() => setShowGuide(false)} />}</AnimatePresence>
      </div>

      {/* Error */}
      {displayError && (
        <motion.div
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl"
        >
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700">{displayError}</p>
        </motion.div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          dragOver          ? 'border-blue-500 bg-blue-50 scale-[1.01]'
          : file            ? 'border-green-400 bg-green-50'
          : validationError ? 'border-rose-400 bg-rose-50'
          : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50'
        }`}
      >
        <input ref={fileInputRef} type="file" accept=".pdf" className="hidden"
          onChange={(e) => handleFile(e.target.files[0])} />
        <AnimatePresence mode="wait">
          {file ? (
            <motion.div key="ready" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-2">
              <div className="w-14 h-14 mx-auto rounded-xl bg-green-100 flex items-center justify-center">
                <Check className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-bold text-green-700">{file.name}</p>
              <p className="text-xs text-green-600">{(file.size / 1024 / 1024).toFixed(1)} MB • Ready to analyze</p>
              <button onClick={(e) => { e.stopPropagation(); setFile(null); setValidationError(''); }}
                className="text-xs text-slate-500 hover:text-slate-700 underline">
                Remove file
              </button>
            </motion.div>
          ) : (
            <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-xl bg-slate-200 flex items-center justify-center">
                <Upload className="w-7 h-7 text-slate-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-700">Drop your LinkedIn PDF here</p>
                <p className="text-sm text-slate-400 mt-1">or click to browse files</p>
              </div>
              <p className="text-xs text-slate-400">PDF only • Max 10 MB</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: file ? 1.02 : 1 }}
        whileTap={{ scale: file ? 0.98 : 1 }}
        onClick={() => file && onSubmit(file)}
        disabled={!file}
        className={`w-full py-4 rounded-xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg ${
          file
            ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white hover:shadow-xl'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
        }`}
      >
        <Sparkles className="w-5 h-5" />
        Analyze My LinkedIn Profile
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      <p className="text-center text-xs text-slate-400">🔒 Your data is private. We never store your PDF.</p>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const LinkedInOptimizer = ({ token, initialReview = null, reviewedAt = null }) => {
  const [phase, setPhase] = useState(initialReview ? 'results' : 'upload');
  const [result, setResult] = useState(initialReview);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (file) => {
    setPhase('processing');
    setApiError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await axios.post(
        `${API}/linkedin/review`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          timeout: 90000, // 90s client timeout — backend can take up to 60s
        }
      );

      if (res.data?.success && res.data?.data) {
        setResult(res.data.data);
        setPhase('results');
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      console.error('[LinkedInOptimizer]', err);
      setApiError(getErrorMessage(err));
      setPhase('upload');
    }
  };

  const handleReset = () => {
    setPhase('upload');
    setResult(null);
    setApiError('');
  };

  return (
    <div className={phase === 'results' ? 'w-full' : 'max-w-3xl mx-auto'}>
      <AnimatePresence mode="wait">
        {phase === 'upload' && (
          <motion.div key="upload"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
          >
            <UploadPanel onSubmit={handleSubmit} error={apiError} />
          </motion.div>
        )}

        {phase === 'processing' && (
          <motion.div key="processing"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <ProcessingAnimation />
          </motion.div>
        )}

        {phase === 'results' && result && (
          <motion.div key="results"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          >
            <LinkedInReviewDashboard
              data={result}
              onReanalyze={handleReset}
              reviewedAt={reviewedAt}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LinkedInOptimizer;
