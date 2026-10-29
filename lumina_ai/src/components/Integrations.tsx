import { motion } from "framer-motion";
import {
  MessagesSquare, GitBranch, Kanban, PenTool, Globe, Code2, Database, Mail,
  MessageSquare, Calendar, Cloud, FileText, SquareKanban, Webhook,
} from "lucide-react";

const apps = [
  { icon: MessagesSquare, name: "Slack" },
  { icon: GitBranch, name: "GitHub" },
  { icon: Mail, name: "Gmail" },
  { icon: Calendar, name: "Calendar" },
  { icon: Database, name: "Postgres" },
  { icon: MessageSquare, name: "Intercom" },
  { icon: PenTool, name: "Figma" },
  { icon: Kanban, name: "Trello" },
  { icon: Cloud, name: "AWS" },
  { icon: FileText, name: "Notion" },
  { icon: SquareKanban, name: "Linear" },
  { icon: Webhook, name: "Webhooks" },
  { icon: Code2, name: "SDK" },
  { icon: Globe, name: "Chrome" },
];

const logos = ["VERTEX", "NORTHWIND", "ACME CORP", "HELIOS", "FRAMEWORK", "OSLO", "MERIDIAN", "LATTICE"];

export default function Integrations() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.07] bg-[#030610]">
      {/* logo marquee */}
      <div className="border-b border-white/[0.07] py-7">
        <p className="mb-5 text-center font-mono text-[10px] tracking-[0.22em] text-white/35">TRUSTED BY 12,000+ TEAMS</p>
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-max animate-marquee gap-14 pr-14">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="whitespace-nowrap text-[18px] font-semibold tracking-[0.08em] text-white/25">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
        <div className="mx-auto max-w-[680px] text-center">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-emerald-300" />
            200+ INTEGRATIONS
          </div>
          <h2 className="mt-5 text-balance text-[30px] font-[380] leading-[1.08] tracking-tight text-white md:text-[46px]">
            Your stack, <span className="font-serif italic text-[#bcd8ff]">already connected.</span>
          </h2>
          <p className="mt-4 text-[15px] text-white/50">OAuth once. Lumina keeps schemas, tokens, and retries handled forever.</p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
          {apps.map((a, i) => (
            <motion.div
              key={a.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 7) * 0.06, duration: 0.5 }}
              className="group flex flex-col items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] py-6 transition hover:border-[#7aa8ff]/40 hover:bg-[#7aa8ff]/[0.06]"
            >
              <a.icon className="h-6 w-6 text-white/55 transition group-hover:text-[#bcd8ff]" />
              <span className="font-mono text-[10px] tracking-[0.1em] text-white/40 group-hover:text-white/70">{a.name.toUpperCase()}</span>
            </motion.div>
          ))}
        </div>

        {/* stats */}
        <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {[
            { k: "10M+", v: "runs / day" },
            { k: "180ms", v: "median latency" },
            { k: "99.99%", v: "uptime SLA" },
            { k: "4.9/5", v: "developer rating" },
          ].map((s) => (
            <div key={s.v} className="bg-[#05080f] px-6 py-8 text-center">
              <p className="text-[28px] font-light tracking-tight text-white md:text-[34px]">{s.k}</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-white/40">{s.v.toUpperCase()}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
