import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Are these templates actually ATS-compatible?',
    a: 'Yes. Every template is tested against industry-standard ATS platforms including Greenhouse, Workday, Taleo, Lever, and iCIMS. We avoid multi-column layouts, images, headers/footers, and tables that confuse automated parsers. Our ATS Pro template scores 99% on all platforms we test.',
  },
  {
    q: 'What format can I export my resume in?',
    a: 'All templates export as PDF - the most universally accepted format by both ATS systems and human reviewers. The PDFs are machine-parseable while remaining visually polished for when a human eventually reads them.',
  },
  {
    q: 'Can I customise colours, fonts, and section order?',
    a: 'Yes. The editor lets you adjust accent colours, font size, section ordering, margin spacing, and line height. Some advanced customisations (custom section names, multi-page control) are available on Pro templates.',
  },
  {
    q: 'How does the AI resume scoring work?',
    a: 'Paste your target job description and our engine compares it to your resume content. It scores keyword coverage, bullet point strength, action verb usage, and quantification. You get a score and specific suggestions to improve it before applying.',
  },
  {
    q: 'What is the difference between Free and Pro templates?',
    a: 'Free templates include our 5 most popular formats. Pro templates include advanced layouts (Executive, Technical Stack, Business Leader, PM Accelerator), full colour and font customisation, AI keyword matching, and priority PDF export.',
  },
  {
    q: 'Can I use the same template for multiple jobs?',
    a: 'Absolutely - and we encourage it. You can save multiple versions of your resume with different keyword optimisations for different roles. Tailoring your resume per application is the most effective way to increase your callback rate.',
  },
  {
    q: 'Are templates based on Word or Google Docs?',
    a: 'Our templates are built natively in our web editor - no Word or Google Docs required. This ensures consistent formatting across all devices. You can also download and convert to Google Docs format if needed.',
  },
];

const FAQItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border-b border-slate-100 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 py-5 text-left hover:text-blue-600 transition-colors group"
    >
      <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
        {q}
      </span>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
        <ChevronDown className="w-4 h-4 text-slate-400" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-sm text-slate-500 leading-relaxed">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white py-24 px-6 border-t border-slate-100">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
            FAQ
          </div>
          <h2 className="text-4xl font-extrabold text-slate-950 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Common questions
          </h2>
          <p className="text-slate-500">
            Everything you need to know before you start.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white border border-slate-200 rounded-2xl px-6 divide-y divide-slate-100 shadow-sm"
        >
          {FAQS.map((item, i) => (
            <FAQItem
              key={i}
              q={item.q}
              a={item.a}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
