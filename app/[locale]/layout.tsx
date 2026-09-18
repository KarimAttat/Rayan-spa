import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost, Marcellus } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/data/site-config";
import { locales, translations, type Locale } from "@/data/translations";
import "../globals.css";

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
  themeColor: "#15100C",
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
    image: `${url}/images/hero.jpg`,
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
      className={`${display.variable} ${body.variable} ${brand.variable}`}
    >
      <body className="grain">
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
