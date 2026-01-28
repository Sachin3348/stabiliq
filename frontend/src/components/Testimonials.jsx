import React from 'react';
import { Card, CardContent } from './ui/card';
import { Quote } from 'lucide-react';

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
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-block bg-green-100 text-green-700 px-5 py-2.5 rounded-full text-sm font-bold mb-6">
            LOVED BY THOUSANDS
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            See what our members say
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Real experiences from professionals who trusted STABILIQ during their career transitions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 bg-white relative overflow-hidden">
              <CardContent className="p-8">
                <Quote className="h-10 w-10 text-slate-200 mb-6" />
                <p className="text-slate-700 text-lg leading-relaxed mb-8 min-h-[120px]">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className={`bg-gradient-to-br ${testimonial.gradient} rounded-2xl h-14 w-14 flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>{testimonial.initials}</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>{testimonial.name}</div>
                    <div className="text-slate-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;