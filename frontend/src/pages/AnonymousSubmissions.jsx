
import React, { useEffect, useState } from "react";

function AnonymousSubmissions({ onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedSubmissions = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    );

    setSubmissions(savedSubmissions);
  }, []);

  // Download the uploaded file from IndexedDB
  const handleDownload = (submission) => {
    const request = indexedDB.open("AAESDatabase", 1);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains("submissionFiles")) {
        db.createObjectStore("submissionFiles");
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(
        "submissionFiles",
        "readonly"
      );

      const getRequest = transaction
        .objectStore("submissionFiles")
        .get(submission.id);

      getRequest.onsuccess = () => {
        const file = getRequest.result;

        if (!file) {
          setMessage("File not found in browser storage.");
          db.close();
          return;
        }

        const url = URL.createObjectURL(file);
        const link = document.createElement("a");

        link.href = url;
        link.download = submission.fileName;
        link.click();

        URL.revokeObjectURL(url);
        db.close();
        setMessage("File downloaded successfully!");
      };

      getRequest.onerror = () => {
        setMessage("Unable to download the file.");
        db.close();
      };
    };

    request.onerror = () => {
      setMessage("Unable to access submitted files.");
    };
  };

  return (
    <div className="dashboard">
      <button onClick={onBack} style={styles.backButton}>
        ← Back to Faculty Dashboard
      </button>

      <h1>Anonymous Submissions</h1>

      <p>
        View submitted assignments without seeing student identities.
      </p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Submissions</h3>
          <h2>{submissions.length}</h2>
        </div>

        <div className="card">
          <h3>Pending Evaluation</h3>
          <h2>{submissions.length}</h2>
        </div>
      </div>

      <h2>Submitted Assignments</h2>

      {message && (
        <p style={styles.message}>{message}</p>
      )}

      {submissions.length === 0 ? (
        <p style={styles.empty}>
          No student submissions available yet.
        </p>
      ) : (
        <div style={styles.list}>
          {submissions.map((item, index) => (
            <div key={item.id} style={styles.card}>
              <h3>Submission #{index + 1}</h3>

              <p>
                <b>Assignment:</b> {item.assignmentTitle}
              </p>

              <p>
                <b>File Name:</b> {item.fileName}
              </p>

              <p>
                <b>Submitted At:</b> {item.submittedAt}
              </p>

              <p>
                <b>Status:</b>{" "}
                <span style={styles.status}>
                  {item.status}
                </span>
              </p>

              <button
                onClick={() => handleDownload(item)}
                style={styles.downloadButton}
              >
                Download Assignment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  backButton: {
    padding: "10px 18px",
    marginBottom: "20px",
    background: "#64748b",
    color: "white",
    border: "none",
    borderRadius: "7px",
    cursor: "pointer"
  },

  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
    borderLeft: "5px solid #4f46e5",
    color: "#334155"
  },

  status: {
    color: "#166534",
    fontWeight: "bold"
  },

  downloadButton: {
    padding: "10px 15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px"
  },

  empty: {
    padding: "20px",
    background: "#f1f5f9",
    borderRadius: "8px",
    color: "#64748b"
  },

  message: {
    color: "#166534",
    fontWeight: "bold"
  }
};

export default AnonymousSubmissions;
