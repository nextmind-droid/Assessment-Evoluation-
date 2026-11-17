
import React, { useEffect, useState } from "react";
import EvaluateSubmission from "./EvaluateSubmission";

function AnonymousSubmissions({ onBack }) {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [message, setMessage] = useState("");

  const loadSubmissions = () => {
    const saved = JSON.parse(
      localStorage.getItem("submissions") || "[]"
    );
    setSubmissions(saved);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  if (selectedSubmission) {
    return (
      <EvaluateSubmission
        submission={selectedSubmission}
        onBack={() => {
          setSelectedSubmission(null);
          loadSubmissions();
        }}
      />
    );
  }

  const handleDownload = (submission) => {
    const request = indexedDB.open("AAESDatabase", 1);

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

        setTimeout(() => URL.revokeObjectURL(url), 1000);
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

  const pendingCount = submissions.filter(
    (item) => item.status !== "Evaluated"
  ).length;

  return (
    <div className="dashboard">
      <button onClick={onBack}>
        ← Back to Faculty Dashboard
      </button>

      <h1>Anonymous Submissions</h1>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Submissions</h3>
          <h2>{submissions.length}</h2>
        </div>

        <div className="card">
          <h3>Pending Evaluation</h3>
          <h2>{pendingCount}</h2>
        </div>

        <div className="card">
          <h3>Completed Evaluations</h3>
          <h2>{submissions.length - pendingCount}</h2>
        </div>
      </div>

      {message && <p>{message}</p>}

      <h2>Submitted Assignments</h2>

      {submissions.length === 0 ? (
        <p>No student submissions available yet.</p>
      ) : (
        <div>
          {submissions.map((item, index) => (
            <div className="card" key={item.id}>
              <h3>Submission #{index + 1}</h3>

              <p>
                <b>Assignment:</b> {item.assignmentTitle}
              </p>

              <p>
                <b>File:</b> {item.fileName}
              </p>

              <p>
                <b>Submitted At:</b> {item.submittedAt}
              </p>

              <p>
                <b>Status:</b> {item.status}
              </p>

              <button
                onClick={() => handleDownload(item)}
              >
                Download Assignment
              </button>

              {item.status === "Evaluated" ? (
                <p style={{ color: "green" }}>
                  Evaluation Completed
                </p>
              ) : (
                <button
                  onClick={() => setSelectedSubmission(item)}
                  style={{ marginLeft: "10px" }}
                >
                  Evaluate Assignment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnonymousSubmissions;
