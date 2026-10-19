"use client";

import { testimonials } from "@/data/testimonials";
import { useI18n } from "@/lib/i18n";
import { rv } from "./ui/Reveal";

/**
 * Avis clients — masqué par défaut (siteConfig.showTestimonials).
 * ⚠️ N'afficher qu'avec de vrais avis, vérifiables.
 */
export default function Testimonials() {
  const { t } = useI18n();
  return (
    <section id="avis" className="bg-surface py-section">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-8">
        <h2 {...rv(0)} className="text-head md:col-span-4">
          {t.testimonials.title}
        </h2>
        <div className="grid gap-12 md:col-span-8 md:grid-cols-2">
          {testimonials.map((item, i) => {
            const copy = t.testimonials.items[i] ?? { quote: item.quote, origin: item.origin };
            return (
              <figure key={item.author} {...rv(i)}>
                <blockquote className="text-lead">« {copy.quote} »</blockquote>
                <figcaption className="mt-4 text-small text-muted">
                  {item.author} · {copy.origin}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
