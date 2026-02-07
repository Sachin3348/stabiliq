import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <Header />
      <main className="pt-28 pb-16 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/">
              <Button variant="ghost" className="mb-8 -ml-2 text-slate-600 hover:text-slate-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>

            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-100 p-3 rounded-xl">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Terms & Conditions
                </h1>
                <p className="text-slate-500 text-sm mt-1">Stabiliq Technologies Pvt. Ltd</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-10 text-slate-700">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>1. Introduction</h2>
                <p className="leading-relaxed">
                  These Terms & Conditions (“Terms”) govern access to and use of the Stabiliq platform (“Stabiliq”, “we”, “us”, “our”), operated by Stabiliq Technologies Pvt. Ltd, a company incorporated under the laws of India.
                </p>
                <p className="leading-relaxed mt-3">
                  By creating an account or purchasing a membership, you agree to be bound by these Terms. If you do not agree, please do not use the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>2. Nature of Service</h2>
                <p className="leading-relaxed mb-3">Stabiliq is a subscription-based job transition support service. Stabiliq:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Is not an insurance product</li>
                  <li>Does not indemnify loss of income</li>
                  <li>Does not guarantee employment, re-employment, or financial outcomes</li>
                  <li>Does not replace salary, severance, or statutory benefits</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Any financial assistance provided is fixed, limited, discretionary, and incidental to the overall job transition services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>3. Membership Eligibility</h2>
                <p className="leading-relaxed mb-3">Membership is available only to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Salaried professionals</li>
                  <li>Individuals aged 18 years or older</li>
                  <li>Individuals employed in India at the time of enrollment</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Stabiliq reserves the right to deny or revoke membership if eligibility criteria are not met.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>4. Services Included</h2>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">4.1 Job Transition Toolkit</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Resume review (AI and/or human-assisted)</li>
                  <li>Job search guidance</li>
                  <li>Interview preparation</li>
                  <li>Career planning resources</li>
                  <li>AI-based learning or job search courses</li>
                </ul>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">4.2 Financial Assistance (Conditional)</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Fixed, predefined financial assistance</li>
                  <li>Available only in cases of involuntary job loss</li>
                  <li>Subject to eligibility checks, waiting periods, exclusions, and limits</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>5. Financial Assistance Conditions</h2>
                <p className="leading-relaxed mb-3">Financial assistance:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Is not automatic</li>
                  <li>Is not guaranteed</li>
                  <li>Is not linked to salary or income</li>
                  <li>Is capped at predefined limits per membership period</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Approval is subject to verification and internal review. Stabiliq’s decision shall be final.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>6. Exclusions</h2>
                <p className="leading-relaxed mb-3">Financial assistance will not be provided in cases including, but not limited to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Voluntary resignation</li>
                  <li>Performance-based termination</li>
                  <li>Termination due to misconduct or policy violation</li>
                  <li>Contract, internship, or probationary roles</li>
                  <li>Layoffs announced prior to membership start</li>
                  <li>Fraudulent or misrepresented information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>7. Waiting Period</h2>
                <p className="leading-relaxed">
                  A mandatory waiting period applies from the date of membership activation before any financial assistance may be considered. The duration will be communicated at the time of purchase.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>8. Verification</h2>
                <p className="leading-relaxed">
                  All requests are subject to document and employment verification. Stabiliq reserves the right to request additional information.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>9. Membership Fees & Refunds</h2>
                <p className="leading-relaxed">
                  Membership fees are non-refundable except where required by law. Benefits are non-transferable and limited to the membership period.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>10. User Responsibilities</h2>
                <p className="leading-relaxed mb-3">You agree to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide accurate and truthful information</li>
                  <li>Not misuse or abuse services</li>
                  <li>Not submit false documents</li>
                </ul>
                <p className="leading-relaxed mt-3">
                  Violation may result in suspension or termination without refund.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>11. Limitation of Liability</h2>
                <p className="leading-relaxed">
                  To the maximum extent permitted by law, Stabiliq shall not be liable for indirect or consequential damages. Total liability shall not exceed the membership fees paid in the preceding 12 months.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>12. Intellectual Property</h2>
                <p className="leading-relaxed">
                  All content, branding, software, and materials belong to Stabiliq and may not be used without permission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>13. Termination</h2>
                <p className="leading-relaxed">
                  Stabiliq may suspend or terminate access at its discretion for violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>14. Governing Law</h2>
                <p className="leading-relaxed">
                  These Terms shall be governed by the laws of India. Courts of Maharashtra shall have exclusive jurisdiction.
                </p>
              </section>

              <section className="pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>15. Contact</h2>
                <p className="leading-relaxed">
                  Email: <a href="mailto:support@stabiliq.in" className="text-blue-600 hover:underline font-medium">support@stabiliq.in</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
