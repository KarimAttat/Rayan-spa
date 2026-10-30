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
import Doors from "@/components/Doors";
import ConversionTracker from "@/components/ui/ConversionTracker";
import RevealObserver from "@/components/ui/Reveal";

/**
 * L'ordre de la page suit la décision du visiteur : le film, puis tout de
 * suite la carte et le formulaire (voir les prix, réserver, sans défiler),
 * puis ce qui donne envie, en alternant grandes images et pages claires :
 * l'invitation, deux demi-photos, la maison, une photo plein écran, le
 * rituel, les lieux, et l'adresse pour finir.
 */
export default function Home({ params }: { params: { locale: Locale } }) {
  return (
    <I18nProvider initialLocale={params.locale}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Booking />
        <Invite />
        <Doors />
        <About />
        <Moments />
        <CtaInline zone="after-about" />
        <Ritual />
        <Gallery />
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
