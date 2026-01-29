import React, { useState } from 'react';
import { Banknote, Briefcase, GraduationCap, CheckCircle, XCircle, FileText, Mail, Target, Lightbulb, Linkedin, Award, BookOpen, Video, FileCheck } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const InteractiveBenefits = () => {
  const [activeTab, setActiveTab] = useState('toolkit');

  const pillars = [
    {
      id: 'toolkit',
      name: 'Job Transition Toolkit',
      icon: Briefcase,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'financial',
      name: 'Financial Assistance',
      icon: Banknote,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'ai-course',
      name: 'AI Upskilling Course',
      icon: GraduationCap,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  const toolkitContent = {
    title: 'Career Tools & Resources',
    subtitle: 'Comprehensive resources to help you navigate your job search with confidence',
    tools: [
      {
        icon: Target,
        title: 'Job Search Checklist',
        description: 'Proven, step-by-step checklist to help you stay organized and focused through every phase of your job search.'
      },
      {
        icon: Mail,
        title: 'Networking Email Templates',
        description: 'Professional email templates for every networking situation - follow-ups, thank you notes, and informational interviews.'
      },
      {
        icon: FileText,
        title: 'Cover Letter Checklist & Templates',
        description: 'Step-by-step guidance and professional templates sourced from trusted career resources.'
      },
      {
        icon: Lightbulb,
        title: 'Job Referral Playbook',
        description: 'Proven strategy to get referred to your dream job. Learn how to reach out on LinkedIn and secure referrals.'
      },
      {
        icon: Linkedin,
        title: 'LinkedIn Profile Optimization',
        description: 'Get tailored tips on optimizing your profile to get found by recruiters and hiring managers.'
      },
      {
        icon: Award,
        title: 'Resume Review & Scoring',
        description: 'Expert feedback on your resume with actionable recommendations to improve your chances.'
      }
    ]
  };

  const financialContent = {
    plans: [
      {
        name: 'Basic Plan',
        price: '₹999',
        assistance: '₹20,000',
        color: 'from-slate-600 to-slate-700'
      },
      {
        name: 'Pro Plan',
        price: '₹2,499',
        assistance: '₹40,000',
        color: 'from-blue-600 to-teal-600',
        popular: true
      }
    ],
    eligibility: [
      'Applicant must have salaried income from a registered company',
      'Minimum 6 months tenure in current company required',
      'Valid for involuntary job loss only (layoffs, redundancy, role elimination)',
      '45 days waiting period after membership activation'
    ],
    notEligible: [
      'Job loss due to poor performance, dishonesty, or fraud',
      'Voluntary resignation or retirement',
      'Casual, seasonal, temporary, or contractual employment',
      'Job loss during the waiting period (first 45 days)',
      'Job loss during probation period',
      'Self-employed or freelance professionals'
    ]
  };

  const aiCourseContent = {
    title: 'AI-Powered Career Transition Course',
    subtitle: 'Master AI tools to accelerate your job search and upskilling journey',
    features: [
      {
        icon: Video,
        title: 'Recorded Video Content',
        description: 'Self-paced learning modules covering essential AI tools and techniques'
      },
      {
        icon: BookOpen,
        title: 'Comprehensive Playbooks',
        description: 'Step-by-step guides for implementing AI in your job search'
      },
      {
        icon: Award,
        title: 'Certificate of Completion',
        description: 'Official STABILIQ certification to showcase your AI proficiency'
      }
    ],
    modules: [
      'AI-Assisted Resume Writing & Optimization',
      'Smart Job Search with AI Tools',
      'AI-Powered Interview Preparation',
      'Networking Automation with AI',
      'Personal Branding with AI Content',
      'Skill Gap Analysis using AI',
      'AI Productivity Tools for Career Growth',
      'Future-Ready Skills Development'
    ]
  };

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6">
            COMPREHENSIVE SUPPORT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Support When You Need It
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three pillars of support designed to help you navigate career transitions with confidence
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Tabs */}
          <div className="lg:col-span-1 space-y-3">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              const isActive = activeTab === pillar.id;
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-white shadow-xl scale-105 border-2 border-blue-300'
                      : 'bg-white/50 hover:bg-white hover:shadow-lg border-2 border-transparent'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${pillar.color} rounded-xl h-14 w-14 flex items-center justify-center mb-4 ${
                    isActive ? 'scale-110' : ''
                  } transition-transform`}>
                    <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                  </div>
                  <h3 className={`text-lg font-bold ${isActive ? 'text-slate-900' : 'text-slate-700'}`} style={{ fontFamily: 'Sora, sans-serif' }}>
                    {pillar.name}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl bg-white h-full">
              <CardContent className="p-10">
                {/* Job Transition Toolkit Content */}
                {activeTab === 'toolkit' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {toolkitContent.title}
                      </h3>
                      <p className="text-lg text-slate-600">{toolkitContent.subtitle}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {toolkitContent.tools.map((tool, index) => {
                        const ToolIcon = tool.icon;
                        return (
                          <div key={index} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 hover:shadow-lg transition-all hover:-translate-y-1">
                            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl h-12 w-12 flex items-center justify-center mb-4">
                              <ToolIcon className="h-6 w-6 text-white" strokeWidth={2} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                              {tool.title}
                            </h4>
                            <p className="text-slate-600 leading-relaxed">{tool.description}</p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 text-white">
                      <p className="text-lg font-semibold">
                        ✨ All resources included with your membership - downloadable templates, checklists, and expert guidance
                      </p>
                    </div>
                  </div>
                )}

                {/* Financial Assistance Content */}
                {activeTab === 'financial' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                        Financial Assistance Plans
                      </h3>
                      <p className="text-lg text-slate-600">Structured support during involuntary job loss</p>
                    </div>

                    {/* Plan Comparison */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                      {financialContent.plans.map((plan, index) => (
                        <div key={index} className={`relative bg-gradient-to-br ${plan.color} rounded-2xl p-8 text-white shadow-xl ${
                          plan.popular ? 'ring-4 ring-blue-300' : ''
                        }`}>
                          {plan.popular && (
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                              <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-xs font-bold">
                                MOST POPULAR
                              </span>
                            </div>
                          )}
                          <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.name}</h4>
                          <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.price}<span className="text-lg">/year</span></div>
                          <div className="border-t border-white/30 my-4"></div>
                          <div className="text-sm opacity-90 mb-2">Financial Assistance Up To</div>
                          <div className="text-5xl font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.assistance}</div>
                          <p className="text-sm opacity-90 mt-3">Structured over up to 2 months, subject to verification</p>
                        </div>
                      ))}
                    </div>

                    {/* Eligibility Criteria */}
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-green-100 rounded-xl p-3">
                            <CheckCircle className="h-6 w-6 text-green-600" />
                          </div>
                          <h4 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Eligibility Criteria</h4>
                        </div>
                        <ul className="space-y-4">
                          {financialContent.eligibility.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 bg-green-50 rounded-xl p-4">
                              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="bg-red-100 rounded-xl p-3">
                            <XCircle className="h-6 w-6 text-red-600" />
                          </div>
                          <h4 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Not Eligible</h4>
                        </div>
                        <ul className="space-y-4">
                          {financialContent.notEligible.map((item, index) => (
                            <li key={index} className="flex items-start gap-3 bg-red-50 rounded-xl p-4">
                              <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
                      <p className="text-slate-800 font-medium">
                        <strong>Important:</strong> All requests are reviewed on a case-by-case basis. Discretionary approval process ensures responsible support for genuine cases of involuntary job loss.
                      </p>
                    </div>
                  </div>
                )}

                {/* AI Course Content */}
                {activeTab === 'ai-course' && (
                  <div>
                    <div className="mb-8">
                      <h3 className="text-3xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                        {aiCourseContent.title}
                      </h3>
                      <p className="text-lg text-slate-600">{aiCourseContent.subtitle}</p>
                    </div>

                    {/* Course Features */}
                    <div className="grid md:grid-cols-3 gap-6 mb-10">
                      {aiCourseContent.features.map((feature, index) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center">
                            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl h-16 w-16 flex items-center justify-center mx-auto mb-4">
                              <FeatureIcon className="h-8 w-8 text-white" strokeWidth={2} />
                            </div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                              {feature.title}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Course Modules */}
                    <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8">
                      <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                        <FileCheck className="h-7 w-7 text-indigo-400" />
                        Course Curriculum
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {aiCourseContent.modules.map((module, index) => (
                          <div key={index} className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all">
                            <div className="bg-indigo-500 rounded-lg h-8 w-8 flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-sm">{index + 1}</span>
                            </div>
                            <span className="text-white font-medium leading-relaxed">{module}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 flex items-center gap-4">
                        <Award className="h-12 w-12 text-white flex-shrink-0" />
                        <div>
                          <div className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                            Certificate of Completion
                          </div>
                          <p className="text-white/90 text-sm">
                            Earn an official STABILIQ certification upon course completion to showcase your AI proficiency to potential employers
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6">
                      <p className="text-slate-800 font-medium text-center">
                        🚀 <strong>Pro Plan Exclusive:</strong> Get unlimited access to all course modules, future updates, and advanced playbooks
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveBenefits;
