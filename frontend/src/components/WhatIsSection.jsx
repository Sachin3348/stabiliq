import React from 'react';
import { Check, Shield, Users, BookOpen, Briefcase, Target, Handshake } from 'lucide-react';

const WhatIsSection = () => {
  const whatItIs = [
    {
      icon: Shield,
      title: 'A membership-based assistance program',
      description: 'Structured financial assistance and career support during involuntary job loss, with clear eligibility and transparent limits.'
    },
    {
      icon: Users,
      title: 'Designed for salaried professionals',
      description: 'Built specifically for private-sector employees navigating unexpected career transitions.'
    },
    {
      icon: Briefcase,
      title: 'Career transition resources',
      description: 'Access to a structured transition kit covering next steps, job search planning, and career guidance.'
    },
    {
      icon: BookOpen,
      title: 'Skill upgrade and learning guidance',
      description: 'Curated learning and skill upgrade recommendations to help members stay relevant during transitions.'
    },
    {
      icon: Target,
      title: 'Interview preparation support',
      description: 'Guidance on resumes, interviews, and preparation to help members approach opportunities with confidence.'
    },
    {
      icon: Handshake,
      title: 'Referral and network assistance',
      description: 'Access to curated referrals and network guidance, where available, to support job search efforts.'
    }
  ];\n\n  return (
    <section className=\"py-24 bg-gradient-to-b from-white to-slate-50\">\n      <div className=\"max-w-7xl mx-auto px-6\">\n        <div className=\"text-center mb-20\">\n          <div className=\"inline-block bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6\">\n            EVERYTHING YOU NEED TO KNOW\n          </div>\n          <h2 className=\"text-4xl md:text-5xl font-bold text-slate-900 mb-6\" style={{ fontFamily: 'Sora, sans-serif' }}>\n            What STABILIQ Is\n          </h2>\n          <p className=\"text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed\">\n            A comprehensive membership program designed to support you through career transitions with clarity and structure\n          </p>\n        </div>\n\n        <div className=\"grid md:grid-cols-2 lg:grid-cols-3 gap-8\">\n          {whatItIs.map((item, index) => {\n            const Icon = item.icon;\n            return (\n              <div key={index} className=\"bg-white border-2 border-slate-100 hover:border-blue-300 rounded-3xl p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group\">\n                <div className=\"bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl h-16 w-16 flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform\">\n                  <Icon className=\"h-8 w-8 text-white\" strokeWidth={2} />\n                </div>\n                <h3 className=\"text-xl font-bold text-slate-900 mb-3\" style={{ fontFamily: 'Sora, sans-serif' }}>{item.title}</h3>\n                <p className=\"text-slate-600 leading-relaxed\">{item.description}</p>\n              </div>\n            );\n          })}\n        </div>\n\n        {/* Important Note */}\n        <div className=\"mt-16 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-10 shadow-xl\">\n          <div className=\"flex items-start gap-4\">\n            <div className=\"bg-amber-500 rounded-2xl p-3 flex-shrink-0 shadow-lg\">\n              <span className=\"text-white font-bold text-2xl\">!</span>\n            </div>\n            <div>\n              <h4 className=\"text-2xl font-bold text-slate-900 mb-3\" style={{ fontFamily: 'Sora, sans-serif' }}>Important Clarification</h4>\n              <p className=\"text-slate-700 text-lg leading-relaxed\">\n                <strong>STABILIQ is not an insurance product.</strong> Support is discretionary and subject to eligibility and verification. We operate as a membership-based assistance program with transparent rules and clear communication.\n              </p>\n            </div>\n          </div>\n        </div>\n      </div>\n    </section>\n  );\n};\n\nexport default WhatIsSection;