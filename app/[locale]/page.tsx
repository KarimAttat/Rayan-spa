import { I18nProvider } from "@/lib/i18n";
import type { Locale } from "@/data/translations";
import { siteConfig } from "@/data/site-config";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Invite from "@/components/Invite";
import About from "@/components/About";
import Ritual from "@/components/Ritual";
import Services from "@/components/Services";
import Moments from "@/components/Moments";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CtaInline from "@/components/CtaInline";
import CtaBand from "@/components/CtaBand";
import ConversionTracker from "@/components/ui/ConversionTracker";
import RevealObserver from "@/components/ui/Reveal";

/**
 * L'ordre de la page alterne images plein écran et pages claires : le film
 * et le nom, une respiration en texte (réserver ou lire la carte), la
 * carte, une photo plein écran puis deux demi-photos, le formulaire, puis
 * ce qui donne envie (la maison, le rituel, les lieux), relancé par des
 * appels à réserver, et l'adresse pour finir.
 */
export default function Home({ params }: { params: { locale: Locale } }) {
  return (
    <I18nProvider initialLocale={params.locale}>
      <Header />
      <main>
        <Hero />
        <Invite />
        <Services />
        <Moments />
        <Booking />
        <About />
        <CtaInline zone="after-about" />
        <Ritual />
        <Gallery />
        <CtaBand />
        {siteConfig.showTestimonials && <Testimonials />}
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver key={params.locale} />
      <ConversionTracker />
    </I18nProvider>
  );
}
