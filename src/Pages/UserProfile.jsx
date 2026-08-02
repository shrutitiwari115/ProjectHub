import React, { useState, useEffect } from "react";
import "./UserProfile.css";

/**
 * ProjectHub - Enterprise Workspace User Profile Component
 * Dynamic Profile Page integrated with backend API.
 */
export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    bio: "",
    college: "",
    department: "",
    degree: "",
    branch: "",
    academicYear: "",
    cgpa: "",
    location: "",
    memberSince: "July 2026",
    workspaceName: "ProjectHub Core Team",
    workspaceRole: "Member",
    avatarUrl: "",
    bannerUrl: "",
    skills: [],
    socials: {
      github: "",
      linkedin: "",
      portfolio: "",
      leetcode: "",
      hackerrank: "",
      website: "",
    },
    certifications: [],
    projects: [],
    tasks: [],
    achievements: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...user });
  const [skillInput, setSkillInput] = useState("");

  // Fetch user profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve JWT token
        const response = await fetch("/api/auth/get-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        setUser((prev) => ({
          ...prev,
          name: data.name || data.fullName || prev.name,
          username: data.username || prev.username,
          email: data.email || prev.email,
          bio: data.bio || prev.bio,
          role: data.role || prev.role,
          avatarUrl: data.avatarUrl || data.profileImage || prev.avatarUrl,
        }));
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Calculate Profile Completion Rate
  const calculateCompletion = () => {
    let score = 20; // Base creation score
    if (user.name) score += 15;
    if (user.avatarUrl) score += 15;
    if (user.bio) score += 15;
    if (user.skills.length > 0) score += 15;
    if (user.college) score += 10;
    if (user.socials.github || user.socials.linkedin) score += 10;
    return Math.min(score, 100);
  };

  // Image Upload Handler
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Skill Add / Remove
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !editFormData.skills.includes(skillInput.trim())) {
      setEditFormData({
        ...editFormData,
        skills: [...editFormData.skills, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setEditFormData({
      ...editFormData,
      skills: editFormData.skills.filter((s) => s !== skillToRemove),
    });
  };

  // Save Modal Changes
  const handleSaveChanges = (e) => {
    e.preventDefault();
    setUser({ ...editFormData });
    setIsEditModalOpen(false);
  };

  const completionScore = calculateCompletion();

  if (isLoading) {
    return (
      <div
        className="ph-profile-container"
        style={{ padding: "40px", textAlign: "center" }}
      >
        Loading workspace profile...
      </div>
    );
  }

  return (
    <div className="ph-profile-container">
      {/* HEADER / ACTIONS */}
      <header className="ph-header-bar">
        <div className="ph-header-title">
          Workspace Profile
          <span>{user.workspaceName}</span>
        </div>
        <div className="ph-header-actions">
          <button
            className="ph-btn ph-btn-secondary"
            onClick={() => window.print()}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v6H6z"></path>
            </svg>
            Export PDF
          </button>
          <button
            className="ph-btn ph-btn-primary"
            onClick={() => {
              setEditFormData({ ...user });
              setIsEditModalOpen(true);
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
            Edit Profile
          </button>
        </div>
      </header>

      {/* 3-COLUMN GRID */}
      <div className="ph-grid-layout">
        {/* LEFT COLUMN: User Summary Card */}
        <aside className="ph-left-column">
          <div className="ph-card ph-profile-card">
            <div className="ph-banner-area">
              {user.bannerUrl ? (
                <img
                  src={user.bannerUrl}
                  alt="Banner"
                  className="ph-banner-img"
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(135deg, #2563EB, #1D4ED8)",
                  }}
                />
              )}
            </div>

            <div className="ph-avatar-wrapper">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="Avatar"
                  className="ph-avatar-img"
                />
              ) : (
                <div className="ph-avatar-placeholder">
                  {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
              <span
                className="ph-status-indicator"
                title="Online in Workspace"
              />
            </div>

            <div className="ph-identity">
              <h2 className="ph-user-name">{user.name || "Set your name"}</h2>
              <p className="ph-user-username">
                {user.username ? `@${user.username}` : "@username"}
              </p>
              <p className="ph-user-email">{user.email || "No email linked"}</p>
              <div className="ph-user-role">
                {user.role || "Add Professional Title"}
              </div>
            </div>

            <div className="ph-completion-box">
              <div className="ph-ring-circle">
                <svg width="48" height="48" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#2563EB"
                    strokeWidth="3"
                    strokeDasharray={`${completionScore}, 100`}
                  />
                </svg>
                <div className="ph-ring-text">{completionScore}%</div>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700 }}>
                  Profile Strength
                </div>
                <div
                  style={{ fontSize: "12px", color: "var(--ph-text-muted)" }}
                >
                  {completionScore === 100
                    ? "Complete Profile"
                    : "Fill details to improve"}
                </div>
              </div>
            </div>

            <ul className="ph-meta-list">
              <li className="ph-meta-item">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                {user.college || "Add institution/college"}
              </li>
              <li className="ph-meta-item">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                {user.location || "Add location"}
              </li>
              <li className="ph-meta-item">
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                Joined {user.memberSince}
              </li>
            </ul>
          </div>
        </aside>

        {/* CENTER COLUMN: Tabs & Core Details */}
        <main className="ph-center-column">
          <nav className="ph-tabs-nav">
            <button
              className={`ph-tab-btn ${activeTab === "overview" ? "active" : ""}`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={`ph-tab-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </button>
            <button
              className={`ph-tab-btn ${activeTab === "activity" ? "active" : ""}`}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>
          </nav>

          {activeTab === "overview" && (
            <>
              {/* ABOUT */}
              <div className="ph-card">
                <div className="ph-card-header">
                  <h3 className="ph-card-title">About</h3>
                </div>
                {user.bio ? (
                  <p
                    style={{
                      margin: 0,
                      lineHeight: 1.6,
                      color: "var(--ph-text-main)",
                    }}
                  >
                    {user.bio}
                  </p>
                ) : (
                  <div className="ph-empty-state">
                    <div className="ph-empty-icon">📝</div>
                    <p className="ph-empty-text">
                      Tell your teammates about yourself.
                    </p>
                    <button
                      className="ph-btn ph-btn-secondary ph-btn-sm"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Add Bio
                    </button>
                  </div>
                )}
              </div>

              {/* SKILLS */}
              <div className="ph-card">
                <div className="ph-card-header">
                  <h3 className="ph-card-title">Skills & Expertise</h3>
                </div>
                {user.skills && user.skills.length > 0 ? (
                  <div className="ph-skills-wrapper">
                    {user.skills.map((skill, index) => (
                      <span key={index} className="ph-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="ph-empty-state">
                    <div className="ph-empty-icon">⚡</div>
                    <p className="ph-empty-text">No skills added yet.</p>
                    <button
                      className="ph-btn ph-btn-secondary ph-btn-sm"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Add Skills
                    </button>
                  </div>
                )}
              </div>

              {/* EDUCATION */}
              <div className="ph-card">
                <div className="ph-card-header">
                  <h3 className="ph-card-title">Education</h3>
                </div>
                {user.college || user.degree ? (
                  <div>
                    <h4 style={{ margin: "0 0 4px 0", fontSize: "16px" }}>
                      {user.college}
                    </h4>
                    <p
                      style={{
                        margin: "0 0 4px 0",
                        color: "var(--ph-text-muted)",
                        fontSize: "14px",
                      }}
                    >
                      {[user.degree, user.branch].filter(Boolean).join(" • ")}
                    </p>
                    {user.academicYear && (
                      <span
                        style={{
                          fontSize: "12px",
                          color: "var(--ph-text-light)",
                        }}
                      >
                        Academic Year: {user.academicYear}
                      </span>
                    )}
                    {user.cgpa && (
                      <div
                        style={{
                          fontSize: "13px",
                          marginTop: "6px",
                          fontWeight: 600,
                        }}
                      >
                        CGPA: {user.cgpa}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="ph-empty-state">
                    <div className="ph-empty-icon">🎓</div>
                    <p className="ph-empty-text">Add your education.</p>
                    <button
                      className="ph-btn ph-btn-secondary ph-btn-sm"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      Add Education
                    </button>
                  </div>
                )}
              </div>

              {/* CERTIFICATIONS */}
              <div className="ph-card">
                <div className="ph-card-header">
                  <h3 className="ph-card-title">Certifications</h3>
                </div>
                {user.certifications && user.certifications.length > 0 ? (
                  <div>{/* Custom Cert render */}</div>
                ) : (
                  <div className="ph-empty-state">
                    <div className="ph-empty-icon">🏆</div>
                    <p className="ph-empty-text">No certifications uploaded.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "projects" && (
            <div className="ph-card">
              <div className="ph-card-header">
                <h3 className="ph-card-title">Current Projects</h3>
                <button className="ph-btn ph-btn-primary ph-btn-sm">
                  + Create Project
                </button>
              </div>
              {user.projects && user.projects.length > 0 ? (
                <div className="ph-projects-grid">
                  {/* Active projects list */}
                </div>
              ) : (
                <div className="ph-empty-state">
                  <div className="ph-empty-icon">🚀</div>
                  <p className="ph-empty-text">
                    You haven't created or joined any projects yet.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="ph-card">
              <div className="ph-card-header">
                <h3 className="ph-card-title">Recent Activity</h3>
              </div>
              <div className="ph-timeline">
                <div className="ph-timeline-item">
                  <div className="ph-timeline-node" />
                  <div style={{ fontSize: "14px", fontWeight: 600 }}>
                    Account Setup Complete
                  </div>
                  <div
                    style={{ fontSize: "12px", color: "var(--ph-text-muted)" }}
                  >
                    Registered into ProjectHub Workspace
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* RIGHT COLUMN: Analytics, Achievements, Socials */}
        <aside className="ph-right-column">
          {/* ANALYTICS */}
          <div className="ph-card">
            <div className="ph-card-header">
              <h3 className="ph-card-title">Workspace Analytics</h3>
            </div>
            <div className="ph-analytics-stat-grid">
              <div className="ph-stat-card">
                <div className="ph-stat-val">0</div>
                <div className="ph-stat-lbl">Projects Completed</div>
              </div>
              <div className="ph-stat-card">
                <div className="ph-stat-val">0</div>
                <div className="ph-stat-lbl">Tasks Done</div>
              </div>
              <div className="ph-stat-card">
                <div className="ph-stat-val">0</div>
                <div className="ph-stat-lbl">Files Shared</div>
              </div>
              <div className="ph-stat-card">
                <div className="ph-stat-val">100%</div>
                <div className="ph-stat-lbl">Collab Score</div>
              </div>
            </div>
          </div>

          {/* CONTRIBUTION GRAPH */}
          <div className="ph-card">
            <div className="ph-card-header">
              <h3 className="ph-card-title">Task Activity</h3>
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "var(--ph-text-muted)",
                margin: "0 0 10px 0",
              }}
            >
              Daily Workspace Activity Log
            </p>
            <div className="ph-heatmap-grid">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className={`ph-heatmap-cell ${i % 7 === 0 ? "ph-heat-2" : ""}`}
                />
              ))}
            </div>
          </div>

          {/* ACHIEVEMENTS */}
          <div className="ph-card">
            <div className="ph-card-header">
              <h3 className="ph-card-title">Achievements</h3>
            </div>
            {user.achievements && user.achievements.length > 0 ? (
              <div>{/* Badges */}</div>
            ) : (
              <div className="ph-empty-state">
                <div className="ph-empty-icon">🎖️</div>
                <p className="ph-empty-text">
                  Complete projects & tasks to unlock achievements.
                </p>
              </div>
            )}
          </div>

          {/* SOCIAL LINKS */}
          <div className="ph-card">
            <div className="ph-card-header">
              <h3 className="ph-card-title">Social Links</h3>
            </div>
            {Object.values(user.socials).some(Boolean) ? (
              <div className="ph-social-list">
                {user.socials.github && (
                  <a
                    href={user.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="ph-social-item"
                  >
                    <span>GitHub</span> ↗
                  </a>
                )}
                {user.socials.linkedin && (
                  <a
                    href={user.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="ph-social-item"
                  >
                    <span>LinkedIn</span> ↗
                  </a>
                )}
                {user.socials.leetcode && (
                  <a
                    href={user.socials.leetcode}
                    target="_blank"
                    rel="noreferrer"
                    className="ph-social-item"
                  >
                    <span>LeetCode</span> ↗
                  </a>
                )}
              </div>
            ) : (
              <div className="ph-empty-state">
                <div className="ph-empty-icon">🔗</div>
                <p className="ph-empty-text">Add your social links.</p>
                <button
                  className="ph-btn ph-btn-secondary ph-btn-sm"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Add Links
                </button>
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditModalOpen && (
        <div
          className="ph-modal-backdrop"
          onClick={() => setIsEditModalOpen(false)}
        >
          <div
            className="ph-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ph-modal-header">
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>
                Edit Workspace Profile
              </h3>
              <button
                className="ph-btn ph-btn-ghost"
                onClick={() => setIsEditModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveChanges} className="ph-modal-body">
              {/* Image Uploads */}
              <div className="ph-form-row">
                <div className="ph-form-group">
                  <label className="ph-label">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "avatarUrl")}
                    style={{ fontSize: "12px" }}
                  />
                </div>
                <div className="ph-form-group">
                  <label className="ph-label">Cover Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "bannerUrl")}
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="ph-form-row">
                <div className="ph-form-group">
                  <label className="ph-label">Full Name</label>
                  <input
                    className="ph-input"
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Mercer"
                  />
                </div>
                <div className="ph-form-group">
                  <label className="ph-label">Username</label>
                  <input
                    className="ph-input"
                    value={editFormData.username}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        username: e.target.value,
                      })
                    }
                    placeholder="alexmercer"
                  />
                </div>
              </div>

              <div className="ph-form-row">
                <div className="ph-form-group">
                  <label className="ph-label">Email Address</label>
                  <input
                    type="email"
                    className="ph-input"
                    value={editFormData.email}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        email: e.target.value,
                      })
                    }
                    placeholder="alex@workspace.com"
                  />
                </div>
                <div className="ph-form-group">
                  <label className="ph-label">Role Title</label>
                  <input
                    className="ph-input"
                    value={editFormData.role}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, role: e.target.value })
                    }
                    placeholder="Full Stack Developer"
                  />
                </div>
              </div>

              <div className="ph-form-group">
                <label className="ph-label">Location</label>
                <input
                  className="ph-input"
                  value={editFormData.location}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      location: e.target.value,
                    })
                  }
                  placeholder="San Francisco, CA"
                />
              </div>

              <div className="ph-form-group">
                <label className="ph-label">Bio</label>
                <textarea
                  className="ph-textarea"
                  rows="3"
                  value={editFormData.bio}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, bio: e.target.value })
                  }
                  placeholder="Write a short introduction..."
                />
              </div>

              {/* Skills Add */}
              <div className="ph-form-group">
                <label className="ph-label">Add Skills</label>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    className="ph-input"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. React, Docker, Python"
                  />
                  <button
                    className="ph-btn ph-btn-secondary"
                    onClick={handleAddSkill}
                  >
                    Add
                  </button>
                </div>
                <div
                  className="ph-skills-wrapper"
                  style={{ marginTop: "10px" }}
                >
                  {editFormData.skills.map((s, idx) => (
                    <span key={idx} className="ph-skill-chip">
                      {s}
                      <span
                        style={{ cursor: "pointer", marginLeft: "4px" }}
                        onClick={() => handleRemoveSkill(s)}
                      >
                        ✕
                      </span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="ph-form-group">
                <label className="ph-label">Social Profile URLs</label>
                <input
                  className="ph-input"
                  style={{ marginBottom: "8px" }}
                  placeholder="GitHub URL"
                  value={editFormData.socials.github}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socials: {
                        ...editFormData.socials,
                        github: e.target.value,
                      },
                    })
                  }
                />
                <input
                  className="ph-input"
                  style={{ marginBottom: "8px" }}
                  placeholder="LinkedIn URL"
                  value={editFormData.socials.linkedin}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socials: {
                        ...editFormData.socials,
                        linkedin: e.target.value,
                      },
                    })
                  }
                />
                <input
                  className="ph-input"
                  placeholder="Portfolio / Website URL"
                  value={editFormData.socials.portfolio}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socials: {
                        ...editFormData.socials,
                        portfolio: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="ph-modal-footer">
                <button
                  type="button"
                  className="ph-btn ph-btn-secondary"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="ph-btn ph-btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
