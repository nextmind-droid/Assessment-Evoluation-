
import React, { useState, useEffect } from "react";
import CreateAssignment from "./CreateAssignment";
import AnonymousSubmissions from "./AnonymousSubmissions";

function FacultyDashboard() {
  const [showAssignment, setShowAssignment] = useState(false);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    setAssignments(
      JSON.parse(localStorage.getItem("assignments") || "[]")
    );

    setSubmissions(
      JSON.parse(localStorage.getItem("submissions") || "[]")
    );
  }, [showAssignment, showSubmissions]);

  const evaluatedSubmissions = submissions.filter(
    (submission) => submission.status === "Evaluated"
  );

  const pendingSubmissions = submissions.filter(
    (submission) => submission.status !== "Evaluated"
  );

  const recentSubmissions = [...submissions].reverse().slice(0, 4);

  if (showAssignment) {
    return (
      <div>
        <button
          onClick={() => setShowAssignment(false)}
          className="faculty-back-button"
        >
          ← Back to Faculty Dashboard
        </button>

        <CreateAssignment />
      </div>
    );
  }

  if (showSubmissions) {
    return (
      <AnonymousSubmissions
        onBack={() => setShowSubmissions(false)}
      />
    );
  }

  const statistics = [
    {
      icon: "📝",
      title: "Total Assignments",
      value: assignments.length,
      color: "purple"
    },
    {
      icon: "📥",
      title: "Total Submissions",
      value: submissions.length,
      color: "blue"
    },
    {
      icon: "⏳",
      title: "Pending Evaluations",
      value: pendingSubmissions.length,
      color: "orange"
    },
    {
      icon: "✅",
      title: "Completed Evaluations",
      value: evaluatedSubmissions.length,
      color: "green"
    }
  ];

  return (
    <div className="faculty-layout">

      <aside className="faculty-sidebar">
        <div className="faculty-brand">
          <div className="faculty-brand-icon">AA</div>
          <div>
            <h2>AAES</h2>
            <span>Faculty Portal</span>
          </div>
        </div>

        <p className="faculty-menu-heading">MAIN MENU</p>

        <button
          className="faculty-sidebar-link active"
          onClick={() => window.scrollTo(0, 0)}
        >
          🏠 Dashboard
        </button>

        <button
          className="faculty-sidebar-link"
          onClick={() => setShowAssignment(true)}
        >
          📝 Create Assignment
        </button>

        <button
          className="faculty-sidebar-link"
          onClick={() => setShowSubmissions(true)}
        >
          📥 Anonymous Submissions
        </button>

        <div className="faculty-sidebar-footer">
          <span>👩‍🏫</span>
          <div>
            <strong>Faculty Panel</strong>
            <small>Assignment Evaluation</small>
          </div>
        </div>
      </aside>

      <main className="faculty-main">

        <header className="faculty-header">
          <div>
            <h1>Faculty Dashboard</h1>
            <p>Manage assignments and evaluate student submissions.</p>
          </div>

          <div className="faculty-profile">
            <div className="faculty-profile-icon">F</div>
            <div>
              <strong>Faculty Member</strong>
              <small>Faculty Portal</small>
            </div>
          </div>
        </header>

        <section className="faculty-welcome">
          <div>
            <h2>Welcome Back, Faculty! 👋</h2>
            <p>
              Manage your assignments, review submissions and provide feedback.
            </p>
          </div>
          <div className="faculty-welcome-icon">📚</div>
        </section>

        <section className="faculty-section">
          <div className="faculty-section-heading">
            <div>
              <h2>Performance Overview</h2>
              <p>Your assignment and evaluation summary</p>
            </div>
          </div>

          <div className="faculty-stats-grid">
            {statistics.map((item, index) => (
              <div className="faculty-stat-card" key={index}>
                <div className={`faculty-stat-icon ${item.color}`}>
                  {item.icon}
                </div>
                <p>{item.title}</p>
                <h2>{item.value}</h2>
              </div>
            ))}
          </div>
        </section>

        <section className="faculty-section">
          <div className="faculty-section-heading">
            <div>
              <h2>Quick Actions</h2>
              <p>Access your important faculty activities</p>
            </div>
          </div>

          <div className="faculty-actions-grid">
            <div className="faculty-action-card">
              <div className="faculty-action-icon">➕</div>
              <h3>Create Assignment</h3>
              <p>Create and share new assignments with students.</p>
              <button onClick={() => setShowAssignment(true)}>
                Create Assignment →
              </button>
            </div>

            <div className="faculty-action-card">
              <div className="faculty-action-icon">📥</div>
              <h3>Anonymous Submissions</h3>
              <p>View and download submissions without student identities.</p>
              <button onClick={() => setShowSubmissions(true)}>
                View Submissions →
              </button>
            </div>
          </div>
        </section>

        <section className="faculty-section">
          <div className="faculty-section-heading">
            <div>
              <h2>Assignment Overview</h2>
              <p>Assignments created by faculty</p>
            </div>
            <button
              className="faculty-view-button"
              onClick={() => setShowAssignment(true)}
            >
              + New Assignment
            </button>
          </div>

          <div className="faculty-assignment-list">
            {assignments.length > 0 ? (
              assignments.map((assignment, index) => (
                <div className="faculty-assignment-row" key={assignment.id || index}>
                  <div className="faculty-assignment-icon">📄</div>
                  <div className="faculty-assignment-details">
                    <strong>{assignment.title || "Untitled Assignment"}</strong>
                    <span>{assignment.subject || "Subject not specified"}</span>
                  </div>
                  <div className="faculty-deadline">
                    <small>Deadline</small>
                    <strong>{assignment.deadline || "Not specified"}</strong>
                  </div>
                </div>
              ))
            ) : (
              <div className="faculty-empty">
                <span>📭</span>
                <p>No assignments created yet.</p>
                <button onClick={() => setShowAssignment(true)}>
                  Create Your First Assignment
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="faculty-section">
          <div className="faculty-section-heading">
            <div>
              <h2>Recent Submissions</h2>
              <p>Latest anonymous student submissions</p>
            </div>
            <button
              className="faculty-view-button"
              onClick={() => setShowSubmissions(true)}
            >
              View All
            </button>
          </div>

          <div className="faculty-submission-list">
            {recentSubmissions.length > 0 ? (
              recentSubmissions.map((submission, index) => (
                <div
                  className="faculty-submission-row"
                  key={submission.id || index}
                >
                  <div className="faculty-submission-icon">📎</div>

                  <div className="faculty-submission-details">
                    <strong>
                      {submission.assignmentTitle || "Assignment Submission"}
                    </strong>
                    <span>{submission.fileName || "Submitted file"}</span>
                  </div>

                  <span
                    className={
                      submission.status === "Evaluated"
                        ? "faculty-status evaluated"
                        : "faculty-status pending"
                    }
                  >
                    {submission.status || "Submitted"}
                  </span>
                </div>
              ))
            ) : (
              <div className="faculty-empty">
                <span>📭</span>
                <p>No submissions received yet.</p>
              </div>
            )}
          </div>
        </section>

      </main>
    </div>
  );
}

export default FacultyDashboard;
