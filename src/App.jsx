import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Navbar from "./Components/Navbar/Navbar";
import Hero from "./Components/Navbar/Hero";

// Auth Context
import { AuthProvider } from "./Pages/AuthContext";

// Pages
import ProtectedRoute from "./Pages/ProtectedRoute";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import VerifyOtp from "./Pages/VerifyOtp";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/Dashboard";
import UserProfile from "./Pages/UserProfile";
import EditProfile from "./Pages/EditProfile";
import About from "./Pages/About";
import Features from "./Pages/Features";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import Projects from "./Pages/Projects";
import Kanban from "./Pages/Kanban";
import Tasks from "./Pages/Tasks";
import Team from "./Pages/Team";
import Analytics from "./Pages/Analytics"; // 👈 Analytics component import kar liya gaya hai

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />

            {/* Projects Route */}
            <Route
              path="/projects"
              element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              }
            />

            {/* Kanban Route */}
            <Route
              path="/kanban"
              element={
                <ProtectedRoute>
                  <Kanban />
                </ProtectedRoute>
              }
            />

            {/* Tasks Route */}
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />

            {/* Team Route */}
            <Route
              path="/team"
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              }
            />

            {/* 👈 Analytics Route */}
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
