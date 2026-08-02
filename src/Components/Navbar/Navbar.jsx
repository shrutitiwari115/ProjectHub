import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Pages/AuthContext";
import {
  FolderKanban,
  KanbanSquare,
  CheckSquare,
  Users,
  BarChart3,
  Search,
  Plus,
  Bell,
  UserCircle,
  X,
  Menu,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] =
    useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const createRef = useRef(null);
  const notificationRef = useRef(null);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
      if (createRef.current && !createRef.current.contains(event.target)) {
        setCreateDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logout();
    navigate("/");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/projects?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <nav className="navbar">
      {/* Left Side: Logo - ProjectHub clicks to Hero.jsx ("/") */}
      <div className="navbar-brand">
        <Link to="/" className="logo-container">
          <FolderKanban className="logo-icon" size={24} />
          <span className="logo-text">ProjectHub</span>
        </Link>
      </div>

      {/* Center Navigation */}
      <ul className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
        {!isAuthenticated ? (
          <>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/features"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Features
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/pricing"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                Contact
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/projects"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <FolderKanban className="nav-icon" size={18} />
                <span>Projects</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/kanban"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <KanbanSquare className="nav-icon" size={18} />
                <span>Kanban</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/tasks"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <CheckSquare className="nav-icon" size={18} />
                <span>Tasks</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/team"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <Users className="nav-icon" size={18} />
                <span>Team</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/analytics"
                className={({ isActive }) => (isActive ? "active-link" : "")}
              >
                <BarChart3 className="nav-icon" size={18} />
                <span>Analytics</span>
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Right Side Actions */}
      <div className="navbar-actions">
        {!isAuthenticated ? (
          <div
            className="auth-buttons"
            style={{ display: "flex", gap: "12px", alignItems: "center" }}
          >
            <Link
              to="/login"
              className="btn-login"
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "500",
                textDecoration: "none",
                color: "#333",
                border: "1px solid #d1d5db",
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn-signup"
              style={{
                padding: "8px 16px",
                borderRadius: "6px",
                fontWeight: "500",
                textDecoration: "none",
                backgroundColor: "#2563eb",
                color: "#fff",
              }}
            >
              Sign up
            </Link>
          </div>
        ) : (
          <div className="authenticated-actions">
            {/* Expandable Search */}
            <div className="search-container" ref={searchRef}>
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="search-bar-form">
                  <Search size={16} className="search-input-icon" />
                  <input
                    type="text"
                    placeholder="Search projects, tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="search-input"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="search-close-btn"
                  >
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  className="nav-action-btn"
                  onClick={() => setSearchOpen(true)}
                  title="Search"
                >
                  <Search size={18} />
                </button>
              )}
            </div>

            {/* Create Button with Dropdown */}
            <div className="create-dropdown-container" ref={createRef}>
              <button
                className="nav-action-btn create-btn"
                onClick={() => setCreateDropdownOpen((prev) => !prev)}
                title="Create new..."
              >
                <Plus size={18} />
              </button>

              {createDropdownOpen && (
                <div className="github-dropdown-menu create-menu">
                  <Link
                    to="/projects/new"
                    onClick={() => setCreateDropdownOpen(false)}
                  >
                    New Project
                  </Link>
                  <Link
                    to="/tasks/new"
                    onClick={() => setCreateDropdownOpen(false)}
                  >
                    New Task
                  </Link>
                  <Link
                    to="/team/invite"
                    onClick={() => setCreateDropdownOpen(false)}
                  >
                    Invite Member
                  </Link>
                </div>
              )}
            </div>

            {/* Notification Bell */}
            <div className="notification-container" ref={notificationRef}>
              <button
                className="nav-action-btn notification-bell-btn"
                onClick={() => setNotificationDropdownOpen((prev) => !prev)}
                title="Notifications"
              >
                <Bell size={18} />
                <span className="unread-badge"></span>
              </button>

              {notificationDropdownOpen && (
                <div className="github-dropdown-menu notification-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">Notifications</p>
                  </div>
                  <hr />
                  <div className="notification-item">
                    <p className="notif-title">New task assigned</p>
                    <p className="notif-time">2 minutes ago</p>
                  </div>
                  <div className="notification-item">
                    <p className="notif-title">Project update posted</p>
                    <p className="notif-time">1 hour ago</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar with Dropdown */}
            <div className="profile-dropdown-container" ref={profileRef}>
              <button
                className="avatar-btn"
                onClick={() => setProfileDropdownOpen((prev) => !prev)}
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName || "User"}
                    className="user-avatar"
                  />
                ) : (
                  <div className="avatar-placeholder">
                    {getInitials(user?.fullName || user?.username)}
                  </div>
                )}
              </button>

              {profileDropdownOpen && (
                <div className="github-dropdown-menu profile-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">
                      {user?.fullName || "ProjectHub User"}
                    </p>
                    <p className="dropdown-username">
                      @{user?.username || "user"}
                    </p>
                  </div>
                  <hr />
                  <Link
                    to="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/edit-profile"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/projects"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    Settings
                  </Link>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="dropdown-logout-btn"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
