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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Understanding STABILIQ
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Clear transparency about what we offer and what we don't
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* What It Is */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-600 rounded-full p-2 mr-3">
                  <Check className="h-6 w-6 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">What STABILIQ Is</h3>
              </div>
              <ul className="space-y-4">
                {whatItIs.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* What It Is Not */}
          <Card className="border-2 border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-red-600 rounded-full p-2 mr-3">
                  <X className="h-6 w-6 text-white" strokeWidth={3} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">What STABILIQ Is Not</h3>
              </div>
              <ul className="space-y-4">
                {whatItIsNot.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <X className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{item}</span>
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