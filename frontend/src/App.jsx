
import React, { useState } from "react";

function App() {
  const [role, setRole] = useState("Student");
  const [page, setPage] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login UI completed! Backend authentication is pending.");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert("Password reset functionality will be connected to the backend.");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #e0e7ff, #f3e8ff)",
      fontFamily: "'Poppins', 'Segoe UI', sans-serif"
    }}>

      <div style={{
        background: "#ffffff",
        padding: "35px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "380px",
        boxShadow: "0 12px 35px rgba(79, 70, 229, 0.15)"
      }}>

        <h2 style={{
          color: "#4338ca",
          textAlign: "center",
          fontSize: "25px",
          marginBottom: "8px"
        }}>
          Assignment Evaluation
        </h2>

        <p style={{
          textAlign: "center",
          color: "#64748b",
          fontSize: "13px",
          marginBottom: "25px"
        }}>
          Anonymous Assignment Evaluation System
        </p>

        {page === "login" ? (
          <>
            <h3 style={{ color: "#1e293b" }}>Welcome Back!</h3>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Please login to continue
            </p>

            <form onSubmit={handleLogin}>

              <label>Select Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={inputStyle}
              >
                <option>Student</option>
                <option>Faculty</option>
                <option>Admin</option>
              </select>

              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />

              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
                required
              />

              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
                fontSize: "13px"
              }}>
                <label>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                  /> Show Password
                </label>

                <button
                  type="button"
                  onClick={() => setPage("forgot")}
                  style={linkStyle}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" style={buttonStyle}>
                Login
              </button>

            </form>
          </>
        ) : (
          <>
            <h3 style={{ color: "#1e293b" }}>Forgot Password?</h3>

            <p style={{ color: "#64748b", fontSize: "14px" }}>
              Enter your registered email address to reset your password.
            </p>

            <form onSubmit={handleForgotPassword}>
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                required
              />

              <button type="submit" style={buttonStyle}>
                Reset Password
              </button>
            </form>

            <button
              onClick={() => setPage("login")}
              style={{
                ...buttonStyle,
                background: "#e0e7ff",
                color: "#4338ca",
                marginTop: "12px"
              }}
            >
              ← Back to Login
            </button>
          </>
        )}

        <p style={{
          textAlign: "center",
          color: "#94a3b8",
          fontSize: "12px",
          marginTop: "25px"
        }}>
          © 2026 Anonymous Assignment Evaluation System
        </p>

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "18px",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  boxSizing: "border-box",
  fontSize: "14px",
  outlineColor: "#6366f1"
};

const buttonStyle = {
  width: "100%",
  padding: "13px",
  marginTop: "20px",
  background: "#4f46e5",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer"
};

const linkStyle = {
  background: "none",
  border: "none",
  color: "#4f46e5",
  cursor: "pointer",
  fontSize: "13px"
};

export default App;
