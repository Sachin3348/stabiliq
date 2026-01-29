import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Phone, User, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Details, 2: OTP
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'basic'
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/send-otp`, {
        email: formData.email,
        phone: formData.phone
      });
      
      if (response.data.success) {
        toast({
          title: "OTP Sent!",
          description: "Enter any 6-digit code to complete signup (bypass mode)"
        });
        setStep(2);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Failed to send OTP",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/verify-otp`, {
        email: formData.email,
        phone: formData.phone,
        otp,
        name: formData.name,
        plan: formData.plan
      });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        toast({
          title: "Welcome to STABILIQ!",
          description: "Your account has been created successfully"
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Signup failed",
        description: error.response?.data?.detail || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-6">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-3 rounded-xl shadow-lg">
              <Shield className="h-8 w-8 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>STABILIQ</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-slate-400">Join STABILIQ and secure your career journey</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10 h-12 border-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10 h-12 border-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="tel"
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                      className="pl-10 h-12 border-2"
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg py-6 font-bold rounded-xl"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : (
                    <>
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Enter OTP
                  </label>
                  <div className="text-sm text-slate-600 mb-3">
                    Enter any 6-digit code (bypass mode)
                  </div>
                  <div className="relative">
                    <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="text"
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      className="pl-10 h-12 text-lg border-2 tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-lg py-6 font-bold rounded-xl"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Verify & Sign Up'}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-slate-600 hover:text-slate-900"
                >
                  Change details
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 hover:text-white text-sm">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;