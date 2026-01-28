import React from 'react';
import { ArrowRight } from 'lucide-react';
import { howItWorksSteps } from '../mock';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-teal-100 text-teal-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            SIMPLE PROCESS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            How STABILIQ Works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A simple, transparent three-step process
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent transform z-0"></div>
          
          <div className="grid md:grid-cols-3 gap-12 relative z-10">
            {howItWorksSteps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-white border-0 shadow-2xl rounded-2xl p-8 hover:shadow-3xl transition-all hover:-translate-y-2 group h-full">
                  {/* Step Number */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl h-14 w-14 flex items-center justify-center text-2xl font-bold shadow-2xl group-hover:scale-110 transition-transform" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {item.step}
                    </div>
                  </div>
                  
                  <div className="mt-10 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
                  </div>
                  
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                      <div className="bg-blue-600 rounded-full p-2 shadow-xl">
                        <ArrowRight className="h-6 w-6 text-white" strokeWidth={3} />
                      </div>
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