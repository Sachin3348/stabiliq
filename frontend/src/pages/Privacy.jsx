import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Privacy = () => {
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
              <div className="bg-teal-100 p-3 rounded-xl">
                <Shield className="h-8 w-8 text-teal-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Privacy Policy
                </h1>
                <p className="text-slate-500 text-sm mt-1">Stabiliq</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-10 text-slate-700">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>1. Introduction</h2>
                <p className="leading-relaxed">
                  This Privacy Policy describes how Stabiliq collects, uses, stores, and protects personal information in accordance with Indian laws, including the Information Technology Act, 2000.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>2. Information We Collect</h2>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">2.1 Personal Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Employment-related information (only when required for service eligibility)</li>
                </ul>
                <h3 className="text-lg font-semibold text-slate-800 mt-4 mb-2">2.2 Usage Information</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Platform activity and interactions</li>
                  <li>Device and log information</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>3. Use of Information</h2>
                <p className="leading-relaxed mb-3">Information is used to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide and manage membership services</li>
                  <li>Verify eligibility</li>
                  <li>Communicate service updates</li>
                  <li>Improve platform functionality</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <p className="leading-relaxed mt-3 font-medium">We do not sell personal data.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>4. Employment & Financial Information</h2>
                <p className="leading-relaxed">
                  Employment or job-loss information is collected only for verification purposes and is handled confidentially.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>5. Data Sharing</h2>
                <p className="leading-relaxed mb-3">Data may be shared with:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Technology and service providers</li>
                  <li>Legal or regulatory authorities when required</li>
                </ul>
                <p className="leading-relaxed mt-3 font-medium">No data is shared for advertising or resale.</p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>6. Data Security</h2>
                <p className="leading-relaxed">
                  We implement reasonable technical and organizational measures to protect personal information. Access is restricted to authorized personnel.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>7. Data Retention</h2>
                <p className="leading-relaxed">
                  Data is retained only for as long as necessary to fulfil service purposes or legal requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>8. User Rights</h2>
                <p className="leading-relaxed">
                  You may request access, correction, or deletion of personal data by contacting us. Withdrawal of consent may limit service access.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>9. Cookies</h2>
                <p className="leading-relaxed">
                  Cookies may be used to enhance user experience. You can manage cookies through browser settings.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>10. Children’s Privacy</h2>
                <p className="leading-relaxed">
                  Stabiliq does not knowingly collect data from individuals under 18 years of age.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>11. Policy Updates</h2>
                <p className="leading-relaxed">
                  This Privacy Policy may be updated periodically. Continued use of the platform constitutes acceptance of changes.
                </p>
              </section>

              <section className="pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>12. Contact</h2>
                <p className="leading-relaxed">
                  Privacy queries: <a href="mailto:support@stabiliq.com" className="text-teal-600 hover:underline font-medium">support@stabiliq.com</a>
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

export default Privacy;
