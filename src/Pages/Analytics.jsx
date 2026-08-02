import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Filter,
  ChevronDown,
  Clock,
  AlertCircle,
} from "lucide-react";
import "./Analytics.css";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("30D");
  const [subTimeRange, setSubTimeRange] = useState("This Week");

  // Interactive Click Handlers
  const handleDateFilter = () => {
    alert("Date range picker clicked! (Aap yahan date modal khol sakte hain)");
  };

  const handleFilters = () => {
    alert("Filters clicked! (Aap yahan filter options toggle kar sakte hain)");
  };

  const handleViewAll = (sectionName) => {
    alert(`Navigating to view all for: ${sectionName}`);
  };

  const handleProjectClick = (projectName) => {
    navigate("/projects");
  };

  const handleAIInsights = () => {
    alert("Opening AI Insights Modal & Optimization Recommendations...");
  };

  return (
    <div className="analytics-page">
      {/* Top Header Row */}
      <div className="analytics-header-row">
        <div className="analytics-title-box">
          <h1>Analytics</h1>
          <p>
            Track project performance, team productivity and key metrics in
            real-time.
          </p>
        </div>
        <div className="analytics-top-filters">
          <button className="date-filter-btn" onClick={handleDateFilter}>
            <Calendar size={14} /> May 20 - Jun 3, 2024{" "}
            <ChevronDown size={13} />
          </button>
          <button className="filter-action-btn" onClick={handleFilters}>
            <Filter size={14} /> Filters
          </button>
        </div>
      </div>

      {/* Top 5 Metrics Cards */}
      <div className="analytics-metrics-grid">
        <div
          className="a-metric-card"
          onClick={() => handleViewAll("Total Projects")}
          style={{ cursor: "pointer" }}
        >
          <span className="m-title">Total Projects</span>
          <h2>18</h2>
          <span className="trend green">↑ 12% from last month</span>
        </div>
        <div
          className="a-metric-card"
          onClick={() => handleViewAll("Tasks Completed")}
          style={{ cursor: "pointer" }}
        >
          <span className="m-title">Tasks Completed</span>
          <h2>342</h2>
          <span className="trend green">↑ 18% from last month</span>
        </div>
        <div className="a-metric-card">
          <span className="m-title">Completion Rate</span>
          <h2>78.4%</h2>
          <span className="trend green">↑ 8% from last month</span>
        </div>
        <div className="a-metric-card">
          <span className="m-title">Team Productivity</span>
          <h2>92.6%</h2>
          <span className="trend green">↑ 15% from last month</span>
        </div>
        <div
          className="a-metric-card"
          onClick={() => navigate("/projects")}
          style={{ cursor: "pointer" }}
        >
          <span className="m-title">On Track Projects</span>
          <h2>14</h2>
          <span className="trend green">↑ 7% from last month</span>
        </div>
      </div>

      {/* Main Grid Layout (Left Content + Right Sidebar) */}
      <div className="analytics-main-layout">
        {/* Left Section */}
        <div className="analytics-left-content">
          {/* Row 1: Project Overview & Task Status Distribution */}
          <div className="grid-row-2col">
            {/* Project Overview Line Chart */}
            <div className="analytic-box">
              <div className="box-header">
                <h3>Project Overview</h3>
                <div className="time-tabs">
                  {["7D", "30D", "90D", "1Y"].map((tab) => (
                    <span
                      key={tab}
                      className={`t-tab ${timeRange === tab ? "active" : ""}`}
                      onClick={() => setTimeRange(tab)}
                    >
                      {tab}
                    </span>
                  ))}
                </div>
              </div>
              <div className="legend-row">
                <span>
                  <i className="dot blue"></i> Completed
                </span>
                <span>
                  <i className="dot cyan"></i> In Progress
                </span>
                <span>
                  <i className="dot gray"></i> Not Started
                </span>
              </div>
              <div className="chart-box-large">
                <svg
                  className="overview-svg"
                  viewBox="0 0 400 160"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 10 120 Q 100 100, 200 90 T 380 75"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="2"
                  />
                  <path
                    d="M 10 95 Q 100 70, 200 55 T 380 35"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2.5"
                  />
                  <circle cx="10" cy="95" r="3.5" fill="#3b82f6" />
                  <circle cx="100" cy="75" r="3.5" fill="#3b82f6" />
                  <circle cx="200" cy="55" r="3.5" fill="#3b82f6" />
                  <circle cx="300" cy="45" r="3.5" fill="#3b82f6" />
                  <circle cx="380" cy="35" r="3.5" fill="#3b82f6" />
                </svg>
                <div className="x-axis">
                  <span>May 20</span>
                  <span>May 22</span>
                  <span>May 24</span>
                  <span>May 26</span>
                  <span>May 28</span>
                  <span>May 30</span>
                  <span>Jun 1</span>
                  <span>Jun 3</span>
                </div>
              </div>
            </div>

            {/* Task Status Distribution */}
            <div className="analytic-box">
              <div className="box-header">
                <h3>Task Status Distribution</h3>
              </div>
              <div className="donut-layout">
                <div className="donut-wrapper">
                  <div className="donut-hole">
                    <strong>Total Tasks</strong>
                    <h2>436</h2>
                  </div>
                </div>
                <div className="donut-legend">
                  <div className="d-item">
                    <span>
                      <i className="dot blue"></i> Completed
                    </span>{" "}
                    <strong>248 (56.9%)</strong>
                  </div>
                  <div className="d-item">
                    <span>
                      <i className="dot cyan"></i> In Progress
                    </span>{" "}
                    <strong>128 (29.4%)</strong>
                  </div>
                  <div className="d-item">
                    <span>
                      <i className="dot slate"></i> Not Started
                    </span>{" "}
                    <strong>60 (13.7%)</strong>
                  </div>
                </div>
              </div>

              <div className="mini-sub-stats">
                <div
                  className="sub-stat-card"
                  onClick={() => navigate("/tasks")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="sub-icon">
                    <Clock size={15} />
                  </div>
                  <div>
                    <span>Average Task Completion Time</span>
                    <h4>
                      2.4 days{" "}
                      <span className="green">↓ 0.6 days from last month</span>
                    </h4>
                  </div>
                </div>
                <div
                  className="sub-stat-card"
                  onClick={() => navigate("/tasks")}
                  style={{ cursor: "pointer" }}
                >
                  <div className="sub-icon red">
                    <AlertCircle size={15} />
                  </div>
                  <div>
                    <span>Overdue Tasks</span>
                    <h4>
                      23 <span className="red">↓ 8 from last month</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Sprint Progress, Velocity, Workload Distribution, Bugs Overview */}
          <div className="grid-row-4col">
            {/* Sprint Progress */}
            <div className="analytic-box col-flex">
              <h3>Sprint Progress</h3>
              <div className="circular-progress-box">
                <div className="circle-inner">
                  <h2>65%</h2>
                  <span>Sprint 12 Progress</span>
                </div>
              </div>
              <p className="tasks-count">52 / 80 tasks completed</p>
              <span className="days-left">18 days left</span>
              <span className="link-action" onClick={() => navigate("/kanban")}>
                View Sprint →
              </span>
            </div>

            {/* Velocity */}
            <div className="analytic-box">
              <div className="box-header">
                <h3>Velocity</h3>
                <span
                  className="dropdown-sm"
                  onClick={() =>
                    setSubTimeRange(
                      subTimeRange === "This Week" ? "Last Week" : "This Week",
                    )
                  }
                >
                  {subTimeRange} <ChevronDown size={11} />
                </span>
              </div>
              <h2>42 pts</h2>
              <span className="trend green">↑ 12% from last sprint</span>
              <div className="mini-line-graph">
                <svg viewBox="0 0 150 60" preserveAspectRatio="none">
                  <path
                    d="M 10 40 Q 40 20, 70 30 T 140 10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <circle cx="140" cy="10" r="3" fill="#3b82f6" />
                </svg>
                <div className="x-axis-sm">
                  <span>May 20</span>
                  <span>May 24</span>
                  <span>May 28</span>
                  <span>Jun 1</span>
                  <span>Jun 3</span>
                </div>
              </div>
            </div>

            {/* Workload Distribution */}
            <div className="analytic-box">
              <div className="box-header">
                <h3>Workload Distribution</h3>
                <span className="dropdown-sm" onClick={() => navigate("/team")}>
                  This Week <ChevronDown size={11} />
                </span>
              </div>
              <div
                className="workload-donut-layout"
                onClick={() => navigate("/team")}
                style={{ cursor: "pointer" }}
              >
                <div className="w-donut-hole">
                  <strong>Total</strong>
                  <h2>24</h2>
                </div>
              </div>
              <div className="workload-legend">
                <div>
                  <span>
                    <i className="dot blue"></i> Frontend
                  </span>{" "}
                  <strong>8 (33%)</strong>
                </div>
                <div>
                  <span>
                    <i className="dot cyan"></i> Backend
                  </span>{" "}
                  <strong>6 (25%)</strong>
                </div>
                <div>
                  <span>
                    <i className="dot purple"></i> Design
                  </span>{" "}
                  <strong>4 (17%)</strong>
                </div>
                <div>
                  <span>
                    <i className="dot orange"></i> QA
                  </span>{" "}
                  <strong>3 (13%)</strong>
                </div>
                <div>
                  <span>
                    <i className="dot gray"></i> DevOps
                  </span>{" "}
                  <strong>3 (12%)</strong>
                </div>
              </div>
            </div>

            {/* Bugs Overview */}
            <div className="analytic-box">
              <div className="box-header">
                <h3>Bugs Overview</h3>
                <span
                  className="dropdown-sm"
                  onClick={() => navigate("/tasks")}
                >
                  This Week <ChevronDown size={11} />
                </span>
              </div>
              <h2>23</h2>
              <p className="sub-txt">
                Total Bugs <span className="red">↑ 15% from last week</span>
              </p>
              <div className="bug-bars">
                <div className="b-row">
                  <span>Critical</span>{" "}
                  <div className="bar-bg">
                    <div className="fill red" style={{ width: "60%" }}></div>
                  </div>{" "}
                  <strong>6</strong>
                </div>
                <div className="b-row">
                  <span>High</span>{" "}
                  <div className="bar-bg">
                    <div className="fill orange" style={{ width: "80%" }}></div>
                  </div>{" "}
                  <strong>9</strong>
                </div>
                <div className="b-row">
                  <span>Medium</span>{" "}
                  <div className="bar-bg">
                    <div className="fill yellow" style={{ width: "50%" }}></div>
                  </div>{" "}
                  <strong>6</strong>
                </div>
                <div className="b-row">
                  <span>Low</span>{" "}
                  <div className="bar-bg">
                    <div className="fill green" style={{ width: "20%" }}></div>
                  </div>{" "}
                  <strong>2</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Project Health Cards */}
          <div className="project-health-section">
            <h3>Project Health</h3>
            <div className="health-cards-grid">
              <div
                className="health-card"
                onClick={() => handleProjectClick("ProjectHub Platform")}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="h-img"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80')`,
                  }}
                ></div>
                <div className="h-body">
                  <div className="h-top-title">
                    <h4>ProjectHub Platform</h4>
                    <span className="status-badge green">On Track</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="bar" style={{ width: "86%" }}></div>
                    <strong>86%</strong>
                  </div>
                  <div className="h-footer">
                    <span>
                      Tasks <strong>120/140</strong>
                    </span>
                    <span>
                      Team <strong>8</strong>
                    </span>
                    <div className="mini-avs">
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div className="av more">+3</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="health-card"
                onClick={() => handleProjectClick("AI Interview Module")}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="h-img"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80')`,
                  }}
                ></div>
                <div className="h-body">
                  <div className="h-top-title">
                    <h4>AI Interview Module</h4>
                    <span className="status-badge green">On Track</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="bar" style={{ width: "78%" }}></div>
                    <strong>78%</strong>
                  </div>
                  <div className="h-footer">
                    <span>
                      Tasks <strong>78/100</strong>
                    </span>
                    <span>
                      Team <strong>6</strong>
                    </span>
                    <div className="mini-avs">
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div className="av more">+2</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="health-card"
                onClick={() => handleProjectClick("Mobile Application")}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="h-img"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80')`,
                  }}
                ></div>
                <div className="h-body">
                  <div className="h-top-title">
                    <h4>Mobile Application</h4>
                    <span className="status-badge orange">At Risk</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="bar orange" style={{ width: "62%" }}></div>
                    <strong>62%</strong>
                  </div>
                  <div className="h-footer">
                    <span>
                      Tasks <strong>45/72</strong>
                    </span>
                    <span>
                      Team <strong>5</strong>
                    </span>
                    <div className="mini-avs">
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div className="av more">+1</div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="health-card"
                onClick={() => handleProjectClick("Dashboard Revamp")}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="h-img"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80')`,
                  }}
                ></div>
                <div className="h-body">
                  <div className="h-top-title">
                    <h4>Dashboard Revamp</h4>
                    <span className="status-badge red">Delayed</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="bar red" style={{ width: "55%" }}></div>
                    <strong>55%</strong>
                  </div>
                  <div className="h-footer">
                    <span>
                      Tasks <strong>33/60</strong>
                    </span>
                    <span>
                      Team <strong>4</strong>
                    </span>
                    <div className="mini-avs">
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="health-card"
                onClick={() => handleProjectClick("Landing Page Redesign")}
                style={{ cursor: "pointer" }}
              >
                <div
                  className="h-img"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80')`,
                  }}
                ></div>
                <div className="h-body">
                  <div className="h-top-title">
                    <h4>Landing Page Redesign</h4>
                    <span className="status-badge green">On Track</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div className="bar" style={{ width: "48%" }}></div>
                    <strong>48%</strong>
                  </div>
                  <div className="h-footer">
                    <span>
                      Tasks <strong>24/50</strong>
                    </span>
                    <span>
                      Team <strong>3</strong>
                    </span>
                    <div className="mini-avs">
                      <div
                        className="av"
                        style={{
                          backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80')`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="analytics-right-sidebar">
          {/* Top Performing Projects */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Top Performing Projects</h3>
              <span
                className="link"
                onClick={() => handleViewAll("Top Projects")}
              >
                View all
              </span>
            </div>
            <ul className="top-proj-list">
              <li
                onClick={() => navigate("/projects")}
                style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <span>1</span>{" "}
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=60&q=80"
                    alt=""
                  />{" "}
                  <strong>ProjectHub Platform</strong>
                </div>
                <div className="prog-right">
                  <div className="b-line" style={{ width: "86px" }}></div>
                  <strong>86%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/projects")}
                style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <span>2</span>{" "}
                  <img
                    src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=60&q=80"
                    alt=""
                  />{" "}
                  <strong>AI Interview Module</strong>
                </div>
                <div className="prog-right">
                  <div className="b-line" style={{ width: "78px" }}></div>
                  <strong>78%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/projects")}
                style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <span>3</span>{" "}
                  <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=60&q=80"
                    alt=""
                  />{" "}
                  <strong>Mobile Application</strong>
                </div>
                <div className="prog-right">
                  <div className="b-line" style={{ width: "62px" }}></div>
                  <strong>62%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/projects")}
                style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <span>4</span>{" "}
                  <img
                    src="https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=60&q=80"
                    alt=""
                  />{" "}
                  <strong>Dashboard Revamp</strong>
                </div>
                <div className="prog-right">
                  <div className="b-line" style={{ width: "55px" }}></div>
                  <strong>55%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/projects")}
                style={{ cursor: "pointer" }}
              >
                <div className="info">
                  <span>5</span>{" "}
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=60&q=80"
                    alt=""
                  />{" "}
                  <strong>Landing Page Redesign</strong>
                </div>
                <div className="prog-right">
                  <div className="b-line" style={{ width: "48px" }}></div>
                  <strong>48%</strong>
                </div>
              </li>
            </ul>
          </div>

          {/* Team Performance */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Team Performance</h3>
              <span className="link" onClick={() => navigate("/team")}>
                View all
              </span>
            </div>
            <ul className="team-perf-bars">
              <li
                onClick={() => navigate("/team")}
                style={{ cursor: "pointer" }}
              >
                <div className="u-info">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Rohit Singh</span>
                </div>
                <div className="p-right">
                  <div className="b-line blue" style={{ width: "98px" }}></div>
                  <strong>98%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/team")}
                style={{ cursor: "pointer" }}
              >
                <div className="u-info">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Sneha Iyer</span>
                </div>
                <div className="p-right">
                  <div className="b-line blue" style={{ width: "94px" }}></div>
                  <strong>94%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/team")}
                style={{ cursor: "pointer" }}
              >
                <div className="u-info">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Anjali Mehta</span>
                </div>
                <div className="p-right">
                  <div
                    className="b-line purple"
                    style={{ width: "91px" }}
                  ></div>
                  <strong>91%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/team")}
                style={{ cursor: "pointer" }}
              >
                <div className="u-info">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Vikram Patel</span>
                </div>
                <div className="p-right">
                  <div
                    className="b-line orange"
                    style={{ width: "88px" }}
                  ></div>
                  <strong>88%</strong>
                </div>
              </li>
              <li
                onClick={() => navigate("/team")}
                style={{ cursor: "pointer" }}
              >
                <div className="u-info">
                  <div
                    className="av"
                    style={{
                      backgroundImage: `url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80')`,
                    }}
                  ></div>{" "}
                  <span>Karan Verma</span>
                </div>
                <div className="p-right">
                  <div className="b-line pink" style={{ width: "85px" }}></div>
                  <strong>85%</strong>
                </div>
              </li>
            </ul>
          </div>

          {/* Activity Feed */}
          <div className="side-widget">
            <div className="side-head">
              <h3>Activity Feed</h3>
              <span
                className="link"
                onClick={() => handleViewAll("Activity Feed")}
              >
                View all
              </span>
            </div>
            <div className="act-feed-list">
              <div className="act-row">
                <div
                  className="dot-av"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=60&q=80')`,
                  }}
                ></div>
                <div>
                  <p>
                    <strong>Rohit Singh</strong> completed API integration
                  </p>
                  <span>10m ago</span>
                </div>
              </div>
              <div className="act-row">
                <div
                  className="dot-av"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=60&q=80')`,
                  }}
                ></div>
                <div>
                  <p>
                    <strong>Sneha Iyer</strong> pushed 3 commits
                  </p>
                  <span>25m ago</span>
                </div>
              </div>
              <div className="act-row">
                <div
                  className="dot-av"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=60&q=80')`,
                  }}
                ></div>
                <div>
                  <p>
                    <strong>Anjali Mehta</strong> updated design system
                  </p>
                  <span>1h ago</span>
                </div>
              </div>
              <div className="act-row">
                <div
                  className="dot-av"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=60&q=80')`,
                  }}
                ></div>
                <div>
                  <p>
                    <strong>Vikram Patel</strong> closed issue #245
                  </p>
                  <span>2h ago</span>
                </div>
              </div>
              <div className="act-row">
                <div
                  className="dot-av"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=60&q=80')`,
                  }}
                ></div>
                <div>
                  <p>
                    <strong>Karan Verma</strong> created new task
                  </p>
                  <span>3h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="ai-insights-card">
            <div
              className="ai-top-img"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80')`,
              }}
            ></div>
            <h4>Insights Powered by AI</h4>
            <p>
              AI has analyzed your project data and found 5 optimization
              opportunities.
            </p>
            <button className="ai-btn" onClick={handleAIInsights}>
              View AI Insights ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
