import Link from "next/link";

export default function Page() {
  return (
    <main style={{ background: "var(--bg)", padding: "40px 0 70px" }}>
      <div className="container">
        {/* Top */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            flexWrap: "wrap",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img
              src="/logo.png"
              alt="FipQuick"
              width={44}
              height={44}
              style={{
                borderRadius: 12,
                objectFit: "cover",
                border: "2px solid rgba(31,42,68,0.10)",
              }}
            />
            <div style={{ fontWeight: 950, letterSpacing: 0.2 }}>FipQuick</div>
          </Link>

          <nav style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/login">
              <button className="btn-secondary">Login</button>
            </Link>
            <Link href="/app">
              <button className="btn-primary">Entra nell’app</button>
            </Link>
          </nav>
        </header>

        {/* Hero */}
        <section
          style={{
            marginTop: 26,
            border: "1px solid var(--border)",
            borderRadius: 26,
            padding: "26px 22px",
            background:
              "radial-gradient(900px 240px at 12% 0%, rgba(230,192,77,0.22) 0%, rgba(230,192,77,0) 60%), radial-gradient(900px 240px at 85% 0%, rgba(44,167,160,0.18) 0%, rgba(44,167,160,0) 60%), white",
            boxShadow: "0 18px 60px rgba(15,23,42,0.08)",
          }}
        >
          <div style={{ maxWidth: 840 }}>
            <div
              style={{
                display: "inline-flex",
                gap: 8,
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid var(--border)",
                background: "rgba(255,255,255,0.9)",
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--brand-blue)" }}>FIP a portata di mano</span>
              <span style={{ color: "var(--text-muted)" }}>• Supporto in Italia</span>
            </div>

            <h1 style={{ margin: "16px 0 10px", fontSize: 44, lineHeight: 1.08 }}>
              Trova supporto vicino a te, in modo chiaro e veloce.
            </h1>

            <div
              style={{
                width: 84,
                height: 6,
                background: "var(--brand-yellow)",
                borderRadius: 6,
                margin: "12px 0 16px",
              }}
            />

            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7 }}>
              FipQuick aiuta i proprietari di gatti a trovare rapidamente farmacie con disponibilità, cliniche veterinarie
              di supporto, caregiver e accesso a telemedicina.
            </p>

            <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/app">
                <button className="btn-primary">Apri l’app</button>
              </Link>
              <Link href="/login">
                <button className="btn-secondary">Accedi</button>
              </Link>
            </div>
          </div>
        </section>

        {/* 3 cards */}
        <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {[
            {
              title: "💊 Trova farmaco",
              text: "Individua farmacie con disponibilità vicino a te (in base ai dati inseriti).",
              accent: "var(--accent-purple)",
            },
            {
              title: "🏥 Cliniche di supporto",
              text: "Trova strutture veterinarie informate e disponibili a seguire la terapia.",
              accent: "var(--accent-teal)",
            },
            {
              title: "🤝 Caregiver e telemedicina",
              text: "Supporto pratico e consulenze a distanza, quando serve.",
              accent: "var(--accent-orange)",
            },
          ].map((x) => (
            <div
              key={x.title}
              className="card"
              style={{
                padding: 16,
                borderRadius: 20,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.98) 100%)",
              }}
            >
              <div style={{ fontWeight: 950, marginBottom: 6 }}>{x.title}</div>
              <div style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>{x.text}</div>
              <div style={{ marginTop: 12, width: 70, height: 4, background: x.accent, borderRadius: 6 }} />
            </div>
          ))}
        </section>

        {/* Footer mini */}
        <footer style={{ marginTop: 22, color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            <strong style={{ color: "var(--brand-blue)" }}>Nota:</strong> i contenuti e i luoghi visibili nell’app sono
            gestiti tramite database e aggiornati dal team.
          </div>
        </footer>
      </div>
    </main>
  );
}
