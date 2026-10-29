import { motion } from "framer-motion";
import { ArrowUpRight, Terminal } from "lucide-react";
import { LuminaMark } from "./Navbar";

export default function CTA() {
  return (
    <section id="cta" className="relative overflow-hidden border-t border-white/[0.07] bg-[#020617] px-5 py-20 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(59,130,246,0.22),transparent)]" />
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto max-w-[1000px] overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0d1834] via-[#070d20] to-black px-6 py-16 text-center md:px-16 md:py-20"
      >
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#7aa8ff]/70 to-transparent" />
        <div className="dot-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]" />

        <div className="relative">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-white/15 bg-black shadow-[0_0_50px_rgba(59,130,246,0.4)]">
            <LuminaMark className="h-9 w-9 text-[#d8e9ff]" />
          </div>
          <h2 className="mx-auto mt-8 max-w-[640px] text-balance text-[34px] font-[380] leading-[1.05] tracking-tight text-white md:text-[56px]">
            Start building with <span className="font-serif italic text-[#bcd8ff]">Lumina</span> today
          </h2>
          <p className="mx-auto mt-4 max-w-[440px] text-[15px] text-white/55">
            Free to start. No credit card. Deploy your first automation in under five minutes.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#home"
              className="group inline-flex items-center gap-2 rounded-[10px] bg-white px-6 py-3 font-mono text-[12px] font-medium tracking-[0.1em] text-black transition hover:bg-[#d8e9ff]"
            >
              START BUILDING
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-[10px] border border-white/15 bg-white/[0.04] px-6 py-3 font-mono text-[12px] tracking-[0.1em] text-white transition hover:border-white/30"
            >
              <Terminal className="h-4 w-4" />
              VIEW DOCS
            </a>
          </div>

          <div className="mx-auto mt-10 flex max-w-[520px] items-center gap-3 rounded-xl border border-white/10 bg-black/70 px-4 py-3 text-left">
            <span className="font-mono text-[12px] text-emerald-300">$</span>
            <code className="truncate font-mono text-[12px] text-white/70">npm i -g lumina && lumina init my-first-agent</code>
            <span className="ml-auto hidden shrink-0 cursor-pointer rounded-md border border-white/10 px-2 py-1 font-mono text-[10px] text-white/50 hover:text-white sm:block">COPY</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
