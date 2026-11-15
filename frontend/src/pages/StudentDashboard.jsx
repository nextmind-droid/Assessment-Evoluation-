
import React from "react";

function StudentDashboard() {
  return (
    <div className="dashboard">
      <h1>Student Dashboard</h1>
      <p>Welcome to the Anonymous Assignment Evaluation System!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Assignments</h3>
          <h2>10</h2>
        </div>

        <div className="card">
          <h3>Pending Assignments</h3>
          <h2>4</h2>
        </div>

        <div className="card">
          <h3>Submitted Assignments</h3>
          <h2>6</h2>
        </div>

        <div className="card">
          <h3>Published Results</h3>
          <h2>3</h2>
        </div>
      </div>

      <h2>My Assignments</h2>
      <p>View and submit your assignments here.</p>

      <h2>My Results</h2>
      <p>Check your marks and faculty feedback here.</p>
    </div>
  );
}

export default StudentDashboard;
