import React from "react";
import { Link } from "react-router-dom";
import "./About.css";

export default function About() {
  return (
    <div className="about-wrapper">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-container grid-2-col">
          <div className="hero-content">
            <div className="badge">
              <span className="dot"></span>
              <span>ABOUT PROJECTHUB</span>
            </div>
            <h1 className="hero-title">
              About <br />
              <span className="text-blue">ProjectHub</span>
            </h1>
            <p className="hero-desc">
              ProjectHub is an AI-powered project collaboration platform built
              to help teams plan, collaborate, and deliver exceptional
              results—faster and smarter.
            </p>
            <div className="hero-features-strip">
              <div className="feature-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Smart Collaboration</span>
              </div>
              <div className="feature-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
                <span>AI Powered</span>
              </div>
              <div className="feature-item">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure & Reliable</span>
              </div>
            </div>
          </div>
          <div className="hero-image-box">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
              alt="Team Collaboration"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="about-container grid-2-col">
          <div className="mv-card">
            <div className="mv-icon-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3>Our Mission</h3>
              <p>
                To build an intelligent collaboration platform that empowers
                teams to work faster, smarter, and more efficiently using
                AI-driven tools.
              </p>
            </div>
          </div>
          <div className="mv-card">
            <div className="mv-icon-box">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 010-7.072m-2.828 9.9a9 9 0 010-12.728M12 12h.01" />
              </svg>
            </div>
            <div>
              <h3>Our Vision</h3>
              <p>
                To become the most trusted AI-powered collaboration platform for
                teams, startups, enterprises, and educational institutions
                worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="why-choose-section">
        <div className="about-container">
          <h2 className="section-title text-center">
            Why Teams Choose ProjectHub?
          </h2>
          <div className="grid-6-col">
            <div className="feature-card">
              <div className="f-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h4>AI Project Management</h4>
              <p>AI-powered insights to plan, track, and deliver better.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4>Task Assignment</h4>
              <p>Assign tasks, set priorities and track progress easily.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
                </svg>
              </div>
              <h4>Kanban Board</h4>
              <p>Visualize workflow and manage tasks with Kanban.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4>Real-Time Collaboration</h4>
              <p>Collaborate in real time with chats, comments and updates.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4>Secure File Sharing</h4>
              <p>Share files securely with end-to-end encryption.</p>
            </div>
            <div className="feature-card">
              <div className="f-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4>Analytics Dashboard</h4>
              <p>
                Get powerful insights and analytics to make better decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="core-values-section">
        <div className="about-container grid-2-col">
          <div className="values-img-box">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80"
              alt="High Five Team"
            />
          </div>
          <div>
            <h2 className="section-title">Our Core Values</h2>
            <div className="grid-2-col values-grid">
              <div className="value-item">
                <div className="v-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h5>Innovation</h5>
                  <p>We constantly innovate to solve real-world problems.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <h5>Security</h5>
                  <p>
                    Security and privacy are at the core of everything we build.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h5>Transparency</h5>
                  <p>
                    We believe in clear communication and honest transparency.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h5>Teamwork</h5>
                  <p>Great things happen when we work together.</p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h5>Performance</h5>
                  <p>
                    We optimize for speed, reliability and great user
                    experience.
                  </p>
                </div>
              </div>
              <div className="value-item">
                <div className="v-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </div>
                <div>
                  <h5>Scalability</h5>
                  <p>Our platform grows with your team and your ambitions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="stats-section">
        <div className="about-container stats-grid">
          <div className="stat-box">
            <h3>50,000+</h3>
            <p>Active Users</p>
          </div>
          <div className="stat-box">
            <h3>120+</h3>
            <p>Universities</p>
          </div>
          <div className="stat-box">
            <h3>10,000+</h3>
            <p>Projects Managed</p>
          </div>
          <div className="stat-box">
            <h3>99.9%</h3>
            <p>Uptime</p>
          </div>
          <div className="stat-box">
            <h3>4.9 ★</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="story-section">
        <div className="about-container grid-12-col">
          <div className="col-left">
            <h2 className="section-title">Our Story</h2>
            <p>
              ProjectHub was born from the frustration of scattered
              communication, poor task management, and inefficient workflows.
            </p>
            <p>
              We built ProjectHub to unify planning, collaboration, task
              tracking, file sharing, and AI assistance in one seamless
              workspace.
            </p>
            <p>
              Our goal is to help teams stay aligned, productive, and ahead of
              deadlines—every single day.
            </p>
            <button className="btn-outline">Learn More</button>
          </div>
          <div className="col-right">
            <div className="story-img-box">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80"
                alt="Story Working"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="tech-stack-section">
        <div className="about-container text-center">
          <h2 className="section-title">Technology Stack</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <span className="t-icon react">⚛</span>
              <span>React</span>
            </div>
            <div className="tech-card">
              <span className="t-icon node">node.js</span>
              <span>Node.js</span>
            </div>
            <div className="tech-card">
              <span className="t-icon express">ex</span>
              <span>Express.js</span>
            </div>
            <div className="tech-card">
              <span className="t-icon mongo">🍃</span>
              <span>MongoDB</span>
            </div>
            <div className="tech-card">
              <span className="t-icon jwt">🔑</span>
              <span>JWT</span>
            </div>
            <div className="tech-card">
              <span className="t-icon socket">⚡</span>
              <span>Socket.io</span>
            </div>
            <div className="tech-card">
              <span className="t-icon tailwind">🌊</span>
              <span>Tailwind CSS</span>
            </div>
            <div className="tech-card">
              <span className="t-icon cloud">☁</span>
              <span>Cloudinary</span>
            </div>
          </div>
          <p className="tech-sub">
            ...and many more technologies powering ProjectHub.
          </p>
        </div>
      </section>

      {/* CTA Section - Fixed Banner Design */}
      <section className="cta-section">
        <div className="about-container">
          <div className="cta-card">
            <div className="cta-text">
              <h2>Ready to Build Better Projects?</h2>
              <p>
                Join thousands of teams using ProjectHub to collaborate, manage
                and deliver better software, faster.
              </p>
              <div className="cta-btns">
                <button className="btn-white">Launch Workspace →</button>
                <button className="btn-trans">Get Started Free</button>
              </div>
            </div>
            <div className="cta-img-box">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
                alt="Developer Profile"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="about-container footer-grid">
          <div className="f-col-brand">
            <div className="f-logo">
              <div className="f-logo-icon">P</div>
              <span>ProjectHub</span>
            </div>
            <p>
              AI-powered project collaboration platform to help teams plan,
              collaborate and deliver exceptional results.
            </p>
          </div>
          <div>
            <h6>Quick Links</h6>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/features">Features</Link>
              </li>
              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h6>Resources</h6>
            <ul>
              <li>
                <a href="#doc">Documentation</a>
              </li>
              <li>
                <a href="#blog">Blog</a>
              </li>
              <li>
                <a href="#changelog">Changelog</a>
              </li>
              <li>
                <a href="#help">Help Center</a>
              </li>
              <li>
                <a href="#guides">Guides</a>
              </li>
            </ul>
          </div>
          <div>
            <h6>Legal</h6>
            <ul>
              <li>
                <a href="#privacy">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms">Terms & Conditions</a>
              </li>
              <li>
                <a href="#cookies">Cookie Policy</a>
              </li>
              <li>
                <a href="#security">Security</a>
              </li>
              <li>
                <a href="#license">License</a>
              </li>
            </ul>
          </div>
          <div>
            <h6>Contact Us</h6>
            <ul className="contact-list">
              <li>✉ hello@projecthub.com</li>
              <li>📞 +91 12345 67890</li>
              <li>📍 Bhopal, India</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom text-center">
          © 2026 ProjectHub. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
