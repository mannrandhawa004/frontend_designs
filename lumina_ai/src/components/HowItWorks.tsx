import { motion } from "framer-motion";
import { BrainCircuit, Plug2, Rocket, ArrowRight, Check } from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Plug2,
    title: "Connect everything",
    desc: "OAuth your stack in clicks — Salesforce, Slack, Linear, Notion, Postgres. 200+ native connectors with schema-aware sync.",
    code: "lumina connect salesforce --sync realtime",
  },
  {
    n: "02",
    icon: BrainCircuit,
    title: "Describe the outcome",
    desc: "Tell Lumina what 'done' looks like in plain English. It drafts the workflow, edge cases, and tests — you approve.",
    code: 'lumina build "route enterprise leads < 1 min"',
  },
  {
    n: "03",
    icon: Rocket,
    title: "Deploy & let it run",
    desc: "One click to production with versioning, rollbacks, and MCP endpoints your agents can call securely.",
    code: "lumina deploy --env prod --mcp enabled",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative overflow-hidden border-t border-white/[0.07] bg-[#030610]">
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_50%_0%,rgba(59,130,246,0.12),transparent)]" />
      <div className="relative mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70">
              <span className="h-1.5 w-1.5 rounded-[2px] bg-[#7aa8ff]" />
              HOW IT WORKS
            </div>
            <h2 className="mt-5 max-w-[560px] text-[32px] font-[380] leading-[1.05] tracking-tight text-white md:text-[52px]">
              From idea to automation in <span className="font-serif italic text-[#bcd8ff]">minutes</span>, not sprints.
            </h2>
          </div>
          <p className="max-w-[360px] text-[15px] leading-relaxed text-white/50">
            No brittle zaps. No glue code to maintain. Lumina compiles intent into reliable, observable workflows.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.01] p-7 transition hover:border-white/20"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-black/50">
                  <s.icon className="h-5 w-5 text-[#bcd8ff]" />
                </span>
                <span className="font-mono text-[12px] text-white/30">{s.n}</span>
              </div>
              <h3 className="mt-6 text-[20px] font-medium tracking-tight text-white">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-white/55">{s.desc}</p>
              <div className="mt-6 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2.5 font-mono text-[11px] text-[#9abbe8]">
                <span className="text-emerald-300">$</span>
                <span className="truncate">{s.code}</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#7aa8ff] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>

        {/* live pipeline strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/50"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-[11px] text-white/40">lumina — production pipeline</span>
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-400/10 px-3 py-1 font-mono text-[10px] text-emerald-200 sm:flex">
              <Check className="h-3 w-3" /> ALL SYSTEMS GO
            </span>
          </div>
          <div className="flex items-center gap-3 overflow-x-auto px-5 py-5">
            {["Trigger: new lead", "Enrich + score", "Route owner", "Draft outreach", "Sync CRM", "Notify Slack"].map((step, i, arr) => (
              <div key={step} className="flex shrink-0 items-center gap-3">
                <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-md bg-[#7aa8ff]/15 font-mono text-[10px] text-[#bcd8ff]">{i + 1}</span>
                  <span className="whitespace-nowrap text-[13px] text-white/85">{step}</span>
                  <span className="font-mono text-[10px] text-emerald-300/80">✓</span>
                </div>
                {i < arr.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-white/25" />}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
