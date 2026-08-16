import { Link } from "react-router-dom";
import {
  AwardsBlock,
  BenefitsBlock,
  ContactBlock,
  FaqBlock,
  FeaturesBlock,
  Partners,
  PricingBlock,
  ProcessBlock,
  ServicesBlock,
  StatsBlock,
  TeamBlock,
  TestimonialsBlock,
  ToolsBlock,
  WorksBlock,
} from "../components/sections";
import { LimeBadge, Sparkle } from "../components/ui";
import { useHeroAnimation } from "../components/animations";
import Globe3D from "../components/Globe3D";

export default function Home() {
  useHeroAnimation();
  return (
    <>
      <Hero />
      <MarqueeTicker />
      <AboutHome />
      <div className="anim-item">
        <Partners />
      </div>
      <ServicesBlock />
      <WorksBlock />
      <ProcessBlock />
      <BenefitsBlock />
      <FeaturesBlock />
      <ToolsBlock />
      <div className="mx-3 overflow-hidden rounded-[36px] bg-[#0b0b0d] md:mx-5">
        <TeamBlock />
        <StatsBlock />
        <AwardsBlock />
        <TestimonialsBlock />
      </div>
      <PricingBlock />
      <FaqBlock />
      <ContactBlock />
    </>
  );
}

function Hero() {
  return (
    <section className="hero-stage grain relative min-h-[960px] overflow-hidden">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="hero-bg-img absolute -top-[20%] left-0 h-[120%] w-full object-cover object-[80%_20%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(237,236,236,0.55)_0%,rgba(237,236,236,0.18)_28%,rgba(237,236,236,0.08)_55%,#edecec_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-[#f4f2f1] via-[#f4f2f1]/70 to-transparent" />

      {/* Ambient orbs */}
      <div className="orb orb--red" style={{ width: 420, height: 420, top: -120, left: -80 }} />
      <div className="orb orb--warm" style={{ width: 340, height: 340, top: 220, right: -60, opacity: 0.35 }} />
      <div className="orb orb--lime" style={{ width: 260, height: 260, bottom: 40, left: "38%", opacity: 0.28 }} />

      <div className="hero-content-inner container-site relative flex min-h-[960px] flex-col items-center pt-[168px] text-center">
        <div className="hero-badge glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold tracking-wide">
          <Sparkle />
          <span className="anim-chars">AI-Driven Agency</span>
        </div>

        <div className="relative mt-6">
          <h1 className="hero-title display-title text-[52px] text-[#111] md:text-[76px] lg:text-[88px]">
            Your AI Sprint Team
            <br />
            on Demand
          </h1>
          <span className="hero-float absolute hidden md:block" style={{ right: "-4.5rem", top: "-1.6rem" }}>
            <Bubble>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#10A37F">
                <path d="M22 12c0 5.5-4.5 10-10 10S2 17.5 2 12 6.5 2 12 2s10 4.5 10 10Z" opacity=".15" />
                <path d="M12 5.2 7 8v8l5 2.8 5-2.8V8l-5-2.8Z" />
              </svg>
            </Bubble>
          </span>
          <span className="hero-float absolute hidden md:block" style={{ right: "-1rem", top: "3.4rem" }}>
            <Bubble>
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-[#4285F4] via-white to-[#EA4335]" />
            </Bubble>
          </span>
          <span className="hero-float absolute hidden md:block" style={{ left: "-5rem", top: "0.4rem" }}>
            <Bubble>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#FD3A25">
                <path d="M12 3 4 8v8l8 5 8-5V8l-8-5Z" />
              </svg>
            </Bubble>
          </span>
          <span className="hero-float absolute hidden md:block" style={{ right: "2.4rem", bottom: "-2rem" }}>
            <Bubble>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#6366F1">
                <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" />
              </svg>
            </Bubble>
          </span>
          <span className="hero-float absolute hidden md:block" style={{ left: "2rem", bottom: "-2.4rem" }}>
            <Bubble>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2.2">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Bubble>
          </span>
        </div>

        <p className="hero-sub mt-7 max-w-[560px] text-[16px] leading-7 text-[#52525b]">
          From discovery to deployment, we plug into your stack to prototype,
          validate, and launch AI experiences your users actually love.
        </p>

        <div className="hero-cta mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link to="/services" className="btn-dark group">
            Explore Services
            <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <a href="#pricing" className="btn-light group">
            View Pricing Plans
            <span className="ml-1 opacity-50 transition-transform group-hover:translate-y-0.5">↓</span>
          </a>
        </div>

        <div className="hero-trust glass mt-8">
          <div className="avatars">
            <img src="/images/ava.jpg" alt="" />
            <img
              src="https://images.pexels.com/photos/31420959/pexels-photo-31420959.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=120&w=120"
              alt=""
            />
            <img
              src="https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=120&w=120"
              alt=""
            />
          </div>
          <div className="text-left">
            <div className="text-[13px] font-semibold text-[#111]">
              <span data-count="120">0</span>+ builders trust Aigocy
            </div>
            <div className="text-[11px] text-[#71717a]">Shipping since 2023</div>
          </div>
        </div>

        <a
          href="#about"
          className="hero-scroll mt-auto mb-10 inline-flex items-center gap-2 text-[13px] text-[#71717a]"
        >
          Scroll for more
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10">
            ↓
          </span>
        </a>
      </div>
    </section>
  );
}

function Bubble({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-16 w-16 items-center justify-center rounded-[24px] bg-white/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-[1.5px] border-white/80 ring-1 ring-white/20 transition-transform hover:scale-110">
      {children}
    </span>
  );
}

function MarqueeTicker() {
  const items = [
    "AI Strategy",
    "LLM Agents",
    "Eval-First Delivery",
    "Human-Centered UX",
    "RAG Pipelines",
    "MLOps",
    "Secure by Design",
    "Real-Time Analytics",
  ];
  const row = [...items, ...items];
  return (
    <section className="marquee relative py-6" data-skew>
      <div data-marquee="34" className="marquee-track">
        {row.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="inline-flex items-center gap-6 text-[38px] font-semibold tracking-[-0.04em] text-[#111] md:text-[54px]"
          >
            {label}
            <span className="inline-block h-2 w-2 rounded-full bg-[#FD3A25]" />
          </span>
        ))}
      </div>
    </section>
  );
}

function AboutHome() {
  return (
    <section id="about" className="py-10 md:py-16">
      <div className="container-site">
        <div className="mb-8">
          <LimeBadge>About Us</LimeBadge>
          <h2 className="anim-title section-title mt-4">
            Human-Centered AI,
            <br />
            Built for Production
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_0.95fr]">
          <div
            data-tilt
            className="anim-item gradient-border lift relative min-h-[460px] overflow-hidden rounded-[32px] bg-[#0b0b0d]"
          >
            <div className="absolute inset-x-0 top-0 h-[55%] overflow-hidden rounded-t-[32px]">
              <Globe3D focus="top" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-[#0b0b0d]" />
            </div>
            <div className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6f04d] shadow-[0_0_10px_#c6f04d]" />
              Based in Montréal, Canada
            </div>
            <div className="pointer-events-none absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Global reach
                </div>
                <div className="mt-1 text-[26px] font-semibold tracking-[-0.04em]">
                  Shipping across <span className="text-[#c6f04d]">4 industries</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <p className="anim-item text-[15px] leading-7 text-[#52525b]">
              Trusted by 120+ clients across 4 industries — shipping AI from
              idea to production in 8–10 weeks.
            </p>

            <div className="anim-item flex items-end justify-between">
              <div className="flex items-center gap-2 text-[#219653]">
                <svg width="22" height="20" viewBox="0 0 26 24" fill="currentColor">
                  <path d="M12.68 18.3 18.19 16.9 20.49 24 12.68 18.3ZM25.36 9.13h-9.7L12.68 0 9.7 9.13H0l7.85 5.66-2.98 9.13 7.85-5.66 4.83-3.47 7.81-5.66Z" />
                </svg>
                <span className="text-[14px] font-semibold">Trustpilot</span>
              </div>
              <div className="text-[92px] font-semibold leading-none tracking-[-0.06em] text-[#cfcfd3] md:text-[110px]">
                <span data-count="120">120</span>
                <span className="text-[56px]">+</span>
              </div>
            </div>

            <div className="anim-item lift flex items-center gap-5 rounded-[28px] bg-white p-4">
              <div className="reveal-mask relative h-[128px] w-[118px] rounded-[20px]">
                <img
                  src="/images/ava.jpg"
                  alt="Ava Collins"
                  className="h-full w-full rounded-[20px] object-cover"
                />
                <span className="absolute -right-2 -top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#FD3A25] text-white shadow-lg">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M7 7h4v4H9c0 2 1 3 3 3v3c-4 0-6-2-6-6V7Zm9 0h4v4h-2c0 2 1 3 3 3v3c-4 0-6-2-6-6V7Z" />
                  </svg>
                </span>
              </div>
              <div>
                <p className="text-[18px] font-medium leading-7 tracking-[-0.03em]">
                  Good AI feels obvious—because the hard work is hidden.
                </p>
                <div className="mt-4 text-[14px]">
                  <span className="font-semibold">Ava Collins</span>
                  <span className="mx-2 text-[#c4c4c8]">·</span>
                  <span className="text-[#71717a]">Aigocy’s Design Lead</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
