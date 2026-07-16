import { FormEvent, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRibbon, { MARQUEE_WORDS } from "./components/Ribbon";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────── data ─────────────────────────── */

const artworks = [
  { title: "Chrome Bloom",   kind: "Pixel Art",     image: "/images/category-bloom.jpg",    tag: "01", accent: "#dfff00" },
  { title: "Liquid Future",  kind: "Neural Form",   image: "/images/category-portrait.jpg", tag: "02", accent: "#ff6f5d" },
  { title: "Into Orbit",     kind: "Generative",    image: "/images/category-orbit.jpg",    tag: "03", accent: "#ffb75e" },
  { title: "Red Signal",     kind: "Fractal Study", image: "/images/category-form.jpg",     tag: "04", accent: "#c084fc" },
  { title: "Cyber Shadow",   kind: "Neural Form",   image: "/images/gallery-cyber.jpg",     tag: "05", accent: "#22d3ee" },
  { title: "Fire Form",      kind: "Generative",    image: "/images/gallery-fire.jpg",      tag: "06", accent: "#f97316" },
];

const capabilities = [
  { icon: "✦", title: "Prompt to picture",  body: "Type a thought. Watch it become a still, a moving image, or an entire visual world." },
  { icon: "◈", title: "Direction, not dice",body: "Steer color, energy, and rhythm. No random rolls — only intentional results." },
  { icon: "◉", title: "Style memory",       body: "PixelAI remembers your taste and evolves it so every session builds on the last." },
  { icon: "⬡", title: "Made for motion",    body: "Every still can loop, breathe, or perform. Export cinemagraphs in one click." },
];

const steps = [
  { num: "01", title: "Sketch a spark",  body: "Type, drop a mood image, or say it out loud." },
  { num: "02", title: "Direct the drift",body: "Pull sliders for color heat, motion, and grain." },
  { num: "03", title: "Lock the frame",  body: "Freeze the best beat and go straight to export." },
];


function SparkMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2.5 19.1 12.9 29.5 16l-10.4 3.1L16 29.5l-3.1-10.4L2.5 16l10.4-3.1Z" fill="currentColor" />
      <circle cx="16" cy="16" r="2.2" fill="#fff" />
    </svg>
  );
}

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function splitLetters(text: string, className = "") {
  return text.split("").map((char, i) => (
    <span
      key={`${char}-${i}`}
      className={`letter inline-block will-change-transform ${className}`}
      aria-hidden="true"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function App() {
  const [studioOpen, setStudioOpen] = useState(false);
  const [prompt, setPrompt]         = useState("");
  const [submitted, setSubmitted]   = useState(false);
  const [progress, setProgress]     = useState(0);

  const appRef       = useRef<HTMLElement>(null);
  const cursorRef    = useRef<HTMLDivElement>(null);
  const cursorLabel  = useRef<HTMLSpanElement>(null);
  const noiseRef     = useRef<HTMLCanvasElement>(null);

  const openStudio = () => { setSubmitted(false); setStudioOpen(true); };
  const closeStudio = () => setStudioOpen(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim()) setSubmitted(true);
  };

  useEffect(() => {
    const canvas = noiseRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame: number;
    const draw = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const img = ctx.createImageData(canvas.width, canvas.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 18;
      }
      ctx.putImageData(img, 0, 0);
      frame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = cursorRef.current;
    if (!el) return;
    gsap.set(el, { xPercent: -50, yPercent: -50, scale: 1 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    const onMove = (e: PointerEvent) => { xTo(e.clientX); yTo(e.clientY); };
    window.addEventListener("pointermove", onMove);

    const targets = document.querySelectorAll<HTMLElement>("[data-cursor]");
    const off: (() => void)[] = [];
    targets.forEach((t) => {
      const label = t.dataset.cursor || "";
      const enter = () => {
        gsap.to(el, { scale: 6, duration: 0.35, ease: "back.out(2)" });
        el.classList.add("cursor-active");
        if (cursorLabel.current) cursorLabel.current.textContent = label;
      };
      const leave = () => {
        gsap.to(el, { scale: 1, duration: 0.35, ease: "power2.out" });
        el.classList.remove("cursor-active");
        if (cursorLabel.current) cursorLabel.current.textContent = "";
      };
      t.addEventListener("pointerenter", enter);
      t.addEventListener("pointerleave", leave);
      off.push(() => { t.removeEventListener("pointerenter", enter); t.removeEventListener("pointerleave", leave); });
    });
    return () => { window.removeEventListener("pointermove", onMove); off.forEach((fn) => fn()); };
  }, []);

  /* ── magnetic hover on buttons/links ── */
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const magnets = document.querySelectorAll<HTMLElement>("[data-magnet]");
    const off: (() => void)[] = [];
    magnets.forEach((m) => {
      const strength = 0.35;
      const move = (e: PointerEvent) => {
        const r = m.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        gsap.to(m, { x: mx * strength, y: my * strength, duration: 0.5, ease: "power3.out" });
      };
      const leave = () => gsap.to(m, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      m.addEventListener("pointermove", move);
      m.addEventListener("pointerleave", leave);
      off.push(() => { m.removeEventListener("pointermove", move); m.removeEventListener("pointerleave", leave); });
    });
    return () => off.forEach((fn) => fn());
  }, []);

  useLayoutEffect(() => {
    if (!appRef.current) return;
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {

      gsap.from("[data-hero-eye]", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" });
      gsap.from("[data-hero-h1] .letter", { yPercent: 130, opacity: 0, duration: 1.15, ease: "expo.out", stagger: 0.028, delay: 0.08 });
      gsap.from("[data-hero-body]", { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.45 });
      gsap.from("[data-hero-cta] > *", { y: 22, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.07, delay: 0.6 });
      gsap.from("[data-hero-wrap]", { clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "expo.out", delay: 0.12 });
      gsap.from("[data-hero-img]", { scale: 1.45, duration: 1.7, ease: "expo.out", delay: 0.12 });

      if (!rm) {
        gsap.to("[data-hero-img]", { yPercent: 14, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
        gsap.to("[data-orb-a]", { yPercent: 35, xPercent: 12, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
        gsap.to("[data-orb-b]", { yPercent: -22, xPercent: -10, ease: "none", scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true } });
      }

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const suffix = el.dataset.suffix || "";
        const state  = { v: 0 };
        gsap.to(state, { v: target, duration: 2.2, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 88%" }, onUpdate: () => { el.textContent = `${Math.round(state.v).toLocaleString()}${suffix}`; }, });
      });

      const mTrack = document.querySelector<HTMLElement>("[data-marquee-track]");
      if (mTrack && !rm) {
        const half = mTrack.scrollWidth / 2;
        const base = gsap.to(mTrack, { x: -half, duration: 22, ease: "none", repeat: -1 });
        ScrollTrigger.create({ trigger: "[data-marquee]", start: "top bottom", end: "bottom top", onUpdate: (s) => { const ts = 1 + Math.abs(s.getVelocity()) / 800; gsap.to(base, { timeScale: s.direction === -1 ? -ts : ts, duration: 0.4, overwrite: true }); }, });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal-title]").forEach((el) => {
        gsap.from(el.querySelectorAll(".letter"), { yPercent: 115, opacity: 0, duration: 1.05, ease: "expo.out", stagger: 0.022, scrollTrigger: { trigger: el, start: "top 84%" }, });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, { y: 44, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" }, });
      });

      const track   = document.querySelector<HTMLElement>("[data-h-track]");
      const wrapper = document.querySelector<HTMLElement>("[data-h-wrap]");
      if (track && wrapper && !rm) {
        const amt = () => -(track.scrollWidth - window.innerWidth + 80);
        gsap.to(track, { x: amt, ease: "none", scrollTrigger: { id: "hgallery", trigger: wrapper, start: "top top", end: () => `+=${Math.abs(amt())}`, scrub: 0.7, pin: true, anticipatePin: 1, invalidateOnRefresh: true, }, });
        gsap.utils.toArray<HTMLElement>("[data-h-card]").forEach((card) => {
          gsap.from(card.querySelector("[data-h-img]"), { scale: 1.18, duration: 1.4, ease: "power2.out", scrollTrigger: { trigger: card, start: "top 88%" }, });
        });
      }

      gsap.from("[data-mani-wrap]", { clipPath: "inset(0 0 100% 0)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "[data-mani]", start: "top 72%" }, });
      if (!rm) { gsap.to("[data-mani-img]", { yPercent: -16, ease: "none", scrollTrigger: { trigger: "[data-mani]", start: "top bottom", end: "bottom top", scrub: true }, }); }
      gsap.from("[data-cap]", { y: 55, opacity: 0, duration: 0.85, ease: "power3.out", stagger: 0.09, scrollTrigger: { trigger: "[data-caps]", start: "top 80%" }, });
      const tlLine = document.querySelector<HTMLElement>("[data-tl-line]");
      if (tlLine) { gsap.fromTo(tlLine, { scaleY: 0 }, { scaleY: 1, ease: "none", transformOrigin: "top", scrollTrigger: { trigger: "[data-tl]", start: "top 68%", end: "bottom 55%", scrub: true }, }); }
      gsap.utils.toArray<HTMLElement>("[data-tl-item]").forEach((item) => { gsap.from(item, { x: -28, opacity: 0, duration: 0.85, ease: "power3.out", scrollTrigger: { trigger: item, start: "top 87%" }, }); });
      gsap.from("[data-feature-img]", { scale: 1.1, opacity: 0, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: "[data-feature]", start: "top 75%" }, });
      if (!rm) { gsap.to("[data-feature-img]", { yPercent: -10, ease: "none", scrollTrigger: { trigger: "[data-feature]", start: "top bottom", end: "bottom top", scrub: true }, }); }
      if (!rm) { gsap.to("[data-cta-orb]", { scale: 1.55, ease: "none", scrollTrigger: { trigger: "[data-cta]", start: "top bottom", end: "bottom top", scrub: true }, }); }
      ScrollTrigger.create({ trigger: "[data-cta]", start: "top 55%", onEnter: () => document.body.style.background = "#ffb75e", onLeaveBack: () => document.body.style.background = "#f7f5ef", });
      ScrollTrigger.refresh();
    }, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ScrollRibbon />
      <canvas ref={noiseRef} className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035] mix-blend-overlay" aria-hidden="true" />
      <div className="fixed left-0 top-0 z-[55] h-[3px] w-full"><div className="h-full origin-left bg-[#dfff00] transition-transform duration-75" style={{ transform: `scaleX(${progress})` }} /></div>
      <div ref={cursorRef} className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-3 w-3 items-center justify-center rounded-full bg-[#111] text-[7px] font-black uppercase tracking-widest text-[#dfff00] mix-blend-difference md:flex"><span ref={cursorLabel} className="cursor-label scale-[0.167] opacity-0 transition-opacity duration-200" /></div>
      <main ref={appRef} className="relative bg-[#f4f2ea] text-[#0d0d0d]">
        <section data-hero className="relative min-h-screen overflow-hidden bg-[#f4f2ea]">
          <div data-orb-a className="hero-orb" style={{ top: "-10rem", left: "-11rem", width: "44rem", height: "44rem", background: "#ffba63" }} />
          <div data-orb-b className="hero-orb" style={{ bottom: "-16rem", right: "30%", width: "26rem", height: "26rem", background: "#dfff00" }} />
          <div className="hero-orb" style={{ top: "20%", right: "-6rem", width: "18rem", height: "18rem", background: "#ff6f5d", opacity: 0.35 }} />
          <nav className="relative z-50 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <a href="#top" className="flex items-center gap-2 font-black tracking-[-0.06em]" aria-label="PixelAI" data-cursor="Home"><SparkMark className="h-5 w-5" /><span className="text-[21px]">PixelAI</span></a>
            <div className="hidden items-center gap-8 text-[10.5px] font-bold uppercase tracking-[0.13em] md:flex">{["Gallery","Manifesto","Process","Artists"].map((l) => (<a key={l} className="link-under" href={`#${l.toLowerCase()}`} data-cursor={l[0]}>{l}</a>))}</div>
            <button onClick={openStudio} className="button-dark px-4 py-[9px] text-[10px]" type="button" data-cursor="Open">Start creating</button>
          </nav>
          <div id="top" className="relative z-[2] mx-auto grid max-w-[1440px] grid-cols-1 px-5 pb-10 pt-10 sm:px-8 sm:pb-14 lg:grid-cols-12 lg:px-12 lg:pb-14 lg:pt-12">
            <div className="relative flex min-h-[430px] flex-col justify-between pb-2 lg:col-span-7 lg:min-h-[660px] lg:pb-0">
              <div>
                <div data-hero-eye className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-3 py-1.5 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff6f5d] opacity-75" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#ff6f5d]" /></span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/70">Creative intelligence, live</span>
                </div>
                <h1 data-hero-h1 className="font-display hero-title-shadow overflow-hidden text-[clamp(4.5rem,12vw,13rem)] uppercase leading-[0.74] tracking-[-0.04em]" aria-label="Pixel AI"><span className="block overflow-hidden">{splitLetters("Pixel")}</span><span className="block overflow-hidden text-[#ff6f5d]">{splitLetters("AI.")}</span></h1>
                <p data-hero-body className="mt-8 max-w-[420px] text-[1.05rem] leading-relaxed text-black/65">A studio where human instinct meets a new kind of imagination. Sketch a thought — watch it become an evolving image.</p>
              </div>
              <div data-hero-cta className="flex flex-wrap items-center gap-4 pt-10">
                <button onClick={openStudio} className="button-acid group gap-2" type="button" data-cursor="Create" data-magnet><SparkMark className="h-4 w-4" />Start animating<ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
                <a href="#gallery" className="link-under text-[11px] font-bold uppercase tracking-[0.13em]" data-cursor="Go">Explore work</a>
                <div className="ml-1 hidden items-center gap-3 sm:flex">
                  <div className="flex -space-x-2">{["#dfff00","#ff6f5d","#ffb75e"].map((c) => (<span key={c} className="h-6 w-6 rounded-full border-2 border-[#f4f2ea]" style={{ background: c }} />))}</div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-black/50">12k artists<br />this month</span>
                </div>
              </div>
            </div>
            <div className="relative z-[2] mt-8 lg:col-span-5 lg:mt-0">
              <div data-hero-wrap className="tilt relative aspect-[4/5] overflow-hidden rounded-[2px] bg-[#ff6f5d] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.5)] lg:aspect-auto lg:h-[660px]">
                <img data-hero-img src="/images/hero-orbit.jpg" alt="AI editorial artwork" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <p className="max-w-[150px] text-[9px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-white/90">Rendered with PixelAI · Neural v4</p>
                  <span className="rounded-full border border-white/40 bg-black/20 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm">Live</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div data-reveal className="relative z-[2] mx-auto grid max-w-[1440px] grid-cols-2 gap-y-5 border-t border-black/10 px-5 py-7 sm:grid-cols-4 sm:px-8 lg:px-12">
            {[
              { label: "Artists",       value: 12000,  suffix: "+" },
              { label: "Images / day",  value: 480000, suffix: "" },
              { label: "Style presets", value: 128,    suffix: "" },
              { label: "Countries",     value: 87,     suffix: "" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span data-count={s.value} data-suffix={s.suffix} className="font-display text-[2.6rem] font-black leading-none tracking-[-0.06em] sm:text-[3.5rem]">0</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-black/45">{s.label}</span>
              </div>
            ))}
        </div>
        <section data-marquee className="relative overflow-hidden border-y-2 border-black bg-[#0d0d0d] py-5 text-[#dfff00]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
            {Array.from({ length: 6 }).map((_, i) => (<div key={i} className="glitch-line" style={{ top: `${(i + 1) * 16}%` }} />))}
          </div>
          <div data-marquee-track className="font-display relative z-[2] flex whitespace-nowrap text-[clamp(2.2rem,4.5vw,4.8rem)] font-black uppercase leading-none tracking-[-0.06em]">
            {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (<span key={i} className="flex items-center pr-10">{w}<SparkMark className="ml-8 h-6 w-6 shrink-0" /></span>))}
          </div>
        </section>
        <section id="manifesto" data-mani className="relative z-[2] mx-auto grid max-w-[1440px] gap-14 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-12 lg:gap-12 lg:px-12">
          <div className="lg:col-span-4">
            <p data-reveal className="section-index">01 / The studio</p>
            <div data-mani-wrap className="relative mt-10 hidden aspect-[3/4] overflow-hidden bg-[#e6e6e1] lg:block"><img data-mani-img src="/images/manifesto.jpg" alt="AI generated portrait" className="h-full w-full scale-110 object-cover" /></div>
          </div>
          <div className="lg:col-span-8">
            <h2 data-reveal-title className="font-display max-w-[900px] overflow-hidden text-[clamp(2.8rem,6.5vw,7rem)] font-black uppercase leading-[0.86] tracking-[-0.09em]" aria-label="Make pictures that pull the future closer."><span className="block overflow-hidden">{splitLetters("Make pictures")}</span><span className="block overflow-hidden">{splitLetters("that pull the")}</span><span className="block overflow-hidden opacity-25">{splitLetters("future closer.")}</span></h2>
            <div data-caps className="mt-16 grid max-w-[740px] gap-10 sm:grid-cols-2">{capabilities.map((c) => (<div key={c.title} data-cap className="cap-card group border-t-2 border-black pt-5"><span className="cap-icon inline-block text-2xl leading-none text-[#ff6f5d]">{c.icon}</span><h3 className="mt-3 text-sm font-black uppercase tracking-[-0.01em]">{c.title}</h3><p className="mt-2 text-[13px] leading-relaxed text-black/60">{c.body}</p></div>))}</div>
            <div data-reveal className="mt-14 flex flex-wrap items-center gap-5"><button onClick={openStudio} className="button-acid" type="button" data-cursor="Open"><SparkMark className="h-4 w-4" />Try the canvas<ArrowUpRight className="h-4 w-4" /></button><a href="#gallery" className="link-under text-[11px] font-bold uppercase tracking-[0.13em]" data-cursor="Down">Skip to gallery</a></div>
          </div>
        </section>
        <section id="gallery" data-h-wrap className="relative overflow-hidden bg-[#0d0d0d]">
          <div className="aurora" style={{ top: "10%", left: "20%", width: "36rem", height: "36rem", background: "#3b2f00", opacity: 0.7 }} />
          <div className="pointer-events-none absolute left-0 top-0 z-50 w-full px-5 py-8 sm:px-8 lg:px-12"><p className="section-index text-[#dfff00]/60">02 / Selected output</p><h2 data-reveal-title className="font-display mt-4 overflow-hidden text-[clamp(2.4rem,5.5vw,5rem)] font-black uppercase leading-none tracking-[-0.09em] text-white"><span className="block overflow-hidden">{splitLetters("New visions")}</span></h2></div>
          <div className="relative z-[2] flex h-screen items-center">
            <div data-h-track className="flex gap-5 pl-5 pt-28 sm:pl-8 lg:pl-12" style={{ willChange: "transform" }}>
              {artworks.map((art) => (
                 <article key={art.title} data-h-card data-cursor="View" className="tilt group relative h-[64vh] w-[76vw] shrink-0 overflow-hidden rounded-[2px] bg-[#1a1a1a] sm:w-[54vw] md:w-[44vw] lg:w-[35vw]"><img data-h-img src={art.image} alt={art.title} className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110" /><div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-25" style={{ background: art.accent }} /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-6 text-white"><p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-60">{art.tag} · {art.kind}</p><h3 className="mt-1 font-display text-3xl uppercase leading-tight tracking-[-0.02em] sm:text-4xl">{art.title}</h3><div className="mt-3 h-[2px] w-0 transition-all duration-500 ease-out group-hover:w-full" style={{ background: art.accent }} /></div><button onClick={openStudio} type="button" className="absolute right-5 top-5 grid h-11 w-11 translate-y-2 place-items-center rounded-full border border-white/40 text-white opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-110" aria-label={`Open ${art.title}`} style={{ background: art.accent + "33" }}><ArrowUpRight className="h-4 w-4" /></button></article>
              ))}
              <article className="relative flex h-[64vh] w-[76vw] shrink-0 flex-col justify-between overflow-hidden bg-[#dfff00] p-8 sm:w-[54vw] md:w-[44vw] lg:w-[35vw]"><p className="section-index">End of edition</p><div><h3 className="font-display text-4xl font-black uppercase leading-none tracking-[-0.06em] sm:text-5xl">Make yours<br />next.</h3><p className="mt-5 max-w-xs text-sm text-black/70 leading-relaxed">Every gallery drop starts with a single line of text. Yours could be here next week.</p><button onClick={openStudio} className="button-dark mt-9 px-5 py-3 text-[10px]" type="button" data-cursor="Open"><SparkMark className="h-3.5 w-3.5" />Start creating<ArrowUpRight className="h-3.5 w-3.5" /></button></div><div className="absolute right-8 top-8"><SparkMark className="h-12 w-12 opacity-30" /></div></article>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40"><span className="h-px w-8 bg-white/30" />Scroll to explore<span className="h-px w-8 bg-white/30" /></div>
        </section>
        <section id="process" data-tl className="relative z-[2] mx-auto grid max-w-[1440px] gap-14 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-4"><p data-reveal className="section-index">03 / How it works</p><h2 data-reveal-title className="font-display mt-5 overflow-hidden text-[clamp(2.4rem,5.5vw,5rem)] font-black uppercase leading-[0.86] tracking-[-0.09em]" aria-label="From spark to shipped."><span className="block overflow-hidden">{splitLetters("From spark")}</span><span className="block overflow-hidden">{splitLetters("to shipped.")}</span></h2><p data-reveal className="mt-6 max-w-sm text-sm leading-relaxed text-black/60">A workflow tuned for artists who want control. Every step keeps you steering the outcome, never the other way around.</p><div data-reveal className="relative mt-10 hidden aspect-[4/5] overflow-hidden bg-black md:block"><img src="/images/process-one.jpg" alt="Chrome liquid AI art" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" /></div></div>
          <div className="relative lg:col-span-8"><div data-tl-line className="absolute left-4 top-2 h-[calc(100%-1rem)] w-px origin-top bg-black/20" /><div className="space-y-16 pl-14">{steps.map((s) => (<div key={s.num} data-tl-item className="relative"><span className="absolute -left-14 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-[#dfff00] text-[10px] font-black">{s.num}</span><h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-black uppercase leading-none tracking-[-0.05em]">{s.title}</h3><p className="mt-3 max-w-md text-sm leading-relaxed text-black/60">{s.body}</p></div>))}</div></div>
        </section>
        <section id="artists" data-feature className="relative overflow-hidden bg-[#0d0d0d] text-white">
          <div className="pointer-events-none absolute inset-0 dark-grid opacity-[0.07]" />
          <div className="aurora" style={{ top: "-8rem", right: "-6rem", width: "34rem", height: "34rem", background: "#ff6f5d" }} />
          <div className="aurora" style={{ bottom: "-10rem", left: "-4rem", width: "30rem", height: "30rem", background: "#dfff00", animationDelay: "-6s" }} />
          <div className="relative z-[2] mx-auto grid max-w-[1440px] gap-0 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-36">
            <div className="relative overflow-hidden lg:col-span-6"><img data-feature-img src="/images/hero-side.jpg" alt="Chrome liquid AI portrait" className="aspect-[4/5] w-full object-cover" /><div className="absolute bottom-6 left-6 max-w-[200px] bg-[#dfff00] p-4 text-black"><p className="text-[9px] font-black uppercase tracking-[0.2em]">Style memory active</p><p className="mt-1 text-xs font-semibold leading-snug text-black/70">PixelAI has learned 48 of your visual preferences</p><div className="mt-3 flex gap-1">{Array.from({ length: 8 }).map((_, i) => (<div key={i} className="h-1 flex-1 rounded-full bg-black" style={{ opacity: 0.25 + (i / 8) * 0.75 }} />))}</div></div></div>
            <div className="mt-10 flex flex-col justify-between lg:col-span-6 lg:mt-0">
              <div><p data-reveal className="section-index text-[#dfff00]/70">04 / For artists</p><h2 data-reveal-title className="font-display mt-6 overflow-hidden text-[clamp(2.6rem,5.5vw,5.5rem)] font-black uppercase leading-[0.86] tracking-[-0.09em]" aria-label="Your taste, amplified."><span className="block overflow-hidden">{splitLetters("Your taste,")}</span><span className="block overflow-hidden text-[#dfff00]">{splitLetters("amplified.")}</span></h2><p data-reveal className="mt-7 max-w-md leading-relaxed text-white/60">PixelAI learns the visual choices you keep making, then offers riffs on top of them. It stays a co-pilot, never the pilot.</p></div>
              <div data-reveal className="mt-10 grid gap-6 sm:grid-cols-2">{[{label:"Style memory",body:"Every prompt improves the next one automatically."},{label:"Rights, kept",body:"Own every frame you make. Downloads always clean."},{label:"Motion ready",body:"Export cinemagraphs and 6-sec loops in one click."},{label:"No install",body:"Runs entirely in your browser. Zero friction."}].map((f) => (<div key={f.label} className="border-t border-white/15 pt-4"><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">{f.label}</p><p className="mt-2 text-sm text-white/75">{f.body}</p></div>))}</div>
              <div data-reveal className="mt-10"><button onClick={openStudio} className="button-acid" type="button" data-cursor="Enter"><SparkMark className="h-4 w-4" />Enter PixelAI<ArrowUpRight className="h-4 w-4" /></button></div>
            </div>
          </div>
        </section>
        <section className="border-y border-black/10 bg-white px-5 py-14 sm:px-8 lg:px-12" data-reveal>
          <div className="relative z-[2] mx-auto max-w-[1440px]"><p className="section-index text-black/40">What artists say</p><div className="mt-8 grid gap-8 sm:grid-cols-3">{[{quote:"AI art is where imagination meets innovation, transforming pixels into pieces of wonder.",author:"María R. · Generative artist"},{quote:"PixelAI feels like working with a creative partner who never sleeps and always surprises.",author:"Kade T. · Digital sculptor"},{quote:"The style memory is uncanny. After three sessions it already sounds like me.",author:"Priya N. · Visual director"}].map((t) => (<blockquote key={t.author} className="flex flex-col justify-between gap-6 border-t-2 border-black pt-5"><p className="text-[15px] italic leading-relaxed text-black/75">"{t.quote}"</p><footer className="text-[10px] font-bold uppercase tracking-[0.15em] text-black/40">{t.author}</footer></blockquote>))}</div></div>
        </section>
        <section data-cta className="relative overflow-hidden bg-[#ffb75e] px-5 py-28 sm:px-8 sm:py-40 lg:px-12">
          <div data-cta-orb className="absolute -right-36 top-1/2 h-[560px] w-[560px] -translate-y-1/2 rounded-full bg-[#dfff00]" style={{ filter: "blur(1px)" }} /><div className="absolute left-8 top-8 hidden h-32 w-32 items-center justify-center rounded-full border-2 border-black/20 text-[9px] font-black uppercase tracking-[0.14em] text-black/50 lg:flex" style={{ writingMode: "vertical-rl" }}>PixelAI Studio ✦ Open now</div>
          <div className="relative z-[2] mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12"><div className="lg:col-span-3"><p data-reveal className="section-index">05 / Made to move</p></div><div className="lg:col-span-9"><h2 data-reveal-title className="font-display overflow-hidden text-[clamp(3.2rem,8vw,9.5rem)] font-black uppercase leading-[0.8] tracking-[-0.1em]" aria-label="Your next impossible image."><span className="block overflow-hidden">{splitLetters("Your next")}</span><span className="block overflow-hidden">{splitLetters("impossible")}</span><span className="block overflow-hidden text-black/25">{splitLetters("image.")}</span></h2><div data-reveal className="mt-12 flex flex-wrap items-center gap-6"><button onClick={openStudio} className="button-dark gap-2 px-7 py-4 text-[11px]" type="button" data-cursor="Enter" data-magnet>Enter PixelAI<ArrowUpRight className="h-4 w-4" /></button><p className="max-w-[240px] text-sm leading-relaxed text-black/60">Free to try. Nothing to install. Take it anywhere your work lives.</p></div></div></div>
        </section>
        <footer className="bg-[#0d0d0d] px-5 py-12 text-white sm:px-8 lg:px-12">
          <div className="relative z-[2] mx-auto flex max-w-[1440px] flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
            <div><div className="flex items-center gap-2 font-black tracking-[-0.06em]"><SparkMark className="h-5 w-5 text-[#dfff00]" /><span className="text-[21px]">PixelAI</span></div><p className="mt-3 max-w-[220px] text-[10px] font-semibold uppercase leading-relaxed tracking-[0.13em] text-white/40">Image thinking for a new age.<br />Built by a small studio in Lisbon.</p></div>
            <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-[10px] font-bold uppercase tracking-[0.13em] text-white/55 sm:flex sm:items-start sm:gap-8">{[["#top","Back to top"],["#gallery","Gallery"],["#process","Process"],["#artists","Artists"],["mailto:hello@pixel.ai","Contact"]].map(([href, label]) => (<a key={label} href={href} className="hover:text-[#dfff00] transition-colors" data-cursor={label[0]}>{label}</a>))}</div>
          </div>
          <div className="relative z-[2] mx-auto mt-10 flex max-w-[1440px] items-center justify-between border-t border-white/10 pt-6"><p className="text-[10px] uppercase tracking-[0.18em] text-white/30">© {new Date().getFullYear()} PixelAI Studio · Speculative demo</p><div className="flex gap-3">{["#dfff00","#ff6f5d","#ffb75e"].map((c) => (<span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />))}</div></div>
        </footer>
      </main>
      {studioOpen && (
        <div className="overlay-fade fixed inset-0 z-[200] flex items-end bg-black/70 p-3 backdrop-blur-md sm:items-center sm:justify-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="studio-title" onClick={(e) => { if (e.target === e.currentTarget) closeStudio(); }}>
          <div className="studio-enter relative w-full max-w-[600px] overflow-hidden rounded-[4px] bg-[#f4f2ea] p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.7)] sm:p-10"><div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[#dfff00] via-[#ff6f5d] to-[#ffb75e]" /><div className="flex items-start justify-between gap-6"><div><p className="section-index">PixelAI canvas</p><h2 id="studio-title" className="font-display mt-4 text-5xl font-black uppercase leading-[0.82] tracking-[-0.09em] sm:text-6xl">Give it a<br />spark.</h2></div><button onClick={closeStudio} type="button" className="mt-1 grid h-9 w-9 shrink-0 place-items-center border border-black transition-colors hover:bg-black hover:text-white" aria-label="Close"><CloseIcon /></button></div>
            {submitted ? (
              <div className="mt-10 border-t border-black pt-6"><div className="flex items-center gap-3"><SparkMark className="h-7 w-7 text-[#dfff00] [&>path]:fill-[#111]" /><p className="font-display text-2xl font-black uppercase tracking-[-0.05em]">In the queue.</p></div><p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">We'd turn this thought into an evolving visual direction. This is a demo canvas — the prompt is all yours.</p><button onClick={() => { setPrompt(""); setSubmitted(false); }} type="button" className="button-acid mt-8">Write another</button></div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-10"><label className="text-[10px] font-black uppercase tracking-[0.16em]" htmlFor="prompt">Describe your next image</label><textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="A dancer made of liquid chrome, caught in a red sun..." className="mt-3 min-h-36 w-full resize-none border-2 border-black bg-transparent p-4 text-base leading-relaxed outline-none placeholder:text-black/30 focus:bg-white" /><div className="mt-5 flex items-center justify-between gap-4"><p className="text-[10px] uppercase tracking-[0.12em] text-black/40">Demo creative flow</p><button type="submit" disabled={!prompt.trim()} className="button-dark shrink-0 gap-2 px-5 py-3 text-[10px] disabled:cursor-not-allowed disabled:opacity-30">Generate direction<ArrowUpRight className="h-3.5 w-3.5" /></button></div></form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
