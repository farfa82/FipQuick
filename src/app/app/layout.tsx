"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AppLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(true);

  const nav = useMemo(
    () => [
      { href: "/app", label: "Dashboard" },
      { href: "/app/places", label: "Luoghi" },
      { href: "/app/settings", label: "Impostazioni" },
    ],
    []
  );

  useEffect(() => {
    let unsub: { data: { subscription: { unsubscribe: () => void } } } | null = null;

    async function run() {
      // 1) check session
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace(`/login?redirectTo=${encodeURIComponent(pathname || "/app")}`);
        return;
      }

      // 2) listen auth changes (logout/login)
      unsub = supabase.auth.onAuthStateChange((_event, session) => {
        // Se la sessione sparisce (logout) → torna alla landing
        if (!session) router.replace("/");
      });

      setChecking(false);
    }

    run();

    return () => {
      unsub?.data.subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (checking) return <p style={{ padding: 20 }}>Caricamento...</p>;

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/"); // landing dopo logout
  }

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

        <div style={{ marginTop: "auto", paddingTop: 12 }}>
          <button className="btn-secondary" onClick={handleLogout} style={{ width: "100%" }}>
            Logout
          </button>
        </div>
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

            <div style={{ marginTop: 10 }}>
              <button className="btn-secondary" onClick={handleLogout} style={{ width: "100%" }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
