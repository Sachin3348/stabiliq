import { getmembershipPaymentLink } from "./apis/service";
import { API_ENDPOINTS } from "./constant";


export const membershipData = {
  price: 999,
  gst: 179.82,
  totalPrice: 1178.82,
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
    title: 'Activate Your Membership',
    description: 'Become a STABILIQ member to unlock structured career support, AI learning resources, and exclusive member benefits.'
  },
  {
    step: 2,
    title: 'Upskill',
    description: 'Explore curated AI-powered courses designed to sharpen your skills and give you an edge in your next role.'
  },
  {
    step: 3,
    title: 'Review, Support & Skill Growth',
    description: 'Requests are reviewed for eligibility and verification. Approved members receive structured assistance along with guided AI upskilling based on their membership benefits.'
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
export const processMembership = async (memberData, token) => {
  try {

    const response = await getmembershipPaymentLink(API_ENDPOINTS.paymentApi, memberData, token)
    return { 
      success: true, 
      paymentUrl: response?.data?.checkoutPageUrl
    };
  } catch (error) {
    console.error('Error processing membership:', error);
    throw new Error(error?.response?.data?.detail || 'Failed to process membership. Please try again.');
  }
};