"use client";

import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import MediaFrame from "./ui/MediaFrame";
import ZelligeDivider from "./ui/ZelligeDivider";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";

export default function About() {
  const { t } = useI18n();
  return (
    <Section id="a-propos" className="bg-nuit">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <Reveal className="order-1 lg:order-none">
          <div className="relative">
            <MediaFrame
              src={siteConfig.aboutImage.src}
              file={siteConfig.aboutImage.file}
              alt={siteConfig.aboutImage.alt}
              width={siteConfig.aboutImage.w}
              height={siteConfig.aboutImage.h}
              className="aspect-[4/5] w-full"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            {/* riquadro oro sfalsato */}
            <div
              aria-hidden
              className="absolute -bottom-5 -right-5 -z-10 h-32 w-32 rounded-2xl border border-or/30 sm:h-40 sm:w-40"
            />
          </div>
        </Reveal>

        {/* Texte */}
        <div>
          <Reveal>
            <span className="eyebrow eyebrow--left">{t.about.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl leading-tight text-creme sm:text-5xl text-balance">
              {t.about.title}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 space-y-5 text-lg font-light leading-relaxed text-sable">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </Reveal>

          <ZelligeDivider className="my-9 justify-start" />

          <Reveal delay={0.24}>
            <dl className="grid gap-6 sm:grid-cols-3">
              {t.about.values.map((item) => (
                <div key={item.k}>
                  <dt className="font-display text-xl text-or">{item.k}</dt>
                  <dd className="mt-2 text-sm font-light leading-relaxed text-sable/80">
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
