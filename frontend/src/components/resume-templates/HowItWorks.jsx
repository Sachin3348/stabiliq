import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Wand2, Download } from 'lucide-react';

const STEPS = [
  {
    number: '01',
    icon: LayoutTemplate,
    title: 'Choose Your Template',
    description: 'Browse our library of ATS-optimised templates. Filter by role, style, or ATS score. Preview any template before selecting.',
    accent: '#2563eb',
  },
  {
    number: '02',
    icon: Wand2,
    title: 'Customise with AI',
    description: 'Fill in your details and let our AI suggest bullet points, missing keywords, and structure improvements tailored to your target role.',
    accent: '#7c3aed',
  },
  {
    number: '03',
    icon: Download,
    title: 'Download & Apply',
    description: 'Export a pixel-perfect PDF that passes ATS scanners and impresses human reviewers. Apply with confidence.',
    accent: '#059669',
  },
];

const HowItWorks = () => (
  <section className="bg-white py-24 px-6">
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
          How It Works
        </div>
        <h2 className="text-4xl font-extrabold text-slate-950 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
          From template to offer in 3 steps
        </h2>
        <p className="text-slate-500 text-lg max-w-lg mx-auto">
          The fastest path from blank page to a resume that gets callbacks.
        </p>
      </motion.div>

      <div className="relative">
        {/* Connector line */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent hidden lg:block" />

        <div className="grid lg:grid-cols-3 gap-8">
          {STEPS.map(({ number, icon: Icon, title, description, accent }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center text-center"
            >
              {/* Icon circle */}
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white"
                  style={{ background: `${accent}12`, outline: `2px solid ${accent}30` }}
                >
                  <Icon className="w-7 h-7" style={{ color: accent }} />
                </div>
                <div
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white shadow"
                  style={{ background: accent }}
                >
                  {i + 1}
                </div>
              </div>

              <div className="text-xs font-black tracking-widest text-slate-300 mb-2">{number}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
