"use client";

import Section, { SectionHeader } from "./ui/Section";
import Reveal from "./ui/Reveal";
import { siteConfig } from "@/data/site-config";
import { useI18n } from "@/lib/i18n";
import {
  PinIcon,
  ClockIcon,
  WhatsAppIcon,
  MailIcon,
  InstagramIcon,
  TikTokIcon,
} from "@/components/icons";

export default function Contact() {
  const { t } = useI18n();
  const { contact, social } = siteConfig;

  return (
    <Section id="contact" className="bg-nuit">
      <SectionHeader
        eyebrow={t.contact.eyebrow}
        title={t.contact.title}
        intro={t.contact.intro}
      />

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Infos */}
        <Reveal>
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard icon={<PinIcon />} title={t.contact.cards.address}>
              <a
                href={contact.address.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-or"
              >
                {contact.address.line1}
                <br />
                {contact.address.line2}
              </a>
            </InfoCard>

            <InfoCard icon={<ClockIcon />} title={t.contact.cards.hours}>
              <ul className="space-y-1">
                {contact.hours.map((h, i) => (
                  <li key={h.day} className="flex justify-between gap-4">
                    <span>{t.contact.days[i] ?? h.day}</span>
                    <span className="text-creme/90">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoCard>

            <InfoCard icon={<WhatsAppIcon />} title={t.contact.cards.whatsapp}>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-or"
              >
                {t.contact.whatsappCta}
              </a>
            </InfoCard>

            <InfoCard icon={<MailIcon />} title={t.contact.cards.email}>
              <a
                href={`mailto:${contact.email}`}
                className="break-all transition hover:text-or"
              >
                {contact.email}
              </a>
            </InfoCard>
          </div>

          {/* Réseaux sociaux */}
          {(social.instagram || social.tiktok) && (
            <div className="mt-8 flex items-center gap-4">
              <span className="text-xs uppercase tracking-eyebrow text-sable/50">
                {t.contact.follow}
              </span>
              <div className="flex gap-3">
                {social.instagram && (
                  <SocialLink href={social.instagram} label="Instagram">
                    <InstagramIcon width={18} height={18} />
                  </SocialLink>
                )}
                {social.tiktok && (
                  <SocialLink href={social.tiktok} label="TikTok">
                    <TikTokIcon width={18} height={18} />
                  </SocialLink>
                )}
              </div>
            </div>
          )}
        </Reveal>

        {/* Carte */}
        <Reveal delay={0.12}>
          <div className="group relative h-full min-h-[320px] overflow-hidden rounded-2xl ring-riad">
            <iframe
              title="Carte — Rayan SPA, Dar El Bacha, 45 Derb Toudgha, Marrakech"
              src={contact.address.mapsEmbed}
              className="h-full min-h-[320px] w-full grayscale-[0.3]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Lien vers la position exacte sur Google Maps */}
            <a
              href={contact.address.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold absolute bottom-4 right-4 !py-3 shadow-riad"
            >
              <PinIcon width={16} height={16} />
              {t.contact.route}
            </a>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function InfoCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-noir/60 p-6 ring-riad">
      <div className="flex items-center gap-3 text-or">
        {icon}
        <h3 className="font-display text-xl text-creme">{title}</h3>
      </div>
      <div className="mt-4 text-sm font-light leading-relaxed text-sable/85">
        {children}
      </div>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-or/25 text-creme transition hover:border-or hover:text-or"
    >
      {children}
    </a>
  );
}
