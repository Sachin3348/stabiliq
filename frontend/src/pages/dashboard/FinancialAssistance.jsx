import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Banknote, Lock, Unlock, Clock, FileText, Mail, 
  CheckCircle, AlertTriangle, ArrowRight, Calendar,
  Shield, HelpCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import DashboardLayout from '../../components/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FinancialAssistance = () => {
  const { token } = useAuth();
  const [status, setStatus] = useState(null);
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDocuments, setShowDocuments] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const [statusRes, docsRes] = await Promise.all([
        axios.get(`${API}/financial-assistance/status`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/financial-assistance/documents-required`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setStatus(statusRes.data);
      setDocuments(docsRes.data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
      toast.error('Failed to load financial assistance status');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  const handleRequestAssistance = async () => {
    setRequesting(true);
    try {
      const response = await axios.post(`${API}/financial-assistance/request`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(response.data.message);
      setShowDocuments(true);
    } catch (error) {
      console.error('Request failed:', error);
      toast.error(error.response?.data?.detail || 'Request failed. Please try again.');
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96" data-testid="loading-spinner">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  const daysRemaining = status?.daysRemaining || 0;
  const isUnlocked = status?.isUnlocked || false;
  const progressPercent = Math.min(100, ((45 - daysRemaining) / 45) * 100);

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        data-testid="financial-assistance-page"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-xl shadow-lg ${
              isUnlocked 
                ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
                : 'bg-gradient-to-br from-blue-500 to-blue-600'
            }`}>
              {isUnlocked ? <Unlock className="h-6 w-6 text-white" /> : <Lock className="h-6 w-6 text-white" />}
            </div>
            <h1 className="text-3xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>
              Financial Assistance
            </h1>
          </div>
          <p className="text-slate-600 text-lg ml-14">
            {isUnlocked 
              ? 'You are eligible to request financial assistance' 
              : 'Financial support available after 45 days of membership'
            }
          </p>
        </div>

        {!isUnlocked ? (
          /* Locked State */
          <div className="space-y-6" data-testid="locked-state">
            {/* Countdown Card */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
                      <Clock className="h-5 w-5" />
                      <span className="text-blue-100">Time Until Unlock</span>
                    </div>
                    <div className="text-6xl font-bold mb-2" style={{ fontFamily: 'Sora, sans-serif' }} data-testid="days-remaining">
                      {daysRemaining}
                    </div>
                    <div className="text-xl text-blue-100">days remaining</div>
                  </div>
                  
                  <div className="w-full md:w-64">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-4 bg-blue-900/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full bg-gradient-to-r from-teal-400 to-cyan-400 rounded-full"
                        data-testid="progress-bar"
                      />
                    </div>
                    <div className="flex justify-between text-xs mt-2 text-blue-200">
                      <span>Day 1</span>
                      <span>Day 45</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6 bg-slate-50">
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-xl flex-shrink-0">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Why the 45-Day Wait Period?
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      The 45-day period allows us to verify your membership and ensures you have access to all our 
                      AI upskilling resources first. This helps you build skills while waiting for financial assistance eligibility.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What to Do Meanwhile */}
            <Card className="border-0 shadow-lg" data-testid="meanwhile-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                  Make the Most of Your Wait Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Complete AI Courses',
                      description: 'Finish all 6 modules to boost your job prospects',
                      icon: '📚'
                    },
                    {
                      title: 'Optimize Your Profile',
                      description: 'Use our profile analysis tool to improve your resume',
                      icon: '📝'
                    },
                    {
                      title: 'Gather Documents',
                      description: 'Start collecting required documents for faster processing',
                      icon: '📂'
                    }
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-slate-50 rounded-xl">
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <h4 className="font-semibold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Documents Preview */}
            <Card className="border-0 shadow-lg opacity-75" data-testid="documents-preview-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-400" />
                  <span className="text-slate-500">Documents You'll Need (Preview)</span>
                </CardTitle>
                <Lock className="h-5 w-5 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {documents?.documents?.slice(0, 4).map((doc, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg">
                      <div className="w-8 h-8 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                        <FileText className="h-4 w-4" />
                      </div>
                      <span className="text-slate-500 text-sm">{doc.title}</span>
                    </div>
                  ))}
                </div>
                <p className="text-center text-sm text-slate-400 mt-4">
                  Full list available after {daysRemaining} days
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Unlocked State */
          <div className="space-y-6" data-testid="unlocked-state">
            {/* Success Banner */}
            <Card className="border-0 shadow-lg overflow-hidden bg-gradient-to-r from-green-500 to-emerald-600">
              <CardContent className="p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="bg-white/20 p-4 rounded-2xl">
                    <CheckCircle className="h-10 w-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Financial Assistance Unlocked!
                    </h2>
                    <p className="text-green-100">
                      You've completed the 45-day waiting period and are now eligible to apply.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!showDocuments ? (
              /* Request Button */
              <Card className="border-0 shadow-lg" data-testid="request-card">
                <CardContent className="p-8 text-center">
                  <div className="max-w-lg mx-auto">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                      <Banknote className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
                      Ready to Request Financial Assistance?
                    </h3>
                    <p className="text-slate-600 mb-6">
                      Click below to see the required documents and instructions for submitting your application.
                    </p>
                    <Button
                      onClick={handleRequestAssistance}
                      disabled={requesting}
                      className="h-14 px-8 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                      data-testid="request-assistance-btn"
                    >
                      {requesting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          Request Financial Assistance
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Documents Required */
              <div className="space-y-6" data-testid="documents-section">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      Required Documents
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {documents?.documents?.map((doc, index) => (
                        <div 
                          key={doc.id} 
                          className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl"
                          data-testid={`document-${index}`}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-900">{doc.title}</h4>
                              {doc.required && (
                                <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Required</span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600">{doc.description}</p>
                          </div>
                          <CheckCircle className="h-5 w-5 text-slate-300 flex-shrink-0" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Submission Instructions */}
                <Card className="border-0 shadow-lg border-l-4 border-l-blue-500" data-testid="submission-instructions">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-xl flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
                          How to Submit
                        </h3>
                        <ol className="space-y-2 text-slate-700">
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">1.</span>
                            Compile all the documents listed above into a single PDF file.
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">2.</span>
                            Send the PDF to: <strong className="text-blue-600">{documents?.submitEmail}</strong>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">3.</span>
                            Use subject line: "Financial Assistance Request - [Your Full Name]"
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="font-semibold text-blue-600">4.</span>
                            Our team will review and respond within 5-7 business days.
                          </li>
                        </ol>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Support Info */}
                <Card className="border-0 shadow-lg bg-slate-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <HelpCircle className="h-6 w-6 text-slate-400" />
                      <div>
                        <p className="text-slate-600">
                          Need help? Contact our support team at <strong>{documents?.submitEmail}</strong> with any questions about the application process.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default FinancialAssistance;
