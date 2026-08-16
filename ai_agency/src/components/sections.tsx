import { useMemo, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  awards,
  faqs,
  features,
  process,
  services,
  team,
  testimonials,
  works,
} from "../data";
import { ArrowBtn, BrandMark, LimeBadge, Socials } from "./ui";

function FeatureIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
  };
  if (name === "workflow")
    return (
      <svg {...common}>
        <rect x="3" y="4" width="7" height="7" rx="2" />
        <rect x="14" y="13" width="7" height="7" rx="2" />
        <path d="M10 7.5h3.5A2.5 2.5 0 0 1 16 10v3" />
      </svg>
    );
  if (name === "eval")
    return (
      <svg {...common}>
        <path d="M4 19V5" />
        <path d="M4 19h16" />
        <path d="M8 15l3-4 3 2 4-6" />
      </svg>
    );
  if (name === "rag")
    return (
      <svg {...common}>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    );
  if (name === "ux")
    return (
      <svg {...common}>
        <circle cx="12" cy="8" r="3.2" />
        <path d="M5 19c1.2-3 3.6-4.5 7-4.5S17.8 16 19 19" />
      </svg>
    );
  if (name === "secure")
    return (
      <svg {...common}>
        <path d="M12 3 5 6v6c0 4.2 2.8 7.4 7 8.7 4.2-1.3 7-4.5 7-8.7V6l-7-3Z" />
        <path d="M10 12l1.5 1.5L14.5 10" />
      </svg>
    );
  return (
    <svg {...common}>
      <circle cx="8" cy="8" r="2.4" />
      <circle cx="16" cy="16" r="2.4" />
      <path d="M10 9.2 14 14.8" />
    </svg>
  );
}

export function Partners({ light = false }: { light?: boolean }) {
  const logos = [
    { name: "LOGOIPSUM", mark: "hex" },
    { name: "LOGOIPUM", mark: "bolt" },
    { name: "Logoipsum", mark: "car" },
    { name: "logoipsum", mark: "wave" },
    { name: "NORTHWAY", mark: "hex" },
    { name: "VECTORPAY", mark: "bolt" },
    { name: "CANTOS", mark: "car" },
    { name: "RUNLOOP", mark: "wave" },
  ];
  const row = [...logos, ...logos];
  return (
    <section className={`anim-item py-14 ${light ? "" : ""}`}>
      <div className="container-site mb-7 flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
        <p className="eyebrow">Trusted partners</p>
        <p className="text-[16px] font-medium leading-snug tracking-[-0.02em] text-[#3f3f46]">
          Trusted by 100+ top-tier brands across SaaS, fintech, and retail
        </p>
      </div>
      <div className="marquee relative">
        <div data-marquee="38" className="marquee-track py-1">
          {row.map((l, i) => (
            <div key={`${l.name}-${i}`} className="logo-chip">
              <PartnerMark type={l.mark} />
              <span className="text-[16px] font-semibold tracking-[-0.02em]">
                {l.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnerMark({ type }: { type: string }) {
  if (type === "hex")
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2 20 7v10l-8 5-8-5V7l8-5Z" />
      </svg>
    );
  if (type === "bolt")
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z" />
      </svg>
    );
  if (type === "car")
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M5 16h14l1-5-3-4H7L4 11l1 5Zm1.5 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
      </svg>
    );
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12c2-4 4-4 6 0s4 4 6 0 4-4 6 0" />
    </svg>
  );
}

export function ServicesBlock() {
  const [open, setOpen] = useState(0);
  const current = services[open];
  return (
    <section id="services" className="py-8 md:py-14">
      <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <LimeBadge>Services</LimeBadge>
          <h2 className="anim-title section-title mt-4">
            End-to-End
            <br />
            AI Services
          </h2>
          <p className="mt-5 max-w-[420px] text-[15px] leading-7 text-[#71717a]">
            We turn ambiguous AI ideas into production features your users
            trust—combining strategy, design, engineering, and rigorous
            evaluation.
          </p>
          <div className="mt-8 overflow-hidden rounded-[28px]">
            <img
              src={`https://wpriverthemes.com/HTML/aigocy/assets/images/section/service-${open + 1}.jpg`}
              alt={current.title}
              className="aspect-[16/10] w-full object-cover"
              onError={(e) => {
                e.currentTarget.src = current.image;
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {services.map((s, i) => {
            const active = open === i;
            return (
              <div
                key={s.id}
                className={`anim-item service-item overflow-hidden rounded-[28px] transition-colors duration-500 ${
                  active ? "spotlight bg-[#111113] text-white" : "bg-white text-[#111]"
                }`}
              >
                <button
                  type="button"
                  className="flex w-full items-start justify-between gap-6 px-7 py-6 text-left"
                  onClick={() => setOpen(i)}
                >
                  <span className="whitespace-pre-line text-[28px] font-semibold leading-[1.1] tracking-[-0.04em] md:text-[34px]">
                    {s.title}
                  </span>
                  <span
                    className={`pt-1 text-[15px] ${
                      active ? "text-white/50" : "text-[#a1a1aa]"
                    }`}
                  >
                    ({s.num})
                  </span>
                </button>
                {active && (
                  <div className="px-7 pb-7">
                    <p className="max-w-[460px] text-[15px] leading-7 text-white/70">
                      {s.short}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {s.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/8 px-3 py-1.5 text-[13px] text-white/80 ring-1 ring-white/10"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WorksBlock() {
  return (
    <section id="works" className="py-10 md:py-16">
      <div className="container-site">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <LimeBadge>Featured Works</LimeBadge>
          <h2 className="anim-title section-title max-w-[560px]">
            Proof it works, not just promises
          </h2>
        </div>
        <div className="flex flex-col gap-16 md:gap-24">
          {works.map((w, i) => {
            const reversed = i % 2 === 1;
            return (
              <article
                key={w.id}
                className={`anim-item group grid items-center gap-8 md:grid-cols-2 md:gap-10 ${
                  reversed ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <Link
                  to={`/works/${w.id}`}
                  className="reveal-mask lift relative block overflow-hidden rounded-[32px]"
                >
                  <img
                    src={w.image}
                    alt={w.title}
                    data-par="0.06"
                    className="aspect-[4/3.1] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute bottom-4 right-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17 17 7M8 7h9v9" />
                    </svg>
                  </div>
                  {w.id === "clinical-note" && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <div className="text-[42px] font-semibold tracking-[-0.05em] text-white drop-shadow">
                        + Swiss
                      </div>
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-semibold tracking-wide text-[#111] shadow backdrop-blur">
                    {w.industry}
                  </span>
                </Link>

                <div>
                  <div className="text-[64px] font-semibold leading-none tracking-[-0.06em] text-[#dcdce0] md:text-[80px]">
                    0{i + 1}
                  </div>
                  <h3 className="-mt-3 whitespace-pre-line text-[28px] font-semibold leading-[1.1] tracking-[-0.04em] md:text-[34px]">
                    {w.titleBreak}
                  </h3>
                  <p className="mt-4 max-w-[440px] text-[15px] leading-7 text-[#52525b]">
                    {w.description}
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-5 border-t border-black/5 pt-5">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a1a1aa]">
                        Deliverables
                      </div>
                      <p className="mt-2 whitespace-pre-line text-[13px] leading-6 text-[#52525b]">
                        {w.deliverables}
                      </p>
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a1a1aa]">
                        Year
                      </div>
                      <p className="mt-2 text-[13px] leading-6 text-[#52525b]">{w.year}</p>
                    </div>
                  </div>
                  <Link
                    to={`/works/${w.id}`}
                    className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#111] transition-transform hover:translate-x-1"
                  >
                    View case study
                    <span>→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ProcessBlock() {
  const [idx, setIdx] = useState(0);
  const visible = useMemo(() => {
    const a = process[idx % process.length];
    const b = process[(idx + 1) % process.length];
    return [a, b];
  }, [idx]);

  return (
    <section className="py-10 md:py-16">
      <div className="container-site grid items-center gap-10 lg:grid-cols-[0.85fr_1.4fr]">
        <div>
          <LimeBadge>Process</LimeBadge>
          <h2 className="anim-title section-title mt-4">
            From Idea
            <br />
            to Production
          </h2>
          <div className="mt-8 flex gap-2">
            <ArrowBtn dir="left" onClick={() => setIdx((v) => (v + process.length - 1) % process.length)} />
            <ArrowBtn dir="right" onClick={() => setIdx((v) => (v + 1) % process.length)} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {visible.map((p) => (
            <div key={p.num} className="anim-item lift rounded-[28px] bg-white p-6">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#FD3A25] to-[#e42e1b] text-white shadow-lg shadow-[#FD3A25]/25">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
              </div>
              <h3 className="text-[24px] font-semibold tracking-[-0.04em]">{p.title}</h3>
              <p className="mt-3 min-h-[96px] text-[14px] leading-6 text-[#71717a]">{p.body}</p>
              <div className="mt-8 flex items-end justify-between">
                <span className="text-[12px] font-semibold tracking-[0.08em] text-[#a1a1aa]">
                  {p.time}
                </span>
                <span className="text-[34px] font-semibold tracking-[-0.05em]">
                  {p.num}
                  <span className="text-[#c4c4c8]">/03</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const meters: [string, number][] = [
  ["Accuracy", 82],
  ["Latency", 46],
  ["Safety", 74],
  ["Cost", 38],
];

export function BenefitsBlock() {
  return (
    <section className="py-10 md:py-16">
      <div className="container-site">
        <div className="mb-10 text-center">
          <LimeBadge>Benefits</LimeBadge>
          <h2 className="anim-title section-title mt-4">Why Choose Us</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="anim-item lift rounded-[28px] bg-white p-7">
            <div className="space-y-4">
              {meters.map(([label, val]) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="relative h-1.5 flex-1 rounded-full bg-[#f0f0f2]">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[#111]"
                      style={{ width: `${val}%` }}
                    />
                    <span
                      className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#111] shadow"
                      style={{ left: `calc(${val}% - 8px)` }}
                    />
                  </div>
                  <span className="w-16 text-right text-[14px] font-medium">{label}</span>
                </div>
              ))}
            </div>
            <h3 className="mt-8 text-[22px] font-semibold tracking-[-0.03em]">
              Outcome over Output
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[#71717a]">
              We measure what matters — accuracy, latency, safety, and cost — so
              every sprint ships business value, not just features.
            </p>
          </div>

          <div className="anim-item lift rounded-[28px] bg-white p-7">
            <div className="mb-10 flex justify-end gap-3">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-[#111] text-white"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
              ))}
            </div>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">
              Eval-First Reliability
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[#71717a]">
              From day one, we run offline/online evals, canary tests, and
              tracing. You see how models perform — and why.
            </p>
          </div>

          <div className="anim-item lift rounded-[28px] bg-white p-7">
            <div className="mb-10 flex h-24 items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#eee] text-[#111]">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3 5 6v6c0 4.2 2.8 7.4 7 8.7 4.2-1.3 7-4.5 7-8.7V6l-7-3Z" />
                  <path d="M9.5 12.2 11.2 14l3.4-3.8" />
                </svg>
              </div>
            </div>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">Secure by Design</h3>
            <p className="mt-2 text-[14px] leading-6 text-[#71717a]">
              PII handling, SSO/SAML, RBAC, encryption, and audit trails — built
              in, not bolted on. Enterprise-ready from the start.
            </p>
          </div>

          <div className="anim-item lift rounded-[28px] bg-white p-7">
            <div className="mb-8 flex justify-center">
              <div className="relative h-[140px] w-[230px]">
                <div className="absolute left-0 top-4 h-[92px] w-[150px] rounded-2xl bg-[#f3f3f5] p-3">
                  <div className="h-2 w-16 rounded bg-[#ddd]" />
                  <div className="mt-3 space-y-2">
                    <div className="h-2 w-24 rounded bg-[#e4e4e7]" />
                    <div className="h-2 w-20 rounded bg-[#e4e4e7]" />
                  </div>
                </div>
                <div className="absolute right-0 top-0 h-[118px] w-[130px] rounded-2xl bg-white p-3 shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
                  <div className="flex justify-end">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111] text-white">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                        <path d="m5 12 5 5L20 7" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-2 w-16 rounded bg-[#eee]" />
                    <div className="h-2 w-12 rounded bg-[#eee]" />
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-[22px] font-semibold tracking-[-0.03em]">
              Design-Led AI Experiences
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-[#71717a]">
              We craft prompts, interfaces, and guardrails that feel intuitive —
              so adoption rises and support tickets fall.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesBlock() {
  const left = features.slice(0, 3);
  const right = features.slice(3);
  return (
    <section className="py-10 md:py-16">
      <div className="container-site">
        <div className="mb-10 text-center">
          <LimeBadge>Features</LimeBadge>
          <h2 className="anim-title section-title mt-4">All Features in One</h2>
        </div>
        <div className="grid items-center gap-4 lg:grid-cols-[1fr_180px_1fr]">
          <div className="flex flex-col gap-4">
            {left.map((f) => (
              <div key={f.title} className="anim-item lift group rounded-[28px] bg-white p-6 shadow-sm border border-black/5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f4f5] to-[#e4e4e7] text-[#111] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:from-[#FD3A25] group-hover:to-[#e42e1b] group-hover:text-white">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="text-[20px] font-semibold tracking-[-0.03em]">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#71717a]">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="order-first flex justify-center py-4 lg:order-none lg:py-0">
            <BrandMark />
          </div>
          <div className="flex flex-col gap-4">
            {right.map((f) => (
              <div key={f.title} className="anim-item lift group rounded-[28px] bg-white p-6 shadow-sm border border-black/5">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f4f4f5] to-[#e4e4e7] text-[#111] shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:from-[#FD3A25] group-hover:to-[#e42e1b] group-hover:text-white">
                  <FeatureIcon name={f.icon} />
                </div>
                <h3 className="text-[20px] font-semibold tracking-[-0.03em]">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#71717a]">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ToolsBlock() {
  return (
    <section className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="float-logo absolute left-[12%] top-[18%] !bg-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="#10A37F">
            <path d="M12 2 4 6.5v11L12 22l8-4.5v-11L12 2Zm0 2.2 5.8 3.3v8.9L12 19.8 6.2 16.4V7.5L12 4.2Z" />
          </svg>
        </div>
        <div className="float-logo absolute right-[14%] top-[16%]" style={{ animationDelay: "0.6s" }}>
          <svg width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#7C3AED" />
            <path d="M8 12h8M12 8v8" stroke="white" strokeWidth="2" />
          </svg>
        </div>
        <div className="float-logo absolute left-[8%] top-[52%]" style={{ animationDelay: "1.1s" }}>
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#4285F4] via-[#34A853] to-[#FBBC05]" />
        </div>
        <div className="float-logo absolute right-[10%] top-[50%]" style={{ animationDelay: "0.3s" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5A1F">
            <path d="M12 3 4 8v8l8 5 8-5V8l-8-5Z" />
          </svg>
        </div>
        <div className="float-logo absolute bottom-[18%] left-[22%]" style={{ animationDelay: "1.4s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#6366F1">
            <path d="M7 4h10l3 8-8 9-8-9 3-8Z" />
          </svg>
        </div>
        <div className="float-logo absolute bottom-[16%] right-[20%]" style={{ animationDelay: "0.8s" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#111" strokeWidth="2" />
            <path d="M8 12h8" stroke="#111" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="container-site relative z-10 max-w-[640px] text-center">
        <LimeBadge>Tools</LimeBadge>
        <h2 className="anim-title section-title mt-4">We work with powerful AI tools</h2>
        <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-7 text-[#71717a]">
          We design, build, and evaluate with a modern AI stack—LLMs, vector
          search, orchestration, and observability—so your features are fast,
          reliable, and secure.
        </p>
        <div className="mt-8">
          <Link to="/consult" className="btn-dark">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

const teamRemote = [
  "https://wpriverthemes.com/HTML/aigocy/assets/images/team/team-1.jpg",
  "https://wpriverthemes.com/HTML/aigocy/assets/images/team/team-2.jpg",
  "https://wpriverthemes.com/HTML/aigocy/assets/images/team/team-4.jpg",
  "https://wpriverthemes.com/HTML/aigocy/assets/images/team/team-3.jpg",
  "https://wpriverthemes.com/HTML/aigocy/assets/images/team/team-5.jpg",
];

export function TeamBlock() {
  const lead = team[0];
  const rest = team.slice(1);
  return (
    <section className="px-4 pb-8 pt-16 md:px-8 md:pt-20">
      <div className="mx-auto max-w-[1200px] px-1 py-6 md:px-2 md:py-8">
        <div className="mb-10 text-center">
          <LimeBadge>Team Members</LimeBadge>
          <h2 className="anim-title section-title mt-4 text-white">
            The Squad Shipping
            <br />
            Your AI
          </h2>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.05fr_1.2fr]">
          <div className="anim-item lift spotlight group rounded-[28px] bg-[#161618] p-4">
            <div className="reveal-mask overflow-hidden rounded-[22px] bg-[#fd5a2d]">
              <img
                src={teamRemote[0]}
                alt={lead.name}
                className="aspect-[4/4.2] w-full object-cover object-top"
                onError={(e) => {
                  e.currentTarget.src = lead.image;
                }}
              />
            </div>
            <div className="flex items-end justify-between px-2 pb-2 pt-5">
              <div>
                <div className="text-[20px] font-semibold text-white">{lead.name}</div>
                <div className="mt-1 text-[13px] text-[#a1a1aa]">{lead.role}</div>
              </div>
              <Socials light />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((m, i) => (
              <div key={m.name} className="anim-item lift group rounded-[28px] bg-[#161618] p-4">
                <div className="reveal-mask relative overflow-hidden rounded-[20px]">
                  <img
                    src={teamRemote[i + 1]}
                    alt={m.name}
                    className="aspect-[16/10] w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = m.image;
                    }}
                  />
                  <div className="absolute right-3 top-3">
                    <Socials light />
                  </div>
                </div>
                <div className="px-1 pt-4">
                  <div className="text-[16px] font-semibold text-white">{m.name}</div>
                  <div className="mt-1 text-[13px] text-[#a1a1aa]">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function StatsBlock() {
  const stats = [
    { label: "OUR GROWTH", value: "230", suffix: "K" },
    { label: "UPTIME FOR KEY FLOWS", value: "95", suffix: "%" },
    { label: "ON TIME DELIVERY", value: "99", suffix: "%" },
  ];
  const [i, setI] = useState(0);
  const s = stats[i];
  return (
    <section className="px-4 md:px-8">
      <div className="spotlight mx-auto grid max-w-[1200px] overflow-hidden rounded-[28px] border border-white/8 md:grid-cols-2">
        <div className="p-8 md:p-12">
          <LimeBadge>Statistic</LimeBadge>
          <h2 className="anim-title section-title mt-5 text-white">
            Human-centered
            <br />
            AI, built for
            <br />
            production
          </h2>
        </div>
        <div className="border-t border-white/8 p-8 md:border-l md:border-t-0 md:p-12">
          <p className="text-[15px] leading-7 text-[#a1a1aa]">
            We shipped our first copilot in 7 weeks and cut support tickets by
            31%. The eval dashboards made every decision obvious.
          </p>
          <div className="mt-8 flex items-center justify-between">
            <div className="h-1 w-28 overflow-hidden rounded-full bg-white/10">
              <div className="progress-lime h-full w-2/3" />
            </div>
            <div className="flex gap-2">
              <ArrowBtn light dir="left" onClick={() => setI((v) => (v + stats.length - 1) % stats.length)} />
              <ArrowBtn light dir="right" onClick={() => setI((v) => (v + 1) % stats.length)} />
            </div>
          </div>
          <div className="mt-8 text-[12px] font-semibold tracking-[0.16em] text-[#a1a1aa]">
            {s.label}
          </div>
          <div className="mt-2 text-[92px] font-semibold leading-none tracking-[-0.06em] text-[#c6f04d] md:text-[120px]">
            <span data-count={s.value}>{s.value}</span>
            <span className="text-[60px] md:text-[72px]">{s.suffix}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AwardsBlock() {
  return (
    <section className="px-4 py-8 md:px-8">
      <div className="mx-auto max-w-[1200px] px-1 py-6 md:px-2">
        <div className="mb-8 flex justify-center">
          <LimeBadge>Awards</LimeBadge>
        </div>
        <div className="flex flex-col gap-3">
          {awards.map((a) => (
            <div
              key={a.title + a.year}
              className="grid items-center gap-3 rounded-[22px] bg-[#161618] px-5 py-4 text-white md:grid-cols-[1.1fr_1.2fr_1.4fr_80px]"
            >
              <div className="flex items-center gap-2 text-[18px] font-semibold tracking-[-0.03em] text-[#d4d4d8]">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-[11px]">
                  ◯
                </span>
                {a.brand}
              </div>
              <div className="text-[15px]">{a.title}</div>
              <div className="text-[14px] text-[#a1a1aa]">{a.project}</div>
              <div className="text-right text-[14px] text-[#a1a1aa]">/ {a.year}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsBlock() {
  const [i, setI] = useState(2);
  const t = testimonials[i];
  return (
    <section className="px-4 pb-14 md:px-8">
      <div className="spotlight mx-auto grid max-w-[1200px] overflow-hidden rounded-[28px] border border-white/8 md:grid-cols-[1.05fr_0.95fr]">
        <div className="p-8 md:p-12">
          <LimeBadge>Testimonials</LimeBadge>
          <h2 className="anim-title section-title mt-4 text-white">
            What Our
            <br />
            Clients Says
          </h2>
          <div className="mt-10 text-[42px] leading-none text-[#c6f04d]">“</div>
          <p className="max-w-[460px] text-[18px] leading-8 text-white/85">{t.quote}</p>
          <div className="mt-8 flex items-center gap-3">
            <span className="h-8 w-[2px] bg-[#c6f04d]" />
            <div>
              <div className="text-[15px] font-semibold text-white">{t.name}</div>
              <div className="text-[13px] text-[#a1a1aa]">{t.role}</div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <div className="flex gap-2">
              <ArrowBtn light dir="left" onClick={() => setI((v) => (v + testimonials.length - 1) % testimonials.length)} />
              <ArrowBtn light dir="right" onClick={() => setI((v) => (v + 1) % testimonials.length)} />
            </div>
            <div className="text-[14px] text-[#a1a1aa]">
              {i + 1} / {testimonials.length}
            </div>
          </div>
        </div>
        <div className="reveal-mask relative min-h-[360px] overflow-hidden md:min-h-[560px]">
          <img
            src="https://wpriverthemes.com/HTML/aigocy/assets/images/section/tes-3.jpg"
            alt={t.name}
            className="h-full w-full object-cover grayscale"
            onError={(e) => {
              e.currentTarget.src = t.image;
            }}
          />
        </div>
      </div>
    </section>
  );
}

export function PricingBlock() {
  const [annual, setAnnual] = useState(true);
  const starter = annual ? 9900 : 990;
  const enterprise = annual ? 19900 : 1990;
  const unit = annual ? "year" : "month";
  return (
    <section id="pricing" className="py-16">
      <div className="container-site">
        <div className="mb-4">
          <LimeBadge>Pricing Plans</LimeBadge>
        </div>
        <h2 className="anim-title section-title max-w-[640px]">
          From pilot to enterprise
          <br />
          clear scope, transparent costs
        </h2>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setAnnual((v) => !v)}
            className={`relative h-8 w-14 rounded-full ${annual ? "bg-[#FD3A25]" : "bg-[#d4d4d8]"}`}
            aria-label="Toggle billing"
          >
            <span
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${
                annual ? "left-7" : "left-1"
              }`}
            />
          </button>
          <span className="text-[28px] font-semibold tracking-[-0.04em]">annually.</span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="anim-item lift rounded-[32px] bg-white p-7 md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex rounded-full bg-[#f4f4f5] px-3 py-1 text-[13px] font-medium">
                  01 Starter Plan
                </div>
                <div className="mt-3 text-[14px] text-[#71717a]">For startups</div>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div className="flex items-end gap-1">
                <span className="text-[48px] font-semibold leading-none tracking-[-0.05em]">
                  ${starter.toLocaleString()}
                </span>
                <span className="mb-1 text-[16px] text-[#71717a]">/ {unit}</span>
              </div>
              <Link to="/consult" className="btn-dark !h-11">
                Get Started
              </Link>
            </div>
            <div className="mt-8 grid gap-6 border-t border-[#f0f0f2] pt-6 md:grid-cols-2">
              <div>
                <div className="text-[15px] font-semibold">What’s included</div>
                <p className="mt-2 text-[14px] leading-6 text-[#71717a]">
                  Prove value in two weeks with a clickable UX, tech spike, and a
                  clear go/no-go roadmap.
                </p>
              </div>
              <ul className="space-y-3 text-[14px]">
                {["Discovery workshop", "Opportunity brief", "Clickable UX", "1 data source & 1 integration"].map(
                  (x) => (
                    <li key={x} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#111]" />
                      {x}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="anim-item lift spotlight gradient-border relative rounded-[32px] bg-[#111113] p-7 text-white md:p-8">
            <div className="flex items-start justify-between">
              <div>
                <div className="inline-flex rounded-full bg-white/8 px-3 py-1 text-[13px] font-medium ring-1 ring-white/10">
                  02 Enterprise Plan
                </div>
                <div className="mt-3 text-[14px] text-[#a1a1aa]">For organisations</div>
              </div>
            </div>
            <div className="mt-6 flex items-end justify-between">
              <div className="flex items-end gap-1">
                <span className="text-[48px] font-semibold leading-none tracking-[-0.05em]">
                  ${enterprise.toLocaleString()}
                </span>
                <span className="mb-1 text-[16px] text-[#a1a1aa]">/ {unit}</span>
              </div>
              <Link to="/consult" className="btn-dark !h-11 !bg-white !text-black">
                Get Started
              </Link>
            </div>
            <div className="mt-8 grid gap-6 border-t border-white/8 pt-6 md:grid-cols-2">
              <div>
                <div className="text-[15px] font-semibold">What’s included</div>
                <p className="mt-2 text-[14px] leading-6 text-[#a1a1aa]">
                  Compliance-ready delivery for complex orgs—multi-env releases,
                  canaries, and change management.
                </p>
              </div>
              <ul className="space-y-3 text-[14px] text-white/90">
                {[
                  "Everything in Starter",
                  "CI/CD, tracing, alerts, guardrails",
                  "Full eval dashboard",
                  "3 data source & 3 integration",
                ].map((x) => (
                  <li key={x} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FaqBlock() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-10 md:py-16">
      <div className="container-site">
        <div className="mb-10 text-center">
          <LimeBadge>FAQs</LimeBadge>
          <h2 className="anim-title section-title mt-4">
            Frequently Asked
            <br />
            Questions
          </h2>
        </div>
        <div className="mx-auto flex max-w-[820px] flex-col gap-3">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q} className="overflow-hidden rounded-[22px] bg-white">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  onClick={() => setOpen(active ? -1 : i)}
                >
                  <span className="text-[16px] font-medium tracking-[-0.02em]">{f.q}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f4f4f5] text-lg">
                    {active ? "–" : "+"}
                  </span>
                </button>
                {active && (
                  <p className="px-6 pb-5 text-[14px] leading-7 text-[#71717a]">{f.a}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ContactBlock() {
  const [sent, setSent] = useState(false);
  const [fileName, setFileName] = useState("");
  return (
    <section className="px-3 pb-10 md:px-6">
      <div className="relative mx-auto max-w-[1200px] overflow-hidden rounded-[36px]">
        <img src="/images/contact-bg.jpg" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#edecec]/70 via-[#edecec]/35 to-transparent" />
        <div className="relative grid gap-8 p-5 md:grid-cols-[0.95fr_1.05fr] md:p-8 lg:p-10">
          <div className="flex flex-col justify-between py-4">
            <div>
              <LimeBadge>Contact</LimeBadge>
              <h2 className="anim-title section-title mt-5 max-w-[420px]">
                Let’s Build
                <br />
                Intelligent Things
              </h2>
            </div>
            <div className="mt-10 space-y-5 text-[14px]">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>
                <div>
                  <div className="text-[#52525b]">E-mail address</div>
                  <div className="font-medium">hello@youraiagency.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M6 4h4l1.5 4-2.5 1.5a12 12 0 0 0 5.5 5.5L16 12.5 20 14v4a2 2 0 0 1-2 2C9.2 20 4 14.8 4 6a2 2 0 0 1 2-2Z" />
                  </svg>
                </span>
                <div>
                  <div className="text-[#52525b]">Phone number</div>
                  <div className="font-medium">+1 (647) 555 0172</div>
                </div>
              </div>
            </div>
          </div>

          <form
            className="rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <h3 className="text-[28px] font-semibold tracking-[-0.04em]">Fill this form below</h3>
            <div className="mt-6 space-y-2">
              <label className="text-[13px] text-[#71717a]">Your Name</label>
              <input required name="name" placeholder="Enter your full name" />
              <label className="text-[13px] text-[#71717a]">Your Phone</label>
              <input name="phone" placeholder="Enter your Phone" />
              <label className="text-[13px] text-[#71717a]">Your Email</label>
              <input required type="email" name="email" placeholder="Enter your Email Id" />
              <label className="text-[13px] text-[#71717a]">More About The Project</label>
              <textarea name="about" placeholder="" />
            </div>
            <label className="mt-4 flex cursor-pointer items-center justify-between rounded-2xl border border-[#eee] px-4 py-3 text-[14px] text-[#71717a]">
              <span>Add an Attachment</span>
              <span className="rounded-full bg-[#f4f4f5] px-3 py-1 text-[12px]">
                {fileName || "Choose File  No file chosen"}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              />
            </label>
            <button type="submit" className="btn-dark mt-6 !h-12 w-full">
              Submit Message
            </button>
            {sent && (
              <p className="mt-4 text-center text-[14px] text-[#16a34a]">
                Thanks — we’ll get back within one business day.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
