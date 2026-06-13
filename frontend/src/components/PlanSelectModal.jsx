import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Check, Sparkles } from 'lucide-react';
import { PLANS } from '../constants/plans';
import { processMembership } from '../mock';
import { useToast } from '../hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { redirectToPayment } from '../utils/payment';
import CheckoutModal from './CheckoutModal';

const PlanSelectModal = ({ onPlanSelected }) => {
  const { toast } = useToast();
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleSelectPlan = (planId) => {
    const plan = PLANS.find((p) => p.id === planId);
    setCheckoutPlan(plan);
  };

  const handleConfirmPayment = async (couponCode) => {
    if (!checkoutPlan) return;
    setLoading(true);
    try {
      const result = await processMembership({
        plan: checkoutPlan.id,
        timestamp: new Date().toISOString(),
        ...(couponCode ? { couponCode } : {})
      }, token);
      if (result.success) {
        await redirectToPayment(result);
      } else {
        throw new Error('Payment initiation failed, please try again.');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    {checkoutPlan && (
      <CheckoutModal
        plan={checkoutPlan}
        onConfirm={handleConfirmPayment}
        onClose={() => !loading && setCheckoutPlan(null)}
        loading={loading}
      />
    )}
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-5xl my-8">
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-500/20 backdrop-blur-sm text-blue-200 px-5 py-2.5 rounded-full text-sm font-bold mb-4 border border-blue-400/30">
            CHOOSE A PLAN
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            Select a plan to access your dashboard
          </h2>
          <p className="text-lg text-slate-300">
            Your membership unlocks AI upskilling, profile analysis, and financial assistance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.id}
                className={`border-0 shadow-2xl bg-white relative overflow-hidden ${
                  plan.popular ? 'md:scale-105 ring-4 ring-blue-500/50' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-5 py-2 rounded-bl-2xl flex items-center gap-2 font-bold text-xs">
                      <Sparkles className="h-3.5 w-3.5" />
                      MOST POPULAR
                    </div>
                  </div>
                )}
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className={`bg-gradient-to-br ${plan.gradient} p-3 rounded-2xl inline-flex shadow-lg mb-4`}>
                      <Icon className="h-9 w-9 text-white" strokeWidth={2.5} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {plan.name}
                    </h3>
                    <p className="text-slate-600 text-sm font-medium mb-4">{plan.subtitle}</p>
                    <div className="flex items-baseline mb-1">
                      <span
                        className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${plan.gradient}`}
                        style={{ fontFamily: 'Sora, sans-serif' }}
                      >
                        ₹{plan.price}
                      </span>
                      <span className="text-xl text-slate-600 ml-2 font-semibold">/year</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span>+ ₹{plan.gst.toFixed(2)} GST (18%)</span>
                      <span className="text-slate-300">|</span>
                      <span className="font-semibold text-slate-600">Total ₹{plan.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 bg-slate-50 rounded-xl p-4">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg p-1.5 mr-2.5 flex-shrink-0 shadow-md">
                          <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                        </div>
                        <span className="text-slate-700 text-sm font-medium leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white text-base py-6 font-bold rounded-xl shadow-xl transition-all hover:scale-[1.02]`}
                    onClick={() => handleSelectPlan(plan.id)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );
};

export default PlanSelectModal;
