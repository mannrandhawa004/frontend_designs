import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { Button, CloseIcon, MenuIcon, Wordmark } from "./ui";

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Outcomes", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export function Header({ onContact }: { onContact: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, y / max) : 0);

      let current = "";
      for (const item of navItems) {
        const el = document.querySelector(item.href) as HTMLElement | null;
        if (el && el.getBoundingClientRect().top <= 140) current = item.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500",
        scrolled || mobileOpen
          ? "border-b border-ink/[0.07] bg-paper/80 shadow-[0_6px_30px_rgba(25,25,27,0.05)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href="#top"
          className="group flex items-center rounded-md py-2"
          aria-label="Northbeam, back to top"
          onClick={() => setMobileOpen(false)}
        >
          <Wordmark className="transition-opacity group-hover:opacity-70" />
        </a>

        <nav
          aria-label="Primary"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 rounded-full border border-white/70 bg-white/50 p-1 shadow-[0_2px_16px_rgba(25,25,27,0.05)] backdrop-blur-md lg:flex"
        >
          {navItems.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "relative rounded-full px-4 py-2 text-[12.5px] font-medium tracking-[-0.005em] transition-colors duration-300",
                  isActive ? "bg-ink text-paper" : "text-ink/65 hover:bg-white/90 hover:text-ink",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <span className="mr-2 hidden items-center gap-2 xl:flex">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#6d9b62] opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-[#6d9b62]" />
            </span>
            <span className="eyebrow text-ink/50">Booking Q3 2026</span>
          </span>
          <Button
            onClick={onContact}
            className="hidden h-9 rounded-[8px] px-4 text-[12.5px] sm:inline-flex"
            icon={<span className="ml-1 inline-block size-1.5 rounded-full bg-sun" aria-hidden="true" />}
          >
            Start a project
          </Button>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-ink/10 bg-white/60 text-ink backdrop-blur-md transition hover:bg-white lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-0 bottom-[-1px] h-[2px] origin-left bg-gradient-to-r from-sun via-lilac to-sky transition-opacity duration-300",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{ transform: `scaleX(${progress})` }}
      />

      {mobileOpen && (
        <div
          id="mobile-menu"
          className="animate-fade-in h-[calc(100svh-68px)] overflow-y-auto border-t border-ink/[0.06] bg-paper px-5 pb-8 pt-4 sm:px-8 lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between border-b border-ink/[0.07] py-5 text-[26px] tracking-[-0.03em] transition-opacity hover:opacity-60",
                  active === item.href && "text-ink",
                  active && active !== item.href && "text-ink/55",
                )}
              >
                <span className="flex items-center gap-3">
                  {active === item.href && <span className="size-2 rounded-full bg-sun" />}
                  {item.label}
                </span>
                <span className="eyebrow text-ink/30">0{index + 1}</span>
              </a>
            ))}
          </nav>
          <Button
            className="mt-6 h-12 w-full"
            onClick={() => {
              setMobileOpen(false);
              onContact();
            }}
          >
            Start a project
          </Button>
          <a
            href="mailto:hello@northbeam.studio"
            className="mt-3 flex h-12 w-full items-center justify-center rounded-[9px] border border-ink/15 text-[13px] font-medium text-ink/70"
          >
            hello@northbeam.studio
          </a>
          <p className="mt-5 text-center text-[11.5px] text-muted">
            Copenhagen · Working worldwide · Reply within 1 business day
          </p>
        </div>
      )}
    </header>
  );
}
