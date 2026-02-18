export default function Dashboard() {
  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Dashboard</h1>
      <p style={{ color: "#475569", marginTop: 6 }}>
        Benvenuto in FipQuick.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 16,
          marginTop: 18,
        }}
      >
        <Card title="Luoghi" value="—" />
        <Card title="Categorie" value="—" />
        <Card title="Utenti" value="—" />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
      }}
    >
      <div style={{ fontSize: 13, color: "#64748b" }}>{title}</div>
      <div style={{ fontSize: 28, fontWeight: 800, marginTop: 8 }}>
        {value}
      </div>
    </div>
  );
}
