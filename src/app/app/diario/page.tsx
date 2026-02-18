export default function DiarioPage() {
  const entries = [
    { date: "Oggi", weight: "4.2 kg", therapy: "GS-441524", note: "Appetito ok. Energia in aumento." },
    { date: "Ieri", weight: "4.1 kg", therapy: "GS-441524", note: "Controllo temperatura. Idratazione regolare." },
    { date: "2 giorni fa", weight: "4.0 kg", therapy: "GS-441524", note: "Prima settimana: miglioramento generale." },
  ];

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Diario clinico</h1>
      <p style={{ color: "#475569", marginTop: 6, lineHeight: 1.6, maxWidth: 860 }}>
        Tieni traccia di peso, note e somministrazioni. In questa demo i dati sono di esempio:
        il diario sarà personale per ogni utente.
      </p>

      <div style={topCards}>
        <InfoCard title="Gatto" value="(demo) Micio" note="Profilo personalizzabile" />
        <InfoCard title="Peso attuale" value="4.2 kg" note="Aggiornato oggi" />
        <InfoCard title="Terapia" value="GS-441524" note="Indicativo / demo" />
      </div>

      <div style={tableCard}>
        <div style={tableHeader}>
          <div>Data</div>
          <div>Peso</div>
          <div>Terapia</div>
          <div>Note</div>
        </div>

        {entries.map((e, idx) => (
          <div key={idx} style={row}>
            <div style={{ fontWeight: 900 }}>{e.date}</div>
            <div>{e.weight}</div>
            <div>{e.therapy}</div>
            <div style={{ color: "#475569" }}>{e.note}</div>
          </div>
        ))}
      </div>

      <button style={primaryBtn}>➕ Aggiungi nota (demo)</button>
    </div>
  );
}

function InfoCard({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div style={infoCard}>
      <div style={{ color: "#64748b", fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>{value}</div>
      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>{note}</div>
    </div>
  );
}

const topCards = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 12,
} as const;

const infoCard = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 14,
  boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
} as const;

const tableCard = {
  marginTop: 14,
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  overflow: "hidden",
  boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
} as const;

const tableHeader = {
  display: "grid",
  gridTemplateColumns: "0.7fr 0.6fr 0.9fr 1.8fr",
  gap: 12,
  padding: "12px 14px",
  background: "#f8fafc",
  borderBottom: "1px solid #e2e8f0",
  fontWeight: 900,
} as const;

const row = {
  display: "grid",
  gridTemplateColumns: "0.7fr 0.6fr 0.9fr 1.8fr",
  gap: 12,
  padding: "12px 14px",
  borderBottom: "1px solid #f1f5f9",
  alignItems: "start",
} as const;

const primaryBtn = {
  marginTop: 14,
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontWeight: 900,
} as const;
