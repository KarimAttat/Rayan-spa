import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

/* --- Typographie --- */
const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body",
  display: "swap",
});

const brand = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-brand",
  display: "swap",
});

/* --- SEO (FR + Open Graph) --- */
export const metadata: Metadata = {
  title: `${siteConfig.brand.name} — Hammam & Massages à Marrakech`,
  description:
    "Rayan SPA, havre de bien-être au cœur de Marrakech : hammam traditionnel, gommage au savon noir, massages à l’huile d’argan et rituels berbères. Réservez en un instant.",
  keywords: [
    "spa Marrakech",
    "hammam Marrakech",
    "massage Marrakech",
    "savon noir",
    "huile d’argan",
    "bien-être Maroc",
  ],
  openGraph: {
    title: `${siteConfig.brand.name} — Hammam & Massages à Marrakech`,
    description:
      "Un havre de calme au cœur de Marrakech : hammam, gommages et massages aux huiles précieuses du Maroc.",
    type: "website",
    locale: "fr_FR",
    siteName: siteConfig.brand.name,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#15100C",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${brand.variable}`}
    >
      <body className="grain">{children}</body>
    </html>
  );
}
