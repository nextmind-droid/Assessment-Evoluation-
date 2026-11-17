
import React, { useState } from "react";

function ManageSubjects() {
  const [subjects, setSubjects] = useState(
    JSON.parse(localStorage.getItem("subjects") || "[]")
  );

  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const addSubject = (e) => {
    e.preventDefault();

    const newSubject = {
      id: Date.now(),
      subjectName,
      subjectCode
    };

    const updatedSubjects = [...subjects, newSubject];

    setSubjects(updatedSubjects);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));

    setSubjectName("");
    setSubjectCode("");

    alert("Subject added successfully!");
  };

  const deleteSubject = (id) => {
    const updatedSubjects = subjects.filter(
      (subject) => subject.id !== id
    );

    setSubjects(updatedSubjects);
    localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
  };

  return (
    <div className="dashboard">
      <h1>Manage Subjects</h1>

      <h2>Add New Subject</h2>

      <form onSubmit={addSubject}>
        <input
          type="text"
          placeholder="Enter Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter Subject Code"
          value={subjectCode}
          onChange={(e) => setSubjectCode(e.target.value)}
          required
        />

        <button type="submit">Add Subject</button>
      </form>

      <h2>Subject List</h2>

      {subjects.length === 0 ? (
        <p>No subjects added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Subject Code</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td>{subject.subjectName}</td>
                <td>{subject.subjectCode}</td>
                <td>
                  <button onClick={() => deleteSubject(subject.id)}>
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

export default ManageSubjects;
