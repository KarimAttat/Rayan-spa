"use client";

/* ============================================================
   i18n — contexte de langue (FR · EN · IT · ES)
   ------------------------------------------------------------
   La langue vit dans l'URL (/fr, /en, /it, /es — voir middleware.ts
   et app/[locale]/), ce qui rend les 4 versions indexables par les
   moteurs de recherche. Le choix explicite de l'utilisateur est
   mémorisé dans un cookie, relu par le middleware à la prochaine
   visite. Hook : const { locale, setLocale, t } = useI18n();
   ============================================================ */

import { createContext, useCallback, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { translations, type Dict, type Locale } from "@/data/translations";

const COOKIE_NAME = "NEXT_LOCALE";

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Dictionnaire de la langue active. */
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const setLocale = useCallback(
    (l: Locale) => {
      try {
        document.cookie = `${COOKIE_NAME}=${l}; path=/; max-age=31536000; samesite=lax`;
      } catch {
        /* cookies indisponibles : la navigation reste fonctionnelle */
      }
      router.push(`/${l}${window.location.hash}`);
    },
    [router]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale: initialLocale, setLocale, t: translations[initialLocale] }),
    [initialLocale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans <I18nProvider>.");
  return ctx;
}
