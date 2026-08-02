import React, { useState, useRef } from "react";
import {
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  ChevronDown,
  Calendar,
  MessageSquare,
  Paperclip,
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  FileText,
  Upload,
  Download,
  Trash2,
  FolderOpen,
} from "lucide-react";
import "./Kanban.css";

const Kanban = () => {
  const [selectedProject, setSelectedProject] = useState("ProjectHub Platform");
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSprintFilter, setActiveSprintFilter] = useState("This Sprint");

  // File Explorer state for Secure File Sharing
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "api-integration-specs.pdf",
      size: "2.4 MB",
      date: "May 26, 2026",
    },
    {
      id: 2,
      name: "system-architecture.docx",
      size: "1.1 MB",
      date: "May 28, 2026",
    },
  ]);
  const fileInputRef = useRef(null);

  // Interactive columns and tasks state
  const [columns, setColumns] = useState([
    {
      title: "Backlog",
      count: 3,
      tasks: [
        {
          id: 1,
          title: "Implement role-based access control",
          priority: "High",
          priorityColor: "red",
          assignee: "Rohit Singh",
          date: "May 28",
          tag: "Security",
          comments: 3,
          attachments: 2,
        },
        {
          id: 2,
          title: "Design system improvements",
          priority: "Medium",
          priorityColor: "orange",
          assignee: "Anjali Mehta",
          date: "May 30",
          tags: ["UI/UX", "Design"],
          comments: 2,
          attachments: 3,
        },
        {
          id: 3,
          title: "Analytics dashboard widgets",
          priority: "Low",
          priorityColor: "green",
          assignee: "Karan Verma",
          date: "Jun 2",
          tag: "Analytics",
          comments: 1,
          attachments: 2,
        },
      ],
    },
    {
      title: "In Progress",
      count: 3,
      tasks: [
        {
          id: 4,
          title: "API integration for GitHub sync",
          priority: "High",
          priorityColor: "red",
          assignee: "Sneha Iyer",
          date: "May 26",
          tags: ["Integration", "Backend"],
          progress: 60,
          members: 2,
          comments: 5,
          attachments: 4,
        },
        {
          id: 5,
          title: "Real-time notifications service",
          priority: "High",
          priorityColor: "red",
          assignee: "Vikram Patel",
          date: "May 27",
          tag: "Backend",
          progress: 45,
          members: 2,
          comments: 4,
          attachments: 2,
        },
        {
          id: 6,
          title: "Project activity timeline",
          priority: "Medium",
          priorityColor: "orange",
          assignee: "Priya Sharma",
          date: "May 29",
          tags: ["Frontend", "Dashboard"],
          progress: 30,
          members: 2,
          comments: 2,
          attachments: 3,
        },
      ],
    },
    {
      title: "Review",
      count: 3,
      tasks: [
        {
          id: 7,
          title: "Task CRUD optimizations",
          priority: "Medium",
          priorityColor: "orange",
          assignee: "Arjun Nair",
          date: "May 24",
          tag: "Backend",
          progress: 90,
          members: 2,
          comments: 2,
          attachments: 3,
        },
        {
          id: 8,
          title: "Code quality and refactoring",
          priority: "Low",
          priorityColor: "green",
          assignee: "Rohit Singh",
          date: "May 26",
          tag: "Refactor",
          progress: 70,
          members: 1,
          comments: 1,
          attachments: 2,
        },
        {
          id: 9,
          title: "Landing page redesign",
          priority: "Medium",
          priorityColor: "orange",
          assignee: "Anjali Mehta",
          date: "May 17",
          tags: ["UI/UX", "Frontend"],
          progress: 100,
          members: 1,
          comments: 6,
          attachments: 3,
        },
      ],
    },
    {
      title: "Completed",
      count: 2,
      hasImageBanner: true,
      tasks: [
        {
          id: 10,
          title: "User authentication module",
          priority: "High",
          priorityColor: "red",
          assignee: "Sneha Iyer",
          date: "May 18",
          tag: "Security",
          progress: 100,
          members: 1,
          comments: 4,
          attachments: 2,
        },
        {
          id: 11,
          title: "Database schema migration",
          priority: "High",
          priorityColor: "red",
          assignee: "Vikram Patel",
          date: "May 16",
          tag: "Database",
          progress: 100,
          members: 1,
          comments: 2,
          attachments: 4,
        },
      ],
    },
  ]);

  // Trigger system file explorer dialog
  const handleOpenExplorer = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection from system explorer
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newFiles = files.map((file, idx) => ({
        id: Date.now() + idx,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        date: "Just now",
      }));
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      alert(`Successfully uploaded ${files.length} file(s) via File Explorer!`);
    }
  };

  const handleDeleteFile = (id, e) => {
    e.stopPropagation();
    setUploadedFiles(uploadedFiles.filter((f) => f.id !== id));
  };

  const handleNewTask = () => {
    const taskTitle = prompt("Enter new task title:");
    if (!taskTitle) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: "Medium",
      priorityColor: "orange",
      assignee: "Current User",
      date: "Today",
      tag: "General",
      comments: 0,
      attachments: 0,
    };

    const updatedCols = [...columns];
    updatedCols[0].tasks.unshift(newTask);
    updatedCols[0].count += 1;
    setColumns(updatedCols);
  };

  const handleAddTaskToColumn = (colIndex) => {
    const taskTitle = prompt(`Enter task for ${columns[colIndex].title}:`);
    if (!taskTitle) return;

    const newTask = {
      id: Date.now(),
      title: taskTitle,
      priority: "Medium",
      priorityColor: "orange",
      assignee: "Team Member",
      date: "Today",
      tag: "Task",
      comments: 0,
      attachments: 0,
    };

    const updatedCols = [...columns];
    updatedCols[colIndex].tasks.push(newTask);
    updatedCols[colIndex].count += 1;
    setColumns(updatedCols);
  };

  const handleTaskClick = (task) => {
    alert(
      `Task Details:\nTitle: ${task.title}\nAssignee: ${task.assignee}\nPriority: ${task.priority}\nDue Date: ${task.date}`,
    );
  };

  const handleProjectSelect = (projectName) => {
    setSelectedProject(projectName);
    setShowProjectDropdown(false);
    alert(`Switched workspace to: ${projectName}`);
  };

  return (
    <div className="kanban-page">
      {/* Hidden file input that opens system file explorer */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        multiple
        onChange={handleFileChange}
      />

      {/* Top Header Bar */}
      <div className="kanban-top-bar">
        <div className="kanban-title-area">
          <h1>Kanban Workspace</h1>
          <p>
            Visualize your workflow, manage tasks and deliver projects
            efficiently.
          </p>
        </div>
        <div className="kanban-actions-area">
          <div
            className="project-selector-wrapper"
            style={{ position: "relative" }}
          >
            <div
              className="project-selector"
              onClick={() => setShowProjectDropdown(!showProjectDropdown)}
            >
              <span className="dot-avatar"></span>
              <span>{selectedProject}</span>
              <ChevronDown size={14} />
            </div>
            {showProjectDropdown && (
              <div className="dropdown-menu-custom">
                <div onClick={() => handleProjectSelect("ProjectHub Platform")}>
                  ProjectHub Platform
                </div>
                <div onClick={() => handleProjectSelect("Nova Mobile App")}>
                  Nova Mobile App
                </div>
                <div onClick={() => handleProjectSelect("AI Dashboard Core")}>
                  AI Dashboard Core
                </div>
              </div>
            )}
          </div>

          <div className="search-box-kanban">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="action-btn"
            onClick={() => alert("Filters modal opened!")}
          >
            <SlidersHorizontal size={14} /> Filters
          </button>

          <button
            className="action-btn"
            onClick={() => alert("Sorting options applied!")}
          >
            <ArrowUpDown size={14} /> Sort <ChevronDown size={12} />
          </button>

          <button className="primary-btn" onClick={handleNewTask}>
            <Plus size={16} /> New Task
          </button>
        </div>
      </div>

      {/* Overview Analytics Row */}
      <div className="kanban-overview-row">
        <div
          className="overview-card sprint-card"
          onClick={() => alert("Active Sprint 12 Details")}
        >
          <div className="sprint-header">
            <div>
              <span className="sprint-tag">Active Sprint</span>
              <h3>
                Sprint 12 <span className="status-badge">In Progress</span>
              </h3>
              <p>May 20 - Jun 3, 2024</p>
            </div>
            <Calendar size={18} className="text-gray" />
          </div>
          <div className="sprint-progress-bar">
            <div className="fill" style={{ width: "65%" }}></div>
          </div>
          <div className="sprint-footer">
            <span>18 days left</span>
            <span className="bold">65%</span>
          </div>
        </div>

        <div
          className="overview-card clickable-box"
          onClick={() => alert("Completed tasks analytics view")}
        >
          <span className="card-label">Tasks Completed</span>
          <div className="card-main-val">
            <h2>32 / 80</h2>
            <CheckCircle2 size={24} className="text-green" />
          </div>
          <span className="card-sub text-green">40% this sprint</span>
        </div>

        <div
          className="overview-card clickable-box"
          onClick={() => alert("Velocity report details")}
        >
          <span className="card-label">Team Velocity</span>
          <div className="card-main-val">
            <h2>42 pts</h2>
            <TrendingUp size={24} className="text-blue" />
          </div>
          <span className="card-sub text-blue">▲ 12% from last sprint</span>
        </div>

        <div
          className="overview-card clickable-box"
          onClick={() => alert("Team members directory opened")}
        >
          <span className="card-label">Active Members</span>
          <div className="card-main-val members-stack">
            <div className="avatars-group">
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <div className="avatar-circle"></div>
              <span className="more-count">+5</span>
            </div>
          </div>
          <span className="card-sub">12 Members</span>
        </div>

        <div className="overview-card activity-widget">
          <div className="widget-header">
            <h4>Team Activity</h4>
            <span
              className="link-text"
              onClick={() => alert("Opening full activity log...")}
            >
              View all
            </span>
          </div>
          <div className="activity-list">
            <div
              className="activity-item"
              onClick={() => alert("Activity item clicked")}
            >
              <div className="mini-dot blue"></div>
              <p>
                <strong>Sneha Iyer</strong> moved a task to{" "}
                <strong>In Progress</strong>
              </p>
            </div>
            <div
              className="activity-item"
              onClick={() => alert("Activity item clicked")}
            >
              <div className="mini-dot green"></div>
              <p>
                <strong>Rohit Singh</strong> completed{" "}
                <strong>User auth module</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Kanban Board Layout */}
      <div className="kanban-content-grid">
        <div className="kanban-columns-container">
          {columns.map((col, index) => (
            <div className="kanban-col" key={index}>
              <div className="col-header">
                <div className="col-title-group">
                  <h3>{col.title}</h3>
                  <span className="col-count">{col.tasks.length}</span>
                </div>
                <MoreHorizontal
                  size={16}
                  className="text-gray cursor-pointer"
                  onClick={() => alert(`${col.title} column options`)}
                />
              </div>

              {col.hasImageBanner && (
                <div
                  className="col-banner-img"
                  onClick={() => alert("Banner clicked!")}
                >
                  <div className="img-placeholder-banner"></div>
                </div>
              )}

              <div className="tasks-list">
                {col.tasks
                  .filter((task) =>
                    task.title
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                  )
                  .map((task) => (
                    <div
                      className="task-card"
                      key={task.id}
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="task-header-row">
                        <h4 className="task-title">{task.title}</h4>
                        <span
                          className={`priority-badge ${task.priorityColor}`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <div className="task-assignee-row">
                        <span className="assignee-avatar"></span>
                        <span className="assignee-name">{task.assignee}</span>
                        <span className="task-date">
                          <Clock size={12} /> {task.date}
                        </span>
                      </div>

                      {task.tag && (
                        <div className="task-tags-row">
                          <span className="kanban-tag">{task.tag}</span>
                        </div>
                      )}
                      {task.tags && (
                        <div className="task-tags-row">
                          {task.tags.map((t, i) => (
                            <span key={i} className="kanban-tag">
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      {task.progress !== undefined && (
                        <div className="task-prog-container">
                          <div className="kanban-prog-bar">
                            <div
                              className="fill"
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                          <span className="prog-percent">{task.progress}%</span>
                        </div>
                      )}

                      <div className="task-card-footer">
                        <div className="footer-left-icons">
                          {task.members && (
                            <span className="members-mini-group">
                              <Users size={12} /> +{task.members}
                            </span>
                          )}
                          {task.comments !== undefined && (
                            <span>
                              <MessageSquare size={12} /> {task.comments}
                            </span>
                          )}
                          {task.attachments !== undefined && (
                            <span
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenExplorer();
                              }}
                              title="Click to open explorer & attach files"
                              style={{ cursor: "pointer", color: "#2563eb" }}
                            >
                              <Paperclip size={12} /> {task.attachments}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <button
                className="add-task-row-btn"
                onClick={() => handleAddTaskToColumn(index)}
              >
                <Plus size={14} /> Add Task
              </button>
            </div>
          ))}
        </div>

        {/* Right Sidebar Widgets Column */}
        <div className="kanban-sidebar-widgets">
          <div className="side-widget-box">
            <div className="widget-header">
              <h4>Sprint Progress</h4>
              <span className="bold">65%</span>
            </div>
            <div className="sprint-progress-bar">
              <div className="fill" style={{ width: "65%" }}></div>
            </div>
            <div className="widget-sub-row">
              <span>32 / 80 tasks completed</span>
              <span>18 days left</span>
            </div>
            <div className="widget-sub-row">
              <span>Velocity: 42 pts</span>
              <span className="text-green">▲ 12%</span>
            </div>
          </div>

          <div className="side-widget-box">
            <div className="widget-header">
              <h4>Upcoming Deadlines</h4>
              <span
                className="link-text"
                onClick={() => alert("View all deadlines")}
              >
                View all
              </span>
            </div>
            <ul className="deadlines-list">
              <li
                onClick={() => alert("Deadline item clicked")}
                style={{ cursor: "pointer" }}
              >
                <span className="date-red">May 26</span>{" "}
                <p>API integration for GitHub sync</p>{" "}
                <span className="pri-red">High</span>
              </li>
              <li
                onClick={() => alert("Deadline item clicked")}
                style={{ cursor: "pointer" }}
              >
                <span className="date-red">May 27</span>{" "}
                <p>Real-time notifications service</p>{" "}
                <span className="pri-red">High</span>
              </li>
              <li
                onClick={() => alert("Deadline item clicked")}
                style={{ cursor: "pointer" }}
              >
                <span className="date-orange">May 29</span>{" "}
                <p>Project activity timeline</p>{" "}
                <span className="pri-orange">Medium</span>
              </li>
            </ul>
          </div>

          <div className="side-widget-box">
            <div className="widget-header">
              <h4>Project Statistics</h4>
              <span
                className="link-text"
                onClick={() =>
                  setActiveSprintFilter(
                    activeSprintFilter === "This Sprint"
                      ? "All Time"
                      : "This Sprint",
                  )
                }
              >
                {activeSprintFilter} <ChevronDown size={12} />
              </span>
            </div>
            <div className="stats-inline-grid">
              <div
                onClick={() => alert("Total Tasks: 80")}
                style={{ cursor: "pointer" }}
              >
                <span>Total Tasks</span>
                <h3>80</h3>
              </div>
              <div
                onClick={() => alert("Completed: 32")}
                style={{ cursor: "pointer" }}
              >
                <span>Completed</span>
                <h3 className="text-green">32</h3>
              </div>
              <div
                onClick={() => alert("In Progress: 5")}
                style={{ cursor: "pointer" }}
              >
                <span>In Progress</span>
                <h3 className="text-orange">5</h3>
              </div>
              <div
                onClick={() => alert("Blocked: 3")}
                style={{ cursor: "pointer" }}
              >
                <span>Blocked</span>
                <h3 className="text-red">3</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Horizontal Cards Grid with Working File Explorer */}
      <div className="kanban-bottom-row">
        <div
          className="bottom-card clickable-box"
          onClick={() => alert("Navigating to Sprint Planning...")}
        >
          <div className="bc-content">
            <span className="badge-sub">Sprint Planning</span>
            <h4>Plan sprints, set goals and track team commitments.</h4>
            <span className="link-action">
              View Sprint <ArrowRight size={14} />
            </span>
          </div>
          <div className="bc-img-holder"></div>
        </div>

        {/* Secure File Sharing Card - Directly opens explorer on click */}
        <div className="bottom-card clickable-box" onClick={handleOpenExplorer}>
          <div className="bc-content">
            <span className="badge-sub">Secure File Sharing</span>
            <h4>
              Click here to browse files & upload documents. (
              {uploadedFiles.length})
            </h4>
            <span className="link-action">
              <FolderOpen size={14} /> Open Explorer <Upload size={12} />
            </span>
          </div>
          <div className="bc-img-holder file-preview-box">
            <FileText size={24} color="#2563eb" />
          </div>
        </div>

        <div
          className="bottom-card clickable-box"
          onClick={() => alert("Opening Real-time Collaboration tool...")}
        >
          <div className="bc-content">
            <span className="badge-sub">Real-time Collaboration</span>
            <h4>Work together in real-time and stay in sync.</h4>
            <span className="link-action">
              Start Collaborating <ArrowRight size={14} />
            </span>
          </div>
          <div className="bc-img-holder"></div>
        </div>

        <div
          className="bottom-card clickable-box"
          onClick={() => alert("Opening Analytics & Reports...")}
        >
          <div className="bc-content">
            <span className="badge-sub">Analytics & Reports</span>
            <h4>Get insights and track team performance.</h4>
            <span className="link-action">
              View Reports <ArrowRight size={14} />
            </span>
          </div>
          <div className="bc-img-holder"></div>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
