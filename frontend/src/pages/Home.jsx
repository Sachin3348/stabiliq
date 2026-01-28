import React from 'react';
import Hero from '../components/Hero';
import WhatIsSection from '../components/WhatIsSection';
import WhoIsItFor from '../components/WhoIsItFor';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Eligibility from '../components/Eligibility';
import Pricing from '../components/Pricing';
import LeadForm from '../components/LeadForm';
import FAQ from '../components/FAQ';
import About from '../components/About';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Hero />
      <WhatIsSection />
      <WhoIsItFor />
      <HowItWorks />
      <Benefits />
      <Eligibility />
      <Pricing />
      <LeadForm />
      <FAQ />
      <About />
      <Footer />
    </div>
  );
};

export default Home;