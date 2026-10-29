import { useEffect, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "HOW IT WORKS", href: "#how" },
  { label: "COMPARE", href: "#compare" },
];

export function LuminaMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M22.5 3.5c3.6 1.8 5.2 5.6 3.9 9.5-1.5 4.4-6.3 8.6-11.2 10.3-3.4 1.2-6.9.6-8.3-1.7-1.5-2.4-.6-5.9 2.2-8.7 3.2-3.2 9-5.8 13.4-9.4Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M8.6 20.8c2.8-1.6 6.6-1.2 9.4.6 2.4 1.6 3.4 3.9 2.4 5.4-1 1.6-3.6 1.8-6.2.8-2.9-1.1-6.4-3.9-5.6-6.8Z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#020617]/80 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-5 md:px-10">
          <a href="#home" className="flex items-center gap-2.5 text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] border border-white/10">
              <LuminaMark className="h-5 w-5 text-[#d8e9ff]" />
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Lumina</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-mono text-[11px] tracking-[0.14em] text-[#9abbe8]/90 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#cta"
              className="hidden items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-mono text-[11px] tracking-[0.12em] text-white/90 backdrop-blur transition hover:bg-white hover:text-black lg:flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              START BUILDING
            </a>
            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white/80 transition hover:bg-white/10"
              aria-label="Open menu"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#020617]/90 backdrop-blur-2xl"
          >
            <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-5 md:px-10">
              <div className="flex items-center gap-2.5 text-white">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/[0.06] border border-white/10">
                  <LuminaMark className="h-5 w-5 text-[#d8e9ff]" />
                </span>
                <span className="text-[15px] font-semibold">Lumina</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white"
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mx-auto grid max-w-[1400px] gap-2 px-6 pt-10 md:px-10">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className="group flex items-center justify-between border-b border-white/10 py-5"
                >
                  <span className="text-4xl font-light tracking-tight text-white/90 transition group-hover:text-white md:text-6xl">
                    {l.label.charAt(0)}
                    <span className="font-serif italic">{l.label.slice(1).toLowerCase()}</span>
                  </span>
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                </motion.a>
              ))}
              <motion.a
                href="#cta"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex items-center justify-center gap-2 rounded-full bg-white py-4 font-mono text-[12px] tracking-[0.14em] text-black"
              >
                START BUILDING
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
