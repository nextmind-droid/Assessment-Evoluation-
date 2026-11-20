
import React, { useState, useEffect } from "react";
import StudentSubmission from "./StudentSubmission";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const loadData = () => {
    const savedAssignments = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );

    const savedSubmissions = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    );

    setAssignments(savedAssignments);
    setSubmissions(savedSubmissions);
  };

  useEffect(() => {
    loadData();
  }, []);

  const isSubmitted = (assignmentId) => {
    return submissions.some(
      (submission) =>
        String(submission.assignmentId) === String(assignmentId)
    );
  };

  const evaluatedSubmissions = submissions.filter(
    (item) => item.status === "Evaluated"
  );

  const submittedCount = assignments.filter(
    (item) => isSubmitted(item.id)
  ).length;

  const pendingCount = assignments.length - submittedCount;

  const upcomingAssignments = assignments
    .filter((item) => !isSubmitted(item.id))
    .slice(0, 3);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: "smooth"
    });
  };

  if (selectedAssignment) {
    return (
      <StudentSubmission
        assignment={selectedAssignment}
        onBack={() => {
          setSelectedAssignment(null);
          loadData();
        }}
      />
    );
  }

  return (
    <div className="student-layout">

      <aside className="student-sidebar">
        <div className="student-brand">
          <div className="student-brand-icon">AA</div>
          <div>
            <h2>AAES</h2>
            <span>Student Portal</span>
          </div>
        </div>

        <p className="student-menu-heading">MAIN MENU</p>

        <button
          className="student-sidebar-link active"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🏠 Dashboard
        </button>

        <button
          className="student-sidebar-link"
          onClick={() => scrollToSection("student-assignments")}
        >
          📚 My Assignments
        </button>

        <button
          className="student-sidebar-link"
          onClick={() => scrollToSection("student-deadlines")}
        >
          ⏰ Upcoming Deadlines
        </button>

        <button
          className="student-sidebar-link"
          onClick={() => scrollToSection("student-results")}
        >
          🏆 My Results
        </button>

        <div className="student-sidebar-footer">
          <span>🎓</span>
          <div>
            <strong>Student Panel</strong>
            <small>Assignment Evaluation</small>
          </div>
        </div>
      </aside>

      <main className="student-main">

        <header className="student-header">
          <div>
            <h1>Student Dashboard</h1>
            <p>View assignments, submit work and track your results.</p>
          </div>

          <div className="student-profile">
            <div className="student-profile-icon">S</div>
            <div>
              <strong>Student</strong>
              <small>Student Portal</small>
            </div>
          </div>
        </header>

        <section className="student-welcome">
          <div>
            <h2>Welcome Back, Student! 👋</h2>
            <p>
              Stay on track with your assignments and keep learning.
            </p>
          </div>
          <div className="student-welcome-icon">🎓</div>
        </section>

        <section className="student-section">
          <div className="student-section-heading">
            <div>
              <h2>My Academic Overview</h2>
              <p>Your assignment and result summary</p>
            </div>
          </div>

          <div className="student-stats-grid">
            <div className="student-stat-card">
              <div className="student-stat-icon purple">📚</div>
              <p>Total Assignments</p>
              <h2>{assignments.length}</h2>
            </div>

            <div className="student-stat-card">
              <div className="student-stat-icon orange">⏳</div>
              <p>Pending Assignments</p>
              <h2>{pendingCount}</h2>
            </div>

            <div className="student-stat-card">
              <div className="student-stat-icon blue">📤</div>
              <p>Submitted Assignments</p>
              <h2>{submittedCount}</h2>
            </div>

            <div className="student-stat-card">
              <div className="student-stat-icon green">🏆</div>
              <p>Published Results</p>
              <h2>{evaluatedSubmissions.length}</h2>
            </div>
          </div>
        </section>

        <section className="student-section" id="student-assignments">
          <div className="student-section-heading">
            <div>
              <h2>My Assignments</h2>
              <p>Assignments created by your faculty</p>
            </div>
          </div>

          {assignments.length === 0 ? (
            <div className="student-empty">
              <span>📭</span>
              <p>No assignments available yet.</p>
            </div>
          ) : (
            <div className="student-assignment-grid">
              {assignments.map((item) => {
                const submitted = isSubmitted(item.id);

                return (
                  <div className="student-assignment-card" key={item.id}>
                    <div className="student-card-top">
                      <div className="student-assignment-icon">📝</div>

                      <span
                        className={
                          submitted
                            ? "student-status submitted"
                            : "student-status pending"
                        }
                      >
                        {submitted ? "Submitted" : "Pending"}
                      </span>
                    </div>

                    <h3>{item.title}</h3>

                    <p className="student-subject">
                      {item.subject || "Subject not specified"}
                    </p>

                    <div className="student-assignment-info">
                      <p>
                        <strong>Description:</strong>{" "}
                        {item.description || "No description available"}
                      </p>

                      <p>
                        <strong>Assigned Date:</strong>{" "}
                        {item.assignedDate || "Not specified"}
                      </p>

                      <p>
                        <strong>Deadline:</strong>{" "}
                        {item.deadline || "Not specified"}
                      </p>

                      <p>
                        <strong>Maximum Marks:</strong>{" "}
                        {item.maxMarks || 100}
                      </p>

                      <p>
                        <strong>Attachment:</strong>{" "}
                        {item.fileName || "No attachment"}
                      </p>
                    </div>

                    <button
                      className="student-submit-button"
                      onClick={() => setSelectedAssignment(item)}
                    >
                      {submitted ? "View / Resubmit →" : "Submit Assignment →"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        <section className="student-section" id="student-deadlines">
          <div className="student-section-heading">
            <div>
              <h2>Upcoming Deadlines</h2>
              <p>Assignments that you have not submitted yet</p>
            </div>
          </div>

          <div className="student-deadline-card">
            {upcomingAssignments.length > 0 ? (
              upcomingAssignments.map((item) => (
                <div className="student-deadline-row" key={item.id}>
                  <div className="student-deadline-icon">⏰</div>

                  <div className="student-deadline-details">
                    <strong>{item.title}</strong>
                    <span>{item.subject || "Subject not specified"}</span>
                  </div>

                  <div className="student-deadline-date">
                    <small>Due date</small>
                    <strong>{item.deadline || "Not specified"}</strong>
                  </div>

                  <button
                    onClick={() => setSelectedAssignment(item)}
                  >
                    Submit
                  </button>
                </div>
              ))
            ) : (
              <div className="student-empty">
                <span>🎉</span>
                <p>You have no pending assignments!</p>
              </div>
            )}
          </div>
        </section>

        <section className="student-section" id="student-results">
          <div className="student-section-heading">
            <div>
              <h2>My Results & Feedback</h2>
              <p>Marks and feedback provided by faculty</p>
            </div>
          </div>

          {evaluatedSubmissions.length === 0 ? (
            <div className="student-empty">
              <span>🏆</span>
              <p>
                No results available yet. Your results will appear
                after faculty evaluates your assignments.
              </p>
            </div>
          ) : (
            <div className="student-results-grid">
              {evaluatedSubmissions.map((item) => {
                const assignment = assignments.find(
                  (a) =>
                    String(a.id) === String(item.assignmentId)
                );

                return (
                  <div className="student-result-card" key={item.id}>
                    <div className="student-result-heading">
                      <div className="student-result-icon">🏆</div>
                      <span className="student-status evaluated">
                        Evaluated
                      </span>
                    </div>

                    <h3>
                      {item.assignmentTitle || "Assignment"}
                    </h3>

                    <p className="student-result-file">
                      File: {item.fileName || "Submitted file"}
                    </p>

                    <div className="student-marks-box">
                      <small>Marks Obtained</small>
                      <h2>
                        {item.marks} / {assignment?.maxMarks || 100}
                      </h2>
                    </div>

                    <p className="student-feedback-label">
                      Faculty Feedback
                    </p>

                    <p className="student-feedback">
                      {item.feedback || "No feedback provided."}
                    </p>

                    <p className="student-evaluation-date">
                      Evaluation Date: {item.evaluatedAt || "Not available"}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default StudentDashboard;
