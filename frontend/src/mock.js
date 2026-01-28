// Mock data for STABILIQ website

export const membershipData = {
  price: 999,
  currency: 'INR',
  duration: 'year',
  maxAssistance: 30000,
  benefits: [
    'Eligibility for financial assistance (discretionary)',
    'Job transition toolkit',
    'AI course + certificate',
    'Priority support access'
  ]
};

export const faqData = [
  {
    id: 1,
    question: 'Is financial assistance guaranteed?',
    answer: 'No. Support is discretionary and subject to eligibility and verification.'
  },
  {
    id: 2,
    question: 'Is STABILIQ an insurance product?',
    answer: 'No. STABILIQ is a membership-based assistance program.'
  },
  {
    id: 3,
    question: 'How much assistance can I receive?',
    answer: 'Up to predefined limits, depending on review outcome.'
  },
  {
    id: 4,
    question: 'Can I cancel or get a refund?',
    answer: 'No. Memberships are non-cancellable and non-refundable.'
  },
  {
    id: 5,
    question: 'How long does review take?',
    answer: 'Typically 5–7 working days after complete submission.'
  }
];

export const howItWorksSteps = [
  {
    step: 1,
    title: 'Join as a Member',
    description: 'Pay ₹999 for annual membership and get instant access to all benefits.'
  },
  {
    step: 2,
    title: 'Submit Support Request',
    description: 'If you face involuntary job loss due to employer-initiated reasons, submit a support request with documentation.'
  },
  {
    step: 3,
    title: 'Review & Approval',
    description: 'Requests are reviewed based on eligibility, documentation, and verification. Approved members receive structured support within defined limits.'
  }
];

export const benefitsData = [
  {
    id: 1,
    title: 'Financial Assistance',
    description: 'Eligible members may receive financial assistance of up to ₹30,000, typically structured over up to two months, subject to verification and discretionary approval.',
    icon: 'Banknote'
  },
  {
    id: 2,
    title: 'Job Transition Toolkit',
    description: 'Comprehensive resources including job search framework, resume review guidance, and interview preparation materials.',
    icon: 'Briefcase'
  },
  {
    id: 3,
    title: 'AI Course with Certificate',
    description: 'Beginner-friendly course covering AI-assisted resume improvement, AI-based job search, interview preparation, and productivity during career transitions.',
    icon: 'GraduationCap'
  }
];

// Mock function to simulate lead form submission
export const submitLeadForm = async (formData) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Lead form submitted:', formData);
  return { success: true, message: 'Thank you! We will reach out to you soon.' };
};

// Mock function to simulate membership purchase
export const processMembership = async (memberData) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  console.log('Membership processed:', memberData);
  return { 
    success: true, 
    orderId: `ORD${Date.now()}`,
    message: 'Membership activated successfully!' 
  };
};