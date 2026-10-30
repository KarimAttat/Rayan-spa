"use client";

import { useI18n } from "@/lib/i18n";
import { locales, localeMeta } from "@/data/translations";

/**
 * Sélecteur de langue (FR · EN · IT · ES) : quatre mots, la langue active
 * soulignée. Chaque langue a sa propre URL (/fr, /en, /it, /es).
 * - variant "bar"  : dans la barre de navigation.
 * - variant "stack": plus grand, dans le menu mobile.
 */
export default function LanguageSwitcher({
  variant = "bar",
}: {
  variant?: "bar" | "stack";
}) {
  const { locale, setLocale, t } = useI18n();

  return (
    <ul
      aria-label={t.header.language}
      className={[
        "flex items-center",
        variant === "stack" ? "gap-6 text-lead" : "gap-3 text-small",
      ].join(" ")}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <li key={l}>
            <a
              href={`/${l}`}
              hrefLang={l}
              lang={l}
              aria-current={active ? "true" : undefined}
              title={localeMeta[l].name}
              onClick={(e) => {
                e.preventDefault();
                if (!active) setLocale(l);
              }}
              className={[
                "inline-flex min-h-[2.75rem] min-w-[1.75rem] items-center justify-center",
                active ? "underline decoration-1 underline-offset-[0.3em]" : "opacity-60 transition-opacity hover:opacity-100",
              ].join(" ")}
            >
              {localeMeta[l].short}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
