import React from 'react';
import { Card, CardContent } from './ui/card';

const About = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <Card className="border-2 border-slate-200 shadow-lg">
          <CardContent className="p-10 md:p-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                About STABILIQ
              </h2>
            </div>
            
            <div className="space-y-6 text-lg text-slate-700 leading-relaxed">
              <p className="text-center font-semibold text-xl text-slate-900">
                Careers today are dynamic.
                <br />
                Job transitions shouldn't become financial crises.
              </p>
              
              <p>
                STABILIQ was created to offer structured, transparent support during uncertain career moments — 
                without overpromising and without complexity.
              </p>
              
              <p>
                We believe in responsible financial preparedness. We believe in clarity over claims. 
                And we believe that salaried professionals deserve a safety net designed specifically for their reality.
              </p>
              
              <p className="text-center font-semibold text-blue-600 pt-4">
                Transparent. Responsible. Built for professionals.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;