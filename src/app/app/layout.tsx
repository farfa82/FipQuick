"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // chiudi menu quando cambi pagina
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // blocca scroll body quando menu aperto su mobile
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div style={shell}>
      {/* TOP BAR MOBILE */}
      <header style={topbar}>
        <button
          onClick={() => setOpen(true)}
          aria-label="Apri menu"
          style={iconBtn}
        >
          ☰
        </button>

        <Link href="/app" style={{ textDecoration: "none", color: "#0f172a" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={logoDot} aria-hidden />
            <div style={{ fontWeight: 900, fontSize: 16 }}>FipQuick</div>
          </div>
        </Link>

        <div style={{ width: 40 }} />
      </header>

      {/* SIDEBAR DESKTOP (sempre visibile da md in su) */}
      <aside style={sidebarDesktop}>
        <Brand />
        <Nav pathname={pathname} onNavigate={() => setOpen(false)} />
        <HelpCard />
        <Footer />
      </aside>

      {/* OVERLAY + SIDEBAR MOBILE (slide-in) */}
      {open && <div style={overlay} onClick={() => setOpen(false)} />}

      <aside
        style={{
          ...sidebarMobile,
          transform: open ? "translateX(0)" : "translateX(-110%)",
        }}
        aria-hidden={!open}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <Brand />
          <button
            onClick={() => setOpen(false)}
            aria-label="Chiudi menu"
            style={iconBtn}
          >
            ✕
          </button>
        </div>

        <Nav pathname={pathname} onNavigate={() => setOpen(false)} />
        <HelpCard />
        <Footer />
      </aside>

      {/* CONTENT */}
      <main style={content}>{children}</main>
    </div>
  );
}

/* COMPONENTS */
function Brand() {
  return (
    <Link href="/app" style={{ textDecoration: "none", color: "#0f172a" }}>
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
    </Link>
  );
}

function Nav({
  pathname,
  onNavigate,
}: {
  pathname: string | null;
  onNavigate: () => void;
}) {
  return (
    <nav style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 10 }}>
      <NavItem
        href="/app"
        label="🏠 Panoramica"
        active={pathname === "/app"}
        onNavigate={onNavigate}
      />
      <NavItem
        href="/app/places"
        label="📍 Trova supporto"
        active={pathname?.startsWith("/app/places") ?? false}
        onNavigate={onNavigate}
      />
      <NavItem
        href="/app/teleconsulto"
        label="📞 Teleconsulto"
        active={pathname?.startsWith("/app/teleconsulto") ?? false}
        onNavigate={onNavigate}
      />
      <NavItem
        href="/app/diario"
        label="📒 Diario clinico"
        active={pathname?.startsWith("/app/diario") ?? false}
        onNavigate={onNavigate}
      />
    </nav>
  );
}

function NavItem({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      style={{
        ...navItem,
        background: active ? "rgba(20,184,166,0.14)" : "rgba(15,23,42,0.03)",
        borderColor: active ? "rgba(20,184,166,0.45)" : "rgba(226,232,240,0.7)",
      }}
    >
      {label}
    </Link>
  );
}

function HelpCard() {
  return (
    <div style={helpCard}>
      <div style={{ fontWeight: 800 }}>Hai bisogno di aiuto?</div>
      <div style={{ color: "#64748b", fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>
        Seleziona <strong>Trova supporto</strong> per cliniche, farmacie e caregiver.
      </div>
      <Link href="/app/places" style={{ textDecoration: "none" }}>
        <button style={primaryBtn}>Vai ai luoghi</button>
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <div style={{ marginTop: "auto", color: "#94a3b8", fontSize: 12 }}>
      © {new Date().getFullYear()} FipQuick
    </div>
  );
}

/* STYLES */
const shell = {
  minHeight: "100vh",
  background: "#f8fafc",
  display: "flex",
} as const;

// Topbar: visibile sempre, ma su desktop resta utile; la sidebar desktop c’è comunque
const topbar = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 58,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 14px",
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(8px)",
  borderBottom: "1px solid #e2e8f0",
  zIndex: 30,
} as const;

const iconBtn = {
  width: 40,
  height: 40,
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  background: "white",
  cursor: "pointer",
  fontSize: 18,
  fontWeight: 900,
} as const;

const logoDot = {
  width: 14,
  height: 14,
  borderRadius: 99,
  background: "linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)",
  boxShadow: "0 10px 25px rgba(20,184,166,0.25)",
} as const;

// Sidebar desktop: la teniamo, ma la “nascondiamo” su schermi piccoli via width + position.
// Non possiamo usare media query inline, quindi usiamo un trucco semplice:
// - sidebar desktop resta, ma su mobile la rendiamo “sotto” e poco invasiva con minWidth
// - l’esperienza mobile vera è quella della sidebarMobile.
const sidebarDesktop = {
  width: 280,
  padding: 18,
  paddingTop: 76, // spazio per topbar
  background: "rgba(255,255,255,0.9)",
  borderRight: "1px solid #e2e8f0",
  boxShadow: "0 18px 60px rgba(15,23,42,0.06)",
  display: "none", // IMPORTANT: la nascondiamo sempre e usiamo solo mobile slide-in
} as const;

// Overlay
const overlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,0.35)",
  zIndex: 40,
} as const;

// Sidebar mobile slide-in
const sidebarMobile = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: 300,
  maxWidth: "86vw",
  padding: 18,
  paddingTop: 18,
  background: "rgba(255,255,255,0.96)",
  borderRight: "1px solid #e2e8f0",
  boxShadow: "0 30px 120px rgba(15,23,42,0.22)",
  zIndex: 50,
  transition: "transform 220ms ease",
  display: "flex",
  flexDirection: "column",
  gap: 12,
} as const;

const content = {
  flex: 1,
  padding: 18,
  paddingTop: 76, // spazio per topbar
  width: "100%",
} as const;

const navItem = {
  display: "block",
  padding: "12px 12px",
  borderRadius: 14,
  textDecoration: "none",
  color: "#0f172a",
  border: "1px solid rgba(226,232,240,0.7)",
  fontWeight: 800,
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
  fontWeight: 900,
} as const;
