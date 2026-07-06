"use client";

/* ============================================================
   i18n — contexte de langue (FR · EN · IT · ES)
   ------------------------------------------------------------
   Léger, sans dépendance ni routing : la langue est gardée
   en mémoire + localStorage, et applique <html lang> côté client.
   Hook : const { locale, setLocale, t } = useI18n();
   ============================================================ */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  translations,
  locales,
  type Dict,
  type Locale,
} from "@/data/translations";

const STORAGE_KEY = "rayan-locale";
const DEFAULT_LOCALE: Locale = "fr";

function isLocale(value: string | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  /** Dictionnaire de la langue active. */
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Au montage : récupère la préférence (localStorage puis langue du navigateur).
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
      return;
    }
    const fromBrowser = navigator.language?.slice(0, 2).toLowerCase();
    if (isLocale(fromBrowser)) setLocaleState(fromBrowser);
  }, []);

  // Reflète la langue active sur <html lang> (SEO + accessibilité).
  useEffect(() => {
    document.documentElement.lang = translations[locale].htmlLang;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* stockage indisponible : on garde la langue en mémoire */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, t: translations[locale] }),
    [locale, setLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n doit être utilisé dans <I18nProvider>.");
  return ctx;
}
