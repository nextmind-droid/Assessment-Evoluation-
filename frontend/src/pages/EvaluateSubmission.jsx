
import React, { useState } from "react";

function EvaluateSubmission({ submission, onBack }) {
  const assignments = JSON.parse(
    localStorage.getItem("assignments") || "[]"
  );

  const assignment = assignments.find(
    (item) =>
      String(item.id) === String(submission.assignmentId)
  );

  const maxMarks = Number(assignment?.maxMarks) || 100;

  const [marks, setMarks] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      marks === "" ||
      Number(marks) < 0 ||
      Number(marks) > maxMarks
    ) {
      setMessage(`Enter marks between 0 and ${maxMarks}.`);
      return;
    }

    if (!feedback.trim()) {
      setMessage("Please enter feedback.");
      return;
    }

    const submissions = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    );

    const updatedSubmissions = submissions.map((item) =>
      item.id === submission.id
        ? {
            ...item,
            marks: Number(marks),
            feedback: feedback.trim(),
            status: "Evaluated",
            evaluatedAt: new Date().toLocaleString()
          }
        : item
    );

    localStorage.setItem(
      "submissions",
      JSON.stringify(updatedSubmissions)
    );

    alert("Evaluation saved successfully!");
    onBack();
  };

  return (
    <div className="dashboard">
      <button onClick={onBack}>
        ← Back to Submissions
      </button>

      <h1>Evaluate Assignment</h1>

      <div className="card">
        <h3>Anonymous Submission Details</h3>

        <p>
          <b>Assignment:</b> {submission.assignmentTitle}
        </p>

        <p>
          <b>File:</b> {submission.fileName}
        </p>

        <p>
          <b>Submitted At:</b> {submission.submittedAt}
        </p>

        <hr />

        <h2>Enter Evaluation Details</h2>

        <form onSubmit={handleSubmit}>
          <label>Marks (Maximum: {maxMarks})</label>

          <br /><br />

          <input
            type="number"
            min="0"
            max={maxMarks}
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter marks"
            required
          />

          <br /><br />

          <label>Faculty Feedback</label>

          <br /><br />

          <textarea
            rows="5"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter feedback for the student"
            required
            style={{ width: "100%", maxWidth: "500px" }}
          />

          <br /><br />

          <button type="submit">
            Save Evaluation
          </button>
        </form>

        {message && (
          <p style={{ color: "red" }}>{message}</p>
        )}
      </div>
    </div>
  );
}

export default EvaluateSubmission;
