import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  FileText, Upload, LinkIcon, Loader2, CheckCircle, AlertCircle,
  Clock, Search, Download, Edit3, Send, RefreshCw, Lock,
  TrendingUp, Users, Timer, Target, Zap, ShieldCheck, ChevronDown, ChevronUp,
  Wand2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';
import { TEMPLATES, CATEGORIES } from '../../data/resumeTemplates';
import FilterTabs from '../../components/resume-templates/FilterTabs';
import TemplateGrid from '../../components/resume-templates/TemplateGrid';
import TemplatePreviewModal from '../../components/resume-templates/TemplatePreviewModal';
import MagicWriter from '../../components/MagicWriter';

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
  const [open, setOpen] = useState(true);

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
              <motion.div
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
              </motion.div>
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

// ─── Status config ─────────────────────────────────────────────────────────────
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const STATUS_CONFIG = {
  pending: {
    icon: Clock,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    badge: 'bg-amber-100 text-amber-700',
    label: 'Submission Received',
    description: 'Your resume has been submitted. Our team will begin reviewing it shortly. You can still edit your submission.',
  },
  evaluating: {
    icon: Search,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    badge: 'bg-blue-100 text-blue-700',
    label: 'Under Evaluation',
    description: 'Our career expert is reviewing your resume and job description. You will be notified once the evaluation is complete.',
  },
  evaluated: {
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    badge: 'bg-green-100 text-green-700',
    label: 'Evaluation Complete',
    description: 'Your evaluation is ready! Review your expert feedback and download your updated resume below.',
  },
};

const ProfileAnalysis = () => {
  const { token } = useAuth();
  const fileInputRef = useRef(null);

  // Form state
  const [resumeFile, setResumeFile] = useState(null);
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Submission state
  const [submission, setSubmission] = useState(null);
  const [loadingSubmission, setLoadingSubmission] = useState(true);

  // ── Resume Templates state ────────────────────────────────────────────────
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  // ── Magic Writer ──────────────────────────────────────────────────────────
  const [magicWriterOpen, setMagicWriterOpen] = useState(false);

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

  // Fetch existing submission on mount
  const fetchSubmission = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/profile/submission`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmission(res.data);
    } catch (err) {
      if (err.response?.status !== 404) {
        console.error('Failed to fetch submission:', err);
      }
      setSubmission(null);
    } finally {
      setLoadingSubmission(false);
    }
  }, [token]);

  useEffect(() => {
    fetchSubmission();
  }, [fetchSubmission]);

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

  const handleSubmit = async () => {
    if (!resumeFile) { toast.error('Please upload your resume'); return; }
    if (!jobDescription.trim()) { toast.error('Please enter the job description you are targeting'); return; }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescription.trim());
      if (linkedinUrl.trim()) formData.append('linkedinUrl', linkedinUrl.trim());

      const endpoint = isEditing
        ? `${API}/profile/submission`
        : `${API}/profile/upload-resume`;
      const method = isEditing ? 'put' : 'post';

      const res = await axios[method](endpoint, formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      // Handle the new response format from upload-resume endpoint
      if (res.data.success && res.data.fileUrl) {
        // Build submission object from upload response
        const newSubmission = {
          _id: res.data.submissionId || Date.now().toString(),
          resumeUrl: res.data.fileUrl,
          linkedinUrl: linkedinUrl.trim() || null,
          jobDescription: jobDescription.trim(),
          status: 'pending',
          parsedResume: res.data.parsedResume || null,
          createdAt: new Date().toISOString(),
        };
        setSubmission(newSubmission);
      } else {
        // Handle existing submission update format
        setSubmission(res.data.submission || res.data);
      }

      setIsEditing(false);
      setResumeFile(null);
      toast.success(isEditing ? 'Submission updated!' : 'Resume uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.detail || err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditing = () => {
    setLinkedinUrl(submission?.linkedinUrl || '');
    setJobDescription(submission?.jobDescription || '');
    setResumeFile(null);
    setIsEditing(true);
  };

  // ─── Loading ─────────────────────────────────────────────────
  if (loadingSubmission) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
        </div>
      </DashboardLayout>
    );
  }

  const canEdit = submission?.status === 'pending';
  const isEvaluated = submission?.status === 'evaluated';
  const statusCfg = submission ? STATUS_CONFIG[submission.status] : null;
  const showForm = !submission || isEditing;

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
            <p className="text-slate-500 text-sm mt-0.5">Submit your resume for expert human review & feedback</p>
          </div>
        </div>

        {/* Why Resume Matters */}
        <WhyResumeMatters />

        {/* Status Banner — shown when submitted & not editing */}
        <AnimatePresence>
          {submission && !isEditing && statusCfg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex items-start gap-4 p-5 rounded-2xl border ${statusCfg.bg} ${statusCfg.border}`}
            >
              <statusCfg.icon className={`h-6 w-6 flex-shrink-0 mt-0.5 ${statusCfg.color}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusCfg.badge}`}>
                    {statusCfg.label}
                  </span>
                </div>
                <p className="text-slate-600 text-sm">{statusCfg.description}</p>
              </div>
              {canEdit && (
                <Button variant="outline" size="sm" onClick={startEditing} className="flex-shrink-0 gap-1.5">
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              )}
              {submission?.status === 'evaluating' && (
                <div className="flex items-center gap-2 text-blue-600 flex-shrink-0">
                  <Lock className="h-4 w-4" />
                  <span className="text-xs font-medium">Locked</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submission Info (when not editing) */}
        {submission && !isEditing && (
          <Card className="border-0 shadow-sm bg-slate-50">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">Your Submission</h3>
                {/* Magic Writer trigger — only when resume URL is available */}
                {submission.resumeUrl && (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMagicWriterOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white shadow"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)' }}
                  >
                    <Wand2 className="h-3.5 w-3.5" />
                    Magic Writer
                  </motion.button>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <FileText className="h-4 w-4 text-teal-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-slate-500">Resume</p>
                    <a
                      href={submission.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-600 hover:underline font-medium truncate block max-w-xs"
                    >
                      View uploaded resume ↗
                    </a>
                  </div>
                </div>
                {submission.linkedinUrl && (
                  <div className="flex items-start gap-2">
                    <LinkIcon className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-slate-500">LinkedIn</p>
                      <a href={submission.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium truncate block max-w-xs">
                        {submission.linkedinUrl}
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-4">
                <p className="text-slate-500 text-xs mb-1 font-medium uppercase tracking-wide">Job Description Submitted</p>
                <p className="text-slate-700 text-sm whitespace-pre-line line-clamp-4">{submission.jobDescription}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Upload / Edit Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {isEditing && (
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-slate-800">Edit Your Submission</h2>
                  <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              )}

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Resume Upload */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Upload className="h-5 w-5 text-teal-600" />
                      {isEditing ? 'Replace Resume (optional)' : 'Upload Resume *'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      onClick={() => !resumeFile && fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                        resumeFile
                          ? 'border-teal-500 bg-teal-50'
                          : 'border-slate-300 hover:border-teal-400 cursor-pointer'
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
                          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); setResumeFile(null); }}>Remove</Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="w-14 h-14 mx-auto bg-slate-100 rounded-full flex items-center justify-center">
                            <Upload className="h-7 w-7 text-slate-400" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 text-sm">Drop your resume here</p>
                            <p className="text-xs text-slate-500 mt-1">PDF, DOC or DOCX</p>
                          </div>
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="hidden"
                            id="resume-upload"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            type="button"
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            className="cursor-pointer"
                          >
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* LinkedIn URL */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <LinkIcon className="h-5 w-5 text-blue-600" />
                      LinkedIn Profile URL
                      <span className="text-xs text-slate-400 font-normal">(optional)</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <Input
                        type="url"
                        placeholder="https://linkedin.com/in/yourprofile"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        className="pl-10 h-12"
                      />
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <p className="text-xs text-blue-800">
                        <strong>Tip:</strong> Ensure your LinkedIn visibility is set to "All LinkedIn Members" for the best feedback.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Job Description — full width */}
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Search className="h-5 w-5 text-indigo-600" />
                    Job Description You're Targeting *
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={7}
                    placeholder="Paste the job description here — our expert will tailor the feedback to this specific role. Include the role title, responsibilities, and required skills..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400 resize-none leading-relaxed"
                  />
                  <p className="text-xs text-slate-400 mt-2">{jobDescription.length} characters</p>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={submitting || (!resumeFile && !isEditing) || !jobDescription.trim()}
                className="w-full h-14 text-base bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg gap-2"
              >
                {submitting ? (
                  <><Loader2 className="h-5 w-5 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="h-5 w-5" /> {isEditing ? 'Update Submission' : 'Submit for Expert Review'}</>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Evaluation Results */}
        <AnimatePresence>
          {isEvaluated && !isEditing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Updated Resume Download */}
              {submission?.updatedResumeUrl && (
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 px-6 py-5 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-white">
                      <div className="bg-white/20 p-2.5 rounded-xl">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">Your Updated Resume</p>
                        <p className="text-teal-100 text-sm">Optimised by our career expert</p>
                      </div>
                    </div>
                    <a href={submission.updatedResumeUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-white text-teal-700 hover:bg-teal-50 gap-2 shadow">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </a>
                  </div>
                </Card>
              )}

              {/* Expert Suggestions — rich text rendered */}
              {submission?.suggestions && (
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-indigo-600" />
                      Expert Feedback & Suggestions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      className="prose prose-slate prose-sm max-w-none
                        prose-headings:font-bold prose-headings:text-slate-900
                        prose-p:text-slate-700 prose-p:leading-relaxed
                        prose-li:text-slate-700 prose-strong:text-slate-900
                        prose-a:text-teal-600 prose-a:underline"
                      dangerouslySetInnerHTML={{ __html: submission.suggestions }}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Re-submit option */}
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={() => { setSubmission(null); setResumeFile(null); setLinkedinUrl(''); setJobDescription(''); }}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Submit New Resume
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Resume Templates ─────────────────────────────────────────── */}
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
                {TEMPLATES.length} recruiter-tested templates — click to copy to Google Slides and customise.
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
      {magicWriterOpen && submission && (
        <MagicWriter
          resumeUrl={submission.resumeUrl}
          parsedResume={submission.parsedResume}
          token={token}
          onClose={() => setMagicWriterOpen(false)}
        />
      )}
    </DashboardLayout>
  );
};

export default ProfileAnalysis;

