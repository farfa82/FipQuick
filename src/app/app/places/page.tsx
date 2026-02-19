"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Place = {
  id: string;
  name: string;
  category: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  is_active: boolean | null;
  plan: string | null;
  expires_on: string | null;
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

function cleanPhone(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}

function mapsLink(address: string | null, name: string) {
  const q = encodeURIComponent(address?.trim() ? address : name);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

function getCategoryKey(category: string): CategoryKey {
  const c = normalize(category);
  if (c.includes("farm")) return "Farmacia";
  if (c.includes("clin") || c.includes("vet")) return "Clinica";
  if (c.includes("care") || c.includes("assist")) return "Caregiver";
  if (c.includes("tele") || c.includes("consult")) return "Telemedicina";
  return "Tutte";
}

function badgeFor(cat: CategoryKey) {
  switch (cat) {
    case "Farmacia":
      return { label: "💊 Farmacia", bg: "rgba(14,165,233,0.12)", border: "rgba(14,165,233,0.35)" };
    case "Clinica":
      return { label: "🏥 Clinica", bg: "rgba(20,184,166,0.12)", border: "rgba(20,184,166,0.35)" };
    case "Caregiver":
      return { label: "🤝 Caregiver", bg: "rgba(99,102,241,0.10)", border: "rgba(99,102,241,0.28)" };
    case "Telemedicina":
      return { label: "📞 Telemedicina", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.35)" };
    default:
      return { label: "📍 Supporto", bg: "rgba(15,23,42,0.05)", border: "rgba(226,232,240,0.9)" };
  }
}

export default function PlacesPage() {
  const router = useRouter();

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [onlyActive, setOnlyActive] = useState(true);
  const [category, setCategory] = useState<CategoryKey>("Tutte");

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
        .select("id,name,category,address,phone,website,is_active,plan,expires_on,created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setPlaces([]);
        setLoading(false);
        return;
      }

      setPlaces((data ?? []) as Place[]);
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
        const blob = normalize(`${p.name} ${p.category} ${p.address ?? ""} ${p.phone ?? ""} ${p.website ?? ""}`);
        return blob.includes(query);
      });
  }, [places, onlyActive, category, q]);

  if (loading) return <p>Caricamento...</p>;

  if (error) {
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Trova supporto</h1>
        <p style={{ color: "crimson" }}>Errore: {error}</p>
        <p style={{ color: "#475569" }}>
          Se l’errore parla di <strong>policy/RLS</strong>, Supabase sta bloccando la lettura.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div style={headerRow}>
        <div>
          <h1 style={{ marginTop: 0, marginBottom: 6 }}>Trova supporto</h1>
          <p style={{ margin: 0, color: "#475569", lineHeight: 1.6 }}>
            Cerca cliniche veterinarie, farmacie con disponibilità, caregiver e telemedicina.
          </p>
        </div>

        <div style={countCard}>
          <div style={{ color: "#64748b", fontSize: 12 }}>Risultati</div>
          <div style={{ fontWeight: 950, fontSize: 22 }}>{filtered.length}</div>
        </div>
      </div>

      <div style={controlsCard}>
        <div style={controlsGrid}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca nome, città, indirizzo, telefono…"
            style={searchInput}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value as CategoryKey)} style={select}>
            <option value="Tutte">Tutte</option>
            <option value="Farmacia">Farmacie</option>
            <option value="Clinica">Cliniche</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Telemedicina">Telemedicina</option>
          </select>

          <label style={toggle}>
            <input type="checkbox" checked={onlyActive} onChange={(e) => setOnlyActive(e.target.checked)} />
            Mostra solo attivi
          </label>
        </div>

        <div style={chipsRow}>
          {(["Tutte", "Farmacia", "Clinica", "Caregiver", "Telemedicina"] as CategoryKey[]).map((c) => {
            const b = badgeFor(c);
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                style={{
                  ...chipBtn,
                  background: active ? b.bg : "white",
                  borderColor: active ? b.border : "#e2e8f0",
                }}
              >
                {b.label}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div style={emptyCard}>Nessun risultato. Prova a cambiare filtro o a cercare con meno parole.</div>
      ) : (
        <div style={list}>
          {filtered.map((p) => {
            const catKey = getCategoryKey(p.category);
            const b = badgeFor(catKey);

            const activeChipStyle =
              p.is_active === false
                ? statusChip("#fff1f2", "#be123c", "#fecdd3")
                : statusChip("rgba(34,197,94,0.10)", "#166534", "rgba(34,197,94,0.35)");

            return (
              <div key={p.id} style={card}>
                <div style={titleRow}>
                  <div style={name}>{p.name}</div>

                  <span style={{ ...chip, background: b.bg, borderColor: b.border }}>{b.label}</span>

                  <span style={{ ...chip, ...activeChipStyle }}>
                    {p.is_active === false ? "Non attivo" : "Attivo"}
                  </span>
                </div>

                <div style={subRow}>
                  <span style={{ color: "#475569" }}>{p.category}</span>
                </div>

                <div style={meta}>
                  <div><strong>Indirizzo:</strong> {p.address ?? "—"}</div>
                  <div><strong>Telefono:</strong> {p.phone ?? "—"}</div>
                  <div>
                    <strong>Sito:</strong>{" "}
                    {p.website ? (
                      <a href={p.website} target="_blank" rel="noreferrer" style={link}>
                        Apri sito
                      </a>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>

                <div style={actions}>
                  <a href={mapsLink(p.address, p.name)} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                    <button style={btn}>🧭 Indicazioni</button>
                  </a>

                  {p.website ? (
                    <a href={p.website} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                      <button style={btn}>🌐 Sito</button>
                    </a>
                  ) : (
                    <button style={{ ...btn, opacity: 0.5 }} disabled>
                      🌐 Sito
                    </button>
                  )}

                  {p.phone ? (
                    <a href={`tel:${cleanPhone(p.phone)}`} style={{ textDecoration: "none" }}>
                      <button style={btnDark}>📞 Chiama</button>
                    </a>
                  ) : (
                    <button style={{ ...btnDark, opacity: 0.5 }} disabled>
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

function statusChip(bg: string, color: string, border: string) {
  return { background: bg, color, borderColor: border };
}

/* STYLES */
const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  gap: 14,
  flexWrap: "wrap",
  alignItems: "flex-start",
} as const;

const countCard = {
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

const titleRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
} as const;

const name = {
  fontWeight: 950,
  fontSize: 16,
  marginRight: 6,
} as const;

const chip = {
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

const btn = {
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

const btnDark = {
  ...btn,
  border: "none",
  background: "#0f172a",
  color: "white",
} as const;
