export default function AlertPanel({ reports }) {
  Return (
    <div>
      <h3>Alerts</h3>
      {reports.filter(r => r.risk > 60).map(r => (
        <div key={r.id} style={{ color: "red" }}>
           High Risk: {r.description}
        </div>
      ))}
    </div>
  );
}
