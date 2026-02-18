import "./globals.css";

export const metadata = {
  title: "FipQuick",
  description: "FipQuick",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
