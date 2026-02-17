import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, LayoutDashboard, GraduationCap, FileText, Banknote, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import PlanSelectModal from './PlanSelectModal';

const hasActivePlan = (user) => {
  return user?.plan === 'basic' || user?.plan === 'pro';
};

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const showPlanModal = user && !hasActivePlan(user);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'AI Upskill & Transition', href: '/dashboard/courses', icon: GraduationCap },
    { name: 'Profile Analysis', href: '/dashboard/profile-analysis', icon: FileText },
    { name: 'Financial Assistance', href: '/dashboard/financial-assistance', icon: Banknote },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {showPlanModal && (
        <PlanSelectModal onPlanSelected={(plan) => updateUser({ plan })} />
      )}
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full mx-auto px-7 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-blue-500 to-teal-500 p-2.5 rounded-xl shadow-lg">
              <Shield className="h-6 w-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold text-slate-900" style={{ fontFamily: 'Sora, sans-serif' }}>STABILIQ</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-900">{user?.name}</div>
              <div className="text-xs text-slate-600">
                {hasActivePlan(user) ? (user?.plan === 'pro' ? 'Pro Member' : 'Basic Member') : 'Choose a plan'}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-slate-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={2} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;