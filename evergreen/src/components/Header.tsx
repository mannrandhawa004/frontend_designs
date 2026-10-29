import { useEffect, useState } from "react";
import { Leaf } from "./ui";
import { cn } from "../utils/cn";

const nav = [
  { label: "Home", href: "#home" },
  { label: "About us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact us", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const mid = window.innerHeight * 0.35;
      let current = "#home";
      for (const n of nav) {
        const el = document.querySelector(n.href);
        if (el && el.getBoundingClientRect().top <= mid) current = n.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-4 rounded-full border px-4 py-2.5 transition-all duration-300 md:px-5",
          scrolled
            ? "border-forest/10 bg-white/85 shadow-[0_10px_40px_-18px_rgba(22,92,34,0.45)] backdrop-blur-xl"
            : "border-transparent bg-white/70 backdrop-blur-md",
        )}
      >
        <a href="#home" className="flex items-center gap-2 font-extrabold tracking-tight text-forest">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-forest-dark">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="text-lg">evergreen</span>
        </a>

        <nav className="ml-auto hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13px] font-medium transition",
                active === n.href
                  ? "bg-cream-2 text-forest"
                  : "text-ink/70 hover:bg-cream-2 hover:text-forest",
              )}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <a
            href="tel:3228208200"
            className="hidden items-center gap-2 rounded-full bg-cream-2 px-4 py-2.5 text-[13px] font-semibold text-forest transition hover:bg-lime-soft sm:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z" />
            </svg>
            (322) 820-820
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-forest px-5 py-2.5 text-[13px] font-semibold text-white transition hover:bg-forest-dark"
          >
            Get a Quote
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-forest/10 bg-white p-3 shadow-xl lg:hidden">
          {nav.map((n) => (
            <a
              key={n.label}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-ink/80 hover:bg-cream"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
