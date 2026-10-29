import { ArrowRight, Reveal, Sparkle } from "./ui";

export function Promise() {
  return (
    <section
      id="promise"
      className="relative isolate overflow-hidden bg-[#f3f0e8] py-24 sm:py-32 lg:py-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(118deg,#fbf6e8_0%,#f3e9ee_26%,#ede9f7_53%,#e8eff8_76%,#f6f4ed_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 -top-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(250,221,167,0.7),transparent_67%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-48 -right-32 -z-10 size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(190,214,242,0.65),transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] bg-[radial-gradient(closest-side,rgba(255,255,255,0.85),transparent)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-36 bg-gradient-to-t from-paper to-transparent"
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/30 px-3 py-1.5">
            <Sparkle className="size-3 text-[#a47a21]" />
            <span className="eyebrow text-ink/55">Our promise</span>
          </span>
        </Reveal>

        <div className="relative mx-auto mt-12 max-w-[1030px] sm:mt-16">
          <Sparkle
            aria-hidden="true"
            className="animate-float absolute -left-1 -top-7 size-5 text-[#c99432] sm:-left-8 sm:-top-4 sm:size-6"
          />
          <Sparkle
            aria-hidden="true"
            className="animate-float absolute -right-1 top-1/3 size-4 text-[#9d8bcd] [animation-delay:-2.2s] sm:-right-9 sm:size-5"
          />
          <span
            aria-hidden="true"
            className="absolute -bottom-9 right-2 font-mono text-[11px] tracking-[0.06em] text-ink/50 sm:-right-4 sm:bottom-2 sm:rotate-[-5deg]"
          >
            ✳ since 2014, quietly
          </span>

          <Reveal>
            <p className="text-center text-[clamp(1.55rem,3.35vw,2.9rem)] font-normal leading-[1.28] tracking-[-0.035em] text-ink/85">
              We help CTOs and product teams{" "}
              <span className="relative inline-block whitespace-nowrap font-medium text-ink">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-[-3px] bottom-[1px] top-[42%] -z-10 rounded-[2px] bg-[#bcd6f2]"
                />
                speed up
              </span>{" "}
              development,{" "}
              <span className="relative inline-block whitespace-nowrap font-medium text-ink">
                modernize
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 12"
                  preserveAspectRatio="none"
                  className="absolute -bottom-1.5 left-0 h-2.5 w-full text-sun"
                >
                  <path
                    d="M2 7.8c20-4.6 39-5.2 60-3.2 19 1.8 38 1.3 56-2.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              in-house engineering, and{" "}
              <span className="whitespace-nowrap rounded-[5px] bg-[#cabbf2]/75 px-1.5 font-medium text-ink">
                adopt AI
              </span>
              , so they can{" "}
              <span className="inline-flex items-baseline gap-1 whitespace-nowrap rounded-full bg-[#f5e4a0] px-2.5 pb-0.5 font-medium text-ink">
                ship faster
                <ArrowRight className="size-4 -rotate-45 self-center text-ink/70" />
              </span>{" "}
              without compromising on{" "}
              <span className="relative whitespace-nowrap font-serif italic text-[1.08em] tracking-[-0.01em]">
                quality
                <svg
                  aria-hidden="true"
                  viewBox="0 0 106 52"
                  preserveAspectRatio="none"
                  className="absolute -inset-x-2 -inset-y-1.5 h-[calc(100%+12px)] w-[calc(100%+16px)] text-ink/25"
                >
                  <path
                    d="M56 4C27 1 5 12 5 27c0 13 22 22 49 21 22-1 43-9 46-21C103 15 83 5 60 4 38 3 21 8 14 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              . <span className="whitespace-nowrap font-serif italic text-[#4f4a5e]">That's our promise.</span>
            </p>
          </Reveal>
        </div>

        <Reveal delay={140} className="mt-20 flex flex-col items-center gap-6 sm:mt-24">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Senior only", "Fixed scope", "You own everything"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-ink/10 bg-white/35 px-3 py-1.5 text-[11px] font-medium text-ink/55 backdrop-blur-sm"
              >
                {item}
              </span>
            ))}
          </div>
          <a
            href="#process"
            className="group inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[13px] font-medium text-ink/70 transition hover:border-ink/50 hover:text-ink"
          >
            See how we work
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
