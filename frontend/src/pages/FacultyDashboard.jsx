

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

  if (showAssignment) {
    return (
      <div>
        <button
          onClick={() => setShowAssignment(false)}
          style={styles.backButton}
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

  return (
    <div className="dashboard">
      <h1>Faculty Dashboard</h1>
      <p>Welcome to the Faculty Portal!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Assignments</h3>
          <h2>{assignments.length}</h2>
        </div>

        <div className="card">
          <h3>Total Submissions</h3>
          <h2>{submissions.length}</h2>
        </div>

        <div className="card">
          <h3>Pending Evaluations</h3>
          <h2>{submissions.length}</h2>
        </div>

        <div className="card">
          <h3>Completed Evaluations</h3>
          <h2>0</h2>
        </div>
      </div>

      <h2>Manage Assignments</h2>
      <p>Create and manage student assignments.</p>

      <button
        onClick={() => setShowAssignment(true)}
        style={styles.button}
      >
        + Create Assignment
      </button>

      <h2>Anonymous Submissions</h2>
      <p>
        View and download submissions without seeing student identities.
      </p>

      <button
        onClick={() => setShowSubmissions(true)}
        style={styles.button}
      >
        View Anonymous Submissions
      </button>

      <h2>Evaluation</h2>
      <p>
        Provide marks and feedback for submitted assignments.
      </p>
    </div>
  );
}

const styles = {
  button: {
    padding: "12px 22px",
    marginBottom: "15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    cursor: "pointer"
  },

  backButton: {
    padding: "10px 20px",
    margin: "15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }
};

export default FacultyDashboard;
