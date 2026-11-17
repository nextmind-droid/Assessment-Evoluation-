
import React, { useState, useEffect } from "react";
import StudentSubmission from "./StudentSubmission";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Load assignments and submissions
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

  // Check assignment submission status
  const isSubmitted = (assignmentId) => {
    return submissions.some(
      (submission) =>
        String(submission.assignmentId) === String(assignmentId)
    );
  };

  // Get evaluated submissions
  const evaluatedSubmissions = submissions.filter(
    (item) => item.status === "Evaluated"
  );

  const submittedCount = assignments.filter(
    (item) => isSubmitted(item.id)
  ).length;

  const pendingCount = assignments.length - submittedCount;

  // Open student submission page
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
    <div className="dashboard">
      <h1>Student Dashboard</h1>

      <p>
        Welcome to the Anonymous Assignment Evaluation System!
      </p>

      {/* Dashboard Statistics */}
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Assignments</h3>
          <h2>{assignments.length}</h2>
        </div>

        <div className="card">
          <h3>Pending Assignments</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="card">
          <h3>Submitted Assignments</h3>
          <h2>{submittedCount}</h2>
        </div>

        <div className="card">
          <h3>Published Results</h3>
          <h2>{evaluatedSubmissions.length}</h2>
        </div>
      </div>

      {/* Available Assignments */}
      <h2>My Assignments</h2>

      <p>
        View assignments created by your faculty here.
      </p>

      {assignments.length === 0 ? (
        <p style={styles.empty}>
          No assignments available yet.
        </p>
      ) : (
        <div style={styles.assignmentList}>
          {assignments.map((item) => {
            const submitted = isSubmitted(item.id);

            return (
              <div key={item.id} style={styles.assignmentCard}>
                <h3 style={styles.title}>{item.title}</h3>

                <p><b>Subject:</b> {item.subject}</p>
                <p><b>Description:</b> {item.description}</p>
                <p><b>Assigned Date:</b> {item.assignedDate}</p>
                <p><b>Submission Deadline:</b> {item.deadline}</p>
                <p><b>Maximum Marks:</b> {item.maxMarks}</p>

                <p>
                  <b>Attachment:</b>{" "}
                  {item.fileName || "No attachment"}
                </p>

                <span
                  style={
                    submitted
                      ? styles.submittedStatus
                      : styles.status
                  }
                >
                  {submitted ? "Submitted" : "Pending Submission"}
                </span>

                <br />

                <button
                  style={styles.submitButton}
                  onClick={() => setSelectedAssignment(item)}
                >
                  {submitted ? "View / Resubmit" : "Submit Assignment"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Student Results Section */}
      <h2>My Results & Feedback</h2>

      <p>
        View your marks and faculty feedback after evaluation.
      </p>

      {evaluatedSubmissions.length === 0 ? (
        <p style={styles.empty}>
          No results available yet. Your results will appear
          after faculty evaluates your assignments.
        </p>
      ) : (
        <div style={styles.assignmentList}>
          {evaluatedSubmissions.map((item) => {
            const assignment = assignments.find(
              (a) =>
                String(a.id) === String(item.assignmentId)
            );

            return (
              <div key={item.id} style={styles.resultCard}>
                <h3 style={styles.title}>
                  {item.assignmentTitle}
                </h3>

                <p>
                  <b>File:</b> {item.fileName}
                </p>

                <p>
                  <b>Marks Obtained:</b>{" "}
                  <span style={styles.marks}>
                    {item.marks} / {assignment?.maxMarks || 100}
                  </span>
                </p>

                <p>
                  <b>Feedback:</b>
                </p>

                <p style={styles.feedback}>
                  {item.feedback || "No feedback provided."}
                </p>

                <p>
                  <b>Evaluation Date:</b>{" "}
                  {item.evaluatedAt || "Not available"}
                </p>

                <span style={styles.evaluatedStatus}>
                  Evaluated
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  assignmentList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  assignmentCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #4f46e5",
    color: "#334155"
  },

  resultCard: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #16a34a",
    color: "#334155"
  },

  title: {
    color: "#4338ca",
    marginTop: "0"
  },

  status: {
    display: "inline-block",
    marginTop: "10px",
    padding: "7px 12px",
    background: "#fef3c7",
    color: "#92400e",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  submittedStatus: {
    display: "inline-block",
    marginTop: "10px",
    padding: "7px 12px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  evaluatedStatus: {
    display: "inline-block",
    padding: "7px 12px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: "bold"
  },

  marks: {
    color: "#15803d",
    fontSize: "18px",
    fontWeight: "bold"
  },

  feedback: {
    background: "#f1f5f9",
    padding: "12px",
    borderRadius: "8px"
  },

  submitButton: {
    marginTop: "15px",
    padding: "10px 16px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  empty: {
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "8px",
    color: "#64748b"
  }
};

export default StudentDashboard;
