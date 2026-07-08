import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaPlay,
  FaBook,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaRegFolderOpen,
  FaRobot,
  FaBell,
  FaCalendarAlt,
  FaEllipsisH,
  FaChartLine,
  FaShieldAlt,
  FaGithub,
  FaCloud,
  FaCheckCircle,
  FaLaptopCode,
  FaComments,
  FaSync,
  FaDatabase,
  FaFileInvoice,
  FaCog,
  FaCode,
  FaChevronRight,
  FaArrowDown,
  FaLock,
} from "react-icons/fa";
import "./Hero.css";

function Hero() {
  const navigate = useNavigate();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [aiPromptIndex, setAiPromptIndex] = useState(0);

  const aiPrompts = [
    "Generating sprint breakdown metrics...",
    "Reviewing code patterns for vulnerabilities...",
    "Compiling weekly executive progress reports...",
    "Automating multi-tenant file node isolation...",
  ];

  useEffect(() => {
    let currentText = "";
    let letterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeEffect = () => {
      const fullWord = aiPrompts[aiPromptIndex];
      if (!isDeleting) {
        currentText = fullWord.substring(0, letterIndex + 1);
        letterIndex++;
      } else {
        currentText = fullWord.substring(0, letterIndex - 1);
        letterIndex--;
      }

      setTypingText(currentText);

      if (!isDeleting && currentText === fullWord) {
        setTimeout(() => {
          isDeleting = true;
        }, 1500);
        typingSpeed = 40;
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        setAiPromptIndex((prev) => (prev + 1) % aiPrompts.length);
        typingSpeed = 100;
      }
    };

    const timer = setTimeout(typeEffect, typingSpeed);
    return () => clearTimeout(timer);
  }, [typingText, aiPromptIndex]);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="projecthub-light-system premium-github-canvas">
      <section className="synopsis-hero-viewport">
        <div className="mesh-animated-grid bg-linear-grid"></div>
        <div className="ambient-glow glow-skyblue radial-glow-1"></div>
        <div className="ambient-glow glow-pista radial-glow-2"></div>

        <div className="synopsis-content-frame github-flex-container">
          <div className="content-frame-left tracking-left-panel">
            <div className="badge-ai-collaboration glass-capsule animate-fade-in">
              <span className="badge-pulse-node dynamic-ping"></span>
              <span className="badge-title-text">
                AI Powered Project Collaboration Platform
              </span>
            </div>

            <h1 className="main-hero-headline linear-tracking-text">
              Build, Manage & Collaborate on Projects from <br />
              <span className="gradient-highlight-text skyblue-green-gradient">
                One Intelligent Workspace.
              </span>
            </h1>

            <p className="main-hero-description github-muted-prose">
              ProjectHub enables users to create projects, assign tasks,
              collaborate with team members, share files securely, track project
              progress, receive notifications, generate reports, and use an AI
              Guide for project assistance.
            </p>

            <div className="cta-cluster-group engine-button-gap">
              <button
                className="btn-cta-main vercel-gradient-btn glow-hover"
                onClick={() => navigate("/signup")}
              >
                Get Started <FaArrowRight className="btn-arrow-icon" />
              </button>
              <button className="btn-cta-outline github-outline-btn glass-hover">
                <FaPlay className="btn-play-icon" /> Live Demo
              </button>
              <button
                className="btn-cta-text docs-secondary-btn smooth-underline"
                onClick={(e) => handleSmoothScroll(e, "workflow-pipeline")}
              >
                <FaBook className="btn-book-icon" /> Learn More
              </button>
            </div>

            <div className="feature-tags-cloud structural-chip-deck">
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> Project Management
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> Task Assignment
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> Team Collaboration
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> File Sharing
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> AI Guide
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> Analytics
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> Notifications
              </span>
              <span className="tag-node spec-chip">
                <FaCheckCircle className="chip-check" /> Secure Login
              </span>
            </div>
          </div>

          <div className="content-frame-right workspace-mock-canvas">
            <div className="application-mock-window glassmorphism-board terminal-glow-border floating-dashboard-effect">
              <div className="window-top-bar v-border-bottom">
                <div className="window-dots-controls">
                  <span className="dot-ctrl d-close"></span>
                  <span className="dot-ctrl d-min"></span>
                  <span className="dot-ctrl d-max"></span>
                </div>
                <div className="window-center-address system-mono-font">
                  workspace://projecthub-core-mesh
                </div>
                <FaEllipsisH className="window-dots-more" />
              </div>

              <div className="window-internal-layout">
                <div className="app-internal-sidebar sidebar-v-rail">
                  <div className="sidebar-link-node active-node-link">
                    <FaLaptopCode className="sidebar-ico" /> Dashboard
                  </div>
                  <div className="sidebar-link-node">
                    <FaProjectDiagram className="sidebar-ico" /> Projects
                  </div>
                  <div className="sidebar-link-node">
                    <FaTasks className="sidebar-ico" /> Tasks
                  </div>
                  <div className="sidebar-link-node">
                    <FaUsers className="sidebar-ico" /> Teams
                  </div>
                  <div className="sidebar-link-node">
                    <FaRegFolderOpen className="sidebar-ico" /> Files
                  </div>
                  <div className="sidebar-link-node">
                    <FaCalendarAlt className="sidebar-ico" /> Calendar
                  </div>
                  <div className="sidebar-link-node">
                    <FaBell className="sidebar-ico" /> Notifications
                  </div>
                  <div className="sidebar-link-node">
                    <FaFileInvoice className="sidebar-ico" /> Reports
                  </div>
                  <div className="sidebar-link-node">
                    <FaChartLine className="sidebar-ico" /> Analytics
                  </div>
                  <div className="sidebar-link-node text-purple-glow">
                    <FaRobot className="sidebar-ico pulse-purple-icon" /> AI
                    Guide
                  </div>
                  <div className="sidebar-link-node">
                    <FaCog className="sidebar-ico" /> Settings
                  </div>
                </div>

                <div className="app-internal-main-panel panel-scroll-suppressed">
                  <div className="dashboard-stats-grid synopsis-metric-row">
                    <div className="d-card-stat glass-card border-glow-skyblue">
                      <h5>04</h5>
                      <p>Active Projects</p>
                    </div>
                    <div className="d-card-stat glass-card">
                      <h5>12</h5>
                      <p>Pending Tasks</p>
                    </div>
                    <div className="d-card-stat glass-card">
                      <h5>48</h5>
                      <p>Completed Tasks</p>
                    </div>
                    <div className="d-card-stat glass-card highlight-pista">
                      <h5>08</h5>
                      <p>Team Members</p>
                    </div>
                  </div>

                  <div className="dashboard-kanban-progress-wrapper core-grid-layout">
                    <div className="kanban-micro-column glass-sub-panel">
                      <h6>📋 Project Kanban Board</h6>
                      <div className="kanban-node-item k-todo">
                        Task Progress Status{" "}
                        <span className="k-badge-progress">In-Flight</span>
                      </div>
                      <div className="kanban-node-item k-done">
                        File Cryptography Model{" "}
                        <span className="k-badge-done">Merged</span>
                      </div>
                    </div>
                    <div className="timeline-micro-column glass-sub-panel">
                      <h6>📈 Progress & Deadlines</h6>
                      <div className="progress-bar-track-wrapper">
                        <div className="progress-label-meta">
                          <span>Sprint Completion</span> <span>84%</span>
                        </div>
                        <div className="progress-bar-rail">
                          <div
                            className="progress-bar-fill filled-skyblue-green"
                            style={{ width: "84%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="timeline-item-deadline">
                        <span className="alert-dot red-pulse"></span> Upcoming
                        Deadline: Report Generation
                      </div>
                    </div>
                  </div>

                  <div className="dashboard-ai-widget premium-ai-panel glass-card-purple">
                    <div className="ai-widget-header panel-header-glow">
                      <FaRobot className="ai-pulse-icon machine-spin-avatar" />
                      <span className="mono-label">
                        AI Guide Interactive Assistant
                      </span>
                      <span className="ai-live-tag">Online</span>
                    </div>

                    <div className="ai-realtime-terminal-prompt">
                      <span className="terminal-prompt-symbol">&gt;</span>
                      <span className="terminal-interactive-typing text-glow-purple">
                        {typingText}
                      </span>
                      <span className="terminal-cursor-blink">|</span>
                    </div>

                    <div className="ai-widget-buttons algorithmic-deck">
                      <button className="ai-feature-trigger">
                        Generate Tasks
                      </button>
                      <button className="ai-feature-trigger">
                        Project Suggestions
                      </button>
                      <button className="ai-feature-trigger">
                        Progress Summary
                      </button>
                      <button className="ai-feature-trigger">
                        Bug Suggestions
                      </button>
                      <button className="ai-feature-trigger">
                        Generate Report
                      </button>
                    </div>
                  </div>

                  <div className="dashboard-widgets-row low-tier-deck">
                    <div className="sub-widget-box transparent-glass-card">
                      <h6>
                        <FaSync className="widget-ico-spin text-skyblue" />{" "}
                        Recent Activities
                      </h6>
                      <ul className="terminal-prose-list">
                        <li>⚡ Socket.io real-time node synced</li>
                        <li>📁 User uploaded SRS module draft</li>
                      </ul>
                    </div>
                    <div className="sub-widget-box transparent-glass-card">
                      <h6>
                        <FaRegFolderOpen className="text-pista" /> File Upload &
                        Reports
                      </h6>
                      <div className="file-upload-dropzone-simulation">
                        <FaCloud className="dropzone-cloud-icon pulse-hover" />
                        <span>Cloudinary Secure Gateway</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-footer-status-tags absolute-floating-tags">
              <div className="status-tag-node glassmorphism pulse-slow">
                <FaCloud className="c-i-skyblue" /> Cloud Sync
              </div>
              <div className="status-tag-node glassmorphism">
                <FaRegFolderOpen className="c-i-pista" /> 14 Files Uploaded
              </div>
              <div className="status-tag-node glassmorphism">
                <FaCheckCircle className="c-i-skyblue" /> 142 Tasks Completed
              </div>
              <div className="status-tag-node glassmorphism purple-tag">
                <FaRobot className="c-i-pista machine-ping" /> AI Online
              </div>
            </div>
          </div>
        </div>

        <div
          className="synopsis-workflow-timeline-container"
          id="workflow-pipeline"
        >
          <div className="workflow-section-header">
            <span className="workflow-pre-title">ARCHITECTURE PIPELINE</span>
            <h2 className="workflow-main-title">
              The ProjectHub Workflow Execution Lifecycle
            </h2>
            <div className="header-divider-line"></div>
          </div>

          <div className="horizontal-pipeline-scroller custom-scrollbar">
            <div className="pipeline-track-flow">
              <div className="pipeline-node-stage border-glow-skyblue">
                <div className="stage-numeric-index">01</div>
                <h5>User Registration</h5>
                <p>
                  Secure input parsing and account instantiation via frontend
                  routers.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">02</div>
                <h5>Secure Login</h5>
                <p>
                  JWT payload verification and multi-tenant session binding.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">03</div>
                <h5>Create Project</h5>
                <p>
                  Initializing metadata document structures within Cluster
                  models.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">04</div>
                <h5>Invite Members</h5>
                <p>
                  Asynchronous invitation emails and node workspace linking.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">05</div>
                <h5>Assign Tasks</h5>
                <p>Mapping dependencies into visual tracking pipelines.</p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">06</div>
                <h5>Upload Files</h5>
                <p>Binary cloud storage upload via base64 buffer arrays.</p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">07</div>
                <h5>Real-Time Sync</h5>
                <p>
                  Bidirectional event streams passing telemetry across web
                  instances.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">08</div>
                <h5>Track Progress</h5>
                <p>
                  Data normalization pipelines rendering responsive metric
                  graphs.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage special-ai-stage">
                <div className="stage-numeric-index">09</div>
                <h5>AI Assistance</h5>
                <p>Contextual parsing loops returning optimization prompts.</p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage">
                <div className="stage-numeric-index">10</div>
                <h5>Generate Reports</h5>
                <p>
                  Compiling file outputs containing compiled analytics arrays.
                </p>
                <FaChevronRight className="pipeline-flow-arrow" />
              </div>

              <div className="pipeline-node-stage final-success-stage">
                <div className="stage-numeric-index">11</div>
                <h5>Project Completed</h5>
                <p>
                  Successful workspace freeze and client submission node export.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="synopsis-marquee-section structural-tech-ribbon-v-border">
          <p className="marquee-section-title linear-mono-tag">
            CORE INFRASTRUCTURE TECHNOLOGY STACK
          </p>
          <div className="marquee-viewport-mask tech-ribbon-bg">
            <div className="marquee-slider-track tech-track-speed">
              <span>
                <FaCode className="tech-ico skyblue-ico" /> React.js
              </span>
              <span>
                <FaLaptopCode className="tech-ico text-pista" /> Node.js
              </span>
              <span>
                <FaSync className="tech-ico skyblue-ico" /> Express.js
              </span>
              <span>
                <FaDatabase className="tech-ico text-pista" /> MongoDB
              </span>
              <span>
                <FaLock className="tech-ico skyblue-ico" /> JWT Auth
              </span>
              <span>
                <FaCloud className="tech-ico text-pista" /> Cloudinary CDN
              </span>
              <span>
                <FaComments className="tech-ico skyblue-ico" /> Socket.io
              </span>

              <span>
                <FaCode className="tech-ico skyblue-ico" /> React.js
              </span>
              <span>
                <FaLaptopCode className="tech-ico text-pista" /> Node.js
              </span>
              <span>
                <FaSync className="tech-ico skyblue-ico" /> Express.js
              </span>
              <span>
                <FaDatabase className="tech-ico text-pista" /> MongoDB
              </span>
              <span>
                <FaLock className="tech-ico skyblue-ico" /> JWT Auth
              </span>
              <span>
                <FaCloud className="tech-ico text-pista" /> Cloudinary CDN
              </span>
              <span>
                <FaComments className="tech-ico skyblue-ico" /> Socket.io
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
