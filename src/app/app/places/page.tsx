"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type Place = {
  id: string; // uuid → string
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

export default function PlacesPage() {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      // 1) check session
      const { data, error: sessionErr } = await supabase.auth.getSession();
      if (sessionErr) {
        setError(sessionErr.message);
        setLoading(false);
        return;
      }
      if (!data.session) {
        router.replace("/login");
        return;
      }

      // 2) fetch places
      const { data: placesData, error: placesErr } = await supabase
  .from("places")
  .select(`
    id,
    name,
    category,
    address,
    phone,
    website,
    is_active,
    plan,
    expires_on,
    created_at
  `)
  .order("created_at", { ascending: false });


      if (placesErr) {
        setError(placesErr.message);
        setPlaces([]);
      } else {
        setPlaces(placesData ?? []);
      }

      setLoading(false);
    }

    init();
  }, [router]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p style={{ color: "crimson" }}>Errore: {error}</p>;

  return (
    <div>
      <h1 style={{ marginTop: 0 }}>Luoghi</h1>
      <p style={{ color: "#475569", marginTop: 6 }}>
        Elenco luoghi da Supabase.
      </p>

      <div
        style={{
          marginTop: 16,
          background: "white",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            gap: 12,
            padding: "12px 14px",
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            fontWeight: 700,
          }}
        >
          <div>Nome</div>
          <div>Categoria</div>
        </div>

        {places.length === 0 ? (
          <div style={{ padding: 14, color: "#64748b" }}>
            Nessun luogo trovato.
          </div>
        ) : (
          places.map((p) => (
            <div
              key={p.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 1fr",
                gap: 12,
                padding: "12px 14px",
                borderBottom: "1px solid #f1f5f9",
              }}
            >
              <div style={{ fontWeight: 700 }}>{p.name}</div>
  <div style={{ color: "#475569" }}>
    {p.category} — {p.plan ?? "free"} — {p.is_active ? "Attivo" : "Non attivo"}
  </div>
</div>
          ))
        )}
      </div>
    </div>
  );
}
