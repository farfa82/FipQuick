import Link from "next/link";

export default function Landing() {
  return (
    <main style={{ fontFamily: "system-ui", color: "#0f172a" }}>
      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #e2e8f0",
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: "#0f172a",
              }}
              aria-hidden
            />
            <strong style={{ fontSize: 16, letterSpacing: 0.2 }}>
              FipQuick
            </strong>
          </div>

          <nav style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <a href="#come-funziona" style={linkStyle}>
              Come funziona
            </a>
            <a href="#feature" style={linkStyle}>
              Feature
            </a>
            <a href="#contatti" style={linkStyle}>
              Contatti
            </a>

            <div style={{ display: "flex", gap: 10, marginLeft: 6 }}>
              <Link href="/login" style={{ textDecoration: "none" }}>
                <button style={secondaryBtn}>Login</button>
              </Link>
              <Link href="/app" style={{ textDecoration: "none" }}>
                <button style={primaryBtn}>Entra nell’app</button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section
        style={{
          background:
            "radial-gradient(1200px 500px at 20% 0%, #e0f2fe 0%, rgba(224,242,254,0) 60%), radial-gradient(1200px 500px at 80% 10%, #ede9fe 0%, rgba(237,233,254,0) 55%)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 0.8fr",
              gap: 30,
              alignItems: "center",
              padding: "56px 0",
            }}
          >
            <div>
              <p style={pill}>MVP pronto • Supabase • Vercel</p>
              <h1 style={h1}>
                Luoghi, eventi e info utili.
                <br />
                In pochi secondi.
              </h1>
              <p style={lead}>
                FipQuick ti permette di consultare e gestire contenuti in modo
                semplice: ricerca rapida, categorie chiare e accesso protetto.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <Link href="/app" style={{ textDecoration: "none" }}>
                  <button style={primaryBtnBig}>Apri l’app</button>
                </Link>
                <Link href="/login" style={{ textDecoration: "none" }}>
                  <button style={secondaryBtnBig}>Accedi</button>
                </Link>
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 18,
                  marginTop: 18,
                  flexWrap: "wrap",
                }}
              >
                <div style={kpi}>
                  <div style={kpiNum}>⚡</div>
                  <div>
                    <div style={kpiTitle}>Veloce</div>
                    <div style={kpiText}>UI leggera, risultati immediati</div>
                  </div>
                </div>
                <div style={kpi}>
                  <div style={kpiNum}>🔒</div>
                  <div>
                    <div style={kpiTitle}>Protetto</div>
                    <div style={kpiText}>Accesso con Supabase Auth</div>
                  </div>
                </div>
                <div style={kpi}>
                  <div style={kpiNum}>🧩</div>
                  <div>
                    <div style={kpiTitle}>Espandibile</div>
                    <div style={kpiText}>Pronto per dashboard e ruoli</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mock card */}
            <div style={mockCard}>
              <div style={mockTopBar}>
                <span style={dot("#ef4444")} />
                <span style={dot("#f59e0b")} />
                <span style={dot("#22c55e")} />
                <span
                  style={{
                    marginLeft: 10,
                    color: "#64748b",
                    fontSize: 12,
                  }}
                >
                  /app
                </span>
              </div>
              <div style={{ padding: 18 }}>
                <div style={mockTitle}>FipQuick App</div>
                <div style={mockRow}>
                  <div style={mockBadge}>Luogo</div>
                  <div style={mockLine} />
                </div>
                <div style={mockRow}>
                  <div style={mockBadge}>Categoria</div>
                  <div style={mockLine} />
                </div>
                <div style={mockRow}>
                  <div style={mockBadge}>Lista</div>
                  <div style={mockLine} />
                </div>
                <div style={{ marginTop: 14 }}>
                  <div style={mockListItem}>
                    <strong>Centro Sportivo</strong> — Palestra
                  </div>
                  <div style={mockListItem}>
                    <strong>Parco</strong> — Outdoor
                  </div>
                  <div style={mockListItem}>
                    <strong>Bar</strong> — Ritrovo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Come funziona */}
      <section id="come-funziona" style={{ padding: "60px 0" }}>
        <div style={container}>
          <h2 style={h2}>Come funziona</h2>
          <p style={sub}>Tre passaggi semplici. Nessuna complicazione.</p>

          <div style={grid3}>
            <div style={card}>
              <div style={step}>1</div>
              <h3 style={h3}>Accedi</h3>
              <p style={p}>
                Login rapido con Supabase. Niente account strani, solo flusso
                pulito.
              </p>
            </div>
            <div style={card}>
              <div style={step}>2</div>
              <h3 style={h3}>Consulta</h3>
              <p style={p}>
                Vedi luoghi e categorie in un elenco chiaro. Pronto per ricerca e
                filtri.
              </p>
            </div>
            <div style={card}>
              <div style={step}>3</div>
              <h3 style={h3}>Espandi</h3>
              <p style={p}>
                Aggiungiamo dashboard, ruoli, gestione contenuti e tutto ciò che
                serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature */}
      <section
        id="feature"
        style={{
          padding: "60px 0",
          background: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div style={container}>
          <h2 style={h2}>Feature</h2>
          <p style={sub}>
            Quello che c’è già e quello che aggiungiamo subito dopo.
          </p>

          <div style={grid2}>
            <div style={card}>
              <h3 style={h3}>Già pronto</h3>
              <ul style={ul}>
                <li>Landing + App separata su /app</li>
                <li>Auth Supabase (session + logout)</li>
                <li>Deploy continuo su Vercel</li>
              </ul>
            </div>
            <div style={card}>
              <h3 style={h3}>Prossimo step</h3>
              <ul style={ul}>
                <li>Layout App con sidebar + dashboard</li>
                <li>CRUD (aggiungi/modifica luoghi)</li>
                <li>Ruoli (admin/user) + RLS</li>
              </ul>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link href="/app" style={{ textDecoration: "none" }}>
              <button style={primaryBtnBig}>Vai all’app</button>
            </Link>
            <Link href="/login" style={{ textDecoration: "none" }}>
              <button style={secondaryBtnBig}>Login</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contatti" style={{ padding: "40px 0" }}>
        <div style={container}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <div>
              <strong>FipQuick</strong>
              <div style={{ color: "#64748b", marginTop: 6 }}>
                MVP in evoluzione: landing → app → dashboard.
              </div>
            </div>

            <div style={{ color: "#64748b" }}>
              <div>Contatti</div>
              <div style={{ marginTop: 6 }}>
                <a href="mailto:info@fipquick.it" style={linkStyle}>
                  info@fipquick.it
                </a>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 22, color: "#94a3b8", fontSize: 12 }}>
            © {new Date().getFullYear()} FipQuick • Tutti i diritti riservati
          </div>
        </div>
      </footer>
    </main>
  );
}

/* Styles (no React.CSSProperties: build-safe) */
const container = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "0 20px",
} as const;

const linkStyle = {
  color: "#0f172a",
  textDecoration: "none",
  fontSize: 14,
} as const;

const primaryBtn = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #0f172a",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontSize: 14,
} as const;

const secondaryBtn = {
  padding: "8px 12px",
  borderRadius: 10,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#0f172a",
  cursor: "pointer",
  fontSize: 14,
} as const;

const primaryBtnBig = {
  ...primaryBtn,
  padding: "12px 18px",
  borderRadius: 14,
} as const;

const secondaryBtnBig = {
  ...secondaryBtn,
  padding: "12px 18px",
  borderRadius: 14,
} as const;

const pill = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "rgba(255,255,255,0.8)",
  color: "#334155",
  fontSize: 12,
  marginBottom: 14,
} as const;

const h1 = { fontSize: 46, lineHeight: 1.06, margin: 0 } as const;

const lead = {
  fontSize: 17,
  lineHeight: 1.6,
  color: "#334155",
  marginTop: 14,
  maxWidth: 720,
} as const;

const h2 = { fontSize: 28, margin: 0 } as const;

const sub = {
  color: "#475569",
  marginTop: 10,
  marginBottom: 26,
} as const;

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
} as const;

const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 16,
} as const;

const card = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 18,
  boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
} as const;

const step = {
  width: 34,
  height: 34,
  borderRadius: 12,
  background: "#0f172a",
  color: "white",
  display: "grid",
  placeItems: "center",
  fontWeight: 700,
  marginBottom: 10,
} as const;

const h3 = { margin: "6px 0 8px 0", fontSize: 18 } as const;

const p = { margin: 0, color: "#475569", lineHeight: 1.6 } as const;

const ul = {
  margin: "10px 0 0 18px",
  color: "#475569",
  lineHeight: 1.9,
} as const;

const kpi = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
  background: "rgba(255,255,255,0.75)",
} as const;

const kpiNum = { fontSize: 18 } as const;
const kpiTitle = { fontWeight: 700, fontSize: 13 } as const;
const kpiText = { color: "#64748b", fontSize: 12 } as const;

const mockCard = {
  borderRadius: 22,
  border: "1px solid #e2e8f0",
  background: "white",
  boxShadow: "0 18px 60px rgba(15,23,42,0.10)",
  overflow: "hidden",
} as const;

const mockTopBar = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "10px 12px",
  borderBottom: "1px solid #e2e8f0",
  background: "#f8fafc",
} as const;

const dot = (c: string) =>
  ({
    width: 10,
    height: 10,
    borderRadius: 99,
    background: c,
    display: "inline-block",
  }) as const;

const mockTitle = {
  fontWeight: 800,
  fontSize: 16,
  marginBottom: 12,
} as const;

const mockRow = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 10,
} as const;

const mockBadge = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "#fff",
  color: "#0f172a",
} as const;

const mockLine = {
  height: 10,
  background: "#e2e8f0",
  borderRadius: 999,
  flex: 1,
} as const;

const mockListItem = {
  padding: "10px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 14,
  marginTop: 10,
  background: "#fff",
} as const;
