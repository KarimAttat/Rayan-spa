import type { ReactNode } from "react";
import Reveal from "./Reveal";

type SectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "center" | "left";
  dark?: boolean;
};

/** Intestazione di sezione: occhiello + titolo display + intro. */
export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center",
  dark = true,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  return (
    <div
      className={[
        "max-w-2xl",
        isCenter ? "mx-auto text-center" : "text-left",
      ].join(" ")}
    >
      {eyebrow && (
        <Reveal>
          <span className={`eyebrow ${isCenter ? "" : "eyebrow--left"}`}>
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2
          className={[
            "mt-5 text-4xl sm:text-5xl md:text-[3.4rem] leading-[1.05] text-balance",
            dark ? "text-creme" : "text-noir",
          ].join(" ")}
        >
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.16}>
          <p
            className={[
              "mt-6 text-lg font-light leading-relaxed",
              dark ? "text-sable" : "text-ombre/80",
            ].join(" ")}
          >
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/** Contenitore di sezione con spaziatura verticale generosa. */
export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}
    >
      <div className="mx-auto w-full max-w-content px-6 sm:px-8">{children}</div>
    </section>
  );
}
