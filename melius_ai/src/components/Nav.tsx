import { useEffect, useState } from "react";
import { LogoLockup } from "./Logo";

type MenuItem = { label: string; desc: string };

const MENUS: Record<string, MenuItem[]> = {
  Product: [
    { label: "Canvas", desc: "Node-based workspace for every model" },
    { label: "Agents", desc: "Delegate repeatable creative work" },
    { label: "Models", desc: "60+ image, video and audio models" },
    { label: "Desktop app", desc: "Native for macOS and Windows" },
  ],
  Resources: [
    { label: "Docs", desc: "Guides, shortcuts and the API" },
    { label: "Templates", desc: "Start from a proven graph" },
    { label: "Changelog", desc: "Shipped this week" },
    { label: "Community", desc: "Join 40,000 creatives" },
  ],
  Company: [
    { label: "About", desc: "Why we are building Melius" },
    { label: "Manifesto", desc: "Taste is the new moat" },
    { label: "Careers", desc: "We are hiring across the board" },
    { label: "Brand", desc: "Logos, colours and usage" },
  ],
};

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 6" className={`h-[6px] w-[10px] ${className}`} aria-hidden="true">
      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-ink/85 backdrop-blur-xl" : "bg-ink"
      }`}
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex h-[52px] max-w-[1400px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-7">
          <a href="#top" className="text-white/95 transition-opacity hover:opacity-70">
            <LogoLockup />
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {Object.keys(MENUS).map((key) => (
              <button
                key={key}
                onMouseEnter={() => setOpen(key)}
                onFocus={() => setOpen(key)}
                className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[13px] transition-colors ${
                  open === key ? "text-white" : "text-white/60 hover:text-white"
                }`}
              >
                {key}
                <Chevron className={`mt-px transition-transform ${open === key ? "rotate-180" : ""}`} />
              </button>
            ))}
            <a
              href="#personas"
              className="rounded-md px-2.5 py-1.5 text-[13px] text-white/60 transition-colors hover:text-white"
            >
              Enterprise
            </a>
            <a
              href="#pricing"
              className="rounded-md px-2.5 py-1.5 text-[13px] text-white/60 transition-colors hover:text-white"
            >
              Pricing
            </a>
          </nav>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <a
            href="#top"
            className="rounded-full bg-[#ffb020] px-3.5 py-1.5 text-[12.5px] font-medium text-[#2a1a00] transition-transform hover:-translate-y-px"
          >
            Sign in
          </a>
          <a
            href="#pricing"
            className="rounded-full bg-brand px-3.5 py-1.5 text-[12.5px] font-medium text-white transition-transform hover:-translate-y-px"
          >
            Start for free
          </a>
        </div>

        <button
          onClick={() => setMobile((v) => !v)}
          className="flex h-8 w-8 items-center justify-center rounded-md text-white/70 sm:hidden"
          aria-label="Menu"
        >
          <div className="space-y-[5px]">
            <span className={`block h-px w-5 bg-current transition-transform ${mobile ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`block h-px w-5 bg-current transition-opacity ${mobile ? "opacity-0" : ""}`} />
            <span className={`block h-px w-5 bg-current transition-transform ${mobile ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* desktop dropdown */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-[52px] hidden justify-start lg:flex ${
          open ? "pointer-events-auto" : ""
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-6">
          <div
            className={`w-[460px] origin-top overflow-hidden rounded-2xl border border-white/10 bg-[#161412]/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-xl transition-all duration-200 ${
              open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-2 scale-[0.98] opacity-0"
            }`}
          >
            <div className="grid grid-cols-2 gap-1">
              {(MENUS[open ?? "Product"] ?? []).map((item) => (
                <a
                  key={item.label}
                  href="#top"
                  className="group rounded-xl p-3 transition-colors hover:bg-white/[0.06]"
                >
                  <div className="text-[13px] font-medium text-white/90">{item.label}</div>
                  <div className="mt-0.5 text-[11.5px] leading-snug text-white/40">{item.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className={`overflow-hidden border-t border-white/5 bg-ink transition-[max-height] duration-300 sm:hidden ${
          mobile ? "max-h-[420px]" : "max-h-0"
        }`}
      >
        <div className="space-y-1 px-5 py-4">
          {[...Object.keys(MENUS), "Enterprise", "Pricing"].map((l) => (
            <a
              key={l}
              href={l === "Pricing" ? "#pricing" : "#top"}
              onClick={() => setMobile(false)}
              className="block border-b border-white/5 py-2.5 text-sm text-white/70"
            >
              {l}
            </a>
          ))}
          <div className="flex gap-2 pt-3">
            <a href="#top" className="flex-1 rounded-full bg-white/10 py-2 text-center text-[13px]">
              Sign in
            </a>
            <a href="#pricing" className="flex-1 rounded-full bg-brand py-2 text-center text-[13px] font-medium">
              Start for free
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
