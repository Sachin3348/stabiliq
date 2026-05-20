import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    name: 'Rohan Verma',
    role: 'Software Engineer at Google',
    avatar: 'RV',
    color: '#2563eb',
    rating: 5,
    outcome: 'Got 8 interviews in 2 weeks',
    quote: "I was applying for months with no response. Switched to the Modern Two-Column template, rewrote my bullets using the AI suggestions, and got 8 interview calls in the next two weeks. The ATS score jump was real.",
  },
  {
    name: 'Priya Nair',
    role: 'Product Manager at Flipkart',
    avatar: 'PN',
    color: '#7c3aed',
    rating: 5,
    outcome: 'Landed senior PM role',
    quote: "The PM Accelerator template forced me to think in metrics. Every bullet point was suddenly about impact, not just tasks. My recruiter literally said my resume stood out in a pile of 400.",
  },
  {
    name: 'Karan Mehta',
    role: 'Data Analyst at Swiggy',
    avatar: 'KM',
    color: '#059669',
    rating: 5,
    outcome: '3x salary jump in career switch',
    quote: "I was pivoting from teaching to data analytics. The Career Pivot template helped me reframe 6 years of education experience into data-relevant skills. Got my first analytics job at Swiggy.",
  },
  {
    name: 'Anjali Sharma',
    role: 'UX Designer at Razorpay',
    avatar: 'AS',
    color: '#e11d48',
    rating: 5,
    outcome: 'First design job from campus',
    quote: "Fresh graduate with no full-time experience. The Fresh Start template made my projects and internships shine. The portfolio link placement drove so many recruiter clicks. Life-changing resource.",
  },
];

const TestimonialsSection = () => (
  <section className="bg-slate-50 py-24 px-6 border-t border-slate-100">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
          Success Stories
        </div>
        <h2 className="text-4xl font-extrabold text-slate-950 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
          Real people. Real results.
        </h2>
        <p className="text-slate-500 text-lg">
          Members who used Stabiliq templates to land their next role.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {TESTIMONIALS.map(({ name, role, avatar, color, rating, outcome, quote }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col"
          >
            {/* Stars */}
            <div className="flex gap-0.5 mb-4">
              {Array.from({ length: rating }).map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            {/* Quote */}
            <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">"{quote}"</p>

            {/* Outcome badge */}
            <div
              className="text-xs font-bold px-3 py-1.5 rounded-full mb-4 self-start"
              style={{ background: `${color}15`, color }}
            >
              ✓ {outcome}
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ background: color }}
              >
                {avatar}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{name}</div>
                <div className="text-xs text-slate-400">{role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
