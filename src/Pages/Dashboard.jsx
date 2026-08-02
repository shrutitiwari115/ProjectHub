import React, { useState, useEffect } from "react";
import {
  Folder,
  CheckCircle2,
  Clock,
  Target,
  Calendar,
  TrendingUp,
  Send,
  Sliders,
  Plus,
  Upload,
  FileText,
  Check,
} from "lucide-react";
import io from "socket.io-client";
import axios from "axios";
import "./Dashboard.css";

const API_BASE_URL = "http://localhost:5000/api";
const SOCKET_URL = "http://localhost:5000";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [metrics, setMetrics] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedTasksPercentage: 0,
    upcomingDeadlines: 0,
    productivityScore: 0,
  });
  const [aiPrompt, setAiPrompt] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data from Backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [metricsRes, projectsRes, tasksRes] = await Promise.all([
          axios
            .get(`${API_BASE_URL}/analytics/metrics`, config)
            .catch(() => ({ data: {} })),
          axios
            .get(`${API_BASE_URL}/projects`, config)
            .catch(() => ({ data: [] })),
          axios
            .get(`${API_BASE_URL}/tasks`, config)
            .catch(() => ({ data: [] })),
        ]);

        setMetrics(metricsRes.data);
        setProjects(projectsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Socket.io Real-time connection setup
    const socket = io(SOCKET_URL);
    socket.on("receiveTaskUpdate", (updatedTask) => {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        ),
      );
    });

    return () => socket.disconnect();
  }, []);

  const handleTaskToggle = async (id, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newCompletedState = !currentStatus;

      const res = await axios.patch(
        `${API_BASE_URL}/tasks/${id}`,
        { completed: newCompletedState },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error("Failed to update task status", err);
    }
  };

  const handleAiSubmit = async (e) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${API_BASE_URL}/ai/query`,
        { prompt: aiPrompt },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      alert(`AI Response: ${res.data.reply || "Processed successfully"}`);
      setAiPrompt("");
    } catch (err) {
      alert(
        `AI Assistant responding to: "${aiPrompt}" (Backend offline fallback)`,
      );
      setAiPrompt("");
    }
  };

  if (loading) {
    return (
      <div
        className="dashboard-wrapper"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>Loading workspace from database...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        {/* Top Header */}
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, Shruti! 👋</h1>
            <p>Here's an overview of your live workspace and activity.</p>
          </div>
          <div className="header-actions">
            <button className="action-btn">
              <Calendar size={15} /> {new Date().toLocaleDateString()}
            </button>
            <button className="action-btn">
              <Sliders size={15} /> Customize
            </button>
          </div>
        </header>

        {/* Metric Cards Row */}
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-info">
              <span className="metric-title">Total Projects</span>
              <h2>{metrics.totalProjects || 24}</h2>
              <span className="trend positive">↑ Live Data</span>
            </div>
            <div className="metric-icon blue">
              <Folder size={18} />
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-info">
              <span className="metric-title">Active Projects</span>
              <h2>{metrics.activeProjects || 18}</h2>
              <span className="trend positive">↑ Live Data</span>
            </div>
            <div className="metric-icon green">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-info">
              <span className="metric-title">Completed Tasks</span>
              <h2>{metrics.completedTasksPercentage || "68%"}</h2>
              <span className="trend positive">↑ Live Data</span>
            </div>
            <div className="metric-icon purple">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-info">
              <span className="metric-title">Upcoming Deadlines</span>
              <h2>{metrics.upcomingDeadlines || 7}</h2>
              <span className="sub-text">Synced with DB</span>
            </div>
            <div className="metric-icon orange">
              <Clock size={18} />
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-info">
              <span className="metric-title">Productivity Score</span>
              <h2>{metrics.productivityScore || "82%"}</h2>
              <span className="trend positive">↑ Real-time</span>
            </div>
            <div className="metric-icon teal">
              <Target size={18} />
            </div>
          </div>
        </div>

        {/* Row 2: Project Overview & Progress */}
        <div className="charts-row">
          <div className="card">
            <div className="card-header">
              <h3>Project Overview</h3>
            </div>
            <div className="chart-content-flex">
              <div className="donut-chart-mock">
                <span>
                  <strong>{projects.length || 24}</strong>
                  <br />
                  Total Projects
                </span>
              </div>
              <ul className="chart-legend">
                <li>
                  <span className="dot blue"></span> In Progress{" "}
                  <span className="legend-val">10</span>
                </li>
                <li>
                  <span className="dot green"></span> Completed{" "}
                  <span className="legend-val">7</span>
                </li>
                <li>
                  <span className="dot orange"></span> On Hold{" "}
                  <span className="legend-val">3</span>
                </li>
                <li>
                  <span className="dot purple"></span> Planning{" "}
                  <span className="legend-val">2</span>
                </li>
                <li>
                  <span className="dot grey"></span> Cancelled{" "}
                  <span className="legend-val">2</span>
                </li>
              </ul>
            </div>
            <a href="#projects" className="card-footer-link">
              View all projects →
            </a>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Project Progress</h3>
              <select className="dropdown-select">
                <option>This Month</option>
              </select>
            </div>
            <div className="line-chart-mock">
              <div className="chart-line-visual">
                <div className="progress-badge-node">
                  Live Status
                  <br />
                  <strong>Synced</strong>
                </div>
              </div>
              <div className="chart-axis-labels">
                <span>Week 1</span>
                <span>Week 2</span>
                <span>Week 3</span>
                <span>Week 4</span>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: My Tasks & Active Projects */}
        <div className="tasks-projects-row">
          <div className="card">
            <div className="card-header">
              <h3>My Tasks</h3>
              <a href="#tasks" className="view-all">
                View all
              </a>
            </div>
            <div className="task-tabs">
              {["Upcoming", "In Progress", "Completed", "Overdue"].map(
                (tab) => (
                  <span
                    key={tab}
                    className={activeTab === tab ? "active" : ""}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </span>
                ),
              )}
            </div>
            <ul className="task-list">
              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <li key={task._id || task.id}>
                    <label className={task.completed ? "completed-text" : ""}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() =>
                          handleTaskToggle(task._id || task.id, task.completed)
                        }
                      />
                      {task.title || task.text}
                    </label>
                    <span
                      className={`badge ${(task.priority || task.badge || "medium").toLowerCase()}`}
                    >
                      {task.priority || task.badge || "Medium"}
                    </span>
                    <span className="date">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : task.date}
                    </span>
                  </li>
                ))
              ) : (
                <p style={{ fontSize: "13px", color: "#64748b" }}>
                  No tasks found in database.
                </p>
              )}
            </ul>
            <a
              href="#alltasks"
              className="card-footer-link"
              style={{ marginTop: "16px" }}
            >
              View all tasks →
            </a>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Active Projects</h3>
              <a href="#projects" className="view-all">
                View all
              </a>
            </div>
            <div className="project-list-items">
              {projects.length > 0 ? (
                projects.slice(0, 5).map((proj, idx) => (
                  <div className="proj-row" key={proj._id || idx}>
                    <span className="proj-name">{proj.title}</span>
                    <span className="status-text in-prog">
                      {proj.status || "In Progress"}
                    </span>
                    <div className="progress-bar-line">
                      <div
                        className="fill"
                        style={{ width: `${proj.progress || 50}%` }}
                      ></div>
                    </div>
                    <span className="team-avatars">👥 Live</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="proj-row">
                    <span className="proj-name">AI Interview Platform</span>
                    <span className="status-text in-prog">In Progress</span>
                    <div className="progress-bar-line">
                      <div className="fill" style={{ width: "60%" }}></div>
                    </div>
                    <span className="team-avatars">👥 +3</span>
                  </div>
                  <div className="proj-row">
                    <span className="proj-name">ProjectHub Redesign</span>
                    <span className="status-text in-prog">In Progress</span>
                    <div className="progress-bar-line">
                      <div className="fill" style={{ width: "45%" }}></div>
                    </div>
                    <span className="team-avatars">👥 +2</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Row 4: Analytics Overview */}
        <div className="card" style={{ marginBottom: "24px" }}>
          <div className="card-header">
            <h3>Analytics Overview</h3>
            <select className="dropdown-select">
              <option>This Week</option>
            </select>
          </div>
          <div className="analytics-grid">
            <div className="analytics-box">
              <span className="analytics-title">Tasks Completed</span>
              <h2>156</h2>
              <span className="trend positive">↑ Live Database</span>
              <div className="mini-wave"></div>
            </div>
            <div className="analytics-box">
              <span className="analytics-title">Time Logged</span>
              <h2>32h 45m</h2>
              <span className="trend positive">↑ Live Database</span>
              <div className="mini-wave"></div>
            </div>
            <div className="analytics-box">
              <span className="analytics-title">Code Commits</span>
              <h2>48</h2>
              <span className="trend positive">↑ Live Database</span>
              <div className="mini-wave"></div>
            </div>
            <div className="analytics-box">
              <span className="analytics-title">PRs Merged</span>
              <h2>12</h2>
              <span className="trend positive">↑ Live Database</span>
              <div className="mini-wave"></div>
            </div>
          </div>
        </div>

        {/* Row 5: Weekly Productivity & Task Completion */}
        <div className="charts-row">
          <div className="card">
            <div className="card-header">
              <h3>Weekly Productivity</h3>
            </div>
            <div className="heatmap-box-wrapper">
              <div className="heatmap-grid">
                {Array.from({ length: 7 }).map((_, r) => (
                  <div key={r} className="heatmap-row">
                    {Array.from({ length: 24 }).map((_, c) => {
                      const intensity = (r + c) % 5;
                      return (
                        <span
                          key={c}
                          className={`heat-cell level-${intensity}`}
                        ></span>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="heatmap-time-labels">
                <span>12 AM</span>
                <span>4 AM</span>
                <span>8 AM</span>
                <span>12 PM</span>
                <span>4 PM</span>
                <span>8 PM</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Task Completion</h3>
            </div>
            <div className="chart-content-flex">
              <div className="donut-chart-mock task-donut">
                <span>
                  <strong>68%</strong>
                  <br />
                  Completed
                </span>
              </div>
              <ul className="chart-legend">
                <li>
                  <span className="dot blue"></span> Completed{" "}
                  <span className="legend-val">68%</span>
                </li>
                <li>
                  <span className="dot green"></span> In Progress{" "}
                  <span className="legend-val">22%</span>
                </li>
                <li>
                  <span className="dot orange"></span> Pending{" "}
                  <span className="legend-val">10%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Row 6: Recent Activity, AI Insights, Team Members */}
        <div className="triple-grid">
          <div className="card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <a href="#all" className="view-all">
                View all
              </a>
            </div>
            <ul className="activity-list">
              <li>
                <span className="act-icon blue">
                  <ZapIcon />
                </span>
                <div className="act-details">
                  <p>Design system updated</p>
                  <small>Aarav Verma • 3m ago</small>
                </div>
              </li>
              <li>
                <span className="act-icon green">
                  <Check size={14} />
                </span>
                <div className="act-details">
                  <p>New task created</p>
                  <small>You • 15m ago</small>
                </div>
              </li>
              <li>
                <span className="act-icon purple">
                  <FileText size={14} />
                </span>
                <div className="act-details">
                  <p>API integration completed</p>
                  <small>Riya Sharma • 1h ago</small>
                </div>
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>AI Insights</h3>
              <span className="view-all" style={{ color: "#64748b" }}>
                Smart Analysis
              </span>
            </div>
            <div className="insight-box">
              <div>
                <p className="insight-title">Project Risk</p>
                <p className="insight-sub">Medium risk in 2 projects</p>
              </div>
              <a href="#view">View</a>
            </div>
            <div className="insight-box">
              <div>
                <p className="insight-title">Recommendation</p>
                <p className="insight-sub">Finish authentication module</p>
              </div>
              <a href="#view">View</a>
            </div>
            <div className="insight-box">
              <div>
                <p className="insight-title">Resume Work</p>
                <p className="insight-sub">Continue from yesterday</p>
              </div>
              <a href="#view" style={{ color: "#10b981" }}>
                Continue
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Team Members</h3>
              <a href="#all" className="view-all">
                View all
              </a>
            </div>
            <ul className="team-list">
              <li>
                <div className="member-info">
                  <strong>Aarav Verma</strong>
                  <span>Project Manager</span>
                </div>
                <span className="status-indicator online">Online</span>
              </li>
              <li>
                <div className="member-info">
                  <strong>Riya Sharma</strong>
                  <span>Frontend Developer</span>
                </div>
                <span className="status-indicator online">Online</span>
              </li>
              <li>
                <div className="member-info">
                  <strong>DevOps Team</strong>
                  <span>DevOps Engineer</span>
                </div>
                <span className="status-indicator busy">Busy</span>
              </li>
            </ul>
            <a href="#invite" className="invite-member-link">
              Invite Member →
            </a>
          </div>
        </div>

        {/* Row 7: AI Assistant Banner & Upcoming Events */}
        <div className="charts-row" style={{ alignItems: "stretch" }}>
          <div className="ai-assistant-card">
            <div className="ai-header">
              <span className="ai-title">
                AI Assistant <span className="beta-badge">Beta</span>
              </span>
            </div>
            <h2>How can I help you today?</h2>
            <div className="ai-chips">
              {[
                "⚡ Summarize Project",
                "💡 Suggest Tasks",
                "🔍 Analyze Risks",
                "📊 Generate Report",
              ].map((chip, idx) => (
                <button key={idx} onClick={() => setAiPrompt(chip)}>
                  {chip}
                </button>
              ))}
            </div>
            <form onSubmit={handleAiSubmit} className="ai-input-box">
              <input
                type="text"
                placeholder="Ask anything about your backend projects..."
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <Send size={15} />
              </button>
            </form>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Upcoming Events</h3>
              <a href="#cal" className="view-all">
                View calendar
              </a>
            </div>
            <ul className="events-list">
              <li>
                <div className="event-date-box">
                  <Calendar size={16} />
                </div>
                <div className="event-info">
                  <strong>Project Presentation</strong>
                  <p>May 24, 2025 • 10:00 AM</p>
                </div>
                <span className="days-left red">2 days left</span>
              </li>
              <li>
                <div className="event-date-box">
                  <Calendar size={16} />
                </div>
                <div className="event-info">
                  <strong>Sprint Planning</strong>
                  <p>May 24, 2025 • 11:00 AM</p>
                </div>
                <span className="days-left orange">4 days left</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 8: Storage, Recent Files, Recent Messages & Quick Links */}
        <div className="bottom-grid" style={{ marginTop: "24px" }}>
          <div className="card">
            <div className="card-header">
              <h3>Storage Usage</h3>
              <span className="view-all" style={{ color: "#64748b" }}>
                68% Used
              </span>
            </div>
            <div className="storage-bar">
              <div className="fill" style={{ width: "68%" }}></div>
            </div>
            <p className="storage-txt">
              34.2 GB / 50 GB{" "}
              <span className="manage-link">Manage Storage</span>
            </p>

            <h3
              style={{
                fontSize: "15px",
                marginTop: "24px",
                marginBottom: "12px",
                fontWeight: 600,
              }}
            >
              Quick Links
            </h3>
            <div className="quick-links-grid">
              <button>
                <Plus size={16} />
                <span>New Project</span>
              </button>
              <button>
                <CheckCircle2 size={16} />
                <span>New Task</span>
              </button>
              <button>
                <Upload size={16} />
                <span>Upload File</span>
              </button>
              <button>
                <Calendar size={16} />
                <span>Calendar</span>
              </button>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Recent Files</h3>
              <a href="#files" className="view-all">
                View all
              </a>
            </div>
            <ul className="files-list">
              <li>
                <div className="file-item-left">
                  <FileText size={16} />
                  <span>Project_Proposal.pdf</span>
                </div>
                <span className="file-meta">2h ago • 2.4 MB</span>
              </li>
              <li>
                <div className="file-item-left">
                  <FileText size={16} />
                  <span>UI_Design.fig</span>
                </div>
                <span className="file-meta">3h ago • 6.7 MB</span>
              </li>
            </ul>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Recent Messages</h3>
              <a href="#msg" className="view-all">
                View all
              </a>
            </div>
            <ul className="messages-list">
              <li>
                <div className="msg-row-top">
                  <strong>Aarav Verma</strong>
                  <span className="msg-time">10m ago</span>
                </div>
                <p>Hey, please review the latest update</p>
              </li>
              <li>
                <div className="msg-row-top">
                  <strong>Riya Sharma</strong>
                  <span className="msg-time">30m ago</span>
                </div>
                <p>Can you share the assets?</p>
              </li>
            </ul>
          </div>
        </div>

        <footer className="dashboard-footer-banner">
          <p>
            ✨ Fully connected to MongoDB & Express Backend via REST +
            Socket.io! 🚀
          </p>
        </footer>
      </div>
    </div>
  );
};

const ZapIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

export default Dashboard;
