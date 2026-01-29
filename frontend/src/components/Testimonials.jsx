import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonialsData = [
  {
    name: 'Aakash Verma',
    role: 'Software Engineer',
    initials: 'AV',
    quote: 'The career transition kit was unexpectedly useful. It helped me structure my job search and focus on skill upgrades instead of reacting in panic.',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Megha Kulkarni',
    role: 'Product Analyst',
    initials: 'MK',
    quote: 'Beyond financial support, the interview guidance made a real difference. Mock interviews and resume feedback helped me regain confidence during a difficult phase.',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Rohan Mehta',
    role: 'Operations Manager',
    initials: 'RM',
    quote: 'What I appreciated most was the clarity. Eligibility, limits, and timelines were explained upfront. The entire process felt structured and respectful.',
    gradient: 'from-teal-500 to-teal-600'
  },
  {
    name: 'Ananya Sharma',
    role: 'Marketing Professional',
    initials: 'AS',
    quote: 'Learning recommendations and interview preparation were practical and relevant. It felt like real transition support, not generic advice.',
    gradient: 'from-pink-500 to-pink-600'
  },
  {
    name: 'Kunal Iyer',
    role: 'Finance Analyst',
    initials: 'KI',
    quote: 'Access to curated referrals and guidance was valuable. It didn\'t feel like a job portal — more like thoughtful direction during a transition.',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Sneha Rao',
    role: 'HR Business Partner',
    initials: 'SR',
    quote: 'This felt like a responsible support system. Clear rules, honest communication, and career resources designed for real-world transitions.',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    name: 'Rahul Desai',
    role: 'Data Scientist',
    initials: 'RD',
    quote: 'The AI upskilling course was a game-changer. It helped me stay relevant and confident during my job search journey.',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  {
    name: 'Priya Nair',
    role: 'UX Designer',
    initials: 'PN',
    quote: 'STABILIQ gave me the breathing room I needed. The financial assistance and toolkit together made my transition smoother than I expected.',
    gradient: 'from-cyan-500 to-cyan-600'
  }
];

const Testimonials = () => {
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused) return;

    const autoScrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        // If we've reached the end, scroll back to start
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        } else {
          // Otherwise scroll right
          container.scrollBy({
            left: 400,
            behavior: 'smooth'
          });
        }
      }
    }, 3000); // Auto-scroll every 3 seconds

    return () => clearInterval(autoScrollInterval);
  }, [isPaused]);

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div 
        className="absolute top-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3] 
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-full text-sm font-bold mb-6 shadow-lg">
            LOVED BY THOUSANDS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            See what our members say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real experiences from professionals who trusted STABILIQ during their career transitions
          </p>
        </motion.div>

        {/* Horizontal Scrolling Container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-50 shadow-2xl rounded-full p-4 items-center justify-center transition-all hover:scale-110 border-2 border-slate-200"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 text-slate-700" strokeWidth={3} />
          </button>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-slate-50 shadow-2xl rounded-full p-4 items-center justify-center transition-all hover:scale-110 border-2 border-slate-200"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 text-slate-700" strokeWidth={3} />
          </button>

          {/* Testimonials Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-8 pt-4 px-2 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonialsData.map((testimonial, index) => (
              <motion.div
                key={index}
                className="flex-shrink-0 w-[380px] snap-center"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-xl hover:shadow-2xl transition-all h-full bg-white group hover:-translate-y-2 duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    {/* Quote Icon */}
                    <div className="mb-6">
                      <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl p-4 inline-block">
                        <Quote className="h-8 w-8 text-slate-400 group-hover:text-slate-600 transition-colors" />
                      </div>
                    </div>

                    {/* Quote Text */}
                    <p className="text-slate-700 text-lg leading-relaxed mb-8 flex-grow">
                      "{testimonial.quote}"
                    </p>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                      <div className={`bg-gradient-to-br ${testimonial.gradient} rounded-2xl h-16 w-16 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <span className="text-white font-bold text-xl" style={{ fontFamily: 'Sora, sans-serif' }}>{testimonial.initials}</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>{testimonial.name}</div>
                        <div className="text-slate-600 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicator Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-8 w-20 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-8 w-20 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Mobile Scroll Hint */}
        <motion.div 
          className="md:hidden text-center mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm text-slate-500">← Swipe to see more →</p>
        </motion.div>

        {/* Auto-scroll indicator */}
        {!isPaused && (
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <p className="text-xs text-slate-400">Auto-scrolling • Hover to pause</p>
          </motion.div>
        )}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
