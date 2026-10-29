import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Button, Sparkle } from "./ui";

const avatars = [
  { initials: "MC", className: "bg-[#d9c9a4] text-[#4b3e22]" },
  { initials: "JL", className: "bg-[#b9c9de] text-[#24364b]" },
  { initials: "SR", className: "bg-[#e3c2c9] text-[#4d2931]" },
];

const trust = [
  { value: "120+", label: "products shipped" },
  { value: "6 wks", label: "avg. to first release" },
  { value: "94%", label: "partners extend" },
  { value: "4.9", label: "Clutch rating", star: true },
];

export function Hero({ onContact }: { onContact: () => void }) {
  const [time, setTime] = useState("");
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Copenhagen",
          hour: "2-digit",
          minute: "2-digit",
        }).format(new Date()),
      );
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (reduce) return;
    let frame = 0;
    let mx = 0;
    let my = 0;
    const apply = () => {
      frame = 0;
      const el = imageRef.current;
      if (!el) return;
      const sy = Math.min(window.scrollY, 900);
      el.style.transform = `translate3d(${mx * -14}px, ${my * -10 + sy * 0.18}px, 0) scale(1.06)`;
    };
    const onMove = (e: PointerEvent) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="top" className="grain relative isolate overflow-hidden bg-[#ecebe6]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-0 transition-transform duration-[900ms] ease-out will-change-transform"
          style={{ transform: "scale(1.06)" }}
        >
          <img
            src="/images/prism-hero.jpg"
            alt=""
            className="size-full object-cover object-[58%_center]"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#fbfaf7]/85 via-[#f7f5f0]/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-paper via-paper/70 to-transparent" />
      </div>

      <div className="mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-5 pb-8 pt-[100px] sm:px-8 sm:pt-[112px] lg:px-12 lg:pb-10">
        <div className="flex items-start justify-between gap-6">
          <a
            href="#promise"
            className="animate-fade-up group inline-flex items-center gap-2.5 rounded-full border border-ink/[0.09] bg-white/55 py-1.5 pl-1.5 pr-3.5 backdrop-blur-md transition hover:bg-white/80"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-ink px-2 py-1 text-[9.5px] font-semibold uppercase tracking-[0.08em] text-paper">
              <Sparkle className="size-2.5 text-sun" /> New
            </span>
            <span className="text-[12px] font-medium text-ink/70">
              AI readiness sprints now available
            </span>
            <ArrowUpRight className="size-3.5 text-ink/50 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <div className="hidden shrink-0 items-center gap-2.5 pt-2 md:flex">
            <span className="eyebrow text-ink/45">Copenhagen, DK</span>
            <span className="h-3 w-px bg-ink/15" aria-hidden="true" />
            <span className="eyebrow tabular-nums text-ink/45">{time} CET</span>
          </div>
        </div>

        <div className="mt-14 sm:mt-20 lg:mt-24">
          <h1 className="animate-fade-up delay-1 max-w-[940px] text-[clamp(2.85rem,6.6vw,5.85rem)] font-medium leading-[0.96] tracking-[-0.058em] text-ink">
            <span className="block">Build with confidence</span>
            <span className="block">
              and deliver{" "}
              <span className="relative inline-block font-serif font-normal italic tracking-[-0.03em] text-[#3d3d42]">
                on time.
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1 left-0 h-3 w-full text-sun/80"
                >
                  <path d="M3 9c40-6 92-8 140-5 25 1.6 50 2.6 74-1" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </span>
          </h1>

          <p className="animate-fade-up delay-2 mt-8 max-w-[560px] text-[16px] leading-[1.6] text-ink/70 sm:mt-10 sm:text-[17px]">
            Senior product teams that embed with yours to ship better software, modernize aging
            platforms, and make AI genuinely useful — without the hand-off theater.
          </p>

          <div className="animate-fade-up delay-3 mt-8 flex flex-wrap items-center gap-2.5">
            <Button onClick={onContact} className="h-12 px-6 text-[13.5px]">
              Start a project
            </Button>
            <a
              href="#work"
              className="group inline-flex h-12 items-center justify-center gap-2.5 rounded-[9px] border border-ink/15 bg-white/45 px-5 text-[13.5px] font-medium text-ink backdrop-blur-md transition hover:border-ink/30 hover:bg-white/75"
            >
              See the outcomes
              <ArrowDown className="size-[15px] transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <span className="ml-1 hidden items-center gap-2 text-[12px] text-ink/50 sm:inline-flex">
              <span className="flex -space-x-1.5">
                {avatars.map((a) => (
                  <span
                    key={a.initials}
                    className={`flex size-6 items-center justify-center rounded-full border-2 border-[#f4f2ec] text-[7.5px] font-semibold ${a.className}`}
                  >
                    {a.initials}
                  </span>
                ))}
              </span>
              Reply within 1 business day
            </span>
          </div>
        </div>

        <div className="mt-auto pt-14 sm:pt-20">
          <div className="animate-fade-up delay-4 flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-end">
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/70 bg-ink/[0.07] shadow-[0_18px_50px_-30px_rgba(30,30,40,0.35)] backdrop-blur-xl sm:grid-cols-4 lg:max-w-[720px] lg:flex-1">
              {trust.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 bg-white/60 px-4 py-4 sm:px-5">
                  <dt className="sr-only">{item.label}</dt>
                  <dd className="flex items-baseline gap-1 text-[24px] font-medium leading-none tracking-[-0.045em] text-ink sm:text-[26px]">
                    {item.value}
                    {item.star && <span className="text-[14px] text-sun">★</span>}
                  </dd>
                  <dd className="text-[11px] text-ink/50">{item.label}</dd>
                </div>
              ))}
            </dl>

            <button
              type="button"
              onClick={onContact}
              className="group w-full rounded-2xl border border-white/70 bg-white/60 p-4 text-left shadow-[0_18px_50px_-24px_rgba(30,30,40,0.4)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:bg-white/80 lg:max-w-[320px]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2.5">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-[#7d9c64]" />
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7d9c64] opacity-50" />
                  </span>
                  <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">Taking on new work</span>
                </span>
                <span className="flex size-7 items-center justify-center rounded-full border border-ink/10 bg-white/70 transition duration-300 group-hover:bg-ink group-hover:text-paper">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </div>
              <div className="mt-3.5 flex items-center gap-3">
                <div className="flex flex-1 gap-1" aria-hidden="true">
                  <span className="h-1.5 flex-1 rounded-full bg-ink/80" />
                  <span className="h-1.5 flex-1 rounded-full bg-ink/15" />
                  <span className="h-1.5 flex-1 rounded-full bg-ink/15" />
                </div>
                <span className="text-[11px] text-ink/55">2 of 3 slots open · Q3</span>
              </div>
            </button>
          </div>

          <a href="#promise" className="group mx-auto mt-8 flex w-fit flex-col items-center gap-2" aria-label="Scroll to our promise">
            <span className="eyebrow text-ink/40 transition group-hover:text-ink/70">Scroll</span>
            <span className="flex h-8 w-5 justify-center rounded-full border border-ink/20 pt-1.5">
              <span className="h-1.5 w-[3px] animate-bounce rounded-full bg-ink/50" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
