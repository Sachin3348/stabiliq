import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Sparkles, MousePointerClick, Download, Search } from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'ATS Optimised',
    description: 'Every template is engineered to pass automated applicant tracking systems used by 95% of Fortune 500 companies.',
    accent: '#059669',
    bg: '#052e16',
  },
  {
    icon: Users,
    title: 'Recruiter Approved',
    description: 'Our templates are validated by senior recruiters at top firms. Layouts that make hiring managers stop scrolling.',
    accent: '#60a5fa',
    bg: '#0c1a3a',
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Suggestions',
    description: 'Get personalised bullet point suggestions, keyword recommendations, and strength scores powered by AI.',
    accent: '#c084fc',
    bg: '#1a0a2e',
  },
  {
    icon: MousePointerClick,
    title: 'One-Click Customisation',
    description: 'Change fonts, colours, section order, and spacing with a single click. Your resume, your way.',
    accent: '#fbbf24',
    bg: '#2a1800',
  },
  {
    icon: Download,
    title: 'Instant PDF Export',
    description: 'Download pixel-perfect PDFs formatted for both ATS parsing and human readability. No formatting issues.',
    accent: '#34d399',
    bg: '#022c22',
  },
  {
    icon: Search,
    title: 'JD Keyword Matching',
    description: 'Paste the job description and our engine highlights missing keywords and suggests how to incorporate them.',
    accent: '#fb7185',
    bg: '#2d0a14',
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-slate-950 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            Why Stabiliq Templates
          </div>
          <h2 className="text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Everything you need to<br />
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa, #34d399)' }}>
              land the interview
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Our templates aren't just pretty - they're precision-engineered for the modern hiring funnel.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Icon, title, description, accent, bg }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative group rounded-2xl border border-white/5 p-6 overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                style={{ background: `radial-gradient(ellipse at top left, ${accent}15, transparent 70%)` }}
              />

              <div className="relative z-10">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: bg, border: `1px solid ${accent}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: accent }} />
                </div>
                <h3 className="text-white font-bold text-base mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
