import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import WhatIsSection from '../components/WhatIsSection';
import ProductWalkthrough from '../components/ProductWalkthrough';
import HowItWorks from '../components/HowItWorks';
import InteractiveBenefits from '../components/InteractiveBenefits';
import Pricing from '../components/Pricing';
import MemberLoginCTA from '../components/MemberLoginCTA';
import Testimonials from '../components/Testimonials';
import LeadForm from '../components/LeadForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { REFERRAL_STORAGE_KEY } from '../constant';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralCode = (
      params.get('referralCode') ||
      params.get('ref') ||
      params.get('referral') ||
      ''
    ).trim().toUpperCase();

    if (referralCode) {
      localStorage.setItem(REFERRAL_STORAGE_KEY, referralCode);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <WhatIsSection />
      <ProductWalkthrough />
      <HowItWorks />
      <InteractiveBenefits />
      <Pricing />
      {/* <MemberLoginCTA /> */}
      <Testimonials />
      {/* <LeadForm /> */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;