import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";

export default function EditProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    bio: "",
    phone: "",
    college: "",
    branch: "",
    year: "",
    skills: [],
    github: "",
    linkedin: "",
    portfolio: "",
    avatarUrl: "",
  });

  const [skillInput, setSkillInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current user details to pre-fill the form
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/auth/get-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to load existing profile data.");
        }

        const data = await response.json();

        setFormData({
          name: data.name || data.fullName || "",
          username: data.username || "",
          bio: data.bio || "",
          phone: data.phone || "",
          college: data.college || "",
          branch: data.branch || "",
          year: data.year || data.academicYear || "",
          skills: data.skills || [],
          github: data.github || data.socials?.github || "",
          linkedin: data.linkedin || data.socials?.linkedin || "",
          portfolio: data.portfolio || data.socials?.portfolio || "",
          avatarUrl: data.avatarUrl || data.profileImage || "",
        });
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Standard input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Image Upload with FileReader preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Skill Chip Management
  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = skillInput.trim();
    if (trimmed && !formData.skills.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
      setSkillInput("");
    }
  };

  const handleKeyDownSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddSkill(e);
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile. Please try again.");
      }

      // Successfully updated — redirect to User Profile page
      navigate("/profile");
    } catch (err) {
      console.error("Update Error:", err);
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="ep-loading-container">
        <div className="ep-spinner" />
        <p>Loading profile information...</p>
      </div>
    );
  }

  return (
    <div className="ep-page-wrapper">
      <div className="ep-card">
        {/* Header */}
        <div className="ep-header">
          <div>
            <h1 className="ep-title">Edit Profile</h1>
            <p className="ep-subtitle">
              Update your personal details, academic background, and social
              presence.
            </p>
          </div>
          <button
            type="button"
            className="ep-btn ep-btn-secondary"
            onClick={() => navigate("/profile")}
          >
            Cancel
          </button>
        </div>

        {error && <div className="ep-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="ep-form">
          {/* Avatar Upload Section */}
          <div className="ep-avatar-section">
            <div className="ep-avatar-preview">
              {formData.avatarUrl ? (
                <img src={formData.avatarUrl} alt="Profile Preview" />
              ) : (
                <div className="ep-avatar-placeholder">
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "?"}
                </div>
              )}
            </div>
            <div className="ep-avatar-actions">
              <label
                htmlFor="avatar-file-input"
                className="ep-btn ep-btn-outline"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Change Avatar
              </label>
              <input
                id="avatar-file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
              <span className="ep-avatar-hint">
                JPG, PNG, or GIF. Max 2MB recommended.
              </span>
            </div>
          </div>

          <hr className="ep-divider" />

          {/* Section: Basic Information */}
          <section className="ep-section">
            <h3 className="ep-section-title">Basic Information</h3>
            <div className="ep-grid-2">
              <div className="ep-field">
                <label className="ep-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="ep-input"
                  placeholder="e.g. Alex Mercer"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="ep-field">
                <label className="ep-label">Username</label>
                <input
                  type="text"
                  name="username"
                  className="ep-input"
                  placeholder="alexmercer"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="ep-field">
              <label className="ep-label">Bio</label>
              <textarea
                name="bio"
                className="ep-textarea"
                rows="3"
                placeholder="Tell the community about yourself, your goals, or your stack..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            <div className="ep-field">
              <label className="ep-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="ep-input"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </section>

          <hr className="ep-divider" />

          {/* Section: Academic Info */}
          <section className="ep-section">
            <h3 className="ep-section-title">Academic Background</h3>
            <div className="ep-field">
              <label className="ep-label">College / Institution</label>
              <input
                type="text"
                name="college"
                className="ep-input"
                placeholder="e.g. Stanford University"
                value={formData.college}
                onChange={handleChange}
              />
            </div>

            <div className="ep-grid-2">
              <div className="ep-field">
                <label className="ep-label">Branch / Major</label>
                <input
                  type="text"
                  name="branch"
                  className="ep-input"
                  placeholder="Computer Science & Eng."
                  value={formData.branch}
                  onChange={handleChange}
                />
              </div>

              <div className="ep-field">
                <label className="ep-label">Academic Year</label>
                <select
                  name="year"
                  className="ep-input"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Alumni">Alumni</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="ep-divider" />

          {/* Section: Skills */}
          <section className="ep-section">
            <h3 className="ep-section-title">Skills & Expertise</h3>
            <div className="ep-field">
              <div className="ep-skill-input-wrapper">
                <input
                  type="text"
                  className="ep-input"
                  placeholder="Add a skill (e.g. React, Node.js) and press Enter"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleKeyDownSkill}
                />
                <button
                  type="button"
                  className="ep-btn ep-btn-secondary"
                  onClick={handleAddSkill}
                >
                  Add
                </button>
              </div>

              {formData.skills.length > 0 && (
                <div className="ep-skills-container">
                  {formData.skills.map((skill, index) => (
                    <span key={index} className="ep-skill-chip">
                      {skill}
                      <button
                        type="button"
                        className="ep-chip-remove"
                        onClick={() => handleRemoveSkill(skill)}
                        aria-label={`Remove ${skill}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </section>

          <hr className="ep-divider" />

          {/* Section: Social Profiles */}
          <section className="ep-section">
            <h3 className="ep-section-title">Social Links</h3>
            <div className="ep-grid-3">
              <div className="ep-field">
                <label className="ep-label">GitHub</label>
                <input
                  type="url"
                  name="github"
                  className="ep-input"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={handleChange}
                />
              </div>

              <div className="ep-field">
                <label className="ep-label">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  className="ep-input"
                  placeholder="https://linkedin.com/in/username"
                  value={formData.linkedin}
                  onChange={handleChange}
                />
              </div>

              <div className="ep-field">
                <label className="ep-label">Portfolio</label>
                <input
                  type="url"
                  name="portfolio"
                  className="ep-input"
                  placeholder="https://yourportfolio.com"
                  value={formData.portfolio}
                  onChange={handleChange}
                />
              </div>
            </div>
          </section>

          {/* Form Controls */}
          <div className="ep-footer">
            <button
              type="button"
              className="ep-btn ep-btn-secondary"
              onClick={() => navigate("/profile")}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ep-btn ep-btn-primary"
              disabled={isSaving}
            >
              {isSaving ? "Saving Changes..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
