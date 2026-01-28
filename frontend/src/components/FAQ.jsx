import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { faqData } from '../mock';
import { HelpCircle, PhoneCall } from 'lucide-react';

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
            QUESTIONS ANSWERED
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600">
            Clear answers to common questions about STABILIQ
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={`item-${faq.id}`}
              className="border-0 bg-slate-50 rounded-2xl px-8 hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
            >
              <AccordionTrigger className="text-left text-xl font-bold text-slate-900 hover:text-blue-600 py-7" style={{ fontFamily: 'Sora, sans-serif' }}>
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-lg leading-relaxed pb-7 pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-16 text-center bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-10 shadow-2xl">
          <p className="text-slate-200 mb-6 text-xl font-medium">Still have questions?</p>
          <a 
            href="#lead-form" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg text-lg"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <PhoneCall className="h-5 w-5" />
            Request a call back from our team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;