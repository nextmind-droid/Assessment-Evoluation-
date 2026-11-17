
import React, { useState } from "react";

function ManageAssignments() {
  const [assignments, setAssignments] = useState(
    JSON.parse(localStorage.getItem("assignments") || "[]")
  );

  const deleteAssignment = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmDelete) return;

    const updatedAssignments = assignments.filter(
      (assignment) => assignment.id !== id
    );

    setAssignments(updatedAssignments);
    localStorage.setItem(
      "assignments",
      JSON.stringify(updatedAssignments)
    );

    alert("Assignment deleted successfully!");
  };

  return (
    <div className="dashboard">
      <h1>Manage Assignments</h1>

      <p>View and manage all faculty assignments.</p>

      <h2>Assignment List</h2>

      {assignments.length === 0 ? (
        <p>No assignments available yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Assignment Title</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Deadline</th>
              <th>Maximum Marks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {assignments.map((assignment) => (
              <tr key={assignment.id}>
                <td>{assignment.title}</td>
                <td>{assignment.subject}</td>
                <td>{assignment.description}</td>
                <td>{assignment.deadline}</td>
                <td>{assignment.maxMarks}</td>
                <td>
                  <button
                    onClick={() => deleteAssignment(assignment.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ManageAssignments;
