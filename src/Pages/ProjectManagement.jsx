import React, { useState } from "react";
import "./ProjectManagement.css";

const ProjectManagement = () => {
  const [projects] = useState([
    {
      id: 1,
      name: "E-Commerce Platform",
      desc: "Developing a scalable e-commerce website with payment gateway integration.",
      owner: "Amit Sharma",
      date: "2026-03-15",
      status: "Active",
    },
    {
      id: 2,
      name: "AI Chatbot Plugin",
      desc: "Creating an automated customer support widget for enterprise clients.",
      owner: "Neha Verma",
      date: "2026-05-01",
      status: "Planning",
    },
    {
      id: 3,
      name: "Mobile Banking UI",
      desc: "Redesigning the user interface for the core retail banking application.",
      owner: "Rahul Techguy",
      date: "2026-01-10",
      status: "Completed",
    },
  ]);

  return (
    <div className="pm-container">
      <section className="pm-hero">
        <div className="pm-hero-left">
          <h1>Manage Your Projects Efficiently</h1>
          <p>
            Streamline your workflows, track project lifecycles, and collaborate
            with your team seamlessly all in one structured platform.
          </p>
          <div className="pm-hero-btns">
            <button className="btn-primary">Create Project</button>
            <button className="btn-secondary">View Projects</button>
          </div>
        </div>
        <div className="pm-hero-right">
          <div className="mockup-dashboard">
            <div className="mockup-header">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar"></div>
              <div className="mockup-content">
                <div className="mockup-bar"></div>
                <div className="mockup-grid">
                  <div className="mockup-box"></div>
                  <div className="mockup-box"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-about">
        <h2>What is Project Management?</h2>
        <div className="about-grid">
          <div className="about-card">
            <h3>Project Kya Hai?</h3>
            <p>
              Ek project temporary aur organized effort hota hai jiska ek
              specific goal, defined start aur end date, aur unique deliverables
              hote hain.
            </p>
          </div>
          <div className="about-card">
            <h3>ProjectHub Kaise Help Karta Hai?</h3>
            <p>
              ProjectHub aapke projects ko structure deta hai. Yeh lifecycle
              tracking, basic team assignment, aur clean statuses ke sath chaos
              ko clarity me badalta hai.
            </p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-create-section">
        <h2>Create New Project</h2>
        <form className="pm-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              placeholder="e.g., Hospital Management System"
              required
            />
          </div>
          <div className="form-group">
            <label>Project Description</label>
            <textarea
              placeholder="Describe the project scope and objectives..."
              rows="4"
              required
            ></textarea>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Project Category</label>
              <select>
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>Design / UI-UX</option>
                <option>Research</option>
              </select>
            </div>
            <div className="form-group">
              <label>Project Status</label>
              <select>
                <option>Planning</option>
                <option>Active</option>
                <option>On Hold</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input type="date" />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input type="date" />
            </div>
          </div>
          <button type="submit" className="btn-submit">
            Create Project
          </button>
        </form>
      </section>

      <hr className="section-divider" />

      <section className="pm-overview">
        <h2>Project Overview</h2>
        <div className="overview-grid">
          <div className="overview-card total">
            <h3>3</h3>
            <p>Total Projects</p>
          </div>
          <div className="overview-card active">
            <h3>1</h3>
            <p>Active Projects</p>
          </div>
          <div className="overview-card completed">
            <h3>1</h3>
            <p>Completed Projects</p>
          </div>
          <div className="overview-card pending">
            <h3>1</h3>
            <p>Pending Projects</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-cards-section">
        <h2>Your Projects</h2>
        <div className="project-cards-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="card-header">
                <h3>{project.name}</h3>
                <span
                  className={`status-badge ${project.status.toLowerCase()}`}
                >
                  {project.status}
                </span>
              </div>
              <p className="card-desc">{project.desc}</p>
              <div className="card-meta">
                <p>
                  <strong>Owner:</strong> {project.owner}
                </p>
                <p>
                  <strong>Created:</strong> {project.date}
                </p>
              </div>
              <button className="btn-view-details">View Details</button>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-lifecycle">
        <h2>Project Lifecycle</h2>
        <div className="timeline">
          <div className="timeline-step">
            <div className="step-num">1</div>
            <h4>Create Project</h4>
          </div>
          <div className="timeline-arrow">↓</div>
          <div className="timeline-step">
            <div className="step-num">2</div>
            <h4>Add Team Members</h4>
          </div>
          <div className="timeline-arrow">↓</div>
          <div className="timeline-step">
            <div className="step-num">3</div>
            <h4>Assign Tasks</h4>
          </div>
          <div className="timeline-arrow">↓</div>
          <div className="timeline-step">
            <div className="step-num">4</div>
            <h4>Share Files</h4>
          </div>
          <div className="timeline-arrow">↓</div>
          <div className="timeline-step">
            <div className="step-num">5</div>
            <h4>Track Progress</h4>
          </div>
          <div className="timeline-arrow">↓</div>
          <div className="timeline-step">
            <div className="step-num">6</div>
            <h4>Complete Project</h4>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-team-section">
        <h2>Team Assignment</h2>
        <div className="team-grid">
          <div className="team-add-box">
            <h3>Add Member to Project</h3>
            <div className="form-group">
              <input type="email" placeholder="Enter member email..." />
            </div>
            <div className="form-group">
              <select>
                <option>Admin</option>
                <option>Manager</option>
                <option>Member</option>
              </select>
            </div>
            <button className="btn-primary">Add Member</button>
          </div>
          <div className="team-list-box">
            <h3>Project Owner & Members</h3>
            <ul className="member-list">
              <li className="owner-li">
                <strong>Amit Sharma</strong>{" "}
                <span className="role-tag owner">Owner</span>
              </li>
              <li>
                Anjali Singh <span className="role-tag manager">Manager</span>
              </li>
              <li>
                Rohan Das <span className="role-tag member">Member</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-status-section">
        <h2>Project Statuses</h2>
        <div className="status-grid">
          <div className="status-box planning">
            <h4>Planning</h4>
            <p>Initial phase, defining roadmap & scope.</p>
          </div>
          <div className="status-box progress">
            <h4>In Progress</h4>
            <p>Execution phase, team actively working.</p>
          </div>
          <div className="status-box hold">
            <h4>On Hold</h4>
            <p>Temporarily paused due to blockers.</p>
          </div>
          <div className="status-box done">
            <h4>Completed</h4>
            <p>Project successfully finished & delivered.</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* 9. BENEFITS */}
      <section className="pm-benefits">
        <h2>Why Use ProjectHub Management?</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4>Easy Project Creation</h4>
            <p>Set up your project repository and info in seconds.</p>
          </div>
          <div className="benefit-card">
            <h4>Organized Workflow</h4>
            <p>Follow a structured step-by-step lifecycle mapping.</p>
          </div>
          <div className="benefit-card">
            <h4>Better Team Coordination</h4>
            <p>Clear ownership and roles assigned at project level.</p>
          </div>
          <div className="benefit-card">
            <h4>Progress Visibility</h4>
            <p>Know exactly which phase your high-level project is in.</p>
          </div>
          <div className="benefit-card">
            <h4>Centralized Management</h4>
            <p>All core settings, deadlines, and configs in one place.</p>
          </div>
          <div className="benefit-card">
            <h4>Time Saving</h4>
            <p>No clunky configurations, straightforward GitHub-style UX.</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      <section className="pm-cta">
        <h2>Ready to Start Your Next Project?</h2>
        <p>Launch your dashboard, align your team, and execute flawlessly.</p>
        <div className="cta-btns">
          <button className="btn-primary">Create Project</button>
          <button className="btn-secondary-light">Sign Up</button>
        </div>
      </section>
    </div>
  );
};

export default ProjectManagement;
