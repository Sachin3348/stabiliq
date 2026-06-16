import { Shield, Zap } from 'lucide-react';

export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Perfect for salaried professionals',
    price: 1999,
    gst: 359.82,
    totalPrice: 2358.82,
    features: [
      'Access to member support resources',
      'Job transition KIT',
      'Access to financial support program during job transition (subject to verification)'
    ],
    icon: Shield,
    gradient: 'from-slate-600 to-slate-700',
    popular: false
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'For serious professionals',
    price: 4999,
    gst: 899.82,
    totalPrice: 5898.82,
    features: [
      'AI upskilling course',
      'Job transition KIT',
      'Access to member support resources',
      'Access to financial support program during job transition (subject to verification)'
    ],
    icon: Zap,
    gradient: 'from-blue-600 to-teal-600',
    popular: true
  }
];

export const PLAN_ACCESS_MAPPING = {
  'basic': ['support_resources', 'job_transition_kit', 'involuntary_job_loss_support'],
  'pro': ['job_transition_kit', 'support_resources', 'involuntary_job_loss_support']
}