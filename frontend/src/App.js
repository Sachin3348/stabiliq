import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AIUpskill from "./pages/dashboard/AIUpskill";
import ProfileAnalysis from "./pages/dashboard/ProfileAnalysis";
import FinancialAssistance from "./pages/dashboard/FinancialAssistance";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
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
      </AuthProvider>
    </div>
  );
}

export default App;
