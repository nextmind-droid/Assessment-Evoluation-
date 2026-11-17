
import React, { useState } from "react";

function ManageFaculty() {
  const [faculty, setFaculty] = useState(
    JSON.parse(localStorage.getItem("faculty") || "[]")
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [facultyId, setFacultyId] = useState("");

  const addFaculty = (e) => {
    e.preventDefault();

    const newFaculty = {
      id: Date.now(),
      name,
      email,
      facultyId
    };

    const updatedFaculty = [...faculty, newFaculty];

    setFaculty(updatedFaculty);
    localStorage.setItem("faculty", JSON.stringify(updatedFaculty));

    setName("");
    setEmail("");
    setFacultyId("");

    alert("Faculty added successfully!");
  };

  const deleteFaculty = (id) => {
    const updatedFaculty = faculty.filter(
      (member) => member.id !== id
    );

    setFaculty(updatedFaculty);
    localStorage.setItem("faculty", JSON.stringify(updatedFaculty));
  };

  return (
    <div className="dashboard">
      <h1>Manage Faculty</h1>

      <h2>Add New Faculty</h2>

      <form onSubmit={addFaculty}>
        <input
          type="text"
          placeholder="Faculty Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Faculty Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Faculty ID"
          value={facultyId}
          onChange={(e) => setFacultyId(e.target.value)}
          required
        />

        <button type="submit">Add Faculty</button>
      </form>

      <h2>Faculty List</h2>

      {faculty.length === 0 ? (
        <p>No faculty members added yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Faculty ID</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {faculty.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.facultyId}</td>
                <td>
                  <button onClick={() => deleteFaculty(member.id)}>
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

export default ManageFaculty;
