
import React, { useState } from "react";

function AdminDashboard({
  onManageStudents,
  onManageFaculty,
  onManageSubjects,
  onManageAssignments,
  onMonitorSubmissions
}) {
  const [students] = useState(
    JSON.parse(localStorage.getItem("students") || "[]")
  );

  const [faculty] = useState(
    JSON.parse(localStorage.getItem("faculty") || "[]")
  );

  const [subjects] = useState(
    JSON.parse(localStorage.getItem("subjects") || "[]")
  );

  const [assignments] = useState(
    JSON.parse(localStorage.getItem("assignments") || "[]")
  );

  const [submissions] = useState(
    JSON.parse(localStorage.getItem("submissions") || "[]")
  );

  const managementItems = [
    {
      icon: "👨‍🎓",
      title: "Manage Students",
      description: "Add, view and delete student details.",
      action: onManageStudents
    },
    {
      icon: "👩‍🏫",
      title: "Manage Faculty",
      description: "Add, view and delete faculty details.",
      action: onManageFaculty
    },
    {
      icon: "📚",
      title: "Manage Subjects",
      description: "Organize and manage subject details.",
      action: onManageSubjects
    },
    {
      icon: "📝",
      title: "Manage Assignments",
      description: "View and manage created assignments.",
      action: onManageAssignments
    },
    {
      icon: "📊",
      title: "Monitor Submissions",
      description: "Track student assignment submissions.",
      action: onMonitorSubmissions
    }
  ];

  const recentSubmissions = [...submissions].reverse().slice(0, 4);

  return (
    <div className="admin-layout">

      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="brand-icon">AA</div>
          <div>
            <h2>AAES</h2>
            <span>Admin Panel</span>
          </div>
        </div>

        <p className="sidebar-heading">MAIN MENU</p>

        <button className="sidebar-link active" onClick={() => window.scrollTo(0, 0)}>
          <span>🏠</span> Dashboard
        </button>

        {managementItems.map((item, index) => (
          <button
            className="sidebar-link"
            key={index}
            onClick={item.action}
          >
            <span>{item.icon}</span>
            {item.title}
          </button>
        ))}

        <div className="sidebar-footer">
          <span>🎓</span>
          <div>
            <strong>Assignment Evaluation</strong>
            <small>System Administration</small>
          </div>
        </div>
      </aside>

      <main className="admin-main">

        <header className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage your assignment evaluation system.</p>
          </div>

          <div className="admin-profile">
            <div className="profile-icon">A</div>
            <div>
              <strong>Administrator</strong>
              <small>System Admin</small>
            </div>
          </div>
        </header>

        <section className="admin-welcome">
          <div>
            <h2>Welcome Back, Admin! 👋</h2>
            <p>Here is an overview of your evaluation system.</p>
          </div>
          <div className="welcome-icon">📋</div>
        </section>

        <section className="admin-section">
          <div className="section-heading">
            <div>
              <h2>System Overview</h2>
              <p>Quick summary of registered records</p>
            </div>
          </div>

          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="stat-icon purple">👨‍🎓</div>
              <p>Total Students</p>
              <h2>{students.length}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon blue">👩‍🏫</div>
              <p>Total Faculty</p>
              <h2>{faculty.length}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon orange">📚</div>
              <p>Total Subjects</p>
              <h2>{subjects.length}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon green">📝</div>
              <p>Total Assignments</p>
              <h2>{assignments.length}</h2>
            </div>

            <div className="admin-stat-card">
              <div className="stat-icon pink">📊</div>
              <p>Total Submissions</p>
              <h2>{submissions.length}</h2>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div className="section-heading">
            <div>
              <h2>Management</h2>
              <p>Choose a section to manage your system</p>
            </div>
          </div>

          <div className="admin-management-grid">
            {managementItems.map((item, index) => (
              <div className="admin-management-card" key={index}>
                <div className="management-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button onClick={item.action}>
                  Open Section →
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <div className="section-heading">
            <div>
              <h2>Recent Activity</h2>
              <p>Latest assignment submissions</p>
            </div>
            <button
              className="view-all-button"
              onClick={onMonitorSubmissions}
            >
              View All
            </button>
          </div>

          <div className="recent-activity-card">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission, index) => (
                <div className="activity-row" key={submission.id || index}>
                  <div className="activity-icon">📄</div>
                  <div className="activity-details">
                    <strong>
                      {submission.assignmentTitle || "Assignment Submission"}
                    </strong>
                    <span>{submission.fileName || "Submitted file"}</span>
                  </div>
                  <span className="activity-status">
                    {submission.status || "Submitted"}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-activity">
                <span>📭</span>
                <p>No submissions available yet.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
