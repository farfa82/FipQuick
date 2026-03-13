"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LogoutButton from "@/components/LogoutButton";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (!session) {
        router.replace(`/login?redirectTo=${encodeURIComponent(pathname || "/app")}`);
        return;
      }

      setUserEmail(session.user.email ?? null);
      setLoading(false);
    }

    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      if (!session) {
        router.replace("/login");
        return;
      }

      setUserEmail(session.user.email ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "var(--bg)",
          padding: 24,
        }}
      >
        <div
          className="card"
          style={{
            padding: 22,
            borderRadius: 22,
            fontWeight: 800,
            background:
              "radial-gradient(500px 140px at 15% 0%, rgba(242,184,75,0.16) 0%, rgba(242,184,75,0) 60%), radial-gradient(500px 140px at 85% 0%, rgba(73,179,191,0.14) 0%, rgba(73,179,191,0) 60%), white",
          }}
        >
          Caricamento area riservata...
        </div>
      </main>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(255,250,248,0.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 14,
            padding: "14px 0",
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 14,
                background:
                  "linear-gradient(135deg, var(--brand-secondary) 0%, var(--brand-primary) 100%)",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: 900,
                boxShadow: "0 10px 24px rgba(73,179,191,0.18)",
              }}
            >
              FQ
            </div>

            <div>
              <div style={{ fontSize: 20, fontWeight: 950, lineHeight: 1 }}>
                FipQuick
              </div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
                Area riservata
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            {userEmail && (
              <div
                style={{
                  fontSize: 13,
                  color: "var(--text-primary)",
                  padding: "9px 12px",
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  background: "rgba(255,255,255,0.9)",
                  fontWeight: 700,
                }}
              >
                {userEmail}
              </div>
            )}

            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: "22px 0 40px" }}>
        {children}
      </main>
    </div>
  );
}