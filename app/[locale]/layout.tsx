import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import localFont from "next/font/local";
import { Jost } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/data/site-config";
import { locales, translations, type Locale } from "@/data/translations";
import "../globals.css";

/* --- Typographie : Boska (titres, Fontshare, licence libre, auto-hébergée) + Jost (texte) --- */
const boska = localFont({
  src: [
    { path: "../fonts/Boska-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Boska-Medium.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-boska",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

/* Texte courant : un sans lisible, déjà celui du site d'origine. */
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

/** Prégénère les 4 pages de langue au build (HTML statique, indexable par Google). */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleParams = { params: { locale: Locale } };

export function generateMetadata({ params }: LocaleParams): Metadata {
  if (!locales.includes(params.locale)) notFound();
  const t = translations[params.locale];
  const { url, brand: siteBrand } = siteConfig;

  return {
    metadataBase: new URL(url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `${url}/${params.locale}`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `${url}/${l}`]),
        ["x-default", `${url}/fr`],
      ]),
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: "website",
      url: `${url}/${params.locale}`,
      locale: t.intl.replace("-", "_"),
      siteName: siteBrand.name,
      images: [{ url: "/images/logo.png", width: 1254, height: 1254, alt: siteBrand.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: ["/images/logo.png"],
    },
    robots: { index: true, follow: true },
    verification: {
      google: "qwhv8HKC2WbpByOKtBc_UUWn_psLGdHmmYZToXxootI",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#f2e4da",
  width: "device-width",
  initialScale: 1,
};

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!locales.includes(params.locale)) notFound();
  const t = translations[params.locale];
  const { url, brand: siteBrand, contact } = siteConfig;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: siteBrand.name,
    description: t.meta.description,
    url: `${url}/${params.locale}`,
    image: `${url}${siteConfig.shareImage}`,
    telephone: `+${contact.whatsapp}`,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.line1,
      addressLocality: "Marrakech",
      addressCountry: "MA",
    },
    geo: { "@type": "GeoCoordinates", latitude: 31.63297, longitude: -7.992715 },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "10:00",
        closes: "20:00",
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.tiktok].filter(Boolean),
  };

  return (
    <html
      lang={t.htmlLang}
      className={`${boska.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Active les états d'animation seulement si le script tourne :
            sans JavaScript, tout le contenu reste visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body>
        {/* L'arche du logo, réutilisée comme masque des photos (classe .arch). */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
          <clipPath id="arch-clip" clipPathUnits="objectBoundingBox">
            <path d="M0,1 V0.36 C0,0.21 0.2,0.14 0.37,0.09 C0.45,0.065 0.49,0.035 0.5,0 C0.51,0.035 0.55,0.065 0.63,0.09 C0.8,0.14 1,0.21 1,0.36 V1 Z" />
          </clipPath>
        </svg>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
