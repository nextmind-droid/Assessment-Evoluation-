
import React, { useState } from "react";

function AdminDashboard({ onManageStudents, onManageFaculty }) {
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

        <div className="card">
          <h3>Manage Students</h3>
          <p>Add, view and delete student details.</p>
          <button onClick={onManageStudents}>
            Manage Students
          </button>
        </div>

        <div className="card">
          <h3>Manage Faculty</h3>
          <p>Add, view and delete faculty details.</p>
          <button onClick={onManageFaculty}>
            Manage Faculty
          </button>
        </div>

        <div className="card">
          <h3>Manage Subjects</h3>
          <p>Add and manage subjects.</p>
        </div>

        <div className="card">
          <h3>Manage Assignments</h3>
          <p>View and manage assignments.</p>
        </div>

        <div className="card">
          <h3>Monitor Submissions</h3>
          <p>Monitor student assignment submissions.</p>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
