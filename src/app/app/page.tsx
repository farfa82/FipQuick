import Link from "next/link";

export default function Overview() {
  return (
    <div>
      <div style={hero}>
        <div>
          <div style={pill}>Demo • Proprietari • Supporto FIP</div>
          <h1 style={{ margin: "10px 0 6px 0", fontSize: 30 }}>
            Un punto di riferimento rapido per chi affronta la FIP felina.
          </h1>
          <p style={{ margin: 0, color: "#475569", lineHeight: 1.6, maxWidth: 820 }}>
            Trova cliniche, farmacie e caregiver. Richiedi un teleconsulto e tieni traccia del percorso
            con un diario clinico semplice.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <Link href="/app/places" style={{ textDecoration: "none" }}>
              <button style={primaryBtn}>📍 Trova supporto vicino a te</button>
            </Link>
            <Link href="/app/teleconsulto" style={{ textDecoration: "none" }}>
              <button style={secondaryBtn}>📞 Richiedi teleconsulto</button>
            </Link>
          </div>
        </div>

        <div style={miniStats}>
          <Stat title="Supporti disponibili" value="—" note="Cliniche / Farmacie / Caregiver" />
          <Stat title="Teleconsulti" value="—" note="Richieste e prenotazioni" />
          <Stat title="Diario clinico" value="—" note="Note e andamento" />
        </div>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
        <Card
          title="Cliniche veterinarie (FIP)"
          text="Trova strutture informate e disponibili a seguire il percorso terapeutico."
          cta="Vai alle cliniche"
          href="/app/places"
          tag="🏥"
        />
        <Card
          title="Farmacie (GS-441524)"
          text="Individua rapidamente dove reperire il farmaco per ridurre i tempi di avvio terapia."
          cta="Vai alle farmacie"
          href="/app/places"
          tag="💊"
        />
        <Card
          title="Caregiver per la terapia"
          text="Supporto pratico per la gestione quotidiana, se hai bisogno di assistenza."
          cta="Vai ai caregiver"
          href="/app/places"
          tag="🤝"
        />
        <Card
          title="Diario clinico"
          text="Registra peso, note e somministrazioni. Una base semplice (espandibile) per seguire i progressi."
          cta="Apri il diario"
          href="/app/diario"
          tag="📒"
        />
      </div>

      <div style={note}>
        <strong>Nota:</strong>{" "}
        Questa è una demo UI per presentazione. Dati e testi saranno personalizzati con il cliente.
      </div>
    </div>
  );
}

function Stat({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div style={statCard}>
      <div style={{ color: "#64748b", fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 900, marginTop: 6 }}>{value}</div>
      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 6 }}>{note}</div>
    </div>
  );
}

function Card({
  title,
  text,
  cta,
  href,
  tag,
}: {
  title: string;
  text: string;
  cta: string;
  href: string;
  tag: string;
}) {
  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 900, fontSize: 16 }}>{title}</div>
        <div style={chip}>{tag}</div>
      </div>
      <p style={{ margin: "10px 0 14px 0", color: "#475569", lineHeight: 1.6 }}>{text}</p>
      <Link href={href} style={{ textDecoration: "none" }}>
        <button style={secondaryBtn}>{cta}</button>
      </Link>
    </div>
  );
}

const hero = {
  padding: 18,
  borderRadius: 22,
  border: "1px solid #e2e8f0",
  background:
    "radial-gradient(900px 250px at 20% 0%, rgba(14,165,233,0.14) 0%, rgba(14,165,233,0) 60%), radial-gradient(900px 250px at 80% 0%, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 60%), white",
  boxShadow: "0 18px 60px rgba(15,23,42,0.08)",
  display: "grid",
  gridTemplateColumns: "1.4fr 0.6fr",
  gap: 18,
  alignItems: "start",
} as const;

const pill = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "rgba(255,255,255,0.85)",
  color: "#334155",
  fontSize: 12,
  fontWeight: 700,
} as const;

const miniStats = {
  display: "grid",
  gap: 10,
} as const;

const statCard = {
  background: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(226,232,240,0.9)",
  borderRadius: 18,
  padding: 14,
} as const;

const card = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 16,
  boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
} as const;

const chip = {
  width: 34,
  height: 34,
  borderRadius: 14,
  background: "rgba(15,23,42,0.04)",
  display: "grid",
  placeItems: "center",
  border: "1px solid rgba(226,232,240,0.9)",
} as const;

const primaryBtn = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontWeight: 900,
} as const;

const secondaryBtn = {
  padding: "12px 16px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#0f172a",
  cursor: "pointer",
  fontWeight: 800,
} as const;

const note = {
  marginTop: 16,
  padding: 14,
  borderRadius: 18,
  border: "1px solid #e2e8f0",
  background: "rgba(255,255,255,0.9)",
  color: "#64748b",
} as const;
