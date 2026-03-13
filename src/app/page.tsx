"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthed(!!session);
    }

    checkAuth();
  }, []);

  return (
    <main style={{ background: "var(--bg)", padding: "34px 0 70px" }}>
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
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 16,
                background:
                  "linear-gradient(135deg, var(--brand-secondary) 0%, var(--brand-primary) 100%)",
                display: "grid",
                placeItems: "center",
                color: "white",
                fontWeight: 900,
                boxShadow: "0 12px 28px rgba(73,179,191,0.20)",
              }}
            >
              FQ
            </div>

            <div>
              <div style={{ fontWeight: 950, letterSpacing: 0.2, fontSize: 20 }}>
                FipQuick
              </div>
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                Supporto chiaro, vicino, rapido
              </div>
            </div>
          </Link>

          <Link href="/app">
            <button className="btn-primary">
              {isAuthed ? "Vai all’app" : "Apri l’app"}
            </button>
          </Link>
        </header>

        <section
          className="card"
          style={{
            marginTop: 26,
            borderRadius: 28,
            padding: "30px 24px",
            background:
              "radial-gradient(900px 240px at 12% 0%, rgba(242,184,75,0.22) 0%, rgba(242,184,75,0) 60%), radial-gradient(900px 240px at 84% 0%, rgba(73,179,191,0.18) 0%, rgba(73,179,191,0) 60%), radial-gradient(700px 180px at 50% 100%, rgba(191,101,176,0.12) 0%, rgba(191,101,176,0) 60%), white",
          }}
        >
          <div style={{ maxWidth: 930 }}>
            <div
              style={{
                display: "inline-flex",
                gap: 8,
                alignItems: "center",
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(73,179,191,0.22)",
                background: "rgba(255,255,255,0.88)",
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              <span style={{ color: "var(--brand-primary)" }}>FIP a portata di mano</span>
              <span style={{ color: "var(--text-muted)" }}>• rete di supporto</span>
            </div>

            <h1
              style={{
                margin: "16px 0 10px",
                fontSize: 46,
                lineHeight: 1.05,
                maxWidth: 820,
              }}
            >
              Trova supporto affidabile vicino a te, in modo semplice e veloce.
            </h1>

            <div
              style={{
                width: 92,
                height: 6,
                background: "linear-gradient(90deg, var(--brand-highlight), var(--brand-accent))",
                borderRadius: 999,
                margin: "14px 0 18px",
              }}
            />

            <p
              style={{
                margin: 0,
                color: "var(--text-muted)",
                fontSize: 17,
                lineHeight: 1.75,
                maxWidth: 780,
              }}
            >
              FipQuick aiuta i proprietari di gatti a trovare rapidamente
              <strong> farmacie</strong>, <strong>cliniche veterinarie</strong>,
              <strong> caregiver</strong> e <strong>teleconsulto</strong>, con un
              accesso ordinato, protetto e orientato alla praticità.
            </p>

            <div style={{ marginTop: 22, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/app">
                <button className="btn-primary">
                  {isAuthed ? "Vai all’app" : "Apri l’app"}
                </button>
              </Link>

              <Link href="/landing">
                <button className="btn-secondary">Scopri di più</button>
              </Link>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 12,
          }}
        >
          <div className="card" style={{ padding: 18, borderRadius: 22 }}>
            <div style={{ fontWeight: 950, marginBottom: 8 }}>📍 Cosa trovi</div>
            <div style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>
              Farmacie, cliniche, caregiver e teleconsulto in un’unica esperienza
              più ordinata e veloce.
            </div>
          </div>

          <div className="card" style={{ padding: 18, borderRadius: 22 }}>
            <div style={{ fontWeight: 950, marginBottom: 8 }}>🧭 Come funziona</div>
            <div style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>
              Accedi, cerca le strutture disponibili, filtra le opzioni utili e
              trova più facilmente il supporto che ti serve.
            </div>
          </div>

          <div className="card" style={{ padding: 18, borderRadius: 22 }}>
            <div style={{ fontWeight: 950, marginBottom: 8 }}>🤝 Per chi è</div>
            <div style={{ color: "var(--text-muted)", lineHeight: 1.65 }}>
              Pensato per chi ha bisogno di orientamento rapido e di una rete di
              contatti più chiara attorno alla gestione FIP.
            </div>
          </div>
        </section>

        <footer
          style={{
            marginTop: 20,
            color: "var(--text-muted)",
            fontSize: 13,
          }}
        >
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            Le informazioni presenti nell’app vengono aggiornate dal team tramite database.
          </div>
        </footer>
      </div>
    </main>
  );
}