import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GoldSniper AI — Señales de Trading en Tiempo Real",
  description: "Señales BUY/SELL con inteligencia artificial para Oro y Petróleo. 83% de precisión. Transmisión en vivo en YouTube.",
  keywords: "gold trading signals, xauusd, petróleo, señales forex, trading en vivo",
  openGraph: {
    title: "GoldSniper AI",
    description: "Señales de trading profesional con IA. 7 días gratis.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
