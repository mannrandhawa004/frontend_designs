import { useState } from "react";
import { img, photo } from "../lib/assets";

type Persona = {
  key: string;
  tab: string;
  title: string;
  body: string;
  hero: string;
  strips: string[];
  cards: { label: string; src: string }[];
};

const PERSONAS: Persona[] = [
  {
    key: "agencies",
    tab: "Agencies",
    title: "Agencies",
    body: "Concept work that wins the pitch. Variant work that runs the campaign. The same canvas does both — treatments and concept art at the brief's pace, and variants and campaign creative at the campaign's volume.",
    hero: photo.golfer,
    strips: ["#e8542f", "#f0c24a", "#2f6bff", "#1b1a18"],
    cards: [
      { label: "Concept Boards", src: photo.caddie },
      { label: "Treatment Decks", src: photo.golferRed },
      { label: "Campaign Variants", src: photo.golfers },
      { label: "Spec Ads", src: photo.canSplash },
    ],
  },
  {
    key: "cgi",
    tab: "CGI / Filmmakers",
    title: "CGI & Filmmakers",
    body: "Previz a sequence before the truck is booked. Build look dev, set extensions and shot lists in one graph, then hand the whole tree to the team with every version still attached.",
    hero: photo.camera,
    strips: ["#2f6bff", "#9b5cff", "#1b1a18", "#e8542f"],
    cards: [
      { label: "Previz Frames", src: photo.pastel },
      { label: "Look Dev", src: photo.abstract },
      { label: "Set Extension", src: photo.vase },
      { label: "Shot Lists", src: photo.jump },
    ],
  },
  {
    key: "marketers",
    tab: "Marketers",
    title: "Marketers",
    body: "Thirty placements, one source of truth. Lock the grade and the lockup once, then let agents fan the campaign out across every channel, ratio and locale you ship to.",
    hero: photo.primer,
    strips: ["#f0c24a", "#e8542f", "#2ec27e", "#1b1a18"],
    cards: [
      { label: "Ad Variants", src: photo.bottle },
      { label: "Landing Heroes", src: photo.vase },
      { label: "Lifecycle Art", src: photo.cans },
      { label: "Social Cutdowns", src: photo.canSplash },
    ],
  },
  {
    key: "ecom",
    tab: "E-commerce",
    title: "E-commerce",
    body: "Shoot once, merchandise everything. Swap models, colourways and backdrops without re-shooting, and keep every PDP image consistent down to the shadow.",
    hero: img.dress,
    strips: ["#1b1a18", "#c9c3b8", "#e8542f", "#2f6bff"],
    cards: [
      { label: "Pack Shots", src: img.canRender },
      { label: "Model Swaps", src: photo.jump },
      { label: "Colourways", src: img.fabric },
      { label: "Lifestyle Sets", src: photo.cans },
    ],
  },
  {
    key: "gtm",
    tab: "GTM / Growth",
    title: "GTM & Growth",
    body: "Launch day assets without the launch-day scramble. Films, deck visuals, press kits and event collateral generated from the same brand graph in an afternoon.",
    hero: photo.denim,
    strips: ["#2ec27e", "#2f6bff", "#e8542f", "#1b1a18"],
    cards: [
      { label: "Launch Films", src: photo.abstract },
      { label: "Deck Visuals", src: photo.pastel },
      { label: "Event Collateral", src: photo.golfers },
      { label: "Press Kits", src: photo.camera },
    ],
  },
];

const POS = [
  "left-[2%] top-[12%] w-[150px] -rotate-6",
  "left-[6%] bottom-[16%] w-[168px] rotate-3",
  "right-[4%] top-[8%] w-[172px] rotate-4",
  "right-[2%] bottom-[12%] w-[146px] -rotate-5",
];

function Polaroid({
  label,
  src,
  className = "",
  delay = 0,
  tilt = 0,
}: {
  label: string;
  src: string;
  className?: string;
  delay?: number;
  tilt?: number;
}) {
  return (
    <figure
      className={`animate-float rounded-[6px] bg-white p-[7px] shadow-[0_22px_45px_-22px_rgba(0,0,0,0.45)] ${className}`}
      style={{ ["--tilt" as string]: `${tilt}deg`, animationDelay: `${delay}s` }}
    >
      <div className="relative overflow-hidden rounded-[3px]">
        <img src={src} alt={label} loading="lazy" className="aspect-[4/5] w-full object-cover" />
        <figcaption className="absolute left-1.5 top-1.5 rounded-[3px] bg-white/95 px-1.5 py-[2px] text-[8.5px] font-medium tracking-tight text-ink shadow-sm">
          {label}
        </figcaption>
      </div>
    </figure>
  );
}

export default function Personas() {
  const [i, setI] = useState(0);
  const p = PERSONAS[i];

  return (
    <section id="personas" className="relative overflow-hidden bg-bone py-20 text-ink sm:py-28">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="relative min-h-[560px] lg:min-h-[640px]">
          {/* floating cards — desktop */}
          <div className="pointer-events-none absolute inset-0 hidden lg:block">
            {p.cards.map((c, idx) => (
              <div
                key={c.label}
                data-fx="persona-card"
                data-speed={idx === 0 || idx === 3 ? "1.25" : "0.75"}
                className={`absolute ${POS[idx]}`}
              >
                <Polaroid label={c.label} src={c.src} delay={idx * 0.8} tilt={[-6, 3, 4, -5][idx]} />
              </div>
            ))}
          </div>

          {/* centre stack */}
          <div className="relative z-10 mx-auto w-full max-w-[330px] pt-10">
            <div data-fx="persona-stack" className="relative">
              {p.strips.map((c, s) => (
                <div
                  key={c + s}
                  className="absolute left-0 right-0 flex justify-center"
                  style={{ top: `${-(p.strips.length - s) * 9}px`, zIndex: s }}
                >
                  <div
                    data-fx="persona-strip"
                    className="h-10 rounded-[6px] shadow-sm"
                    style={{ background: c, width: `${100 - (p.strips.length - s) * 5}%` }}
                  />
                </div>
              ))}

              <div className="relative z-10 overflow-hidden rounded-[8px] bg-white shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]">
              <div data-fx="persona-hero" className="relative overflow-hidden">
                <img
                  key={p.hero}
                  src={p.hero}
                  alt={p.title}
                  className="aspect-[3/4] w-full animate-fade object-cover"
                />
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[8px] uppercase tracking-[0.3em] text-white/70">
                    Melius
                  </span>
                </div>
                <div className="px-5 pb-6 pt-4">
                  <h3 className="font-display text-[26px] leading-none">{p.title}</h3>
                  <p className="mt-3 text-[11.5px] leading-[1.65] text-ink/60">{p.body}</p>
                </div>
              </div>
            </div>

            {/* tabs */}
            <div className="no-scrollbar mt-6 flex items-center gap-1.5 overflow-x-auto pb-1">
              {PERSONAS.map((x, idx) => (
                <button
                  key={x.key}
                  onClick={() => setI(idx)}
                  className={`shrink-0 rounded-full px-3 py-[6px] text-[10.5px] font-medium transition-all ${
                    idx === i
                      ? "bg-brand text-white shadow-[0_6px_16px_-6px_rgba(255,79,23,0.8)]"
                      : "bg-black/[0.06] text-ink/55 hover:bg-black/10"
                  }`}
                >
                  {x.tab}
                </button>
              ))}
            </div>
          </div>

          {/* floating cards — mobile grid */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:hidden">
            {p.cards.map((c) => (
              <Polaroid key={`m-${p.key}-${c.label}`} label={c.label} src={c.src} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
