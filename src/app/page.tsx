import Link from "next/link";

export default function Landing() {
  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 44, marginBottom: 10 }}>FipQuick</h1>

      <p style={{ fontSize: 18, maxWidth: 700 }}>
        Scopri luoghi, eventi e info utili in pochi secondi. Accesso rapido e
        gestione semplice.
      </p>

      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <Link href="/app">
          <button style={{ padding: "10px 18px", cursor: "pointer" }}>
            Entra nell’app
          </button>
        </Link>

        <Link href="/login">
          <button style={{ padding: "10px 18px", cursor: "pointer" }}>
            Login
          </button>
        </Link>
      </div>

      <section style={{ marginTop: 50, maxWidth: 900 }}>
        <h2 style={{ fontSize: 22 }}>Cosa fa</h2>
        <ul style={{ lineHeight: 1.8 }}>
          <li>Elenco luoghi e categorie</li>
          <li>Accesso protetto con Supabase</li>
          <li>Base pronta per funzionalità complete</li>
        </ul>
      </section>
    </main>
  );
}
