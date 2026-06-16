import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cal, { getCalApi } from '@calcom/embed-react';
import { UserCheck, Clock, Video, MessageSquare, Star, ArrowRight, Sparkles, Bell } from 'lucide-react';
import { Button } from '../../components/ui/button';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';

const benefits = [
  { icon: Video, title: '1-on-1 Video Call', description: 'Face-to-face session with an expert career counsellor tailored to your goals.' },
  { icon: Clock, title: 'Flexible Scheduling', description: 'Pick a time that works for you — mornings, evenings, or weekends.' },
  { icon: MessageSquare, title: 'Personalised Guidance', description: 'Get advice on job search strategy, resume review, and interview prep.' },
  { icon: Star, title: 'Industry Experts', description: 'Our counsellors have 10+ years of experience across tech, finance, and ops.' },
];

const CareerCounsellor = () => {
  const { user } = useAuth();
  const [showCal, setShowCal] = useState(false);

  return (
    <DashboardLayout>
      <div className="relative">

        {/* ── Coming Soon overlay ──────────────────────────────────────────── */}
        <div className="absolute inset-0 z-20 flex items-start md:items-center justify-center pt-8 md:pt-0 overflow-y-auto backdrop-blur-sm bg-white/60 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-4 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
            style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81, #1e1b4b)' }}
          >
            {/* Decorative glow orbs */}
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-indigo-400/20 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-teal-400/15 translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            <div className="relative px-8 py-10 flex flex-col items-center text-center gap-5">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center shadow-lg">
                <UserCheck className="w-8 h-8 text-white" />
              </div>

              {/* Badge */}
              <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Clock className="w-3 h-3" />
                Coming Soon
              </span>

              <div>
                <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Career Counsellor
                </h2>
                <p className="text-indigo-200 text-sm leading-relaxed max-w-sm">
                  We're preparing 1-on-1 sessions with industry experts to help you navigate your career transition. You'll be the first to know when it's ready.
                </p>
              </div>

              {/* Feature pills */}
              <div className="flex flex-wrap justify-center gap-2">
                {['1-on-1 Video Call', 'Flexible Scheduling', 'Industry Experts'].map(f => (
                  <span key={f} className="text-xs font-medium px-3 py-1 rounded-full bg-white/10 text-indigo-200">
                    {f}
                  </span>
                ))}
              </div>

              <div className="w-full h-px bg-white/10" />

              <div className="flex items-center gap-2 text-indigo-300 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {/* <span>Included in your membership — no extra cost</span> */}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Page content (blurred in background) ────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-10 pointer-events-none select-none"
          style={{ filter: 'blur(2px)' }}
        >
          {/* Hero Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 p-10 text-white shadow-xl">
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-teal-300/20 rounded-full blur-2xl" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-white/20 backdrop-blur-sm p-5 rounded-2xl shadow-lg flex-shrink-0">
                <UserCheck className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-blue-100 text-sm font-semibold uppercase tracking-widest mb-1">Exclusive Member Benefit</p>
                <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Connect with a Career Counsellor
                </h1>
                <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
                  Get personalized, one-on-one career guidance from our expert counsellors.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Grid */}
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
              What to expect from your session
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {benefits.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl w-fit mb-3">
                    <Icon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
                <UserCheck className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Ready to schedule your call?
                </h2>
                <p className="text-slate-500 max-w-md">
                  Pick a convenient slot and our career counsellor will meet you online.
                </p>
              </div>
              <div className="h-12 px-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center gap-2 text-white text-base font-semibold">
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
};

export default CareerCounsellor;
