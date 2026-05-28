import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Upload, Sparkles } from 'lucide-react';

const CTASection = ({ onBrowse, onUpload }) => (
  <section className="bg-slate-950 py-28 px-6 relative overflow-hidden">
    {/* Gradient orbs */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #2563eb, transparent 70%)' }} />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #0891b2, transparent 70%)' }} />
    </div>

    <div className="max-w-3xl mx-auto text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-full mb-8 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Start for Free
        </div>

        <h2 className="text-5xl font-extrabold text-white mb-6 leading-[1.1]" style={{ fontFamily: 'Sora, sans-serif' }}>
          Your next interview<br />
          <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #34d399)' }}>
            starts with the right resume
          </span>
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Stop sending resumes that get filtered out before a human sees them. 
          Choose a template, optimise for ATS, and apply with confidence.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={onBrowse}
            className="flex items-center gap-2 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all hover:opacity-90 active:scale-[0.98] shadow-xl"
            style={{ background: 'linear-gradient(135deg, #1d4ed8, #0891b2)' }}
          >
            Browse All Templates
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={onUpload}
            className="flex items-center gap-2 text-slate-300 font-semibold px-8 py-4 rounded-xl text-base border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload Existing Resume
          </button>
        </div>

        <p className="text-slate-600 text-sm mt-8">
          Free templates available · Instant PDF export
        </p>
      </motion.div>
    </div>
  </section>
);

export default CTASection;
