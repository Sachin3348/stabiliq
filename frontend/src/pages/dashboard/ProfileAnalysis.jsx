import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  FileText, Upload, Loader2, CheckCircle,
  Clock, RefreshCw,
  TrendingUp, Users, Timer, Target, Zap, ShieldCheck, ChevronDown, ChevronUp,
  Wand2, FileCheck, Linkedin, FileEdit, Sparkles, Briefcase, FolderOpen,
  AlignLeft, PenLine, Star, LayoutList, AlertCircle, CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { TEMPLATES, CATEGORIES } from '../../data/resumeTemplates';
import FilterTabs from '../../components/resume-templates/FilterTabs';
import TemplateGrid from '../../components/resume-templates/TemplateGrid';
import TemplatePreviewModal from '../../components/resume-templates/TemplatePreviewModal';
import MagicWriter from '../../components/MagicWriter';
import TargetedResume from '../../components/TargetedResume';
import LinkedInOptimizer from '../../components/LinkedInOptimizer';
import ToolkitOverview from '../../components/ToolkitOverview';

// ─── Resume Processing Animation ──────────────────────────────────────────────
const RESUME_PROCESSING_MESSAGES = [
  'Reading your resume…',
  'Extracting experience & projects…',
  'Identifying skills & keywords…',
  'Scoring ATS compatibility…',
  'Almost done…',
];

const RESUME_STEPS = [
  { label: 'Resume parsed', delay: 0.4 },
  { label: 'Content extracted', delay: 1.2 },
  { label: 'AI scoring in progress…', delay: 2.0, pending: true },
];

const ResumeProcessingView = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const [stepVisible, setStepVisible] = useState([false, false, false]);

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIndex(i => (i + 1) % RESUME_PROCESSING_MESSAGES.length);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    RESUME_STEPS.forEach((step, i) => {
      const t = setTimeout(() => {
        setStepVisible(prev => { const next = [...prev]; next[i] = true; return next; });
      }, step.delay * 1000);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <motion.div
      key="processing"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 gap-8"
    >
      {/* Pulsing document icon */}
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.55, 0.25] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-24 h-24 rounded-full bg-teal-400/30"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="absolute w-36 h-36 rounded-full bg-teal-300/15"
        />
        <motion.div
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-xl shadow-teal-500/30"
        >
          <FileText className="w-8 h-8 text-white" />
        </motion.div>
      </div>

      {/* Rotating message */}
      <div className="flex flex-col items-center gap-1 min-h-[52px]">
        <AnimatePresence mode="wait">
          <motion.p
            key={msgIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="font-bold text-slate-900 text-lg text-center"
          >
            {RESUME_PROCESSING_MESSAGES[msgIndex]}
          </motion.p>
        </AnimatePresence>
        <p className="text-slate-400 text-sm">This usually takes 10–20 seconds</p>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-xs">
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500"
            initial={{ width: '4%' }}
            animate={{ width: '90%' }}
            transition={{ duration: 20, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Step checklist */}
      <div className="flex flex-col gap-2.5 w-full max-w-xs">
        {RESUME_STEPS.map((step, i) => (
          <AnimatePresence key={step.label}>
            {stepVisible[i] && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2.5"
              >
                {step.pending ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 rounded-full border-2 border-teal-500 border-t-transparent flex-shrink-0"
                  />
                ) : (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0"
                  >
                    <CheckCircle2 className="w-3 h-3 text-white" />
                  </motion.div>
                )}
                <span className={`text-sm ${step.pending ? 'text-slate-500' : 'text-slate-700 font-medium'}`}>
                  {step.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>
    </motion.div>
  );
};

// ─── Animated Counter ─────────────────────────────────────────────────────────
const useCountUp = (target, duration = 1800, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
};

// ─── Single Stat Card ─────────────────────────────────────────────────────────
const StatCard = ({ value, suffix = '', prefix = '', label, sub, icon: Icon, color, delay, inView }) => {
  const count = useCountUp(parseInt(value), 1600, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-col gap-3"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        <div className="text-3xl font-extrabold text-slate-900 tabular-nums" style={{ fontFamily: 'Sora, sans-serif' }}>
          {prefix}{count}{suffix}
        </div>
        <p className="text-sm font-semibold text-slate-700 mt-0.5">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5 leading-snug">{sub}</p>}
      </div>
    </motion.div>
  );
};

// ─── ATS Funnel ───────────────────────────────────────────────────────────────
const FUNNEL_STEPS = [
  { label: 'Applications Sent', value: 250, color: 'bg-slate-200', textColor: 'text-slate-700', width: '100%' },
  { label: 'Pass ATS Screening', value: 25,  color: 'bg-amber-300', textColor: 'text-amber-900', width: '40%' },
  { label: 'Human Review',       value: 10,  color: 'bg-orange-400', textColor: 'text-orange-900', width: '25%' },
  { label: 'Interviews',         value: 4,   color: 'bg-teal-500', textColor: 'text-white', width: '14%' },
  { label: 'Offer',              value: 1,   color: 'bg-green-500', textColor: 'text-white', width: '7%' },
];

const ATSFunnel = ({ inView }) => (
  <div className="space-y-2.5">
    {FUNNEL_STEPS.map((step, i) => (
      <motion.div
        key={step.label}
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-3"
      >
        <span className="text-xs text-slate-500 w-32 flex-shrink-0 text-right">{step.label}</span>
        <div className="flex-1 relative h-9 bg-slate-100 rounded-xl overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: step.width } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-y-0 left-0 ${step.color} rounded-xl flex items-center justify-end pr-3`}
          >
            <span className={`text-xs font-bold ${step.textColor} whitespace-nowrap`}>{step.value}</span>
          </motion.div>
        </div>
      </motion.div>
    ))}
    <p className="text-xs text-slate-400 text-center pt-1">Average job search funnel per candidate (per 250 applications)</p>
  </div>
);

// ─── Insight Row ──────────────────────────────────────────────────────────────
const INSIGHTS = [
  {
    icon: Timer,
    color: 'text-rose-500',
    bg: 'bg-rose-50',
    title: '7 seconds',
    body: 'That\'s how long a recruiter spends on your resume before deciding yes or no. Your resume has one job: survive those 7 seconds.',
  },
  {
    icon: ShieldCheck,
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    title: '93% of resumes fail ATS',
    body: 'Most resumes never reach a human. Applicant tracking systems silently reject 9 in 10 applications due to formatting or keyword issues.',
  },
  {
    icon: TrendingUp,
    color: 'text-teal-500',
    bg: 'bg-teal-50',
    title: '5× more interviews',
    body: 'Candidates with ATS-optimised, expert-reviewed resumes report up to 5× more interview callbacks than those with generic resumes.',
  },
  {
    icon: Target,
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    title: 'Tailoring is everything',
    body: 'A resume tailored to the exact job description scores 40–60% higher in ATS ranking — even with identical experience.',
  },
];

const InsightCard = ({ insight, index, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.5, delay: 0.05 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
    className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex gap-4"
  >
    <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${insight.bg}`}>
      <insight.icon className={`w-5 h-5 ${insight.color}`} />
    </div>
    <div>
      <p className="font-bold text-slate-900 text-sm">{insight.title}</p>
      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{insight.body}</p>
    </div>
  </motion.div>
);

// ─── Why Resume Matters Section ───────────────────────────────────────────────
const WhyResumeMatters = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [open, setOpen] = useState(false);

  return (
    <div ref={ref} className="space-y-4">
      {/* Toggle header */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2.5 rounded-xl shadow">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <div className="text-left">
            <h2 className="text-lg font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Why your resume is your most important career asset
            </h2>
            <p className="text-xs text-slate-500">The data behind the job search struggle</p>
          </div>
        </div>
        <div className="text-slate-400 group-hover:text-slate-600 transition-colors flex-shrink-0 ml-4">
          {open ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-6 pt-1">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard value={93}  suffix="%" label="Resumes fail ATS" sub="Before a human ever sees them" icon={ShieldCheck} color="bg-rose-500"  delay={0}    inView={inView} />
                <StatCard value={7}   suffix="s"  label="Recruiter scan time" sub="Average first-pass review" icon={Timer}       color="bg-amber-500" delay={0.08} inView={inView} />
                <StatCard value={250} suffix="+"  label="Applications per role" sub="Average competitive opening" icon={Users}      color="bg-indigo-500" delay={0.16} inView={inView} />
                <StatCard value={5}   suffix="×"  label="More interviews" sub="With an expert-reviewed resume" icon={TrendingUp}  color="bg-teal-500"  delay={0.24} inView={inView} />
              </div>

              {/* Funnel + Insights */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* ATS Funnel */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    <h3 className="text-sm font-bold text-slate-900">The Hiring Funnel</h3>
                    <span className="text-xs text-slate-400">— where candidates drop off</span>
                  </div>
                  <ATSFunnel inView={inView} />
                </motion.div>

                {/* Insights */}
                <div className="space-y-3">
                  {INSIGHTS.map((insight, i) => (
                    <InsightCard key={insight.title} insight={insight} index={i} inView={inView} />
                  ))}
                </div>
              </div>

              {/* CTA nudge */}
              {/* <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-100 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap"
              >
                <div>
                  <p className="text-sm font-bold text-teal-900">Ready to fix your resume?</p>
                  <p className="text-xs text-teal-700 mt-0.5">Submit below and get a human expert review tailored to your target role — included in your membership.</p>
                </div>
                <div className="flex items-center gap-1.5 text-teal-600 text-xs font-semibold flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                  Included in your plan
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Template helpers ──────────────────────────────────────────────────────────
const sortTemplates = (templates, sortBy) => {
  switch (sortBy) {
    case 'ats-score': return [...templates].sort((a, b) => b.atsScore - a.atsScore);
    case 'newest':    return [...templates].sort((a, b) => b.id - a.id);
    case 'name':      return [...templates].sort((a, b) => a.title.localeCompare(b.title));
    case 'popular':
    default:          return [...templates].sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
  }
};

const buildCounts = (templates) => {
  const counts = { all: templates.length };
  CATEGORIES.forEach(cat => {
    if (cat.id !== 'all') counts[cat.id] = templates.filter(t => t.category === cat.id).length;
  });
  return counts;
};

// ─── API ───────────────────────────────────────────────────────────────────────
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// ─── Resume Score Row (expandable sub-score) ─────────────────────────────────
const ResumeScoreRow = ({ label, Icon, section, pct, barColor, textColor, bgColor, borderColor, delay }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.3 }}
    >
      <button
        onClick={() => section.feedback && setOpen(v => !v)}
        className={`w-full flex items-center gap-3 px-5 py-3.5 ${bgColor} ${section.feedback ? 'cursor-pointer' : 'cursor-default'} transition-colors`}
      >
        <div className={`w-8 h-8 rounded-lg border ${borderColor} ${bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-3.5 h-3.5 ${textColor}`} />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold text-slate-800">{label}</span>
            <span className={`text-sm font-extrabold ${textColor}`}>
              {section.score}<span className="text-xs font-normal text-slate-400">/{section.maxScore}</span>
            </span>
          </div>
          <div className="h-1.5 bg-white/70 rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ delay: delay + 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
        {section.feedback && (
          open
            ? <ChevronUp className="w-4 h-4 text-slate-400 flex-shrink-0" />
            : <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
        )}
      </button>
      <AnimatePresence>
        {open && section.feedback && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 py-3 bg-white border-t border-slate-50">
              <p className="text-xs text-slate-600 leading-relaxed">{section.feedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProfileAnalysis = () => {
  const { token } = useAuth();
  const fileInputRef = useRef(null);

  // ── Resume Optimizer (phase-based, like LinkedIn Optimizer) ───────────────
  const [optimizerPhase, setOptimizerPhase] = useState('upload'); // 'upload' | 'processing' | 'results'
  const [loadingResume, setLoadingResume] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeData, setResumeData] = useState(null); // { resumeUrl, parsedResume }
  const [submitting, setSubmitting] = useState(false);

  // ── LinkedIn data from submission ─────────────────────────────────────────
  const [linkedInData, setLinkedInData] = useState({ review: null, reviewedAt: null });

  // ── Magic Writer ──────────────────────────────────────────────────────────
  const [magicWriterOpen, setMagicWriterOpen] = useState(false);

  // ── Resume Templates state ────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // ── Toolkit Tabs ──────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState('overview');
  const toolkitRef = useRef(null);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      toolkitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const TOOLKIT_TABS = [
    {
      id: 'overview',
      label: 'Overview',
      icon: Sparkles,
      description: 'Tips, insights & your complete career toolkit at a glance',
    },
    { 
      id: 'resume-optimizer', 
      label: 'Resume Optimizer', 
      icon: FileCheck,
      description: 'AI-powered resume analysis & improvement'
    },
    { 
      id: 'linkedin-optimizer', 
      label: 'LinkedIn Optimizer', 
      icon: Linkedin,
      description: 'Score & improve your LinkedIn profile with AI'
    },
    { 
      id: 'targeted-resume', 
      label: 'Targeted Resume', 
      icon: Target,
      description: 'Create job-specific resumes',
    },
    { 
      id: 'cover-letter', 
      label: 'Cover Letter AI', 
      icon: FileEdit,
      description: 'Generate personalized cover letters',
      badge: 'Coming Soon'
    },
  ];

  const filteredTemplates = useMemo(() => {
    let result = TEMPLATES;
    if (activeCategory !== 'all') result = result.filter(t => t.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(t =>
        t.title.toLowerCase().includes(q) ||
        t.subtitle.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q)) ||
        t.description.toLowerCase().includes(q)
      );
    }
    return sortTemplates(result, sortBy);
  }, [activeCategory, searchQuery, sortBy]);

  const categoryCounts = useMemo(() => buildCounts(TEMPLATES), []);

  const handleUseTemplate = useCallback((template) => {
    setPreviewTemplate(null);
    window.open(template.copyUrl, '_blank');
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setSearchQuery('');
  }, []);

  // ── Fetch existing submission on mount ───────────────────────────────────
  useEffect(() => {
    const fetchExistingResume = async () => {
      try {
        const res = await axios.get(`${API}/profile/submission`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        if (data?.resumeUrl) {
          setResumeData({
            resumeUrl: data.resumeUrl,
            parsedResume: data.parsedResume || null,
            resumeScore: data.resumeScore || null,
          });
          setOptimizerPhase('results');
        }
        if (data?.linkedInReview) {
          setLinkedInData({
            review: data.linkedInReview,
            reviewedAt: data.linkedInReviewedAt || null,
          });
        }
      } catch (err) {
        // 404 = no submission yet — stay on upload phase
        if (err.response?.status !== 404) {
          console.error('Failed to fetch submission:', err);
        }
      } finally {
        setLoadingResume(false);
      }
    };
    fetchExistingResume();
  }, [token]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const valid = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!valid.includes(file.type)) {
      toast.error('Please upload a PDF or DOC/DOCX file');
      return;
    }
    setResumeFile(file);
  };

  const handleUploadResume = async () => {
    if (!resumeFile) { toast.error('Please upload your resume'); return; }
    setSubmitting(true);
    setOptimizerPhase('processing');
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      const res = await axios.post(`${API}/profile/upload-resume`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.fileUrl) {
        setResumeData({
          resumeUrl: res.data.fileUrl,
          parsedResume: res.data.parsedResume || null,
          resumeScore: res.data.resumeScore || null,
        });
        setOptimizerPhase('results');
        setResumeFile(null);
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || err.response?.data?.message || 'Upload failed. Please try again.');
      setOptimizerPhase('upload');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReanalyze = () => {
    setOptimizerPhase('upload');
    setResumeData(null);
    setResumeFile(null);
  };

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-3 rounded-xl shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Job Transition Toolkit
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">AI-powered tools to accelerate your job search</p>
          </div>
        </div>

        {/* Toolkit Tabs */}
        <div ref={toolkitRef} className="border-b border-slate-200" style={{ scrollMarginTop: '80px' }}>
          <div className="flex gap-2 overflow-x-auto pb-px scrollbar-hide">
            {TOOLKIT_TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              const isDisabled = tab.badge === 'Coming Soon';
              
              return (
                <button
                  key={tab.id}
                  onClick={() => !isDisabled && handleTabChange(tab.id)}
                  disabled={isDisabled}
                  className={`relative flex items-center gap-2 px-4 py-3 rounded-t-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-teal-600 border-t-2 border-x-2 border-teal-500 -mb-px'
                      : isDisabled
                      ? 'text-slate-400 hover:bg-slate-50 cursor-not-allowed'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-teal-600' : ''}`} />
                  <span>{tab.label}</span>
                  {tab.badge && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      {tab.badge}
                    </span>
                  )}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 text-sm text-slate-600 bg-teal-50 px-4 py-3 rounded-xl border border-teal-100"
          >
            <Sparkles className="h-4 w-4 text-teal-600" />
            <span>{TOOLKIT_TABS.find(t => t.id === activeTab)?.description}</span>
          </motion.div>
        </AnimatePresence>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-10">
                <ToolkitOverview onNavigateTab={handleTabChange} />

                {/* Why Resume Matters — collapsed by default to keep the page clean */}
                <WhyResumeMatters />

                {/* ── Resume Templates ───────────────────────────────────── */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-xl border border-teal-100">
                      <FileText className="h-5 w-5 text-teal-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                        ATS-Friendly Resume Templates
                      </h2>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {TEMPLATES.length} recruiter-tested templates - click to copy to Google Slides and customise.
                      </p>
                    </div>
                  </div>

                  <FilterTabs
                    active={activeCategory}
                    onChange={handleCategoryChange}
                    counts={categoryCounts}
                  />

                  <TemplateGrid
                    templates={filteredTemplates}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    onPreview={setPreviewTemplate}
                    onUseTemplate={handleUseTemplate}
                  />
                </div>
              </div>
            )}

            {activeTab === 'resume-optimizer' && (
              <AnimatePresence mode="wait">

                {/* ── Loading (fetching saved resume) ──────────────── */}
                {loadingResume && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-28 gap-4"
                  >
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600" />
                    <p className="text-slate-500 text-sm">Loading your resume…</p>
                  </motion.div>
                )}

                {/* ── Upload phase ─────────────────────────────── */}
                {!loadingResume && optimizerPhase === 'upload' && (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-xl mx-auto py-10 space-y-6"
                  >
                    {/* Hero */}
                    <div className="text-center space-y-2">
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg mb-4">
                        <FileCheck className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                        Optimise Your Resume
                      </h2>
                      <p className="text-slate-500 text-sm">
                        Upload your resume and we'll extract your experience & projects so you can rewrite every bullet with AI.
                      </p>
                    </div>

                    {/* Drop zone */}
                    <div
                      onClick={() => !resumeFile && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${
                        resumeFile
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50 cursor-pointer'
                      }`}
                    >
                      {resumeFile ? (
                        <div className="space-y-3">
                          <div className="w-14 h-14 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="h-7 w-7 text-teal-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 text-sm">{resumeFile.name}</p>
                            <p className="text-xs text-slate-500">{(resumeFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}>
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                            <Upload className="h-7 w-7 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">Drop your resume here</p>
                            <p className="text-xs text-slate-500 mt-1">PDF, DOC or DOCX · Max 10 MB</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <Button variant="outline" size="sm" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Analyse button */}
                    <Button
                      onClick={handleUploadResume}
                      disabled={!resumeFile || submitting}
                      className="w-full h-12 text-base bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg gap-2"
                    >
                      <Sparkles className="h-4 w-4" />
                      Analyse Resume
                    </Button>
                  </motion.div>
                )}

                {/* ── Processing phase ─────────────────────────── */}
                {!loadingResume && optimizerPhase === 'processing' && (
                  <ResumeProcessingView />
                )}

                {/* ── Results phase ────────────────────────────── */}
                {!loadingResume && optimizerPhase === 'results' && resumeData && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-5"
                  >
                    {/* ── Premium Hero Strip ───────────────────────── */}
                    {(() => {
                      const expList = resumeData.parsedResume?.experience || [];
                      const projList = resumeData.parsedResume?.projects || [];
                      const totalBullets = [...expList, ...projList].reduce((s, x) => s + (x.bullets?.length || 0), 0);
                      return (
                        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-5">
                          {/* Decorative glow */}
                          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-violet-600/10 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-teal-500/10 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

                          {/* Stats */}
                          <div className="flex items-center gap-6 flex-1 flex-wrap">
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-teal-400" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-lg leading-none">{expList.length + projList.length}</p>
                                <p className="text-slate-400 text-xs mt-0.5">Sections found</p>
                              </div>
                            </div>
                            <div className="w-px h-8 bg-white/10 hidden sm:block" />
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-4 h-4 text-indigo-400" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-lg leading-none">{expList.length}</p>
                                <p className="text-slate-400 text-xs mt-0.5">Roles</p>
                              </div>
                            </div>
                            <div className="w-px h-8 bg-white/10 hidden sm:block" />
                            <div className="flex items-center gap-2.5">
                              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                                <FolderOpen className="w-4 h-4 text-cyan-400" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-lg leading-none">{projList.length}</p>
                                <p className="text-slate-400 text-xs mt-0.5">Projects</p>
                              </div>
                            </div>
                            {totalBullets > 0 && (
                              <>
                                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                                <div className="flex items-center gap-2.5">
                                  <div className="w-9 h-9 rounded-xl bg-violet-500/30 flex items-center justify-center flex-shrink-0">
                                    <Wand2 className="w-4 h-4 text-violet-300" />
                                  </div>
                                  <div>
                                    <p className="text-white font-bold text-lg leading-none">{totalBullets}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">Bullets to optimise</p>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>

                          {/* CTAs */}
                          <div className="flex items-center gap-3 flex-shrink-0">
                            <button
                              onClick={handleReanalyze}
                              className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-2"
                            >
                              Re-analyse
                            </button>
                            <motion.button
                              whileHover={{ scale: 1.04 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => setMagicWriterOpen(true)}
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shadow-xl"
                              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                            >
                              <Wand2 className="h-4 w-4" />
                              Open Magic Writer
                            </motion.button>
                          </div>
                        </div>
                      );
                    })()}

                    {/* ── Resume Score Panel ───────────────────────── */}
                    {resumeData.resumeScore && (() => {
                      const rs = resumeData.resumeScore;
                      const SCORE_META = [
                        { key: 'impactScore',   label: 'Impact',   icon: TrendingUp },
                        { key: 'brevityScore',  label: 'Brevity',  icon: AlignLeft },
                        { key: 'styleScore',    label: 'Style',    icon: PenLine },
                        { key: 'skillsScore',   label: 'Skills',   icon: Star },
                        { key: 'sectionsScore', label: 'Sections', icon: LayoutList },
                      ];
                      const ringColor = rs.overallScore >= 70 ? '#10b981' : rs.overallScore >= 45 ? '#f59e0b' : '#ef4444';
                      const ringSize = 96;
                      const strokeWidth = 8;
                      const radius = (ringSize - strokeWidth) / 2;
                      const circumference = 2 * Math.PI * radius;

                      return (
                        <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                          {/* Header row */}
                          <div className="flex flex-col sm:flex-row sm:items-center gap-5 px-6 py-5 border-b border-slate-50">
                            {/* Score ring */}
                            <div className="relative flex-shrink-0" style={{ width: ringSize, height: ringSize }}>
                              <svg width={ringSize} height={ringSize} className="-rotate-90">
                                <circle cx={ringSize/2} cy={ringSize/2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
                                <motion.circle
                                  cx={ringSize/2} cy={ringSize/2} r={radius} fill="none" stroke={ringColor}
                                  strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference}
                                  initial={{ strokeDashoffset: circumference }}
                                  animate={{ strokeDashoffset: circumference - (rs.overallScore / 100) * circumference }}
                                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                                />
                              </svg>
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <motion.span
                                  initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.5, duration: 0.4 }}
                                  className="text-2xl font-extrabold text-slate-900 leading-none"
                                >{rs.overallScore}</motion.span>
                                <span className="text-xs text-slate-400 font-medium">/100</span>
                              </div>
                            </div>
                            {/* Meta */}
                            <div className="flex-1">
                              <p className="text-base font-bold text-slate-900">Resume Score</p>
                              {rs.detectedRole && <p className="text-sm text-slate-600 mt-0.5">{rs.detectedRole}</p>}
                              {rs.detectedDomain && <p className="text-xs text-slate-400 mt-0.5">{rs.detectedDomain}</p>}
                            </div>
                          </div>

                          {/* Sub-score rows */}
                          <div className="divide-y divide-slate-50">
                            {SCORE_META.map(({ key, label, icon: Icon }, idx) => {
                              const section = rs[key];
                              if (!section) return null;
                              const pct = Math.round((section.score / section.maxScore) * 100);
                              const barColor   = pct >= 70 ? 'bg-green-500'    : pct >= 40 ? 'bg-amber-500'    : 'bg-rose-500';
                              const textColor  = pct >= 70 ? 'text-green-700'  : pct >= 40 ? 'text-amber-700'  : 'text-rose-700';
                              const bgColor    = pct >= 70 ? 'bg-green-50'     : pct >= 40 ? 'bg-amber-50'     : 'bg-rose-50';
                              const borderColor= pct >= 70 ? 'border-green-100': pct >= 40 ? 'border-amber-100': 'border-rose-100';

                              return (
                                <ResumeScoreRow
                                  key={key}
                                  label={label}
                                  Icon={Icon}
                                  section={section}
                                  pct={pct}
                                  barColor={barColor}
                                  textColor={textColor}
                                  bgColor={bgColor}
                                  borderColor={borderColor}
                                  delay={idx * 0.08}
                                />
                              );
                            })}
                          </div>

                          {/* Issues & Strengths */}
                          {(rs.topIssues?.length > 0 || rs.strengths?.length > 0) && (
                            <div className="grid sm:grid-cols-2 gap-0 border-t border-slate-50">
                              {rs.topIssues?.length > 0 && (
                                <div className="px-5 py-4 sm:border-r border-slate-50">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                                    Top Issues
                                  </p>
                                  <ul className="space-y-2">
                                    {rs.topIssues.map((issue, i) => (
                                      <li key={i} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                                        {issue}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {rs.strengths?.length > 0 && (
                                <div className="px-5 py-4">
                                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                    Strengths
                                  </p>
                                  <ul className="space-y-2">
                                    {rs.strengths.map((s, i) => (
                                      <li key={i} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                                        <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                                        {s}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* ── Two-panel layout ──────────────────────────── */}
                    <div className="grid lg:grid-cols-[3fr_2fr] gap-5 items-start">

                      {/* LEFT — PDF Preview */}
                      <div className="bg-slate-100 rounded-2xl p-3">
                        <iframe
                          src={`${resumeData.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                          className="w-full rounded-xl border border-slate-200 shadow-sm"
                          style={{ minHeight: '680px' }}
                          title="Resume PDF"
                        />
                      </div>

                      {/* RIGHT — Extracted sections */}
                      <div className="space-y-3 lg:sticky lg:top-24">

                        {/* Experience */}
                        {resumeData.parsedResume?.experience?.length > 0 && (
                          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50">
                              <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                              </div>
                              <p className="text-sm font-bold text-slate-800">Work Experience</p>
                              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                                {resumeData.parsedResume.experience.length} role{resumeData.parsedResume.experience.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="divide-y divide-slate-50">
                              {resumeData.parsedResume.experience.map((exp, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3">
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-500">
                                    {(exp.company || exp.title || 'R').charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{exp.title || exp.role || 'Role'}</p>
                                    <p className="text-xs text-slate-400 truncate">{exp.company || ''}</p>
                                  </div>
                                  {exp.bullets?.length > 0 && (
                                    <span className="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg bg-violet-50 text-violet-600">
                                      {exp.bullets.length} bullets
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Projects */}
                        {resumeData.parsedResume?.projects?.length > 0 && (
                          <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-50">
                              <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                                <FolderOpen className="w-3.5 h-3.5 text-teal-600" />
                              </div>
                              <p className="text-sm font-bold text-slate-800">Projects</p>
                              <span className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-600">
                                {resumeData.parsedResume.projects.length} project{resumeData.parsedResume.projects.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="divide-y divide-slate-50">
                              {resumeData.parsedResume.projects.map((proj, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3">
                                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 text-xs font-bold text-slate-500">
                                    {(proj.name || proj.title || 'P').charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-slate-800 truncate">{proj.name || proj.title || 'Project'}</p>
                                  </div>
                                  {proj.bullets?.length > 0 && (
                                    <span className="flex-shrink-0 text-xs font-bold px-2 py-1 rounded-lg bg-violet-50 text-violet-600">
                                      {proj.bullets.length} bullets
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* No parsed data fallback */}
                        {!resumeData.parsedResume?.experience?.length && !resumeData.parsedResume?.projects?.length && (
                          <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl text-center">
                            <p className="text-sm font-semibold text-amber-800">No sections extracted</p>
                            <p className="text-xs text-amber-600 mt-1">Try uploading a PDF for best results.</p>
                          </div>
                        )}

                        {/* Magic Writer premium card */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setMagicWriterOpen(true)}
                          className="w-full text-left rounded-2xl overflow-hidden shadow-lg"
                          style={{ background: 'linear-gradient(135deg, #4c1d95, #6d28d9, #7c3aed)' }}
                        >
                          <div className="relative px-5 py-4">
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Wand2 className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <p className="text-white font-bold text-sm">Magic Writer</p>
                                <p className="text-violet-200 text-xs mt-0.5 leading-relaxed">
                                  AI rewrites every bullet point — stronger verbs, better impact, ATS-optimised.
                                </p>
                              </div>
                              <div className="ml-auto flex-shrink-0 text-violet-300 mt-1">
                                <ChevronDown className="w-4 h-4 -rotate-90" />
                              </div>
                            </div>
                          </div>
                        </motion.button>

                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            )}

            {activeTab === 'linkedin-optimizer' && (
              <LinkedInOptimizer
                token={token}
                initialReview={linkedInData.review}
                reviewedAt={linkedInData.reviewedAt}
              />
            )}

            {activeTab === 'targeted-resume' && (
              <TargetedResume token={token} />
            )}

            {activeTab === 'cover-letter' && (
              <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center mb-6">
                  <FileEdit className="w-10 h-10 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Coming Soon!</h3>
                <p className="text-slate-600 max-w-md mb-6">
                  We're working hard to bring you this amazing feature. Stay tuned for updates!
                </p>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-semibold text-amber-700">In Development</span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </motion.div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <TemplatePreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onUseTemplate={handleUseTemplate}
          />
        )}
      </AnimatePresence>

      {/* Magic Writer Modal */}
      {magicWriterOpen && resumeData && (
        <MagicWriter
          resumeUrl={resumeData.resumeUrl}
          parsedResume={resumeData.parsedResume}
          token={token}
          onClose={() => setMagicWriterOpen(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default ProfileAnalysis;

