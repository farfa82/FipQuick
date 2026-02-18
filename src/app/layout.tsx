import Link from "next/link";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#0f172a",
          color: "white",
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}
      >
        <h2 style={{ margin: 0 }}>FipQuick</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link href="/app" style={linkStyle}>
            Dashboard
          </Link>
          <Link href="/app/places" style={linkStyle}>
            Luoghi
          </Link>
          <Link href="/app/settings" style={linkStyle}>
            Impostazioni
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main
        style={{
          flex: 1,
          padding: 30,
          background: "#f8fafc",
        }}
      >
        {children}
      </main>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 6,
  background: "rgba(255,255,255,0.05)",
};
