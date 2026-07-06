"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { locales, localeMeta } from "@/data/translations";
import { GlobeIcon, ChevronIcon, CheckIcon } from "@/components/icons";

/**
 * Sélecteur de langue (FR · EN · IT · ES).
 * - variant "bar"  : pastille discrète pour la barre de navigation.
 * - variant "stack": liste pleine largeur pour le menu mobile.
 */
export default function LanguageSwitcher({
  variant = "bar",
}: {
  variant?: "bar" | "stack";
}) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Ferme au clic extérieur + touche Échap.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "stack") {
    return (
      <div className="flex items-center gap-2">
        {locales.map((l) => {
          const active = l === locale;
          return (
            <button
              key={l}
              onClick={() => setLocale(l)}
              aria-pressed={active}
              className={[
                "rounded-full border px-3 py-1.5 text-xs uppercase tracking-wide transition",
                active
                  ? "border-or bg-or/15 text-or"
                  : "border-creme/15 text-sable/70 hover:border-or/40 hover:text-or",
              ].join(" ")}
            >
              {localeMeta[l].short}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.header.language}
        className="flex items-center gap-1.5 rounded-full border border-or/25 px-3 py-2 text-xs uppercase tracking-wide text-creme/85 transition hover:border-or hover:text-or"
      >
        <GlobeIcon width={16} height={16} />
        <span className="font-medium">{localeMeta[locale].short}</span>
        <ChevronIcon
          width={13}
          height={13}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <ul
        role="listbox"
        aria-label={t.header.language}
        className={[
          "absolute right-0 top-full z-50 mt-2 w-44 origin-top-right overflow-hidden rounded-xl border border-or/15 bg-noir/95 py-1.5 shadow-riad backdrop-blur-md transition-all duration-300",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        ].join(" ")}
      >
        {locales.map((l) => {
          const active = l === locale;
          return (
            <li key={l} role="option" aria-selected={active}>
              <button
                onClick={() => {
                  setLocale(l);
                  setOpen(false);
                }}
                className={[
                  "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-sm transition",
                  active
                    ? "text-or"
                    : "text-creme/80 hover:bg-or/10 hover:text-or",
                ].join(" ")}
              >
                <span className="flex items-center gap-3">
                  <span className="w-6 text-[0.62rem] font-medium uppercase tracking-wide text-sable/55">
                    {localeMeta[l].short}
                  </span>
                  <span className="font-light">{localeMeta[l].name}</span>
                </span>
                {active && <CheckIcon width={15} height={15} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
