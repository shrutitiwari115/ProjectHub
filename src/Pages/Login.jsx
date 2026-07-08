import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaGoogle,
  FaGithub,
  FaCode,
  FaLinkedinIn,
  FaEnvelope,
  FaLock,
  FaTerminal,
} from "react-icons/fa";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { email, password, rememberMe } = formData;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      // LocalStorage se data query karna
      const savedUserData = localStorage.getItem(`registered_user_${email}`);

      if (!savedUserData) {
        setError(
          "This developer node is not registered. Check credentials or create an account.",
        );
        setLoading(false);
        return;
      }

      const user = JSON.parse(savedUserData);

      // Password mapping verify karna
      if (user.password !== password) {
        setError(
          "Invalid secure token key (Incorrect password). Please re-verify.",
        );
        setLoading(false);
        return;
      }

      // Valid Session Hooks Allocation
      localStorage.setItem("token", "fake-jwt-token-12345");
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.name,
          email: user.email,
          role: user.role,
        }),
      );

      setLoading(false);
      navigate("/dashboard"); // Redirects directly to sync workspace dashboard
    }, 1000);
  };

  return (
    <div className="synopsis-login-viewport">
      {/* Dynamic Ambient Blur Objects from Synopsis System */}
      <div className="login-mesh-grid"></div>
      <div className="login-glow-node glow-sky"></div>
      <div className="login-glow-node glow-pista"></div>

      <div className="github-login-card">
        {/* Top Developer branding badge layout */}
        <div className="login-brand-header">
          <div className="login-logo-cube">
            <FaTerminal className="cube-terminal-ico" />
          </div>
          <h2>Sign in to ProjectHub</h2>
          <p className="login-subtext-meta">
            Initialize secure developer session
          </p>
        </div>

        {error && (
          <div className="login-terminal-error">
            <span className="err-accent">⚡ system_error:</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-integrated-form">
          <div className="login-field-group">
            <label className="field-meta-label">Email Address</label>
            <div className="editor-input-wrapper">
              <FaEnvelope className="editor-field-ico" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="username@domain.com"
                required
              />
            </div>
          </div>

          <div className="login-field-group">
            <div className="password-label-row">
              <label className="field-meta-label">Password</label>
              <a href="#forgot" className="editor-forgot-anchor">
                Forgot token?
              </a>
            </div>
            <div className="editor-input-wrapper">
              <FaLock className="editor-field-ico" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <div className="login-retaining-row">
            <label className="retaining-checkbox-label">
              <input
                type="checkbox"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleChange}
              />
              <span className="custom-check-text">Keep me authenticated</span>
            </label>
          </div>

          <button
            type="submit"
            className="github-primary-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Verifying Token Architecture..."
              : "Authenticate Session"}
          </button>
        </form>

        <div className="login-horizontal-divider">
          <span>or deploy auth stream via</span>
        </div>

        <div className="social-oauth-flex-grid">
          <button type="button" className="oauth-btn provider-github">
            <FaGithub className="oauth-ico" /> <span>GitHub</span>
          </button>
          <button type="button" className="oauth-btn provider-google">
            <FaGoogle className="oauth-ico" /> <span>Google</span>
          </button>
          <button type="button" className="oauth-btn provider-leetcode">
            <FaCode className="oauth-ico" /> <span>LeetCode</span>
          </button>
          <button type="button" className="oauth-btn provider-linkedin">
            <FaLinkedinIn className="oauth-ico" /> <span>LinkedIn</span>
          </button>
        </div>

        <div className="login-redirection-footer">
          <p>
            New to workspace node?{" "}
            <Link to="/register">Create sub-account node</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
