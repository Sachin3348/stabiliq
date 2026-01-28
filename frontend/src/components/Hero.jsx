import React from 'react';
import { Button } from './ui/button';
import { Shield, ArrowRight, CheckCircle2 } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(148, 163, 184, 0.3) 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 -right-40 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 backdrop-blur-sm bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/10 p-2 rounded-xl backdrop-blur-sm border border-blue-400/20">
              <Shield className="h-7 w-7 text-blue-400" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>STABILIQ</span>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">How It Works</button>
            <button onClick={() => scrollToSection('benefits')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">Benefits</button>
            <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all text-sm font-medium">FAQ</button>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-36 pb-28 md:pt-48 md:pb-36">
        <div className="max-w-5xl mx-auto">
          {/* Trust Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-400/20 rounded-full px-5 py-2">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">Trusted by professionals across India</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              Stability during <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">unexpected</span> job loss
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed max-w-4xl mx-auto font-medium">
              STABILIQ is a <span className="text-white font-bold">₹999/year membership</span> that supports salaried professionals during involuntary job loss through structured financial assistance, career transition guidance, and practical AI skill training.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-7 text-lg font-bold rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105 border border-blue-500/50"
                onClick={() => scrollToSection('pricing')}
              >
                Become a Member
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-slate-400 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 px-10 py-7 text-lg font-bold rounded-xl transition-all hover:scale-105"
                onClick={() => scrollToSection('lead-form')}
              >
                Know More
              </Button>
            </div>

            <div className="inline-block bg-amber-500/10 border-2 border-amber-400/30 rounded-2xl px-8 py-4 backdrop-blur-md shadow-xl">
              <p className="text-sm text-amber-100 flex items-center justify-center gap-2">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-5 h-5 bg-amber-500 rounded-full text-white text-xs font-bold">!</span>
                <span className="font-semibold">Important:</span> STABILIQ is not an insurance product. Support is discretionary and subject to eligibility and verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;