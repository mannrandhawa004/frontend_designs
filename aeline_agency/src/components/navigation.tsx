import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { label: "Our expertise", href: "#expertise" },
  { label: "Selected work", href: "#work" },
  { label: "Our perspective", href: "#about" },
];

export function Navigation({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pendingSection = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const resize = () => { if (window.innerWidth >= 900) setOpen(false); };
    document.addEventListener("keydown", close);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", close);
      window.removeEventListener("resize", resize);
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${open ? "menu-is-open" : ""}`}>
      <div className="navigation page-width">
        <Brand />
        <nav className="desktop-navigation" aria-label="Main navigation">
          {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
        </nav>
        <div className="nav-actions">
          <button className="nav-contact" onClick={onContact}>Let's talk <ArrowUpRight size={15} aria-hidden="true" /></button>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      <AnimatePresence onExitComplete={() => {
        const section = pendingSection.current;
        pendingSection.current = null;
        if (!section) return;
        // Wait for menu and font reflow before starting the mobile scroll.
        void document.fonts.ready.then(() => {
          document.querySelector(section)?.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
            block: "start",
          });
        });
      }}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="page-width">
              {links.map((link, index) => (
                <a href={link.href} key={link.href} onClick={(event) => {
                  event.preventDefault();
                  pendingSection.current = link.href;
                  window.history.pushState(null, "", link.href);
                  setOpen(false);
                }}>
                  <span className="mono">0{index + 1}</span>{link.label}<ArrowUpRight size={20} aria-hidden="true" />
                </a>
              ))}
              <button onClick={() => { setOpen(false); onContact(); }}>Start a conversation <ArrowUpRight size={20} aria-hidden="true" /></button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}