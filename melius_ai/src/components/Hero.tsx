import { useEffect, useRef, useState } from "react";
import { heroFrames } from "../lib/assets";

const WORDS = ["image", "video", "audio", "world", "story"];

const PROMPTS = [
  "a 9:16 launch film for the melon energy drink",
  "a pack shot lit like a 90s perfume ad",
  "a 30s voiceover in a warm, dry tone",
  "six campaign variants, same grade",
];

const TRUSTED = [
  "Ogilvy",
  "A24",
  "Nike",
  "Pentagram",
  "Wieden+Kennedy",
  "Mojo Supermarket",
  "Buck",
  "Mother",
  "Droga5",
];

function useRadius() {
  const [r, setR] = useState(640);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      setR(w < 640 ? 290 : w < 1024 ? 440 : w < 1400 ? 570 : w < 1700 ? 690 : 790);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  return r;
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [promptIdx, setPromptIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const radius = useRadius();
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 2300);
    return () => clearInterval(t);
  }, []);

  // typewriter for the prompt field
  useEffect(() => {
    const full = PROMPTS[promptIdx];
    let i = 0;
    let hold = 0;
    const t = setInterval(() => {
      if (i <= full.length) {
        setTyped(full.slice(0, i));
        i += 1;
      } else {
        hold += 1;
        if (hold > 26) {
          setPromptIdx((p) => (p + 1) % PROMPTS.length);
        }
      }
    }, 55);
    return () => clearInterval(t);
  }, [promptIdx]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = stage.current;
      if (!el) return;
      const b = el.getBoundingClientRect();
      const nx = (e.clientX - b.left) / b.width - 0.5;
      const ny = (e.clientY - b.top) / b.height - 0.5;
      setTilt({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const n = heroFrames.length;

  return (
    <section id="top" data-fx="hero" className="relative overflow-hidden bg-bone text-ink">
      <div className="relative mx-auto max-w-[1500px] px-4 pb-16 pt-[96px] sm:pt-[110px]">
        {/* headline */}
        <h1
          data-fx="hero-title"
          className="relative z-20 text-center font-display text-[34px] leading-[1.05] tracking-[-0.02em] text-ink sm:text-[52px] lg:text-[64px]"
        >
          <span data-fx="hero-word" className="inline-block">
            Create
          </span>{" "}
          <span data-fx="hero-word" className="inline-block">
            any
          </span>{" "}
          <span
            data-fx="hero-word"
            className="relative inline-block overflow-hidden align-bottom"
            style={{ minWidth: "2.4em" }}
          >
            <span key={wordIdx} className="animate-word inline-block italic">
              {WORDS[wordIdx]}
            </span>
          </span>{" "}
          <span data-fx="hero-word" className="inline-block">
            you
          </span>{" "}
          <span data-fx="hero-word" className="inline-block">
            imagine
          </span>
        </h1>

        {/* 3D ring of frames */}
        <div
          ref={stage}
          data-fx="hero-ring"
          className="pointer-events-none relative z-10 mx-auto -mt-10 h-[270px] sm:-mt-14 sm:h-[340px] lg:-mt-20 lg:h-[400px]"
          style={{ perspective: "1000px", perspectiveOrigin: "50% 55%" }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0 transition-transform duration-500 ease-out"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${tilt.x * 7}deg) rotateX(${-tilt.y * 4}deg)`,
            }}
          >
            {heroFrames.map((f, i) => {
              const t = n === 1 ? 0 : i / (n - 1);
              const angle = -92 + t * 184;
              const edge = Math.abs(angle) / 92;
              return (
                <div
                  key={f.src}
                  className="absolute overflow-hidden rounded-[10px] bg-neutral-300 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.45)]"
                  style={{
                    width: 232,
                    height: 330,
                    marginLeft: -116,
                    marginTop: -165,
                    transform: `rotateY(${angle}deg) translateZ(${-radius}px) rotateY(${-angle * 0.45}deg)`,
                    filter: `brightness(${0.78 + edge * 0.22}) saturate(${0.9 + edge * 0.2})`,
                    animation: `frame-in 0.9s cubic-bezier(0.19,1,0.22,1) ${0.06 * i}s both`,
                  }}
                >
                  <img
                    src={f.src}
                    alt={f.alt}
                    loading={i > 2 && i < n - 2 ? "lazy" : "eager"}
                    className="h-full w-full object-cover"
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* copy + prompt */}
        <div data-fx="hero-copy" className="relative z-20 mx-auto mt-6 max-w-[520px] text-center sm:mt-10">
          <p className="text-[13px] leading-[1.7] text-ink/70 sm:text-[14px]">
            AI agents for creative work.
            <br />
            Bring your creative vision and collaborate with AI agents until the
            <br className="hidden sm:block" /> images, video, and audio land exactly as you imagined.
          </p>

          <div className="mx-auto mt-7 flex w-full max-w-[420px] items-center gap-2 rounded-full bg-[#171513] p-[6px] pl-3 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)]">
            <div className="flex items-center -space-x-1.5">
              {["#ff4f17", "#2f6bff", "#2ec27e"].map((c) => (
                <span
                  key={c}
                  className="h-[14px] w-[14px] rounded-full border border-[#171513]"
                  style={{ background: c }}
                />
              ))}
            </div>
            <div className="flex-1 overflow-hidden whitespace-nowrap text-left text-[12.5px] text-white/50">
              <span className="text-white/80">Make </span>
              {typed}
              <span className="animate-caret">|</span>
            </div>
            <button
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-brand"
              aria-label="Generate"
            >
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none">
                <path d="M7 11.5V2.5M7 2.5L3 6.5M7 2.5l4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* trusted marquee */}
        <div className="relative z-20 mt-14">
          <p className="text-center text-[10.5px] uppercase tracking-[0.22em] text-ink/35">
            Trusted by creatives from
          </p>
          <div className="relative mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            <div data-fx="marquee">
              <div className="animate-marquee flex w-max gap-14">
                {[...TRUSTED, ...TRUSTED].map((name, i) => (
                  <span
                    key={`${name}-${i}`}
                    className="whitespace-nowrap font-display text-[19px] text-ink/40"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
