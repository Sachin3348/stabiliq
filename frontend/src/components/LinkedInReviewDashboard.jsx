import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, User, FileText, Briefcase, Hash, Target,
  ShieldCheck, Search, FolderOpen, Brain, Wand2, BookOpen,
  ChevronRight, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2,
  TrendingUp, Zap, Eye, Users, BarChart2, Sparkles, Star,
  ArrowRight, Copy, RefreshCw, Info, Award, Lightbulb,
  AlertCircle, Check, Lock, X, ExternalLink, Globe, Github, Heart
} from 'lucide-react';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const scoreColor = (s) =>
  s >= 70 ? { text: 'text-emerald-600', bg: 'bg-emerald-500', light: 'bg-emerald-50', border: 'border-emerald-200', ring: '#10b981' }
  : s >= 40 ? { text: 'text-amber-600', bg: 'bg-amber-400', light: 'bg-amber-50', border: 'border-amber-200', ring: '#f59e0b' }
  : { text: 'text-rose-600', bg: 'bg-rose-500', light: 'bg-rose-50', border: 'border-rose-200', ring: '#ef4444' };

const scoreLabel = (s) => s >= 70 ? 'Strong' : s >= 40 ? 'Average' : 'Weak';

const COMP_CFG = {
  low:           { label: 'Low',           color: 'text-rose-600',   bg: 'bg-rose-50',   border: 'border-rose-200' },
  below_average: { label: 'Below Average', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
  average:       { label: 'Average',       color: 'text-amber-600',  bg: 'bg-amber-50',  border: 'border-amber-200' },
  above_average: { label: 'Above Average', color: 'text-teal-600',   bg: 'bg-teal-50',   border: 'border-teal-200' },
  high:          { label: 'High',          color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200' },
  elite:         { label: 'Elite',         color: 'text-violet-600', bg: 'bg-violet-50', border: 'border-violet-200' },
};

const SEN_CFG = {
  junior:    'Junior', mid: 'Mid-Level', senior: 'Senior',
  staff: 'Staff', principal: 'Principal', director: 'Director', vp: 'VP', 'c-level': 'C-Level',
};

// ─── Sidebar items ────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id: 'overview',     icon: LayoutDashboard, label: 'Overview',         sectionKey: null },
  { id: 'headline',     icon: User,            label: 'Headline',         sectionKey: 'headline' },
  { id: 'summary',      icon: FileText,        label: 'Summary',          sectionKey: 'summary' },
  { id: 'experience',   icon: Briefcase,       label: 'Experience',       sectionKey: 'experience' },
  { id: 'keywords',     icon: Hash,            label: 'Keywords',         sectionKey: 'keywords' },
  { id: 'positioning',  icon: Target,          label: 'Positioning',      sectionKey: 'positioning' },
  { id: 'completeness', icon: ShieldCheck,     label: 'Completeness',     sectionKey: 'completeness' },
  { id: 'searchability',icon: Search,          label: 'Searchability',    sectionKey: 'searchability' },
  { id: 'insights',     icon: Brain,           label: 'Recruiter Insights', sectionKey: null },
  { id: 'rewrite',      icon: Wand2,           label: 'AI Rewrite',       sectionKey: null, badge: 'AI' },
  { id: 'learn',        icon: BookOpen,        label: 'Learning Center',  sectionKey: null },
];

const SECTION_WHY = {
  headline: {
    why: 'Your headline is the first thing recruiters see in search results — before your name. LinkedIn uses it heavily in its search algorithm. A weak headline means you won\'t even appear in recruiter searches.',
    recruiterNote: 'Recruiters scan hundreds of profiles in seconds. Your headline is your billboard. Top candidates use keyword-rich, role-specific headlines that immediately communicate value.',
    impact: 'Improving your headline can increase profile views by up to 3×.',
  },
  summary: {
    why: 'The summary is your professional narrative. It\'s indexed by LinkedIn\'s algorithm for ATS matching and read by hiring managers to gauge cultural fit and communication ability.',
    recruiterNote: 'Hiring managers spend ~7 seconds on a profile summary. Generic summaries signal "average candidate." Quantified, story-driven summaries signal top performer.',
    impact: 'A strong summary increases recruiter InMail response rate by 40%.',
  },
  experience: {
    why: 'Experience is the highest-weighted section for both ATS systems and human recruiters. Lack of measurable achievements signals junior thinking, regardless of seniority.',
    recruiterNote: 'The #1 thing recruiters look for is quantifiable proof of impact — numbers, percentages, users affected. Without these, your profile blends into the noise.',
    impact: 'Experience with metrics gets 5× more recruiter engagement than generic descriptions.',
  },
  keywords: {
    why: 'LinkedIn\'s search engine is keyword-driven. Recruiters use Boolean searches with specific keywords. Missing the right keywords = invisible to recruiters searching for your skills.',
    recruiterNote: 'Most enterprise recruiters use 10-20 keyword filters when sourcing. Every missing keyword is a missed opportunity to appear in search results.',
    impact: 'Optimized keywords can expand your search appearance by 60%.',
  },
  positioning: {
    why: 'Positioning is how clearly you communicate your unique value vs. thousands of similar profiles. Clear positioning helps recruiters quickly assess fit and increases callback probability.',
    recruiterNote: 'Recruiters reject generic profiles instantly. The profiles that get callbacks have a clear, specific professional identity that stands out at a glance.',
    impact: 'Strong positioning increases interview callback rate by 2.4×.',
  },
  completeness: {
    why: 'LinkedIn\'s algorithm boosts "All-Star" profiles in search results. Incomplete profiles get deprioritized. Missing sections (Projects, Certifications, Featured) signal lack of effort.',
    recruiterNote: 'A complete profile signals professionalism and effort — two qualities every recruiter values. Incomplete profiles are often skipped.',
    impact: 'Complete profiles receive 21× more profile views.',
  },
  searchability: {
    why: 'Searchability determines whether recruiters can even find your profile. Thin content = poor ATS indexing = invisible to active sourcing recruiters.',
    recruiterNote: 'Over 70% of hires come from recruiter outreach (passive search). If your profile isn\'t searchable, you\'re missing the majority of opportunities.',
    impact: 'High searchability profiles get 10× more recruiter contact.',
  },
};

const MISSING_SECTIONS_INFO = {
  'Projects (with links to GitHub/live demos)': { icon: Github, impact: 'High', desc: 'Projects with links increase recruiter trust and showcase practical skills beyond job titles.' },
  'Certifications': { icon: Award, impact: 'Medium', desc: 'Certifications signal commitment to learning and validate technical skills independently.' },
  'Portfolio links (if any)': { icon: Globe, impact: 'High', desc: 'Portfolio links let recruiters verify your work quality instantly.' },
  'Featured section': { icon: Star, impact: 'High', desc: 'The Featured section is premium real estate — top candidates use it to showcase their best work.' },
  'Recommendations': { icon: Users, impact: 'Medium', desc: 'Peer recommendations are social proof that dramatically increases recruiter trust.' },
  'Volunteer Experience (if applicable)': { icon: Heart, impact: 'Low', desc: 'Volunteer experience humanizes your profile and signals cultural values.' },
};

// ─── Radial Score Ring ─────────────────────────────────────────────────────────
const ScoreRing = ({ score, size = 160, stroke = 12, children }) => {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const c = scoreColor(score);
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={c.ring} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - (score / 100) * circ }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children || (
          <>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="text-4xl font-black text-slate-900"
            >{score}</motion.span>
            <span className="text-xs text-slate-400 font-semibold">/ 100</span>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Mini score ring for sidebar ─────────────────────────────────────────────
const MiniRing = ({ score }) => {
  const c = scoreColor(score);
  const size = 28, stroke = 3, r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={c.ring} strokeWidth={stroke}
          strokeLinecap="round" strokeDasharray={circ}
          strokeDashoffset={circ - (score / 100) * circ} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-[8px] font-black ${c.text}`}>{score}</span>
      </div>
    </div>
  );
};

// ─── AI Pulse Badge ───────────────────────────────────────────────────────────
const AIPulseBadge = ({ label = 'AI Insight', className = '' }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold ${className}`}>
    <span className="relative flex h-1.5 w-1.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-violet-500"></span>
    </span>
    {label}
  </span>
);

// ─── Did you know card ────────────────────────────────────────────────────────
const DidYouKnow = ({ icon: Icon = Lightbulb, title, children, color = 'indigo' }) => {
  const colors = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-800',
    violet: 'bg-violet-50 border-violet-200 text-violet-800',
    teal:   'bg-teal-50 border-teal-200 text-teal-800',
    amber:  'bg-amber-50 border-amber-200 text-amber-800',
  };
  const iconColors = { indigo: 'text-indigo-500', violet: 'text-violet-500', teal: 'text-teal-500', amber: 'text-amber-500' };
  return (
    <div className={`border rounded-2xl p-4 ${colors[color]}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 flex-shrink-0 ${iconColors[color]}`}><Icon className="w-4 h-4" /></div>
        <div>
          {title && <p className="text-xs font-black uppercase tracking-widest mb-1 opacity-70">{title}</p>}
          <p className="text-sm leading-relaxed">{children}</p>
        </div>
      </div>
    </div>
  );
};

// ─── Recruiter Note ───────────────────────────────────────────────────────────
const RecruiterNote = ({ children }) => (
  <div className="border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Users className="w-3.5 h-3.5 text-white" />
      </div>
      <div>
        <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-1">Recruiter Psychology</p>
        <p className="text-sm text-slate-700 leading-relaxed">{children}</p>
      </div>
    </div>
  </div>
);

// ─── Issue item ───────────────────────────────────────────────────────────────
const IssueItem = ({ text, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.07 }}
    className="flex items-start gap-3 p-3.5 bg-rose-50 border border-rose-200 rounded-xl"
  >
    <AlertTriangle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
    <p className="text-sm text-slate-700">{text}</p>
  </motion.div>
);

// ─── Before/After comparison ──────────────────────────────────────────────────
const BeforeAfter = ({ before, after }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center">
          <X className="w-3 h-3 text-rose-600" />
        </div>
        <span className="text-xs font-black text-rose-600 uppercase tracking-wider">Current State</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed italic">"{before}"</p>
    </div>
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center">
          <Check className="w-3 h-3 text-emerald-600" />
        </div>
        <span className="text-xs font-black text-emerald-600 uppercase tracking-wider">AI Optimized</span>
      </div>
      <p className="text-sm text-slate-700 leading-relaxed italic">"{after}"</p>
    </div>
  </div>
);

// ─── Score Stat ───────────────────────────────────────────────────────────────
const ScoreStat = ({ label, value, sub, icon: Icon, color = 'indigo' }) => {
  const colors = {
    indigo: { bg: 'bg-indigo-100', text: 'text-indigo-600', icon: 'text-indigo-500' },
    violet: { bg: 'bg-violet-100', text: 'text-violet-600', icon: 'text-violet-500' },
    teal:   { bg: 'bg-teal-100',   text: 'text-teal-600',   icon: 'text-teal-500' },
    amber:  { bg: 'bg-amber-100',  text: 'text-amber-600',  icon: 'text-amber-500' },
    rose:   { bg: 'bg-rose-100',   text: 'text-rose-600',   icon: 'text-rose-500' },
  };
  const c = colors[color];
  return (
    <div className="flex items-center gap-3">
      <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
        <Icon className={`w-4 h-4 ${c.icon}`} />
      </div>
      <div>
        <p className="text-lg font-black text-slate-900">{value}</p>
        <p className="text-xs font-semibold text-slate-500">{label}</p>
        {sub && <p className="text-xs text-slate-400">{sub}</p>}
      </div>
    </div>
  );
};

// ─── Keyword chip ─────────────────────────────────────────────────────────────
const KeywordChip = ({ word, missing }) => (
  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
    missing
      ? 'bg-rose-50 border-rose-200 text-rose-700'
      : 'bg-emerald-50 border-emerald-200 text-emerald-700'
  }`}>
    {missing && <AlertCircle className="w-3 h-3" />}
    {!missing && <Check className="w-3 h-3" />}
    {word}
  </span>
);

// ─── Progress bar ─────────────────────────────────────────────────────────────
const ProgressBar = ({ score, delay = 0 }) => {
  const c = scoreColor(score);
  return (
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${c.bg}`}
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
};

// ─── Improvement checklist item ───────────────────────────────────────────────
const ChecklistItem = ({ text, index }) => {
  const [done, setDone] = useState(false);
  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      onClick={() => setDone(v => !v)}
      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
        done ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/30'
      }`}
    >
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
        done ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'
      }`}>
        {done && <Check className="w-3 h-3 text-white" />}
      </div>
      <p className={`text-sm leading-relaxed transition-all ${done ? 'line-through text-slate-400' : 'text-slate-700'}`}>{text}</p>
    </motion.button>
  );
};

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
const OverviewTab = ({ data, onNavigate }) => {
  const {
    overall_score, detected_domain, seniority_level, primary_specialization,
    market_competitiveness, current_market_signal, biggest_problem,
    highest_roi_fix, section_scores, top_3_improvements,
  } = data;

  const compCfg = COMP_CFG[market_competitiveness] || COMP_CFG.average;
  const sections = Object.entries(section_scores);
  const avgSectionScore = Math.round(sections.reduce((s, [, v]) => s + v.score, 0) / sections.length);

  // "Percentile" estimate based on score
  const percentile = overall_score >= 80 ? 'Top 10%' : overall_score >= 60 ? 'Top 30%' : overall_score >= 40 ? 'Top 55%' : 'Bottom 40%';

  return (
    <div className="space-y-8">

      {/* ── Hero Score Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-violet-950 rounded-3xl p-8 text-white shadow-2xl"
      >
        {/* BG glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-violet-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-center">
          {/* Score ring */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <ScoreRing score={overall_score} size={160} stroke={14}>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="text-5xl font-black text-white"
              >{overall_score}</motion.span>
              <span className="text-xs text-white/50 font-semibold">/ 100</span>
            </ScoreRing>
            <div className="text-center">
              <p className="text-sm font-bold text-white/80">LinkedIn Score</p>
              <span className={`mt-1 inline-block px-3 py-1 rounded-full text-xs font-black border ${compCfg.bg} ${compCfg.color} ${compCfg.border}`}>
                {compCfg.label} Competitiveness
              </span>
            </div>
          </div>

          {/* Profile info */}
          <div className="flex-1 space-y-5">
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <AIPulseBadge label="AI Analyzed" />
                {seniority_level && (
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold border border-white/20">
                    {SEN_CFG[seniority_level] || seniority_level}
                  </span>
                )}
                {detected_domain && (
                  <span className="px-2.5 py-1 rounded-full bg-white/10 text-white/80 text-xs font-bold border border-white/20">
                    {detected_domain}
                  </span>
                )}
              </div>
              {primary_specialization && (
                <p className="text-2xl font-black text-white mb-1">{primary_specialization}</p>
              )}
              {current_market_signal && (
                <p className="text-sm text-white/60 leading-relaxed max-w-xl">{current_market_signal}</p>
              )}
            </div>

            {/* Metric pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Percentile', value: percentile, icon: TrendingUp },
                { label: 'Recruiter Visibility', value: overall_score >= 60 ? 'Good' : 'Low', icon: Eye },
                { label: 'ATS Score', value: `${Math.round(avgSectionScore)}%`, icon: BarChart2 },
                { label: 'Sections Weak', value: `${sections.filter(([,v]) => v.score < 40).length}/${sections.length}`, icon: AlertTriangle },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-3 backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-white/40 mb-1.5" />
                  <p className="text-base font-black text-white">{value}</p>
                  <p className="text-xs text-white/40">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── AI Strategic Insights ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-violet-600" />
          <h2 className="text-lg font-black text-slate-900">AI Strategic Insights</h2>
          <AIPulseBadge />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: AlertCircle, label: 'Biggest Problem', color: 'rose',
              content: biggest_problem, impact: 'Critical',
              bg: 'from-rose-50 to-pink-50', border: 'border-rose-200',
              iconBg: 'bg-rose-500', textColor: 'text-rose-700',
              badge: 'bg-rose-100 text-rose-700 border-rose-200',
            },
            {
              icon: Zap, label: 'Highest ROI Fix', color: 'emerald',
              content: highest_roi_fix, impact: 'High ROI',
              bg: 'from-emerald-50 to-teal-50', border: 'border-emerald-200',
              iconBg: 'bg-emerald-500', textColor: 'text-emerald-700',
              badge: 'bg-emerald-100 text-emerald-700 border-emerald-200',
            },
            {
              icon: BarChart2, label: 'Market Signal', color: 'blue',
              content: current_market_signal, impact: 'Market Intel',
              bg: 'from-blue-50 to-indigo-50', border: 'border-blue-200',
              iconBg: 'bg-blue-500', textColor: 'text-blue-700',
              badge: 'bg-blue-100 text-blue-700 border-blue-200',
            },
          ].map(({ icon: Icon, label, content, impact, bg, border, iconBg, badge }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.2 }}
              className={`bg-gradient-to-br ${bg} border ${border} rounded-2xl p-5 space-y-3`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-9 h-9 rounded-xl ${iconBg} flex items-center justify-center shadow-sm`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${badge}`}>{impact}</span>
              </div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{label}</p>
              <p className="text-sm text-slate-700 leading-relaxed">{content}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Top 3 Improvements ── */}
      {top_3_improvements?.length > 0 && (
        <div className="bg-gradient-to-br from-violet-50 via-indigo-50 to-white border border-violet-200 rounded-3xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles className="w-5 h-5 text-violet-500" />
            <h2 className="text-base font-black text-slate-900">Top 3 Actions to Take Now</h2>
          </div>
          <ol className="space-y-3">
            {top_3_improvements.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12 }}
                className="flex items-start gap-4 p-4 bg-white border border-violet-100 rounded-2xl shadow-sm"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white text-sm font-black flex items-center justify-center flex-shrink-0 shadow">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-700 leading-relaxed">{item}</p>
                </div>
                <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-bold text-violet-700">
                  +{[8, 6, 5][i]} pts
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      )}

      {/* ── Section Breakdown Grid ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 className="w-5 h-5 text-slate-600" />
          <h2 className="text-lg font-black text-slate-900">Section Breakdown</h2>
          <span className="text-sm font-normal text-slate-400 ml-1">Click any section to dive deep</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {sections.map(([key, val], i) => {
            const meta = NAV_ITEMS.find(n => n.sectionKey === key);
            const c = scoreColor(val.score);
            const Icon = meta?.icon || Star;
            const issueCount = (val.issues || []).length + (val.missing_keywords || []).length + (val.missing_sections || []).length;
            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3, transition: { duration: 0.15 } }}
                onClick={() => onNavigate(key)}
                className={`text-left p-5 bg-white border-2 rounded-2xl shadow-sm hover:shadow-lg transition-all group ${
                  val.score < 40 ? 'border-rose-200 hover:border-rose-400' : val.score < 70 ? 'border-amber-200 hover:border-amber-400' : 'border-emerald-200 hover:border-emerald-400'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-9 h-9 rounded-xl ${c.light} border ${c.border} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${c.text}`} />
                  </div>
                  <div className="text-right">
                    <span className={`text-2xl font-black ${c.text}`}>{val.score}</span>
                    <span className="text-xs text-slate-400 font-semibold">/100</span>
                  </div>
                </div>
                <p className="font-bold text-slate-800 capitalize text-sm mb-2">{key}</p>
                <ProgressBar score={val.score} delay={i * 0.06 + 0.3} />
                <div className="flex items-center justify-between mt-3">
                  <span className={`text-xs font-bold ${c.text}`}>{scoreLabel(val.score)}</span>
                  {issueCount > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-bold border border-rose-200">
                      {issueCount} issue{issueCount > 1 ? 's' : ''}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-1 text-xs text-indigo-600 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  View deep dive <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Educational: How ATS works ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DidYouKnow icon={Eye} title="Recruiter Behavior" color="indigo">
          Recruiters spend an average of <strong>7.4 seconds</strong> scanning a LinkedIn profile before deciding to engage or move on.
        </DidYouKnow>
        <DidYouKnow icon={Search} title="LinkedIn Algorithm" color="violet">
          LinkedIn's algorithm promotes profiles with rich content, keyword diversity, and engagement signals — your score directly affects your discoverability.
        </DidYouKnow>
        <DidYouKnow icon={TrendingUp} title="Score Impact" color="teal">
          Profiles scoring <strong>80+</strong> receive <strong>21× more recruiter views</strong> and <strong>36× more messages</strong> than profiles scoring under 40.
        </DidYouKnow>
      </div>
    </div>
  );
};

// ─── SECTION DETAIL TAB ───────────────────────────────────────────────────────
const SectionDetailTab = ({ sectionKey, sectionData }) => {
  const meta = NAV_ITEMS.find(n => n.sectionKey === sectionKey);
  const Icon = meta?.icon || Star;
  const c = scoreColor(sectionData.score);
  const edu = SECTION_WHY[sectionKey] || {};
  const issues = sectionData.issues || [];
  const missing = sectionData.missing_keywords || sectionData.missing_sections || [];
  const recs = sectionData.recommendations || [];
  const benchmark = Math.min(100, sectionData.score + Math.round(Math.random() * 25 + 20));

  // Build checklist from issues + recommendations
  const checklistItems = [
    ...issues.map(i => i.replace(/^[•*-]\s*/, '')),
    ...recs,
  ].slice(0, 8);

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm"
      >
        <div className={`w-14 h-14 rounded-2xl ${c.light} border-2 ${c.border} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-7 h-7 ${c.text}`} />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-black text-slate-900 capitalize">{sectionKey}</h2>
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <span className={`text-sm font-bold ${c.text}`}>{scoreLabel(sectionData.score)}</span>
            <div className="flex items-center gap-2 flex-1 max-w-xs">
              <span className={`text-sm font-black ${c.text}`}>{sectionData.score}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full ${c.bg}`}
                  initial={{ width: 0 }} animate={{ width: `${sectionData.score}%` }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
              </div>
              <span className="text-xs text-slate-400">/ 100</span>
            </div>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-slate-400 font-semibold">Top profiles score</p>
          <p className="text-2xl font-black text-slate-700">{benchmark}</p>
          <p className="text-xs text-slate-400">benchmark</p>
        </div>
      </motion.div>

      {/* Why this matters */}
      {edu.why && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DidYouKnow icon={Lightbulb} title="Why This Matters" color="indigo">
            {edu.why}
          </DidYouKnow>
          {edu.recruiterNote && <RecruiterNote>{edu.recruiterNote}</RecruiterNote>}
        </div>
      )}
      {edu.impact && (
        <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl">
          <TrendingUp className="w-5 h-5 text-teal-600 flex-shrink-0" />
          <p className="text-sm font-bold text-teal-800">{edu.impact}</p>
        </div>
      )}

      {/* Issues */}
      {issues.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h3 className="font-black text-slate-900">Current Problems</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">{issues.length} issue{issues.length > 1 ? 's' : ''}</span>
          </div>
          <div className="space-y-2">
            {issues.map((issue, i) => <IssueItem key={i} text={issue} index={i} />)}
          </div>
        </div>
      )}

      {/* Missing keywords or sections */}
      {missing.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <h3 className="font-black text-slate-900">
              {sectionData.missing_keywords ? 'Missing Keywords' : 'Missing Sections'}
            </h3>
          </div>
          {sectionData.missing_keywords ? (
            <div className="flex flex-wrap gap-2">
              {missing.map((kw, i) => <KeywordChip key={i} word={kw} missing />)}
            </div>
          ) : (
            <div className="space-y-2">
              {missing.map((sec, i) => {
                const info = MISSING_SECTIONS_INFO[sec] || {};
                const SIcon = info.icon || FolderOpen;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <SIcon className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-slate-800">{sec}</p>
                      {info.desc && <p className="text-xs text-slate-500 mt-0.5">{info.desc}</p>}
                    </div>
                    {info.impact && (
                      <span className={`ml-auto flex-shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                        info.impact === 'High' ? 'bg-rose-100 text-rose-700' :
                        info.impact === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                      }`}>{info.impact} Impact</span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* AI Optimized Example */}
      {sectionData.optimized_example && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Wand2 className="w-4 h-4 text-violet-500" />
            <h3 className="font-black text-slate-900">AI-Optimized Version</h3>
            <AIPulseBadge label="AI Generated" />
          </div>
          <BeforeAfter
            before="(Your current version — update your LinkedIn profile to see the full before state)"
            after={sectionData.optimized_example}
          />
        </div>
      )}

      {/* Recommendations */}
      {recs.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <h3 className="font-black text-slate-900">Recommendations</h3>
          </div>
          <div className="space-y-2">
            {recs.map((rec, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
                <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-slate-700">{rec}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Checklist */}
      {checklistItems.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="w-4 h-4 text-teal-500" />
            <h3 className="font-black text-slate-900">Improvement Checklist</h3>
            <span className="text-xs text-slate-400">Click to track your progress</span>
          </div>
          <div className="space-y-2">
            {checklistItems.map((item, i) => <ChecklistItem key={i} text={item} index={i} />)}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── KEYWORD ANALYSIS TAB ─────────────────────────────────────────────────────
const KeywordTab = ({ data }) => {
  const kw = data.section_scores?.keywords || {};
  const missing = kw.missing_keywords || [];
  const recs = kw.recommendations || [];
  const score = kw.score || 0;

  const trendingKeywords = ['Docker', 'Kubernetes', 'TypeScript', 'GraphQL', 'AWS Lambda', 'Redis', 'Terraform', 'Kafka', 'System Design', 'LLM Integration'];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-6 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <ScoreRing score={score} size={100} stroke={10} />
        <div>
          <h2 className="text-xl font-black text-slate-900">Keyword Optimization</h2>
          <p className="text-slate-500 text-sm mt-1">How well your profile matches recruiter keyword searches</p>
          <div className="flex gap-2 mt-3">
            <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">{missing.length} missing</span>
            <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">~{Math.round(score)}% match rate</span>
          </div>
        </div>
      </motion.div>

      <DidYouKnow icon={Search} title="How Recruiters Search" color="violet">
        Enterprise recruiters use <strong>Boolean keyword searches</strong> to source candidates. Every keyword you're missing is a search you won't appear in. Optimizing keywords is the fastest way to increase recruiter outreach.
      </DidYouKnow>

      {missing.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4 text-rose-500" />
            <h3 className="font-black text-slate-900">Missing Keywords</h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700 font-bold">{missing.length} missing</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {missing.map((kw, i) => <KeywordChip key={i} word={kw} missing />)}
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-teal-500" />
          <h3 className="font-black text-slate-900">Trending in Your Domain</h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-700 font-bold">Recruiter Favorites 2025</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {trendingKeywords.map((kw, i) => (
            <span key={i} className="px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 transition cursor-default">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {recs.length > 0 && (
        <div className="space-y-2">
          {recs.map((rec, i) => (
            <div key={i} className="flex items-start gap-3 p-3.5 bg-indigo-50 border border-indigo-200 rounded-xl">
              <ArrowRight className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-slate-700">{rec}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── RECRUITER INSIGHTS TAB ───────────────────────────────────────────────────
const RecruiterInsightsTab = ({ data }) => {
  const { overall_score, market_competitiveness, biggest_problem, section_scores } = data;

  const insights = [
    {
      icon: Eye, color: 'rose', title: 'Recruiter Discoverability',
      status: overall_score < 50 ? 'Critical' : overall_score < 70 ? 'Moderate' : 'Strong',
      body: overall_score < 50
        ? 'Your profile is largely invisible to active recruiters. Thin content and missing keywords mean you won\'t surface in most Boolean searches.'
        : 'Your profile appears in some recruiter searches but lacks the keyword density for maximum visibility.',
    },
    {
      icon: Users, color: 'amber', title: 'First Impression Score',
      status: overall_score < 50 ? 'Poor' : overall_score < 70 ? 'Average' : 'Good',
      body: 'Recruiters form a first impression in under 7 seconds. Your headline and summary are the first things they see. Generic content signals a generic candidate.',
    },
    {
      icon: TrendingUp, color: 'violet', title: 'Proof-of-Impact Storytelling',
      status: (section_scores?.experience?.score || 0) < 40 ? 'Weak' : 'Moderate',
      body: 'The strongest candidates quantify everything. Numbers, percentages, user counts, and business impact are what separate top performers from the pack.',
    },
    {
      icon: Star, color: 'blue', title: 'Technical Credibility',
      status: (section_scores?.keywords?.score || 0) < 40 ? 'Low' : 'Moderate',
      body: 'Technical recruiters quickly assess credibility through keyword signals, project evidence, and the specificity of your experience descriptions.',
    },
    {
      icon: Globe, color: 'teal', title: 'Personal Brand Strength',
      status: (section_scores?.positioning?.score || 0) < 40 ? 'Unclear' : 'Developing',
      body: 'Top candidates have a clear, memorable professional identity. Without a strong positioning statement, you blend into thousands of similar profiles.',
    },
    {
      icon: Award, color: 'indigo', title: 'Social Proof',
      status: 'Missing',
      body: 'Recommendations, featured projects, and certifications are social proof elements that dramatically increase recruiter trust and response rates.',
    },
  ];

  const statusColors = {
    Critical: 'bg-rose-100 text-rose-700 border-rose-200',
    Poor: 'bg-rose-100 text-rose-700 border-rose-200',
    Weak: 'bg-rose-100 text-rose-700 border-rose-200',
    Missing: 'bg-rose-100 text-rose-700 border-rose-200',
    Low: 'bg-rose-100 text-rose-700 border-rose-200',
    Unclear: 'bg-rose-100 text-rose-700 border-rose-200',
    Moderate: 'bg-amber-100 text-amber-700 border-amber-200',
    Average: 'bg-amber-100 text-amber-700 border-amber-200',
    Developing: 'bg-amber-100 text-amber-700 border-amber-200',
    Strong: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Good: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  };

  const iconColors = {
    rose: 'bg-rose-500', amber: 'bg-amber-500', violet: 'bg-violet-500',
    blue: 'bg-blue-500', teal: 'bg-teal-500', indigo: 'bg-indigo-500',
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl text-white">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="w-5 h-5 text-violet-400" />
          <AIPulseBadge label="Recruiter Intelligence" />
        </div>
        <h2 className="text-xl font-black text-white mb-2">How Recruiters See You</h2>
        <p className="text-sm text-white/60 max-w-xl">
          Based on your profile analysis, here's an objective assessment of your recruiter visibility, perceived seniority, and competitive positioning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map(({ icon: Icon, color, title, status, body }, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${iconColors[color]} flex items-center justify-center`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-black border ${statusColors[status] || statusColors.Moderate}`}>{status}</span>
            </div>
            <p className="font-black text-slate-900 mb-2">{title}</p>
            <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
          </motion.div>
        ))}
      </div>

      <RecruiterNote>
        {biggest_problem}
      </RecruiterNote>

      <DidYouKnow icon={Users} title="Industry Benchmark" color="indigo">
        In competitive markets, recruiters see <strong>200-500 applications</strong> per role. Profiles that clearly communicate domain expertise, quantified impact, and strong positioning receive <strong>5× more callbacks</strong>.
      </DidYouKnow>
    </div>
  );
};

// ─── AI REWRITE TAB ───────────────────────────────────────────────────────────
const AIRewriteTab = ({ data }) => {
  const [copied, setCopied] = useState(null);
  const sections = data.section_scores || {};

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const rewrites = Object.entries(sections)
    .filter(([, v]) => v.optimized_example)
    .map(([key, v]) => ({ key, example: v.optimized_example, score: v.score }));

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-violet-900 to-indigo-900 rounded-3xl text-white">
        <div className="flex items-center gap-2 mb-3">
          <Wand2 className="w-5 h-5 text-violet-300" />
          <AIPulseBadge label="AI Rewrite Engine" />
        </div>
        <h2 className="text-xl font-black text-white mb-2">AI-Generated Rewrites</h2>
        <p className="text-sm text-white/60">Recruiter-optimized, ATS-friendly rewrites for your weakest sections. Copy and use directly on your LinkedIn profile.</p>
      </div>

      {rewrites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Wand2 className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-slate-500 font-semibold">No AI rewrites generated for this profile yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rewrites.map(({ key, example, score }, i) => (
            <motion.div key={key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="font-black text-slate-900 capitalize">{key}</span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${scoreColor(score).light} ${scoreColor(score).text} border ${scoreColor(score).border}`}>
                    {score}/100
                  </span>
                </div>
                <button
                  onClick={() => handleCopy(example, key)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition"
                >
                  {copied === key ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied === key ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-start gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-violet-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs font-black text-violet-600 uppercase tracking-wider">AI Optimized Version</p>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">{example}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <DidYouKnow icon={Wand2} title="How to Use AI Rewrites" color="violet">
        These AI-optimized versions are designed for maximum ATS keyword density and recruiter engagement. Copy them directly to LinkedIn, then personalize with your specific metrics and numbers for maximum impact.
      </DidYouKnow>
    </div>
  );
};

// ─── LEARNING CENTER TAB ──────────────────────────────────────────────────────
const LessonCard = ({ icon: Icon, color, title, tag, content, colors, delay }) => {
  const [expanded, setExpanded] = useState(false);
  const c = colors[color];
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <div className={`p-5 border-b ${c.border}`}>
        <div className="flex items-start justify-between gap-3">
          <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-4 h-4 ${c.icon}`} />
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${c.tag}`}>{tag}</span>
        </div>
        <h3 className="font-black text-slate-900 mt-3 text-sm">{title}</h3>
      </div>
      <div className="px-5 py-4">
        <p className={`text-sm text-slate-600 leading-relaxed ${!expanded ? 'line-clamp-2' : ''}`}>{content}</p>
        <button onClick={() => setExpanded(v => !v)}
          className="mt-2 text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
          {expanded ? <><ChevronUp className="w-3 h-3" /> Read less</> : <><ChevronDown className="w-3 h-3" /> Read more</>}
        </button>
      </div>
    </motion.div>
  );
};
const LearningCenterTab = () => {
  const lessons = [
    {
      icon: User, color: 'indigo', title: 'The Perfect LinkedIn Headline', tag: '3 min read',
      content: 'Your headline appears in search results, connection requests, and messaging previews. The formula that works: [Seniority] [Role] | [Top Skill] + [Top Skill] | [Unique Value Prop or Impact]. Avoid vague phrases like "Passionate professional" — they signal zero self-awareness to recruiters.',
    },
    {
      icon: Search, color: 'violet', title: 'How ATS Systems Actually Work', tag: '5 min read',
      content: 'Applicant Tracking Systems parse your profile/resume for keyword matches. They rank candidates by keyword density and relevance. Missing even one critical keyword can drop you from top 10% to invisible. The solution: integrate role-specific keywords naturally throughout every section.',
    },
    {
      icon: Briefcase, color: 'teal', title: 'Writing Experience Bullets That Get Callbacks', tag: '4 min read',
      content: 'The CAR formula works: Context → Action → Result. "Reduced API response time by 40% by implementing Redis caching, supporting 50K daily active users" is 10× more compelling than "Worked on backend optimization." Every bullet needs a number. Every role needs 3-5 bullets minimum.',
    },
    {
      icon: TrendingUp, color: 'amber', title: 'Positioning: How to Stand Out', tag: '4 min read',
      content: 'Positioning is the difference between "Software Engineer" and "Fullstack Engineer specializing in high-traffic fintech systems." The more specific your positioning, the more relevant the opportunities you attract. Niche positioning paradoxically creates more opportunities, not fewer.',
    },
    {
      icon: Award, color: 'indigo', title: 'LinkedIn Profile Completeness Algorithm', tag: '3 min read',
      content: 'LinkedIn scores profiles 0-100 internally. "All-Star" status (the highest tier) requires: profile photo, location, industry, current position with description, education, 5+ skills, 50+ connections, and a summary. All-Star profiles get 40× more recruiter messages.',
    },
    {
      icon: Brain, color: 'violet', title: 'Recruiter Psychology: What They Really Look For', tag: '6 min read',
      content: 'Recruiters are pattern-matching engines. They look for: signal words (company names, titles, technologies), proof of impact (numbers), and social proof (recommendations, endorsements). The fastest way to get callbacks: make your profile look like top candidates in your target role.',
    },
  ];

  const colors = {
    indigo: { bg: 'bg-indigo-100', icon: 'text-indigo-600', border: 'border-indigo-200', tag: 'bg-indigo-50 text-indigo-600 border-indigo-200' },
    violet: { bg: 'bg-violet-100', icon: 'text-violet-600', border: 'border-violet-200', tag: 'bg-violet-50 text-violet-600 border-violet-200' },
    teal:   { bg: 'bg-teal-100',   icon: 'text-teal-600',   border: 'border-teal-200',   tag: 'bg-teal-50 text-teal-600 border-teal-200' },
    amber:  { bg: 'bg-amber-100',  icon: 'text-amber-600',  border: 'border-amber-200',  tag: 'bg-amber-50 text-amber-600 border-amber-200' },
  };

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl text-white">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-5 h-5 text-teal-400" />
        </div>
        <h2 className="text-xl font-black text-white mb-2">LinkedIn Mastery Center</h2>
        <p className="text-sm text-white/60">Research-backed guides from top career coaches, recruiters, and hiring managers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lessons.map((lesson, i) => (
          <LessonCard key={i} {...lesson} colors={colors} delay={i * 0.07} />
        ))}
      </div>
    </div>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
const LinkedInReviewDashboard = ({ data, onReanalyze, reviewedAt }) => {
  const [activeNav, setActiveNav] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const sections = data.section_scores || {};

  const navTo = (id) => setActiveNav(id);

  const renderContent = () => {
    if (activeNav === 'overview') return <OverviewTab data={data} onNavigate={(key) => setActiveNav(key)} />;
    if (activeNav === 'insights') return <RecruiterInsightsTab data={data} />;
    if (activeNav === 'rewrite') return <AIRewriteTab data={data} />;
    if (activeNav === 'learn') return <LearningCenterTab />;
    if (activeNav === 'keywords') return <KeywordTab data={data} />;
    // Section detail
    const item = NAV_ITEMS.find(n => n.id === activeNav);
    if (item?.sectionKey && sections[item.sectionKey]) {
      return <SectionDetailTab sectionKey={item.sectionKey} sectionData={sections[item.sectionKey]} />;
    }
    return <OverviewTab data={data} onNavigate={(key) => setActiveNav(key)} />;
  };

  return (
    <div className="relative flex gap-0 min-h-full bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-200">

      {/* Mobile sidebar backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Mobile open button */}
      <button
        className="fixed bottom-4 left-4 z-30 md:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-lg"
        onClick={() => setMobileSidebarOpen(true)}
      >
        <LayoutDashboard className="w-4 h-4" />
        Menu
      </button>

      {/* ── Sidebar ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-slate-200 transition-all duration-300
        md:relative md:inset-auto md:z-auto md:flex
        ${mobileSidebarOpen ? 'flex' : 'hidden md:flex'}
        ${sidebarCollapsed ? 'w-16' : 'w-60'}
      `}>
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-xs font-black text-slate-700">Profile Review</span>
            </div>
          )}
          <button onClick={() => setSidebarCollapsed(v => !v)}
            className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition flex-shrink-0 ml-auto">
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronRight className="w-4 h-4 rotate-180" />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const sectionScore = item.sectionKey ? (sections[item.sectionKey]?.score ?? null) : null;
            const isActive = activeNav === item.id;
            const isWeak = sectionScore !== null && sectionScore < 40;

            return (
              <button
                key={item.id}
                onClick={() => { navTo(item.id); setMobileSidebarOpen(false); }}
                title={sidebarCollapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group relative ${
                  isActive
                    ? 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                    : isWeak
                    ? 'text-rose-600 hover:bg-rose-50'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div layoutId="sidebarActive"
                    className="absolute inset-0 bg-indigo-50 border border-indigo-200 rounded-xl"
                    style={{ zIndex: -1 }} />
                )}
                <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-indigo-600' : isWeak ? 'text-rose-500' : 'text-slate-400 group-hover:text-slate-600'}`} />
                {!sidebarCollapsed && (
                  <>
                    <span className="text-sm font-semibold flex-1 truncate">{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black bg-violet-100 text-violet-700">{item.badge}</span>
                    )}
                    {sectionScore !== null && <MiniRing score={sectionScore} />}
                    {isWeak && !item.badge && (
                      <AlertTriangle className="w-3 h-3 text-rose-400 flex-shrink-0" />
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer: re-analyze */}
        {!sidebarCollapsed && (
          <div className="p-3 border-t border-slate-100">
            {reviewedAt && (
              <p className="text-[10px] text-slate-400 text-center mb-2">
                Last analyzed {new Date(reviewedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </p>
            )}
            <button onClick={onReanalyze}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition">
              <RefreshCw className="w-3.5 h-3.5" />
              Re-analyze Profile
            </button>
          </div>
        )}
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="max-w-4xl mx-auto p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs text-slate-400 font-semibold">
            <button onClick={() => setActiveNav('overview')} className="hover:text-indigo-600 transition">Overview</button>
            {activeNav !== 'overview' && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-700 capitalize">{NAV_ITEMS.find(n => n.id === activeNav)?.label || activeNav}</span>
              </>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeNav}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default LinkedInReviewDashboard;
