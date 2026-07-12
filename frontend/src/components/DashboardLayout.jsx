import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, GraduationCap, FileText, Banknote, LogOut, UserCheck, Menu, X, Gift } from 'lucide-react';
import stabiliqLogo from '../assets/svgs/logo.svg';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, plans: ['basic', 'pro'] },
    { name: 'AI Upskill & Transition', href: '/dashboard/courses', icon: GraduationCap, plans: ['pro'] },
    { name: 'Job Transition Toolkit', href: '/dashboard/profile-analysis', icon: FileText, plans: ['basic', 'pro'] },
    { name: 'Financial Assistance', href: '/dashboard/financial-assistance', icon: Banknote, plans: ['basic', 'pro'] },
    { name: 'Career Counsellor', href: '/dashboard/career-counsellor', icon: UserCheck, plans: ['basic', 'pro'] },
    { name: 'Refer & Earn', href: '/dashboard/referral', icon: Gift, plans: ['basic', 'pro'] },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {showPlanModal && (
        <PlanSelectModal onPlanSelected={(plan) => updateUser({ plan })} />
      )}
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full mx-auto px-4 md:px-7 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-1 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="flex items-center">
              <img
                src={stabiliqLogo}
                alt="STABILIQ"
                className="h-9 w-auto"
              />
            </Link>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden sm:block">
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
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300
          md:sticky md:top-[73px] md:translate-x-0 md:min-h-[calc(100vh-73px)] md:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex items-center justify-between p-4 border-b border-slate-100 md:hidden">
            <img src={stabiliqLogo} alt="STABILIQ" className="h-8 w-auto" />
            <button
              className="p-1 rounded-lg text-slate-600 hover:bg-slate-100"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navigation
              .filter((item) => item.plans.includes(user?.plan))
              .map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  replace
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-slate-500'}`} strokeWidth={2} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8 min-w-0">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;