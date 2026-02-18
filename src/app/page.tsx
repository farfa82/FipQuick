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

          <nav style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="#come-funziona" style={navLink}>
              Come funziona
            </a>
            <a href="#cosa-trovi" style={navLink}>
              Cosa trovi
            </a>
            <a href="#nota" style={navLink}>
              Nota
            </a>
            <Link href="/app" style={{ textDecoration: "none" }}>
              <button style={primaryBtn}>Apri l’app</button>
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section style={heroSection}>
        <div style={container}>
          <p style={pill}>Demo • Accesso protetto • Luoghi e assistenza</p>

          <h1 style={heroTitle}>
            Supporto rapido per FIP felina:
            <br />
            cliniche, specialisti e terapia.
          </h1>

          <p style={heroText}>
            Una piattaforma pensata per aiutare chi affronta la Peritonite
            Infettiva Felina (FIP) a trovare assistenza affidabile:{" "}
            <strong>consulenza</strong>, <strong>terapia</strong> e{" "}
            <strong>supporto logistico</strong>.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
            <Link href="/app" style={{ textDecoration: "none" }}>
              <button style={primaryBtnLarge}>Entra nell’app</button>
            </Link>
            <a href="#come-funziona" style={{ textDecoration: "none" }}>
              <button style={secondaryBtnLarge}>Come funziona</button>
            </a>
          </div>

          <div style={kpiRow}>
            <div style={kpi}>
              <div style={kpiIcon}>📍</div>
              <div>
                <div style={kpiTitle}>Luoghi di supporto</div>
                <div style={kpiText}>Cliniche e ambulatori</div>
              </div>
            </div>
            <div style={kpi}>
              <div style={kpiIcon}>🩺</div>
              <div>
                <div style={kpiTitle}>Specialisti</div>
                <div style={kpiText}>Consulenza mirata FIP</div>
              </div>
            </div>
            <div style={kpi}>
              <div style={kpiIcon}>🤝</div>
              <div>
                <div style={kpiTitle}>Assistenza terapia</div>
                <div style={kpiText}>Aiuto pratico e operativo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW */}
      <section style={{ padding: "70px 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
        <div style={container}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap" }}>
            <div>
              <h2 style={sectionTitle}>Apri l’app e trova supporto vicino a te</h2>
              <p style={sectionText}>
                Nell’app i luoghi saranno consultabili in base alla distanza dell’utente registrato
                (in questa demo: elenco e filtri, evoluzione in corso).
              </p>
            </div>
            <Link href="/app" style={{ textDecoration: "none" }}>
              <button style={primaryBtnLarge}>Vedi i luoghi</button>
            </Link>
          </div>

          <Link href="/app/places" style={{ textDecoration: "none" }}>
            <div style={previewCard}>
              <div style={previewTopBar}>
                <span style={dot("#ef4444")} />
                <span style={dot("#f59e0b")} />
                <span style={dot("#10b981")} />
                <span style={{ marginLeft: 10, color: "#64748b", fontSize: 12 }}>/app/places</span>
              </div>

              <div style={{ padding: 20 }}>
                <div style={{ fontWeight: 800, marginBottom: 10 }}>
                  Elenco luoghi (demo)
                </div>

                <div style={previewGrid}>
                  <PreviewItem title="Clinica Veterinaria" subtitle="Consulenza + Terapia" />
                  <PreviewItem title="Specialista FIP" subtitle="Teleconsulenza / Referral" />
                  <PreviewItem title="Supporto Terapia" subtitle="Aiuto pratico (se necessario)" />
                  <PreviewItem title="Farmaco / Logistica" subtitle="Indicazioni dove reperirlo" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* COSA TROVI */}
      <section id="cosa-trovi" style={{ padding: "70px 0" }}>
        <div style={container}>
          <h2 style={sectionTitle}>Cosa trovi nella piattaforma</h2>
          <p style={sectionText}>
            Informazioni essenziali, organizzate bene. Niente caos quando serve lucidità.
          </p>

          <div style={grid3}>
            <CardStep
              title="Dove avere consulenza"
              text="Cliniche e specialisti che possono valutare il caso e supportare un percorso terapeutico."
            />
            <CardStep
              title="Dove reperire il farmaco"
              text="Indicazioni su disponibilità e canali di supporto (in base alle regole e alle informazioni verificate)."
            />
            <CardStep
              title="Dove eseguire la terapia"
              text="Strutture o supporto operativo, utile se il proprietario è impossibilitato o necessita assistenza."
            />
          </div>
        </div>
      </section>

      {/* COME FUNZIONA */}
      <section id="come-funziona" style={{ padding: "70px 0", background: "#f8fafc", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0" }}>
        <div style={container}>
          <h2 style={sectionTitle}>Come funziona</h2>

          <div style={grid3}>
            <CardStep
              title="1) Accedi"
              text="L’accesso è protetto: l’utente vede solo contenuti e funzioni previste dal profilo."
            />
            <CardStep
              title="2) Trova ciò che serve"
              text="Luoghi e contatti vengono presentati in modo chiaro (distanza, categoria, stato, info utili)."
            />
            <CardStep
              title="3) Richiedi supporto"
              text="Canali e indicazioni per orientarsi tra consulenza, terapia e logistica."
            />
          </div>
        </div>
      </section>

      {/* NOTA */}
      <section id="nota" style={{ padding: "70px 0" }}>
        <div style={container}>
          <div style={noteCard}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Nota importante</div>
            <p style={{ marginTop: 10, color: "#475569", lineHeight: 1.7 }}>
              Questa piattaforma nasce per <strong>orientare e facilitare</strong> la ricerca di supporto.
              Non sostituisce una visita veterinaria né costituisce indicazione medica.
              I contenuti possono essere aggiornati e verificati nel tempo in base alle fonti disponibili.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
              <Link href="/app" style={{ textDecoration: "none" }}>
                <button style={primaryBtnLarge}>Accedi all’app</button>
              </Link>
              <Link href="/app/places" style={{ textDecoration: "none" }}>
                <button style={secondaryBtnLarge}>Vai ai luoghi</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px 0", borderTop: "1px solid #e2e8f0" }}>
        <div style={container}>
          <div style={{ fontSize: 14, color: "#64748b" }}>
            © {new Date().getFullYear()} FipQuick • Demo di piattaforma per supporto FIP felina
          </div>
        </div>
      </footer>
    </main>
  );
}

function PreviewItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div style={previewItem}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <div style={{ color: "#64748b", marginTop: 4, fontSize: 13 }}>{subtitle}</div>
    </div>
  );
}

function CardStep({ title, text }: { title: string; text: string }) {
  return (
    <div style={cardStep}>
      <div style={{ fontWeight: 800 }}>{title}</div>
      <p style={{ marginTop: 10, color: "#475569", lineHeight: 1.7 }}>{text}</p>
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
  gap: 14,
  flexWrap: "wrap",
} as const;

const navLink = {
  textDecoration: "none",
  color: "#334155",
  fontSize: 14,
} as const;

const heroSection = {
  padding: "90px 0",
  background:
    "radial-gradient(1000px 500px at 20% 0%, #e0f2fe 0%, rgba(224,242,254,0) 60%), radial-gradient(1000px 500px at 80% 10%, rgba(20,184,166,0.18) 0%, rgba(20,184,166,0) 55%)",
  borderBottom: "1px solid #e2e8f0",
} as const;

const pill = {
  display: "inline-block",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "rgba(255,255,255,0.85)",
  color: "#334155",
  fontSize: 12,
} as const;

const heroTitle = {
  fontSize: 42,
  lineHeight: 1.12,
  marginTop: 14,
} as const;

const heroText = {
  marginTop: 16,
  fontSize: 18,
  color: "#475569",
  maxWidth: 760,
  lineHeight: 1.65,
} as const;

const primaryBtn = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontWeight: 700,
} as const;

const primaryBtnLarge = {
  ...primaryBtn,
  padding: "14px 18px",
  borderRadius: 14,
} as const;

const secondaryBtnLarge = {
  padding: "14px 18px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#0f172a",
  cursor: "pointer",
  fontWeight: 700,
} as const;

const sectionTitle = {
  fontSize: 28,
  marginBottom: 10,
} as const;

const sectionText = {
  color: "#64748b",
  marginBottom: 22,
  maxWidth: 820,
  lineHeight: 1.6,
} as const;

const kpiRow = {
  display: "flex",
  gap: 14,
  flexWrap: "wrap",
  marginTop: 22,
} as const;

const kpi = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  padding: "12px 14px",
  background: "rgba(255,255,255,0.85)",
  border: "1px solid #e2e8f0",
  borderRadius: 16,
} as const;

const kpiIcon = { fontSize: 18 } as const;
const kpiTitle = { fontWeight: 800, fontSize: 13 } as const;
const kpiText = { color: "#64748b", fontSize: 12 } as const;

const previewCard = {
  marginTop: 18,
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
  alignItems: "center",
  borderBottom: "1px solid #e2e8f0",
  background: "#f8fafc",
} as const;

const dot = (color: string) =>
  ({
    width: 10,
    height: 10,
    borderRadius: 99,
    background: color,
  }) as const;

const previewGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
  marginTop: 14,
} as const;

const previewItem = {
  border: "1px solid #e2e8f0",
  borderRadius: 14,
  padding: 14,
  background: "white",
} as const;

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 20,
  marginTop: 20,
} as const;

const cardStep = {
  background: "white",
  padding: 20,
  borderRadius: 16,
  border: "1px solid #e2e8f0",
  boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
} as const;

const noteCard = {
  background:
    "linear-gradient(180deg, rgba(20,184,166,0.12) 0%, rgba(255,255,255,1) 60%)",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: 22,
  boxShadow: "0 18px 60px rgba(15,23,42,0.08)",
} as const;
