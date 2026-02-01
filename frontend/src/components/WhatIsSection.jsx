import React, { useRef, useState, useEffect } from 'react';
import { Shield, Users, BookOpen, Briefcase, Target, Handshake } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FOCUS_INTERVAL_MS = 2000;

const WhatIsSection = () => {
  const sectionRef = useRef(null);
  const { inView } = useIntersectionObserver(sectionRef, { threshold: 0.2 });
  const [autoFocusedIndex, setAutoFocusedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const intervalRef = useRef(null);

  const displayFocusedIndex = hoveredIndex !== null ? hoveredIndex : autoFocusedIndex;

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
      title: 'AI Learning & Career Upskilling',
      description: 'Expert-curated AI courses and guidance to help members build in-demand skills and navigate career transitions.'
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
  ];

  useEffect(() => {
    if (inView && hoveredIndex === null) {
      intervalRef.current = setInterval(() => {
        setAutoFocusedIndex((i) => (i + 1) % whatItIs.length);
      }, FOCUS_INTERVAL_MS);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [inView, hoveredIndex, whatItIs.length]);

  return (
    <section ref={sectionRef} id="what-stabiliq" className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6">
            EVERYTHING YOU NEED TO KNOW
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            What STABILIQ Is
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive membership program designed to support you through career transitions with clarity and structure
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whatItIs.map((item, index) => {
            const Icon = item.icon;
            const isFocused = index === displayFocusedIndex;
            return (
              <div
                key={index}
                className={`bg-white border-2 rounded-3xl p-8 transition-all duration-300 group ${
                  isFocused ? 'border-blue-300 shadow-2xl -translate-y-2' : 'border-slate-100'
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={`bg-gradient-to-br from-blue-600 to-teal-600 rounded-2xl h-16 w-16 flex items-center justify-center mb-6 shadow-xl transition-transform duration-300 ${
                    isFocused ? 'scale-110' : ''
                  }`}
                >
                  <Icon className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>

        {/* Important Note */}
        {/* <div className="mt-16 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-10 shadow-xl">
          <div className="flex items-start gap-4">
            <div className="bg-amber-500 rounded-2xl p-3 flex-shrink-0 shadow-lg">
              <span className="text-white font-bold text-2xl">!</span>
            </div>
            <div>
              <h4 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Important Clarification</h4>
              <p className="text-slate-700 text-lg leading-relaxed">
                <strong>STABILIQ is not an insurance product.</strong> Support is discretionary and subject to eligibility and verification. We operate as a membership-based assistance program with transparent rules and clear communication.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default WhatIsSection;
