import React from "react";
import "./Features.css";
import {
  FaMagic,
  FaSync,
  FaShieldAlt,
  FaChartLine,
  FaArrowRight,
  FaGoogle,
  FaMicrosoft,
  FaGithub,
  FaAtlassian,
  FaSlack,
  FaCheck,
  FaUserPlus,
  FaTasks,
  FaPaperPlane,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
  FaGlobe,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="features-page" id="features">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="badge">
            <FaMagic className="badge-icon" /> POWERFUL FEATURES
          </div>
          <h1>
            Everything You Need to <br />
            <span>Build Better Projects</span>
          </h1>
          <p>
            ProjectHub brings all the tools your team needs into one powerful
            platform. Collaborate, manage tasks, track progress, and ship great
            products — faster, together.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              Explore Features <FaArrowRight />
            </button>
            <button className="btn btn-outline">Book a Demo</button>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Team Collaboration"
            className="hero-img"
          />
          <div className="hero-features-bar">
            <div className="bar-item">
              <FaMagic className="bar-icon" />
              <div>
                <h4>AI Powered</h4>
                <p>Smart Automation</p>
              </div>
            </div>
            <div className="bar-item">
              <FaSync className="bar-icon" />
              <div>
                <h4>Real-time</h4>
                <p>Collaboration</p>
              </div>
            </div>
            <div className="bar-item">
              <FaShieldAlt className="bar-icon" />
              <div>
                <h4>Secure</h4>
                <p>By Design</p>
              </div>
            </div>
            <div className="bar-item">
              <FaChartLine className="bar-icon" />
              <div>
                <h4>Scalable</h4>
                <p>For Everyone</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY BRANDS */}
      <section className="brands-section">
        <p>TRUSTED BY INNOVATIVE TEAMS WORLDWIDE</p>
        <div className="brands-logos">
          <span>
            <FaGoogle /> Google
          </span>
          <span>
            <FaMicrosoft /> Microsoft
          </span>
          <span>
            <FaGithub /> GitHub
          </span>
          <span>
            <FaAtlassian /> ATLASSIAN
          </span>
          <span>
            <FaSlack /> slack
          </span>
        </div>
      </section>

      {/* 2. TOP FEATURES GRID */}
      <section className="top-features">
        <div className="section-header">
          <h2>Top Features</h2>
          <p>Powerful tools designed to supercharge your team's productivity</p>
        </div>

        <div className="features-grid">
          {/* Card 1 */}
          <div className="feature-card">
            <div className="card-info">
              <div className="icon-box">
                <FaMagic />
              </div>
              <h3>AI Project Management</h3>
              <p>
                AI intelligently organizes your projects, suggests tasks,
                predicts risks, and helps your team stay ahead of deadlines.
              </p>
              <a href="#learn-more">
                Learn more <FaArrowRight />
              </a>
            </div>
            <div className="card-image">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=400&q=80"
                alt="AI Management"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card">
            <div className="card-info">
              <div className="icon-box">
                <FaSync />
              </div>
              <h3>Task & Workflow Automation</h3>
              <p>
                Automate repetitive tasks, assign work smartly, set priorities,
                and let AI handle the routine for you.
              </p>
              <a href="#learn-more">
                Learn more <FaArrowRight />
              </a>
            </div>
            <div className="card-image">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                alt="Workflow"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card">
            <div className="card-info">
              <div className="icon-box">
                <FaTasks />
              </div>
              <h3>Kanban & Agile Workflows</h3>
              <p>
                Visualize work, manage sprint cycles, drag & drop tasks with
                Kanban boards and agile tools.
              </p>
              <a href="#learn-more">
                Learn more <FaArrowRight />
              </a>
            </div>
            <div className="card-image">
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
                alt="Kanban"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card">
            <div className="card-info">
              <div className="icon-box">
                <FaSync />
              </div>
              <h3>Real-time Team Collaboration</h3>
              <p>
                Chat in real-time, comment on tasks, mention teammates and
                collaborate without switching tools.
              </p>
              <a href="#learn-more">
                Learn more <FaArrowRight />
              </a>
            </div>
            <div className="card-image">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80"
                alt="Collaboration"
              />
            </div>
          </div>

          {/* Card 5 */}
          <div className="feature-card">
            <div className="card-info">
              <div className="icon-box">
                <FaShieldAlt />
              </div>
              <h3>Secure File Sharing & Storage</h3>
              <p>
                Share files securely, control access, manage versions, and keep
                everything in one place.
              </p>
              <a href="#learn-more">
                Learn more <FaArrowRight />
              </a>
            </div>
            <div className="card-image">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
                alt="Secure Storage"
              />
            </div>
          </div>

          {/* Card 6 */}
          <div className="feature-card">
            <div className="card-info">
              <div className="icon-box">
                <FaMagic />
              </div>
              <h3>Smart Notifications & Reminders</h3>
              <p>
                Stay updated with smart alerts, task reminders, deadline
                notifications and custom updates.
              </p>
              <a href="#learn-more">
                Learn more <FaArrowRight />
              </a>
            </div>
            <div className="card-image">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80"
                alt="Notifications"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ROW SECTIONS */}
      {/* Row 1: Everything at a Glance */}
      <section className="detail-row">
        <div className="detail-image">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80"
            alt="Dashboards"
          />
        </div>
        <div className="detail-content">
          <span className="sub-tag">POWERFUL DASHBOARDS</span>
          <h2>Everything at a Glance</h2>
          <p>
            ProjectHub dashboard gives you a complete overview of projects,
            tasks, timelines, workload, progress, and team activity.
          </p>
          <ul>
            <li>
              <FaCheck /> Real-time project analytics
            </li>
            <li>
              <FaCheck /> Team workload & performance
            </li>
            <li>
              <FaCheck /> Upcoming deadlines
            </li>
            <li>
              <FaCheck /> Recent activity feed
            </li>
          </ul>
          <button className="btn btn-primary">
            Learn more <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Row 2: Intelligent Assistant */}
      <section className="detail-row reverse">
        <div className="detail-image">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"
            alt="AI Assistant"
          />
        </div>
        <div className="detail-content">
          <span className="sub-tag">AI ASSISTANT</span>
          <h2>Your Intelligent Project Assistant</h2>
          <p>
            Get AI-powered help for summaries, documentation, code analysis,
            task suggestions, and more.
          </p>
          <ul>
            <li>
              <FaCheck /> AI task suggestions
            </li>
            <li>
              <FaCheck /> Auto summaries
            </li>
            <li>
              <FaCheck /> Documentation generator
            </li>
            <li>
              <FaCheck /> Code assistance
            </li>
          </ul>
          <button className="btn btn-primary">
            Learn more <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Row 3: Built for Developers */}
      <section className="detail-row">
        <div className="detail-image">
          <img
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80"
            alt="Developer Tools"
          />
        </div>
        <div className="detail-content">
          <span className="sub-tag">DEVELOPER FRIENDLY</span>
          <h2>Built for Developers</h2>
          <p>
            Integrate with GitHub, track commits, manage branches, review code,
            and ship better software faster.
          </p>
          <ul>
            <li>
              <FaCheck /> GitHub integration
            </li>
            <li>
              <FaCheck /> Commit & PR tracking
            </li>
            <li>
              <FaCheck /> Version management
            </li>
            <li>
              <FaCheck /> Code review workflows
            </li>
          </ul>
          <button className="btn btn-primary">
            Learn more <FaArrowRight />
          </button>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="how-it-works">
        <h2>How ProjectHub Works</h2>
        <div className="steps-container">
          <div className="step-item">
            <div className="step-num">1</div>
            <div className="step-icon">
              <FaMagic />
            </div>
            <h4>Create Project</h4>
            <p>Start a new project in seconds.</p>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-num">2</div>
            <div className="step-icon">
              <FaUserPlus />
            </div>
            <h4>Invite Team</h4>
            <p>Add your team members and collaborators.</p>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-num">3</div>
            <div className="step-icon">
              <FaTasks />
            </div>
            <h4>Manage Tasks</h4>
            <p>Break down work and assign tasks.</p>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-num">4</div>
            <div className="step-icon">
              <FaChartLine />
            </div>
            <h4>Track Progress</h4>
            <p>Monitor progress in real-time with analytics.</p>
          </div>
          <div className="step-line"></div>
          <div className="step-item">
            <div className="step-num">5</div>
            <div className="step-icon">
              <FaPaperPlane />
            </div>
            <h4>Deliver Results</h4>
            <p>Ship your project successfully.</p>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Build Better Projects?</h2>
          <p>
            Join thousands of teams who are already using ProjectHub to
            collaborate, manage and ship better.
          </p>
          <div className="cta-buttons">
            <button className="btn btn-white">Start Free</button>
            <button className="btn btn-outline-white">Book a Demo</button>
          </div>
        </div>
        <div className="cta-image">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=500&q=80"
            alt="Team Happy"
          />
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>
              <span className="brand-p">P</span> ProjectHub
            </h3>
            <p>
              AI powered project collaboration platform to help teams plan,
              collaborate and deliver exceptional results.
            </p>
            <div className="social-icons">
              <FaGithub /> <FaLinkedin /> <FaTwitter /> <FaGlobe />
            </div>
          </div>

          <div className="footer-links">
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
              <a href="#guides">Guides</a>
              <a href="#templates">Templates</a>
            </div>
            <div className="link-col">
              <h4>Company</h4>
              <a href="#about">About Us</a>
              <a href="#careers">Careers</a>
              <a href="#contact">Contact Us</a>
              <a href="#press">Press</a>
              <a href="#partners">Partners</a>
            </div>
            <div className="link-col">
              <h4>Legal</h4>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
              <a href="#security">Security</a>
              <a href="#cookie">Cookie Policy</a>
            </div>
            <div className="link-col">
              <h4>Contact</h4>
              <p>
                <FaEnvelope /> hello@projecthub.com
              </p>
              <p>
                <FaPhoneAlt /> +91 98765 43210
              </p>
              <p>
                <FaMapMarkerAlt /> Bhopal, India
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 ProjectHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Features;
