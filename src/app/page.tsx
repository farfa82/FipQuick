import Link from "next/link";

export default function Page() {
  return (
    <main style={{ background: "var(--bg)", padding: "40px 0 70px" }}>
      <div className="container">
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
          <div style={{ maxWidth: 900 }}>
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
              Trova farmacie, cliniche e supporto vicino a te.
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
              FipQuick aiuta i proprietari di gatti a trovare rapidamente risorse utili:
              farmacie con disponibilità, cliniche veterinarie, caregiver e telemedicina.
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

        <footer style={{ marginTop: 18, color: "var(--text-muted)", fontSize: 13 }}>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            I contenuti e i luoghi visibili nell’app sono gestiti dal team e aggiornati tramite database.
          </div>
        </footer>
      </div>
    </main>
  );
}
