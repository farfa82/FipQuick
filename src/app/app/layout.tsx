import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 240,
          background: "#0f172a",
          color: "white",
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <div style={{ fontWeight: 800, fontSize: 18, padding: "8px 6px" }}>
          FipQuick
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/app" style={navItem}>
            Dashboard
          </Link>
          <Link href="/app/places" style={navItem}>
            Luoghi
          </Link>
          <Link href="/app/settings" style={navItem}>
            Impostazioni
          </Link>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          background: "#f8fafc",
          padding: 28,
        }}
      >
        {children}
      </main>
    </div>
  );
}

const navItem = {
  color: "white",
  textDecoration: "none",
  padding: "10px 12px",
  borderRadius: 10,
  background: "rgba(255,255,255,0.06)",
} as const;
