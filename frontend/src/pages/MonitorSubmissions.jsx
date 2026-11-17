
import React, { useState, useEffect } from "react";

function MonitorSubmissions() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const savedSubmissions =
      JSON.parse(localStorage.getItem("submissions")) || [];

    setSubmissions(savedSubmissions);
  }, []);

  const submittedCount = submissions.length;

  const evaluatedCount = submissions.filter(
    (item) => item.status === "Evaluated"
  ).length;

  return (
    <div className="dashboard">
      <h1>Monitor Submissions</h1>
      <p>View and monitor all anonymous student submissions.</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Submissions</h3>
          <h2>{submittedCount}</h2>
        </div>

        <div className="card">
          <h3>Evaluated</h3>
          <h2>{evaluatedCount}</h2>
        </div>

        <div className="card">
          <h3>Pending Evaluation</h3>
          <h2>{submittedCount - evaluatedCount}</h2>
        </div>
      </div>

      <h2>Submission Details</h2>

      {submissions.length === 0 ? (
        <p>No submissions available yet.</p>
      ) : (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>File Name</th>
                <th>Submitted At</th>
                <th>Status</th>
                <th>Marks</th>
                <th>Feedback</th>
              </tr>
            </thead>

            <tbody>
              {submissions.map((item) => (
                <tr key={item.id}>
                  <td>{item.assignmentTitle}</td>
                  <td>{item.fileName}</td>
                  <td>{item.submittedAt}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.marks !== undefined &&
                    item.marks !== null
                      ? item.marks
                      : "Not evaluated"}
                  </td>
                  <td>{item.feedback || "No feedback yet"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MonitorSubmissions;
