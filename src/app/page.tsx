"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Page() {
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    let unsub: { data: { subscription: { unsubscribe: () => void } } } | null = null;

    async function init() {
      const { data } = await supabase.auth.getSession();
      setIsAuthed(!!data.session);

      unsub = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthed(!!session);
      });
    }

    init();

    return () => {
      unsub?.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <main style={{ background: "var(--bg)", padding: "40px 0 70px" }}>
      <div className="container">
        {/* Header semplice */}
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

          {/* CTA unica */}
          <Link href="/app">
            <button className="btn-primary">{isAuthed ? "Vai all’app" : "Apri l’app"}</button>
          </Link>
        </header>

        {/* Hero */}
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
          <div style={{ maxWidth: 980 }}>
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
              Trova supporto vicino a te, in modo chiaro e veloce.
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
              FipQuick aiuta i proprietari di gatti a trovare rapidamente{" "}
              <strong>farmacie con disponibilità</strong>, <strong>cliniche veterinarie</strong>,
              <strong> caregiver</strong> e <strong>telemedicina</strong>. Informazioni chiare e
              accesso protetto.
            </p>

            <div style={{ marginTop: 18 }}>
              <Link href="/app">
                <button className="btn-primary">{isAuthed ? "Vai all’app" : "Apri l’app"}</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Sezioni base (testi bozza, poi li rifiniamo) */}
        <section style={{ marginTop: 18, display: "grid", gap: 12 }}>
          <div className="card" style={{ padding: 16, borderRadius: 22 }}>
            <div style={{ fontWeight: 950 }}>📍 Cosa trovi nell’app</div>
            <div style={{ color: "var(--text-muted)", marginTop: 8, lineHeight: 1.65 }}>
              - Farmacie con disponibilità (quando inserite dal team)<br />
              - Cliniche veterinarie di supporto<br />
              - Caregiver per assistenza nella terapia<br />
              - Telemedicina (consulto e orientamento)
            </div>
          </div>

          <div className="card" style={{ padding: 16, borderRadius: 22 }}>
            <div style={{ fontWeight: 950 }}>🧭 Come funziona</div>
            <div style={{ color: "var(--text-muted)", marginTop: 8, lineHeight: 1.65 }}>
              1) Apri l’app<br />
              2) Accedi<br />
              3) Cerca e filtra le risorse disponibili nella tua zona
            </div>
          </div>

          <div className="card" style={{ padding: 16, borderRadius: 22 }}>
            <div style={{ fontWeight: 950 }}>🤝 Chi siamo</div>
            <div style={{ color: "var(--text-muted)", marginTop: 8, lineHeight: 1.65 }}>
              Un gruppo di volontari e professionisti che supporta i proprietari di gatti con FIP,
              offrendo orientamento e strumenti pratici.
            </div>
          </div>
        </section>

        <footer style={{ marginTop: 18, color: "var(--text-muted)", fontSize: 13 }}>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
            Le informazioni presenti nell’app vengono aggiornate dal team tramite database.
          </div>
        </footer>
      </div>
    </main>
  );
}
