import "./globals.css";

export const metadata = {
  title: "FipQuick – Supporto FIP felina",
  description:
    "Trova farmacie, cliniche veterinarie, caregiver e telemedicina per la gestione della FIP (Peritonite Infettiva Felina).",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
