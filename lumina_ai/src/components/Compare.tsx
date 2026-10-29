import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

const rows: { feature: string; lumina: "yes" | "no" | "partial"; zapier: "yes" | "no" | "partial"; code: "yes" | "no" | "partial" }[] = [
  { feature: "Natural-language workflow builder", lumina: "yes", zapier: "partial", code: "no" },
  { feature: "MCP servers for LLM agents", lumina: "yes", zapier: "no", code: "partial" },
  { feature: "Sub-second execution (p50 < 200ms)", lumina: "yes", zapier: "no", code: "partial" },
  { feature: "Versioning, rollbacks & audit log", lumina: "yes", zapier: "partial", code: "no" },
  { feature: "Type-safe SDKs (TS / Python / Go)", lumina: "yes", zapier: "no", code: "partial" },
  { feature: "Human-in-the-loop approvals", lumina: "yes", zapier: "partial", code: "no" },
  { feature: "SOC 2 + EU data residency", lumina: "yes", zapier: "yes", code: "no" },
];

function Cell({ v, highlight }: { v: "yes" | "no" | "partial"; highlight?: boolean }) {
  if (v === "yes")
    return (
      <span className={`inline-grid h-7 w-7 place-items-center rounded-full ${highlight ? "bg-white text-black" : "bg-emerald-400/15 text-emerald-300"}`}>
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  if (v === "partial")
    return (
      <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] text-white/50">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  return (
    <span className="inline-grid h-7 w-7 place-items-center rounded-full bg-white/[0.04] text-white/25">
      <X className="h-3.5 w-3.5" />
    </span>
  );
}

export default function Compare() {
  return (
    <section id="compare" className="relative border-t border-white/[0.07] bg-[#04070f]">
      <div className="mx-auto max-w-[1100px] px-5 py-20 md:py-28">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-white/70" />
            COMPARE
          </div>
          <h2 className="mx-auto mt-5 max-w-[640px] text-balance text-[32px] font-[380] leading-[1.05] tracking-tight text-white md:text-[48px]">
            Why teams switch from zaps <span className="font-serif italic text-[#bcd8ff]">and glue code</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-12 overflow-hidden rounded-2xl border border-white/10"
        >
          <div className="grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] items-center gap-2 border-b border-white/10 bg-white/[0.04] px-4 py-4 backdrop-blur md:px-8">
            <span className="font-mono text-[10px] tracking-[0.16em] text-white/40">CAPABILITY</span>
            <span className="text-center">
              <span className="inline-block rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-black">Lumina</span>
            </span>
            <span className="text-center font-mono text-[11px] tracking-wide text-white/45">ZAPIER</span>
            <span className="text-center font-mono text-[11px] tracking-wide text-white/45">DIY CODE</span>
          </div>
          {rows.map((r, i) => (
            <div
              key={r.feature}
              className={`grid grid-cols-[1.4fr_0.8fr_0.8fr_0.8fr] items-center gap-2 px-4 py-4 md:px-8 ${
                i % 2 === 0 ? "bg-white/[0.015]" : "bg-transparent"
              } border-b border-white/[0.06] last:border-0 transition hover:bg-white/[0.04]`}
            >
              <span className="text-[13px] text-white/80 md:text-[14px]">{r.feature}</span>
              <span className="text-center"><Cell v={r.lumina} highlight /></span>
              <span className="text-center"><Cell v={r.zapier} /></span>
              <span className="text-center"><Cell v={r.code} /></span>
            </div>
          ))}
        </motion.div>

        <p className="mt-6 text-center font-mono text-[11px] tracking-wide text-white/35">
          Benchmarked on 10M production runs · p50 latency, March 2026
        </p>
      </div>
    </section>
  );
}
