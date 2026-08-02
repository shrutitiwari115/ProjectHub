import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

// Backend API Endpoint
const API_URL = "http://localhost:5000/api/auth/forgot";

const ForgotPassword = () => {
  const navigate = useNavigate();

  // Form States
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  // Loading & Global Status States
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({ type: "", message: "" });

  // Email Validation Helper
  const validateEmail = (val) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(val).toLowerCase());
  };

  // Handle Input Changes
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
    if (apiResponse.message) setApiResponse({ type: "", message: "" });
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse({ type: "", message: "" });
    setEmailError("");

    // Field Validation
    if (!email.trim()) {
      setEmailError("Email address is required.");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(API_URL, {
        email: email.trim(),
      });

      setApiResponse({
        type: "success",
        message:
          response.data?.message || "OTP sent successfully! Redirecting...",
      });

      // Pass email along to the OTP verification page via state
      setTimeout(() => {
        navigate("/verify-otp", { state: { email: email.trim() } });
      }, 1500);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send OTP. Please try again.";
      setApiResponse({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="forgot-wrapper">
      {/* Animated Glassmorphism Background Blobs */}
      <div className="background-blob blob-1"></div>
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>

      <div className="glass-card">
        {/* Header */}
        <div className="brand-header">
          <div className="brand-logo">
            <KeyIcon />
          </div>
          <h2>
            Reset <span>Password</span>
          </h2>
          <p>Enter your email to receive a One-Time Password (OTP)</p>
        </div>

        {/* Global Response Banner */}
        {apiResponse.message && (
          <div className={`alert-banner ${apiResponse.type}`}>
            {apiResponse.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <MailIcon />
              </span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="name@company.com"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? "input-error" : ""}
                disabled={isLoading}
              />
            </div>
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="loader-container">
                <span className="spinner"></span> Sending OTP...
              </span>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>

        {/* Navigation Link */}
        <div className="footer-link">
          Remembered your password? <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

// SVG Icons
const KeyIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-1.5 1.5L16 7l-1.5 1.5M19 5l-2.5 2.5m-5 3.5a6 6 0 1 1 2-8.5" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

const MailIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94A3B8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default ForgotPassword;
