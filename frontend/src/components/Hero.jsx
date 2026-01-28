import React from 'react';
import { Button } from './ui/button';
import { Shield, ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-400" strokeWidth={2} />
            <span className="text-2xl font-bold text-white tracking-tight">STABILIQ</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium">How It Works</button>
            <button onClick={() => scrollToSection('benefits')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium">Benefits</button>
            <button onClick={() => scrollToSection('pricing')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium">Pricing</button>
            <button onClick={() => scrollToSection('faq')} className="text-slate-200 hover:text-white transition-colors text-sm font-medium">FAQ</button>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Stability during unexpected job loss
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            STABILIQ is a ₹999/year membership that supports salaried professionals during involuntary job loss through structured financial assistance, career transition guidance, and practical AI skill training.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg font-semibold transition-all"
              onClick={() => scrollToSection('pricing')}
            >
              Become a Member
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-slate-300 text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold transition-all"
              onClick={() => scrollToSection('lead-form')}
            >
              Know More
            </Button>
          </div>

          <div className="inline-block bg-amber-500/10 border border-amber-500/30 rounded-lg px-6 py-3 backdrop-blur-sm">
            <p className="text-sm text-amber-200">
              <span className="font-semibold">Important:</span> STABILIQ is not an insurance product. Support is discretionary and subject to eligibility and verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;