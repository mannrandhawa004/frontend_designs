import React, { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  HOOKS                                                             */
/* ------------------------------------------------------------------ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    el.querySelectorAll(".reveal, .reveal-clip").forEach((n) => io.observe(n));
    if (el.classList.contains("reveal") || el.classList.contains("reveal-clip"))
      io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function useCursor() {
  useEffect(() => {
    const dot = document.createElement("div");
    const ring = document.createElement("div");
    dot.className = "cursor-dot";
    ring.className = "cursor-ring";
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let rx = 0, ry = 0, dx = 0, dy = 0;
    const onMove = (e: MouseEvent) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.left = dx + "px";
      dot.style.top = dy + "px";
      const t = e.target as HTMLElement;
      const hover = !!t.closest("a, button, [data-hover]");
      dot.dataset.hover = String(hover);
      ring.dataset.hover = String(hover);
    };
    const loop = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => {
      window.removeEventListener("mousemove", onMove);
      dot.remove();
      ring.remove();
    };
  }, []);
}

function useMouseGlow(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [ref]);
}

function useCountUp(target: number, duration = 1400) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.disconnect();
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);
  return { val, ref };
}

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

interface Product {
  id: number;
  no: string;
  name: string;
  category: string;
  price: number;
  color: string;
  span: string; // tailwind grid span classes
}

const PRODUCTS: Product[] = [
  { id: 1, no: "01", name: "Monogram Puffer", category: "Outerwear", price: 2850, color: "Cobalt GG", span: "md:col-span-6 md:row-span-2" },
  { id: 2, no: "02", name: "Chrome Helmet", category: "Headwear", price: 920, color: "Liquid Silver", span: "md:col-span-3" },
  { id: 3, no: "03", name: "Utility Harness", category: "Accessory", price: 480, color: "Acid / Black", span: "md:col-span-3" },
  { id: 4, no: "04", name: "Rib Knit Base", category: "Knitwear", price: 1250, color: "Flamingo", span: "md:col-span-4" },
  { id: 5, no: "05", name: "Plush Companion", category: "Object", price: 580, color: "Ivory", span: "md:col-span-4" },
  { id: 6, no: "06", name: "Stripe Trouser", category: "Bottoms", price: 1350, color: "Multi", span: "md:col-span-4" },
];

const LOOKS = [
  { filter: "grayscale(1) contrast(1.05)", pos: "center 30%", label: "LOOK / 01" },
  { filter: "contrast(1.2) saturate(1.1)", pos: "center 60%", label: "LOOK / 02" },
  { filter: "hue-rotate(-15deg) saturate(1.3)", pos: "center 20%", label: "LOOK / 03" },
  { filter: "grayscale(1) invert(0.92)", pos: "center 50%", label: "LOOK / 04" },
  { filter: "contrast(1.35)", pos: "center 70%", label: "LOOK / 05" },
];

const TIERS = [
  { id: "silver", no: "I", name: "Silver", price: "Free", tagline: "The threshold.", perks: ["Drop previews", "10% member pricing", "Digital archive"] },
  { id: "gold", no: "II", name: "Gold", price: "$180", tagline: "The inner circle.", perks: ["Priority access", "Private salon invites", "Complimentary shipping", "Stylist line"], featured: true },
  { id: "platinum", no: "III", name: "Platinum", price: "$520", tagline: "The front row.", perks: ["All Gold privileges", "Bespoke commissions", "Runway seat", "Concierge atelier"] },
];

/* ------------------------------------------------------------------ */
/*  SMALL COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) translateY(-4px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = ""; };
  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </div>
  );
}

function Marquee({ items, reverse = false, tone = "ink" }: { items: string[]; reverse?: boolean; tone?: "ink" | "paper" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee-paused overflow-hidden ${tone === "paper" ? "text-paper" : "text-ink"}`}>
      <div className={`flex whitespace-nowrap ${reverse ? "animate-marquee-rev" : "animate-marquee"}`}>
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6 font-display text-[22px] md:text-[30px] font-semibold tracking-tight uppercase">{t}</span>
            <span className={`inline-block w-2 h-2 rounded-full ${tone === "paper" ? "bg-lime" : "bg-violet"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}

function Stat({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const { val, ref } = useCountUp(value);
  return (
    <div>
      <div className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-none">
        <span ref={ref}>{val}</span>{suffix}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{label}</div>
    </div>
  );
}

/* Rotating text around a circle (SVG) */
function RotatingStamp({ text, size = 140, className = "" }: { text: string; size?: number; className?: string }) {
  const id = React.useId();
  const r = size / 2 - 12;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={`rotate-slow ${className}`}>
      <defs>
        <path
          id={id}
          d={`M ${size / 2},${size / 2} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`}
        />
      </defs>
      <text className="font-mono" fontSize="10.5" letterSpacing="4" fill="currentColor">
        <textPath href={`#${id}`}>{text}</textPath>
      </text>
    </svg>
  );
}

/* Live clock in a specific timezone */
function useClock(tz: string) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [tz]);
  return t;
}

/* Equalizer bars */
function Equalizer({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-end gap-[3px] h-5 ${className}`}>
      {[0.1, 0.4, 0.2, 0.55, 0.3].map((d, i) => (
        <span
          key={i}
          className="bar w-[3px] bg-current"
          style={{ animationDelay: `${d}s`, height: "100%" }}
        />
      ))}
    </div>
  );
}



/* ------------------------------------------------------------------ */
/*  HERO SECTION — Cinematic Collage                                 */
/* ------------------------------------------------------------------ */

function ParallaxImage({ src, alt, speed = 0.5, className = "" }: { src: string; alt: string; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      setOffset(scrolled * speed * 0.1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-100"
        style={{ transform: `translateY(${offset}px) scale(1.1)` }}
      />
    </div>
  );
}

function HeroSection({
  heroRef,
  setActive,
}: {
  heroRef: React.RefObject<HTMLDivElement | null>;
  setActive: (p: Product) => void;
}) {
  const milano = useClock("Europe/Rome");
  const tokyo = useClock("Asia/Tokyo");
  const ny = useClock("America/New_York");

  const [countdown, setCountdown] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 12);
    target.setHours(20, 0, 0, 0);
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-rotate featured images
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((s) => (s + 1) % 3);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const slides = [
    { src: "/hero-model.jpg", label: "Full Look" },
    { src: "/hero-1.jpg", label: "Chrome Helmet" },
    { src: "/hero-3.jpg", label: "Subject A" },
  ];

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-screen overflow-hidden border-b border-line grain"
      style={{
        background:
          "radial-gradient(900px 600px at var(--mx, 50%) var(--my, 30%), rgba(91,33,230,0.16), transparent 60%), radial-gradient(800px 500px at 20% 80%, rgba(198,255,58,0.12), transparent 55%), var(--color-paper)",
      }}
    >
      {/* Film grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-[200] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Geometric accents */}
      <div className="pointer-events-none absolute top-[12%] left-[4%] w-4 h-4 border-2 border-violet rotate-45 animate-floaty" style={{ ["--rot" as string]: "45deg" }} />
      <div className="pointer-events-none absolute top-[28%] left-[8%] w-2 h-2 rounded-full bg-ink" />
      <div className="pointer-events-none absolute bottom-[20%] left-[6%] w-32 h-32 opacity-20">
        <svg viewBox="0 0 100 100" className="rotate-slow">
          <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" className="text-ink" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" className="text-violet" strokeWidth="0.5" />
        </svg>
      </div>
      <div className="pointer-events-none absolute top-[15%] right-[10%] w-24 h-24 border border-ink/20 rotate-12" />
      <div className="pointer-events-none absolute bottom-[35%] right-[5%] w-3 h-3 bg-lime rotate-45" />

      {/* Giant background type */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <div className="font-display font-extrabold tracking-[-0.08em] text-[45vw] md:text-[35vw] leading-[0.7] text-ink/[0.04]">
          05
        </div>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-4 md:px-8 pt-6 md:pt-10">
        {/* Top bar */}
        <div className="reveal flex items-center justify-between border-b border-ink/10 pb-4 font-mono text-[11px] uppercase tracking-[0.22em]">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet animate-blink" /> LIVE
            </span>
            <span className="text-muted hidden sm:inline">Editorial N°05 — FW25</span>
          </div>
          <div className="flex items-center gap-6 text-muted">
            <span>MIL <span className="text-ink tabular-nums">{milano}</span></span>
            <span className="hidden md:inline">NYC <span className="text-ink tabular-nums">{ny}</span></span>
            <span>TYO <span className="text-ink tabular-nums">{tokyo}</span></span>
          </div>
        </div>

        {/* HERO BENTO GRID */}
        <div className="mt-6 md:mt-10 grid grid-cols-12 gap-3 md:gap-4 auto-rows-[120px] md:auto-rows-[140px]">
          
          {/* Top-left: Manifesto block */}
          <div className="col-span-12 md:col-span-5 row-span-2 md:row-span-3 reveal flex flex-col justify-between p-5 md:p-6 border border-line bg-paper/50 backdrop-blur-sm">
            <div>
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-muted mb-3">[ 01 ] — Manifesto</div>
              <h1 className="font-display text-[38px] md:text-[56px] font-extrabold tracking-[-0.05em] leading-[0.9]">
                Fashion<br />
                <span className="font-serif italic font-normal text-violet">rewritten</span><br />
                in code.
              </h1>
            </div>
            <p className="text-[14px] leading-relaxed text-ink/60 max-w-[32ch] mt-4">
              Six pieces. One volume. Zero compromise. Chrome, monogram, and technical fabric sculpted into tomorrow.
            </p>
          </div>

          {/* Top-center: Main hero image with slide */}
          <div className="col-span-12 md:col-span-5 row-span-3 md:row-span-4 relative reveal-clip group">
            <div className="absolute inset-0 border border-line overflow-hidden bg-ink">
              {slides.map((slide, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === i ? "opacity-100" : "opacity-0"}`}
                >
                  <ParallaxImage src={slide.src} alt={slide.label} speed={0.3} className="w-full h-full" />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            </div>

            {/* Slide indicator */}
            <div className="absolute top-4 left-4 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`h-1 transition-all duration-500 ${activeSlide === i ? "w-8 bg-lime" : "w-4 bg-paper/40 hover:bg-paper/60"}`}
                />
              ))}
            </div>

            {/* REC badge */}
            <div className="absolute top-4 right-4 font-mono text-[10px] tracking-[0.25em] uppercase bg-paper text-ink px-3 py-1.5 border border-ink/20 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet animate-blink" /> REC
            </div>

            {/* Bottom overlay info */}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <div className="flex items-end justify-between">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/60 mb-1">
                    {slides[activeSlide].label}
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-paper tracking-tight">
                    CODE Subject A
                  </div>
                </div>
                <div
                  data-hover
                  onClick={() => setActive(PRODUCTS[0])}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-violet text-paper grid place-items-center animate-floaty cursor-pointer shadow-[0_15px_40px_-10px_rgba(91,33,230,0.7)]"
                  style={{ ["--rot" as string]: "-8deg" }}
                >
                  <div className="text-center">
                    <div className="font-mono text-[8px] tracking-[0.3em] opacity-70">05</div>
                    <div className="font-display font-bold text-lime text-lg leading-none">→</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top-right: Detail image stack */}
          <div className="col-span-6 md:col-span-2 row-span-2 reveal">
            <div className="h-full border border-line overflow-hidden relative group">
              <ParallaxImage src="/hero-2.jpg" alt="Texture detail" speed={0.5} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/40" />
              <div className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.25em] uppercase text-paper/80">
                GG Monogram
              </div>
            </div>
          </div>

          {/* Middle-right: Hardware detail */}
          <div className="col-span-6 md:col-span-2 row-span-2 reveal">
            <div className="h-full border border-line overflow-hidden relative group">
              <ParallaxImage src="/detail-1.jpg" alt="Hardware" speed={0.4} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-ink/40" />
              <div className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.25em] uppercase text-paper/80">
                Chrome
              </div>
            </div>
          </div>

          {/* Middle-left: Press strip */}
          <div className="col-span-12 md:col-span-5 row-span-1 reveal flex items-center justify-between px-5 md:px-6 border border-line bg-paper/30">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted">Featured in</div>
            <div className="flex items-center gap-4 font-serif italic text-lg text-ink/80">
              <span>Vogue</span>
              <span className="text-muted text-sm">·</span>
              <span>Dazed</span>
              <span className="text-muted text-sm">·</span>
              <span className="hidden sm:inline">i-D</span>
            </div>
          </div>

          {/* Bottom-left: Countdown */}
          <div className="col-span-12 md:col-span-4 row-span-2 reveal relative overflow-hidden bg-ink text-paper border border-ink">
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-violet blur-3xl opacity-50" />
            <div className="relative h-full p-5 flex flex-col justify-between">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-paper/50">Drop countdown</div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[
                  { v: countdown.d, l: "Days" },
                  { v: countdown.h, l: "Hrs" },
                  { v: countdown.m, l: "Min" },
                  { v: countdown.s, l: "Sec", h: true },
                ].map((u, i) => (
                  <div key={i} className="text-center">
                    <div className={`font-display text-3xl md:text-4xl font-extrabold tabular-nums leading-none ${u.h ? "text-violet" : i === 0 ? "text-lime" : ""}`}>
                      {String(u.v).padStart(2, "0")}
                    </div>
                    <div className="text-[9px] mt-1 tracking-[0.2em] uppercase text-paper/40">{u.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-3 font-serif italic text-sm text-paper/70">
                “Set your calendars.”
              </div>
            </div>
          </div>

          {/* Bottom-center: Plush detail */}
          <div className="col-span-6 md:col-span-3 row-span-2 reveal">
            <div className="h-full border border-line overflow-hidden relative group">
              <ParallaxImage src="/detail-2.jpg" alt="Companion" speed={0.6} className="w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-paper/80">
                  Plush Companion
                </div>
                <span className="font-mono text-[10px] text-lime">$580</span>
              </div>
            </div>
          </div>

          {/* Bottom-right: Index list */}
          <div className="col-span-6 md:col-span-3 row-span-2 reveal border border-line p-4 md:p-5 bg-paper/30">
            <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mb-3">Index</div>
            <ul className="space-y-1.5">
              {PRODUCTS.slice(0, 3).map((p) => (
                <li
                  key={p.id}
                  onClick={() => setActive(p)}
                  className="group flex items-center justify-between py-1.5 border-b border-ink/10 cursor-pointer"
                >
                  <span className="font-mono text-[10px] text-muted">{p.no}</span>
                  <span className="flex-1 font-display text-sm font-semibold tracking-tight group-hover:text-violet transition-colors px-2">
                    {p.name}
                  </span>
                  <span className="font-mono text-[10px] tabular-nums text-muted">${p.price}</span>
                </li>
              ))}
            </ul>
            <a href="#catalogue" className="mt-3 inline-block font-mono text-[10px] uppercase tracking-[0.2em] link-sweep text-violet">
              All pieces →
            </a>
          </div>

          {/* Bottom strip: CTAs */}
          <div className="col-span-12 row-span-1 reveal flex flex-wrap items-center justify-between gap-4 px-5 py-4 border border-line bg-paper/50">
            <div className="flex items-center gap-3">
              <a
                href="#join"
                className="group inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-ink text-paper hover:bg-violet transition-colors"
              >
                <span className="font-mono text-[11px] tracking-[0.22em] uppercase">Join CODE</span>
                <span className="w-8 h-8 rounded-full bg-lime text-ink grid place-items-center group-hover:rotate-45 transition-transform">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
                </span>
              </a>
              <a href="#catalogue" className="font-mono text-[11px] uppercase tracking-[0.22em] link-sweep">
                View collection ↘
              </a>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              <span className="inline-flex items-center gap-2">
                <Equalizer /> <span className="hidden sm:inline">Audio on</span>
              </span>
              <span>ISO 400 · 50MM · f/2.8</span>
            </div>
          </div>
        </div>

        {/* Giant display type below grid */}
        <div className="reveal mt-16 md:mt-24 pb-12 relative">
          <div className="font-display font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-[18vw] md:text-[14vw]">
            <span className="shine">The future</span>
          </div>
          <div className="font-display font-extrabold uppercase leading-[0.8] tracking-[-0.05em] text-[18vw] md:text-[14vw] flex items-baseline gap-4 flex-wrap">
            <span className="text-stroke-ink">wears</span>
            <span className="font-serif italic font-normal normal-case text-violet">chrome</span>
            <span className="relative bg-ink text-paper px-4">
              & code
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-lime border-2 border-ink" />
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="text-ink">Directed by Studio Versace</span>
            <span>DOP: L. Bianchi</span>
            <span>Music: Arca × Sega Bodega</span>
            <span>Runtime: 02:34</span>
            <span className="px-3 py-1 border border-ink/20">4K HDR</span>
          </div>
        </div>
      </div>

      {/* Bottom marquee */}
      <div className="border-t border-ink/15 py-4 bg-paper/80 backdrop-blur">
        <Marquee
          items={[
            "★ CODE 05 — NOW LIVE",
            "6 PIECES · ONE SILHOUETTE",
            "FREE WORLDWIDE SHIPPING",
            "MEMBERSHIP OPEN",
            "MILANO · 1978",
            "★ THE FUTURE WEARS CHROME",
          ]}
        />
      </div>
    </section>
  );
}

function StatsStrip() {
  return (
    <div className="border-b border-line bg-paper">
      <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <Stat value={6} label="Pieces in drop" />
        <Stat value={4} label="Colorways" />
        <Stat value={12} label="Editorial looks" />
        <Stat value={1978} label="Atelier founded" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FOOTER SECTION                                                    */
/* ------------------------------------------------------------------ */

function FooterSection() {
  const milano = useClock("Europe/Rome");
  const nyc = useClock("America/New_York");
  const tokyo = useClock("Asia/Tokyo");
  const paris = useClock("Europe/Paris");

  const wordmarkRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = wordmarkRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      el.style.setProperty("--fx", `${x}%`);
      el.style.setProperty("--fy", `${y}%`);
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <footer className="relative bg-ink text-paper overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-violet/30 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-20 right-0 w-[420px] h-[420px] rounded-full bg-lime/10 blur-[140px]" />

      {/* SIGNOFF CTA */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-end">
            <div className="md:col-span-8">
              <div className="font-mono text-[11px] tracking-[0.28em] uppercase text-paper/50 mb-4">
                [ END OF EDITORIAL ] — Until next code
              </div>
              <h2 className="font-display font-extrabold uppercase leading-[0.85] tracking-[-0.05em] text-[14vw] md:text-[10vw]">
                <span>See you</span>{" "}
                <span className="font-serif italic font-normal normal-case text-lime">on</span>
                <br />
                <span className="text-stroke-paper">the runway.</span>
              </h2>
            </div>
            <div className="md:col-span-4 flex flex-col gap-4">
              <a
                href="#join"
                className="group inline-flex items-center justify-between gap-3 pl-6 pr-1.5 py-1.5 rounded-full bg-lime text-ink hover:bg-paper transition-colors"
              >
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase">Reserve seat</span>
                <span className="w-11 h-11 rounded-full bg-ink text-lime grid place-items-center group-hover:rotate-45 transition-transform">
                  <svg width="14" height="14" viewBox="0 0 12 12"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
                </span>
              </a>
              <a href="mailto:atelier.milano@versace.code" className="group inline-flex items-center justify-between gap-3 pl-6 pr-1.5 py-1.5 rounded-full border border-paper/30 hover:border-paper transition-colors">
                <span className="font-mono text-[12px] tracking-[0.22em] uppercase">Write the atelier</span>
                <span className="w-11 h-11 rounded-full border border-paper/40 group-hover:bg-paper group-hover:text-ink grid place-items-center transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 6l8 6 8-6M4 6v12h16V6M4 6h16" /></svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-16 grid md:grid-cols-12 gap-10">
          {/* Brand + newsletter */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-paper text-ink grid place-items-center font-extrabold">V</div>
              <div className="font-extrabold tracking-[-0.04em] text-2xl">VERSACE<span className="text-violet">CODE</span></div>
            </div>
            <p className="font-serif italic text-xl leading-snug text-paper/70 max-w-sm">
              An experimental house. Fashion written in binary, cut in cloth — hand-finished in Milan.
            </p>

            {/* Micro newsletter */}
            <form
              onSubmit={(e) => { e.preventDefault(); alert("Thank you — you're on the list."); }}
              className="pt-3"
            >
              <label className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/50 block mb-2">
                Get the drop, quietly
              </label>
              <div className="flex items-center border-b border-paper/30 focus-within:border-lime transition-colors">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent py-3 outline-none font-display text-lg placeholder:text-paper/30"
                />
                <button className="shrink-0 h-9 px-4 rounded-full bg-paper text-ink font-mono text-[11px] uppercase tracking-[0.2em] hover:bg-lime transition-colors">
                  Join →
                </button>
              </div>
            </form>

            {/* Social row */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { l: "IG", n: "@versacecode" },
                { l: "TT", n: "@versacecode" },
                { l: "YT", n: "/versacecode" },
                { l: "SP", n: "/atelier-radio" },
              ].map((s) => (
                <a
                  key={s.l}
                  href="#top"
                  className="group flex items-center gap-2 border border-paper/20 hover:border-lime hover:text-lime transition-colors rounded-full pl-1 pr-3 py-1"
                >
                  <span className="w-7 h-7 rounded-full bg-paper text-ink grid place-items-center font-mono text-[10px] font-bold group-hover:bg-lime transition-colors">
                    {s.l}
                  </span>
                  <span className="font-mono text-[11px] tracking-widest">{s.n}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-paper/40 mb-4">Explore</div>
            <ul className="space-y-2.5 font-display text-lg">
              {[
                ["#campaign", "Campaign"],
                ["#lookbook", "Lookbook"],
                ["#catalogue", "Catalogue"],
                ["#membership", "Membership"],
              ].map(([h, l]) => (
                <li key={l}>
                  <a href={h} className="group flex items-center gap-2 hover:text-lime transition-colors">
                    <span className="w-0 group-hover:w-4 h-px bg-lime transition-all" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-paper/40 mb-4">House</div>
            <ul className="space-y-2.5 font-display text-lg">
              {["Atelier", "Press", "Careers", "Sustainability", "Archive"].map((l) => (
                <li key={l}>
                  <a href="#top" className="group flex items-center gap-2 hover:text-lime transition-colors">
                    <span className="w-0 group-hover:w-4 h-px bg-lime transition-all" />
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Atelier card + Made-in stamp */}
          <div className="md:col-span-3 space-y-6">
            <div className="border border-paper/20 p-5">
              <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-paper/40 mb-3">Atelier · Milano</div>
              <address className="not-italic text-sm leading-relaxed">
                Via Gesù 12<br />
                20121 Milano MI<br />
                Italy
              </address>
              <div className="mt-4 flex items-center gap-3 font-mono text-[11px] tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-lime animate-blink" />
                <span>Open now · +39 02 76 00 00 00</span>
              </div>
            </div>

            {/* Made in Italy stamp */}
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 shrink-0">
                <RotatingStamp
                  text="MADE IN ITALY • HAND-FINISHED • MADE IN ITALY • HAND-FINISHED • "
                  size={96}
                  className="text-paper/70"
                />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-8 h-8 rounded-full bg-lime text-ink grid place-items-center font-serif italic text-lg font-bold">V</div>
                </div>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.28em] uppercase text-paper/40">Craft</div>
                <div className="font-serif italic text-lg leading-tight">
                  Hand-cut,<br /> hand-finished.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WORLD CLOCKS */}
      <div className="relative border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {[
            { city: "Milano", tz: milano, dot: "text-lime" },
            { city: "Paris", tz: paris, dot: "text-violet" },
            { city: "New York", tz: nyc, dot: "text-lime" },
            { city: "Tokyo", tz: tokyo, dot: "text-violet" },
          ].map((c, i) => (
            <div key={c.city} className={`px-6 ${i === 0 ? "pl-0" : ""}`}>
              <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase text-paper/50">
                <span className={`w-1.5 h-1.5 rounded-full bg-current ${c.dot}`} /> {c.city}
              </div>
              <div className="mt-1 font-display text-3xl md:text-4xl font-extrabold tabular-nums tracking-tight">
                {c.tz}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GIANT INTERACTIVE WORDMARK */}
      <div
        ref={wordmarkRef}
        className="relative overflow-hidden select-none border-b border-white/10"
      >
        {/* Image reveals through wordmark */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(400px 400px at var(--fx, 50%) var(--fy, 50%), rgba(198,255,58,0.35), transparent 60%)",
          }}
        />
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-10 md:py-16 relative">
          <div className="font-display font-extrabold tracking-[-0.055em] leading-[0.82] text-[24vw] md:text-[19vw] text-stroke-paper hover:text-lime transition-colors duration-500 cursor-default">
            VERSACE
          </div>
          <div className="mt-2 font-display font-extrabold tracking-[-0.05em] leading-[0.82] text-[16vw] md:text-[13vw] text-paper flex items-baseline gap-6">
            <span>CODE</span>
            <span className="font-serif italic font-normal text-violet">05</span>
          </div>
        </div>
      </div>

      {/* LEGAL BAR */}
      <div className="relative">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 py-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.22em] uppercase text-paper/50">
          <div className="flex flex-wrap items-center gap-3">
            <span>© {new Date().getFullYear()} Versace CODE S.p.A.</span>
            <span className="w-1 h-1 rounded-full bg-paper/30" />
            <span>All rights reserved.</span>
            <span className="w-1 h-1 rounded-full bg-paper/30" />
            <span className="text-lime">v05.24.1 · MILANO</span>
          </div>
          <div className="flex gap-5">
            <a className="link-sweep hover:text-paper" href="#top">Terms</a>
            <a className="link-sweep hover:text-paper" href="#top">Privacy</a>
            <a className="link-sweep hover:text-paper" href="#top">Cookies</a>
            <a className="link-sweep hover:text-paper" href="#top">Accessibility</a>
          </div>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 border border-paper/20 hover:border-lime hover:text-lime rounded-full pl-3 pr-1 py-1 transition-colors"
          >
            Back to top
            <span className="w-6 h-6 rounded-full bg-paper text-ink grid place-items-center group-hover:bg-lime transition-colors">
              <svg width="10" height="10" viewBox="0 0 12 12"><path d="M6 10V2M2 6l4-4 4 4" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  APP                                                               */
/* ------------------------------------------------------------------ */

export default function App() {
  useCursor();
  const heroRef = useRef<HTMLDivElement | null>(null);
  useMouseGlow(heroRef);

  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [active, setActive] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const rootRef = useReveal<HTMLDivElement>();

  const add = (p: Product) => { setCart((c) => [...c, p]); setCartOpen(true); };
  const remove = (i: number) => setCart((c) => c.filter((_, idx) => idx !== i));
  const total = cart.reduce((s, p) => s + p.price, 0);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setJoined(true);
    setTimeout(() => { setJoined(false); setEmail(""); }, 2600);
  };

  return (
    <div ref={rootRef} className="relative min-h-screen bg-paper text-ink font-display selection:bg-lime selection:text-ink">
      {/* ============================================================= */}
      {/*  TOP TICKER                                                   */}
      {/* ============================================================= */}
      <div className="sticky top-0 z-40 bg-ink text-paper border-b border-white/10">
        <div className="py-2.5">
          <Marquee
            tone="paper"
            items={[
              "FW25 / MILAN",
              "CODE 05 — NOW LIVE",
              "NEW MEMBERSHIP OPEN",
              "WORLDWIDE SHIPPING",
              "EDITORIAL N°05",
            ]}
          />
        </div>
      </div>

      {/* ============================================================= */}
      {/*  NAV                                                          */}
      {/* ============================================================= */}
      <header className="sticky top-[44px] z-40 bg-paper/85 backdrop-blur-md border-b border-line">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-ink text-paper grid place-items-center font-extrabold text-[15px] group-hover:bg-violet transition-colors">V</div>
            <div className="font-extrabold tracking-[-0.04em] text-[20px]">VERSACE<sup className="text-[10px] text-violet ml-0.5">®</sup></div>
          </a>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[11px] uppercase tracking-[0.2em]">
            <a className="link-sweep" href="#campaign">Campaign</a>
            <a className="link-sweep" href="#lookbook">Lookbook</a>
            <a className="link-sweep" href="#catalogue">Catalogue</a>
            <a className="link-sweep" href="#membership">Membership</a>
          </nav>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative h-10 px-4 rounded-full border border-ink/20 hover:border-ink hover:bg-ink hover:text-paper transition-colors font-mono text-[11px] uppercase tracking-[0.18em]"
            >
              Bag <span className="ml-1 text-violet">{String(cart.length).padStart(2, "0")}</span>
            </button>
            <a
              href="#join"
              className="hidden sm:inline-flex h-10 items-center gap-2 px-5 rounded-full bg-violet text-paper font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-violet-deep transition-colors"
            >
              Join
              <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              className="h-10 w-10 rounded-full border border-ink/20 hover:bg-ink hover:text-paper transition-colors grid place-items-center"
            >
              <div className="space-y-1">
                <div className={`h-px w-4 bg-current transition-transform ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
                <div className={`h-px w-4 bg-current transition-transform ${menuOpen ? "-rotate-45 -translate-y-[1px]" : ""}`} />
              </div>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="border-t border-line bg-paper px-5 md:px-10 py-8">
            <div className="max-w-[1500px] mx-auto grid md:grid-cols-3 gap-8">
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-muted mb-3">INDEX</div>
                <ul className="font-display text-3xl font-semibold tracking-tight space-y-1">
                  <li><a className="link-sweep" onClick={() => setMenuOpen(false)} href="#campaign">Campaign</a></li>
                  <li><a className="link-sweep" onClick={() => setMenuOpen(false)} href="#lookbook">Lookbook</a></li>
                  <li><a className="link-sweep" onClick={() => setMenuOpen(false)} href="#catalogue">Catalogue</a></li>
                  <li><a className="link-sweep" onClick={() => setMenuOpen(false)} href="#membership">Membership</a></li>
                </ul>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-muted mb-3">ATELIER</div>
                <p className="font-serif italic text-2xl leading-snug text-ink/80">
                  “A wardrobe written in binary, tailored in Milan, worn without apology.”
                </p>
              </div>
              <div>
                <div className="font-mono text-[10px] tracking-[0.25em] text-muted mb-3">CONTACT</div>
                <ul className="font-mono text-[12px] space-y-1">
                  <li>press@versace.code</li>
                  <li>atelier.milano@versace.code</li>
                  <li>+39 02 76 00 00 00</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* ============================================================= */}
      {/*  HERO / CAMPAIGN                                              */}
      {/* ============================================================= */}
      <HeroSection
        heroRef={heroRef}
        setActive={setActive}
      />
      <StatsStrip />

      {/* ============================================================= */}
      {/*  LOOKBOOK — horizontal scroll                                 */}
      {/* ============================================================= */}
      <section id="lookbook" className="bg-ink text-paper py-16 md:py-24 bg-ink-grid border-b border-white/10">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10 mb-10 flex items-end justify-between flex-wrap gap-4">
          <div className="reveal">
            <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-paper/50">[ 03 ] — Lookbook</div>
            <h2 className="font-display text-5xl md:text-7xl font-extrabold tracking-[-0.035em] mt-2">
              Twelve frames, <span className="font-serif italic font-normal text-lime">one</span> silhouette.
            </h2>
          </div>
          <div className="reveal font-mono text-[11px] tracking-[0.22em] uppercase text-paper/60">
            Drag ← → to scroll
          </div>
        </div>

        <div className="no-scrollbar overflow-x-auto">
          <div className="flex gap-4 px-5 md:px-10 pb-4 min-w-max">
            {LOOKS.map((l, i) => (
              <div key={i} className="reveal group relative w-[78vw] sm:w-[48vw] md:w-[32vw] lg:w-[26vw] shrink-0">
                <div className="aspect-[3/4] overflow-hidden bg-white/5 border border-white/15">
                  <img
                    src="/hero-model.jpg"
                    alt={l.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    style={{ filter: l.filter, objectPosition: l.pos }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.22em]">
                  <span>{l.label}</span>
                  <span className="text-paper/50">FW25</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reverse marquee divider */}
        <div className="mt-14 border-y border-white/10 py-5">
          <Marquee
            tone="paper"
            reverse
            items={["VOLUME", "CHROME", "MONOGRAM", "CODE", "MILAN", "FUTURE TAILORING"]}
          />
        </div>
      </section>

      {/* ============================================================= */}
      {/*  CATALOGUE — asymmetric editorial grid                        */}
      {/* ============================================================= */}
      <section id="catalogue" className="py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div className="reveal">
              <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">[ 04 ] — Catalogue</div>
              <h2 className="font-display text-6xl md:text-[110px] font-extrabold tracking-[-0.045em] leading-[0.88] mt-2">
                The <span className="font-serif italic font-normal text-violet">six</span> pieces.
              </h2>
            </div>
            <div className="reveal max-w-sm text-[15px] text-ink/70">
              Each piece is cut from technical nylon, finished with signature hardware, and numbered. Tap any card for the full dossier.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[240px] gap-4">
            {PRODUCTS.map((p, i) => {
              const big = i === 0;
              return (
                <TiltCard
                  key={p.id}
                  className={`reveal group relative overflow-hidden bg-paper-2 border border-line cursor-pointer ${p.span} ${big ? "min-h-[520px]" : ""}`}
                >
                  <div onClick={() => setActive(p)} className="absolute inset-0">
                    <img
                      src="/hero-model.jpg"
                      alt={p.name}
                      className={`w-full h-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.06] ${big ? "object-top" : "object-center"}`}
                      style={{
                        filter: i % 3 === 1 ? "grayscale(1) contrast(1.1)" : i % 3 === 2 ? "contrast(1.15) saturate(1.15)" : undefined,
                        objectPosition: i % 2 === 0 ? "center 30%" : "center 65%",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/5 to-transparent opacity-80" />
                  </div>

                  <div className="relative z-10 h-full flex flex-col justify-between p-5 md:p-6 text-paper">
                    <div className="flex items-start justify-between font-mono text-[11px] tracking-[0.22em] uppercase">
                      <span className="bg-paper text-ink px-2 py-0.5">{p.no} / 06</span>
                      <span className="opacity-80">{p.category}</span>
                    </div>

                    <div>
                      <div className="flex items-end justify-between gap-4">
                        <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight leading-[0.95]">
                          {p.name}
                        </h3>
                        <span className="font-mono text-sm tabular-nums">${p.price}</span>
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] opacity-80">{p.color}</div>

                      <div className="mt-4 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                        <button
                          onClick={(e) => { e.stopPropagation(); setActive(p); }}
                          className="px-4 py-2 rounded-full border border-paper/60 hover:bg-paper hover:text-ink font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
                        >
                          Dossier
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); add(p); }}
                          className="px-4 py-2 rounded-full bg-lime text-ink hover:bg-paper font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
                        >
                          Add to bag
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  MEMBERSHIP                                                   */}
      {/* ============================================================= */}
      <section id="membership" className="bg-paper-2 border-y border-line py-20 md:py-28">
        <div className="max-w-[1500px] mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-12 gap-10 items-end mb-14">
            <div className="md:col-span-7 reveal">
              <div className="font-mono text-[11px] tracking-[0.25em] uppercase text-muted">[ 05 ] — Membership</div>
              <h2 className="font-display text-6xl md:text-[100px] font-extrabold tracking-[-0.045em] leading-[0.9] mt-2">
                Three doors.<br /><span className="font-serif italic font-normal text-violet">One</span> house.
              </h2>
            </div>
            <div className="md:col-span-5 reveal text-[15px] text-ink/70">
              Membership at Versace CODE is an invitation, not a transaction. Choose the tier that matches your tempo — upgrade or step back at any time.
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-4">
            {TIERS.map((t) => (
              <div
                key={t.id}
                className={`reveal relative md:col-span-4 p-7 md:p-8 flex flex-col border transition-all ${
                  t.featured
                    ? "bg-ink text-paper border-ink md:-mt-6 md:mb-[-6px] shadow-[0_30px_60px_-20px_rgba(11,11,11,0.5)]"
                    : "bg-paper text-ink border-line hover:border-ink/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className={`font-serif italic text-5xl ${t.featured ? "text-lime" : "text-violet"}`}>{t.no}</div>
                  {t.featured && (
                    <span className="font-mono text-[10px] uppercase tracking-[0.25em] bg-lime text-ink px-2 py-1">Recommended</span>
                  )}
                </div>

                <div className="mt-6">
                  <div className="font-display text-3xl font-bold tracking-tight">{t.name}</div>
                  <div className={`font-serif italic text-lg mt-1 ${t.featured ? "text-paper/70" : "text-ink/60"}`}>{t.tagline}</div>
                </div>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="font-display text-5xl font-extrabold tracking-tight tabular-nums">{t.price}</span>
                  {t.price !== "Free" && <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${t.featured ? "text-paper/60" : "text-muted"}`}>/ year</span>}
                </div>

                <ul className={`mt-8 space-y-3 text-[14px] flex-1 ${t.featured ? "text-paper/90" : "text-ink/80"}`}>
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className={`mt-2 w-1.5 h-1.5 rounded-full ${t.featured ? "bg-lime" : "bg-violet"}`} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#join"
                  className={`mt-8 inline-flex items-center justify-center gap-2 py-4 rounded-full font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${
                    t.featured
                      ? "bg-lime text-ink hover:bg-paper"
                      : "bg-ink text-paper hover:bg-violet"
                  }`}
                >
                  Select {t.name}
                  <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  JOIN / NEWSLETTER                                            */}
      {/* ============================================================= */}
      <section id="join" className="bg-ink text-paper py-24 md:py-32 bg-ink-grid relative overflow-hidden">
        <div className="pointer-events-none absolute -top-20 right-0 w-[60vw] h-[60vw] rounded-full bg-violet/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 w-[40vw] h-[40vw] rounded-full bg-lime/10 blur-[120px]" />

        <div className="relative max-w-[1100px] mx-auto px-5 md:px-10 text-center">
          <div className="reveal font-mono text-[11px] tracking-[0.3em] uppercase text-paper/60">[ 06 ] — Join the movement</div>
          <h2 className="reveal mt-4 font-display text-6xl md:text-[120px] font-extrabold tracking-[-0.05em] leading-[0.88]">
            Get the <span className="font-serif italic font-normal text-lime">drop</span><br />before the world.
          </h2>
          <p className="reveal mt-6 text-paper/70 max-w-md mx-auto">
            One email. Only when something extraordinary is ready. No noise, ever.
          </p>

          <form onSubmit={submit} className="reveal mt-10 max-w-xl mx-auto">
            <div className="flex items-center gap-2 border-b border-paper/40 focus-within:border-lime transition-colors">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 bg-transparent py-4 text-lg md:text-xl placeholder:text-paper/40 outline-none font-display"
              />
              <button
                type="submit"
                className="group shrink-0 inline-flex items-center gap-3 pl-5 pr-1.5 py-1.5 rounded-full bg-lime text-ink"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.22em]">Subscribe</span>
                <span className="w-8 h-8 rounded-full bg-ink text-paper grid place-items-center group-hover:rotate-45 transition-transform">
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.8" fill="none" /></svg>
                </span>
              </button>
            </div>
            {joined && (
              <div className="mt-5 font-serif italic text-lime text-xl animate-floaty">
                You're on the list. Welcome to CODE.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* ============================================================= */}
      {/*  FOOTER                                                       */}
      {/* ============================================================= */}
      <FooterSection />
      

      {/* ============================================================= */}
      {/*  PRODUCT DOSSIER MODAL                                        */}
      {/* ============================================================= */}
      {active && (
        <div
          className="fixed inset-0 z-[100] bg-ink/75 backdrop-blur-sm p-4 md:p-8 grid place-items-center"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-paper w-full max-w-5xl max-h-[92vh] overflow-auto grid md:grid-cols-2 border border-ink"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-paper-2 aspect-square md:aspect-auto">
              <img src="/hero-model.jpg" alt={active.name} className="w-full h-full object-cover object-top" />
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.25em] uppercase bg-ink text-paper px-2 py-1">
                Dossier N°{active.no}
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col">
              <button onClick={() => setActive(null)} className="self-end font-mono text-[11px] uppercase tracking-[0.22em] link-sweep mb-6">Close ✕</button>

              <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-muted">{active.category} / FW25</div>
              <h3 className="font-display text-5xl font-extrabold tracking-[-0.035em] mt-1">{active.name}</h3>
              <div className="mt-3 font-serif italic text-xl text-violet">{active.color}</div>

              <div className="mt-6 font-display text-4xl font-extrabold tabular-nums tracking-tight">${active.price}</div>

              <dl className="mt-8 grid grid-cols-2 gap-y-4 text-sm">
                <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">Material</dt>
                <dd>Technical nylon, GG monogram quilting</dd>
                <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">Fit</dt>
                <dd>Oversized, sculptural</dd>
                <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">Hardware</dt>
                <dd>Signature chrome, engraved</dd>
                <dt className="font-mono text-[10px] tracking-[0.22em] uppercase text-muted">Origin</dt>
                <dd>Atelier Milano, Italy</dd>
              </dl>

              <div className="flex-1" />

              <div className="flex gap-3 mt-10">
                <button
                  onClick={() => { add(active); setActive(null); }}
                  className="flex-1 py-4 rounded-full bg-ink text-paper hover:bg-violet transition-colors font-mono text-[11px] uppercase tracking-[0.22em]"
                >
                  Add — ${active.price}
                </button>
                <button
                  onClick={() => setActive(null)}
                  className="px-6 py-4 rounded-full border border-ink/30 hover:bg-ink hover:text-paper transition-colors font-mono text-[11px] uppercase tracking-[0.22em]"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/*  CART DRAWER                                                  */}
      {/* ============================================================= */}
      {cartOpen && (
        <div className="fixed inset-0 z-[100] flex" onClick={() => setCartOpen(false)}>
          <div className="flex-1 bg-ink/50 backdrop-blur-sm" />
          <aside
            className="w-full max-w-[440px] bg-paper h-full border-l border-ink flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-line flex items-center justify-between">
              <div>
                <div className="font-display text-2xl font-extrabold tracking-tight">Your bag</div>
                <div className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted mt-0.5">{cart.length} item{cart.length !== 1 ? "s" : ""}</div>
              </div>
              <button onClick={() => setCartOpen(false)} className="font-mono text-[11px] uppercase tracking-[0.22em] link-sweep">Close ✕</button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 grid place-items-center text-center px-10">
                <div>
                  <div className="font-serif italic text-3xl text-ink/70">Empty, for now.</div>
                  <button onClick={() => { setCartOpen(false); document.getElementById("catalogue")?.scrollIntoView({ behavior: "smooth" }); }} className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] link-sweep">Browse the six →</button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto p-6 space-y-5">
                  {cart.map((it, i) => (
                    <div key={i} className="flex gap-4 border-b border-line pb-5">
                      <div className="w-20 h-24 bg-paper-2 overflow-hidden border border-line shrink-0">
                        <img src="/hero-model.jpg" alt="" className="w-full h-full object-cover object-top" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-display text-lg font-semibold tracking-tight leading-tight">{it.name}</div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mt-0.5">{it.color}</div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="font-mono text-sm tabular-nums">${it.price}</div>
                          <button onClick={() => remove(i)} className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted hover:text-violet">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-line bg-paper-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Total</span>
                    <span className="font-display text-3xl font-extrabold tabular-nums">${total}</span>
                  </div>
                  <button
                    onClick={() => { alert(`Order confirmed — $${total}. A receipt is on its way.`); setCart([]); setCartOpen(false); }}
                    className="mt-5 w-full py-4 rounded-full bg-violet text-paper hover:bg-violet-deep transition-colors font-mono text-[11px] uppercase tracking-[0.22em]"
                  >
                    Checkout securely
                  </button>
                  <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Visa · Mastercard · Apple Pay · Crypto</div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
