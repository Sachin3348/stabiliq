import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Banknote, Briefcase, GraduationCap, CheckCircle, XCircle, FileText, Mail, Target, Lightbulb, Linkedin, Award, BookOpen, Video, FileCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const InteractiveBenefits = () => {
  const [activeTab, setActiveTab] = useState('toolkit');

  const pillars = [
    {
      id: 'toolkit',
      name: 'Job Transition Toolkit',
      icon: Briefcase,
      color: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-50',
      description: 'Complete career resources'
    },
    {
      id: 'financial',
      name: 'Financial Assistance',
      icon: Banknote,
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      description: 'Up to ₹40,000 support'
    },
    {
      id: 'ai-course',
      name: 'AI Upskilling Course',
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-600',
      bgGradient: 'from-indigo-50 to-purple-50',
      description: 'Future-ready skills'
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

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const getCurrentGradient = () => {
    const current = pillars.find(p => p.id === activeTab);
    return current?.bgGradient || 'from-slate-50 to-slate-100';
  };

  return (
    <section id="benefits" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5] 
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-blue-600 to-teal-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg">
            COMPREHENSIVE SUPPORT
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Support When You Need It
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three pillars of support designed to help you navigate career transitions with confidence
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Animated Tabs */}
          <div className="lg:col-span-1 space-y-4">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isActive = activeTab === pillar.id;
              return (
                <motion.button
                  key={pillar.id}
                  onClick={() => setActiveTab(pillar.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all relative overflow-hidden group ${
                    isActive
                      ? 'bg-white shadow-2xl'
                      : 'bg-white/70 hover:bg-white hover:shadow-xl'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: isActive ? 1 : 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      className={`absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${pillar.color}`}
                      layoutId="activeIndicator"
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  )}
                  
                  {/* Hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`bg-gradient-to-br ${pillar.color} rounded-xl h-14 w-14 flex items-center justify-center mb-4 shadow-lg`}
                      animate={isActive ? { 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="h-7 w-7 text-white" strokeWidth={2.5} />
                    </motion.div>
                    <h3 className={`text-lg font-bold mb-1 ${isActive ? 'text-slate-900' : 'text-slate-700'}`} style={{ fontFamily: 'Sora, sans-serif' }}>
                      {pillar.name}
                    </h3>
                    <p className="text-sm text-slate-500">{pillar.description}</p>
                  </div>

                  {/* Sparkles on active */}
                  {isActive && (
                    <motion.div
                      className="absolute top-4 right-4"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <Sparkles className="h-5 w-5 text-amber-500" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Content Area - Animated Content */}
          <div className="lg:col-span-3">
            <motion.div
              className={`bg-gradient-to-br ${getCurrentGradient()} rounded-3xl p-2 shadow-2xl`}
              layout
              transition={{ duration: 0.4 }}
            >
              <Card className="border-0 bg-white/80 backdrop-blur-sm h-full">
                <CardContent className="p-10">
                  <AnimatePresence mode="wait">
                    {/* Job Transition Toolkit Content */}
                    {activeTab === 'toolkit' && (
                      <motion.div
                        key="toolkit"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.div variants={itemVariants} className="mb-8">
                          <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                            <Briefcase className="h-8 w-8 text-teal-600" />
                            {toolkitContent.title}
                          </h3>
                          <p className="text-lg text-slate-600">{toolkitContent.subtitle}</p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {toolkitContent.tools.map((tool, index) => {
                            const ToolIcon = tool.icon;
                            return (
                              <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -5 }}
                                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-2 border-teal-100 hover:border-teal-300"
                              >
                                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl h-12 w-12 flex items-center justify-center mb-4 shadow-lg">
                                  <ToolIcon className="h-6 w-6 text-white" strokeWidth={2} />
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                                  {tool.title}
                                </h4>
                                <p className="text-slate-600 leading-relaxed">{tool.description}</p>
                              </motion.div>
                            );
                          })}
                        </div>

                        <motion.div 
                          variants={itemVariants}
                          className="mt-8 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-6 text-white shadow-xl"
                        >
                          <p className="text-lg font-semibold flex items-center gap-2">
                            <Sparkles className="h-5 w-5" />
                            All resources included with your membership - downloadable templates, checklists, and expert guidance
                          </p>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* Financial Assistance Content */}
                    {activeTab === 'financial' && (
                      <motion.div
                        key="financial"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.div variants={itemVariants} className="mb-8">
                          <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                            <Banknote className="h-8 w-8 text-blue-600" />
                            Financial Assistance Plans
                          </h3>
                          <p className="text-lg text-slate-600">Structured support during involuntary job loss</p>
                        </motion.div>

                        {/* Plan Comparison */}
                        <div className="grid md:grid-cols-2 gap-6 mb-10">
                          {financialContent.plans.map((plan, index) => (
                            <motion.div
                              key={index}
                              variants={itemVariants}
                              whileHover={{ scale: 1.05, y: -8 }}
                              className={`relative bg-gradient-to-br ${plan.color} rounded-2xl p-8 text-white shadow-2xl ${
                                plan.popular ? 'ring-4 ring-blue-300' : ''
                              }`}
                            >
                              {plan.popular && (
                                <motion.div 
                                  className="absolute -top-3 left-1/2 transform -translate-x-1/2"
                                  initial={{ opacity: 0, y: -10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <span className="bg-amber-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                    <Sparkles className="h-3 w-3" />
                                    MOST POPULAR
                                  </span>
                                </motion.div>
                              )}
                              <h4 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.name}</h4>
                              <div className="text-4xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.price}<span className="text-lg">/year</span></div>
                              <div className="border-t border-white/30 my-4"></div>
                              <div className="text-sm opacity-90 mb-2">Financial Assistance Up To</div>
                              <div className="text-5xl font-bold flex items-center gap-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                                {plan.assistance}
                                <ArrowRight className="h-8 w-8" />
                              </div>
                              <p className="text-sm opacity-90 mt-3">Structured over up to 2 months, subject to verification</p>
                            </motion.div>
                          ))}
                        </div>

                        {/* Eligibility Criteria */}
                        <div className="grid md:grid-cols-2 gap-8">
                          <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="bg-green-500 rounded-xl p-3 shadow-lg">
                                <CheckCircle className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Eligibility Criteria</h4>
                            </div>
                            <ul className="space-y-3">
                              {financialContent.eligibility.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index }}
                                  className="flex items-start gap-3 bg-green-50 rounded-xl p-4 hover:shadow-md transition-shadow border border-green-100"
                                >
                                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-slate-700 leading-relaxed">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>

                          <motion.div variants={itemVariants}>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="bg-red-500 rounded-xl p-3 shadow-lg">
                                <XCircle className="h-6 w-6 text-white" />
                              </div>
                              <h4 className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>Not Eligible</h4>
                            </div>
                            <ul className="space-y-3">
                              {financialContent.notEligible.map((item, index) => (
                                <motion.li
                                  key={index}
                                  initial={{ opacity: 0, x: 20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.1 * index }}
                                  className="flex items-start gap-3 bg-red-50 rounded-xl p-4 hover:shadow-md transition-shadow border border-red-100"
                                >
                                  <XCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                                  <span className="text-slate-700 leading-relaxed">{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </div>

                        <motion.div variants={itemVariants} className="mt-8 bg-amber-50 border-2 border-amber-300 rounded-2xl p-6 shadow-lg">
                          <p className="text-slate-800 font-medium">
                            <strong>Important:</strong> All requests are reviewed on a case-by-case basis. Discretionary approval process ensures responsible support for genuine cases of involuntary job loss.
                          </p>
                        </motion.div>
                      </motion.div>
                    )}

                    {/* AI Course Content */}
                    {activeTab === 'ai-course' && (
                      <motion.div
                        key="ai-course"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <motion.div variants={itemVariants} className="mb-8">
                          <h3 className="text-3xl font-bold text-slate-900 mb-3 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                            <GraduationCap className="h-8 w-8 text-indigo-600" />
                            {aiCourseContent.title}
                          </h3>
                          <p className="text-lg text-slate-600">{aiCourseContent.subtitle}</p>
                        </motion.div>

                        {/* Course Features */}
                        <div className="grid md:grid-cols-3 gap-6 mb-10">
                          {aiCourseContent.features.map((feature, index) => {
                            const FeatureIcon = feature.icon;
                            return (
                              <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ scale: 1.08, y: -5 }}
                                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow border-2 border-indigo-100 hover:border-indigo-300"
                              >
                                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl h-16 w-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                                  <FeatureIcon className="h-8 w-8 text-white" strokeWidth={2} />
                                </div>
                                <h4 className="text-lg font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                                  {feature.title}
                                </h4>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                              </motion.div>
                            );
                          })}
                        </div>

                        {/* Course Modules */}
                        <motion.div variants={itemVariants} className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-2xl p-8 shadow-2xl">
                          <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                            <FileCheck className="h-7 w-7 text-indigo-400" />
                            Course Curriculum
                          </h4>
                          <div className="grid md:grid-cols-2 gap-4">
                            {aiCourseContent.modules.map((module, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * index }}
                                whileHover={{ scale: 1.03, x: 5 }}
                                className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all cursor-pointer"
                              >
                                <div className="bg-indigo-500 rounded-lg h-8 w-8 flex items-center justify-center flex-shrink-0 shadow-md">
                                  <span className="text-white font-bold text-sm">{index + 1}</span>
                                </div>
                                <span className="text-white font-medium leading-relaxed">{module}</span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 flex items-center gap-4 shadow-xl"
                          >
                            <Award className="h-12 w-12 text-white flex-shrink-0" />
                            <div>
                              <div className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                                Certificate of Completion
                              </div>
                              <p className="text-white/90 text-sm">
                                Earn an official STABILIQ certification upon course completion to showcase your AI proficiency to potential employers
                              </p>
                            </div>
                          </motion.div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-8 bg-indigo-50 border-2 border-indigo-300 rounded-2xl p-6 shadow-lg">
                          <p className="text-slate-800 font-medium text-center flex items-center justify-center gap-2">
                            <Sparkles className="h-5 w-5 text-indigo-600" />
                            <strong>Pro Plan Exclusive:</strong> Get unlimited access to all course modules, future updates, and advanced playbooks
                          </p>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveBenefits;
