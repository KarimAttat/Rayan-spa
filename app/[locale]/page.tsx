import { I18nProvider } from "@/lib/i18n";
import type { Locale } from "@/data/translations";
import { siteConfig } from "@/data/site-config";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Ritual from "@/components/Ritual";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import RevealObserver from "@/components/ui/Reveal";

/**
 * L'ordre de la page suit l'argument : le nom et la porte, la maison,
 * le rituel, la carte et ses prix, les lieux, la réservation, l'adresse.
 */
export default function Home({ params }: { params: { locale: Locale } }) {
  return (
    <I18nProvider initialLocale={params.locale}>
      <Header />
      <main>
        <Hero />
        <About />
        <Ritual />
        <Services />
        <Gallery />
        <Booking />
        {siteConfig.showTestimonials && <Testimonials />}
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver key={params.locale} />
    </I18nProvider>
  );
}
