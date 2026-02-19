"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirectTo") || "/app";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function signIn() {
    setLoading(true);
    setMsg(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMsg("Credenziali non valide.");
      return;
    }

    router.replace(redirectTo);
  }

  return (
    <main
      style={{
        maxWidth: 420,
        margin: "60px auto",
        padding: 24,
        fontFamily: "system-ui",
        border: "1px solid var(--border)",
        borderRadius: 24,
        background: "white",
        boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
      }}
    >
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>Accedi all'app</h1>

      <p style={{ marginTop: 0, opacity: 0.7 }}>
        Inserisci le credenziali per accedere alla piattaforma.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 14,
            border: "1px solid var(--border)",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 14,
            border: "1px solid var(--border)",
          }}
        />

        <button
          onClick={signIn}
          disabled={loading}
          className="btn-primary"
        >
          {loading ? "Accesso..." : "Login"}
        </button>

        {msg && (
          <div style={{ marginTop: 8, color: "#b00020", fontSize: 14 }}>
            {msg}
          </div>
        )}
      </div>
    </main>
  );
}
