import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Menu, X } from 'lucide-react';
import stabiliqLogo from '../../assets/svgs/logo.svg';

const ResumeTemplatesNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left: back + logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="w-px h-5 bg-slate-200" />
            <Link to="/dashboard" className="flex items-center">
              <img src={stabiliqLogo} alt="STABILIQ" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Center: label */}
          <span className="hidden md:block text-sm font-semibold text-slate-500 tracking-wide uppercase">
            Resume Templates
          </span>

          {/* Right: CTA */}
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard/profile-analysis"
              className="hidden sm:flex items-center gap-2 text-sm font-semibold text-white px-4 py-2 rounded-xl transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #0891b2)' }}
            >
              Submit Your Resume
            </Link>
            <button
              className="sm:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition"
              onClick={() => setMenuOpen(v => !v)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-slate-100 shadow-lg px-6 py-4"
          >
            <Link
              to="/dashboard/profile-analysis"
              onClick={() => setMenuOpen(false)}
              className="block text-sm font-semibold text-blue-600 py-2"
            >
              Submit Your Resume →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResumeTemplatesNavbar;
