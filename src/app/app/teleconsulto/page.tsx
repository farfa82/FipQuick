export default function TeleconsultoPage() {
  const slots = [
    { day: "Domani", hours: ["10:30", "12:00", "16:30"] },
    { day: "Dopodomani", hours: ["09:30", "11:00", "15:30"] },
    { day: "Entro 7 giorni", hours: ["su richiesta"] },
  ];

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Teleconsulto</h1>
      <p style={{ color: "#475569", marginTop: 6, lineHeight: 1.6, maxWidth: 860 }}>
        Richiedi un consulto telefonico o in videochiamata con professionisti esperti.
        In questa demo gli slot sono illustrativi.
      </p>

      <div style={hero}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>Prenotazione rapida</div>
        <p style={{ margin: "8px 0 0 0", color: "#475569", lineHeight: 1.6 }}>
          Seleziona uno slot indicativo e invia la richiesta. Potrai aggiungere note e dettagli del caso.
        </p>

        <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
          {slots.map((s) => (
            <div key={s.day} style={slotCard}>
              <div style={{ fontWeight: 900 }}>{s.day}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
                {s.hours.map((h) => (
                  <span key={h} style={pill}>{h}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button style={primaryBtn}>📞 Richiedi teleconsulto</button>
      </div>
    </div>
  );
}

const hero = {
  marginTop: 14,
  padding: 18,
  borderRadius: 22,
  border: "1px solid #e2e8f0",
  background:
    "radial-gradient(900px 250px at 20% 0%, rgba(14,165,233,0.14) 0%, rgba(14,165,233,0) 60%), radial-gradient(900px 250px at 80% 0%, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 60%), white",
  boxShadow: "0 18px 60px rgba(15,23,42,0.08)",
} as const;

const slotCard = {
  border: "1px solid rgba(226,232,240,0.9)",
  borderRadius: 18,
  padding: 14,
  background: "rgba(255,255,255,0.9)",
} as const;

const pill = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "white",
  color: "#334155",
  fontSize: 12,
  fontWeight: 700,
} as const;

const primaryBtn = {
  marginTop: 16,
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontWeight: 900,
} as const;
