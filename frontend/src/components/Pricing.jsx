import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check, Shield, Sparkles } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { membershipData, processMembership } from '../mock';
import { useToast } from '../hooks/use-toast';

const Pricing = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleBecomeMember = async () => {
    setLoading(true);
    try {
      const result = await processMembership({
        timestamp: new Date().toISOString()
      });
      
      toast({
        title: "Success!",
        description: result.message,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const scrollToLeadForm = () => {
    const element = document.getElementById('lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-500/20 backdrop-blur-sm text-blue-200 px-4 py-2 rounded-full text-sm font-bold mb-4 border border-blue-400/30">
            SIMPLE PRICING
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            One Membership. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Complete Access.</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Transparent annual pricing with all benefits included
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl bg-white relative overflow-hidden">
            {/* Popular Badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-bl-2xl flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="font-bold text-sm">MOST POPULAR</span>
              </div>
            </div>
            
            <CardContent className="p-10 md:p-12">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-4 rounded-2xl shadow-xl">
                    <Shield className="h-12 w-12 text-white" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>STABILIQ Membership</h3>
                <div className="flex items-baseline justify-center mb-3">
                  <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700" style={{ fontFamily: 'Sora, sans-serif' }}>₹{membershipData.price}</span>
                  <span className="text-2xl text-slate-600 ml-3 font-semibold">/ {membershipData.duration}</span>
                </div>
                <p className="text-slate-600 font-medium">Annual membership with complete benefits</p>
              </div>

              <div className="space-y-4 mb-10 bg-slate-50 rounded-2xl p-8">
                {membershipData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-2 mr-4 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                      <Check className="h-5 w-5 text-white" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-lg font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-8">
                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-xl py-8 font-bold rounded-xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 transition-all hover:scale-105"
                  onClick={handleBecomeMember}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Become a Member Now'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-2 border-slate-300 text-slate-700 hover:bg-slate-50 text-lg py-7 font-bold rounded-xl transition-all"
                  onClick={scrollToLeadForm}
                >
                  Know More Before Joining
                </Button>
              </div>

              {/* Important Notes */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start mb-3">
                  <div className="bg-amber-500 rounded-xl p-2 mr-3 flex-shrink-0">
                    <span className="text-white font-bold text-lg">!</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-lg" style={{ fontFamily: 'Sora, sans-serif' }}>Important Notes:</h4>
                </div>
                <ul className="space-y-3 text-slate-700 ml-11">
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-600 font-bold">•</span>
                    <span className="text-base">Membership is <strong>non-cancellable and non-refundable</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-600 font-bold">•</span>
                    <span className="text-base">STABILIQ is <strong>not an insurance product</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2 text-amber-600 font-bold">•</span>
                    <span className="text-base">Support is <strong>discretionary</strong> and subject to eligibility verification</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;