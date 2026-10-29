import { useEffect } from "react";
import { StoreProvider, useStore } from "@/store";
import { PROPERTIES } from "@/data/properties";
import { Hero } from "@/components/Hero";
import { Listings } from "@/components/Listings";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { MobileNav } from "@/components/MobileNav";
import { PropertyModal } from "@/components/PropertyModal";
import { SearchOverlay } from "@/components/SearchOverlay";
import { ChatPanel } from "@/components/ChatPanel";
import { Toast } from "@/components/Toast";

function Shortcuts() {
  const { panel, setPanel, openPropertyId, nextFeatured } = useStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        !!target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPanel(panel === "search" ? null : "search");
        return;
      }
      if (e.key === "Escape" && panel) {
        setPanel(null);
        return;
      }
      if (typing || openPropertyId || panel === "search") return;
      if (e.key === "ArrowRight") nextFeatured(1);
      if (e.key === "ArrowLeft") nextFeatured(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, setPanel, openPropertyId, nextFeatured]);

  // Deep-link support: /#lunar-oasis opens the property sheet
  const { openProperty } = useStore();
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id && PROPERTIES.some((p) => p.id === id)) openProperty(id);
  }, [openProperty]);

  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-frame font-sans text-ink antialiased">
        <Hero />
        <main>
          <Listings />
          <Features />
          <CTA />
        </main>
        <Footer />
        <MobileNav />
        <ChatPanel />
        <SearchOverlay />
        <PropertyModal />
        <Toast />
        <Shortcuts />
      </div>
    </StoreProvider>
  );
}
