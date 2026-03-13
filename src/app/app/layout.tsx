"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import LogoutButton from "@/components/logoutButton";

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
          style={{
            padding: 20,
            borderRadius: 20,
            border: "1px solid var(--border)",
            background: "white",
            boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
            fontWeight: 700,
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
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            padding: "14px 0",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontSize: 20, fontWeight: 900 }}>FipQuick</div>
            <div style={{ fontSize: 13, color: "var(--text-muted)" }}>
              Area riservata
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
                  color: "var(--text-muted)",
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px solid var(--border)",
                  background: "white",
                }}
              >
                {userEmail}
              </div>
            )}

            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="container" style={{ padding: "20px 0 40px" }}>
        {children}
      </main>
    </div>
  );
}