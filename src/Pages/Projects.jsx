import React, { useState } from "react";
import {
  LayoutGrid,
  Folder,
  Settings,
  Star,
  Archive,
  SquareCheckBig,
  Plus,
  Search,
  ChevronDown,
  LayoutList,
  Star as StarOutline,
  MoreHorizontal,
  CalendarCheck2,
  UserCircle,
  ArrowUpFromLine,
  FolderCog,
  Smartphone,
  Palette,
  CloudDownload,
  Rocket,
} from "lucide-react";
import "./Projects.css";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [memberFilter, setMemberFilter] = useState("All Members");

  // Stats data
  const projectStats = [
    {
      title: "Total Projects",
      value: 24,
      icon: Folder,
      color: "blue",
      change: "▲ 12% from last month",
    },
    {
      title: "In Progress",
      value: 8,
      icon: FolderCog,
      color: "orange",
      change: "▲ 8% from last month",
    },
    {
      title: "Completed",
      value: 7,
      icon: SquareCheckBig,
      color: "green",
      change: "▲ 16% from last month",
    },
    {
      title: "On Hold",
      value: 2,
      icon: Archive,
      color: "red",
      change: "▼ 4% from last month",
    },
  ];

  // Cards data
  const projectCards = [
    {
      id: 1,
      title: "ProjectHub Platform",
      type: "Web Development",
      icon: Folder,
      color: "blue",
      members: 5,
      progress: 75,
      updated: "2 min ago",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Nova Mobile App",
      type: "Mobile App",
      icon: Smartphone,
      color: "green",
      members: 4,
      progress: 60,
      updated: "1 hour ago",
      status: "In Progress",
    },
    {
      id: 3,
      title: "AI Dashboard",
      type: "AI / ML",
      icon: Rocket,
      color: "purple",
      members: 6,
      progress: 45,
      updated: "3 hours ago",
      status: "Review",
    },
    {
      id: 4,
      title: "Cloud Migration",
      type: "DevOps",
      icon: CloudDownload,
      color: "orange",
      members: 6,
      progress: 20,
      updated: "1 day ago",
      status: "Planning",
    },
    {
      id: 5,
      title: "Design System",
      type: "Design",
      icon: Palette,
      color: "pink",
      members: 7,
      progress: 80,
      updated: "2 days ago",
      status: "In Progress",
    },
    {
      id: 6,
      title: "API Gateway",
      type: "Web Development",
      icon: FolderCog,
      color: "blue",
      members: 5,
      progress: 100,
      updated: "3 days ago",
      status: "Completed",
    },
  ];

  // Table list data
  const projectList = [
    {
      id: 1,
      name: "E-commerce Platform",
      type: "Web Development",
      members: 5,
      status: "In Progress",
      progress: 65,
      deadline: "May 25, 2024",
      updated: "2 min ago",
    },
    {
      id: 2,
      name: "Social Media App",
      type: "Mobile App",
      members: 5,
      status: "Planning",
      progress: 30,
      deadline: "Jun 10, 2024",
      updated: "1 hour ago",
    },
  ];

  // Filter logic based on search & category
  const filteredCards = projectCards.filter((card) => {
    const matchesSearch =
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "All Categories" || card.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="projects-page-container">
      <div className="projects-body-wrapper">
        {/* Sidebar */}
        <aside className="projects-sidebar">
          <div className="sidebar-group">
            <span className="sidebar-label">PROJECTS</span>
            <ul>
              {["All Projects", "My Projects", "Starred", "Archived"].map(
                (item) => (
                  <li
                    key={item}
                    className={activeFilter === item ? "active-link" : ""}
                    onClick={() => setActiveFilter(item)}
                  >
                    {item === "All Projects" && <LayoutGrid size={16} />}
                    {item === "My Projects" && <UserCircle size={16} />}
                    {item === "Starred" && <Star size={16} />}
                    {item === "Archived" && <Archive size={16} />}
                    {item}
                    <span className="badge">
                      {item === "All Projects"
                        ? 24
                        : item === "My Projects"
                          ? 8
                          : item === "Starred"
                            ? 5
                            : 3}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div className="sidebar-group">
            <span className="sidebar-label">STATUS</span>
            <ul>
              <li onClick={() => setSearchQuery("Planning")}>
                <span className="dot blue"></span> Planning{" "}
                <span className="badge">5</span>
              </li>
              <li onClick={() => setSearchQuery("In Progress")}>
                <span className="dot orange"></span> In Progress{" "}
                <span className="badge">8</span>
              </li>
              <li onClick={() => setSearchQuery("Review")}>
                <span className="dot purple"></span> Review{" "}
                <span className="badge">4</span>
              </li>
              <li onClick={() => setSearchQuery("Completed")}>
                <span className="dot green"></span> Completed{" "}
                <span className="badge">7</span>
              </li>
              <li onClick={() => setSearchQuery("On Hold")}>
                <span className="dot red"></span> On Hold{" "}
                <span className="badge">2</span>
              </li>
            </ul>
          </div>

          <div className="sidebar-group">
            <span className="sidebar-label">CATEGORIES</span>
            <ul>
              {[
                "Web Development",
                "Mobile App",
                "Design",
                "AI / ML",
                "DevOps",
                "Other",
              ].map((cat) => (
                <li
                  key={cat}
                  onClick={() =>
                    setCategoryFilter(
                      categoryFilter === cat ? "All Categories" : cat,
                    )
                  }
                >
                  <FolderCog size={16} /> {cat}
                  <span className="badge">
                    {cat === "Web Development"
                      ? 8
                      : cat === "Mobile App"
                        ? 5
                        : cat === "Design"
                          ? 4
                          : cat === "AI / ML"
                            ? 3
                            : 2}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="upgrade-box">
            <ArrowUpFromLine size={20} className="upgrade-ico" />
            <h4>Upgrade to Pro</h4>
            <p>Unlock advanced features and unlimited projects.</p>
            <button
              className="upgrade-action-btn"
              onClick={() => alert("Redirecting to Upgrade Pro...")}
            >
              Upgrade Now
            </button>
          </div>
        </aside>

        {/* Main Workspace Content */}
        <main className="projects-main-content">
          <div className="main-top-row">
            <div>
              <h1 className="main-heading">Projects</h1>
              <p className="main-subheading">
                Overview of all projects in your workspace.
              </p>
            </div>
            <button
              className="primary-new-btn"
              onClick={() => alert("Open New Project Modal")}
            >
              <Plus size={16} /> New Project
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            {projectStats.map((stat, idx) => {
              const IconComp = stat.icon;
              return (
                <div className="stat-box" key={idx}>
                  <div className="stat-box-top">
                    <div className={`stat-ico-wrap ${stat.color}`}>
                      <IconComp size={20} />
                    </div>
                    <MoreHorizontal
                      size={16}
                      className="stat-more"
                      onClick={() => alert(`${stat.title} options`)}
                    />
                  </div>
                  <div className="stat-box-content">
                    <span className="stat-box-title">{stat.title}</span>
                    <h2 className="stat-box-val">{stat.value}</h2>
                    <span
                      className={`stat-box-trend ${stat.color === "red" ? "red" : ""}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Toolbar */}
          <div className="filter-toolbar">
            <div className="filter-search-box">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search projects by name, client, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <select
              className="filter-dropdown"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All Categories">All Categories</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Design">Design</option>
              <option value="AI / ML">AI / ML</option>
              <option value="DevOps">DevOps</option>
            </select>

            <select
              className="filter-dropdown"
              value={memberFilter}
              onChange={(e) => setMemberFilter(e.target.value)}
            >
              <option value="All Members">All Members</option>
              <option value="Team A">Team A</option>
              <option value="Team B">Team B</option>
            </select>

            <div className="view-switcher">
              <button
                className={`view-switch-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                className={`view-switch-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <LayoutList size={16} />
              </button>
            </div>
          </div>

          {/* Grid View or List View toggle rendering */}
          {viewMode === "grid" ? (
            <div className="cards-grid-workspace">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => {
                  const CardIcon = card.icon;
                  return (
                    <div className="p-card" key={card.id}>
                      <div className="p-card-top">
                        <div className={`p-card-icon ${card.color}`}>
                          <CardIcon size={20} />
                        </div>
                        <h3 className="p-card-heading">{card.title}</h3>
                        <div className="p-card-tools">
                          <StarOutline size={16} className="clickable-icon" />
                          <MoreHorizontal
                            size={16}
                            className="clickable-icon"
                          />
                        </div>
                      </div>
                      <span className={`p-card-tag ${card.color}`}>
                        {card.type}
                      </span>
                      <p className="p-card-desc">
                        A collaborative project management platform with
                        real-time analytics and team collaboration.
                      </p>

                      <div className="p-card-middle">
                        <div className="stacked-avatars">
                          {[...Array(Math.min(card.members, 4))].map((_, i) => (
                            <div className="mini-avatar" key={i}></div>
                          ))}
                          {card.members > 4 && (
                            <span className="extra-count">
                              +{card.members - 4}
                            </span>
                          )}
                        </div>
                        <span className="progress-num">{card.progress}%</span>
                      </div>
                      <div className="progress-track">
                        <div
                          className={`progress-fill ${card.color}`}
                          style={{ width: `${card.progress}%` }}
                        ></div>
                      </div>

                      <div className="p-card-footer">
                        <span className="footer-date">
                          <CalendarCheck2 size={14} /> Updated {card.updated}
                        </span>
                        <span
                          className={`status-pill ${card.status.toLowerCase().replace(" ", "-")}`}
                        >
                          {card.status}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p
                  style={{
                    gridColumn: "span 3",
                    textAlign: "center",
                    color: "#64748b",
                    padding: "30px",
                  }}
                >
                  No projects found.
                </p>
              )}
            </div>
          ) : (
            /* Table List View */
            <div className="table-wrapper-box">
              <table className="custom-data-table">
                <thead>
                  <tr>
                    <th>PROJECT NAME</th>
                    <th>MEMBERS</th>
                    <th>STATUS</th>
                    <th>PROGRESS</th>
                    <th>DEADLINE</th>
                    <th>UPDATED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projectList.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="table-title-cell">
                          <FolderCog size={16} className="text-blue" />
                          <div>
                            <span className="t-name">{row.name}</span>
                            <span className="t-type">{row.type}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="stacked-avatars">
                          {[...Array(4)].map((_, i) => (
                            <div className="mini-avatar" key={i}></div>
                          ))}
                          <span className="extra-count">+1</span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`status-pill ${row.status.toLowerCase().replace(" ", "-")}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td>
                        <div className="table-prog-col">
                          <span>{row.progress}%</span>
                          <div className="progress-track mini">
                            <div
                              className="progress-fill blue"
                              style={{ width: `${row.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td>{row.deadline}</td>
                      <td>{row.updated}</td>
                      <td>
                        <MoreHorizontal size={16} className="cursor-pointer" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Projects;
