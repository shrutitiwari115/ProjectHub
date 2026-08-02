import React, { useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Calendar,
  MessageSquare,
  CheckCircle2,
  FolderOpen,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  Check,
  X,
} from "lucide-react";
import "./Team.css";

const Team = () => {
  const [activeTab, setActiveTab] = useState("All Members");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWeek, setSelectedWeek] = useState("This Week");

  const teamMembers = [
    {
      id: 1,
      name: "Rohit Singh",
      role: "Frontend Developer",
      status: "Online",
      projects: 4,
      completedTasks: 32,
      workload: 75,
      availability: "Available",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 2,
      name: "Sneha Iyer",
      role: "Backend Developer",
      status: "Online",
      projects: 3,
      completedTasks: 28,
      workload: 65,
      availability: "Available",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      name: "Anjali Mehta",
      role: "UI/UX Designer",
      status: "In Meeting",
      projects: 2,
      completedTasks: 18,
      workload: 50,
      availability: "In Meeting",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      name: "Vikram Patel",
      role: "DevOps Engineer",
      status: "Online",
      projects: 3,
      completedTasks: 24,
      workload: 70,
      availability: "Available",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 5,
      name: "Priya Sharma",
      role: "QA Engineer",
      status: "Online",
      projects: 2,
      completedTasks: 20,
      workload: 60,
      availability: "Available",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 6,
      name: "Karan Verma",
      role: "Project Manager",
      status: "Online",
      projects: 5,
      completedTasks: 40,
      workload: 80,
      availability: "Available",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
  ];

  const filteredMembers = teamMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (activeTab === "Developers")
      return (
        member.role.toLowerCase().includes("developer") ||
        member.role.toLowerCase().includes("devops")
      );
    if (activeTab === "Designers")
      return member.role.toLowerCase().includes("designer");
    if (activeTab === "Managers")
      return member.role.toLowerCase().includes("manager");
    if (activeTab === "QA") return member.role.toLowerCase().includes("qa");
    if (activeTab === "DevOps")
      return member.role.toLowerCase().includes("devops");
    return true;
  });

  return (
    <div className="team-workspace-page">
      {/* Top Header Row */}
      <div className="team-header-row">
        <div className="team-title-box">
          <h1>Team Workspace</h1>
          <p>
            Manage members, roles, collaboration and productivity from one
            place.
          </p>
        </div>
        <div className="team-top-actions">
          <button
            className="secondary-action-btn"
            onClick={() => alert("Invite Members modal opened")}
          >
            <UserPlus size={15} /> Invite Members
          </button>
          <button
            className="primary-action-btn"
            onClick={() => alert("Add New Member modal opened")}
          >
            <Users size={15} /> + Add New Member
          </button>
        </div>
      </div>

      {/* Metrics Banner Cards */}
      <div className="team-metrics-grid">
        <div className="team-metric-card">
          <span className="metric-title">Total Members</span>
          <h2>24</h2>
          <span className="trend-text green">↑ 12% from last month</span>
        </div>
        <div className="team-metric-card">
          <span className="metric-title">Active Today</span>
          <h2>18</h2>
          <span className="trend-text green">↑ 8% from yesterday</span>
        </div>
        <div className="team-metric-card">
          <span className="metric-title">Online Now</span>
          <h2>8</h2>
          <div className="avatar-cluster">
            <div
              className="mini-av"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80')`,
              }}
            ></div>
            <div
              className="mini-av"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80')`,
              }}
            ></div>
            <div
              className="mini-av"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80')`,
              }}
            ></div>
            <div className="mini-av more">+3</div>
          </div>
        </div>
        <div className="team-metric-card">
          <span className="metric-title">Teams</span>
          <h2>6</h2>
          <span className="link-text">View all teams →</span>
        </div>
        <div className="team-metric-card">
          <span className="metric-title">Productivity Score</span>
          <h2>92%</h2>
          <span className="trend-text green">↑ 7% from last week</span>
        </div>
      </div>

      {/* Main Content Layout Grid */}
      <div className="team-main-layout">
        {/* Left Side Section */}
        <div className="team-left-content">
          {/* Members Navigation Tabs & Search */}
          <div className="members-filter-bar">
            <div className="members-tabs">
              {[
                "All Members",
                "Developers",
                "Designers",
                "Managers",
                "QA",
                "DevOps",
              ].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="filter-search-right">
              <div className="search-box">
                <Search size={14} className="ico" />
                <input
                  type="text"
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="filter-btn"
                onClick={() => alert("Filter clicked")}
              >
                <Filter size={14} /> Filter
              </button>
            </div>
          </div>

          {/* Members Card Grid */}
          <div className="members-grid">
            {filteredMembers.map((member) => (
              <div className="member-card" key={member.id}>
                <div
                  className="member-banner-img"
                  style={{ backgroundImage: `url('${member.image}')` }}
                >
                  <span
                    className={`status-pill-badge ${member.status === "Online" ? "online" : "busy"}`}
                  >
                    {member.status}
                  </span>
                </div>

                <div className="member-card-body">
                  <h3>{member.name}</h3>
                  <p className="role-sub">{member.role}</p>

                  <div className="member-stats-row">
                    <div>
                      <span>Projects</span>
                      <strong>{member.projects}</strong>
                    </div>
                    <div>
                      <span>Completed Tasks</span>
                      <strong>{member.completedTasks}</strong>
                    </div>
                  </div>

                  <div className="workload-section">
                    <div className="wl-top">
                      <span>Workload</span>
                      <strong
                        className={member.workload > 75 ? "text-red" : ""}
                      >
                        {member.workload}%
                      </strong>
                    </div>
                    <div className="track">
                      <div
                        className="fill"
                        style={{ width: `${member.workload}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="availability-row">
                    <span>Availability</span>
                    <span
                      className={`avail-tag ${member.availability === "Available" ? "green" : "orange"}`}
                    >
                      {member.availability}
                    </span>
                  </div>

                  <div className="member-card-footer">
                    <button
                      className="icon-btn"
                      onClick={() => alert(`Email ${member.name}`)}
                    >
                      <Calendar size={13} />
                    </button>
                    <button
                      className="icon-btn"
                      onClick={() => alert(`Chat with ${member.name}`)}
                    >
                      <MessageSquare size={13} />
                    </button>
                    <button
                      className="view-profile-btn"
                      onClick={() => alert(`Viewing profile of ${member.name}`)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Performance & Contribution Overview */}
          <div className="analytics-section-grid">
            <div className="analytics-box">
              <div className="box-header">
                <h3>Team Performance</h3>
                <span className="dropdown-link">
                  {selectedWeek} <ChevronDown size={11} />
                </span>
              </div>
              <ul className="perf-list">
                <li>
                  <span>
                    <TrendingUp size={14} /> Productivity
                  </span>{" "}
                  <b>92%</b> <span className="green">↑ 7%</span>
                </li>
                <li>
                  <span>
                    <CheckCircle2 size={14} /> Task Completion
                  </span>{" "}
                  <b>85%</b> <span className="green">↑ 10%</span>
                </li>
                <li>
                  <span>
                    <Award size={14} /> Sprint Participation
                  </span>{" "}
                  <b>78%</b> <span className="green">↑ 5%</span>
                </li>
                <li>
                  <span>
                    <Clock size={14} /> Attendance
                  </span>{" "}
                  <b>96%</b> <span className="green">↑ 2%</span>
                </li>
              </ul>
            </div>

            <div className="analytics-box">
              <div className="box-header">
                <h3>Contribution Overview</h3>
                <span className="dropdown-link">
                  {selectedWeek} <ChevronDown size={11} />
                </span>
              </div>
              <div className="bar-chart-mock">
                <div className="bars-container">
                  {[65, 85, 45, 90, 75, 60, 80].map((val, idx) => (
                    <div className="bar-group" key={idx}>
                      <div
                        className="bar fill-blue"
                        style={{ height: `${val}%` }}
                      ></div>
                      <div
                        className="bar fill-light"
                        style={{ height: `${val * 0.6}%` }}
                      ></div>
                      <span className="day-lbl">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][idx]}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="chart-legend">
                  <span>
                    <i className="dot blue"></i> Tasks Completed
                  </span>
                  <span>
                    <i className="dot light"></i> Pull Requests
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration & Tools Bottom Cards */}
          <div className="collab-tools-grid">
            <div
              className="collab-card"
              onClick={() => alert("Secure File Sharing")}
            >
              <div className="c-text">
                <span className="badge-blue">Secure File Sharing</span>
                <h4>Share files, documents and resources securely.</h4>
                <span className="link-act">Open Files →</span>
              </div>
              <div
                className="c-img"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80')`,
                }}
              ></div>
            </div>

            <div
              className="collab-card"
              onClick={() => alert("Real-time Collaboration")}
            >
              <div className="c-text">
                <span className="badge-blue">Real-time Collaboration</span>
                <h4>Collaborate in real-time with your team.</h4>
                <span className="link-act">Start Collaborating →</span>
              </div>
              <div
                className="c-img"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80')`,
                }}
              ></div>
            </div>

            <div
              className="collab-card"
              onClick={() => alert("Sprint Planning")}
            >
              <div className="c-text">
                <span className="badge-blue">Sprint Planning</span>
                <h4>Plan sprints, set goals and track commitments.</h4>
                <span className="link-act">Plan Sprint →</span>
              </div>
              <div
                className="c-img"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80')`,
                }}
              ></div>
            </div>

            <div
              className="collab-card"
              onClick={() => alert("Kanban Integration")}
            >
              <div className="c-text">
                <span className="badge-blue">Kanban Integration</span>
                <h4>Visualize workflow and track progress.</h4>
                <span className="link-act">Open Kanban →</span>
              </div>
              <div
                className="c-img"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80')`,
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="team-right-sidebar">
          {/* Upcoming Meetings */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Upcoming Meetings</h3>
              <span className="link">View all</span>
            </div>
            <ul className="meeting-list">
              <li>
                <div>
                  <strong>Sprint Planning</strong>
                  <span>May 25, 10:00 AM</span>
                </div>
                <div className="mini-avs">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div className="av more">+6</div>
                </div>
              </li>
              <li>
                <div>
                  <strong>Project Review</strong>
                  <span>May 26, 2:30 PM</span>
                </div>
                <div className="mini-avs">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div className="av more">+4</div>
                </div>
              </li>
              <li>
                <div>
                  <strong>Retrospective</strong>
                  <span>May 28, 11:00 AM</span>
                </div>
                <div className="mini-avs">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div className="av more">+5</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Team Chat */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Team Chat</h3>
              <span className="link">View all</span>
            </div>
            <ul className="chat-channels">
              <li>
                <div>
                  <span className="channel-title"># project-updates</span>
                  <p>Rohit: Pushed the latest changes...</p>
                </div>
                <span className="time">2m ago</span>
              </li>
              <li>
                <div>
                  <span className="channel-title"># design-system</span>
                  <p>Anjali: Updated the Figma library</p>
                </div>
                <span className="time">10m ago</span>
              </li>
              <li>
                <div>
                  <span className="channel-title"># dev-team</span>
                  <p>Vikram: CI/CD pipeline is fixed</p>
                </div>
                <span className="time">15m ago</span>
              </li>
              <li>
                <div>
                  <span className="channel-title"># general</span>
                  <p>Sneha: Good morning team! 😊</p>
                </div>
                <span className="time">1h ago</span>
              </li>
            </ul>
          </div>

          {/* Recent Activity */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Recent Activity</h3>
              <span className="link">View all</span>
            </div>
            <div className="act-list-side">
              <div className="act-row">
                <div className="dot-av"></div>
                <div>
                  <p>
                    <strong>Rohit Singh</strong> completed API integration
                  </p>
                  <span>10m ago</span>
                </div>
              </div>
              <div className="act-row">
                <div className="dot-av"></div>
                <div>
                  <p>
                    <strong>Sneha Iyer</strong> pushed 3 commits
                  </p>
                  <span>25m ago</span>
                </div>
              </div>
              <div className="act-row">
                <div className="dot-av"></div>
                <div>
                  <p>
                    <strong>Anjali Mehta</strong> updated design system
                  </p>
                  <span>1h ago</span>
                </div>
              </div>
              <div className="act-row">
                <div className="dot-av"></div>
                <div>
                  <p>
                    <strong>Vikram Patel</strong> deployed to production
                  </p>
                  <span>2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Birthdays */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Birthdays</h3>
              <span className="link">View all</span>
            </div>
            <ul className="birthday-list">
              <li>
                <div className="user-info-row">
                  <div
                    className="mini-av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Anjali Mehta</span>
                </div>
                <span className="date-badge">May 25</span>
              </li>
              <li>
                <div className="user-info-row">
                  <div
                    className="mini-av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Karan Verma</span>
                </div>
                <span className="date-badge">May 29</span>
              </li>
            </ul>
          </div>

          {/* Join Requests */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Join Requests</h3>
              <span className="link">View all</span>
            </div>
            <div className="request-list">
              <div className="req-item">
                <div className="req-user">
                  <div
                    className="mini-av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div>
                    <strong>Arjun Nair</strong>
                    <span>Frontend Developer</span>
                  </div>
                </div>
                <div className="req-actions">
                  <button className="approve">
                    <Check size={12} />
                  </button>
                  <button className="reject">
                    <X size={12} />
                  </button>
                </div>
              </div>
              <div className="req-item">
                <div className="req-user">
                  <div
                    className="mini-av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80')`,
                    }}
                  ></div>
                  <div>
                    <strong>Neha Gupta</strong>
                    <span>UI/UX Designer</span>
                  </div>
                </div>
                <div className="req-actions">
                  <button className="approve">
                    <Check size={12} />
                  </button>
                  <button className="reject">
                    <X size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
