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
  latitude: number | null;
  longitude: number | null;
};

type FavoriteRow = {
  id: string;
  place_id: string;
};

type CategoryKey = "Tutte" | "Farmacia" | "Clinica" | "Caregiver" | "Telemedicina";

type UserCoords = {
  latitude: number;
  longitude: number;
};

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

function categoryBadge(cat: CategoryKey) {
  switch (cat) {
    case "Farmacia":
      return {
        label: "💊 Farmacia",
        bg: "rgba(191, 101, 176, 0.12)",
        border: "rgba(191, 101, 176, 0.35)",
        color: "var(--brand-primary)",
      };
    case "Clinica":
      return {
        label: "🏥 Clinica",
        bg: "rgba(73, 179, 191, 0.12)",
        border: "rgba(73, 179, 191, 0.35)",
        color: "var(--brand-primary)",
      };
    case "Caregiver":
      return {
        label: "🤝 Caregiver",
        bg: "rgba(242, 112, 82, 0.12)",
        border: "rgba(242, 112, 82, 0.35)",
        color: "var(--brand-primary)",
      };
    case "Telemedicina":
      return {
        label: "📞 Telemedicina",
        bg: "rgba(242, 184, 75, 0.20)",
        border: "rgba(242, 184, 75, 0.45)",
        color: "var(--brand-primary)",
      };
    default:
      return {
        label: "📍 Supporto",
        bg: "rgba(43, 34, 48, 0.05)",
        border: "rgba(234, 223, 220, 0.9)",
        color: "var(--brand-primary)",
      };
  }
}

function toRad(value: number) {
  return (value * Math.PI) / 180;
}

function distanceKm(
  userLat: number,
  userLon: number,
  placeLat: number,
  placeLon: number
) {
  const earthRadius = 6371;
  const dLat = toRad(placeLat - userLat);
  const dLon = toRad(placeLon - userLon);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(userLat)) *
      Math.cos(toRad(placeLat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return earthRadius * c;
}

export default function PlacesPage() {
  const router = useRouter();

  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [onlyActive, setOnlyActive] = useState(true);
  const [category, setCategory] = useState<CategoryKey>("Tutte");

  const [userId, setUserId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteRow[]>([]);
  const [favoriteLoadingId, setFavoriteLoadingId] = useState<string | null>(null);

  const [userCoords, setUserCoords] = useState<UserCoords | null>(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState<string | null>(null);
  const [maxDistanceKm, setMaxDistanceKm] = useState<number>(0);

  useEffect(() => {
    async function init() {
      setLoading(true);
      setError(null);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);

      const [{ data: placesData, error: placesError }, { data: favData, error: favError }] =
        await Promise.all([
          supabase
            .from("places")
            .select(
              "id,name,category,address,phone,website,is_active,plan,expires_on,created_at,latitude,longitude"
            )
            .order("created_at", { ascending: false }),
          supabase.from("favorites").select("id,place_id").eq("user_id", session.user.id),
        ]);

      if (placesError) {
        setError(placesError.message);
        setPlaces([]);
        setLoading(false);
        return;
      }

      if (favError) {
        setError(favError.message);
        setPlaces([]);
        setLoading(false);
        return;
      }

      setPlaces((placesData ?? []) as Place[]);
      setFavorites((favData ?? []) as FavoriteRow[]);
      setLoading(false);
    }

    init();
  }, [router]);

  const favoritePlaceIds = useMemo(() => {
    return new Set(favorites.map((f) => f.place_id));
  }, [favorites]);

  const filtered = useMemo(() => {
    const query = normalize(q);

    const withDistance = places.map((p) => {
      let distance: number | null = null;

      if (
        userCoords &&
        typeof p.latitude === "number" &&
        typeof p.longitude === "number"
      ) {
        distance = distanceKm(
          userCoords.latitude,
          userCoords.longitude,
          p.latitude,
          p.longitude
        );
      }

      return {
        ...p,
        distance,
      };
    });

    let result = withDistance
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

    if (userCoords && maxDistanceKm > 0) {
      result = result.filter((p) => p.distance !== null && p.distance <= maxDistanceKm);
    }

    if (userCoords) {
      result.sort((a, b) => {
        if (a.distance === null && b.distance === null) return 0;
        if (a.distance === null) return 1;
        if (b.distance === null) return -1;
        return a.distance - b.distance;
      });
    }

    return result;
  }, [places, onlyActive, category, q, userCoords, maxDistanceKm]);

  async function toggleFavorite(place: Place) {
    if (!userId) return;

    setFavoriteLoadingId(place.id);

    const existing = favorites.find((f) => f.place_id === place.id);

    if (existing) {
      const { error } = await supabase.from("favorites").delete().eq("id", existing.id);

      setFavoriteLoadingId(null);

      if (error) {
        alert(`Errore rimozione preferito: ${error.message}`);
        return;
      }

      setFavorites((prev) => prev.filter((f) => f.id !== existing.id));
      return;
    }

    const { data, error } = await supabase
      .from("favorites")
      .insert({
        user_id: userId,
        place_id: place.id,
      })
      .select("id,place_id")
      .single();

    setFavoriteLoadingId(null);

    if (error) {
      alert(`Errore salvataggio preferito: ${error.message}`);
      return;
    }

    if (data) {
      setFavorites((prev) => [...prev, data as FavoriteRow]);
    }
  }

  function handleUseMyPosition() {
    if (!navigator.geolocation) {
      setGeoError("Geolocalizzazione non supportata dal browser.");
      return;
    }

    setGeoLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setGeoLoading(false);
      },
      () => {
        setGeoError("Impossibile ottenere la posizione.");
        setGeoLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      }
    );
  }

  if (loading) return <p>Caricamento...</p>;

  if (error) {
    return (
      <div>
        <h1 style={{ marginTop: 0 }}>Luoghi</h1>
        <p style={{ color: "crimson" }}>Errore: {error}</p>
      </div>
    );
  }

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
        <div>
          <h1 style={{ marginTop: 0, marginBottom: 6 }}>Luoghi</h1>
          <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.6 }}>
            Cerca supporto: farmacie, cliniche, caregiver e telemedicina.
          </p>
        </div>

        <div className="card" style={{ padding: "12px 14px", borderRadius: 18, minWidth: 130 }}>
          <div style={{ color: "var(--text-muted)", fontSize: 12 }}>Risultati</div>
          <div style={{ fontWeight: 950, fontSize: 22 }}>{filtered.length}</div>
        </div>
      </div>

      <div
        className="card"
        style={{
          marginTop: 14,
          padding: 14,
          borderRadius: 22,
          background:
            "radial-gradient(900px 220px at 18% 0%, rgba(242,184,75,0.20) 0%, rgba(242,184,75,0) 60%), radial-gradient(900px 220px at 84% 0%, rgba(73,179,191,0.16) 0%, rgba(73,179,191,0) 60%), white",
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cerca nome, città, indirizzo, telefono…"
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              outline: "none",
              fontSize: 14,
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CategoryKey)}
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "white",
              fontSize: 14,
            }}
          >
            <option value="Tutte">Tutte</option>
            <option value="Farmacia">Farmacie</option>
            <option value="Clinica">Cliniche</option>
            <option value="Caregiver">Caregiver</option>
            <option value="Telemedicina">Telemedicina</option>
          </select>

          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 12px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "rgba(255,255,255,0.9)",
              userSelect: "none",
              fontSize: 14,
            }}
          >
            <input
              type="checkbox"
              checked={onlyActive}
              onChange={(e) => setOnlyActive(e.target.checked)}
            />
            Mostra solo attivi
          </label>

          <button
            className="btn-secondary"
            onClick={handleUseMyPosition}
            disabled={geoLoading}
          >
            {geoLoading ? "Rilevamento posizione..." : "📍 Usa la mia posizione"}
          </button>

          {userCoords && (
            <select
              value={maxDistanceKm}
              onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "12px 12px",
                borderRadius: 14,
                border: "1px solid var(--border)",
                background: "white",
                fontSize: 14,
              }}
            >
              <option value={0}>Nessun limite distanza</option>
              <option value={5}>Entro 5 km</option>
              <option value={10}>Entro 10 km</option>
              <option value={25}>Entro 25 km</option>
              <option value={50}>Entro 50 km</option>
              <option value={100}>Entro 100 km</option>
            </select>
          )}

          {geoError && (
            <div
              style={{
                color: "#b91c1c",
                fontSize: 14,
                background: "rgba(239,68,68,0.08)",
                border: "1px solid rgba(239,68,68,0.18)",
                borderRadius: 12,
                padding: 10,
              }}
            >
              {geoError}
            </div>
          )}
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {(["Tutte", "Farmacia", "Clinica", "Caregiver", "Telemedicina"] as CategoryKey[]).map(
            (c) => {
              const active = category === c;
              return (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`chip ${active ? "chip-active" : ""}`}
                >
                  {categoryBadge(c).label}
                </button>
              );
            }
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="card"
          style={{ marginTop: 14, padding: 14, borderRadius: 18, color: "var(--text-muted)" }}
        >
          Nessun risultato. Prova a cambiare filtro o a cercare con meno parole.
        </div>
      ) : (
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          {filtered.map((p) => {
            const key = getCategoryKey(p.category);
            const b = categoryBadge(key);
            const isInactive = p.is_active === false;
            const isFavorite = favoritePlaceIds.has(p.id);

            return (
              <div key={p.id} className="card" style={{ padding: 14, borderRadius: 20 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                      <div style={{ fontWeight: 950, fontSize: 16, marginRight: 6 }}>{p.name}</div>

                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: 999,
                          border: `1px solid ${b.border}`,
                          background: b.bg,
                          color: b.color,
                          fontSize: 12,
                          fontWeight: 900,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {b.label}
                      </span>

                      <span
                        style={{
                          padding: "6px 10px",
                          borderRadius: 999,
                          border: "1px solid var(--border)",
                          background: isInactive ? "rgba(244,63,94,0.12)" : "rgba(34,197,94,0.10)",
                          color: isInactive ? "#be123c" : "#166534",
                          fontSize: 12,
                          fontWeight: 900,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isInactive ? "Non attivo" : "Attivo"}
                      </span>

                      {p.distance !== null && (
                        <span
                          style={{
                            padding: "6px 10px",
                            borderRadius: 999,
                            border: "1px solid rgba(73,179,191,0.28)",
                            background: "rgba(73,179,191,0.10)",
                            color: "var(--brand-primary)",
                            fontSize: 12,
                            fontWeight: 900,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {p.distance < 1
                            ? `${Math.round(p.distance * 1000)} m`
                            : `${p.distance.toFixed(1)} km`}
                        </span>
                      )}
                    </div>

                    <div style={{ marginTop: 8, fontSize: 13, color: "var(--text-muted)" }}>
                      {p.category}
                    </div>
                  </div>

                  <button
                    className={isFavorite ? "btn-primary" : "btn-secondary"}
                    onClick={() => toggleFavorite(p)}
                    disabled={favoriteLoadingId === p.id}
                    style={{ minWidth: 160 }}
                  >
                    {favoriteLoadingId === p.id
                      ? "Attendere..."
                      : isFavorite
                      ? "★ Preferito"
                      : "☆ Salva preferito"}
                  </button>
                </div>

                <div style={{ marginTop: 10, fontSize: 13, color: "#334155", lineHeight: 1.7 }}>
                  <div>
                    <strong>Indirizzo:</strong> {p.address ?? "—"}
                  </div>
                  <div>
                    <strong>Telefono:</strong> {p.phone ?? "—"}
                  </div>
                  <div>
                    <strong>Sito:</strong>{" "}
                    {p.website ? (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "underline" }}
                      >
                        Apri sito
                      </a>
                    ) : (
                      "—"
                    )}
                  </div>
                </div>

                <div
                  style={{
                    marginTop: 12,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 10,
                  }}
                >
                  <a href={mapsLink(p.address, p.name)} target="_blank" rel="noreferrer">
                    <button className="btn-secondary" style={{ width: "100%" }}>
                      🧭 Indicazioni
                    </button>
                  </a>

                  {p.website ? (
                    <a href={p.website} target="_blank" rel="noreferrer">
                      <button className="btn-secondary" style={{ width: "100%" }}>
                        🌐 Sito
                      </button>
                    </a>
                  ) : (
                    <button className="btn-secondary" style={{ width: "100%", opacity: 0.55 }} disabled>
                      🌐 Sito
                    </button>
                  )}

                  {p.phone ? (
                    <a href={`tel:${cleanPhone(p.phone)}`}>
                      <button className="btn-dark" style={{ width: "100%" }}>
                        📞 Chiama
                      </button>
                    </a>
                  ) : (
                    <button className="btn-dark" style={{ width: "100%", opacity: 0.55 }} disabled>
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