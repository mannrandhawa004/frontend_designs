import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Platform from "./components/Platform";
import WhatWeDo from "./components/WhatWeDo";
import HowItWorks from "./components/HowItWorks";
import Compare from "./components/Compare";
import Integrations from "./components/Integrations";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-[#020617] text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <Platform />
        <WhatWeDo />
        <HowItWorks />
        <Compare />
        <Integrations />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
