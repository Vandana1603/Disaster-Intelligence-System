import { useEffect, useState } from "react";
import axios from "axios";

export default function AnalyticsPanel() {
  Const [reports, setReports] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/reports")
        .then(res => setReports(res.data));
  }, []);

  Return (
    <div style={{ width: "30%", padding: "10px", background: "#111", color: "#fff" }}>
      <h2>Analytics</h2>
      <p>Total Reports: {reports.length}</p>

      {reports.map(r => (
        <div key={r.id}>
          {r.description} → Risk: {r.risk}%
        </div>
      ))}
    </div>
  );
}
