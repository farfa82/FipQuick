"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const nav = useMemo(
    () => [
      { href: "/app", label: "Dashboard" },
      { href: "/app/places", label: "Luoghi" },
      { href: "/app/settings", label: "Impostazioni" },
    ],
    []
  );

  return (
    <div className="appShell">
      {/* Sidebar desktop */}
      <aside className="appSidebar">
        <Link href="/" className="appBrand" title="Vai alla Home">
          <img
            src="/logo.png"
            alt="FipQuick"
            width={34}
            height={34}
            style={{
              borderRadius: 12,
              objectFit: "cover",
              border: "2px solid rgba(255,255,255,0.18)",
            }}
          />
          <div>FipQuick</div>
        </Link>

        <nav className="appNav">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={pathname === item.href ? "active" : ""}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="appMain">
        {/* Topbar mobile */}
        <div className="appTopbar">
          <button className="btn-secondary" onClick={() => setOpen(true)}>
            ☰ Menu
          </button>

          <Link href="/" title="Home">
            <button className="btn-primary">Home</button>
          </Link>
        </div>

        {children}
      </main>

      {/* Drawer mobile */}
      {open ? (
        <div className="drawerOverlay" onClick={() => setOpen(false)}>
          <div className="drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawerCloseRow">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <img
                  src="/logo.png"
                  alt="FipQuick"
                  width={30}
                  height={30}
                  style={{
                    borderRadius: 12,
                    objectFit: "cover",
                    border: "2px solid rgba(255,255,255,0.18)",
                  }}
                />
                <div style={{ fontWeight: 950 }}>FipQuick</div>
              </div>

              <button className="drawerCloseBtn" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <div className="appNav">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={pathname === item.href ? "active" : ""}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
