import React from 'react';
import { ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../mock';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            How STABILIQ Works
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A simple, transparent three-step process
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {howItWorksSteps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-white border-2 border-slate-200 rounded-xl p-8 hover:shadow-xl transition-all hover:border-blue-400 group">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-600 text-white rounded-full h-12 w-12 flex items-center justify-center text-xl font-bold shadow-lg group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.description}</p>
                  </div>
                  
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-blue-400" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;