
// client/src/pages/Dashboard.js
import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <main style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Disaster Intelligence Dashboard</h2>
        <p>Welcome! Your dashboard is now ready.</p>
      </main>
    </div>
  );
}

export default Dashboard;