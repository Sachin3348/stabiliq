import React, { useRef, useState } from 'react';
import { Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const CHECKLIST = [
  'What STABILIQ Is & How It Works',
  'Membership Benefits Explained',
  'Financial Assistance & Eligibility',
  'Step-by-Step Claim Process',
  'Dashboard Walkthrough',
  'AI Courses & Career Support',
];

const ProductWalkthrough = () => {
  const sectionRef = useRef(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [playClicked, setPlayClicked] = useState(false);
  const { inView } = useIntersectionObserver(sectionRef, { threshold: 0.15 });

  const scrollToPricing = () => {
    const el = document.getElementById('pricing');
    if (el) {
      const offset = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="product-walkthrough"
      className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden"
      aria-labelledby="walkthrough-heading"
    >
      {/* Subtle background orbs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section label */}
        <div className="text-center mb-14">
          <div className="inline-block bg-blue-100 text-blue-700 px-5 py-2.5 rounded-full text-sm font-bold mb-5 tracking-wide uppercase">
            Platform Walkthrough
          </div>
          <h2
            id="walkthrough-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            See exactly what you're{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
              getting access to
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Watch a complete walkthrough of the STABILIQ platform - from membership benefits to your first claim - before you decide.
          </p>
        </div>

        {/* Main card */}
        <div
          className={`transition-all duration-700 ease-out ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-white border border-slate-200/80 rounded-3xl shadow-2xl shadow-slate-200/60 overflow-hidden">
            <div className="grid lg:grid-cols-5 gap-0 lg:relative">

              {/* VIDEO - single instance, layout via CSS only */}
              <div className="lg:col-span-3 bg-slate-950 relative lg:absolute lg:inset-y-0 lg:left-0 lg:[width:60%]">
                {/* Mobile: 16:9 padding trick. Desktop: absolute inset fills full column */}
                <div className="relative w-full lg:absolute lg:inset-0" style={{ paddingBottom: '56.25%' }} >
                  <div className="lg:!pb-0 absolute inset-0">
                  {!playClicked && (
                    <button
                      className="absolute inset-0 w-full h-full flex items-center justify-center group bg-slate-950 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500"
                      onClick={() => setPlayClicked(true)}
                      aria-label="Play STABILIQ platform walkthrough video"
                    >
                      <img
                        src="https://img.youtube.com/vi/u7-rDm2ybVw/maxresdefault.jpg"
                        alt="STABILIQ platform walkthrough thumbnail"
                        className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-80 transition-opacity duration-300"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-lg tracking-wide">
                        Full Walkthrough
                      </div>
                      <div className="relative z-10 flex flex-col items-center gap-3">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full flex items-center justify-center shadow-2xl shadow-black/40 group-hover:scale-110 transition-transform duration-300">
                          <Play className="h-7 w-7 sm:h-9 sm:w-9 text-blue-600 fill-blue-600 ml-1" aria-hidden="true" />
                        </div>
                        <span className="text-white text-sm font-semibold drop-shadow-lg bg-black/40 backdrop-blur-sm px-4 py-1.5 rounded-full">
                          Watch Walkthrough
                        </span>
                      </div>
                    </button>
                  )}
                  {playClicked && (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/u7-rDm2ybVw?autoplay=1&rel=0&modestbranding=1&color=white"
                      title="STABILIQ Platform Walkthrough - Membership, Financial Assistance & Career Support"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      onLoad={() => setIframeLoaded(true)}
                      aria-label="STABILIQ platform walkthrough video"
                    />
                  )}
                  </div>
                </div>
              </div>

              {/* CONTENT - below video on mobile, right panel on desktop */}
              {/* lg:col-start-4 pushes content to the right 2/5, leaving left 3/5 for absolute video */}
              <div className="lg:col-span-2 lg:col-start-4 p-8 sm:p-10 flex flex-col justify-between gap-8">
                <div>
                  <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-3">
                    What's covered
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 leading-snug" style={{ fontFamily: 'Sora, sans-serif' }}>
                    Everything answered in one video
                  </h3>

                  {/* Checklist */}
                  <ul className="space-y-3" role="list">
                    {CHECKLIST.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2
                          className="h-5 w-5 text-teal-500 flex-shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="text-slate-700 text-sm sm:text-base font-medium leading-snug">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <button
                    onClick={scrollToPricing}
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-base px-6 py-4 rounded-2xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all hover:scale-[1.02] active:scale-100 flex items-center justify-center gap-2 min-h-[52px]"
                    aria-label="View STABILIQ membership plans"
                  >
                    View Membership Plans
                    <ArrowRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                  <p className="text-center text-xs text-slate-400 font-medium">
                    Starting at ₹1999/month · Cancel anytime
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social proof strip */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { value: '1000+', label: 'Active Members' },
            { value: '300+', label: 'Members Upskilled' },
            { value: '₹40K', label: 'Max Assistance' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>{value}</div>
              <div className="text-sm text-slate-500 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductWalkthrough;
