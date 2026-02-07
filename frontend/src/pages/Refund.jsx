import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Receipt } from 'lucide-react';
import { Button } from '../components/ui/button';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Refund = () => {
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
              <div className="bg-amber-100 p-3 rounded-xl">
                <Receipt className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
                  Refund Policy
                </h1>
                <p className="text-slate-500 text-sm mt-1">Stabiliq Technologies Pvt. Ltd</p>
              </div>
            </div>

            <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>1. No Refunds</h2>
                <p className="leading-relaxed">
                  All membership fees paid to Stabiliq are <strong>non-refundable</strong>. Once a subscription or membership plan is purchased and activated, we do not offer refunds for any unused portion of the membership period, for cancellation by the member, or for change of mind.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>2. Exceptions</h2>
                <p className="leading-relaxed">
                  Refunds may only be considered where required by applicable law. In such cases, you may contact us with your request and supporting details. Stabiliq reserves the right to assess each request on a case-by-case basis in accordance with legal requirements.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>3. Cancellation</h2>
                <p className="leading-relaxed">
                  You may cancel your membership at any time. Cancellation will stop any future renewals or charges. No refund will be provided for the current membership period; you will retain access to member benefits until the end of that period.
                </p>
              </section>

              <section className="pt-4 border-t border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>4. Contact</h2>
                <p className="leading-relaxed">
                  For any questions regarding this Refund Policy, please contact us at{' '}
                  <a href="mailto:support@stabiliq.in" className="text-blue-600 hover:underline font-medium">support@stabiliq.in</a>.
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

export default Refund;
