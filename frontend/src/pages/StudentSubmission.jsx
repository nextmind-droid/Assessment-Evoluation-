
import React, { useState } from "react";

// Save the actual selected file in browser storage
function saveFileToBrowser(file, submissionId) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open("AAESDatabase", 1);

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
        "readwrite"
      );

      transaction.objectStore("submissionFiles").put(
        file,
        submissionId
      );

      transaction.oncomplete = () => {
        db.close();
        resolve();
      };

      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    };

    request.onerror = () => reject(request.error);
  });
}

function StudentSubmission({ assignment, onBack }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [inputKey, setInputKey] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    setMessage("");
    setError("");

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const extension = selectedFile.name
      .split(".")
      .pop()
      .toLowerCase();

    if (!["pdf", "doc", "docx"].includes(extension)) {
      setError("Please select a PDF, DOC or DOCX file.");
      setFile(null);
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10 MB.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select an assignment file.");
      return;
    }

    try {
      const submissionId = Date.now();

      const submission = {
        id: submissionId,
        assignmentId: assignment?.id || null,
        assignmentTitle: assignment?.title || "Assignment",
        fileName: file.name,
        fileSize: file.size,
        submittedAt: new Date().toLocaleString(),
        status: "Submitted"
      };

      // Save the actual file in IndexedDB
      await saveFileToBrowser(file, submissionId);

      // Save submission details in localStorage
      const submissions = JSON.parse(
        localStorage.getItem("submissions") || "[]"
      );

      submissions.push(submission);

      localStorage.setItem(
        "submissions",
        JSON.stringify(submissions)
      );

      setMessage("Assignment submitted successfully!");
      setError("");
      setFile(null);
      setInputKey((previous) => previous + 1);

    } catch (err) {
      setError("Unable to submit assignment. Please try again.");
    }
  };

  return (
    <div className="dashboard">
      {onBack && (
        <button onClick={onBack}>
          ← Back to Dashboard
        </button>
      )}

      <h1>Submit Assignment</h1>

      <p>Upload your assignment for evaluation.</p>

      <div className="card">
        <h2>Assignment Details</h2>

        <p>
          <strong>Title:</strong>{" "}
          {assignment?.title || "Selected Assignment"}
        </p>

        <p>
          <strong>Subject:</strong>{" "}
          {assignment?.subject || "Not specified"}
        </p>

        <p>
          <strong>Deadline:</strong>{" "}
          {assignment?.deadline || "Not specified"}
        </p>

        <hr />

        <h2>Upload Your File</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Select Assignment File
          </label>

          <br /><br />

          <input
            key={inputKey}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />

          <p>Allowed formats: PDF, DOC, DOCX</p>
          <p>Maximum file size: 10 MB</p>

          {file && (
            <p>
              Selected File: <strong>{file.name}</strong>
            </p>
          )}

          <br />

          <button type="submit">
            Submit Assignment
          </button>
        </form>

        {message && (
          <p style={{ color: "green" }}>
            {message}
          </p>
        )}

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default StudentSubmission;
