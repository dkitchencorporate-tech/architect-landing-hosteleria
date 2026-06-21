import React from "react";
import "./globals.css";
import AnalyticsPixel from "@/components/AnalyticsPixel";
import CookieConsent from "@/components/CookieConsent";

export const metadata = {
  title: "Architect.Sys | Agencias de Crecimiento para Hostelería",
  description: "Ingeniería de Procesos para Hostelería. Ecosistemas digitales sin comisiones, Agentes IA Híbridos en WhatsApp y sistemas Dark Kitchen Enterprise.",
  keywords: ["ingeniería hostelería", "kds dark kitchen", "agente ia whatsapp restaurantes", "consultoría restaurantes", "automatización hostelería", "growth partner"],
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
