"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Place = {
  id: string;
  category: string;
  is_active: boolean | null;
};

type CategoryKey = "Farmacia" | "Clinica" | "Caregiver" | "Telemedicina" | "Altro";

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function getCategoryKey(category: string): CategoryKey {
  const c = normalize(category);
  if (c.includes("farm")) return "Farmacia";
  if (c.includes("clin") || c.includes("vet")) return "Clinica";
  if (c.includes("care") || c.includes("assist")) return "Caregiver";
  if (c.includes("tele") || c.includes("consult")) return "Telemedicina";
  return "Altro";
}

function accentFor(cat: CategoryKey) {
  // Base A: blu + giallo; tocchi B: colori della zampa (soft)
  switch (cat) {
    case "Farmacia":
      return { bar: "var(--accent-purple)", bg: "rgba(156,90,166,0.10)" };
    case "Clinica":
      return { bar: "var(--accent-teal)", bg: "rgba(44,167,160,0.10)" };
    case "Caregiver":
      return { bar: "var(--accent-orange)", bg: "rgba(241,138,61,0.10)" };
    case "Telemedicina":
      return { bar: "var(--brand-yellow)", bg: "rgba(230,192,77,0.18)" };
    default:
      return { bar: "rgba(31,42,68,0.35)", bg: "rgba(15,23,42,0.04)" };
  }
}

export default function AppDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [totalActive, setTotalActive] = useState(0);
  const [counts, setCounts] = useState<Record<CategoryKey, number>>({
    Farmacia: 0,
    Clinica: 0,
    Caregiver: 0,
    Telemedicina: 0,
    Altro: 0,
  });

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);

      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("places")
        .select("id,category,is_active");

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const rows = (data ?? []) as Place[];

      // conteggiamo SOLO attivi per UX (di default tu filtri così anche in places)
      const active = rows.filter((r) => r.is_active !== false);

      const nextCounts: Record<CategoryKey, number> = {
        Farmacia: 0,
        Clinica: 0,
        Caregiver: 0,
        Telemedicina: 0,
        Altro: 0,
      };

      for (const r of active) {
        const k = getCategoryKey(r.category);
        nextCounts[k] = (nextCounts[k] ?? 0) + 1;
      }

      setTotalActive(active.length);
      setCounts(nextCounts);
      setLoading(false);
    }

    init();
  }, [router]);

  const cards = useMemo(
    () => [
      {
        key: "Farmacia" as const,
        title: "💊 Trova farmaco",
        subtitle: "Farmacie con disponibilità e contatti",
        hint: "Apri la lista già filtrata sulle farmacie attive.",
        count: counts.Farmacia,
      },
      {
        key: "Clinica" as const,
        title: "🏥 Cliniche di supporto",
        subtitle: "Strutture veterinarie informate",
        hint: "Trova cliniche che seguono la terapia e possono affiancarti.",
        count: counts.Clinica,
      },
      {
        key: "Caregiver" as const,
        title: "🤝 Caregiver & Telemedicina",
        subtitle: "Supporto pratico e consulenze a distanza",
        hint: "Quando serve una mano o un consulto rapido.",
        count: counts.Caregiver + counts.Telemedicina,
      },
    ],
    [counts]
  );

  if (loading) return <p>Caricamento...</p>;

  if (error) {
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Dashboard</h1>
        <p style={{ color: "crimson" }}>Errore: {error}</p>
        <p style={{ color: "var(--text-muted)" }}>
          Se l’errore parla di policy/RLS, Supabase sta bloccando la lettura.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <h1 style={{ marginTop: 0, marginBottom: 6 }}>Dashboard</h1>
          <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.65 }}>
            Qui trovi un accesso rapido alle risorse disponibili. Se hai appena ricevuto una diagnosi di FIP, vai su{" "}
            <strong>Luoghi</strong> e filtra per trovare supporto vicino a te.
          </p>
        </div>

        <div className="card" style={{ padding: "12px 14px", borderRadius: 18, minWidth: 160 }}>
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Risorse attive</div>
          <div style={{ fontWeight: 950, fontSize: 26 }}>{totalActive}</div>
        </div>
      </div>

      {/* Quick actions */}
      <div
        className="card"
        style={{
          marginTop: 14,
          borderRadius: 22,
          padding: 16,
          background:
            "radial-gradient(900px 220px at 18% 0%, rgba(230,192,77,0.20) 0%, rgba(230,192,77,0) 60%), radial-gradient(900px 220px at 84% 0%, rgba(44,167,160,0.16) 0%, rgba(44,167,160,0) 60%), white",
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/app/places">
            <button className="btn-primary">Apri Luoghi</button>
          </Link>

          <Link href="/">
            <button className="btn-secondary">Torna alla Home</button>
          </Link>

          <div style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 13 }}>
            Suggerimento: usa <strong>telefono</strong> per chiamare direttamente.
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
        {cards.map((c) => {
          const acc = accentFor(c.key);
          return (
            <div key={c.key} className="card" style={{ padding: 16, borderRadius: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 950, fontSize: 16 }}>{c.title}</div>
                  <div style={{ color: "var(--text-muted)", marginTop: 6, lineHeight: 1.6 }}>
                    {c.subtitle}
                  </div>
                  <div style={{ color: "var(--text-muted)", marginTop: 10, fontSize: 13, lineHeight: 1.6 }}>
                    {c.hint}
                  </div>
                </div>

                <div
                  style={{
                    minWidth: 130,
                    borderRadius: 18,
                    border: "1px solid var(--border)",
                    background: acc.bg,
                    padding: "12px 14px",
                    textAlign: "right",
                  }}
                >
                  <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Attivi</div>
                  <div style={{ fontWeight: 950, fontSize: 26 }}>{c.count}</div>
                </div>
              </div>

              <div style={{ marginTop: 12, width: 84, height: 6, borderRadius: 999, background: acc.bar }} />

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/app/places">
                  <button className="btn-secondary">Vai alla lista</button>
                </Link>
                <Link href="/app/places">
                  <button className="btn-dark">Apri e filtra</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note */}
      <div className="card" style={{ marginTop: 14, padding: 16, borderRadius: 22 }}>
        <div style={{ fontWeight: 950 }}>Come usare FipQuick</div>
        <ol style={{ marginTop: 10, marginBottom: 0, paddingLeft: 18, color: "var(--text-muted)", lineHeight: 1.7 }}>
          <li>Apri <strong>Luoghi</strong> e filtra per categoria (Farmacia / Clinica / Caregiver / Telemedicina).</li>
          <li>Su telefono usa <strong>Chiama</strong> per contattare subito la struttura.</li>
          <li>Usa <strong>Indicazioni</strong> per aprire Google Maps e raggiungere la destinazione.</li>
        </ol>
      </div>
    </div>
  );
}
