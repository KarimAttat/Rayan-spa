"use client";

import { useI18n } from "@/lib/i18n";
import { WordsReveal } from "./ui/motion";

/**
 * La maison : seulement le texte, sur toute la largeur, qui s'allume mot à
 * mot au défilement. Les photos des lieux sont plus bas (« Les lieux »).
 */
export default function About() {
  const { t } = useI18n();

  return (
    <section id="a-propos" className="bg-bg">
      <h2 className="sr-only">{t.about.title}</h2>
      <div className="wrap py-section">
        <WordsReveal
          text={`${t.about.p1} ${t.about.p2}`}
          className="display text-[clamp(1.9rem,1.1rem+2.6vw,4rem)] leading-[1.12] tracking-[-0.015em]"
        />
      </div>
    </section>
  );
}
