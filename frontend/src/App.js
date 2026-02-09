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
import { Toaster } from "./components/ui/sonner";
import { Toaster as RadixToaster } from "./components/ui/toaster";

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
          </Routes>
        </BrowserRouter>
        <Toaster />
        <RadixToaster />
      </AuthProvider>
    </div>
  );
}

export default App;
