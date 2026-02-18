import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      <aside style={sidebar}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={logoDot} aria-hidden />
          <div>
            <div style={{ fontWeight: 900, fontSize: 16, lineHeight: 1 }}>
              FipQuick
            </div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              Supporto FIP felina
            </div>
          </div>
        </div>

        <nav style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/app" style={navItem}>
            🏠 Panoramica
          </Link>
          <Link href="/app/places" style={navItem}>
            📍 Trova supporto
          </Link>
          <Link href="/app/teleconsulto" style={navItem}>
            📞 Teleconsulto
          </Link>
          <Link href="/app/diario" style={navItem}>
            📒 Diario clinico
          </Link>
        </nav>

        <div style={helpCard}>
          <div style={{ fontWeight: 800 }}>Hai bisogno di aiuto?</div>
          <div style={{ color: "#64748b", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
            Questa è una demo: testi e funzioni saranno personalizzati con il cliente.
          </div>
          <Link href="/app/places" style={{ textDecoration: "none" }}>
            <button style={primaryBtn}>Vai ai luoghi</button>
          </Link>
        </div>

        <div style={{ marginTop: "auto", color: "#94a3b8", fontSize: 12 }}>
          © {new Date().getFullYear()} FipQuick
        </div>
      </aside>

      <main style={content}>{children}</main>
    </div>
  );
}

const sidebar = {
  width: 280,
  padding: 18,
  background: "rgba(255,255,255,0.9)",
  borderRight: "1px solid #e2e8f0",
  boxShadow: "0 18px 60px rgba(15,23,42,0.06)",
  display: "flex",
  flexDirection: "column",
  gap: 12,
} as const;

const content = {
  flex: 1,
  padding: 26,
} as const;

const logoDot = {
  width: 14,
  height: 14,
  borderRadius: 99,
  background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
  boxShadow: "0 10px 25px rgba(20,184,166,0.25)",
} as const;

const navItem = {
  display: "block",
  padding: "12px 12px",
  borderRadius: 14,
  textDecoration: "none",
  color: "#0f172a",
  background: "rgba(15,23,42,0.03)",
  border: "1px solid rgba(226,232,240,0.7)",
  fontWeight: 750,
} as const;

const helpCard = {
  marginTop: 12,
  padding: 14,
  borderRadius: 18,
  border: "1px solid #e2e8f0",
  background:
    "radial-gradient(800px 200px at 30% 0%, rgba(14,165,233,0.12) 0%, rgba(14,165,233,0) 55%), radial-gradient(800px 200px at 70% 0%, rgba(20,184,166,0.14) 0%, rgba(20,184,166,0) 60%), white",
} as const;

const primaryBtn = {
  marginTop: 12,
  width: "100%",
  padding: "10px 12px",
  borderRadius: 14,
  border: "none",
  background: "#0f172a",
  color: "white",
  cursor: "pointer",
  fontWeight: 800,
} as const;
