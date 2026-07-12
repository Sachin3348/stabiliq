import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Refund from "./pages/Refund";
import Dashboard from "./pages/Dashboard";
import AIUpskill from "./pages/dashboard/AIUpskill";
import ProfileAnalysis from "./pages/dashboard/ProfileAnalysis";
import FinancialAssistance from "./pages/dashboard/FinancialAssistance";
import CareerCounsellor from "./pages/dashboard/CareerCounsellor";
import Referral from "./pages/dashboard/Referral";
import PaymentStatusPage from "./pages/payment-status";
import { Toaster } from "./components/ui/sonner";
import { Toaster as RadixToaster } from "./components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/courses"
              element={
                <ProtectedRoute>
                  <AIUpskill />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/profile-analysis"
              element={
                <ProtectedRoute>
                  <ProfileAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/financial-assistance"
              element={
                <ProtectedRoute>
                  <FinancialAssistance />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/career-counsellor"
              element={
                <ProtectedRoute>
                  <CareerCounsellor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/referral"
              element={
                <ProtectedRoute>
                  <Referral />
                </ProtectedRoute>
              }
            />
            <Route
              path="/payment-status"
              element={
                <ProtectedRoute>
                  <PaymentStatusPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <RadixToaster />
        <Analytics />
      </AuthProvider>
    </div>
  );
}

export default App;
