
import React, { useState } from "react";

function AdminDashboard() {
  const [students] = useState(
    JSON.parse(localStorage.getItem("students") || "[]")
  );

  const [faculty] = useState(
    JSON.parse(localStorage.getItem("faculty") || "[]")
  );

  const [assignments] = useState(
    JSON.parse(localStorage.getItem("assignments") || "[]")
  );

  const [submissions] = useState(
    JSON.parse(localStorage.getItem("submissions") || "[]")
  );

  const managementOptions = [
    "Manage Students",
    "Manage Faculty",
    "Manage Subjects",
    "Manage Assignments",
    "Monitor Submissions"
  ];

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="card">
          <h3>Total Faculty</h3>
          <p>{faculty.length}</p>
        </div>

        <div className="card">
          <h3>Total Assignments</h3>
          <p>{assignments.length}</p>
        </div>

        <div className="card">
          <h3>Total Submissions</h3>
          <p>{submissions.length}</p>
        </div>
      </div>

      <h2>Management</h2>

      <div className="management-list">
        {managementOptions.map((option, index) => (
          <div className="card" key={index}>
            <h3>{option}</h3>
            <p>Manage and monitor {option.toLowerCase()}.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
