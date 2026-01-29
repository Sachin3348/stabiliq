import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, FileText, Banknote, Calendar, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API}/dashboard/stats`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(response.data);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'AI Upskilling Course',
      description: 'Continue your learning journey with AI-powered courses',
      icon: GraduationCap,
      color: 'from-indigo-500 to-purple-600',
      href: '/dashboard/courses'
    },
    {
      title: 'Profile Analysis',
      description: 'Get AI-powered insights on your resume and LinkedIn',
      icon: FileText,
      color: 'from-teal-500 to-cyan-600',
      href: '/dashboard/profile-analysis'
    },
    {
      title: 'Financial Assistance',
      description: stats?.daysUntilFinancialAssistance > 0 
        ? `Unlocks in ${stats?.daysUntilFinancialAssistance} days`
        : 'Request financial assistance now',
      icon: Banknote,
      color: 'from-blue-500 to-blue-600',
      href: '/dashboard/financial-assistance'
    }
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-slate-600 text-lg">Here's your STABILIQ membership overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-3 shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                  {stats?.planType === 'pro' ? 'Pro' : 'Basic'}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                {stats?.daysSinceEnrollment || 0} days
              </div>
              <div className="text-sm text-slate-600">Member Since</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl p-3 shadow-lg">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                {stats?.coursesCompleted || 0}/6
              </div>
              <div className="text-sm text-slate-600">Courses Completed</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-amber-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl p-3 shadow-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                {stats?.daysUntilFinancialAssistance || 0}
              </div>
              <div className="text-sm text-slate-600">
                {stats?.daysUntilFinancialAssistance > 0 ? 'Days Until Financial Support' : 'Financial Support Available'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group" onClick={() => navigate(action.href)}>
                    <CardContent className="p-6">
                      <div className={`bg-gradient-to-br ${action.color} rounded-xl h-14 w-14 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-7 w-7 text-white" strokeWidth={2} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>{action.title}</h3>
                      <p className="text-slate-600 mb-4">{action.description}</p>
                      <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Important Notice */}
        {stats?.daysUntilFinancialAssistance > 0 && (
          <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-amber-500 rounded-xl p-3 flex-shrink-0">
                  <span className="text-white font-bold text-xl">!</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Financial Assistance Eligibility</h3>
                  <p className="text-slate-700 leading-relaxed">
                    Financial assistance will be available after <strong>45 days</strong> of active membership. 
                    You have <strong>{stats?.daysUntilFinancialAssistance} days</strong> remaining. During this time, 
                    explore our AI courses and career transition toolkit to prepare for your next opportunity.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </DashboardLayout>
  );
};

export default Dashboard;