import React, { useState } from "react";
import {
  ArrowRight,
  Play,
  Users,
  FolderCheck,
  GraduationCap,
  ShieldCheck,
  Kanban,
  FileText,
  Sparkles,
  BarChart3,
  X,
} from "lucide-react";
import "./Hero.css";

const Hero = ({ isLoggedIn = false, onNavigate }) => {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  // Direct Unsplash image matching reference photo
  const heroImageUrl =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1400&q=80";

  const handleLaunchWorkspace = () => {
    if (onNavigate) {
      onNavigate(isLoggedIn ? "/dashboard" : "/signup");
    } else {
      window.location.href = isLoggedIn ? "/dashboard" : "/signup";
    }
  };

  const featureCards = [
    {
      icon: <FolderCheck size={22} className="card-icon-blue" />,
      title: "Project Management",
      desc: "Plan, organize and track every project in one place.",
    },
    {
      icon: <Kanban size={22} className="card-icon-blue" />,
      title: "Kanban Board",
      desc: "Visualize workflow and manage tasks efficiently.",
    },
    {
      icon: <Users size={22} className="card-icon-blue" />,
      title: "Team Collaboration",
      desc: "Work together in real-time with your entire team.",
    },
    {
      icon: <FileText size={22} className="card-icon-blue" />,
      title: "File Sharing",
      desc: "Share files securely and access anywhere.",
    },
    {
      icon: <Sparkles size={22} className="card-icon-blue" />,
      title: "AI Insights",
      desc: "Get AI-powered insights and smart suggestions.",
    },
    {
      icon: <BarChart3 size={22} className="card-icon-blue" />,
      title: "Reports & Analytics",
      desc: "Track progress with powerful analytics.",
    },
  ];

  return (
    <div className="hero-page-container">
      {/* Main Hero Section */}
      <main className="hero-main-wrapper">
        <div className="hero-grid">
          {/* Left Column */}
          <div className="hero-left-content">
            <div className="top-small-badge">
              <span className="badge-sparkle">⚡</span>
              <span>The future of project collaboration</span>
            </div>

            <h1 className="main-title">
              Build projects. <br />
              <span className="blue-title-text">Collaborate smarter.</span>{" "}
              <br />
              Deliver faster.
            </h1>

            <p className="main-description">
              ProjectHub helps teams plan, manage and collaborate in one place
              with real-time updates, smart automation and actionable insights.
            </p>

            <div className="cta-buttons-container">
              <button
                className="btn-primary-blue"
                onClick={handleLaunchWorkspace}
              >
                Launch Workspace <ArrowRight size={16} />
              </button>
              <button
                className="btn-watch-demo"
                onClick={() => setIsDemoOpen(true)}
              >
                <Play
                  size={14}
                  fill="#2563EB"
                  color="#2563EB"
                  className="play-icon"
                />{" "}
                Watch Live Demo
              </button>
            </div>

            <div className="stats-row">
              <div className="stat-box">
                <div className="stat-icon-bg">
                  <Users size={18} />
                </div>
                <div>
                  <div className="stat-number">50K+</div>
                  <div className="stat-text">Active Users</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-bg">
                  <FolderCheck size={18} />
                </div>
                <div>
                  <div className="stat-number">10K+</div>
                  <div className="stat-text">Projects</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-bg">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <div className="stat-number">120+</div>
                  <div className="stat-text">Universities</div>
                </div>
              </div>

              <div className="stat-box">
                <div className="stat-icon-bg">
                  <ShieldCheck size={18} />
                </div>
                <div>
                  <div className="stat-number">99.9%</div>
                  <div className="stat-text">Uptime</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Image */}
          <div className="hero-right-image">
            <img
              src={heroImageUrl}
              alt="Team collaborating around desk"
              className="hero-main-img"
            />
          </div>
        </div>

        {/* Trusted Logos Section */}
        <section className="trusted-brands-section">
          <p className="trusted-head-text">
            Trusted by amazing teams worldwide
          </p>
          <div className="brand-logos-row">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="brand-img"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
              alt="Microsoft"
              className="brand-img"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub"
              className="brand-img"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg"
              alt="Atlassian"
              className="brand-img"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg"
              alt="OpenAI"
              className="brand-img"
            />
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg"
              alt="Slack"
              className="brand-img"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg"
              alt="Zoom"
              className="brand-img"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Notion-logo.svg"
              alt="Notion"
              className="brand-img"
            />
          </div>
        </section>

        {/* Bottom 6 Feature Cards */}
        <section className="feature-cards-wrapper">
          <div className="feature-cards-grid">
            {featureCards.map((card, idx) => (
              <div key={idx} className="feature-card-item">
                <div className="card-icon-container">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Demo Video Modal */}
      {isDemoOpen && (
        <div className="modal-overlay" onClick={() => setIsDemoOpen(false)}>
          <div
            className="modal-glass-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setIsDemoOpen(false)}
            >
              <X size={20} />
            </button>
            <div className="video-aspect-wrapper">
              <iframe
                src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="ProjectHub Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
