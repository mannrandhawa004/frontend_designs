import { useEffect, useRef, useState } from "react";
import { img, photo } from "../lib/assets";
import { LogoMark } from "./Logo";

type Step = {
  id: string;
  title: string;
  blurb: string;
  aLabel: string;
  bLabel: string;
  aSrc?: string;
  bSrc?: string;
  kind?: "mark";
  chip: string;
  big?: string;
  bigKind?: "mark";
  bigBg: string;
  flip?: boolean;
};

const STEPS: Step[] = [
  {
    id: "pack",
    title: "Pack shot",
    blurb: "One mockup in, forty finished frames out — all on brand.",
    aLabel: "Product Mockup",
    bLabel: "GPT Image 2",
    aSrc: img.canHero,
    bSrc: img.canRender,
    chip: "Image",
    big: img.canHero,
    bigBg: "linear-gradient(110deg,#ff6a00 0%,#ff3d00 38%,#6b3dff 72%,#0d5cff 100%)",
  },
  {
    id: "still",
    title: "Set extension",
    blurb: "Hold the grade, swap the world. Nodes keep every version linked.",
    aLabel: "Pack Shot",
    bLabel: "Nano Banana",
    aSrc: img.canRender,
    bSrc: photo.vase,
    chip: "Image",
    big: photo.primer,
    bigBg: "linear-gradient(140deg,#ffd166 0%,#ff7a1f 60%,#b3300d 100%)",
    flip: true,
  },
  {
    id: "sketch",
    title: "Storyboard",
    blurb: "Sketch a beat, let an agent board the whole sequence.",
    aLabel: "Still Sketch",
    bLabel: "Seedream 4",
    aSrc: img.sketch,
    bSrc: photo.caddie,
    chip: "Image",
    big: img.sketch,
    bigBg: "linear-gradient(160deg,#f4f1ec 0%,#d9d3c9 100%)",
  },
  {
    id: "fabric",
    title: "Material study",
    blurb: "Drop in a swatch and dress the look before the sample ships.",
    aLabel: "Fabric Swatch",
    bLabel: "GPT Image",
    aSrc: img.dress,
    bSrc: img.fabric,
    chip: "Image",
    big: img.dress,
    bigBg: "linear-gradient(160deg,#ffffff 0%,#e7e3dc 100%)",
    flip: true,
  },
  {
    id: "icon",
    title: "Identity",
    blurb: "Lock a mark, then fan it out across every surface you own.",
    aLabel: "Icon 01",
    bLabel: "Ideogram 3",
    kind: "mark",
    chip: "Vector",
    bigKind: "mark",
    bigBg: "linear-gradient(160deg,#171614 0%,#2a2724 100%)",
  },
];

function MarkTile({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      className={`grid h-full w-full place-items-center ${
        tone === "light" ? "bg-[#f2f0ec] text-ink" : "bg-[#9b9893] text-[#4a4845]"
      }`}
    >
      <LogoMark className="h-[38%] w-auto" />
    </div>
  );
}

function Connector({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <path
        data-fx="connector"
        d={flip ? "M4 8 C 40 8, 55 32, 94 32" : "M4 32 C 40 32, 55 8, 94 8"}
        fill="none"
        stroke="#ff4f17"
        strokeWidth="0.9"
        strokeDasharray="4 3"
      />
      <circle cx="4" cy={flip ? 8 : 32} r="1.6" fill="#ff4f17" />
      <circle cx="94" cy={flip ? 32 : 8} r="1.6" fill="#ff4f17" />
    </svg>
  );
}

function Flow({ step, active }: { step: Step; active: boolean }) {
  const aNode = step.kind === "mark" ? <MarkTile /> : <img src={step.aSrc} alt="" className="h-full w-full object-cover" />;
  const bNode =
    step.kind === "mark" ? <MarkTile tone="dark" /> : <img src={step.bSrc} alt="" className="h-full w-full object-cover" />;

  return (
    <div
      className={`relative mx-auto aspect-[4/3] w-full max-w-[430px] transition-all duration-700 ${
        active ? "opacity-100 blur-0" : "opacity-45 blur-[1px]"
      }`}
    >
      {/* connector sits behind the nodes */}
      <div className="absolute left-[18%] right-[18%] top-[32%] h-[26%]">
        <Connector flip={step.flip} />
      </div>

      {/* node A */}
      <div
        data-fx="node"
        className={`absolute ${step.flip ? "left-[2%] top-[4%]" : "left-[2%] top-[14%]"} w-[36%]`}
      >
        <div className="mb-1.5 text-[8.5px] uppercase tracking-[0.16em] text-white/40">{step.aLabel}</div>
        <div className="aspect-square overflow-hidden rounded-[5px] border border-white/10 bg-white/[0.04]">
          {aNode}
        </div>
      </div>

      {/* node B */}
      <div
        data-fx="node"
        className={`absolute right-[2%] ${step.flip ? "top-[30%]" : "top-[34%]"} w-[42%]`}
      >
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="text-[8.5px] uppercase tracking-[0.16em] text-white/40">{step.bLabel}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mb-1.5 inline-flex items-center gap-1 rounded-[3px] bg-brand px-1.5 py-[2px] text-[8px] font-medium uppercase tracking-wide text-white">
          <span className="h-1 w-1 rounded-full bg-white/80" />
          {step.chip}
        </div>
        <div className="aspect-[4/3] overflow-hidden rounded-[5px] border border-white/10 bg-white/[0.04]">
          {bNode}
        </div>
      </div>

      {/* floating mini toolbar */}
      <div
        data-fx="node"
        className="absolute bottom-[2%] left-[6%] flex items-center gap-1.5 rounded-full border border-white/10 bg-[#141211]/90 px-2 py-1 backdrop-blur"
      >
        {["#ff4f17", "#ffffff40", "#ffffff40"].map((c, i) => (
          <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
        ))}
        <span className="pl-1 text-[8px] uppercase tracking-[0.18em] text-white/40">Run</span>
      </div>
    </div>
  );
}

export default function CanvasShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = Number((e.target as HTMLElement).dataset.i);
            setActive(i);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const cur = STEPS[active];

  return (
    <section id="canvas" className="relative bg-[#0a0908]">
      <div className="grid-dots absolute inset-0 opacity-70" />
      <div className="relative grid lg:grid-cols-2">
        {/* LEFT — sticky output */}
        <div className="relative hidden lg:block">
          <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
            <div className="absolute inset-0 transition-[background] duration-700" style={{ background: cur.bigBg }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/25" />

            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className="absolute inset-0 transition-all duration-700 ease-out"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "scale(1)" : "scale(1.04)",
                }}
              >
                {s.bigKind === "mark" ? (
                  <div className="grid h-full w-full place-items-center">
                    <LogoMark className="h-24 w-auto text-[#f2f0ec]" />
                  </div>
                ) : (
                    <img
                      data-fx="out-img"
                      src={s.big}
                      alt={s.title}
                      className="h-full w-full object-cover"
                    />
                )}
              </div>
            ))}

            {/* canvas chrome */}
            <div className="absolute left-7 top-7 flex items-center gap-2 rounded-xl border border-white/15 bg-black/55 px-3 py-2 backdrop-blur-md">
              <LogoMark className="h-3 w-auto text-white" />
              <span className="text-[11px] text-white/80">Melius / Melon &amp; Mint launch</span>
              <span className="ml-2 h-2 w-2 rounded-full bg-brand" />
            </div>

            <div className="absolute bottom-8 left-7 right-7 flex items-end justify-between gap-6">
              <div className="max-w-sm">
                <div className="text-[10px] uppercase tracking-[0.25em] text-white/60">
                  0{active + 1} / 0{STEPS.length}
                </div>
                <h3 className="mt-2 font-display text-3xl text-white">{cur.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-white/70">{cur.blurb}</p>
              </div>
              <div className="flex gap-1.5 pb-1">
                {STEPS.map((s, i) => (
                  <span
                    key={s.id}
                    className={`h-[3px] rounded-full transition-all duration-500 ${
                      i === active ? "w-7 bg-white" : "w-3 bg-white/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — scrolling node canvas */}
        <div className="relative border-white/[0.07] lg:border-l">
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              data-fx-step
              className="relative flex min-h-[72vh] items-center border-b border-white/[0.06] px-6 py-14 sm:px-10 lg:min-h-screen"
            >
              <div
                data-fx="step-progress"
                className="absolute left-0 top-0 h-[2px] w-full origin-left bg-brand"
              />
              <div className="w-full">
                {/* mobile output preview */}
                <div className="mb-8 overflow-hidden rounded-xl lg:hidden" style={{ background: s.bigBg }}>
                  {s.bigKind === "mark" ? (
                    <div className="grid aspect-[4/3] w-full place-items-center">
                      <LogoMark className="h-14 w-auto text-[#f2f0ec]" />
                    </div>
                  ) : (
                    <img src={s.big} alt={s.title} className="aspect-[4/3] w-full object-cover" />
                  )}
                </div>
                <Flow step={s} active={active === i} />
                <div className="mt-8 lg:hidden">
                  <h3 className="font-display text-2xl text-white">{s.title}</h3>
                  <p className="mt-1 text-[13px] text-white/60">{s.blurb}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
