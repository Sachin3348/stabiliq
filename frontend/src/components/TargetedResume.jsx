import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, AlertCircle, CheckCircle2, AlertTriangle, Brain,
  Zap, TrendingUp, Target, ChevronDown, ChevronUp, Copy, Check,
  RefreshCw, ArrowRight, BarChart2, Users, Eye, Shield, Hash,
  Briefcase, FileText, Loader2, X, Info, Lightbulb, Award,
  BookOpen, FolderOpen, Star, Upload
} from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// ─── Constants ─────────────────────────────────────────────────────────────────
const SENIORITY_OPTIONS = [
  { value: '', label: 'Not specified (auto-detect)' },
  { value: 'junior', label: 'Junior' },
  { value: 'mid', label: 'Mid-Level' },
  { value: 'senior', label: 'Senior' },
  { value: 'staff', label: 'Staff' },
  { value: 'principal', label: 'Principal' },
  { value: 'director', label: 'Director' },
  { value: 'vp', label: 'VP' },
  { value: 'c-level', label: 'C-Level' },
];

const PROCESSING_MESSAGES = [
  { icon: Brain,      text: 'Reading your resume...' },
  { icon: FileText,   text: 'Parsing job description...' },
  { icon: Target,     text: 'Analyzing keyword match...' },
  { icon: Briefcase,  text: 'Evaluating experience alignment...' },
  { icon: TrendingUp, text: 'Assessing market competitiveness...' },
  { icon: Sparkles,   text: 'Generating improvement suggestions...' },
  { icon: BarChart2,  text: 'Scoring each resume section...' },
  { icon: Users,      text: 'Calculating recruiter probability...' },
];

const HIRING_PROB_CFG = {
  low:       { label: 'Low',       bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
  medium:    { label: 'Medium',    bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  high:      { label: 'High',      bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200' },
  very_high: { label: 'Very High', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
};

const COMP_CFG = {
  low:           { label: 'Low',           bg: 'bg-rose-50',    text: 'text-rose-700',    border: 'border-rose-200' },
  below_average: { label: 'Below Average', bg: 'bg-orange-50',  text: 'text-orange-700',  border: 'border-orange-200' },
  average:       { label: 'Average',       bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200' },
  above_average: { label: 'Above Average', bg: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200' },
  high:          { label: 'High',          bg: 'bg-green-50',   text: 'text-green-700',   border: 'border-green-200' },
  elite:         { label: 'Elite',         bg: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200' },
};

const SENIORITY_FIT_CFG = {
  under: { label: 'Under-qualified',   bg: 'bg-rose-50',  text: 'text-rose-700',  border: 'border-rose-200' },
  match: { label: 'Good Fit',          bg: 'bg-teal-50',  text: 'text-teal-700',  border: 'border-teal-200' },
  over:  { label: 'Over-qualified',    bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
};

// ─── Error mapper ──────────────────────────────────────────────────────────────
const getErrorMessage = (err) => {
  if (!err.response) return 'Could not reach the server. Check your connection.';
  const { status, data } = err.response;
  if (status === 400) return data?.error || 'Invalid request.';
  if (status === 413) return 'File exceeds maximum size of 10MB.';
  if (status === 422) return data?.error || 'Invalid input. Please check your resume and job description.';
  if (status === 429) return "Too many requests. Please wait a minute.";
  if (status === 502) return 'AI evaluation failed. Please try again.';
  if (status === 504) return 'Analysis timed out. Please try again.';
  return data?.error || 'Something went wrong. Please try again.';
};

// ─── Score color helper ────────────────────────────────────────────────────────
const scoreColor = (pct) =>
  pct >= 70 ? { bar: 'bg-emerald-500', text: 'text-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' }
  : pct >= 40 ? { bar: 'bg-amber-400', text: 'text-amber-600', light: 'bg-amber-50', border: 'border-amber-200' }
  : { bar: 'bg-rose-500', text: 'text-rose-600', light: 'bg-rose-50', border: 'border-rose-200' };

// ─── Reusable primitives ───────────────────────────────────────────────────────
const AIPulse = ({ label = 'AI Analysis' }) => (
  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold">
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500" />
    </span>
    {label}
  </span>
);

const SectionHeading = ({ icon: Icon, title, sub, color = 'text-slate-900' }) => (
  <div className="flex items-center gap-2 mb-4">
    {Icon && <Icon className="w-5 h-5 text-slate-500" />}
    <h2 className={`text-lg font-black ${color}`}>{title}</h2>
    {sub && <span className="text-sm font-normal text-slate-400">{sub}</span>}
  </div>
);

const Chip = ({ label, variant = 'neutral' }) => {
  const styles = {
    green:  'bg-emerald-50 border-emerald-200 text-emerald-700',
    red:    'bg-rose-50 border-rose-200 text-rose-700',
    amber:  'bg-amber-50 border-amber-200 text-amber-700',
    blue:   'bg-blue-50 border-blue-200 text-blue-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    neutral:'bg-slate-50 border-slate-200 text-slate-600',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${styles[variant]}`}>
      {variant === 'green' && <Check className="w-3 h-3" />}
      {variant === 'red'   && <X className="w-3 h-3" />}
      {variant === 'amber' && <AlertTriangle className="w-3 h-3" />}
      {label}
    </span>
  );
};

const ProgressBar = ({ score, max = 100, delay = 0 }) => {
  const pct = Math.round((score / max) * 100);
  const c = scoreColor(pct);
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${c.bar}`}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <button onClick={handle}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700 transition">
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};

const BeforeAfter = ({ original, optimized, reason, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.08 }}
    className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
  >
    <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
            <X className="w-2.5 h-2.5 text-rose-600" />
          </div>
          <span className="text-xs font-black text-rose-600 uppercase tracking-wider">Original</span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">{original}</p>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-emerald-600" />
            </div>
            <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">AI Optimized</span>
          </div>
          <CopyButton text={optimized} />
        </div>
        <p className="text-sm text-slate-700 leading-relaxed font-medium">{optimized}</p>
      </div>
    </div>
    {reason && (
      <div className="px-4 py-3 bg-indigo-50 border-t border-indigo-100 flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-700 leading-relaxed">{reason}</p>
      </div>
    )}
  </motion.div>
);

const ExpandableCard = ({ title, explanation, why_it_matters, actionable_tip, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
    >
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-slate-50 transition">
        <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-indigo-600" />
        </div>
        <span className="flex-1 font-bold text-slate-800 text-sm">{title}</span>
        {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-3 border-t border-slate-100">
              <p className="text-sm text-slate-600 leading-relaxed">{explanation}</p>
              {why_it_matters && (
                <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800 leading-relaxed"><span className="font-bold">Why it matters: </span>{why_it_matters}</p>
                </div>
              )}
              {actionable_tip && (
                <div className="flex items-start gap-2 p-3 bg-teal-50 border border-teal-200 rounded-xl">
                  <ArrowRight className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-teal-800 leading-relaxed"><span className="font-bold">Action: </span>{actionable_tip}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Processing Animation ──────────────────────────────────────────────────────
const ProcessingView = () => {
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const m = setInterval(() => setMsgIdx(p => (p + 1) % PROCESSING_MESSAGES.length), 3500);
    // Slowly crawls to 85% over ~100s — resolves when API responds
    const p = setInterval(() => setProgress(prev => prev < 85 ? prev + 0.25 : prev < 94 ? prev + 0.04 : prev), 200);
    return () => { clearInterval(m); clearInterval(p); };
  }, []);

  const { icon: Icon, text } = PROCESSING_MESSAGES[msgIdx];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-8">
      <div className="relative w-28 h-28 mb-8">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-violet-500 border-r-violet-300" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-4 border-transparent border-t-indigo-500 border-l-indigo-300" />
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-6 rounded-full border-4 border-transparent border-t-blue-400" />
        <AnimatePresence mode="wait">
          <motion.div key={msgIdx}
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg"
          >
            <Icon className="w-5 h-5 text-white" />
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.p key={msgIdx}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
          className="text-xl font-bold text-slate-800 text-center mb-2"
        >{text}</motion.p>
      </AnimatePresence>
      <p className="text-sm text-slate-500 text-center mb-8">Deep AI analysis in progress — this can take up to 2 minutes</p>

      <div className="w-72 space-y-1.5">
        <div className="flex justify-between text-xs text-slate-500 font-medium">
          <span>Analyzing...</span><span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-violet-500 via-indigo-500 to-blue-500"
            animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-lg">
        {PROCESSING_MESSAGES.map((msg, i) => (
          <motion.div key={i} animate={{ opacity: i <= msgIdx ? 1 : 0.3 }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
              i < msgIdx  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
              : i === msgIdx ? 'bg-violet-50 border-violet-300 text-violet-700'
              : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
            {i < msgIdx && <Check className="w-3 h-3" />}
            {i === msgIdx && <Loader2 className="w-3 h-3 animate-spin" />}
            {msg.text.replace('...', '')}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Score Metric Row ──────────────────────────────────────────────────────────
const ScoreRow = ({ label, score, max = 100, delay }) => {
  const pct = Math.round((score / max) * 100);
  const c = scoreColor(pct);
  return (
    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className={`text-sm font-black ${c.text}`}>{score}<span className="text-xs text-slate-400 font-normal">/{max}</span></span>
      </div>
      <ProgressBar score={score} max={max} delay={delay} />
    </motion.div>
  );
};

// ─── Section Score Card ────────────────────────────────────────────────────────
const SectionScoreCard = ({ sectionKey, data, delay }) => {
  const [open, setOpen] = useState(false);
  const pct = Math.round((data.score / data.max_score) * 100);
  const c = scoreColor(pct);
  const issues = data.issues || [];
  const strengths = data.strengths || [];
  const suggestions = data.improvement_suggestions || [];
  const hasDetail = issues.length > 0 || strengths.length > 0 || suggestions.length > 0 || data.optimized_example || data.jd_alignment_feedback;

  const labelMap = {
    headline: 'Headline', summary: 'Summary', experience: 'Experience',
    projects: 'Projects', skills: 'Skills', ats_optimization: 'ATS Optimization',
    keyword_optimization: 'Keyword Optimization', recruiter_readiness: 'Recruiter Readiness',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`border-2 rounded-2xl overflow-hidden bg-white ${
        pct < 40 ? 'border-rose-200' : pct < 70 ? 'border-amber-200' : 'border-emerald-200'
      }`}
    >
      <button onClick={() => hasDetail && setOpen(v => !v)}
        className={`w-full flex items-center gap-3 px-5 py-4 text-left ${c.light} ${hasDetail ? 'cursor-pointer' : 'cursor-default'}`}>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-black text-slate-800">{labelMap[sectionKey] || sectionKey}</span>
            <span className={`text-sm font-black ${c.text}`}>{data.score}<span className="text-xs font-normal text-slate-400">/{data.max_score}</span></span>
          </div>
          <ProgressBar score={data.score} max={data.max_score} delay={delay + 0.2} />
        </div>
        {hasDetail && (open
          ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />
          : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 ml-3" />
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="px-5 py-4 space-y-4 border-t border-slate-100">
              {data.jd_alignment_feedback && (
                <p className="text-sm text-slate-600 leading-relaxed italic border-l-2 border-indigo-300 pl-3">{data.jd_alignment_feedback}</p>
              )}
              {strengths.length > 0 && (
                <div>
                  <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-2">Strengths</p>
                  <ul className="space-y-1">
                    {strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {issues.length > 0 && (
                <div>
                  <p className="text-xs font-black text-rose-600 uppercase tracking-wider mb-2">Issues</p>
                  <ul className="space-y-1">
                    {issues.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {suggestions.length > 0 && (
                <div>
                  <p className="text-xs font-black text-indigo-600 uppercase tracking-wider mb-2">Suggestions</p>
                  <ul className="space-y-1">
                    {suggestions.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <ArrowRight className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />{s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {data.optimized_example && (
                <div className="bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-violet-500" />
                      <span className="text-xs font-black text-violet-700 uppercase tracking-wider">AI Optimized Example</span>
                    </div>
                    <CopyButton text={data.optimized_example} />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{data.optimized_example}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// ─── Results View ──────────────────────────────────────────────────────────────
const ResultsView = ({ data, meta, onReset }) => {
  const {
    overall_match_score, ats_match_score, recruiter_match_score,
    technical_alignment_score, experience_relevance_score, competitiveness_score,
    hiring_probability_estimate, market_competitiveness, detected_domain,
    target_role_alignment, seniority_fit, current_market_signal,
    gap_analysis = {}, keyword_analysis = {}, experience_analysis = {},
    project_analysis = {}, section_scores = {}, recruiter_psychology = {},
    rewrite_suggestions = {}, strategic_insights = {}, educational_insights = [],
  } = data;

  const hiringCfg = HIRING_PROB_CFG[hiring_probability_estimate] || HIRING_PROB_CFG.medium;
  const compCfg   = COMP_CFG[market_competitiveness]             || COMP_CFG.average;
  const fitCfg    = SENIORITY_FIT_CFG[seniority_fit]             || SENIORITY_FIT_CFG.match;

  return (
    <div className="space-y-10">

      {/* ── Hero Score Card ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 rounded-3xl p-8 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative">
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <AIPulse label="AI Match Report" />
            {meta.company_name && <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold border border-white/20">{meta.company_name}</span>}
            {meta.target_role && <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/70 text-xs font-bold border border-white/20">{meta.target_role}</span>}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Big score */}
            <div className="flex-shrink-0 text-center">
              <div className="text-7xl font-black text-white leading-none">{overall_match_score}</div>
              <div className="text-sm text-white/50 font-semibold mt-1">/ 100  Overall Match</div>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${hiringCfg.bg} ${hiringCfg.text} ${hiringCfg.border}`}>
                  {hiringCfg.label} Hire Probability
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${compCfg.bg} ${compCfg.text} ${compCfg.border}`}>
                  {compCfg.label} Competitiveness
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${fitCfg.bg} ${fitCfg.text} ${fitCfg.border}`}>
                  {fitCfg.label}
                </span>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="flex-1 space-y-3">
              {[
                ['ATS Match',           ats_match_score],
                ['Recruiter Match',     recruiter_match_score],
                ['Technical Alignment', technical_alignment_score],
                ['Experience Relevance',experience_relevance_score],
                ['Competitiveness',     competitiveness_score],
              ].map(([label, val], i) => {
                const pct = val;
                const barColor = pct >= 70 ? 'bg-emerald-400' : pct >= 40 ? 'bg-amber-400' : 'bg-rose-400';
                return (
                  <div key={label}>
                    <div className="flex justify-between text-xs text-white/60 mb-1">
                      <span className="font-semibold">{label}</span><span className="font-black text-white">{val}</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div className={`h-full rounded-full ${barColor}`}
                        initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                        transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: [0.22, 1, 0.36, 1] }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Signal Summary ── */}
      <div className="grid md:grid-cols-3 gap-4">
        {current_market_signal && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex gap-3">
            <BarChart2 className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div><p className="text-xs font-black text-blue-600 uppercase tracking-wider mb-1">Market Signal</p><p className="text-sm text-slate-700">{current_market_signal}</p></div>
          </div>
        )}
        {target_role_alignment && (
          <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 flex gap-3">
            <Target className="w-5 h-5 text-violet-500 flex-shrink-0 mt-0.5" />
            <div><p className="text-xs font-black text-violet-600 uppercase tracking-wider mb-1">Role Alignment</p><p className="text-sm text-slate-700">{target_role_alignment}</p></div>
          </div>
        )}
        {current_market_signal && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 flex gap-3">
            <TrendingUp className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
            <div><p className="text-xs font-black text-teal-600 uppercase tracking-wider mb-1">Domain Detected</p><p className="text-sm text-slate-700 font-bold">{detected_domain || 'Auto-detected'}</p></div>
          </div>
        )}
      </div>

      {/* ── Strategic Insights ── */}
      <div>
        <SectionHeading icon={Brain} title="AI Strategic Insights" />
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {strategic_insights.biggest_problem && (
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center"><AlertCircle className="w-4 h-4 text-white" /></div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-200">Critical</span>
              </div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Biggest Problem</p>
              <p className="text-sm text-slate-700 leading-relaxed">{strategic_insights.biggest_problem}</p>
            </div>
          )}
          {strategic_insights.highest_roi_fix && (
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center"><Zap className="w-4 h-4 text-white" /></div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">High ROI</span>
              </div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Highest ROI Fix</p>
              <p className="text-sm text-slate-700 leading-relaxed">{strategic_insights.highest_roi_fix}</p>
            </div>
          )}
          {strategic_insights.fastest_score_boosters?.length > 0 && (
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-2xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 border border-amber-200">Quick Wins</span>
              </div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Fastest Boosters</p>
              <ul className="space-y-1">
                {strategic_insights.fastest_score_boosters.slice(0, 3).map((b, i) => (
                  <li key={i} className="text-sm text-slate-700 flex items-start gap-2"><ArrowRight className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />{b}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Top 3 improvements */}
        {strategic_insights.top_3_improvements?.length > 0 && (
          <div className="bg-gradient-to-br from-violet-50 via-indigo-50 to-white border border-violet-200 rounded-3xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-violet-500" />
              <h3 className="font-black text-slate-900">Top 3 Improvements</h3>
            </div>
            <ol className="space-y-3">
              {strategic_insights.top_3_improvements.map((item, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white border border-violet-100 rounded-2xl shadow-sm">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow">{i + 1}</div>
                  <p className="text-sm text-slate-700 leading-relaxed flex-1">{item}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        )}

        {/* Red flags & hidden strengths */}
        {(strategic_insights.recruiter_red_flags?.length > 0 || strategic_insights.hidden_strengths?.length > 0) && (
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {strategic_insights.recruiter_red_flags?.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                <p className="text-xs font-black text-rose-600 uppercase tracking-wider mb-3">Recruiter Red Flags</p>
                <ul className="space-y-2">
                  {strategic_insights.recruiter_red_flags.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {strategic_insights.hidden_strengths?.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3">Hidden Strengths</p>
                <ul className="space-y-2">
                  {strategic_insights.hidden_strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Gap Analysis ── */}
      <div>
        <SectionHeading icon={Target} title="Gap Analysis" sub="Skills matched vs missing vs weak" />
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {gap_analysis.matched_skills?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" />Matched Skills ({gap_analysis.matched_skills.length})</p>
              <div className="flex flex-wrap gap-2">{gap_analysis.matched_skills.map((s, i) => <Chip key={i} label={s} variant="green" />)}</div>
            </div>
          )}
          {gap_analysis.missing_skills?.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-black text-rose-600 uppercase tracking-wider mb-3 flex items-center gap-1.5"><X className="w-3.5 h-3.5" />Missing Skills ({gap_analysis.missing_skills.length})</p>
              <div className="flex flex-wrap gap-2">{gap_analysis.missing_skills.map((s, i) => <Chip key={i} label={s} variant="red" />)}</div>
            </div>
          )}
        </div>
        {gap_analysis.weak_match_areas?.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <p className="text-xs font-black text-amber-600 uppercase tracking-wider mb-3">Weak Match Areas</p>
            <div className="flex flex-wrap gap-2">{gap_analysis.weak_match_areas.map((s, i) => <Chip key={i} label={s} variant="amber" />)}</div>
          </div>
        )}
      </div>

      {/* ── Keyword Analysis ── */}
      <div>
        <SectionHeading icon={Hash} title="Keyword Analysis" />
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5">
          {keyword_analysis.keyword_match_percentage !== undefined && (
            <div>
              <div className="flex justify-between text-sm font-semibold text-slate-700 mb-2">
                <span>Keyword Match Rate</span>
                <span className={scoreColor(keyword_analysis.keyword_match_percentage).text}>{keyword_analysis.keyword_match_percentage}%</span>
              </div>
              <ProgressBar score={keyword_analysis.keyword_match_percentage} />
            </div>
          )}
          {keyword_analysis.high_priority_keywords?.length > 0 && (
            <div>
              <p className="text-xs font-black text-violet-600 uppercase tracking-wider mb-2">High Priority Keywords</p>
              <div className="flex flex-wrap gap-2">{keyword_analysis.high_priority_keywords.map((k, i) => <Chip key={i} label={k} variant="violet" />)}</div>
            </div>
          )}
          {keyword_analysis.missing_keywords?.length > 0 && (
            <div>
              <p className="text-xs font-black text-rose-600 uppercase tracking-wider mb-2">Missing Keywords</p>
              <div className="flex flex-wrap gap-2">{keyword_analysis.missing_keywords.map((k, i) => <Chip key={i} label={k} variant="red" />)}</div>
            </div>
          )}
          {keyword_analysis.ats_risk_factors?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-black text-rose-600 uppercase tracking-wider">ATS Risk Factors</p>
              {keyword_analysis.ats_risk_factors.map((r, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-rose-50 border border-rose-200 rounded-xl">
                  <Shield className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700">{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Section Scores ── */}
      <div>
        <SectionHeading icon={BarChart2} title="Section Scores" sub="(click to expand details)" />
        <div className="space-y-3">
          {Object.entries(section_scores).map(([key, val], i) => (
            <SectionScoreCard key={key} sectionKey={key} data={val} delay={i * 0.06} />
          ))}
        </div>
      </div>

      {/* ── Experience Bullets ── */}
      {experience_analysis.optimized_bullets?.length > 0 && (
        <div>
          <SectionHeading icon={Briefcase} title="AI-Optimized Experience Bullets" />
          <div className="space-y-4">
            {experience_analysis.optimized_bullets.map((b, i) => (
              <BeforeAfter key={i} original={b.original} optimized={b.optimized} reason={b.reason} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Recruiter Psychology ── */}
      <div>
        <SectionHeading icon={Users} title="Recruiter Psychology" />
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {[
            { label: 'First Impression', value: recruiter_psychology.first_impression, icon: Eye, color: 'blue' },
            { label: 'Ownership Signals', value: recruiter_psychology.ownership_signals, icon: Award, color: 'violet' },
            { label: 'Differentiation', value: recruiter_psychology.differentiation_assessment, icon: Star, color: 'teal' },
            { label: 'Hiring Narrative', value: recruiter_psychology.hiring_probability_narrative, icon: Brain, color: 'indigo' },
          ].filter(x => x.value).map(({ label, value, icon: Icon, color }, i) => {
            const colors = {
              blue: 'bg-blue-50 border-blue-200 text-blue-600',
              violet: 'bg-violet-50 border-violet-200 text-violet-600',
              teal: 'bg-teal-50 border-teal-200 text-teal-600',
              indigo: 'bg-indigo-50 border-indigo-200 text-indigo-600',
            };
            const iconBg = { blue: 'bg-blue-500', violet: 'bg-violet-500', teal: 'bg-teal-500', indigo: 'bg-indigo-500' };
            return (
              <motion.div key={label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-xl ${iconBg[color]} flex items-center justify-center`}><Icon className="w-4 h-4 text-white" /></div>
                  <p className={`text-xs font-black uppercase tracking-wider ${colors[color].split(' ')[2]}`}>{label}</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{value}</p>
              </motion.div>
            );
          })}
        </div>
        {(recruiter_psychology.red_flags?.length > 0 || recruiter_psychology.hidden_strengths?.length > 0) && (
          <div className="grid md:grid-cols-2 gap-4">
            {recruiter_psychology.red_flags?.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
                <p className="text-xs font-black text-rose-600 uppercase tracking-wider mb-3">Red Flags</p>
                <ul className="space-y-2">
                  {recruiter_psychology.red_flags.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><AlertTriangle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0 mt-0.5" />{f}</li>
                  ))}
                </ul>
              </div>
            )}
            {recruiter_psychology.hidden_strengths?.length > 0 && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
                <p className="text-xs font-black text-emerald-600 uppercase tracking-wider mb-3">Hidden Strengths</p>
                <ul className="space-y-2">
                  {recruiter_psychology.hidden_strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── AI Rewrite Suggestions ── */}
      <div>
        <SectionHeading icon={Sparkles} title="AI Rewrite Suggestions" />
        <div className="space-y-4">
          {[
            { key: 'headline', label: 'Headline', value: rewrite_suggestions.headline },
            { key: 'summary', label: 'Summary', value: rewrite_suggestions.summary },
            { key: 'skills_positioning', label: 'Skills Positioning', value: rewrite_suggestions.skills_positioning },
          ].filter(x => x.value).map(({ key, label, value }) => (
            <div key={key} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-violet-50 to-indigo-50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-violet-500" />
                  <span className="font-black text-slate-900 text-sm">{label}</span>
                </div>
                <CopyButton text={value} />
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{value}</p>
              </div>
            </div>
          ))}
          {rewrite_suggestions.experience_bullets?.length > 0 && (
            <div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Experience Bullets</p>
              <div className="space-y-3">
                {rewrite_suggestions.experience_bullets.map((b, i) => (
                  <BeforeAfter key={i} original={b.original} optimized={b.optimized} reason={b.reason} index={i} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Project Analysis ── */}
      {(project_analysis.technical_depth_assessment || project_analysis.missing_project_signals?.length > 0 || project_analysis.suggested_projects_to_add?.length > 0) && (
        <div>
          <SectionHeading icon={FolderOpen} title="Project Analysis" />
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            {project_analysis.project_relevance_score !== undefined && (
              <ScoreRow label="Project Relevance Score" score={project_analysis.project_relevance_score} delay={0} />
            )}
            {project_analysis.technical_depth_assessment && (
              <p className="text-sm text-slate-600 italic border-l-2 border-indigo-300 pl-3 leading-relaxed">{project_analysis.technical_depth_assessment}</p>
            )}
            {project_analysis.missing_project_signals?.length > 0 && (
              <div>
                <p className="text-xs font-black text-rose-600 uppercase tracking-wider mb-2">Missing Signals</p>
                <div className="flex flex-wrap gap-2">{project_analysis.missing_project_signals.map((s, i) => <Chip key={i} label={s} variant="red" />)}</div>
              </div>
            )}
            {project_analysis.suggested_projects_to_add?.length > 0 && (
              <div>
                <p className="text-xs font-black text-indigo-600 uppercase tracking-wider mb-2">Suggested Projects to Add</p>
                <ul className="space-y-1.5">
                  {project_analysis.suggested_projects_to_add.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700"><ArrowRight className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Educational Insights ── */}
      {educational_insights?.length > 0 && (
        <div>
          <SectionHeading icon={BookOpen} title="Educational Insights" sub="Expand to learn" />
          <div className="space-y-3">
            {educational_insights.map((insight, i) => (
              <ExpandableCard key={i} index={i} {...insight} />
            ))}
          </div>
        </div>
      )}

      {/* ── Reset ── */}
      <div className="flex justify-center pt-4">
        <button onClick={onReset}
          className="flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-slate-300 text-slate-600 font-bold hover:bg-slate-50 hover:border-slate-400 transition">
          <RefreshCw className="w-4 h-4" />
          Analyze Another Job
        </button>
      </div>
    </div>
  );
};

// ─── Input Form ────────────────────────────────────────────────────────────────
const InputForm = ({ onSubmit, loading, error }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [seniorityLevel, setSeniorityLevel] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!pdfFile) errs.pdfFile = 'Please select a PDF file.';
    else if (pdfFile.type !== 'application/pdf') errs.pdfFile = 'Only PDF files are accepted.';
    else if (pdfFile.size > 10 * 1024 * 1024) errs.pdfFile = 'File exceeds maximum size of 10MB.';
    if (!jobDescription.trim()) errs.jobDescription = 'Job description is required.';
    else if (jobDescription.length > 20000) errs.jobDescription = 'Job description must be under 20,000 characters.';
    if (companyName.length > 200) errs.companyName = 'Max 200 characters.';
    if (targetRole.length > 200) errs.targetRole = 'Max 200 characters.';
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setValidationErrors(errs);
    if (Object.keys(errs).length > 0) return;
    onSubmit({ file: pdfFile, job_description: jobDescription, company_name: companyName, target_role: targetRole, seniority_level: seniorityLevel });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setPdfFile(file);
    setValidationErrors(v => ({ ...v, pdfFile: undefined }));
  };

  const canSubmit = pdfFile && jobDescription.trim() && !loading;

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      {/* Hero header */}
      <div className="text-center py-6">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl mb-4"
        >
          <Target className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Targeted Resume Analyzer</h2>
        <p className="text-slate-500 max-w-lg mx-auto text-sm">
          Paste your resume and the job description. Our AI will score your match, identify gaps, and generate recruiter-optimized rewrites.
        </p>
      </div>

      {/* Error banner */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
          <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-rose-700">{error}</p>
        </motion.div>
      )}

      {/* Two-column textarea layout */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Resume PDF Upload */}
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-800">
            Resume (PDF) <span className="text-rose-500">*</span>
          </label>
          <label
            className={`flex flex-col items-center justify-center gap-3 w-full rounded-2xl border-2 border-dashed cursor-pointer transition min-h-[200px] px-6 py-8 ${
              validationErrors.pdfFile
                ? 'border-rose-400 bg-rose-50'
                : pdfFile
                ? 'border-emerald-400 bg-emerald-50 hover:bg-emerald-100'
                : 'border-slate-300 bg-white hover:border-indigo-400 hover:bg-indigo-50'
            }`}
          >
            <input
              type="file"
              accept=".pdf"
              className="sr-only"
              onChange={handleFileChange}
            />
            {pdfFile ? (
              <>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-emerald-700 truncate max-w-xs">{pdfFile.name}</p>
                  <p className="text-xs text-emerald-600 mt-0.5">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB · Click to change</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-700">Click to upload your resume</p>
                  <p className="text-xs text-slate-400 mt-0.5">PDF only · Max 10MB</p>
                </div>
              </>
            )}
          </label>
          {validationErrors.pdfFile && <p className="text-xs text-rose-600 font-semibold">{validationErrors.pdfFile}</p>}
        </div>

        {/* JD */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-black text-slate-800">
              Job Description <span className="text-rose-500">*</span>
            </label>
            <span className={`text-xs font-semibold ${jobDescription.length > 18000 ? 'text-rose-600' : 'text-slate-400'}`}>
              {jobDescription.length.toLocaleString()} / 20,000
            </span>
          </div>
          <textarea
            value={jobDescription}
            onChange={e => { setJobDescription(e.target.value); setValidationErrors(v => ({ ...v, jobDescription: undefined })); }}
            placeholder="Paste the full job description here. Include: role overview, responsibilities, requirements, nice-to-haves, company info..."
            rows={18}
            maxLength={20000}
            className={`w-full px-4 py-3 rounded-2xl border-2 text-sm text-slate-700 placeholder-slate-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 transition font-mono leading-relaxed ${
              validationErrors.jobDescription ? 'border-rose-400 bg-rose-50' : 'border-slate-200 bg-white hover:border-slate-300 focus:border-indigo-400'
            }`}
          />
          {validationErrors.jobDescription && <p className="text-xs text-rose-600 font-semibold">{validationErrors.jobDescription}</p>}
        </div>
      </div>

      {/* Optional fields */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
        <p className="text-xs font-black text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Info className="w-3.5 h-3.5" /> Optional Context (improves analysis accuracy)
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Company Name</label>
            <input
              type="text" value={companyName} maxLength={200}
              onChange={e => setCompanyName(e.target.value)}
              placeholder="e.g. Google, Stripe..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Target Role</label>
            <input
              type="text" value={targetRole} maxLength={200}
              onChange={e => setTargetRole(e.target.value)}
              placeholder="e.g. Senior Software Engineer..."
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Seniority Level</label>
            <select
              value={seniorityLevel}
              onChange={e => setSeniorityLevel(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
            >
              {SENIORITY_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Submit */}
      <motion.button
        whileHover={{ scale: canSubmit ? 1.015 : 1 }}
        whileTap={{ scale: canSubmit ? 0.985 : 1 }}
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 transition-all shadow-lg ${
          canSubmit
            ? 'bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white hover:shadow-xl'
            : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
        }`}
      >
        {loading ? (
          <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing...</>
        ) : (
          <><Sparkles className="w-5 h-5" /> Analyze Match <ArrowRight className="w-5 h-5" /></>
        )}
      </motion.button>

      <p className="text-center text-xs text-slate-400">🔒 Your data is private. Analysis takes up to 2 minutes for deep results.</p>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────
const TargetedResume = ({ token }) => {
  const [phase, setPhase] = useState('input'); // 'input' | 'loading' | 'results'
  const [result, setResult] = useState(null);
  const [apiError, setApiError] = useState('');
  const [submittedMeta, setSubmittedMeta] = useState({});

  const handleSubmit = async (payload) => {
    setPhase('loading');
    setApiError('');
    setSubmittedMeta({ company_name: payload.company_name, target_role: payload.target_role });

    const formData = new FormData();
    formData.append('file', payload.file);
    formData.append('job_description', payload.job_description);
    if (payload.company_name?.trim()) formData.append('company_name', payload.company_name.trim());
    if (payload.target_role?.trim()) formData.append('target_role', payload.target_role.trim());
    if (payload.seniority_level) formData.append('seniority_level', payload.seniority_level);

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/resume/targeted-review`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 130000, // 130s — API can take up to 2 min
        }
      );

      if (res.data?.success && res.data?.data) {
        setResult(res.data.data);
        setPhase('results');
      } else {
        throw new Error('Unexpected response format.');
      }
    } catch (err) {
      console.error('[TargetedResume]', err);
      setApiError(getErrorMessage(err));
      setPhase('input');
    }
  };

  const handleReset = () => { setPhase('input'); setResult(null); setApiError(''); setSubmittedMeta({}); };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {phase === 'input' && (
          <motion.div key="input"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
          >
            <InputForm onSubmit={handleSubmit} loading={false} error={apiError} />
          </motion.div>
        )}

        {phase === 'loading' && (
          <motion.div key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
          >
            <ProcessingView />
          </motion.div>
        )}

        {phase === 'results' && result && (
          <motion.div key="results"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
          >
            <ResultsView data={result} meta={submittedMeta} onReset={handleReset} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TargetedResume;
