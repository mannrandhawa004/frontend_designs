import { motion } from "framer-motion";
import ArrowField from "./ArrowField";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[#020617]">
      {/* base vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_50%_0%,#0b1b45_0%,#060d24_45%,#020617_100%)]" />
      {/* arrows */}
      <div className="absolute inset-0">
        <ArrowField className="h-full w-full arrow-mask-fade" />
      </div>
      {/* soft blue side glows */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-600/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-[140px]" />

      <div className="relative z-10 mx-auto flex min-h-[92vh] max-w-[1200px] flex-col items-center justify-center px-5 pb-36 pt-36 text-center md:pb-44">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 font-mono text-[10px] tracking-[0.18em] text-[#c3d6f5] backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse-slow rounded-[2px] bg-[#bcd8ff]" />
          NEW: AI-POWERED AUTOMATION PLATFORM
        </motion.div>

        <h1 className="max-w-[920px] text-balance text-[42px] font-[350] leading-[1.02] tracking-[-0.03em] text-[#c9dcf4] sm:text-[64px] md:text-[84px]">
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            AI That{" "}
            <span className="font-serif italic font-normal text-[#d8e9ff]">
              Connects Your
            </span>
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.22 }}
          >
            <span className="font-serif italic font-normal text-[#d8e9ff]">
              Tools
            </span>{" "}
            and Gets Work Done
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#cta"
            className="group rounded-[8px] bg-[#eef4ff] px-5 py-2.5 font-mono text-[11px] font-medium tracking-[0.12em] text-black shadow-[0_0_40px_rgba(188,216,255,0.35)] transition hover:bg-white hover:shadow-[0_0_60px_rgba(188,216,255,0.55)]"
          >
            START BUILDING
          </a>
          <a
            href="#about"
            className="rounded-[8px] border border-white/10 bg-black/70 px-5 py-2.5 font-mono text-[11px] tracking-[0.12em] text-white backdrop-blur transition hover:border-white/25 hover:bg-black"
          >
            EXPLORE LUMINA
          </a>
        </motion.div>

        {/* mini stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-14 flex items-center gap-6 font-mono text-[10px] tracking-[0.16em] text-[#7d9cc8]"
        >
          <span>12K+ TEAMS</span>
          <span className="h-3 w-px bg-white/15" />
          <span>99.99% UPTIME</span>
          <span className="h-3 w-px bg-white/15" />
          <span className="hidden sm:inline">SOC 2 TYPE II</span>
        </motion.div>
      </div>

      {/* bottom bright glow blending into next section */}
      <div className="absolute inset-x-0 bottom-0 z-10 h-[220px] md:h-[280px]">
        <div className="hero-glow-bottom absolute inset-0" />
        {/* thin amber divider line like screenshot */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-200/60 to-transparent" />
      </div>

      {/* bottom center scroll hint */}
      <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-[#0b1533]/60 md:flex">
        <span className="h-8 w-px animate-pulse bg-[#0b1533]/30" />
      </div>
    </section>
  );
}
