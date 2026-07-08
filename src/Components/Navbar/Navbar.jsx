import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import {
  FaTerminal,
  FaChevronDown,
  FaSearch,
  FaBell,
  FaMoon,
  FaSun,
  FaGlobe,
  FaProjectDiagram,
  FaTasks,
  FaUsers,
  FaFolderOpen,
  FaBrain,
  FaChartBar,
  FaPlus,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaHome,
  FaCode,
  FaGraduationCap,
  FaRocket,
  FaBuilding,
  FaGithub,
  FaSlack,
  FaGoogleDrive,
  FaMicrosoft,
  FaCloud,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem("token"),
  );
  const [userData, setUserData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Sync auth and user data on location change
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    try {
      setUserData(JSON.parse(localStorage.getItem("user")) || null);
    } catch (e) {
      setUserData(null);
    }
  }, [location]);

  // Scroll handler for sticky glassmorphism effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard shortcut (Ctrl + K / Cmd + K) for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("nav-global-search")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle("dark-theme-active");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUserData(null);
    setProfileDropdown(false);
    navigate("/login");
  };

  const currentActive = (path) =>
    location.pathname === path ? "active-node" : "";

  // Smooth scroll handler for landing page anchors
  const handleAnchorClick = (e, targetId) => {
    if (location.pathname === "/home" || location.pathname === "/") {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav
      className={`premium-nav-shell sticky-navbar ${scrolled ? "shell-scrolled glassmorphism" : ""} ${
        isDarkMode ? "dark-shell" : ""
      }`}
    >
      <div className="nav-macro-container">
        {/* LEFT BRANDING */}
        <div className="nav-branding-zone">
          <Link
            to="/home"
            onClick={(e) => handleAnchorClick(e, "hero")}
            className="brand-logo-anchor"
          >
            <div className="brand-cube-matrix">
              <FaTerminal className="matrix-icon-core" />
            </div>
            <span className="brand-text-string">ProjectHub</span>
          </Link>
          {isAuthenticated && (
            <span className="internal-node-tag">Workspace v2</span>
          )}
        </div>

        {/* CENTER NAVIGATION */}
        <div
          className={`nav-routing-center ${
            mobileMenuOpen ? "mobile-drawer-active" : ""
          }`}
        >
          {!isAuthenticated ? (
            <ul className="marketing-nav-list">
              <li>
                <Link
                  to="/home"
                  onClick={(e) => handleAnchorClick(e, "hero")}
                  className={`marketing-link home-icon-link smooth-underline ${currentActive("/home")}`}
                  title="Home"
                >
                  <FaHome
                    style={{ fontSize: "1.2rem", verticalAlign: "middle" }}
                  />{" "}
                  <span className="mobile-only-text">Home</span>
                </Link>
              </li>

              {/* FEATURES DROPDOWN */}
              <li
                className="dropdown-trigger-node"
                onMouseEnter={() => setActiveDropdown("features")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="marketing-link smooth-underline style-clickable-span">
                  Features <FaChevronDown className="chevron-mini" />
                </span>
                <div
                  className={`mega-dropdown-grid ${
                    activeDropdown === "features" ? "grid-visible" : ""
                  }`}
                >
                  <Link
                    to="/features/pm"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaProjectDiagram className="drop-ico pm" />{" "}
                    <div>
                      <h4>Project Management</h4>
                      <p>Track high-level lifecycles & configurations.</p>
                    </div>
                  </Link>
                  <Link
                    to="/features/tasks"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaTasks className="drop-ico task" />{" "}
                    <div>
                      <h4>Task Management</h4>
                      <p>Kanban & automation architecture.</p>
                    </div>
                  </Link>
                  <Link
                    to="/features/team"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaUsers className="drop-ico team" />{" "}
                    <div>
                      <h4>Team Collaboration</h4>
                      <p>Real-time node collaboration.</p>
                    </div>
                  </Link>
                  <Link
                    to="/features/files"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaFolderOpen className="drop-ico file" />{" "}
                    <div>
                      <h4>File Sharing</h4>
                      <p>Encrypted data repository.</p>
                    </div>
                  </Link>
                  <Link
                    to="/features/ai"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaBrain className="drop-ico ai" />{" "}
                    <div>
                      <h4>AI Assistant</h4>
                      <p>Autonomous summary pipelines.</p>
                    </div>
                  </Link>
                  <Link
                    to="/features/analytics"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaChartBar className="drop-ico analytics" />{" "}
                    <div>
                      <h4>Analytics Dashboard</h4>
                      <p>Deep performance metrics.</p>
                    </div>
                  </Link>
                </div>
              </li>

              <li
                className="dropdown-trigger-node"
                onMouseEnter={() => setActiveDropdown("solutions")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="marketing-link smooth-underline">
                  Solutions <FaChevronDown className="chevron-mini" />
                </span>
                <div
                  className={`mega-dropdown-grid mini-grid ${
                    activeDropdown === "solutions" ? "grid-visible" : ""
                  }`}
                >
                  <Link
                    to="/solutions/students"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaGraduationCap className="drop-ico solutions-ico" />
                    <div>
                      <h4>Students</h4>
                    </div>
                  </Link>
                  <Link
                    to="/solutions/developers"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCode className="drop-ico solutions-ico" />
                    <div>
                      <h4>Developers</h4>
                    </div>
                  </Link>
                  <Link
                    to="/solutions/startups"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaRocket className="drop-ico solutions-ico" />
                    <div>
                      <h4>Startups</h4>
                    </div>
                  </Link>
                  <Link
                    to="/solutions/companies"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaBuilding className="drop-ico solutions-ico" />
                    <div>
                      <h4>Companies</h4>
                    </div>
                  </Link>
                  <Link
                    to="/solutions/colleges"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaBuilding className="drop-ico solutions-ico" />
                    <div>
                      <h4>Colleges</h4>
                    </div>
                  </Link>
                </div>
              </li>

              {/* INTEGRATIONS MEGA DROPDOWN */}
              <li
                className="dropdown-trigger-node"
                onMouseEnter={() => setActiveDropdown("integrations")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="marketing-link smooth-underline">
                  Integrations <FaChevronDown className="chevron-mini" />
                </span>
                <div
                  className={`mega-dropdown-grid mini-grid ${
                    activeDropdown === "integrations" ? "grid-visible" : ""
                  }`}
                >
                  <Link
                    to="/integrations/github"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaGithub className="drop-ico github-ico" />
                    <div>
                      <h4>GitHub</h4>
                    </div>
                  </Link>
                  <Link
                    to="/integrations/vscode"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCode className="drop-ico vscode-ico" />
                    <div>
                      <h4>VS Code</h4>
                    </div>
                  </Link>
                  <Link
                    to="/integrations/gdrive"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaGoogleDrive className="drop-ico gdrive-ico" />
                    <div>
                      <h4>Google Drive</h4>
                    </div>
                  </Link>
                  <Link
                    to="/integrations/slack"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaSlack className="drop-ico slack-ico" />
                    <div>
                      <h4>Slack</h4>
                    </div>
                  </Link>
                  <Link
                    to="/integrations/teams"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaMicrosoft className="drop-ico teams-ico" />
                    <div>
                      <h4>Microsoft Teams</h4>
                    </div>
                  </Link>
                  <Link
                    to="/integrations/cloudinary"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCloud className="drop-ico cloud-ico" />
                    <div>
                      <h4>Cloudinary</h4>
                    </div>
                  </Link>
                </div>
              </li>

              {/* RESOURCES MEGA DROPDOWN */}
              <li
                className="dropdown-trigger-node"
                onMouseEnter={() => setActiveDropdown("resources")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <span className="marketing-link smooth-underline">
                  Resources <FaChevronDown className="chevron-mini" />
                </span>
                <div
                  className={`mega-dropdown-grid mini-grid ${
                    activeDropdown === "resources" ? "grid-visible" : ""
                  }`}
                >
                  <Link
                    to="/docs"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaBook className="drop-ico" />
                    <div>
                      <h4>Documentation</h4>
                    </div>
                  </Link>
                  <Link
                    to="/user-guide"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaBook className="drop-ico" />
                    <div>
                      <h4>User Guide</h4>
                    </div>
                  </Link>
                  <Link
                    to="/api-reference"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaCode className="drop-ico" />
                    <div>
                      <h4>API Reference</h4>
                    </div>
                  </Link>
                  <Link
                    to="/help"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaQuestionCircle className="drop-ico" />
                    <div>
                      <h4>Help Center</h4>
                    </div>
                  </Link>
                  <Link
                    to="/blog"
                    className="mega-item"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <FaChartBar className="drop-ico" />
                    <div>
                      <h4>Blog</h4>
                    </div>
                  </Link>
                </div>
              </li>

              <li>
                <Link
                  to="/pricing"
                  className="marketing-link smooth-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="marketing-link smooth-underline"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="dashboard-nav-list">
              <li>
                <Link
                  to="/dashboard"
                  className={`dash-node-link smooth-underline ${currentActive("/dashboard")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTerminal /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`dash-node-link smooth-underline ${currentActive("/projects")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaProjectDiagram /> <span>Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/tasks"
                  className={`dash-node-link smooth-underline ${currentActive("/tasks")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaTasks /> <span>Tasks</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/teams"
                  className={`dash-node-link smooth-underline ${currentActive("/teams")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaUsers /> <span>Teams</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/files"
                  className={`dash-node-link smooth-underline ${currentActive("/files")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaFolderOpen /> <span>Files</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/ai-workspace"
                  className={`dash-node-link smooth-underline ${currentActive("/ai-workspace")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaBrain className="pulsing-purple-icon" />{" "}
                  <span>AI Labs</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/analytics"
                  className={`dash-node-link smooth-underline ${currentActive("/analytics")}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FaChartBar /> <span>Analytics</span>
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* RIGHT UTILITIES & ACTIONS */}
        <div className="nav-action-zone">
          <div className="omni-search-container micro-search">
            <FaSearch className="omni-search-embed-icon" />
            <input
              type="text"
              id="nav-global-search"
              placeholder="Search... (Ctrl+K)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="utility-circle-trigger"
            onClick={toggleTheme}
            title="Change Theme System"
          >
            {isDarkMode ? <FaSun className="sun-color" /> : <FaMoon />}
          </button>

          {!isAuthenticated ? (
            <>
              <button
                className="utility-circle-trigger"
                title="Select Localization Language"
              >
                <FaGlobe />
              </button>
              <Link
                to="/login"
                className="public-sign-in-anchor custom-outline-btn"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="public-sign-up-github-btn custom-gradient-btn"
              >
                Sign up
              </Link>
            </>
          ) : (
            <>
              <button
                className="dashboard-creation-node-btn"
                title="Instantiate New Document Node"
                onClick={() => navigate("/features/pm")}
              >
                <FaPlus /> <span>New Project</span>
              </button>

              <div className="system-notification-bell-cluster">
                <button
                  className="utility-circle-trigger notification-active-bell"
                  title="System Operational Logs"
                >
                  <FaBell />
                  <span className="live-radar-ping-dot"></span>
                </button>
                <div className="notification-micro-toast-panel">
                  <h5>Recent Notifications</h5>
                  <div className="toast-item">
                    <span className="task-dot"></span> Task deadline updated
                  </div>
                  <div className="toast-item">
                    <span className="invite-dot"></span> Team architecture
                    invite received
                  </div>
                </div>
              </div>

              {/* Profile Dropdown */}
              <div className="app-profile-dropdown-container" ref={profileRef}>
                <button
                  className="profile-capsule-trigger"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                    alt="Avatar Node"
                  />
                  <FaChevronDown
                    className={`profile-chevron-arrow ${
                      profileDropdown ? "rotated-state" : ""
                    }`}
                  />
                </button>

                {profileDropdown && (
                  <div className="app-profile-floating-overlay">
                    <div className="profile-overlay-meta-block">
                      <h4>{userData?.name || "Amrita Sharma"}</h4>
                      <p>{userData?.email || "amrita@projecthub.dev"}</p>
                    </div>
                    <div className="overlay-divider-line"></div>
                    <Link
                      to="/profile"
                      className="overlay-navigation-node"
                      onClick={() => setProfileDropdown(false)}
                    >
                      <FaUser /> Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="overlay-navigation-node"
                      onClick={() => setProfileDropdown(false)}
                    >
                      <FaCog /> Configuration
                    </Link>
                    <div className="overlay-divider-line"></div>
                    <button
                      onClick={handleLogout}
                      className="overlay-navigation-node systems-exit-trigger"
                    >
                      <FaSignOutAlt /> Terminate Session
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          <button
            className="nav-mobile-hamburger-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
