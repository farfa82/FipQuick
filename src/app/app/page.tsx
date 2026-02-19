"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";

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
  const [loading, setLoading] = useState(true);
  const [totalActive, setTotalActive] = useState(0);
  const [counts, setCounts] = useState<Record<CategoryKey, number>>({
    Farmacia: 0,
    Clinica: 0,
    Caregiver: 0,
    Telemedicina: 0,
    Altro: 0,
  });

  useEffect(() => {
    async function load() {
      setLoading(true);

      const { data, error } = await supabase
        .from("places")
        .select("id,category,is_active");

      if (!error) {
        const rows = (data ?? []) as Place[];
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
      }

      setLoading(false);
    }

    load();
  }, []);

  const cards = useMemo(
    () => [
      {
        key: "Farmacia" as const,
        title: "💊 Trova farmaco",
        subtitle: "Farmacie con disponibilità e contatti",
        hint: "Vai alla lista e filtra per trovare supporto vicino a te.",
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

  return (
    <div>
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
            Accesso rapido alle risorse disponibili. Vai su <strong>Luoghi</strong> per cercare vicino a te.
          </p>
        </div>

        <div className="card" style={{ padding: "12px 14px", borderRadius: 18, minWidth: 160 }}>
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Risorse attive</div>
          <div style={{ fontWeight: 950, fontSize: 26 }}>{totalActive}</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 14, borderRadius: 22, padding: 16 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <Link href="/app/places">
            <button className="btn-primary">Apri Luoghi</button>
          </Link>
          <div style={{ marginLeft: "auto", color: "var(--text-muted)", fontSize: 13 }}>
            Suggerimento: su telefono usa <strong>Chiama</strong> e <strong>Indicazioni</strong>.
          </div>
        </div>
      </div>

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
            </div>
          );
        })}
      </div>
    </div>
  );
}
