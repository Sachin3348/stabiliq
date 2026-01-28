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
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            KNOW YOUR FIT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Is STABILIQ Right for You?
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Designed specifically for salaried professionals seeking responsible financial preparedness
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* This Is For You */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-3xl transition-all hover:-translate-y-1">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-4 mr-4 shadow-lg">
                  <UserCheck className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>This Is For You If</h3>
              </div>
              <ul className="space-y-5">
                {forYouIf.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-blue-600 rounded-full p-2 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700 text-lg leading-relaxed font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* This Is Not For You */}
          <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 hover:shadow-3xl transition-all hover:-translate-y-1">
            <CardContent className="p-10">
              <div className="flex items-center mb-8">
                <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl p-4 mr-4 shadow-lg">
                  <UserX className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>This Is Not For You If</h3>
              </div>
              <ul className="space-y-5">
                {notForYouIf.map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="bg-slate-600 rounded-full p-2 mr-4 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
                      <div className="h-2 w-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-slate-700 text-lg leading-relaxed font-medium">{item}</span>
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