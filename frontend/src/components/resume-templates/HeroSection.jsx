import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, ShieldCheck, Users, FileCheck } from 'lucide-react';
import { TEMPLATES } from '../../data/resumeTemplates';

const TRUST_BADGES = [
  { icon: ShieldCheck, label: 'ATS Optimised', color: '#059669' },
  { icon: Users, label: 'Recruiter Friendly', color: '#2563eb' },
  { icon: FileCheck, label: 'PDF Ready', color: '#7c3aed' },
];

// Floating mini preview card
const FloatingCard = ({ template, style, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    style={{ ...style, width: 160 }}
    className="absolute rounded-2xl overflow-hidden shadow-2xl border border-white/60 bg-white"
  >
    <img
      src={template.thumbnail}
      alt={template.title}
      className="w-full h-auto object-top"
    />
  </motion.div>
);

const HeroSection = ({ onBrowse, onUpload }) => {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-white">
      {/* Subtle background grid */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      {/* Gradient orb */}
      <div className="absolute top-[-120px] right-[-60px] w-[600px] h-[600px] rounded-full opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #2563eb 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-80px] left-[-40px] w-[400px] h-[400px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              93% of resumes fail the ATS test
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-5xl lg:text-6xl font-extrabold text-slate-950 leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              ATS-Friendly<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #2563eb, #0891b2)' }}>
                Resume Templates
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14 }}
              className="text-lg text-slate-500 leading-relaxed mb-10 max-w-lg"
            >
              Choose from {TEMPLATES.length} recruiter-tested templates engineered to pass 
              automated screening systems and land on the hiring manager's desk.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={onBrowse}
                className="flex items-center gap-2 text-white font-semibold px-6 py-3.5 rounded-xl text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-lg"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #0891b2)' }}
              >
                Browse Templates
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onUpload}
                className="flex items-center gap-2 text-slate-700 font-semibold px-6 py-3.5 rounded-xl text-sm border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 transition-all"
              >
                <Upload className="w-4 h-4" />
                Upload Your Resume
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {TRUST_BADGES.map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" style={{ color }} />
                  <span className="text-sm font-medium text-slate-600">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Resume Previews */}
          <div className="relative hidden lg:block" style={{ height: 520 }}>
            <FloatingCard
              template={TEMPLATES[0]}
              delay={0.3}
              style={{ top: 0, left: '10%', transform: 'rotate(-4deg)', zIndex: 10 }}
            />
            <FloatingCard
              template={TEMPLATES[4]}
              delay={0.45}
              style={{ top: 60, left: '42%', transform: 'rotate(3deg)', zIndex: 20 }}
            />
            <FloatingCard
              template={TEMPLATES[3]}
              delay={0.6}
              style={{ top: 180, left: '5%', transform: 'rotate(2deg)', zIndex: 5 }}
            />

            {/* Floating stat cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-20 right-4 bg-white border border-slate-200 rounded-2xl shadow-xl px-5 py-4 z-30"
            >
              <div className="text-2xl font-extrabold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>99%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Highest ATS Score</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.85 }}
              className="absolute top-10 right-2 bg-green-50 border border-green-100 rounded-2xl shadow-lg px-4 py-3 z-30"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-green-800">ATS Compatible</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
