import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Account for header height
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-slate-950/95 backdrop-blur-xl shadow-2xl border-b border-white/10' 
          : 'bg-slate-950/70 backdrop-blur-md border-b border-white/5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-3 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className={`bg-gradient-to-br from-blue-500 to-teal-500 p-2.5 rounded-xl shadow-lg transition-all duration-300 ${
            scrolled ? 'shadow-blue-500/30' : 'shadow-blue-500/20'
          }`}>
            <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            STABILIQ
          </span>
        </motion.div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => scrollToSection('what-stabiliq')} 
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
          >
            What is STABILIQ
          </button>
          <button 
            onClick={() => scrollToSection('how-it-works')} 
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
          >
            How It Works
          </button>
          <button 
            onClick={() => scrollToSection('pricing')} 
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
          >
            Pricing
          </button>
          <button 
            onClick={() => navigate('/login')} 
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
          >
            Login
          </button>
          {/* <button 
            onClick={() => navigate('/signup')} 
            className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
          >
            Signup
          </button> */}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
