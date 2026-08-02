import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./VerifyOtp.css";

const VERIFY_API_URL = "http://localhost:5000/api/auth/verify-otp";
const RESEND_API_URL = "http://localhost:5000/api/auth/resend-otp"; // Optional endpoint for resend
const TIMER_INITIAL = 600; // 10 minutes in seconds

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from ForgotPassword page, fallback to empty string
  const email = location.state?.email || "";

  // State
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(TIMER_INITIAL);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [apiResponse, setApiResponse] = useState({ type: "", message: "" });
  const [error, setError] = useState("");

  // Refs for focusing
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Single Input Change Handling
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return false; // Accept numbers only

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1); // Take latest char
    setOtp(newOtp);

    if (error) setError("");
    if (apiResponse.message) setApiResponse({ type: "", message: "" });

    // Move to next input automatically if filled
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Keyboard navigation & Backspace support
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0 && inputRefs.current[index - 1]) {
        // If current is empty, focus previous input and clear it
        inputRefs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Clipboard Paste Support
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();

    // Check if pasted value contains numbers
    if (!/^\d+$/.test(pastedData)) {
      setError("Please paste numbers only.");
      return;
    }

    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];

    digits.forEach((digit, index) => {
      newOtp[index] = digit;
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = digit;
      }
    });

    setOtp(newOtp);

    // Focus on the input after the last pasted digit or the last box
    const focusIndex = Math.min(digits.length, 5);
    if (inputRefs.current[focusIndex]) {
      inputRefs.current[focusIndex].focus();
    }
  };

  // Form Submit / Verify OTP
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiResponse({ type: "", message: "" });
    setError("");

    const otpCode = otp.join("");

    if (otpCode.length < 6) {
      setError("Please enter all 6 digits of the OTP.");
      return;
    }

    if (timeLeft <= 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(VERIFY_API_URL, {
        email,
        otp: otpCode,
      });

      setApiResponse({
        type: "success",
        message: response.data?.message || "OTP verified! Redirecting...",
      });

      // Redirect to reset password page with email and reset token state
      setTimeout(() => {
        navigate("/reset-password", {
          state: {
            email,
            resetToken: response.data?.resetToken || null,
          },
        });
      }, 1500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Invalid or expired OTP. Please try again.";
      setApiResponse({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP Action
  const handleResend = async () => {
    if (
      timeLeft > 0 &&
      !window.confirm("Are you sure you want to request a new OTP?")
    ) {
      return;
    }

    setIsResending(true);
    setError("");
    setApiResponse({ type: "", message: "" });

    try {
      const response = await axios.post(RESEND_API_URL, { email });
      setApiResponse({
        type: "success",
        message:
          response.data?.message || "A new OTP has been sent to your email.",
      });
      setOtp(new Array(6).fill(""));
      setTimeLeft(TIMER_INITIAL); // Reset 10-min countdown
      if (inputRefs.current[0]) inputRefs.current[0].focus();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to resend OTP. Please try again.";
      setApiResponse({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="verify-wrapper">
      {/* Background Glass Blobs */}
      <div className="background-blob blob-1"></div>
      <div className="background-blob blob-2"></div>
      <div className="background-blob blob-3"></div>

      <div className="glass-card">
        {/* Header */}
        <div className="brand-header">
          <div className="brand-logo">
            <ShieldCheckIcon />
          </div>
          <h2>
            Enter <span>Verification Code</span>
          </h2>
          <p>
            We've sent a 6-digit OTP code to <br />
            <span className="email-highlight">
              {email || "your registered email"}
            </span>
          </p>
        </div>

        {/* Global Alert Banner */}
        {apiResponse.message && (
          <div className={`alert-banner ${apiResponse.type}`}>
            {apiResponse.message}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="otp-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`otp-input ${error ? "input-error" : ""}`}
                disabled={isLoading}
              />
            ))}
          </div>

          {error && <span className="error-message centered">{error}</span>}

          {/* Countdown & Resend Section */}
          <div className="timer-section">
            {timeLeft > 0 ? (
              <p className="timer-text">
                Code expires in{" "}
                <span className="timer-count">{formatTime(timeLeft)}</span>
              </p>
            ) : (
              <p className="timer-expired">The OTP code has expired.</p>
            )}

            <button
              type="button"
              className="resend-btn"
              onClick={handleResend}
              disabled={isResending || isLoading}
            >
              {isResending ? "Resending..." : "Didn't receive the code? Resend"}
            </button>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading || otp.join("").length < 6}
          >
            {isLoading ? (
              <span className="loader-container">
                <span className="spinner"></span> Verifying OTP...
              </span>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Back Link */}
        <div className="footer-link">
          Need to change email? <Link to="/forgot-password">Back</Link>
        </div>
      </div>
    </div>
  );
};

// SVG Icon
const ShieldCheckIcon = () => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export default VerifyOtp;
