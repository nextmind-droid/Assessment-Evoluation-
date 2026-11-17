
import React, { useState, useEffect } from "react";

function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);

  // Load assignments from browser storage
  useEffect(() => {
    const savedAssignments = JSON.parse(
      localStorage.getItem("assignments") || "[]"
    );

    setAssignments(savedAssignments);
  }, []);

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
          <h2>{assignments.length}</h2>
        </div>

        <div className="card">
          <h3>Submitted Assignments</h3>
          <h2>0</h2>
        </div>

        <div className="card">
          <h3>Published Results</h3>
          <h2>0</h2>
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

          {assignments.map((item) => (
            <div key={item.id} style={styles.assignmentCard}>

              <h3 style={styles.title}>
                {item.title}
              </h3>

              <p>
                <b>Subject:</b> {item.subject}
              </p>

              <p>
                <b>Description:</b> {item.description}
              </p>

              <p>
                <b>Assigned Date:</b> {item.assignedDate}
              </p>

              <p>
                <b>Submission Deadline:</b> {item.deadline}
              </p>

              <p>
                <b>Maximum Marks:</b> {item.maxMarks}
              </p>

              <p>
                <b>Attachment:</b>{" "}
                {item.fileName || "No attachment"}
              </p>

              <span style={styles.status}>
                Pending Submission
              </span>

            </div>
          ))}

        </div>
      )}

      {/* Results Section */}
      <h2>My Results</h2>

      <p>
        Your marks and faculty feedback will appear here
        after evaluation and publication.
      </p>

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

  empty: {
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "8px",
    color: "#64748b"
  }
};

export default StudentDashboard;
