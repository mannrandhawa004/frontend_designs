import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Stats from "./components/Stats";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import Process from "./components/Process";
import Projects from "./components/Projects";
import { Efficient, QuoteBanner } from "./components/Band";
import Testimonials from "./components/Testimonials";
import Faq from "./components/Faq";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer, { Gallery, Newsletter } from "./components/Footer";
import ScrollTop from "./components/ScrollTop";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <WhyUs />
        <Process />
        <Projects />
        <Efficient />
        <QuoteBanner />
        <Testimonials />
        <Faq />
        <Blog />
        <Contact />
        <Gallery />
        <Newsletter />
      </main>
      <Footer />
      <ScrollTop />
    </div>
  );
}
