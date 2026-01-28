import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { faqData } from '../mock';

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Clear answers to common questions about STABILIQ
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={`item-${faq.id}`}
              className="border-2 border-slate-200 rounded-lg px-6 hover:border-blue-400 transition-colors"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-slate-900 hover:text-blue-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">Still have questions?</p>
          <a 
            href="#lead-form" 
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Request a call back from our team
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;