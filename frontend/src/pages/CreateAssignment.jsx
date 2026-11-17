
import React, { useState } from "react";

function CreateAssignment() {
  const [assignment, setAssignment] = useState({
    title: "",
    subject: "",
    description: "",
    assignedDate: "",
    deadline: "",
    maxMarks: ""
  });

  const [file, setFile] = useState(null);
  const [created, setCreated] = useState(false);

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setCreated(true);

    alert("Assignment created successfully!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Create Assignment</h1>

        <p style={styles.subtitle}>
          Enter the assignment details below.
        </p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Assignment Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter assignment title"
            value={assignment.title}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="Enter subject name"
            value={assignment.subject}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Description</label>
          <textarea
            name="description"
            placeholder="Enter assignment instructions"
            value={assignment.description}
            onChange={handleChange}
            style={styles.textarea}
            required
          />

          <label style={styles.label}>Assigned Date</label>
          <input
            type="date"
            name="assignedDate"
            value={assignment.assignedDate}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Submission Deadline</label>
          <input
            type="date"
            name="deadline"
            value={assignment.deadline}
            onChange={handleChange}
            min={assignment.assignedDate || undefined}
            style={styles.input}
            required
          />

          <label style={styles.label}>Maximum Marks</label>
          <input
            type="number"
            name="maxMarks"
            placeholder="Enter maximum marks"
            min="1"
            value={assignment.maxMarks}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <label style={styles.label}>Upload Assignment File (Optional)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.input}
          />

          {file && (
            <p style={styles.fileName}>
              Selected file: {file.name}
            </p>
          )}

          <button type="submit" style={styles.button}>
            Create Assignment
          </button>
        </form>

        {created && (
          <div style={styles.success}>
            <h3>Assignment Created!</h3>
            <p><b>Title:</b> {assignment.title}</p>
            <p><b>Subject:</b> {assignment.subject}</p>
            <p><b>Deadline:</b> {assignment.deadline}</p>
            <p><b>Maximum Marks:</b> {assignment.maxMarks}</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f1f5f9",
    padding: "30px 15px",
    fontFamily: "Segoe UI, sans-serif"
  },

  card: {
    maxWidth: "650px",
    margin: "auto",
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.08)"
  },

  heading: {
    color: "#4338ca",
    textAlign: "center"
  },

  subtitle: {
    color: "#64748b",
    textAlign: "center",
    marginBottom: "25px"
  },

  label: {
    display: "block",
    marginTop: "15px",
    fontWeight: "600",
    color: "#334155"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginTop: "7px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    boxSizing: "border-box"
  },

  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    marginTop: "7px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    boxSizing: "border-box",
    resize: "vertical"
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },

  fileName: {
    color: "#4338ca",
    fontSize: "13px"
  },

  success: {
    marginTop: "25px",
    padding: "15px",
    background: "#ecfdf5",
    borderRadius: "8px",
    color: "#166534"
  }
};

export default CreateAssignment;
