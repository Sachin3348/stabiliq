import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Cal, { getCalApi } from '@calcom/embed-react';
import { UserCheck, Clock, Video, MessageSquare, Star, ArrowRight } from 'lucide-react';
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-teal-500 p-10 text-white shadow-xl">
          {/* decorative blobs */}
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
                Get personalized, one-on-one career guidance from our expert counsellors. Whether you're navigating a job transition, 
                preparing for interviews, or planning your next move — we're here to help.
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
              <div key={title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
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
          {!showCal ? (
            /* CTA to reveal calendar */
            <div className="flex flex-col items-center justify-center text-center py-16 px-8 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-5 rounded-2xl shadow-lg">
                <UserCheck className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Ready to schedule your call?
                </h2>
                <p className="text-slate-500 max-w-md">
                  Hi <span className="font-semibold text-slate-800">{user?.name?.split(' ')[0] || 'there'}</span> — pick a convenient slot 
                  and our career counsellor will meet you online. Sessions are 30 minutes, fully free as part of your membership.
                </p>
              </div>
              <Button
                onClick={() => setShowCal(true)}
                className="h-12 px-8 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md gap-2"
              >
                Schedule a Call
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            /* Embedded Cal.com widget */
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Pick your slot
              </h2>
              <div className="rounded-2xl overflow-hidden border border-slate-100">
                <Cal
                  calLink="stabiliq-pgoe0h/15min"
                  style={{ width: '100%', height: '600px', overflow: 'scroll' }}
                  config={{
                    layout: 'month_view',
                    theme: 'light',
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default CareerCounsellor;
