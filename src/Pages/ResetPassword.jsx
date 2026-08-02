import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./ResetPassword.css";

const RESET_API_URL = "http://localhost:5000/api/auth/reset-password";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve optional pre-filled email from previous pages
  const defaultEmail = location.state?.email || "";

  // Form State
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // Validation & Loading States
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState({ type: "", message: "" });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (apiResponse.message) {
      setApiResponse({ type: "", message: "" });
    }
  };

  // Password Strength Check Helper
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 1:
      case 2:
        return { score, label: "Weak", color: "#f87171" };
      case 3:
        return { score, label: "Medium", color: "#fbbf24" };
      case 4:
        return { score, label: "Strong", color: "#4ade80" };
      default:
        return { score: 0, label: "", color: "" };
    }
  };

  const strength = getPasswordStrength(formData.password);

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.otp.trim()) {
      newErrors.otp = "OTP is required.";
    } else if (formData.otp.trim().length < 6) {
      newErrors.otp = "OTP must be 6 digits.";
    }

    if (!formData.password) {
      newErrors.password = "New password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse({ type: "", message: "" });

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(RESET_API_URL, {
        email: defaultEmail,
        otp: formData.otp.trim(),
        newPassword: formData.password,
      });

      setApiResponse({
        type: "success",
        message:
          response.data?.message ||
          "Password reset successfully! Redirecting to login...",
      });

      // Redirect to login page after brief success banner
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to reset password. Please verify your OTP and try again.";
      setApiResponse({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="reset-wrapper">
      {/* Background Animated Blobs */}
      <div className="background-blob blob-1"></div>
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>

      <div className="glass-card">
        {/* Header */}
        <div className="brand-header">
          <div className="brand-logo">
            <LockIcon />
          </div>
          <h2>
            Create New <span>Password</span>
          </h2>
          <p>
            Your new password must be different from previously used passwords.
          </p>
        </div>

        {/* Response Alert Banner */}
        {apiResponse.message && (
          <div className={`alert-banner ${apiResponse.type}`}>
            {apiResponse.message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* OTP Field */}
          <div className="input-group">
            <label htmlFor="otp">Verification OTP</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <KeyIcon />
              </span>
              <input
                type="text"
                id="otp"
                name="otp"
                maxLength="6"
                placeholder="Enter 6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
                className={errors.otp ? "input-error" : ""}
                disabled={isLoading}
              />
            </div>
            {errors.otp && <span className="error-message">{errors.otp}</span>}
          </div>

          {/* New Password Field */}
          <div className="input-group">
            <label htmlFor="password">New Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <LockIcon />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="At least 8 characters"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="strength-bar-container">
                <div className="strength-bar">
                  <div
                    className="strength-fill"
                    style={{
                      width: `${(strength.score / 4) * 100}%`,
                      backgroundColor: strength.color,
                    }}
                  ></div>
                </div>
                <span
                  className="strength-label"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </span>
              </div>
            )}

            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <LockCheckIcon />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? "input-error" : ""}
                disabled={isLoading}
              />
              <button
                type="button"
                className="toggle-visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex="-1"
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? (
              <span className="loader-container">
                <span className="spinner"></span> Resetting Password...
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        {/* Footer Navigation Link */}
        <div className="footer-link">
          Remember your old password? <Link to="/login">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

// SVG Icon Components
const LockIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const LockCheckIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94A3B8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </svg>
);

const KeyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#94A3B8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-1.5 1.5L16 7l-1.5 1.5M19 5l-2.5 2.5m-5 3.5a6 6 0 1 1 2-8.5" />
    <circle cx="7.5" cy="15.5" r="5.5" />
  </svg>
);

const EyeIcon = () => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
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
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export default ResetPassword;
