import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const Eligibility = () => {
  const eligibleScenarios = [
    'Employer-initiated layoff',
    'Redundancy',
    'Role elimination'
  ];

  const notEligible = [
    'Voluntary resignation',
    'Performance termination',
    'Contract completion',
    'Mutual separation without layoff proof'
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Eligibility & Limits
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Understanding which scenarios qualify for support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Eligible Scenarios */}
          <Card className="border-2 border-green-200 bg-green-50/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-8 w-8 text-green-600 mr-3" strokeWidth={2.5} />
                <h3 className="text-2xl font-bold text-slate-900">Eligible Scenarios</h3>
              </div>
              <p className="text-slate-600 mb-6">Support may be available for these involuntary job loss situations:</p>
              <ul className="space-y-4">
                {eligibleScenarios.map((scenario, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{scenario}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Not Eligible */}
          <Card className="border-2 border-red-200 bg-red-50/50">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <XCircle className="h-8 w-8 text-red-600 mr-3" strokeWidth={2.5} />
                <h3 className="text-2xl font-bold text-slate-900">Not Eligible</h3>
              </div>
              <p className="text-slate-600 mb-6">These situations do not qualify for support:</p>
              <ul className="space-y-4">
                {notEligible.map((scenario, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="h-5 w-5 text-red-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 text-lg">{scenario}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Important Note */}
        <div className="mt-12 bg-amber-50 border-2 border-amber-300 rounded-xl p-8">
          <div className="flex items-start">
            <div className="bg-amber-500 rounded-full p-2 mr-4 flex-shrink-0">
              <span className="text-white font-bold text-xl">!</span>
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Important Clarification</h4>
              <p className="text-slate-700 leading-relaxed">
                All support decisions are discretionary and require documentation verification. 
                Financial assistance is structured support, not immediate cash transfer, and is subject to 
                eligibility review. The program is designed to help genuine cases of involuntary job loss only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Eligibility;