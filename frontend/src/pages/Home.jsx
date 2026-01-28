import React from 'react';
import Hero from '../components/Hero';
import ProblemSection from '../components/ProblemSection';
import WhatIsSection from '../components/WhatIsSection';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Pricing from '../components/Pricing';
import Testimonials from '../components/Testimonials';
import LeadForm from '../components/LeadForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ProblemSection />
      <WhatIsSection />
      <HowItWorks />
      <Benefits />
      <Pricing />
      <Testimonials />
      <LeadForm />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;