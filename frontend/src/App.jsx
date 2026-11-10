
import React, { useState } from "react";

function App() {
  const [role, setRole] = useState("Student");

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f3f0ff",
      fontFamily: "Arial"
    }}>
      <div style={{
        background: "white",
        padding: "35px",
        borderRadius: "15px",
        width: "320px",
        boxShadow: "0 4px 15px #ccc"
      }}>
        <h2 style={{ color: "#673ab7" }}>
          Assignment Evaluation
        </h2>

        <h3>Login</h3>

        <label>Select Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "10px" }}
        >
          <option>Student</option>
          <option>Faculty</option>
          <option>Admin</option>
        </select>

        <p>Email Address</p>
        <input
          type="email"
          placeholder="Enter your email"
          style={{ width: "94%", padding: "10px" }}
        />

        <p>Password</p>
        <input
          type="password"
          placeholder="Enter password"
          style={{ width: "94%", padding: "10px" }}
        />

        <button style={{
          width: "100%",
          padding: "12px",
          marginTop: "20px",
          background: "#673ab7",
          color: "white",
          border: "none",
          borderRadius: "6px"
        }}>
          Login
        </button>

        <p style={{ textAlign: "center" }}>
          Anonymous Assignment Evaluation System
        </p>
      </div>
    </div>
  );
}

export default App;
