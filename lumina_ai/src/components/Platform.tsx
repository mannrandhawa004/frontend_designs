import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LuminaMark } from "./Navbar";

export default function Platform() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const glowOpacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-[#04070f]">
      {/* top deep blue wash */}
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(70%_100%_at_50%_0%,#1e4fd8_0%,#122a6e_35%,transparent_75%)] opacity-90" />
      <div className="absolute inset-0 dot-grid-faint opacity-60 [mask-image:radial-gradient(70%_60%_at_50%_20%,black,transparent)]" />
      {/* faint vertical grid lines */}
      <div className="absolute inset-0 mx-auto hidden max-w-[1400px] grid-cols-4 px-10 md:grid">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="border-l border-white/[0.05]" />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px] px-5 pb-10 pt-20 text-center md:pt-28">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-balance text-[28px] font-[340] leading-[1.15] tracking-[-0.02em] text-white sm:text-[36px] md:text-[44px]"
        >
          Build better products.
          <br />
          SDKs for your users, MCP servers for
          <br className="hidden md:block" /> LLMs. On a platform made for your
          team.
        </motion.p>

        {/* center icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-12 flex justify-center"
        >
          <motion.div style={{ opacity: glowOpacity }} className="relative">
            <div className="absolute -inset-6 rounded-[28px] bg-blue-500/25 blur-2xl" />
            <div className="relative grid h-[84px] w-[84px] place-items-center rounded-[20px] border border-white/10 bg-gradient-to-b from-[#111a2e] to-black shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_20px_60px_rgba(0,0,0,0.6)]">
              <LuminaMark className="h-12 w-12 text-[#d8e9ff]" />
              <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/10" />
            </div>
            {/* vertical line down */}
            <div className="absolute left-1/2 top-full h-[120px] w-px -translate-x-1/2 bg-gradient-to-b from-[#7aa8ff]/80 via-[#7aa8ff]/30 to-transparent md:h-[150px]" />
          </motion.div>
        </motion.div>
      </div>

      {/* bottom divider */}
      <div className="relative z-10 mt-[130px] md:mt-[160px]">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7aa8ff]/50 to-transparent" />
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          <div className="h-[26px] w-px mx-auto bg-[#7aa8ff]/40" style={{ marginLeft: "50%" }} />
        </div>
      </div>
    </section>
  );
}
