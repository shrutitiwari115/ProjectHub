import React, { useState } from "react";
import "./Pricing.css";
import {
  FaCheck,
  FaTimes,
  FaChevronDown,
  FaGithub,
  FaAtlassian,
  FaSlack,
  FaMicrosoft,
  FaGoogle,
  FaGraduationCap,
  FaUsers,
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { SiMongodb, SiNotion } from "react-icons/si";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Can I upgrade or downgrade my plan anytime?",
      a: "Yes, you can upgrade, downgrade, or cancel your subscription at any time from your account settings.",
    },
    {
      q: "Is my data secure with ProjectHub?",
      a: "Absolutely. We use enterprise-grade encryption for all data at rest and in transit.",
    },
    {
      q: "Is there a free trial for paid plans?",
      a: "Yes, all paid plans come with a 14-day free trial. No credit card required to start.",
    },
    {
      q: "Do you offer refunds?",
      a: "We offer a 30-day money-back guarantee if you are not satisfied with our service.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept all major credit/debit cards, UPI, PayPal, and net banking.",
    },
    {
      q: "Can I cancel my subscription anytime?",
      a: "Yes, you can cancel your subscription with a single click in your billing settings.",
    },
  ];

  return (
    <div className="pricing-page">
      {/* 1. HERO SECTION */}
      <section className="pricing-hero">
        <div className="hero-text">
          <h1>
            Simple, Transparent <br />
            Pricing for <span>Every Team</span>
          </h1>
          <p>
            Choose the perfect plan for your team and start building, <br />
            collaborating, and delivering better projects.
          </p>
          <div className="hero-badges">
            <span>
              <FaCheck className="check-blue" /> No hidden fees
            </span>
            <span>
              <FaCheck className="check-blue" /> Cancel anytime
            </span>
          </div>
        </div>
        <div className="hero-illustration">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
            alt="Dashboard Preview"
            className="laptop-img"
          />
        </div>
      </section>

      {/* TOGGLE SWITCH */}
      <div className="pricing-toggle-container">
        <span className={!isYearly ? "active" : ""}>Billed Monthly</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <span className="slider round"></span>
        </label>
        <span className={isYearly ? "active" : ""}>Billed Yearly</span>
        <span className="discount-tag">Save up to 20%</span>
      </div>

      {/* 2. PRICING CARDS */}
      <section className="pricing-cards">
        {/* Free Plan */}
        <div className="card">
          <div className="card-header">
            <div className="plan-icon">
              <FaUser />
            </div>
            <h3>Free</h3>
            <p className="plan-sub">For individuals getting started</p>
            <div className="price">
              <h2>₹0</h2>
              <span>/month</span>
            </div>
          </div>
          <button className="btn-plan btn-outline">Get Started</button>
          <ul className="features-list">
            <li>
              <FaCheck /> 2 Projects
            </li>
            <li>
              <FaCheck /> Up to 3 Team Members
            </li>
            <li>
              <FaCheck /> 1 GB Storage
            </li>
            <li>
              <FaCheck /> Basic Task Management
            </li>
            <li>
              <FaCheck /> Community Support
            </li>
          </ul>
        </div>

        {/* Student Plan */}
        <div className="card">
          <div className="card-header">
            <div className="plan-icon">
              <FaGraduationCap />
            </div>
            <h3>Student</h3>
            <p className="plan-sub">For students and learners</p>
            <div className="price">
              <h2>₹{isYearly ? "119" : "149"}</h2>
              <span>/month</span>
              <span className="old-price">₹199</span>
            </div>
          </div>
          <button className="btn-plan btn-outline">Get Started</button>
          <ul className="features-list">
            <li>
              <FaCheck /> 10 Projects
            </li>
            <li>
              <FaCheck /> Up to 10 Team Members
            </li>
            <li>
              <FaCheck /> 10 GB Storage
            </li>
            <li>
              <FaCheck /> Advanced Task Management
            </li>
            <li>
              <FaCheck /> File Sharing
            </li>
            <li>
              <FaCheck /> Email Support
            </li>
          </ul>
        </div>

        {/* Team Plan (MOST POPULAR) */}
        <div className="card popular">
          <div className="popular-badge">MOST POPULAR</div>
          <div className="card-header">
            <div className="plan-icon blue-icon">
              <FaUsers />
            </div>
            <h3>Team</h3>
            <p className="plan-sub">For small & growing teams</p>
            <div className="price">
              <h2>₹{isYearly ? "399" : "499"}</h2>
              <span>/month</span>
              <span className="old-price">₹699</span>
            </div>
          </div>
          <button className="btn-plan btn-filled">Get Started</button>
          <ul className="features-list">
            <li>
              <FaCheck /> Unlimited Projects
            </li>
            <li>
              <FaCheck /> Up to 25 Team Members
            </li>
            <li>
              <FaCheck /> 50 GB Storage
            </li>
            <li>
              <FaCheck /> Kanban & Agile Workflows
            </li>
            <li>
              <FaCheck /> Real-time Collaboration
            </li>
            <li>
              <FaCheck /> Priority Support
            </li>
            <li>
              <FaCheck /> Integrations
            </li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div className="card">
          <div className="card-header">
            <div className="plan-icon">
              <FaBuilding />
            </div>
            <h3>Enterprise</h3>
            <p className="plan-sub">For large organizations</p>
            <div className="price">
              <h2>Custom</h2>
            </div>
          </div>
          <button className="btn-plan btn-outline">Contact Sales</button>
          <ul className="features-list">
            <li>
              <FaCheck /> Unlimited Everything
            </li>
            <li>
              <FaCheck /> Unlimited Team Members
            </li>
            <li>
              <FaCheck /> Custom Storage
            </li>
            <li>
              <FaCheck /> Advanced Security
            </li>
            <li>
              <FaCheck /> SLA & Dedicated Support
            </li>
            <li>
              <FaCheck /> Custom Integrations
            </li>
            <li>
              <FaCheck /> Onboarding & Training
            </li>
          </ul>
        </div>
      </section>

      {/* 3. COMPARISON TABLE */}
      <section className="comparison-section">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Compare Plans</th>
              <th>Free</th>
              <th>Student</th>
              <th>Team</th>
              <th>Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Projects</td>
              <td>2</td>
              <td>10</td>
              <td>Unlimited</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Team Members</td>
              <td>Up to 3</td>
              <td>Up to 10</td>
              <td>Up to 25</td>
              <td>Unlimited</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>1 GB</td>
              <td>10 GB</td>
              <td>50 GB</td>
              <td>Custom</td>
            </tr>
            <tr>
              <td>Real-time Collaboration</td>
              <td>—</td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
            </tr>
            <tr>
              <td>Kanban Board</td>
              <td>—</td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
            </tr>
            <tr>
              <td>AI Assistant</td>
              <td>Limited</td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
            </tr>
            <tr>
              <td>Analytics Dashboard</td>
              <td>—</td>
              <td>Limited</td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
            </tr>
            <tr>
              <td>Priority Support</td>
              <td>—</td>
              <td>—</td>
              <td>
                <FaCheck className="check-blue" />
              </td>
              <td>
                <FaCheck className="check-blue" />
              </td>
            </tr>
            <tr>
              <td>Custom Integrations</td>
              <td>—</td>
              <td>—</td>
              <td>—</td>
              <td>
                <FaCheck className="check-blue" />
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* TRUSTED BRANDS */}
      <section className="trusted-brands">
        <p>Trusted by teams from</p>
        <div className="brand-logos">
          <span>
            <FaGithub /> GitHub
          </span>
          <span>
            <FaAtlassian /> ATLASSIAN
          </span>
          <span>
            <FaSlack /> slack
          </span>
          <span>
            <FaMicrosoft /> Microsoft
          </span>
          <span>
            <SiMongodb /> MongoDB.
          </span>
          <span>
            <FaGoogle /> Google
          </span>
          <span>
            <SiNotion /> Notion
          </span>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openFaq === index ? "open" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <span>{faq.q}</span>
                <FaChevronDown className="arrow-icon" />
              </div>
              {openFaq === index && <p className="faq-answer">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-text">
          <h2>Ready to build better projects?</h2>
          <p>
            Join thousands of teams already using ProjectHub <br />
            to collaborate, manage and ship better.
          </p>
          <div className="cta-buttons">
            <button className="btn-white">Start Free</button>
            <button className="btn-transparent">Book a Demo</button>
          </div>
        </div>
        <div className="cta-img-container">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
            alt="Dashboard UI"
          />
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="pricing-footer">
        <div className="footer-top">
          <div className="footer-col brand-col">
            <h3>
              <span className="logo-box">P</span> ProjectHub
            </h3>
            <p>
              AI-powered project collaboration platform to help teams plan,
              collaborate and deliver exceptional results.
            </p>
            <div className="social-links">
              <FaGithub /> <FaLinkedin /> <FaTwitter /> <FaYoutube />
            </div>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#integrations">Integrations</a>
            <a href="#changelog">Changelog</a>
            <a href="#roadmap">Roadmap</a>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <a href="#docs">Documentation</a>
            <a href="#blog">Blog</a>
            <a href="#help">Help Center</a>
            <a href="#templates">Templates</a>
            <a href="#guides">Guides</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#partners">Partners</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
            <a href="#cookies">Cookie Policy</a>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <p>
              <FaEnvelope /> hello@projecthub.com
            </p>
            <p>
              <FaPhoneAlt /> +91 12345 67890
            </p>
            <p>
              <FaMapMarkerAlt /> Bhopal, India
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ProjectHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Pricing;
