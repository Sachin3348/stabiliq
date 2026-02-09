import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, KeyRound, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, { email });
      if (response.data.success) {
        toast({
          title: "OTP Sent!",
          description: "Enter any 6-digit code to login"
        });
        setStep(2);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "User not found. Please sign up first.",
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
        email,
        phone: "0000000000", // Dummy for login
        otp,
        name: "User" // Will use existing name
      });

      if (response.data.success) {
        login(response.data.token, response.data.user);
        toast({
          title: "Welcome back!",
          description: "Login successful"
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Login failed",
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
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Login to access your member dashboard</p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            {step === 1 ? (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 text-lg border-2"
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
                      Send OTP
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
                    Enter any 6-digit code
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
                  {loading ? 'Verifying...' : 'Verify & Login'}
                </Button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-slate-600 hover:text-slate-900"
                >
                  Change email address
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                  Sign up
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

export default Login;