import { useEffect, useRef, useState } from "react";
import BlueSphere from "./components/BlueSphere";
import DotSphere from "./components/DotSphere";
import Reveal from "./components/Reveal";

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

// Bouncy cubic ease-out for super smooth deceleration
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);

type Anchor = { x: number; y: number; w: number };

export default function App() {
  const blueAnchorRef = useRef<HTMLDivElement>(null);
  const dotAnchorRef = useRef<HTMLDivElement>(null);
  const dotTriggerRef = useRef<HTMLDivElement>(null);
  const darkSectionRef = useRef<HTMLElement>(null);

  const blueLayerRef = useRef<HTMLDivElement>(null);
  const dotLayerRef = useRef<HTMLDivElement>(null);
  const blueTrailRef = useRef<HTMLDivElement>(null);
  const dotTrailRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const [anchors, setAnchors] = useState<{ blue: Anchor; dot: Anchor } | null>(null);

  // Measure initial and resize layout coordinates of anchor placeholders
  useEffect(() => {
    const measure = () => {
      const b = blueAnchorRef.current?.getBoundingClientRect();
      const d = dotAnchorRef.current?.getBoundingClientRect();
      if (!b || !d) return;
      const sy = window.scrollY || window.pageYOffset;
      setAnchors({
        blue: { x: b.left, y: b.top + sy, w: b.width },
        dot: { x: d.left, y: d.top + sy, w: d.width },
      });
    };
    measure();
    // Delay slightly to handle font rendering and DOM adjustments
    const t = setTimeout(measure, 100);
    window.addEventListener("resize", measure);
    window.addEventListener("orientationchange", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
      window.removeEventListener("orientationchange", measure);
    };
  }, []);

  // Smooth scroll interpolation loop (Damped Spring feeling)
  useEffect(() => {
    if (!anchors) return;

    let raf = 0;
    let currentScroll = window.scrollY || window.pageYOffset;
    let lastScroll = currentScroll;

    const tick = () => {
      const targetScroll = window.scrollY || window.pageYOffset;

      // Extremely smooth liquid LERP factor
      currentScroll += (targetScroll - currentScroll) * 0.062;
      const velocity = currentScroll - lastScroll;
      lastScroll = currentScroll;

      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const trigger = dotTriggerRef.current;
      const dark = darkSectionRef.current;
      const triggerTop = trigger ? trigger.getBoundingClientRect().top + currentScroll : vh * 1.3;
      const darkTop = dark ? dark.getBoundingClientRect().top + currentScroll : vh * 2.3;

      // --- Progress Calculations ---
      const firstEnd = Math.max(vh * 0.9, triggerTop - vh * 0.45);
      const p1 = easeOutQuint(clamp(currentScroll / Math.max(1, firstEnd), 0, 1));

      const secondStart = firstEnd;
      const secondEnd = Math.max(secondStart + vh * 1.4, darkTop - vh * 0.02);
      const p2 = easeOutQuint(clamp((currentScroll - secondStart) / Math.max(1, secondEnd - secondStart), 0, 1));

      // --- 1. Blue Sphere: Down and Right with arc ---
      const bDX = Math.min(vw * 0.44, 580);
      const bDY = Math.min(vh * 1.0, 880);
      const bArc = Math.sin(p1 * Math.PI) * Math.min(vw * 0.08, 90);
      const bX = p1 * bDX + bArc;
      const bY = p1 * bDY;

      // Roll physics: direction-based 3D rotation axis
      const bDist = Math.sqrt(bX * bX + bY * bY);
      const bRollAxisX = bDist > 0.1 ? -bY / bDist : 0;
      const bRollAxisY = bDist > 0.1 ? bX / bDist : 1;
      // 94px rolling radius
      const bAngle = (bDist / 94) * (180 / Math.PI);

      const speed1 = Math.min(Math.abs(velocity) / 20, 1);
      const bScale = 1 - p1 * 0.08 + speed1 * 0.05;

      // --- 2. Dot Sphere: Down and Left with arc ---
      const dDX = -Math.min(vw * 0.44, 580);
      const dDY = Math.min(vh * 0.95, 820);
      const dArc = Math.sin(p2 * Math.PI) * -Math.min(vw * 0.07, 80);
      const dX = p2 * dDX + dArc;
      const dY = p2 * dDY;

      const dDist = Math.sqrt(dX * dX + dY * dY);
      const dRollAxisX = dDist > 0.1 ? -dY / dDist : 0;
      const dRollAxisY = dDist > 0.1 ? dX / dDist : 1;
      const dAngle = (dDist / 92) * (180 / Math.PI);

      const speed2 = Math.min(Math.abs(velocity) / 20, 1);
      const dScale = 1 + p2 * 0.06 + speed2 * 0.05;

      // --- Apply positions and scales ---
      if (blueLayerRef.current) {
        const screenX = anchors.blue.x + bX;
        const screenY = anchors.blue.y - currentScroll + bY;
        blueLayerRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${bScale})`;
        blueLayerRef.current.style.setProperty("--roll-x", bRollAxisX.toFixed(4));
        blueLayerRef.current.style.setProperty("--roll-y", bRollAxisY.toFixed(4));
        blueLayerRef.current.style.setProperty("--roll-angle", bAngle.toFixed(3));
      }
      if (dotLayerRef.current) {
        const screenX = anchors.dot.x + dX;
        const screenY = anchors.dot.y - currentScroll + dY;
        dotLayerRef.current.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${dScale})`;
        dotLayerRef.current.style.setProperty("--roll-x", dRollAxisX.toFixed(4));
        dotLayerRef.current.style.setProperty("--roll-y", dRollAxisY.toFixed(4));
        dotLayerRef.current.style.setProperty("--roll-angle", dAngle.toFixed(3));
      }

      // --- Motion trails: responsive squashing ---
      if (blueTrailRef.current) {
        const len = clamp(speed1 * 80, 0, 100);
        blueTrailRef.current.style.transform = `translate3d(${-bX * 0.1}px, ${-len * 0.5}px, 0) scale(${1 + speed1 * 0.4}, ${1 + len * 0.025})`;
        blueTrailRef.current.style.opacity = (speed1 * 0.65).toFixed(3);
      }
      if (dotTrailRef.current) {
        const len = clamp(speed2 * 80, 0, 100);
        dotTrailRef.current.style.transform = `translate3d(${-dX * 0.1}px, ${-len * 0.5}px, 0) scale(${1 + speed2 * 0.4}, ${1 + len * 0.025})`;
        dotTrailRef.current.style.opacity = (speed2 * 0.6).toFixed(3);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [anchors]);

  return (
    <div className="grain relative w-full">
      {/* Absolute overlay stage: keeps spheres floating perfectly on top of all page sections */}
      <div
        ref={stageRef}
        className="pointer-events-none fixed inset-0 z-40"
        style={{ opacity: anchors ? 1 : 0, transition: "opacity 0.5s ease" }}
        aria-hidden="true"
      >
        {/* Blue Sphere */}
        <div ref={blueLayerRef} className="absolute left-0 top-0 will-change-transform">
          <div className="relative" style={{ width: anchors?.blue.w ?? 260, height: anchors?.blue.w ?? 260 }}>
            {/* Dynamic trail blur */}
            <div
              ref={blueTrailRef}
              className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(130,195,255,0.85), rgba(30,85,215,0.3) 50%, transparent 75%)",
                transformOrigin: "50% 50%",
              }}
            />
            <BlueSphere className="absolute inset-0" />
          </div>
        </div>

        {/* Dot Sphere */}
        <div ref={dotLayerRef} className="absolute left-0 top-0 will-change-transform">
          <div className="relative" style={{ width: anchors?.dot.w ?? 240, height: anchors?.dot.w ?? 240 }}>
            {/* Dynamic trail blur */}
            <div
              ref={dotTrailRef}
              className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(255,255,255,0.9), rgba(210,58,34,0.4) 50%, transparent 75%)",
                transformOrigin: "50% 50%",
              }}
            />
            <DotSphere className="absolute inset-0" />
          </div>
        </div>
      </div>

      {/* ===================== BLUE SECTION ===================== */}
      <section
        className="relative overflow-hidden px-6 pb-24 pt-7 sm:px-10 md:pb-32 md:pt-9"
        style={{ background: "var(--blue)", borderBottomRightRadius: "42vw" }}
      >
        <div
          className="drift pointer-events-none absolute -left-24 top-10 h-[55vh] w-[55vh] rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(255,255,255,0.28), transparent 65%)" }}
        />
        <div
          className="drift pointer-events-none absolute bottom-0 right-0 h-[40vh] w-[40vh] rounded-full blur-3xl"
          style={{
            background: "radial-gradient(circle, rgba(10,30,120,0.45), transparent 70%)",
            animationDelay: "4s",
          }}
        />

        <header className="relative z-10 flex items-center justify-between text-[11px] font-semibold tracking-[0.18em] text-white/95 sm:text-xs">
          <span className="link-anim cursor-pointer">TEAM UINUGGET</span>
          <a href="mailto:teamuinugget@gmail.com" className="link-anim">
            TEAMUINUGGET@GMAIL.COM
          </a>
        </header>

        <div className="relative z-10 mt-10 flex flex-col items-start gap-10 md:mt-14 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="relative">
            <h1
              className="select-none font-display font-extrabold text-white tight"
              style={{ fontSize: "clamp(7rem, 25vw, 17rem)", textShadow: "0 14px 26px rgba(15,35,110,0.35)" }}
            >
              10k
            </h1>
            {/* Blue anchor placeholder */}
            <div
              ref={blueAnchorRef}
              className="absolute left-[24%] top-[10%] w-[clamp(170px,21vw,330px)]"
              style={{ aspectRatio: "1 / 1" }}
            />
          </div>

          <Reveal className="md:max-w-[42%]" delay={120}>
            <div className="flex items-start gap-3">
              <span className="mt-1 block h-12 w-[3px] bg-white" />
              <p className="font-display text-xl font-medium leading-tight text-white sm:text-2xl">
                FOLLOWERS ON
                <br />
                <span className="font-extrabold">DRIBBBLE</span>
              </p>
            </div>
            <h2
              className="mt-3 font-display font-extrabold lowercase text-white tight-ish"
              style={{ fontSize: "clamp(3rem,9vw,6.5rem)", lineHeight: 0.82 }}
            >
              follo
              <br />
              wers
            </h2>
          </Reveal>
        </div>

        <Reveal className="relative z-10 mt-16 md:mt-24" delay={200}>
          <div className="bar flex items-start gap-4 pl-2">
            <span className="mt-2 block h-12 w-[3px] bg-white" />
            <p className="font-display text-2xl font-semibold text-white sm:text-4xl" style={{ lineHeight: 1.05 }}>
              design is thinking
              <br />
              made visual
            </p>
          </div>
        </Reveal>
      </section>

      {/* ===================== WHITE SECTION ===================== */}
      <section className="relative px-6 pt-20 sm:px-10 md:pt-28">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16">
          <Reveal>
            <h3
              className="font-display font-extrabold lowercase text-[var(--ink)] tight"
              style={{ fontSize: "clamp(3rem,8vw,5.5rem)" }}
            >
              team
              <br />
              uinug
              <br />
              get
            </h3>
            <p className="mt-6 font-display text-sm font-extrabold tracking-[0.14em] text-[var(--ink)] sm:text-base">
              WE DESIGN YOUR DREAMS
            </p>
          </Reveal>

          <Reveal className="md:max-w-md" delay={140}>
            <p className="text-[15px] leading-relaxed text-[#3a4048] sm:text-base">
              The modern web world is not only about the websites with regular pieces of
              information and essence. Each of the websites represents the company and its
              philosophy. Users are more into browsers rather than storing information in a
              place. Nowadays it is a must for the websites to be flexible, open and quickly
              accessible and suitable on all smart devices including cell phones.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-16 md:mt-24">
          <h2
            className="whitespace-nowrap select-none font-display font-extrabold lowercase text-[var(--ink)] tight"
            style={{ fontSize: "clamp(8rem,33vw,26rem)", marginLeft: "-0.04em" }}
          >
            design
          </h2>
          <div ref={dotTriggerRef} className="absolute right-[6%] top-[-6%] h-0 w-0 md:right-[18%]" aria-hidden="true" />
          {/* Dot anchor placeholder */}
          <div
            ref={dotAnchorRef}
            className="absolute right-[6%] top-[-6%] w-[clamp(150px,20vw,300px)] md:right-[18%]"
            style={{ aspectRatio: "1 / 1" }}
          />
        </div>
      </section>

      {/* ===================== DARK SECTION ===================== */}
      <section ref={darkSectionRef} className="relative -mt-6 overflow-hidden bg-[var(--dark)] pt-16 text-white md:pt-24">
        <div className="relative mb-16 flex overflow-hidden border-y border-white/10 py-3 md:mb-24">
          <div className="flex shrink-0 animate-[marquee_22s_linear_infinite] whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="mx-6 font-display text-sm font-semibold tracking-[0.25em] text-white/70">
                HAPPY DESIGNING &nbsp;•&nbsp; TEAM UINUGGET &nbsp;•&nbsp; 10K STRONG
                &nbsp;•&nbsp; WE DESIGN YOUR DREAMS &nbsp;•&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col gap-12 px-6 pb-24 sm:px-10 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <h3 className="font-display font-extrabold lowercase tight" style={{ fontSize: "clamp(2.5rem,7vw,5rem)" }}>
              thank
              <br />
              you so
              <br />
              much
            </h3>
          </Reveal>

          <Reveal delay={120}>
            <div className="bar flex items-center gap-3 pl-2">
              <span className="block h-7 w-[3px] bg-white" />
              <p className="font-display text-2xl font-bold sm:text-3xl">Happy Designing</p>
            </div>
          </Reveal>
        </div>

        <div className="relative z-10 border-t border-white/10 px-6 py-5 sm:px-10">
          <p className="text-[11px] tracking-[0.12em] text-white/55">Designed by Surja Sen Das Raj</p>
        </div>
      </section>
    </div>
  );
}
