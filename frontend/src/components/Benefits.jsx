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
    <section id="benefits" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Comprehensive Support When You Need It
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Three pillars of support designed to help you navigate career transitions with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefitsData.map((benefit) => {
            const IconComponent = iconMap[benefit.icon];
            return (
              <Card key={benefit.id} className="border-2 border-slate-200 hover:border-blue-400 hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <div className="bg-blue-100 rounded-full h-16 w-16 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                    <IconComponent className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" strokeWidth={2} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{benefit.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Course Details */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-slate-50 border-2 border-blue-200 rounded-xl p-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">AI Course Curriculum</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-600 rounded-full h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-700">AI-assisted resume improvement</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 rounded-full h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-700">AI-based job search strategies</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-blue-600 rounded-full h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-700">Interview preparation with AI tools</span>
                </div>
                <div className="flex items-start">
                  <div className="bg-blue-600 rounded-full h-2 w-2 mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-slate-700">Productivity during career transitions</span>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-blue-600 text-white inline-block px-6 py-2 rounded-lg">
              <span className="font-semibold">Includes Certificate of Completion by STABILIQ</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;