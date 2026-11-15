
import React from "react";

function FacultyDashboard() {
  return (
    <div className="dashboard">
      <h1>Faculty Dashboard</h1>
      <p>Welcome to the Faculty Portal!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Assignments</h3>
          <h2>8</h2>
        </div>

        <div className="card">
          <h3>Total Submissions</h3>
          <h2>25</h2>
        </div>

        <div className="card">
          <h3>Pending Evaluations</h3>
          <h2>10</h2>
        </div>

        <div className="card">
          <h3>Completed Evaluations</h3>
          <h2>15</h2>
        </div>
      </div>

      <h2>Manage Assignments</h2>
      <p>Create and manage student assignments.</p>

      <h2>Anonymous Submissions</h2>
      <p>View and evaluate submissions without seeing student identities.</p>

      <h2>Evaluation</h2>
      <p>Provide marks and feedback for submitted assignments.</p>
    </div>
  );
}

export default FacultyDashboard;
