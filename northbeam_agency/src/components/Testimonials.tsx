import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowRight, QuoteMark, Reveal, SectionLabel } from "./ui";

const DURATION = 7000;

const testimonials = [
  {
    quote:
      "Northbeam didn't just add engineers. They changed how our team makes decisions. We shipped more in the first eight weeks together than we had in the previous six months.",
    name: "Maya Chen",
    role: "VP Engineering, Optiva",
    initials: "MC",
    avatar: "bg-[#e5cf9e] text-[#4a3b1c]",
    proof: "2.4× faster releases",
    logo: "openly",
  },
  {
    quote:
      "The rare partner who tells you what they don't know. That honesty saved us from a six-month rewrite and got us onto a modern platform in a single season.",
    name: "Jonas Lindqvist",
    role: "CTO, Fathom",
    initials: "JL",
    avatar: "bg-[#c2d3e6] text-[#263a4e]",
    proof: "43% lower cloud spend",
    logo: "fathom",
  },
  {
    quote:
      "Their AI work is the first thing we've put in front of customers that felt genuinely finished. Guardrails, evaluations, documentation — all of it, without the hype.",
    name: "Priya Raman",
    role: "Head of Product, Lattice",
    initials: "PR",
    avatar: "bg-[#e6c4cd] text-[#4d2831]",
    proof: "9 workflows live",
    logo: "lattice",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchX = useRef<number | null>(null);
  const testimonial = testimonials[index];

  const move = useCallback(
    (direction: number) =>
      setIndex((current) => (current + direction + testimonials.length) % testimonials.length),
    [],
  );

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => move(1), DURATION);
    return () => window.clearTimeout(timer);
  }, [index, paused, move]);

  return (
    <section id="voices" className="scroll-mt-20 bg-paper py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="flex flex-col justify-between lg:col-span-4">
            <div>
              <SectionLabel className="text-ink">Word of mouth</SectionLabel>
              <h2 className="mt-5 max-w-[330px] text-[clamp(2.3rem,3.8vw,3.25rem)] font-medium leading-[1] tracking-[-0.05em]">
                The kind of partner teams{" "}
                <span className="font-serif font-normal italic text-ink/70">keep.</span>
              </h2>
              <p className="mt-5 max-w-[290px] text-[13.5px] leading-[1.65] text-ink/60">
                We'd rather show you the relationships than the reel. Ask any of these teams what
                it's like to work with us.
              </p>
            </div>

            <div className="mt-10 lg:mt-16">
              <div role="tablist" aria-label="Choose testimonial" className="flex flex-col gap-1">
                {testimonials.map((item, i) => (
                  <button
                    key={item.name}
                    role="tab"
                    type="button"
                    aria-selected={i === index}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left transition",
                      i === index ? "bg-white shadow-[0_4px_20px_-10px_rgba(25,25,27,0.25)]" : "hover:bg-white/60",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold",
                        item.avatar,
                        i !== index && "opacity-60 grayscale-[40%]",
                      )}
                    >
                      {item.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={cn("block text-[12.5px] font-semibold", i === index ? "text-ink" : "text-ink/55")}>
                        {item.name}
                      </span>
                      <span className="block truncate text-[11px] text-ink/45">{item.role}</span>
                    </span>
                    {i === index && (
                      <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-[2px] overflow-hidden rounded-full bg-ink/[0.06]">
                        <span
                          key={`${index}-${paused}`}
                          className={cn("progress-fill block h-full bg-ink/60", paused && "paused")}
                          style={{ ["--duration" as string]: `${DURATION}ms` }}
                        />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-8">
            <div
              className="relative flex h-full min-h-[400px] flex-col justify-between overflow-hidden rounded-[20px] border border-ink/[0.08] bg-[linear-gradient(125deg,#fbf6ec_0%,#f4eef7_52%,#edf1f7_100%)] p-6 sm:p-9 lg:p-10"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") move(1);
                if (e.key === "ArrowLeft") move(-1);
              }}
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                if (Math.abs(dx) > 45) move(dx < 0 ? 1 : -1);
                touchX.current = null;
              }}
            >
              <QuoteMark aria-hidden="true" className="absolute right-7 top-7 text-ink/[0.07] sm:right-10 sm:top-9" />
              <div aria-live={paused ? "polite" : "off"} aria-atomic="true">
                <div
                  key={`${testimonial.name}-proof`}
                  className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-1.5 backdrop-blur-sm"
                >
                  <span className="size-1.5 rounded-full bg-[#7a966c]" />
                  <span className="font-mono text-[9.5px] uppercase tracking-[0.08em] text-ink/60">
                    {testimonial.proof}
                  </span>
                </div>
                <blockquote
                  key={testimonial.name}
                  className="animate-fade-up mt-7 max-w-[800px] text-[clamp(1.3rem,2.35vw,1.95rem)] font-normal leading-[1.34] tracking-[-0.03em] text-ink/90"
                >
                  “{testimonial.quote}”
                </blockquote>
              </div>

              <div className="mt-9 flex flex-wrap items-center justify-between gap-5 border-t border-ink/10 pt-5">
                <div className="flex items-center gap-3">
                  <span className={`flex size-10 items-center justify-center rounded-full text-[10px] font-semibold tracking-wide ${testimonial.avatar}`}>
                    {testimonial.initials}
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold leading-none tracking-[-0.01em] text-ink">{testimonial.name}</p>
                    <p className="mt-1.5 text-[11px] text-ink/50">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="mr-2 hidden select-none font-serif text-[20px] italic text-ink/35 sm:inline">
                    {testimonial.logo}
                  </span>
                  <button
                    type="button"
                    onClick={() => move(-1)}
                    aria-label="Previous testimonial"
                    className="flex size-10 items-center justify-center rounded-full border border-ink/15 bg-white/50 text-ink transition hover:border-ink/35 hover:bg-white active:scale-95"
                  >
                    <ArrowRight className="size-4 rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(1)}
                    aria-label="Next testimonial"
                    className="flex size-10 items-center justify-center rounded-full bg-ink text-paper transition hover:bg-[#333336] active:scale-95"
                  >
                    <ArrowRight className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
