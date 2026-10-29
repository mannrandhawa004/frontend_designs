import Nav from "./components/Nav";
import Hero from "./components/Hero";
import CanvasShowcase from "./components/CanvasShowcase";
import Process from "./components/Process";
import Personas from "./components/Personas";
import Pricing from "./components/Pricing";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import { useReveal } from "./hooks/useReveal";
import { useScrollFx } from "./hooks/useScrollFx";

const MODELS = [
  "GPT Image 2",
  "Nano Banana",
  "Seedream 4",
  "Ideogram 3",
  "Flux 2",
  "Veo 3",
  "Kling 2.5",
  "Runway Gen-4",
  "ElevenLabs v3",
  "Recraft",
  "Luma Ray",
  "Qwen Image",
];

const STATS = [
  { n: 64, suffix: "", label: "Models wired in" },
  { n: 41200, suffix: "+", label: "Creatives on the canvas" },
  { n: 12, suffix: "M", label: "Assets rendered" },
  { n: 98, suffix: "%", label: "Say it beat their old stack" },
];

function ModelsBand() {
  return (
    <section className="relative border-y border-white/[0.07] bg-[#0c0b0a] py-12">
      <div className="mx-auto max-w-[1180px] px-5">
        <div className="reveal flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="font-display text-[26px] leading-none text-[#efece8] sm:text-[32px]">
            Every model, one canvas
          </h2>
          <p className="max-w-sm text-[12.5px] leading-relaxed text-white/45">
            Swap engines mid-graph without rebuilding the shot. New releases are wired in within days.
          </p>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="reveal">
              <dt className="flex items-baseline gap-0.5">
                <span
                  data-count={s.n}
                  className="font-display text-[38px] leading-none text-[#efece8] tabular-nums sm:text-[46px]"
                >
                  0
                </span>
                <span className="font-display text-[24px] leading-none text-brand sm:text-[28px]">
                  {s.suffix}
                </span>
              </dt>
              <dd className="mt-2 text-[11px] uppercase tracking-[0.16em] text-white/40">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div data-fx="models-row">
          <div className="animate-marquee flex w-max gap-3">
            {[...MODELS, ...MODELS].map((m, i) => (
              <span
                key={`${m}-${i}`}
                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[12px] text-white/60"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatementBand() {
  const line = "Taste is the moat — judgement stays human — craft, at scale —";
  return (
    <section className="relative overflow-hidden bg-[#0c0b0a] py-14 sm:py-20">
      <div className="flex w-max whitespace-nowrap" data-fx="statement">
        <span className="pr-[6vw] font-display text-[10.5vw] leading-[0.95] text-white/[0.10]">
          {line}
        </span>
        <span
          aria-hidden="true"
          className="pr-[6vw] font-display text-[10.5vw] leading-[0.95] text-white/[0.10]"
        >
          {line}
        </span>
      </div>

      <div className="relative mx-auto mt-10 max-w-[1180px] px-5">
        <div className="grid gap-8 border-t border-white/10 pt-8 sm:grid-cols-[1fr_1.2fr]">
          <div className="reveal">
            <div className="text-[10px] uppercase tracking-[0.24em] text-brand">Why teams switch</div>
          </div>
          <p className="reveal text-[15px] leading-[1.8] text-white/60 sm:text-[18px]">
            Melius isn&apos;t a chat box with an image model bolted on. It&apos;s a canvas where every
            reference, prompt and model stays wired to the ones around it — so the tenth version is as
            fast as the first, and nobody has to reconstruct the decision that got you there.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  useReveal();
  useScrollFx();

  return (
    <div className="min-h-screen bg-ink">
      <div
        data-fx="progress"
        className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-[linear-gradient(90deg,#ff4f17,#ffb020,#ff4f17)]"
        style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
      />
      <Nav />
      <main>
        <Hero />
        <CanvasShowcase />
        <ModelsBand />
        <StatementBand />
        <Process />
        <Personas />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
