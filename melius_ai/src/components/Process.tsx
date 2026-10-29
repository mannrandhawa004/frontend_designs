import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { img, photo } from "../lib/assets";

const PANELS = [
  {
    n: "01",
    kicker: "Brief it",
    title: "Give the canvas the whole brief",
    body: "Drop the deck, the moodboard and the brand rules in one go. Melius builds a graph that already knows your type, your palette, your tone — and keeps every reference addressable later.",
    points: ["PDF, Figma and deck import", "Brand rules stored as nodes", "Reusable project templates"],
    src: photo.denim,
    caption: "Reference board · Spring campaign",
    tint: "linear-gradient(150deg,#1b1a18 0%,#2c2622 100%)",
  },
  {
    n: "02",
    kicker: "Branch it",
    title: "Fan one idea into twelve routes",
    body: "Every branch is a live chain of nodes. Re-weight a prompt, swap the model, push the grade — and the whole branch regenerates while the versions you liked stay exactly where you left them.",
    points: ["Infinite parallel branches", "Non-destructive versioning", "Compare routes side by side"],
    src: photo.abstract,
    caption: "Route exploration · 12 branches",
    tint: "linear-gradient(150deg,#2a1420 0%,#40202c 100%)",
  },
  {
    n: "03",
    kicker: "Direct it",
    title: "Art-direct the passes, not the pixels",
    body: "Agents take the work you would normally do by hand: crops, ratios, colourways, cutdowns, localisations. You stay on the taste decisions — the part that actually needs you.",
    points: ["Agent skills you write once", "Slack and MCP access", "Batch runs across the graph"],
    src: photo.canSplash,
    caption: "Agent run · 48 variants in 6 min",
    tint: "linear-gradient(150deg,#221705 0%,#3a2a12 100%)",
  },
  {
    n: "04",
    kicker: "Ship it",
    title: "Export the campaign, not the folder",
    body: "Every ratio, every codec, every name convention your producer asked for — with the version history attached so nobody has to reconstruct the decision that got you there.",
    points: ["Preset export recipes", "Delivery manifests", "Full audit trail per asset"],
    src: img.canRender,
    caption: "Delivery pack · 214 files",
    tint: "linear-gradient(150deg,#101c2e 0%,#1d2f4c 100%)",
  },
];

export default function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const distance = () =>
      Math.max(0, tr.scrollWidth - document.documentElement.clientWidth);

    const tween = gsap.to(tr, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: sec,
        start: "top top",
        end: () => `+=${distance() + window.innerHeight * 0.4}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      const st = (tween as unknown as { scrollTrigger?: { kill: (b?: boolean) => void } })
        .scrollTrigger;
      st?.kill();
      tween.kill();
      gsap.set(tr, { clearProps: "transform" });
    };
  }, []);

  return (
    <section
      ref={section}
      className="relative h-screen overflow-hidden bg-[#0e0d0c] text-white"
    >
      {/* heading rail */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-6 pt-8 sm:px-10">
        <div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-brand">How it works</div>
          <div className="mt-1.5 text-[11px] text-white/35">Keep scrolling — the graph moves with you</div>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-px w-24 bg-white/15" />
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/35">01 — 04</span>
        </div>
      </div>

      <div ref={track} className="flex h-full w-max items-stretch">
        {PANELS.map((p) => (
          <article
            key={p.n}
            className="flex h-full w-[100vw] shrink-0 items-center px-6 pb-10 pt-24 sm:px-10 lg:px-16"
          >
            <div className="mx-auto grid w-full max-w-[1180px] items-center gap-6 sm:gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-[13px] text-brand">{p.n}</span>
                  <span className="h-px w-14 bg-white/20" />
                  <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">
                    {p.kicker}
                  </span>
                </div>

                <h2 className="mt-4 font-display text-[28px] leading-[1.05] tracking-[-0.02em] sm:mt-5 sm:text-[52px] lg:text-[58px]">
                  {p.title}
                </h2>

                <p className="mt-4 max-w-[48ch] text-[12.5px] leading-[1.7] text-white/55 sm:mt-5 sm:text-[15.5px] sm:leading-[1.85]">
                  {p.body}
                </p>

                <ul className="mt-7 hidden space-y-2.5 sm:block">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3">
                      <span className="h-1 w-1 shrink-0 rounded-full bg-brand" />
                      <span className="text-[12px] text-white/70">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <figure
                className="relative aspect-[3/2] max-h-[30vh] w-full overflow-hidden rounded-[18px] sm:aspect-[4/3] sm:max-h-[52vh] lg:aspect-[4/5] lg:max-h-[74vh]"
                style={{ background: p.tint }}
              >
                <img src={p.src} alt={p.caption} loading="lazy" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
                  <span className="text-[10.5px] uppercase tracking-[0.16em] text-white/80">
                    {p.caption}
                  </span>
                  <span className="rounded-full border border-white/25 px-2 py-[3px] text-[9px] uppercase tracking-[0.16em] text-white/70">
                    Live
                  </span>
                </figcaption>
              </figure>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
