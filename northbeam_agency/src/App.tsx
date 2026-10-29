import { useCallback, useState } from "react";
import { ClientStrip } from "./components/ClientStrip";
import { ContactModal } from "./components/ContactModal";
import { CTA } from "./components/CTA";
import { Development } from "./components/Development";
import { FAQ } from "./components/FAQ";
import { FloatingActions } from "./components/FloatingActions";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Outcomes } from "./components/Outcomes";
import { Process } from "./components/Process";
import { Promise } from "./components/Promise";
import { Testimonials } from "./components/Testimonials";

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [interest, setInterest] = useState("");

  const openContact = useCallback((nextInterest = "") => {
    setInterest(nextInterest);
    setContactOpen(true);
  }, []);

  const closeContact = useCallback(() => setContactOpen(false), []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#main"
        className="sr-only z-[120] rounded-md bg-ink px-4 py-2.5 text-[13px] font-medium text-paper focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <Header onContact={() => openContact()} />

      <main id="main">
        <Hero onContact={() => openContact()} />
        <ClientStrip />
        <Promise />
        <Outcomes onContact={openContact} />
        <Development onContact={openContact} />
        <Process onContact={() => openContact()} />
        <Testimonials />
        <FAQ onContact={openContact} />
        <CTA onContact={() => openContact()} />
      </main>

      <Footer onContact={openContact} />

      <FloatingActions onContact={() => openContact()} />
      <ContactModal open={contactOpen} interest={interest} onClose={closeContact} />
    </div>
  );
}
