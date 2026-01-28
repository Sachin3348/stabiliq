import React from 'react';
import { Banknote, Briefcase, GraduationCap } from 'lucide-react';
import { benefitsData } from '../mock';
import { Card, CardContent } from './ui/card';

const iconMap = {
  Banknote: Banknote,
  Briefcase: Briefcase,
  GraduationCap: GraduationCap
};

const Benefits = () => {
  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            COMPREHENSIVE SUPPORT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Support When You Need It
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three pillars of support designed to help you navigate career transitions with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefitsData.map((benefit, index) => {
            const IconComponent = iconMap[benefit.icon];
            const gradients = [
              'from-blue-500 to-blue-600',
              'from-teal-500 to-teal-600',
              'from-indigo-500 to-indigo-600'
            ];
            const bgColors = [
              'from-blue-50 to-blue-100',
              'from-teal-50 to-teal-100',
              'from-indigo-50 to-indigo-100'
            ];
            return (
              <Card key={benefit.id} className="border-0 shadow-2xl hover:shadow-3xl transition-all hover:-translate-y-2 group bg-white">
                <CardContent className="p-8">
                  <div className={`bg-gradient-to-br ${gradients[index]} rounded-2xl h-20 w-20 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    <IconComponent className="h-10 w-10 text-white" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Course Details */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-10 md:p-12 shadow-2xl border border-blue-500/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="bg-blue-500/20 p-3 rounded-xl mr-4">
                <GraduationCap className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>AI Course Curriculum</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-start bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="bg-blue-500 rounded-lg h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-200 text-lg">AI-assisted resume improvement</span>
                </div>
                <div className="flex items-start bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="bg-blue-500 rounded-lg h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-200 text-lg">AI-based job search strategies</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="bg-blue-500 rounded-lg h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-200 text-lg">Interview preparation with AI tools</span>
                </div>
                <div className="flex items-start bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <div className="bg-blue-500 rounded-lg h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-200 text-lg">Productivity during career transitions</span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl">
              <GraduationCap className="mr-3 h-6 w-6" />
              Includes Certificate of Completion by STABILIQ
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;