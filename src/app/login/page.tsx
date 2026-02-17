"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function signIn() {
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setMsg(error.message);
    else router.push("/");
  }

  async function signUp() {
    setLoading(true);
    setMsg(null);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) setMsg(error.message);
    else setMsg("Account creato. Ora fai login.");
  }

  return (
    <main style={{ maxWidth: 420, margin: "0 auto", padding: 18, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 26, marginBottom: 6 }}>FipQuick</h1>
      <p style={{ marginTop: 0, opacity: 0.75 }}>Accedi per vedere la directory.</p>

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd" }}
        />

        <button
          onClick={signIn}
          disabled={loading}
          style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd", cursor: "pointer" }}
        >
          {loading ? "..." : "Login"}
        </button>

        <button
          onClick={signUp}
          disabled={loading}
          style={{ padding: 10, borderRadius: 12, border: "1px solid #ddd", cursor: "pointer" }}
        >
          {loading ? "..." : "Crea account"}
        </button>

        {msg && <div style={{ marginTop: 8, color: "#b00020" }}>{msg}</div>}
      </div>
    </main>
  );
}
