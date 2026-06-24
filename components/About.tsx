import Section from "./ui/Section";
import Reveal from "./ui/Reveal";
import MediaFrame from "./ui/MediaFrame";
import ZelligeDivider from "./ui/ZelligeDivider";
import { siteConfig } from "@/data/site-config";

const values = [
  { k: "Authenticité", v: "Des rituels berbères transmis de génération en génération." },
  { k: "Sérénité", v: "Un écrin de calme préservé du tumulte de la médina." },
  { k: "Excellence", v: "Des produits naturels et des mains expertes, à chaque geste." },
];

export default function About() {
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
            <span className="eyebrow eyebrow--left">À propos</span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl leading-tight text-creme sm:text-5xl text-balance">
              Un refuge de bien-être au cœur de Marrakech
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-6 space-y-5 text-lg font-light leading-relaxed text-sable">
              <p>
                Derrière les murs de terre rose de la médina, Rayan SPA vous
                ouvre les portes d’un véritable rituel marocain. Ici, le temps
                ralentit&nbsp;: la vapeur du hammam, le parfum de l’argan et le
                clapotis de la fontaine vous enveloppent dès le premier pas.
              </p>
              <p>
                Notre philosophie puise dans la sagesse ancestrale du bien-être
                berbère, où le corps se purifie et l’esprit se libère. Chaque
                soin est une invitation au voyage, pensé comme une parenthèse
                hors du temps.
              </p>
            </div>
          </Reveal>

          <ZelligeDivider className="my-9 justify-start" />

          <Reveal delay={0.24}>
            <dl className="grid gap-6 sm:grid-cols-3">
              {values.map((item) => (
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
