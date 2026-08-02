import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiMail,
  FiLock,
  FiUser,
  FiEye,
  FiEyeOff,
  FiArrowRight,
  FiAlertCircle,
  FiUsers,
  FiGrid,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "./AuthContext";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setFormErrors] = useState({});

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

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must accept the terms and conditions";
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: formData.name.trim(),
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
        navigate("/login");
      }
    } catch (err) {
      console.error("Signup Error Details:", err.response?.data || err.message);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Registration failed. Please try again.";

      setServerError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <div className="ph-signup-container">
      {/* LEFT SECTION */}
      <div className="ph-signup-left">
        {/* Hero Title (Shifted to top & sized smaller) */}
        <h1 className="ph-hero-title">
          Build Better.
          <br />
          Collaborate Smarter.
          <br />
          <span className="ph-highlight">Deliver Faster.</span>
        </h1>

        <p className="ph-hero-description">
          ProjectHub helps teams plan, manage, and collaborate in one place — so
          you can ship better software, faster.
        </p>

        {/* Feature List */}
        <div className="ph-features-list">
          <div className="ph-feature-item">
            <div className="ph-feature-icon icon-blue">
              <FiUsers />
            </div>
            <div>
              <h3>Real-time Collaboration</h3>
              <p>
                Work together with your team in real-time and get more done.
              </p>
            </div>
          </div>

          <div className="ph-feature-item">
            <div className="ph-feature-icon icon-blue">
              <FiLock />
            </div>
            <div>
              <h3>Secure & Encrypted</h3>
              <p>
                Your data is protected with end-to-end encryption and
                enterprise-grade security.
              </p>
            </div>
          </div>

          <div className="ph-feature-item">
            <div className="ph-feature-icon icon-blue">
              <FiGrid />
            </div>
            <div>
              <h3>All-in-One Workspace</h3>
              <p>Manage projects, tasks, files, and more from one place.</p>
            </div>
          </div>
        </div>

        {/* Bottom Background Image Overlay */}
        <div className="ph-hero-bg-image" />
      </div>

      {/* RIGHT SECTION - FORM CARD */}
      <div className="ph-signup-right">
        <div className="ph-card">
          <div className="ph-card-header">
            <h2>Create an account</h2>
            <p>Enter your details to get started with ProjectHub.</p>
          </div>

          {serverError && (
            <div className="ph-error-banner">
              <FiAlertCircle className="err-icon" />
              <span>{serverError}</span>
            </div>
          )}

          {/* SSO Google Button */}
          <button
            type="button"
            className="ph-btn-sso"
            onClick={handleGoogleSignup}
          >
            <FcGoogle className="sso-icon" />
            <span>Sign up with Google</span>
          </button>

          <div className="ph-divider">
            <span>OR SIGN UP WITH EMAIL</span>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="ph-form-group">
              <label htmlFor="name">Full Name</label>
              <div
                className={`ph-input-wrapper ${errors.name ? "has-error" : ""}`}
              >
                <FiUser className="ph-input-icon" />
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              {errors.name && (
                <span className="ph-field-error">{errors.name}</span>
              )}
            </div>

            {/* Email */}
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
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="ph-field-error">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="ph-form-group">
              <label htmlFor="password">Password</label>
              <div
                className={`ph-input-wrapper ${errors.password ? "has-error" : ""}`}
              >
                <FiLock className="ph-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
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

            {/* Confirm Password */}
            <div className="ph-form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div
                className={`ph-input-wrapper ${errors.confirmPassword ? "has-error" : ""}`}
              >
                <FiLock className="ph-input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="ph-toggle-pwd"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="ph-field-error">{errors.confirmPassword}</span>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="ph-form-options">
              <label className="ph-checkbox-label">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                />
                <span>
                  I agree to the <a href="#terms">Terms of Service</a> and{" "}
                  <a href="#privacy">Privacy Policy</a>
                </span>
              </label>
            </div>
            {errors.agreeTerms && (
              <span className="ph-field-error check-error">
                {errors.agreeTerms}
              </span>
            )}

            {/* Submit Button */}
            <button type="submit" className="ph-btn-primary" disabled={loading}>
              {loading ? (
                <span className="ph-btn-loader">Creating account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight />
                </>
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="ph-card-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="ph-signup-link">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
