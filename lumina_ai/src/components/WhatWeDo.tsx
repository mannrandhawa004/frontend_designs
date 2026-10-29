import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Bell, Inbox, Workflow, Zap } from "lucide-react";
import { LuminaMark } from "./Navbar";

const tabs = [
  {
    id: "gtm",
    label: "GTM",
    headline: "GTM at full throttle.",
    body: "Execute your revenue strategy with precision. Design powerful workflows, route leads instantly, and sync every touchpoint.",
    points: ["Lead routing in <40ms", "Salesforce + HubSpot native", "AI enrichment built-in"],
    cards: [
      { icon: Zap, title: "Lead scored", meta: "98 · Enterprise", active: true },
      { icon: Inbox, title: "Sequenced", meta: "Outreach · 4 steps", active: false },
    ],
  },
  {
    id: "support",
    label: "SUPPORT",
    headline: "Support that resolves itself.",
    body: "Triage, summarize, and answer tickets before a human ever opens them. Escalate only what truly needs you.",
    points: ["72% auto-resolution", "Zendesk + Intercom sync", "CSAT +12pts avg"],
    cards: [
      { icon: Bell, title: "Ticket triaged", meta: "P1 · Billing", active: true },
      { icon: Workflow, title: "Macro applied", meta: "Refund · Approved", active: false },
    ],
  },
  {
    id: "eng",
    label: "ENGINEERING",
    headline: "Ship without the toil.",
    body: "Turn alerts into actions. Auto-create issues, roll back deploys, and page the right owner with full context.",
    points: ["PagerDuty + Linear", "MCP servers for agents", "Audit log by default"],
    cards: [
      { icon: Workflow, title: "Incident opened", meta: "API · p99 spike", active: true },
      { icon: Zap, title: "Rollback done", meta: "v2.14.1 · 38s", active: false },
    ],
  },
];

export default function WhatWeDo() {
  const [active, setActive] = useState(tabs[0]);

  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#05080f]">
      <div className="mx-auto grid max-w-[1400px] md:grid-cols-[1.05fr_0.95fr]">
        {/* left */}
        <div className="relative border-r border-white/[0.07] px-5 py-14 md:px-12 md:py-20">
          <div className="inline-flex items-center gap-2 rounded-[6px] border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-[2px] bg-white/70" />
            WHAT WE DO
          </div>

          <div className="mt-6 flex gap-2">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t)}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] transition ${
                  active.id === t.id
                    ? "bg-white text-black"
                    : "border border-white/12 text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="mt-7 max-w-[520px] text-[32px] font-[400] leading-[1.05] tracking-[-0.02em] md:text-[44px]">
                <span className="text-white">{active.headline}</span>{" "}
                <span className="text-white/40">{active.body}</span>
              </h2>

              <ul className="mt-8 space-y-3">
                {active.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-[14px] text-white/70">
                    <span className="grid h-6 w-6 place-items-center rounded-full border border-white/10 bg-white/[0.05]">
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>

              <a href="#how" className="mt-9 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-white/80 underline-offset-8 hover:text-white hover:underline">
                SEE IT IN ACTION <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* right visual */}
        <div className="dot-grid relative min-h-[480px] overflow-hidden bg-[#04060c] p-8 md:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,rgba(59,130,246,0.12),transparent)]" />
          {/* blueprint connector lines */}
          <svg className="absolute inset-0 h-full w-full" fill="none">
            <path d="M 70% 30% L 88% 30% L 88% 55% L 72% 55%" stroke="rgba(154,187,232,0.35)" strokeDasharray="5 5" strokeWidth="1" />
            <circle cx="70%" cy="30%" r="3" fill="#7aa8ff" />
            <circle cx="72%" cy="55%" r="3" fill="none" stroke="rgba(154,187,232,0.6)" />
          </svg>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45 }}
              className="relative z-10 flex h-full items-center justify-center gap-5"
            >
              {active.cards.map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: i === 0 ? 18 : -10 }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className={`relative w-[190px] rounded-[18px] border p-2 backdrop-blur-xl md:w-[220px] ${
                    c.active
                      ? "border-white/20 bg-white/[0.06] shadow-[0_20px_80px_rgba(59,130,246,0.25)]"
                      : "border-white/10 bg-black/60"
                  }`}
                >
                  <div className="grid h-[150px] place-items-center rounded-[12px] border border-white/10 bg-gradient-to-b from-[#141e36] to-black md:h-[170px]">
                    <div className={`grid h-16 w-16 place-items-center rounded-2xl border ${c.active ? "border-white/20 bg-white/[0.08]" : "border-white/10 bg-white/[0.03]"}`}>
                      {i === 0 ? <LuminaMark className="h-9 w-9 text-[#d8e9ff]" /> : <c.icon className="h-7 w-7 text-white/70" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-2 py-3">
                    <div>
                      <p className="text-[13px] font-medium text-white">{c.title}</p>
                      <p className="font-mono text-[10px] tracking-wide text-white/40">{c.meta}</p>
                    </div>
                    <span className={`h-2 w-2 rounded-full ${c.active ? "bg-emerald-400 shadow-[0_0_12px_#34d399]" : "bg-white/20"}`} />
                  </div>
                  {c.active && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-0.5 font-mono text-[9px] tracking-[0.14em] text-emerald-200 backdrop-blur">
                      LIVE
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* bottom log bar */}
          <div className="absolute inset-x-6 bottom-6 z-10 flex items-center gap-3 rounded-xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <p className="truncate font-mono text-[11px] text-white/60">
              <span className="text-white/90">lumina run</span> — gtm.route → scored 98 → sequenced in 1.2s
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
