import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check, Shield } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { membershipData, processMembership } from '../mock';
import { useToast } from '../hooks/use-toast';

const Pricing = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleBecomeMember = async () => {
    setLoading(true);
    try {
      // Mock membership purchase
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
    <section id="pricing" className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            One annual membership. Complete access to all benefits.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="border-4 border-blue-400 shadow-2xl">
            <CardContent className="p-10">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Shield className="h-12 w-12 text-blue-600" strokeWidth={2} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-2">STABILIQ Membership</h3>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold text-blue-600">₹{membershipData.price}</span>
                  <span className="text-2xl text-slate-600 ml-2">/ {membershipData.duration}</span>
                </div>
                <p className="text-slate-600">Annual membership with full benefits</p>
              </div>

              <div className="space-y-4 mb-8">
                {membershipData.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-green-100 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
                      <Check className="h-5 w-5 text-green-600" strokeWidth={3} />
                    </div>
                    <span className="text-slate-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8">
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-6 font-semibold"
                  onClick={handleBecomeMember}
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Become a Member'}
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-2 text-lg py-6 font-semibold"
                  onClick={scrollToLeadForm}
                >
                  Know More
                </Button>
              </div>

              {/* Important Notes */}
              <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-6">
                <h4 className="font-bold text-slate-900 mb-3 text-lg">Important Notes:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Membership is <strong>non-cancellable and non-refundable</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>STABILIQ is <strong>not an insurance product</strong></span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Support is <strong>discretionary</strong> and subject to eligibility verification</span>
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