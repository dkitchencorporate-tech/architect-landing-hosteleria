import React from "react";
import "./globals.css";
import AnalyticsPixel from "@/components/AnalyticsPixel";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "DKitchen | Carta digital QR y digitalización para hostelería",
  description: "Carta digital con QR que no tienes que reimprimir nunca, eventos gastronómicos llave en mano y dark kitchen multimarca. Sin comisiones sobre tus ventas y sin tocar tu dinero.",
  keywords: ["carta digital qr restaurante", "kds dark kitchen", "menu qr hostelería", "digitalización restaurantes", "eventos gastronómicos llave en mano", "dark kitchen multimarca"],
  authors: [{ name: "DKitchen" }],
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
    title: "DKitchen | Multiplica tus reservas en piloto automático",
    description: "Sistemas digitales de autor para hostelería inteligente. Deja de perder dinero en comisiones.",
    url: "https://dkitchencorporate.es",
    images: [{ url: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1200", width: 1200, height: 630, alt: "DKitchen Hostelería" }],
    siteName: "DKitchen",
    type: "website",
  },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
  twitter: {
    card: "summary_large_image",
    title: "DKitchen | Hostelería Inteligente",
    description: "Sistemas digitales de autor para restaurantes y Dark Kitchens.",
  }
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AnalyticsPixel />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
