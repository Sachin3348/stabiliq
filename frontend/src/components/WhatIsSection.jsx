import React from 'react';
import { Check, X } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const WhatIsSection = () => {
  const whatItIs = [
    'A membership-based assistance program',
    'Designed for salaried professionals',
    'Focused on involuntary job loss',
    'Transparent, rule-based, and responsible'
  ];

  const whatItIsNot = [
    'Not insurance',
    'No guaranteed payouts',
    'Not a loan',
    'Not emergency cash on demand'
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            TRANSPARENCY FIRST
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Understanding STABILIQ
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Clear transparency about what we offer and what we don't
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* What It Is */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-3xl transition-all hover:-translate-y-1">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-3 mr-4 shadow-lg">
                  <Check className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>What STABILIQ Is</h3>
              </div>
              <ul className="space-y-5">
                {whatItIs.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-green-500 rounded-full p-1.5 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-lg font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What It Is Not */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-3xl transition-all hover:-translate-y-1">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl p-3 mr-4 shadow-lg">
                  <X className="h-8 w-8 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>What STABILIQ Is Not</h3>
              </div>
              <ul className="space-y-5">
                {whatItIsNot.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-red-500 rounded-full p-1.5 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <X className="h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-lg font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSection;