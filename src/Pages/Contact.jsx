import React, { useState } from "react";
import "./Contact.css";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaComments,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaCheck,
  FaChevronDown,
  FaBriefcase,
  FaHandshake,
  FaHeadset,
  FaLightbulb,
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
  FaClock,
} from "react-icons/fa";

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      q: "How quickly will I get a response?",
      a: "We typically respond to all queries within 2 to 4 business hours.",
    },
    {
      q: "Is my data secure with ProjectHub?",
      a: "Yes, we use industry-standard end-to-end encryption to protect all your data.",
    },
    {
      q: "Do you offer technical support?",
      a: "Yes, 24/7 technical support is available for all our paid tier users.",
    },
    {
      q: "Do you offer custom integrations?",
      a: "Yes, our Enterprise plan includes custom API and third-party integrations.",
    },
    {
      q: "Can I schedule a product demo?",
      a: "Absolutely! Click 'Book a Demo' to schedule a live walkthrough with our team.",
    },
    {
      q: "Where is ProjectHub based?",
      a: "Our headquarters are located in Bhopal, Madhya Pradesh, India.",
    },
  ];

  return (
    <div className="contact-page">
      {/* 1. HERO SECTION */}
      <section className="contact-hero">
        <div className="hero-left">
          <div className="tag-badge">
            <span className="dot"></span> GET IN TOUCH
          </div>
          <h1>
            We're here to help <br />
            you <span>succeed</span>
          </h1>
          <p>
            Have a question, feedback, or need support? Our team is ready to
            assist you. Let's build something amazing together.
          </p>
          <div className="hero-features">
            <span>
              <FaCheck className="icon-blue" /> Quick response time
            </span>
            <span>
              <FaCheck className="icon-blue" /> Friendly & expert support
            </span>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80"
            alt="Support Laptop"
            className="hero-img"
          />
        </div>
      </section>

      {/* 2. REACH US CARDS */}
      <section className="reach-us">
        <div className="section-title">
          <h2>Reach us through</h2>
        </div>
        <div className="reach-cards">
          {/* Email Card */}
          <div className="reach-card">
            <div className="card-icon blue">
              <FaEnvelope />
            </div>
            <h3>Email Us</h3>
            <p>
              Drop us an email anytime.
              <br />
              We'll get back to you.
            </p>
            <a href="mailto:hello@projecthub.com" className="reach-link">
              hello@projecthub.com <FaArrowRight />
            </a>
          </div>

          {/* Call Card */}
          <div className="reach-card">
            <div className="card-icon green">
              <FaPhoneAlt />
            </div>
            <h3>Call Us</h3>
            <p>
              Mon - Sat, 9:00 AM - 6:00 PM
              <br />
              (IST)
            </p>
            <a href="tel:+911234567890" className="reach-link">
              +91 12345 67890 <FaArrowRight />
            </a>
          </div>

          {/* Live Chat */}
          <div className="reach-card">
            <div className="card-icon purple">
              <FaComments />
            </div>
            <h3>Live Chat</h3>
            <p>
              Chat with our support team
              <br />
              in real-time.
            </p>
            <a href="#chat" className="reach-link">
              Start Live Chat <FaArrowRight />
            </a>
          </div>

          {/* Visit Us */}
          <div className="reach-card">
            <div className="card-icon orange">
              <FaMapMarkerAlt />
            </div>
            <h3>Visit Us</h3>
            <p>
              Bhopal, Madhya Pradesh,
              <br />
              India
            </p>
            <a href="#map" className="reach-link">
              View on Map <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* 3. FORM & SIDE PANEL */}
      <section className="contact-main">
        {/* Form Container */}
        <div className="form-container">
          <h2>Send us a message</h2>
          <p className="form-sub">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <textarea
                name="message"
                rows="5"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-footer">
              <button type="submit" className="btn-send">
                Send Message <FaPaperPlane />
              </button>
              <span className="response-time">
                <FaClock /> We typically respond within a few hours.
              </span>
            </div>
          </form>
        </div>

        {/* Side Info Box */}
        <div className="side-panel">
          <div className="side-header">
            <h3>Let's build something great together</h3>
            <p>
              Whether you're a student, developer, startup, or enterprise,
              ProjectHub is here to help your team collaborate and deliver
              better projects.
            </p>
          </div>

          <div className="side-options">
            <div className="side-item">
              <div className="item-icon blue-bg">
                <FaBriefcase />
              </div>
              <div>
                <h4>Sales Inquiries</h4>
                <p>For product demos and pricing</p>
              </div>
              <FaArrowRight className="item-arrow" />
            </div>

            <div className="side-item">
              <div className="item-icon green-bg">
                <FaHandshake />
              </div>
              <div>
                <h4>Partnerships</h4>
                <p>For collaborations and integrations</p>
              </div>
              <FaArrowRight className="item-arrow" />
            </div>

            <div className="side-item">
              <div className="item-icon purple-bg">
                <FaHeadset />
              </div>
              <div>
                <h4>Technical Support</h4>
                <p>Get help with setup or issues</p>
              </div>
              <FaArrowRight className="item-arrow" />
            </div>

            <div className="side-item">
              <div className="item-icon orange-bg">
                <FaLightbulb />
              </div>
              <div>
                <h4>Feature Requests</h4>
                <p>Share your ideas with us</p>
              </div>
              <FaArrowRight className="item-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-card ${openFaq === index ? "active" : ""}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-title">
                <h4>{faq.q}</h4>
                <FaChevronDown className="arrow" />
              </div>
              {openFaq === index && <p className="faq-body">{faq.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-left">
          <h2>Ready to transform the way your team collaborates?</h2>
          <p>
            Join thousands of teams already using ProjectHub to plan,
            collaborate, and deliver exceptional results.
          </p>
          <div className="cta-btns">
            <button className="btn-white">
              Start Free <FaArrowRight />
            </button>
            <button className="btn-outline">
              Book a Demo <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="cta-right">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80"
            alt="Dashboard UI"
          />
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="brand-col">
            <h3>
              <span className="p-box">P</span> ProjectHub
            </h3>
            <p>
              AI-powered project collaboration platform to help teams plan,
              collaborate and deliver exceptional results.
            </p>
            <div className="socials">
              <FaGithub /> <FaLinkedin /> <FaTwitter /> <FaYoutube />
            </div>
          </div>

          <div className="link-col">
            <h4>Product</h4>
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#integrations">Integrations</a>
            <a href="#changelog">Changelog</a>
            <a href="#roadmap">Roadmap</a>
          </div>

          <div className="link-col">
            <h4>Resources</h4>
            <a href="#docs">Documentation</a>
            <a href="#help">Help Center</a>
            <a href="#blog">Blog</a>
            <a href="#templates">Templates</a>
            <a href="#guides">Guides</a>
          </div>

          <div className="link-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact Us</a>
            <a href="#partners">Partners</a>
          </div>

          <div className="link-col">
            <h4>Legal</h4>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">Security</a>
            <a href="#cookies">Cookie Policy</a>
          </div>

          <div className="link-col">
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

export default Contact;
