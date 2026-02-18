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
  expires_on: string | null; // date -> string (YYYY-MM-DD)
  created_at: string | null; // timestamptz -> string
};

function formatDateIT(dateStr: string | null) {
  if (!dateStr) return "—";
  // dateStr from Supabase for DATE is usually "YYYY-MM-DD"
  const [y, m, d] = dateStr.split("-");
  if (!y || !m || !d) return dateStr;
  return `${d}/${m}/${y}`;
}

export default function PlacesPage() {
  const router = useRouter();

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [onlyActive, setOnlyActive] = useState(true);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);

      // 1) session check
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

      // 2) fetch places
      const { data: placesData, error: placesErr } = await supabase
        .from("places")
        .select(
          "id,name,category,address,phone,website,is_active,plan,expires_on,created_at"
        )
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

  const visiblePlaces = useMemo(() => {
    if (!onlyActive) return places;
    return places.filter((p) => p.is_active !== false); // true o null -> mostrati
  }, [places, onlyActive]);

  if (loading) return <p>Caricamento...</p>;

  if (error)
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Luoghi</h1>
        <p style={{ color: "crimson" }}>Errore: {error}</p>

        <div style={{ marginTop: 12, color: "#475569" }}>
          Se l’errore parla di <strong>RLS / policy</strong>, vuol dire che
          Supabase sta bloccando la SELECT. In quel caso sistemiamo le policy.
        </div>
      </div>
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1 style={{ marginTop: 0 }}>Luoghi</h1>
          <p style={{ color: "#475569", marginTop: 6 }}>
            Elenco luoghi da Supabase.
          </p>
        </div>

        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 12,
            userSelect: "none",
          }}
        >
          <input
            type="checkbox"
            checked={onlyActive}
            onChange={(e) => setOnlyActive(e.target.checked)}
          />
          Mostra solo attivi
        </label>
      </div>

      <div style={{ marginTop: 16, color: "#64748b", fontSize: 13 }}>
        Totale: <strong>{visiblePlaces.length}</strong>
      </div>

      {visiblePlaces.length === 0 ? (
        <div
          style={{
            marginTop: 14,
            padding: 14,
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: 16,
            color: "#64748b",
          }}
        >
          Nessun luogo trovato.
        </div>
      ) : (
        <div
          style={{
            marginTop: 14,
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 14,
          }}
        >
          {visiblePlaces.map((p) => (
            <div
              key={p.id}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: 16,
                padding: 16,
                boxShadow: "0 12px 40px rgba(15,23,42,0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 10,
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, fontSize: 16 }}>{p.name}</div>
                  <div style={{ color: "#475569", marginTop: 4 }}>
                    {p.category}{" "}
                    <span style={{ color: "#94a3b8" }}>
                      • {p.plan ?? "—"}
                    </span>
                  </div>
                </div>

                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid #e2e8f0",
                    background:
                      p.is_active === false ? "#fff1f2" : "rgba(34,197,94,0.08)",
                    color: p.is_active === false ? "#be123c" : "#166534",
                    fontSize: 12,
                    fontWeight: 700,
                    whiteSpace: "nowrap",
                  }}
                >
                  {p.is_active === false ? "Non attivo" : "Attivo"}
                </span>
              </div>

              <div style={{ marginTop: 12, color: "#334155", fontSize: 13 }}>
                <div>
                  <strong>Indirizzo:</strong> {p.address ?? "—"}
                </div>
                <div style={{ marginTop: 6 }}>
                  <strong>Telefono:</strong> {p.phone ?? "—"}
                </div>
                <div style={{ marginTop: 6 }}>
                  <strong>Sito:</strong>{" "}
                  {p.website ? (
                    <a
                      href={p.website}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0f172a" }}
                    >
                      {p.website}
                    </a>
                  ) : (
                    "—"
                  )}
                </div>

                <div
                  style={{
                    marginTop: 10,
                    paddingTop: 10,
                    borderTop: "1px solid #f1f5f9",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 10,
                    flexWrap: "wrap",
                    color: "#64748b",
                  }}
                >
                  <div>
                    <strong style={{ color: "#475569" }}>Scadenza:</strong>{" "}
                    {formatDateIT(p.expires_on)}
                  </div>
                  <div>
                    <strong style={{ color: "#475569" }}>Creato:</strong>{" "}
                    {p.created_at ? new Date(p.created_at).toLocaleString() : "—"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
