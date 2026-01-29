import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, LogIn, UserPlus, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

const MemberLoginCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-blue-500/20 backdrop-blur-sm text-blue-200 px-5 py-2.5 rounded-full text-sm font-bold mb-6 border border-blue-400/30">
            <Shield className="h-4 w-4" />
            ALREADY A MEMBER?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Access Your Member Dashboard
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Login to access your AI courses, career tools, profile analysis, and financial assistance options
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-0 shadow-2xl bg-white hover:shadow-3xl transition-all hover:-translate-y-2 group h-full">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl h-16 w-16 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <LogIn className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Existing Member
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Already enrolled? Access your personalized dashboard, courses, and resources
                </p>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg py-6 font-bold rounded-xl shadow-lg"
                  onClick={() => navigate('/login')}
                >
                  Login to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Signup Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-3xl transition-all hover:-translate-y-2 group h-full">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl h-16 w-16 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <UserPlus className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                  New Member
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Not enrolled yet? Create your account and start your membership journey today
                </p>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-100 text-lg py-6 font-bold rounded-xl"
                  onClick={() => navigate('/signup')}
                >
                  Create Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        >
          {[
            { title: 'AI Courses', desc: '6 comprehensive modules' },
            { title: 'Career Tools', desc: 'Resume & profile analysis' },
            { title: 'Job Toolkit', desc: 'Interview prep resources' },
            { title: 'Financial Support', desc: 'Up to ₹40,000 assistance' }
          ].map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                {feature.title}
              </div>
              <div className="text-slate-300 text-sm">{feature.desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MemberLoginCTA;
