"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        alert("Errore durante il logout.");
        console.error("Logout error:", error);
        setLoading(false);
        return;
      }

      router.replace("/login");
      router.refresh();

      setTimeout(() => {
        window.location.href = "/login";
      }, 150);
    } catch (err) {
      console.error("Logout catch error:", err);
      alert("Si è verificato un problema durante il logout.");
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className="btn-secondary"
      style={{
        borderRadius: 999,
        padding: "10px 16px",
      }}
    >
      {loading ? "Uscita..." : "Logout"}
    </button>
  );
}