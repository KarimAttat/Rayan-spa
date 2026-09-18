import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site-config";
import { locales } from "@/data/translations";

export default function sitemap(): MetadataRoute.Sitemap {
  const { url } = siteConfig;
  const languages = Object.fromEntries(locales.map((l) => [l, `${url}/${l}`]));

  return locales.map((locale) => ({
    url: `${url}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === "fr" ? 1 : 0.8,
    alternates: { languages },
  }));
}
