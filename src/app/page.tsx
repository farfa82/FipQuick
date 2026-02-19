import Link from "next/link";

export default function Landing() {
  return (
    <main style={{ fontFamily: "system-ui", color: "#0f172a" }}>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #e2e8f0",
          zIndex: 10,
        }}
      >
        <div style={containerHeader}>
          <Link href="/" style={{ textDecoration: "none", color: "#0f172a" }}>
            <strong style={{ fontSize: 18 }}>FipQuick</strong>
          </Link>

          <nav style={{ display: "flex", gap: 16 }}>
            <a href="#funziona" style={navLink}>Come funziona</a>
            <a href="#perchi" style={navLink}>Per chi</a>
            <Link href="/app" style={{ textDecoration: "none" }}>
              <button style={primaryBtn}>Accedi alla piattaforma</button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={heroSection}>
        <div style={container}>
          <h1 style={heroTitle}>
            Gestione strutture veterinarie
            <br />
            semplice, moderna, immediata.
          </h1>

          <p style={heroText}>
            FipQuick è una piattaforma pensata per cliniche veterinarie,
            strutture petcare e professionisti del settore.
            Organizza sedi, piani attivi e scadenze in modo chiaro.
          </p>

          <div style={{ marginTop: 20 }}>
            <Link href="/app">
              <button style={primaryBtnLarge}>Prova la demo</button>
            </Link>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section style={{ padding: "70px 0", background: "#f8fafc" }}>
        <div style={container}>
          <h2 style={sectionTitle}>Anteprima piattaforma</h2>
          <p style={sectionText}>
            Una dashboard intuitiva per controllare stato, piani attivi e scadenze.
          </p>

          <Link href="/app" style={{ textDecoration: "none" }}>
            <div style={previewCard}>
              <div style={previewTopBar}>
                <span style={dot("#ef4444")} />
                <span style={dot("#f59e0b")} />
                <span style={dot("#10b981")} />
              </div>

              <div style={{ padding: 20 }}>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>
                  Dashboard
                </div>

                <div style={mockLine}></div>
                <div style={{ ...mockLine, width: "80%" }}></div>
                <div style={{ ...mockLine, width: "60%" }}></div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="funziona" style={{ padding: "70px 0" }}>
        <div style={container}>
          <h2 style={sectionTitle}>Come funziona</h2>

          <div style={grid3}>
            <CardStep
              title="1. Registra le strutture"
              text="Inserisci cliniche o centri petcare e assegna il piano attivo."
            />
            <CardStep
              title="2. Monitora lo stato"
              text="Visualizza rapidamente quali sedi sono attive e quali in scadenza."
            />
            <CardStep
              title="3. Intervieni in tempo"
              text="Evita interruzioni grazie al controllo centralizzato delle date."
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 0", borderTop: "1px solid #e2e8f0" }}>
        <div style={container}>
          <div style={{ fontSize: 14, color: "#64748b" }}>
            © {new Date().getFullYear()} FipQuick • Soluzione gestionale per il settore veterinario
          </div>
        </div>
      </footer>
    </main>
  );
}

/* COMPONENTI */

function CardStep({ title, text }: { title: string; text: string }) {
  return (
    <div style={cardStep}>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <p style={{ marginTop: 10, color: "#475569" }}>{text}</p>
    </div>
  );
}

/* STILI */

const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
} as const;

const containerHeader = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "16px 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
} as const;

const navLink = {
  textDecoration: "none",
  color: "#334155",
  fontSize: 14,
} as const;

const heroSection = {
  padding: "90px 0",
  background:
    "radial-gradient(1000px 500px at 20% 0%, #e0f2fe 0%, rgba(224,242,254,0) 60%)",
} as const;

const heroTitle = {
  fontSize: 42,
  lineHeight: 1.1,
} as const;

const heroText = {
  marginTop: 18,
  fontSize: 18,
  color: "#475569",
  maxWidth: 700,
} as const;

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
} as const;

const primaryBtnLarge = {
  ...primaryBtn,
  padding: "14px 22px",
  borderRadius: 14,
} as const;

const sectionTitle = {
  fontSize: 28,
  marginBottom: 10,
} as const;

const sectionText = {
  color: "#64748b",
  marginBottom: 30,
} as const;

const previewCard = {
  marginTop: 20,
  borderRadius: 18,
  background: "white",
  boxShadow: "0 20px 60px rgba(15,23,42,0.08)",
  border: "1px solid #e2e8f0",
  overflow: "hidden",
  cursor: "pointer",
} as const;

const previewTopBar = {
  padding: 12,
  display: "flex",
  gap: 6,
  borderBottom: "1px solid #e2e8f0",
} as const;

const dot = (color: string) =>
  ({
    width: 10,
    height: 10,
    borderRadius: 99,
    background: color,
  }) as const;

const mockLine = {
  height: 12,
  background: "#e2e8f0",
  borderRadius: 999,
  marginTop: 10,
} as const;

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
  marginTop: 30,
} as const;

const cardStep = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  border: "1px solid #e2e8f0",
} as const;
