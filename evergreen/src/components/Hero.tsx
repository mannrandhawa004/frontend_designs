import { IMG } from "../data";
import { Leaf, Sparkle } from "./ui";
import { useScrollProgress } from "../hooks";

const trust = ["Trusted By 1000+ Clients", "Commitment to High Standards", "Award Winning Landscape Company"];

export default function Hero() {
  const { ref, p } = useScrollProgress<HTMLDivElement>();

  return (
    <div id="home" className="px-3">
      <div ref={ref} className="relative mx-auto mt-3 max-w-[1400px] overflow-hidden rounded-[32px]">
        <img
          src={IMG.hero}
          alt="Modern landscaped backyard with pool"
          className="animate-kenburns h-[78vh] min-h-[520px] w-full object-cover"
          style={{ transform: `translate3d(0, ${p * 40}px, 0)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-14">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <Sparkle className="h-3 w-3 text-lime" />
            New York · Since 2012
          </div>

          <h1 className="max-w-3xl text-[12vw] font-semibold leading-[0.92] tracking-tight text-white sm:text-6xl md:text-[5.2rem]">
            {["We Bring Your", "Garden"].map((line, i) => (
              <span
                key={line}
                className="block overflow-hidden"
                style={{
                  animation: `fade-up .9s cubic-bezier(.22,1,.36,1) ${0.15 + i * 0.12}s both`,
                }}
              >
                {line}
                {i === 1 && (
                  <>
                    {" "}
                    <span className="relative italic text-lime">
                      to Life
                      <svg
                        viewBox="0 0 200 12"
                        className="absolute -bottom-2 left-0 w-full"
                        preserveAspectRatio="none"
                      >
                        <path
                          d="M2 8c50-6 120-7 196-2"
                          stroke="#c4e538"
                          strokeWidth="3"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray="220"
                          strokeDashoffset="220"
                          style={{ animation: "draw 1.1s ease-out 1s forwards" }}
                        />
                      </svg>
                    </span>
                  </>
                )}
              </span>
            ))}
          </h1>

          <p
            className="mt-7 max-w-md text-[14px] leading-relaxed text-white/75"
            style={{ animation: "fade-up .9s cubic-bezier(.22,1,.36,1) .45s both" }}
          >
            Boutique landscape design, build and care for homes that deserve an outdoors as considered as the
            inside.
          </p>

          <div
            className="mt-9 flex flex-wrap items-center gap-3"
            style={{ animation: "fade-up .9s cubic-bezier(.22,1,.36,1) .6s both" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-semibold text-forest-dark transition-all hover:bg-lime-soft hover:gap-3"
            >
              Explore Projects
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#contact"
              className="rounded-full border border-white/40 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white hover:text-forest"
            >
              Request a Quote
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 right-6 hidden items-center gap-3 rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-white backdrop-blur-md md:flex">
          <span className="text-3xl font-semibold leading-none text-lime">4.9</span>
          <div className="text-[11px] leading-tight">
            <div className="tracking-widest text-lime">★★★★★</div>
            <span className="text-white/75">252 Customer Reviews</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-3 px-2 py-12 sm:grid-cols-3">
        {trust.map((t) => (
          <div
            key={t}
            className="flex items-center justify-center gap-2 text-center text-[12px] font-medium text-ink/70"
          >
            <Leaf className="h-4 w-4 shrink-0 text-lime" />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
