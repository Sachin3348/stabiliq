import React from 'react';
import { UserCheck, UserX } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const WhoIsItFor = () => {
  const forYouIf = [
    'You are a salaried private-sector professional',
    'You want financial preparedness for job transitions',
    'You value clarity over promises'
  ];

  const notForYouIf = [
    'You are self-employed or a freelancer',
    'You expect guaranteed payouts',
    'You are on fixed-term contracts'
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Is STABILIQ Right for You?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Designed specifically for salaried professionals seeking responsible financial preparedness
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* This Is For You */}
          <Card className="border-2 border-blue-200 bg-blue-50/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-blue-600 rounded-full p-3 mr-4">
                  <UserCheck className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">This Is For You If</h3>
              </div>
              <ul className="space-y-4">
                {forYouIf.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-blue-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700 text-lg leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* This Is Not For You */}
          <Card className="border-2 border-slate-300 bg-slate-100/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <div className="bg-slate-600 rounded-full p-3 mr-4">
                  <UserX className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">This Is Not For You If</h3>
              </div>
              <ul className="space-y-4">
                {notForYouIf.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-slate-600 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700 text-lg leading-relaxed">{item}</span>
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

export default WhoIsItFor;