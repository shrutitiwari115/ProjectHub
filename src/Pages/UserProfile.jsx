import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaProjectDiagram,
  FaTasks,
  FaFileAlt,
  FaSignOutAlt,
  FaBriefcase,
  FaEnvelope,
} from "react-icons/fa";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(storedUser);
      // लाइव या मॉक डेटा कंबाइन करें
      setUser({
        name: parsedUser.name || "Shruti Tiwari",
        email: parsedUser.email || "shruti@sageuniversity.in",
        role: parsedUser.role || "Project Manager",
        bio: "B.Tech Computer Science student at SAGE University. Working on Project HUB Dashboard setup.",
        avatar:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop",
        projects: [
          {
            id: 1,
            title: "Project HUB",
            status: "In Progress",
            desc: "A Smart Project Collaboration system using React & Node.js.",
          },
          {
            id: 2,
            title: "IAC Dept Management",
            status: "Completed",
            desc: "Internal workspace for tracking academic assignments.",
          },
        ],
        posts: [
          {
            id: 1,
            date: "Just now",
            content:
              "Successfully integrated the OAuth registration system and Profile ID View! 🚀",
          },
          {
            id: 2,
            date: "Yesterday",
            content:
              "Working on the real-time notification components for task management.",
          },
        ],
        tasks: [
          {
            id: 1,
            text: "Design Login and Register Frontend Views",
            priority: "High",
            done: true,
          },
          {
            id: 2,
            text: "Connect Express API with MongoDB Auth handler",
            priority: "High",
            done: false,
          },
        ],
      });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user)
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        Loading Workspace ID...
      </div>
    );

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info-bar">
          <img src={user.avatar} alt={user.name} className="profile-avatar" />
          <div className="profile-meta">
            <h1>{user.name}</h1>
            <p>
              <FaBriefcase /> {user.role}
            </p>
            <p>
              <FaEnvelope /> {user.email}
            </p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
        <p className="profile-bio">{user.bio}</p>
      </header>

      <div className="profile-tabs">
        <button
          className={activeTab === "projects" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("projects")}
        >
          <FaProjectDiagram /> Projects ({user.projects.length})
        </button>
        <button
          className={activeTab === "posts" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("posts")}
        >
          <FaFileAlt /> Posts ({user.posts.length})
        </button>
        <button
          className={activeTab === "tasks" ? "tab-btn active" : "tab-btn"}
          onClick={() => setActiveTab("tasks")}
        >
          <FaTasks /> Tasks ({user.tasks.length})
        </button>
      </div>

      <main className="profile-content">
        {activeTab === "projects" && (
          <div className="grid-layout">
            {user.projects.map((p) => (
              <div key={p.id} className="custom-card">
                <span
                  className={`status-badge ${p.status.toLowerCase().replace(" ", "-")}`}
                >
                  {p.status}
                </span>
                {p.title}
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    marginTop: "8px",
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "posts" && (
          <div className="list-layout">
            {user.posts.map((post) => (
              <div key={post.id} className="custom-card">
                <span className="post-date">{post.date}</span>
                <p style={{ margin: 0, color: "#334155" }}>{post.content}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === "tasks" && (
          <div className="list-layout">
            {user.tasks.map((t) => (
              <div
                key={t.id}
                className="custom-card"
                style={{ display: "flex", gap: "12px", alignItems: "center" }}
              >
                <input
                  type="checkbox"
                  checked={t.done}
                  readOnly
                  style={{ accentColor: "#0284c7" }}
                />
                <span
                  style={{
                    textDecoration: t.done ? "line-through" : "none",
                    color: t.done ? "#94a3b8" : "#334155",
                  }}
                >
                  {t.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfile;
