import { Shield, Zap } from 'lucide-react';

export const PLANS = [
  {
    id: 'basic',
    name: 'Basic',
    subtitle: 'Perfect for salaried professionals',
    price: 999,
    gst: 179.82,
    totalPrice: 1178.82,
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
    gst: 449.82,
    totalPrice: 2948.82,
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
