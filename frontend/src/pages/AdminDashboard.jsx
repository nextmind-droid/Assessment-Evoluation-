
function AdminDashboard() {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Students</h3>
          <p>120</p>
        </div>

        <div className="card">
          <h3>Total Faculty</h3>
          <p>15</p>
        </div>

        <div className="card">
          <h3>Total Assignments</h3>
          <p>25</p>
        </div>

        <div className="card">
          <h3>Total Submissions</h3>
          <p>90</p>
        </div>
      </div>

      <h2>Management</h2>
      <ul>
        <li>Manage Students</li>
        <li>Manage Faculty</li>
        <li>Manage Subjects</li>
        <li>Manage Assignments</li>
        <li>Monitor Submissions</li>
      </ul>
    </div>
  );
}

export default AdminDashboard;
