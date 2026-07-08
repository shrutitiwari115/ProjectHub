import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaAt,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub,
  FaMicrosoft,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    agreeTerms: false,
    agreePrivacy: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: "Too Weak",
    color: "#ef4444",
  });
  const [usernameStatus, setUsernameStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    name,
    username,
    email,
    mobile,
    password,
    confirmPassword,
    role,
    agreeTerms,
    agreePrivacy,
  } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Real-time Username Availability Check Simulation
  useEffect(() => {
    if (username.length > 2) {
      setUsernameStatus("checking");
      const delay = setTimeout(() => {
        if (
          username.toLowerCase() === "admin" ||
          username.toLowerCase() === "test"
        ) {
          setUsernameStatus("taken");
        } else {
          setUsernameStatus("available");
        }
      }, 500);
      return () => clearTimeout(delay);
    } else {
      setUsernameStatus("");
    }
  }, [username]);

  // Real-time Password Strength Check
  useEffect(() => {
    if (!password) {
      setPasswordStrength({ score: 0, label: "Too Weak", color: "#ef4444" });
      return;
    }
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      setPasswordStrength({ score: 25, label: "Weak", color: "#ef4444" });
    else if (score === 2)
      setPasswordStrength({ score: 50, label: "Medium", color: "#f59e0b" });
    else if (score === 3)
      setPasswordStrength({ score: 75, label: "Good", color: "#3b82f6" });
    else setPasswordStrength({ score: 100, label: "Strong", color: "#10b981" });
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (usernameStatus === "taken") {
      setError("Username already taken. Please choose another one.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreeTerms || !agreePrivacy) {
      setError("You must agree to both Terms and Privacy Policy.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const newUser = { name, username, email, mobile, role, password };
      localStorage.setItem(`registered_user_${email}`, JSON.stringify(newUser));
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div className="signup-page-wrapper">
        <div className="success-card">
          <div className="success-icon-animated">🎉</div>
          <h2>Welcome to ProjectHub</h2>
          <p>Your account has been created successfully.</p>
          <button
            className="dashboard-btn"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard <FaArrowRight style={{ marginLeft: "8px" }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-page-wrapper">
      <div className="signup-container">
        {/* LEFT SIDE: Features Preview */}
        <div className="signup-left">
          <div className="brand-header">
            <div className="logo-placeholder">⚙️</div>
            <h1>ProjectHub</h1>
          </div>
          <div className="hero-content">
            <h2>Welcome to ProjectHub</h2>
            <p>
              Create projects, collaborate with your team, track progress and
              build software smarter.
            </p>
          </div>
          <ul className="features-list">
            <li>
              <FaCheckCircle className="chk-icon" /> AI Powered Workspace
            </li>
            <li>
              <FaCheckCircle className="chk-icon" /> Real-time Collaboration
            </li>
            <li>
              <FaCheckCircle className="chk-icon" /> Secure Cloud Storage
            </li>
            <li>
              <FaCheckCircle className="chk-icon" /> Project Analytics
            </li>
            <li>
              <FaCheckCircle className="chk-icon" /> Team Management
            </li>
            <li>
              <FaCheckCircle className="chk-icon" /> GitHub Integration
            </li>
          </ul>
        </div>

        {/* RIGHT SIDE: Interactive Signup Form */}
        <div className="signup-right">
          <h2>Create Your Account</h2>
          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Full Name */}
            <div className="form-group-float">
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                required
                placeholder=" "
                id="fullName"
              />
              <label htmlFor="fullName">
                <FaUser className="form-icon" /> Full Name
              </label>
            </div>

            {/* Username */}
            <div className="form-group-float">
              <input
                type="text"
                name="username"
                value={username}
                onChange={handleChange}
                required
                placeholder=" "
                id="username"
              />
              <label htmlFor="username">
                <FaAt className="form-icon" /> Username
              </label>
              <small className="hint-text">
                {usernameStatus === "checking" && (
                  <span className="text-gray">Checking availability...</span>
                )}
                {usernameStatus === "available" && (
                  <span className="text-success">✔ Username is available</span>
                )}
                {usernameStatus === "taken" && (
                  <span className="text-danger">
                    ✖ Username unique hona chahiye.
                  </span>
                )}
                {!usernameStatus && "Username unique hona chahiye."}
              </small>
            </div>

            {/* Email */}
            <div className="form-group-float">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
                placeholder=" "
                id="email"
              />
              <label htmlFor="email">
                <FaEnvelope className="form-icon" /> Email Address
              </label>
            </div>

            {/* Mobile Number */}
            <div className="form-group-float">
              <input
                type="tel"
                name="mobile"
                value={mobile}
                onChange={handleChange}
                placeholder=" "
                id="mobile"
              />
              <label htmlFor="mobile">
                <FaPhone className="form-icon" /> Mobile Number (Optional)
              </label>
            </div>

            {/* Password */}
            <div className="form-group-float pass-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder=" "
                id="password"
              />
              <label htmlFor="password">
                <FaLock className="form-icon" /> Password
              </label>
              <button
                type="button"
                className="toggle-pass-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

              {/* Password Strength Meter */}
              {password && (
                <div className="strength-meter-container">
                  <div className="meter-bar-bg">
                    <div
                      className="meter-bar-fill"
                      style={{
                        width: `${passwordStrength.score}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    ></div>
                  </div>
                  <span
                    className="strength-label"
                    style={{ color: passwordStrength.color }}
                  >
                    {passwordStrength.label} (Min 8 chars)
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group-float">
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                required
                placeholder=" "
                id="confirmPassword"
              />
              <label htmlFor="confirmPassword">
                <FaLock className="form-icon" /> Confirm Password
              </label>
            </div>

            {/* Role Selection */}
            <div className="role-section">
              <p className="section-label">I am a:</p>
              <div className="role-grid">
                {[
                  "Student",
                  "Developer",
                  "Team Leader",
                  "Freelancer",
                  "Teacher",
                  "Organization",
                ].map((r) => (
                  <label
                    key={r}
                    className={`role-card-label ${role === r ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={r}
                      checked={role === r}
                      onChange={handleChange}
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
              <small className="hint-text">
                Role ke hisaab se dashboard personalize ho sakta hai.
              </small>
            </div>

            {/* Terms and Privacy */}
            <div className="checkbox-group">
              <label className="checkbox-custom">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={agreeTerms}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>I agree to the Terms &
                Conditions
              </label>
              <label className="checkbox-custom">
                <input
                  type="checkbox"
                  name="agreePrivacy"
                  checked={agreePrivacy}
                  onChange={handleChange}
                />
                <span className="checkmark"></span>I agree to the Privacy Policy
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="signup-submit-btn"
              disabled={loading}
            >
              {loading ? <div className="spinner"></div> : "Create Account"}
            </button>
          </form>

          <div className="form-divider">
            <span>──────── OR ────────</span>
          </div>

          {/* Social Signups */}
          <div className="social-signup-stack">
            <button className="social-stack-btn google">
              <FaGoogle /> Continue with Google
            </button>
            <button className="social-stack-btn github">
              <FaGithub /> Continue with GitHub
            </button>
            <button className="social-stack-btn microsoft">
              <FaMicrosoft /> Continue with Microsoft
            </button>
          </div>

          <p className="login-redirect-footer">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
