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

type CategoryKey =
  | "Tutte"
  | "Farmacia"
  | "Clinica"
  | "Caregiver"
  | "Telemedicina";

function normalize(s: string) {
  return (s || "")
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function daysUntil(dateStr: string | null): number | null {
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

function cleanPhone(phone: string) {
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

  const [onlyActive, setOnlyActive] = useState(true);
  const [category, setCategory] = useState<CategoryKey>("Tutte");
  const [q, setQ] = useState("");

  useEffect(() => {
    async function init() {
      setLoading(true);

      const { data: sessionData } =
        await supabase.auth.getSession();

      if (!sessionData.session) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("places")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      setPlaces(data ?? []);
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
          `${p.name} ${p.category} ${p.address ?? ""} ${p.phone ?? ""}`
        );

        return blob.includes(query);
      });
  }, [places, onlyActive, category, q]);

  if (loading) return <p>Caricamento...</p>;

  if (error) return <p>Errore: {error}</p>;

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Trova supporto</h1>

      <div style={{ marginBottom: 16 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cerca..."
          style={inputStyle}
        />
      </div>

      {filtered.length === 0 ? (
        <p>Nessun risultato.</p>
      ) : (
        filtered.map((p) => {
          const exp = daysUntil(p.expires_on);

          const expLabel =
            exp === null
              ? null
              : exp < 0
              ? "Scaduto"
              : exp <= 30
              ? `Scade tra ${exp} giorni`
              : null;

          return (
            <div key={p.id} style={cardStyle}>
              <h3 style={{ margin: 0 }}>{p.name}</h3>

              <p style={{ margin: "6px 0" }}>
                <strong>Categoria:</strong> {p.category}
              </p>

              <p style={{ margin: "6px 0" }}>
                <strong>Indirizzo:</strong> {p.address ?? "—"}
              </p>

              {expLabel && (
                <p style={{ margin: "6px 0", color: "crimson" }}>
                  {expLabel}
                </p>
              )}

              <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
                <a
                  href={mapsLink(p.address, p.name)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button style={btnStyle}>Indicazioni</button>
                </a>

                {p.phone && (
                  <a href={`tel:${cleanPhone(p.phone)}`}>
                    <button style={btnStyleDark}>Chiama</button>
                  </a>
                )}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

/* --- STILI --- */

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #ccc",
};

const cardStyle = {
  padding: 16,
  borderRadius: 16,
  border: "1px solid #e2e8f0",
  marginBottom: 12,
  background: "white",
};

const btnStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  background: "white",
  cursor: "pointer",
};

const btnStyleDark = {
  ...btnStyle,
  background: "#0f172a",
  color: "white",
  border: "none",
};
