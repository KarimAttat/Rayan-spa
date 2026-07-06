import { I18nProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Booking from "@/components/Booking";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <I18nProvider>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Booking />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </I18nProvider>
  );
}
