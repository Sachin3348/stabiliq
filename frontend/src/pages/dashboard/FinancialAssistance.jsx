import React from 'react';
import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';

const FinancialAssistance = () => {
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="financial-assistance-page"
      >
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="relative max-w-lg w-full mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200 via-indigo-100 to-blue-300 rounded-3xl blur-2xl opacity-60 -z-10 scale-105" />
            <div className="bg-white/70 backdrop-blur-md border border-white/80 shadow-2xl rounded-2xl p-6 sm:p-10 flex flex-col items-center text-center gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Request Financial Assistance
                </h2>
                <p className="text-slate-600 text-base leading-relaxed">
                  To request financial assistance, send an email from your registered email address to:
                </p>
              </div>
              <a
                href="mailto:support@stabiliq.in"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-md transition-all duration-200 text-lg"
              >
                <Mail className="h-5 w-5" />
                support@stabiliq.in
              </a>
              <p className="text-sm text-slate-400">
                Our team will review your request and get back to you within 5–7 business days.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FinancialAssistance;
