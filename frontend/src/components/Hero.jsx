import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, CheckCircle2, Users, Award, TrendingUp } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden">
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Floating Header */}
      <header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-md bg-slate-950/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2.5 rounded-xl shadow-lg shadow-blue-500/20">
              <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>STABILIQ</span>
          </div>
          <nav className="hidden md:flex items-center space-x-1">
            <button onClick={() => scrollToSection('what-stabiliq')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all text-sm font-medium">What is STABILIQ</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all text-sm font-medium">How It Works</button>
            <button onClick={() => scrollToSection('pricing')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all text-sm font-medium">Pricing</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-slate-300 hover:text-white hover:bg-white/5 px-4 py-2.5 rounded-lg transition-all text-sm font-medium">Testimonials</button>
          </nav>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3">
              <Users className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>1000+</div>
                <div className="text-xs text-slate-400 font-medium">Active Members</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3">
              <Award className="h-5 w-5 text-teal-400" />
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>300+</div>
                <div className="text-xs text-slate-400 font-medium">Members Upskilled</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3">
              <TrendingUp className="h-5 w-5 text-emerald-400" />
              <div>
                <div className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>₹30K</div>
                <div className="text-xs text-slate-400 font-medium">Max Support</div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              Stability when <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-emerald-400">work stops</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
              STABILIQ is a subscription based membership program for salaried professionals that provides <span className="text-white font-bold">upskilling courses</span>, <span className="text-white font-bold">job transition support</span> and <span className="text-white font-bold">financial assistance</span> in case of involuntary job loss.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-10">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 via-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-12 py-7 text-xl font-bold rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105 border border-blue-400/30"
                onClick={() => scrollToSection('pricing')}
              >
                Become a Member
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-12 py-7 text-xl font-bold rounded-2xl transition-all hover:scale-105"
                onClick={() => scrollToSection('what-stabiliq')}
              >
                Learn More
              </Button>
            </div>

            <div className="inline-flex items-center gap-3 bg-amber-500/10 border-2 border-amber-400/30 rounded-2xl px-8 py-4 backdrop-blur-md shadow-2xl">
              <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 bg-amber-500 rounded-full">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <p className="text-sm text-amber-100 font-medium">
                STABILIQ is not an insurance product. Support is discretionary, subject to eligibility and verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;