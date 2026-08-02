import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiShield,
  FiUsers,
  FiGrid,
  FiFolder,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "./AuthContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form State
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // UI States
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setFormErrors] = useState({});

  // Input Change Handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (serverError) setServerError("");
  };

  // Basic Validation
  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        },
      );

      const token = response.data.token || response.data.accessToken;
      const user =
        response.data.user || response.data.userData || response.data.data;

      if (token) {
        if (login) {
          login(token, user);
        } else {
          localStorage.setItem("token", token);
        }
        navigate("/dashboard");
      } else {
        setServerError("Invalid server response. Token not found.");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Authentication failed. Please check your credentials.";
      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="ph-login-container">
      <div className="ph-login-wrapper">
        {/* LEFT PANEL */}
        <div className="ph-left-panel">
          {/* Security Badge */}
          <div className="ph-badge">
            <FiShield className="ph-badge-icon" />
            <span>Enterprise Security</span>
            <span className="ph-badge-sub">JWT & Session Protected</span>
          </div>

          {/* Main Title & Subtitle */}
          <h1 className="ph-hero-title">
            Build, Track, and <br />
            Deploy Faster
          </h1>
          <p className="ph-hero-desc">
            Log in to access your developer workspace, manage projects,
            collaborate with your team, and ship better software, faster.
          </p>

          {/* Feature Items */}
          <div className="ph-features-list">
            <div className="ph-feature-item">
              <div className="ph-feature-icon-box">
                <FiUsers />
              </div>
              <div>
                <h4>Real-time Collaboration</h4>
                <p>Work together with your team in real-time</p>
              </div>
            </div>

            <div className="ph-feature-item">
              <div className="ph-feature-icon-box">
                <FiLock />
              </div>
              <div>
                <h4>Secure & Encrypted</h4>
                <p>Your data is protected with end-to-end encryption</p>
              </div>
            </div>

            <div className="ph-feature-item">
              <div className="ph-feature-icon-box">
                <FiGrid />
              </div>
              <div>
                <h4>All-in-One Workspace</h4>
                <p>Manage projects, tasks, files, and more from one place</p>
              </div>
            </div>
          </div>

          {/* Stats Footer Bar */}
          <div className="ph-stats-card">
            <div className="ph-stat-item">
              <FiUsers className="ph-stat-icon" />
              <div>
                <strong>50K+</strong>
                <span>Active Users</span>
              </div>
            </div>

            <div className="ph-stat-item">
              <FiFolder className="ph-stat-icon" />
              <div>
                <strong>10K+</strong>
                <span>Projects</span>
              </div>
            </div>

            <div className="ph-stat-item">
              <FiCheckCircle className="ph-stat-icon" />
              <div>
                <strong>120+</strong>
                <span>Universities</span>
              </div>
            </div>

            <div className="ph-stat-item">
              <FiClock className="ph-stat-icon" />
              <div>
                <strong>99.9%</strong>
                <span>Uptime</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL - CARD */}
        <div className="ph-right-panel">
          <div className="ph-auth-card">
            {/* Top view desk/laptop image with no faces */}
            <div className="ph-card-image-wrapper">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Workspace Collaboration"
                className="ph-card-image"
              />
            </div>

            <div className="ph-card-content">
              <div className="ph-card-header">
                <h2>Welcome back</h2>
                <p>Please enter your details to sign in to your account.</p>
              </div>

              {serverError && (
                <div className="ph-error-banner">
                  <FiAlertCircle className="err-icon" />
                  <span>{serverError}</span>
                </div>
              )}

              {/* Google Button */}
              <button
                type="button"
                className="ph-btn-google"
                onClick={handleGoogleLogin}
              >
                <FcGoogle className="google-icon" />
                <span>Continue with Google</span>
              </button>

              <div className="ph-divider">
                <span>OR CONTINUE WITH EMAIL</span>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} noValidate>
                {/* Email Field */}
                <div className="ph-form-group">
                  <label htmlFor="email">Email address</label>
                  <div
                    className={`ph-input-wrapper ${errors.email ? "has-error" : ""}`}
                  >
                    <FiMail className="ph-input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="tiwarishruti259@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                  </div>
                  {errors.email && (
                    <span className="ph-field-error">{errors.email}</span>
                  )}
                </div>

                {/* Password Field */}
                <div className="ph-form-group">
                  <div className="ph-label-row">
                    <label htmlFor="password">Password</label>
                    <Link to="/forgot-password" className="ph-forgot-link">
                      Forgot password?
                    </Link>
                  </div>
                  <div
                    className={`ph-input-wrapper ${errors.password ? "has-error" : ""}`}
                  >
                    <FiLock className="ph-input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      placeholder="••••••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="ph-toggle-pwd"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="ph-field-error">{errors.password}</span>
                  )}
                </div>

                {/* Checkbox Options */}
                <div className="ph-form-options">
                  <label className="ph-checkbox-label">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span>Remember me for 30 days</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="ph-btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    "Signing in..."
                  ) : (
                    <>
                      <span>Sign In</span>
                      <FiArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* Footer Link */}
              <div className="ph-card-footer">
                <span>Don't have an account? </span>
                <Link to="/signup" className="ph-signup-link">
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
