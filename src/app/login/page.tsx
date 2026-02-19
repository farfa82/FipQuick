import { Suspense } from "react";
import LoginClient from "./LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<main style={{ padding: 20 }}>Caricamento...</main>}>
      <LoginClient />
    </Suspense>
  );
}
