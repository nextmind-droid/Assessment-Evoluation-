
import React, { useState } from "react";

function ManageStudents() {
  const [students, setStudents] = useState(
    JSON.parse(localStorage.getItem("students") || "[]")
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNumber, setRollNumber] = useState("");

  const addStudent = (e) => {
    e.preventDefault();

    if (!name || !email || !rollNumber) {
      alert("Please fill all fields");
      return;
    }

    const newStudent = {
      id: Date.now(),
      name,
      email,
      rollNumber
    };

    const updatedStudents = [...students, newStudent];

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    setName("");
    setEmail("");
    setRollNumber("");

    alert("Student added successfully!");
  };

  const deleteStudent = (id) => {
    const updatedStudents = students.filter(
      (student) => student.id !== id
    );

    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
  };

  return (
    <div className="dashboard">
      <h1>Manage Students</h1>

      <h2>Add New Student</h2>

      <form onSubmit={addStudent}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          required
        />

        <button type="submit">Add Student</button>
      </form>

      <h2>Student List</h2>

      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Roll Number</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNumber}</td>
                <td>
                  <button
                    onClick={() => deleteStudent(student.id)}
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

export default ManageStudents;
