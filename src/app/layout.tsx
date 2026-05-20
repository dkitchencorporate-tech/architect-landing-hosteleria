import React from "react";
import "./globals.css";
import AnalyticsPixel from "@/components/AnalyticsPixel";

export const metadata = {
  title: "Architect.Sys | Agencias de Crecimiento para Hostelería",
  description: "Deja de perder margen en mesas lentas. Sistemas de digitalización base (39€/mes), Cartas QR, Bots IA en WhatsApp y llenado de locales en España.",
  keywords: ["agencia marketing hosteleria", "carta digital restaurantes", "reservas whatsapp ia", "aumentar ticket medio restaurante", "automatizacion restaurantes", "agencia saas"],
  authors: [{ name: "Architect.Sys" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Architect.Sys | Multiplica tus reservas en piloto automático",
    description: "Sistemas digitales de autor para hostelería inteligente. Deja de perder dinero en comisiones.",
    url: "https://architect-sys.com",
    images: [{ url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200", width: 1200, height: 630, alt: "Architect.Sys Hostelería" }],
    siteName: "Architect.Sys",
    type: "website",
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  twitter: {
    card: "summary_large_image",
    title: "Architect.Sys | Hostelería Inteligente",
    description: "Sistemas digitales de autor para restaurantes y Dark Kitchens.",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-foreground antialiased">
        <AnalyticsPixel />
        {children}
      </body>
    </html>
  );
}
