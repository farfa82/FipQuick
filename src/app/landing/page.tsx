export default function Landing() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 42, marginBottom: 10 }}>FipQuick</h1>

      <p style={{ fontSize: 18, maxWidth: 650, opacity: 0.85 }}>
        La directory intelligente per il settore veterinario. Trova cliniche, farmacie e servizi
        specializzati in pochi secondi.
      </p>

      <div style={{ marginTop: 20, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <a
          href="/login"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            borderRadius: 14,
            background: "black",
            color: "white",
            textDecoration: "none",
          }}
        >
          Accedi all’app
        </a>

        <a
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 18px",
            borderRadius: 14,
            border: "1px solid #ddd",
            textDecoration: "none",
            color: "black",
          }}
        >
          Vai alla directory
        </a>
      </div>

      <div style={{ marginTop: 24, fontSize: 13, opacity: 0.6 }}>
        Demo – login richiesto per consultare la directory.
      </div>
    </main>
  );
}
