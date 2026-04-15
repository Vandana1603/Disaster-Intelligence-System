// client/src/components/Sidebar.js
import React from "react";

function Sidebar() {
  return (
    <aside style={{ width: "200px", float: "left", padding: "10px", backgroundColor: "#eee", height: "100vh" }}>
      <ul>
        <li>Map</li>
        <li>Analytics</li>
        <li>Reports</li>
      </ul>
    </aside>
  );
}

export default Sidebar;