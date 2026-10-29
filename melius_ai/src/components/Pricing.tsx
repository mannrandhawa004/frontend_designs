import { useEffect, useRef, useState } from "react";

type Plan = {
  key: string;
  name: string;
  tagline: string;
  monthly: number;
  annual: number;
  teamMonthly: number;
  teamAnnual: number;
  credits: string;
  approx: string;
  featuresLabel: string;
  features: string[];
  theme: "light" | "dark" | "pro";
  cta: string;
  slider?: boolean;
};

const PLANS: Plan[] = [
  {
    key: "creator",
    name: "Creator",
    tagline: "Explore possibilities on Melius",
    monthly: 20,
    annual: 17,
    teamMonthly: 28,
    teamAnnual: 24,
    credits: "20,000 credits/mo",
    approx: "≈ 300 images or 14 videos",
    featuresLabel: "Features",
    features: ["Access to all models", "Unlimited agent usage", "Import custom voices"],
    theme: "light",
    cta: "Start with Creator",
  },
  {
    key: "growth",
    name: "Growth",
    tagline: "Start creating on your own",
    monthly: 50,
    annual: 43,
    teamMonthly: 69,
    teamAnnual: 59,
    credits: "50,000 credits/mo",
    approx: "≈ 745 images or 35 videos",
    featuresLabel: "Features",
    features: ["Everything in Creator", "Up to 3 agent skills"],
    theme: "dark",
    cta: "Start with Growth",
  },
  {
    key: "pro",
    name: "Professional",
    tagline: "Go pro on your own terms",
    monthly: 115,
    annual: 98,
    teamMonthly: 152,
    teamAnnual: 129,
    credits: "110,000 credits/mo",
    approx: "≈ 1,650 images or 77 videos",
    featuresLabel: "Features",
    features: [
      "Everything in Growth",
      "Up to 10 agent skills",
      "Slack agent access",
      "Search with AI",
      "AI prompt enhancement",
      "Better fonts",
      "And more...",
    ],
    theme: "pro",
    cta: "Start with Professional",
    slider: true,
  },
];

function useTween(value: number, ms = 450) {
  const [v, setV] = useState(value);
  const from = useRef(value);
  const raf = useRef(0);
  useEffect(() => {
    const start = performance.now();
    const a = from.current;
    const b = value;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const e = 1 - Math.pow(1 - t, 3);
      setV(a + (b - a) * e);
      if (t < 1) raf.current = requestAnimationFrame(tick);
      else from.current = b;
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [value, ms]);
  return v;
}

function Price({ value, dark }: { value: number; dark: boolean }) {
  const v = useTween(value);
  return (
    <span className={`font-display text-[46px] leading-none ${dark ? "text-white" : "text-ink"}`}>
      ${Math.round(v)}
    </span>
  );
}

function Check({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={`mt-[3px] h-3 w-3 shrink-0 ${dark ? "text-white/60" : "text-ink/45"}`} fill="none">
      <path d="M2 6.3l2.6 2.6L10 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Spark({ dark }: { dark: boolean }) {
  return (
    <svg viewBox="0 0 20 20" className={`h-4 w-4 ${dark ? "text-white/70" : "text-ink/55"}`} fill="none">
      <path
        d="M10 2.5l1.8 4.9 4.9 1.8-4.9 1.8L10 15.9 8.2 11 3.3 9.2l4.9-1.8L10 2.5z"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Pricing() {
  const [team, setTeam] = useState(false);
  const [annual, setAnnual] = useState(true);
  const [credits, setCredits] = useState(110);

  return (
    <section id="pricing" className="relative overflow-hidden bg-[#17120f] py-20 sm:py-28">
      <div
        data-fx="glow"
        className="pointer-events-none absolute inset-x-0 top-0 h-80 opacity-60"
        style={{ background: "radial-gradient(60% 100% at 50% 0%, rgba(255,110,40,0.18), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[1120px] px-5">
        <h2
          data-fx="pricing-title"
          className="text-center font-display text-[38px] leading-none text-[#f3efe9] sm:text-[52px]"
        >
          Our Pricing
        </h2>

        {/* controls */}
        <div className="reveal mt-10 flex flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1">
            {[
              { l: "Individual", v: false },
              { l: "Team", v: true },
            ].map((o) => (
              <button
                key={o.l}
                onClick={() => setTeam(o.v)}
                className={`rounded-full px-5 py-[7px] text-[12px] font-medium transition-all ${
                  team === o.v ? "bg-[#f3efe9] text-ink" : "text-white/55 hover:text-white"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-[12px]">
            <span className={annual ? "text-white/45" : "text-white"}>Monthly</span>
            <button
              onClick={() => setAnnual((a) => !a)}
              className={`relative h-[22px] w-[42px] rounded-full transition-colors ${annual ? "bg-brand" : "bg-white/15"}`}
              aria-label="Toggle annual billing"
            >
              <span
                className={`absolute top-[3px] h-4 w-4 rounded-full bg-white transition-all ${
                  annual ? "left-[23px]" : "left-[3px]"
                }`}
              />
            </button>
            <span className={annual ? "text-white" : "text-white/45"}>Annual</span>
          </div>
        </div>

        {/* cards */}
        <div data-fx="pricing-grid" className="mt-10 grid items-start gap-4 md:grid-cols-3">
          {PLANS.map((p, idx) => {
            const dark = p.theme === "dark";
            const base = team ? (annual ? p.teamAnnual : p.teamMonthly) : annual ? p.annual : p.monthly;
            const was = team ? p.teamMonthly : p.monthly;
            const extra = p.slider ? Math.round(((credits - 110) / 190) * 150) : 0;
            const price = base + extra;

            return (
              <div
                key={p.key}
                data-fx="pricing-card"
                className={`relative flex flex-col rounded-[14px] p-5 transition-[translate,box-shadow] duration-500 hover:-translate-y-1 ${
                  dark
                    ? "bg-[#2a2522] text-white"
                    : "bg-[#f3efe9] text-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.8)]"
                } ${idx === 0 ? "ring-2 ring-brand/70" : ""} ${idx === 1 ? "md:mt-6" : ""}`}
                style={{ transitionDelay: `${idx * 70}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className={`font-display text-[22px] leading-none ${dark ? "text-white" : "text-ink"}`}>
                      {p.name}
                    </h3>
                    <p className={`mt-1.5 text-[11.5px] ${dark ? "text-white/55" : "text-ink/55"}`}>{p.tagline}</p>
                  </div>
                  {idx === 0 && (
                    <span className="rounded-full bg-brand px-2 py-[3px] text-[9px] font-semibold uppercase tracking-wide text-white">
                      Popular
                    </span>
                  )}
                </div>

                <div className="mt-6 flex items-end gap-2">
                  <Price value={price} dark={dark} />
                  {annual && !p.slider && (
                    <span className={`pb-1 text-[16px] line-through ${dark ? "text-white/35" : "text-ink/30"}`}>
                      ${was}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-center gap-2">
                  <span className={`text-[10.5px] ${dark ? "text-white/45" : "text-ink/45"}`}>
                    Per month{team ? " · per seat" : ""}
                  </span>
                  {annual && (
                    <span
                      className={`rounded-full px-2 py-[2px] text-[9.5px] font-medium ${
                        dark ? "bg-white/10 text-white/70" : "bg-ink/[0.07] text-ink/60"
                      }`}
                    >
                      Save 15%
                    </span>
                  )}
                </div>

                <div
                  className={`mt-5 flex items-center gap-3 rounded-[10px] px-3 py-2.5 ${
                    dark ? "bg-white/[0.06]" : "bg-ink/[0.05]"
                  }`}
                >
                  <Spark dark={dark} />
                  <div>
                    <div className={`text-[11.5px] font-medium ${dark ? "text-white/90" : "text-ink/85"}`}>
                      {p.slider
                        ? `${credits === 110 ? "110,000" : `${credits},000`} credits/mo`
                        : p.credits}
                    </div>
                    <div className={`text-[10px] ${dark ? "text-white/45" : "text-ink/45"}`}>{p.approx}</div>
                  </div>
                </div>

                {p.slider && (
                  <div className="mt-4">
                    <div className="text-[10.5px] text-ink/55">Choose your monthly credits</div>
                    <input
                      type="range"
                      min={110}
                      max={300}
                      step={10}
                      value={credits}
                      onChange={(e) => setCredits(Number(e.target.value))}
                      className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-ink/15 accent-[#ff4f17]"
                      style={{
                        background: `linear-gradient(to right, #ff4f17 ${((credits - 110) / 190) * 100}%, rgba(12,11,10,0.14) ${
                          ((credits - 110) / 190) * 100
                        }%)`,
                      }}
                    />
                    <div className="mt-1.5 flex justify-between text-[9.5px] text-ink/45">
                      <span>110K</span>
                      <span>300K</span>
                    </div>
                  </div>
                )}

                <div className={`mt-5 text-[10px] uppercase tracking-[0.2em] ${dark ? "text-white/35" : "text-ink/35"}`}>
                  {p.featuresLabel}
                </div>
                <ul className="mt-2.5 flex-1 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <Check dark={dark} />
                      <span className={`text-[11.5px] leading-snug ${dark ? "text-white/75" : "text-ink/70"}`}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-6 w-full rounded-[8px] py-2.5 text-[12.5px] font-medium transition-all hover:brightness-110 ${
                    p.theme === "pro"
                      ? "bg-[linear-gradient(90deg,#5b2bd9,#ff4f17,#ffb020)] text-white"
                      : dark
                        ? "bg-brand text-white"
                        : "bg-brand text-white"
                  }`}
                >
                  {p.cta}
                </button>
              </div>
            );
          })}
        </div>

        <p className="reveal mt-8 text-center text-[12px] text-white/40">
          Need volume, SSO and a dedicated model pool?{" "}
          <a href="#top" className="text-white/80 underline underline-offset-4 hover:text-brand">
            Talk to our enterprise team
          </a>
        </p>
      </div>
    </section>
  );
}
