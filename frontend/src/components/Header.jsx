import React, { useState, useEffect } from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { label: 'What is STABILIQ', id: 'what-stabiliq' },
  { label: 'How It Works', id: 'how-it-works' },
  { label: 'Pricing', id: 'pricing' }
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection(item.id), 100);
    } else {
      scrollToSection(item.id);
    }
  };

  const handleLoginClick = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  const handleDashboardClick = () => {
    setMenuOpen(false);
    navigate('/dashboard');
  };

  return (
    <>
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
            onClick={handleLogoClick}
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
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={isAuthenticated ? handleDashboardClick : handleLoginClick}
              className="text-slate-300 hover:text-white hover:bg-white/10 px-4 py-2.5 rounded-lg transition-all text-sm font-medium"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Login'}
            </button>
          </nav>

          <button
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-lg text-white hover:bg-white/10 transition-colors touch-manipulation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              role="button"
              tabIndex={0}
              aria-label="Close menu"
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              onKeyDown={(e) => e.key === 'Enter' && setMenuOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              className="fixed top-0 right-0 bottom-0 w-full max-w-[280px] bg-slate-900 border-l border-white/10 shadow-2xl z-[70] md:hidden flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="text-lg font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Menu
                </span>
                <button
                  type="button"
                  aria-label="Close menu"
                  className="w-10 h-10 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {NAV_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.2 }}
                    onClick={() => handleNavClick(item)}
                    className="text-left text-slate-300 hover:text-white hover:bg-white/10 px-4 py-3.5 rounded-xl transition-colors text-base font-medium"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * NAV_ITEMS.length, duration: 0.2 }}
                  onClick={isAuthenticated ? handleDashboardClick : handleLoginClick}
                  className="text-left text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 px-4 py-3.5 rounded-xl transition-all text-base font-medium mt-2"
                >
                  {isAuthenticated ? 'Go to Dashboard' : 'Login'}
                </motion.button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
