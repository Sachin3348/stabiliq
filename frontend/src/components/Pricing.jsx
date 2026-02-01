import React, { useState } from 'react';
import { Button } from './ui/button';
import { Check, Shield, Sparkles, Zap } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { processMembership } from '../mock';
import { useToast } from '../hooks/use-toast';

const Pricing = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState({ basic: false, pro: false });

  const handleBecomeMember = async (plan) => {
    setLoading({ ...loading, [plan]: true });
    try {
      const result = await processMembership({
        plan,
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
      setLoading({ ...loading, [plan]: false });
    }
  };

  const scrollToLeadForm = () => {
    const element = document.getElementById('lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      subtitle: 'Perfect for salaried professionals',
      price: 999,
      features: [
        'Access to member support resources',
        'AI upskilling course',
        'Eligibility for support during involuntary job loss'
      ],
      icon: Shield,
      gradient: 'from-slate-600 to-slate-700',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      subtitle: 'For serious professionals',
      price: 2499,
      features: [
        'AI upskilling course',
        'Job transition KIT',
        'Access to member support resources',
        'Eligibility for support during involuntary job loss'
      ],
      icon: Zap,
      gradient: 'from-blue-600 to-teal-600',
      popular: true
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-blue-500/20 backdrop-blur-sm text-blue-200 px-5 py-2.5 rounded-full text-sm font-bold mb-6 border border-blue-400/30">
            SIMPLE PRICING
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Choose the plan that's right for you. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card key={plan.id} className={`border-0 shadow-2xl bg-white relative overflow-hidden ${
                plan.popular ? 'md:scale-105 ring-4 ring-blue-500/50' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-2 rounded-bl-2xl flex items-center gap-2 font-bold text-sm">
                      <Sparkles className="h-4 w-4" />
                      MOST POPULAR
                    </div>
                  </div>
                )}
                
                <CardContent className="p-10">
                  <div className="mb-8">
                    <div className={`bg-gradient-to-br ${plan.gradient} p-4 rounded-2xl inline-flex shadow-xl mb-6`}>
                      <Icon className="h-10 w-10 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{plan.name}</h3>
                    <p className="text-slate-600 font-medium mb-6">{plan.subtitle}</p>
                    <div className="flex items-baseline mb-2">
                      <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}" style={{ fontFamily: 'Sora, sans-serif' }}>₹{plan.price}</span>
                      <span className="text-2xl text-slate-600 ml-2 font-semibold">/year</span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8 bg-slate-50 rounded-2xl p-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-2 mr-3 flex-shrink-0 shadow-md">
                          <Check className="h-4 w-4 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 text-base font-medium leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    size="lg" 
                    className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white text-lg py-7 font-bold rounded-xl shadow-xl transition-all hover:scale-105`}
                    onClick={() => handleBecomeMember(plan.id)}
                    disabled={loading[plan.id]}
                  >
                    {loading[plan.id] ? 'Processing...' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Questions CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-300 mb-4 text-lg">Have questions about which plan is right for you?</p>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-10 py-6 text-lg font-bold rounded-xl transition-all"
            onClick={scrollToLeadForm}
          >
            Talk to Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;