"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Place = {
  id: string; // uuid
  name: string;
  category: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  is_active: boolean | null;
  plan: string | null;
  expires_on: string | null; // YYYY-MM-DD
  created_at: string | null;
};

type CategoryKey = "Tutte" | "Farmacia" | "Clinica" | "Caregiver" | "Telemedicina";

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function formatDateIT(dateStr: string | null) {
  if (!dateStr) return "—";
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

function daysUntil(dateStr: string | null) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return null;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = d.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

function getCategoryKey(category: string): CategoryKey {
  const c = normalize(category);
  if (c.includes("farm")) return "Farmacia";
  if (c.includes("clin") || c.includes("vet")) return "Clinica";
  if (c.includes("care") || c.includes("assist")) return "Caregiver";
  if (c.includes("tele") || c.includes("consult")) return "Telemedicina";
  return "Tutte";
}

function categoryBadge(cat: CategoryKey) {
  switch (cat) {
    case "Farmacia":
      return { label: "💊 Farmacia", tint: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.35)" };
    case "Clinica":
      return { label: "🏥 Clinica", tint: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)" };
    case "Caregiver":
      return { label: "🤝 Caregiver", tint: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.28)" };
    case "Telemedicina":
      return { label: "📞 Telemedicina", tint: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)" };
    default:
      return { label: "📍 Supporto", tint: "rgba(15,23,42,0.06)", border: "rgba(226,232,240,0.9)" };
  }
}

function cleanPhone(phone: string) {
  // mantiene + e numeri
  return phone.replace(/[^\d+]/g, "");
}

function mapsLink(address: string | null, name: string) {
  const q = encodeURIComponent(address?.trim() ? address : name);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export default function PlacesPage() {
  const router = useRouter();

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UX controls
  const [onlyActive, setOnlyActive] = useState(true);
  const [category, setCategory] = useState<CategoryKey>("Tutte");
  const [q, setQ] = useState("");

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);

      // session check
      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        setError(sessionErr.message);
        setLoading(false);
        return;
      }

      if (!sessionData.session) {
        router.replace("/login");
        return;
      }

      const { data: placesData, error: placesErr } = await supabase
        .from("places")
        .select("id,name,category,address,phone,website,is_active,plan,expires_on,created_at")
        .order("created_at", { ascending: false });

      if (placesErr) {
        setError(placesErr.message);
        setPlaces([]);
        setLoading(false);
        return;
      }

      setPlaces((placesData ?? []) as Place[]);
      setLoading(false);
    }

    init();
  }, [router]);

  const filtered = useMemo(() => {
    const query = normalize(q);

    return places
      .filter((p) => (onlyActive ? p.is_active !== false : true))
      .filter((p) => {
        const key = getCategoryKey(p.category);
        return category === "Tutte" ? true : key === category;
      })
      .filter((p) => {
        if (!query) return true;
        const blob = normalize(
          `${p.name} ${p.category} ${p.address ?? ""} ${p.phone ?? ""} ${p.website ?? ""}`
        );
        return blob.includes(query);
      });
  }, [places, onlyActive, category, q]);

  if (loading) return <p>Caricamento...</p>;

  if (error)
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Trova supporto</h1>
        <p style={{ color: "crimson" }}>Errore: {error}</p>
        <div style={{ marginTop: 12, color: "#475569" }}>
          Se l’errore parla di <strong>RLS / policy</strong>, Supabase sta bloccando la SELECT.
        </div>
      </div>
    );

  return (
    <div>
      <div style={pageHeader}>
        <div>
          <h1 style={{ marginTop: 0, marginBottom: 6 }}>Trova supporto</h1>
          <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>
            Cliniche, farmacie, caregiver e telemedicina. Usa ricerca e filtri per trovare rapidamente ciò che ti serve.
          </p>
        </div>

        <div style={counter}>
          <div style={{ color: "#64748b", fontSize: 12 }}>Risultati</div>
          <div style={{ fontWeight: 900, fontSize: 22 }}>{filtered.length}</div>
        </div>
      </div>

      {/* Controls */}
      <div style={controlsCard}>
        <div style={controlsGrid}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca nome, indirizzo, telefono…"
            style={searchInput}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value as CategoryKey)} style={select}>
            <option value="Tutte">Tutte le categorie</option>
            <option value="Farmacia">Farmacie</option>
            <option value="Clinica">Cliniche</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Telemedicina">Telemedicina</option>
          </select>

          <label style={toggle}>
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={(e) => setOnlyActive(e.target.checked)}
            />
            Mostra solo attivi
          </label>
        </div>

        <div style={chipsRow}>
          {(["Tutte", "Farmacia", "Clinica", "Caregiver", "Telemedicina"] as CategoryKey[]).map((c) => {
            const { label, tint, border } = categoryBadge(c);
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  ...chipBtn,
                  background: active ? tint : "white",
                  borderColor: active ? border : "#e2e8f0",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <div style={emptyCard}>
          Nessun risultato. Prova a cambiare filtro o a cercare con meno parole.
        </div>
      ) : (
        <div style={list}>
          {filtered.map((p) => {
            const key = getCategoryKey(p.category);
            const badge = categoryBadge(key);
            const exp = daysUntil(p.expires_on);

            const expLabel =
              exp === null
                ? null
                : exp < 0
                ? "Scaduto"
                : exp <= 7
                ? `Scade tra ${exp}g`
                : exp <= 30
                ? `Scade tra ${exp}g`
                : null;

            const expStyle =
              expLabel === null
                ? null
                : exp !== null && exp < 0
                ? statusChip("#fff1f2", "#be123c", "#fecdd3")
                : exp <= 7
                ? statusChip("rgba(245,158,11,0.14)", "#92400e", "rgba(245,158,11,0.35)")
                : statusChip("rgba(14,165,233,0.12)", "#075985", "rgba(14,165,233,0.35)");

            return (
              <div key={p.id} style={card}>
                <div style={cardTop}>
                  <div style={{ minWidth: 0 }}>
                    <div style={titleRow}>
                      <div style={placeName}>{p.name}</div>

                      <span
                        style={{
                          ...smallChip,
                          background: badge.tint,
                          borderColor: badge.border,
                        }}
                      >
                        {badge.label}
                      </span>

                      <span
                        style={{
                          ...smallChip,
                          background: p.is_active === false ? "#fff1f2" : "rgba(34,197,94,0.10)",
                          borderColor: p.is_active === false ? "#fecdd3" : "rgba(34,197,94,0.35)",
                          color: p.is_active === false ? "#be123c" : "#166534",
                        }}
                      >
                        {p.is_active === false ? "Non attivo" : "Attivo"}
                      </span>

                      {expLabel && expStyle ? (
                        <span style={{ ...smallChip, ...expStyle }}>{expLabel}</span>
                      ) : null}
                    </div>

                    <div style={subRow}>
                      <span style={{ color: "#475569" }}>{p.category}</span>
                      {p.expires_on ? (
                        <span style={{ color: "#94a3b8" }}>
                          • scadenza {formatDateIT(p.expires_on)}
                        </span>
                      ) : null}
                    </div>

                    <div style={meta}>
                      <div><strong>Indirizzo:</strong> {p.address ?? "—"}</div>
                      <div><strong>Telefono:</strong> {p.phone ?? "—"}</div>
                      <div>
                        <strong>Sito:</strong>{" "}
                        {p.website ? (
                          <a href={p.website} target="_blank" rel="noreferrer" style={link}>
                            {p.website}
                          </a>
                        ) : (
                          "—"
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={actions}>
                  <a
                    href={mapsLink(p.address, p.name)}
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <button style={actionBtn}>🧭 Indicazioni</button>
                  </a>

                  <button
                    style={actionBtn}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(p.address?.trim() ? p.address! : p.name);
                      } catch {
                        // ignore
                      }
                    }}
                  >
                    📋 Copia indirizzo
                  </button>

                  {p.phone ? (
                    <a href={`tel:${cleanPhone(p.phone)}`} style={{ textDecoration: "none" }}>
                      <button style={actionBtnDark}>📞 Chiama</button>
                    </a>
                  ) : (
                    <button style={{ ...actionBtnDark, opacity: 0.5 }} disabled>
                      📞 Chiama
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* tiny helpers for chip style */
function statusChip(bg: string, color: string, border: string) {
  return { background: bg, color, borderColor: border };
}

/* STYLES */
const pageHeader = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  flexWrap: "wrap",
  alignItems: "flex-start",
} as const;

const counter = {
  minWidth: 120,
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  padding: "12px 14px",
  boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
} as const;

const controlsCard = {
  marginTop: 14,
  background:
    "radial-gradient(900px 220px at 20% 0%, rgba(14,165,233,0.10) 0%, rgba(14,165,233,0) 60%), radial-gradient(900px 220px at 80% 0%, rgba(20,184,166,0.14) 0%, rgba(20,184,166,0) 60%), white",
  border: "1px solid #e2e8f0",
  borderRadius: 22,
  padding: 14,
  boxShadow: "0 18px 60px rgba(15,23,42,0.08)",
} as const;

const controlsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 10,
} as const;

const searchInput = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  outline: "none",
  fontSize: 14,
} as const;

const select = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  background: "white",
  fontSize: 14,
} as const;

const toggle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  background: "rgba(255,255,255,0.9)",
  userSelect: "none",
  fontSize: 14,
} as const;

const chipsRow = {
  marginTop: 12,
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
} as const;

const chipBtn = {
  padding: "10px 12px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "white",
  cursor: "pointer",
  fontWeight: 800,
  fontSize: 13,
} as const;

const emptyCard = {
  marginTop: 14,
  padding: 14,
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 18,
  color: "#64748b",
} as const;

const list = {
  marginTop: 14,
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: 12,
} as const;

const card = {
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 20,
  padding: 14,
  boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
} as const;

const cardTop = {
  display: "flex",
  gap: 12,
  alignItems: "flex-start",
} as const;

const titleRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
} as const;

const placeName = {
  fontWeight: 950,
  fontSize: 16,
  marginRight: 6,
} as const;

const smallChip = {
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid #e2e8f0",
  background: "rgba(15,23,42,0.04)",
  fontSize: 12,
  fontWeight: 900,
  whiteSpace: "nowrap",
} as const;

const subRow = {
  marginTop: 8,
  fontSize: 13,
  color: "#64748b",
} as const;

const meta = {
  marginTop: 10,
  fontSize: 13,
  color: "#334155",
  lineHeight: 1.7,
} as const;

const link = {
  color: "#0f172a",
  textDecoration: "underline",
} as const;

const actions = {
  marginTop: 12,
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 10,
} as const;

const actionBtn = {
  width: "100%",
  padding: "10px 10px",
  borderRadius: 14,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#0f172a",
  cursor: "pointer",
  fontWeight: 900,
  fontSize: 13,
} as const;

const actionBtnDark = {
  ...actionBtn,
  border: "none",
  background: "#0f172a",
  color: "white",
} as const;
