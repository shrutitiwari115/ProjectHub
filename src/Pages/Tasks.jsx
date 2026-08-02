import React, { useState, useRef } from "react";
import {
  Plus,
  SlidersHorizontal,
  Search,
  Star,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  FolderOpen,
  Upload,
  ArrowRight,
} from "lucide-react";
import "./Tasks.css";

const Tasks = () => {
  const [selectedProject, setSelectedProject] = useState("All Projects");
  const [showProjDrop, setShowProjDrop] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [currentPage, setCurrentPage] = useState(1);

  const fileInputRef = useRef(null);

  const [tasks, setTasks] = useState([
    {
      id: 1,
      starred: false,
      title: "Design authentication flow",
      description: "Create user login and signup flow",
      project: "ProjectHub Platform",
      assignee: "Rohit Singh",
      priority: "High",
      status: "In Progress",
      dueDate: "May 25, 2024",
      progress: 75,
    },
    {
      id: 2,
      starred: true,
      title: "API integration for GitHub",
      description: "Integrate GitHub API for repos",
      project: "ProjectHub Platform",
      assignee: "Sneha Iyer",
      priority: "High",
      status: "In Progress",
      dueDate: "May 26, 2024",
      progress: 60,
    },
    {
      id: 3,
      starred: false,
      title: "Database schema migration",
      description: "Update database for new features",
      project: "Backend Services",
      assignee: "Vikram Patel",
      priority: "Medium",
      status: "In Review",
      dueDate: "May 27, 2024",
      progress: 90,
    },
    {
      id: 4,
      starred: false,
      title: "Landing page redesign",
      description: "Improve UI/UX for landing page",
      project: "Marketing Website",
      assignee: "Anjali Mehta",
      priority: "Medium",
      status: "In Progress",
      dueDate: "May 28, 2024",
      progress: 40,
    },
    {
      id: 5,
      starred: true,
      title: "Real-time notifications",
      description: "Implement real-time updates",
      project: "Backend Services",
      assignee: "Karan Verma",
      priority: "High",
      status: "To Do",
      dueDate: "May 29, 2024",
      progress: 0,
    },
    {
      id: 6,
      starred: false,
      title: "Mobile responsiveness",
      description: "Optimize for all mobile devices",
      project: "Marketing Website",
      assignee: "Priya Sharma",
      priority: "Low",
      status: "To Do",
      dueDate: "May 30, 2024",
      progress: 0,
    },
    {
      id: 7,
      starred: false,
      title: "User dashboard analytics",
      description: "Create analytics dashboard",
      project: "ProjectHub Platform",
      assignee: "Arjun Nair",
      priority: "High",
      status: "In Progress",
      dueDate: "May 31, 2024",
      progress: 80,
    },
    {
      id: 8,
      starred: false,
      title: "File upload functionality",
      description: "Secure file upload for projects",
      project: "Backend Services",
      assignee: "Neha Gupta",
      priority: "Medium",
      status: "In Review",
      dueDate: "Jun 2, 2024",
      progress: 65,
    },
    {
      id: 9,
      starred: false,
      title: "Email notifications",
      description: "Implement email alerts",
      project: "Backend Services",
      assignee: "Rohit Singh",
      priority: "Low",
      status: "To Do",
      dueDate: "Jun 3, 2024",
      progress: 0,
    },
    {
      id: 10,
      starred: false,
      title: "CI/CD pipeline setup",
      description: "Setup automated deployment",
      project: "DevOps Pipeline",
      assignee: "Vikram Patel",
      priority: "High",
      status: "To Do",
      dueDate: "Jun 4, 2024",
      progress: 0,
    },
  ]);

  const handleStarToggle = (id, e) => {
    e.stopPropagation();
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, starred: !t.starred } : t)),
    );
  };

  const handleNewTask = () => {
    const title = prompt("Enter Task Title:");
    if (!title) return;
    const desc = prompt("Enter Task Description:") || "";
    const assignee = prompt("Assignee Name:") || "Rohit Singh";

    const newTask = {
      id: Date.now(),
      starred: false,
      title,
      description: desc,
      project:
        selectedProject === "All Projects"
          ? "ProjectHub Platform"
          : selectedProject,
      assignee,
      priority: "Medium",
      status: "To Do",
      dueDate: "Today",
      progress: 0,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleFileExplorerOpen = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.assignee.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.project.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "My Tasks" || activeTab === "Assigned to Me")
      return task.assignee === "Rohit Singh";
    if (activeTab === "Starred") return task.starred;
    return true;
  });

  return (
    <div className="tasks-page">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={() => alert("Files selected successfully!")}
      />

      {/* Top Header & Actions Row */}
      <div className="tasks-header-row">
        <div className="tasks-title-box">
          <h1>Tasks</h1>
          <p>Organize, prioritize and track all tasks across your projects.</p>
        </div>

        <div className="tasks-top-actions-right">
          <div className="dropdown-container">
            <button
              className="top-filter-btn"
              onClick={() => setShowProjDrop(!showProjDrop)}
            >
              <FolderOpen size={14} /> {selectedProject}{" "}
              <ChevronDown size={14} />
            </button>
            {showProjDrop && (
              <div className="dropdown-menu">
                <div
                  onClick={() => {
                    setSelectedProject("All Projects");
                    setShowProjDrop(false);
                  }}
                >
                  All Projects
                </div>
                <div
                  onClick={() => {
                    setSelectedProject("ProjectHub Platform");
                    setShowProjDrop(false);
                  }}
                >
                  ProjectHub Platform
                </div>
                <div
                  onClick={() => {
                    setSelectedProject("Backend Services");
                    setShowProjDrop(false);
                  }}
                >
                  Backend Services
                </div>
                <div
                  onClick={() => {
                    setSelectedProject("Marketing Website");
                    setShowProjDrop(false);
                  }}
                >
                  Marketing Website
                </div>
              </div>
            )}
          </div>

          <div className="tasks-search-box">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search tasks by title, assignee or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="top-action-btn"
            onClick={() => alert("Filters opened")}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>

          <button
            className="top-action-btn"
            onClick={() => alert("Group options")}
          >
            Group by: <ChevronDown size={12} />
          </button>

          <button
            className="top-action-btn"
            onClick={() => alert("Sort options")}
          >
            Sort: <ChevronDown size={12} />
          </button>

          <button className="primary-btn-task" onClick={handleNewTask}>
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* Metrics Header Cards */}
      <div className="metrics-grid">
        <div className="metric-card" onClick={() => alert("Total Tasks")}>
          <div className="metric-top">
            <span className="metric-label">Total Tasks</span>
            <div className="metric-icon-box blue">
              <Calendar size={16} />
            </div>
          </div>
          <h2>128</h2>
          <span className="metric-trend text-green">↑ 12% from last month</span>
        </div>
        <div className="metric-card" onClick={() => alert("To Do")}>
          <div className="metric-top">
            <span className="metric-label">To Do</span>
            <div className="metric-icon-box purple">
              <div className="circle-dot"></div>
            </div>
          </div>
          <h2>32</h2>
        </div>
        <div className="metric-card" onClick={() => alert("In Progress")}>
          <div className="metric-top">
            <span className="metric-label">In Progress</span>
            <div className="metric-icon-box orange">
              <div className="circle-dot"></div>
            </div>
          </div>
          <h2>48</h2>
        </div>
        <div className="metric-card" onClick={() => alert("In Review")}>
          <div className="metric-top">
            <span className="metric-label">In Review</span>
            <div className="metric-icon-box indigo">
              <div className="circle-dot"></div>
            </div>
          </div>
          <h2>18</h2>
        </div>
        <div className="metric-card" onClick={() => alert("Completed")}>
          <div className="metric-top">
            <span className="metric-label">Completed</span>
            <div className="metric-icon-box green">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <h2>30</h2>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="tasks-main-layout">
        {/* Left Side: Table & Tabs */}
        <div className="tasks-table-section">
          <div className="tasks-tabs">
            {["All Tasks", "My Tasks", "Assigned to Me", "Starred"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <div className="table-wrapper">
            <table className="custom-tasks-table">
              <thead>
                <tr>
                  <th style={{ width: "30px" }}></th>
                  <th>Task</th>
                  <th>Project</th>
                  <th>Assignee</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Progress</th>
                  <th style={{ textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr
                    key={task.id}
                    onClick={() => alert(`Clicked task: ${task.title}`)}
                  >
                    <td>
                      <button
                        className="star-btn"
                        onClick={(e) => handleStarToggle(task.id, e)}
                      >
                        <Star
                          size={15}
                          fill={task.starred ? "#eab308" : "none"}
                          color={task.starred ? "#eab308" : "#94a3b8"}
                        />
                      </button>
                    </td>
                    <td>
                      <div className="task-cell-title">
                        <strong>{task.title}</strong>
                        <span>{task.description}</span>
                      </div>
                    </td>
                    <td>
                      <span className="proj-badge">{task.project}</span>
                    </td>
                    <td>
                      <div className="assignee-cell">
                        <div className="mini-avatar"></div>
                        <span>{task.assignee}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`priority-pill ${task.priority.toLowerCase()}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-pill ${task.status.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td>
                      <span className="date-text">
                        <Calendar size={11} /> {task.dueDate}
                      </span>
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="prog-track">
                          <div
                            className="prog-fill"
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                        <span>{task.progress}%</span>
                      </div>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <button
                        className="action-dots-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          alert("Options");
                        }}
                      >
                        <MoreHorizontal size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-pagination-footer">
            <span>Showing 1 to {filteredTasks.length} of 128 tasks</span>
            <div className="pagination-controls">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span>...</span>
              <button className="page-btn">13</button>
              <button className="page-nav-btn">
                <ChevronRight size={13} />
              </button>
            </div>
            <div className="rows-per-page">
              <span>10 / page</span> <ChevronDown size={11} />
            </div>
          </div>
        </div>

        {/* Right Side Widgets */}
        <div className="tasks-sidebar-widgets">
          <div className="widget-box">
            <div className="widget-top-head">
              <h3>Task Overview</h3>
              <span className="dropdown-link">
                This Week <ChevronDown size={11} />
              </span>
            </div>
            <div className="overview-chart-row">
              <div className="donut-placeholder">
                <h2>128</h2>
                <span>Total Tasks</span>
              </div>
              <div className="donut-legend">
                <div>
                  <span className="dot purple"></span> To Do <b>32 (25%)</b>
                </div>
                <div>
                  <span className="dot orange"></span> In Progress{" "}
                  <b>48 (37%)</b>
                </div>
                <div>
                  <span className="dot indigo"></span> In Review <b>18 (14%)</b>
                </div>
                <div>
                  <span className="dot green"></span> Completed <b>30 (24%)</b>
                </div>
              </div>
            </div>
          </div>

          <div className="widget-box">
            <div className="widget-top-head">
              <h3>Upcoming Deadlines</h3>
              <span className="link-action-text">View all</span>
            </div>
            <ul className="deadline-items-list">
              <li>
                <span className="due-date-red">May 25</span>
                <p>Design authentication flow</p>
                <span className="pri-badge-red">High</span>
              </li>
              <li>
                <span className="due-date-red">May 26</span>
                <p>API integration for GitHub</p>
                <span className="pri-badge-red">High</span>
              </li>
              <li>
                <span className="due-date-orange">May 27</span>
                <p>Database schema migration</p>
                <span className="pri-badge-orange">Medium</span>
              </li>
              <li>
                <span className="due-date-orange">May 28</span>
                <p>Landing page redesign</p>
                <span className="pri-badge-orange">Medium</span>
              </li>
              <li>
                <span className="due-date-red">May 29</span>
                <p>Real-time notifications</p>
                <span className="pri-badge-red">High</span>
              </li>
            </ul>
          </div>

          <div className="widget-box">
            <div className="widget-top-head">
              <h3>My Tasks</h3>
              <span className="link-action-text">View all</span>
            </div>
            <div className="my-tasks-summary-grid">
              <div>
                <h2>12</h2>
                <span>Assigned to me</span>
              </div>
              <div>
                <h2 className="text-orange">5</h2>
                <span>In Progress</span>
              </div>
              <div>
                <h2 className="text-red">3</h2>
                <span>Due this week</span>
              </div>
            </div>
          </div>

          <div className="widget-box">
            <div className="widget-top-head">
              <h3>Recent Activity</h3>
              <span className="link-action-text">View all</span>
            </div>
            <div className="activity-stream">
              <div className="activity-row">
                <div className="act-avatar"></div>
                <div className="act-text">
                  <p>
                    <strong>Sneha Iyer</strong> updated task progress
                  </p>
                  <span>API integration for GitHub</span>
                  <small>2 min ago</small>
                </div>
              </div>
              <div className="activity-row">
                <div className="act-avatar"></div>
                <div className="act-text">
                  <p>
                    <strong>Rohit Singh</strong> completed a task
                  </p>
                  <span>User authentication module</span>
                  <small>15 min ago</small>
                </div>
              </div>
              <div className="activity-row">
                <div className="act-avatar"></div>
                <div className="act-text">
                  <p>
                    <strong>Anjali Mehta</strong> commented on task
                  </p>
                  <span>Landing page redesign</span>
                  <small>30 min ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Photo Promo Cards Grid */}
      <div className="tasks-bottom-cards-grid">
        <div
          className="bottom-promo-card"
          onClick={() => alert("AI Task Suggestions")}
        >
          <div className="promo-text">
            <span className="sub-badge">AI Task Suggestions</span>
            <h4>
              Get smart task recommendations based on your project context.
            </h4>
            <span className="action-link-text">
              View Suggestions <ArrowRight size={13} />
            </span>
          </div>
          <div
            className="promo-img-box"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80')`,
            }}
          ></div>
        </div>

        <div
          className="bottom-promo-card"
          onClick={() => alert("Smart Prioritization")}
        >
          <div className="promo-text">
            <span className="sub-badge">Smart Prioritization</span>
            <h4>AI-powered priority scoring to focus on what matters.</h4>
            <span className="action-link-text">
              Learn More <ArrowRight size={13} />
            </span>
          </div>
          <div
            className="promo-img-box"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80')`,
            }}
          ></div>
        </div>

        <div className="bottom-promo-card" onClick={handleFileExplorerOpen}>
          <div className="promo-text">
            <span className="sub-badge">Secure File Sharing</span>
            <h4>Share files, documents and resources securely.</h4>
            <span className="action-link-text">
              <FolderOpen size={13} /> Open Files <Upload size={11} />
            </span>
          </div>
          <div
            className="promo-img-box"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80')`,
            }}
          ></div>
        </div>

        <div
          className="bottom-promo-card"
          onClick={() => alert("Team Collaboration")}
        >
          <div className="promo-text">
            <span className="sub-badge">Team Collaboration</span>
            <h4>Real-time collaboration and task discussions.</h4>
            <span className="action-link-text">
              Start Collaborating <ArrowRight size={13} />
            </span>
          </div>
          <div
            className="promo-img-box"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80')`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
