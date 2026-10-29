import { useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight, CheckIcon, PlusIcon, Reveal, SectionLabel } from "./ui";

const capabilityGroups = [
  {
    label: "Strategy",
    items: ["Product discovery", "Technical due diligence", "Delivery model design", "Fractional leadership"],
  },
  {
    label: "Design",
    items: ["UX & interaction design", "Design systems", "Rapid prototyping", "Usability validation"],
  },
  {
    label: "Engineering",
    items: ["Web platforms", "Mobile applications", "Platform modernization", "QA automation & DevOps"],
  },
  {
    label: "Applied AI",
    items: ["Opportunity mapping", "LLM product features", "Evaluations & guardrails", "Workflow automation"],
  },
];

const stack = ["TypeScript", "React", "Next.js", "Node", "Python", "React Native", "AWS", "Postgres", "LLMs"];

function CardMeta({ index, tag, dark = false }: { index: string; tag: string; dark?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={cn("font-mono text-[10px] tracking-[0.08em]", dark ? "text-ink/45" : "text-ink/50")}>
        {index}
      </span>
      <span
        className={cn(
          "rounded-full border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.1em]",
          dark ? "border-ink/15 text-ink/55" : "border-ink/10 text-ink/45",
        )}
      >
        {tag}
      </span>
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-4 text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-[1.08] tracking-[-0.04em]">
      {children}
    </h3>
  );
}

function CardLink({ onClick, label = "Discuss this service" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/link mt-5 inline-flex w-fit items-center gap-2 border-b border-ink/20 pb-1 text-[12px] font-medium text-ink/70 transition hover:border-ink/50 hover:text-ink"
    >
      {label}
      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
    </button>
  );
}

export function Development({ onContact }: { onContact: (interest?: string) => void }) {
  const [showCaps, setShowCaps] = useState(false);

  return (
    <section id="services" className="scroll-mt-20 border-t border-line/70 bg-paper pb-20 pt-20 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <SectionLabel className="text-ink">What we do</SectionLabel>
            <h2 className="mt-5 max-w-[600px] text-[clamp(2.5rem,5vw,4.35rem)] font-medium leading-[0.96] tracking-[-0.055em]">
              Effective software
              <br />
              development<span className="text-sun">.</span>
            </h2>
          </Reveal>

          <Reveal delay={90} className="md:col-span-5 md:pb-1">
            <div className="flex flex-col items-start gap-5 md:items-end">
              <p className="max-w-[370px] text-[14px] leading-[1.65] text-muted">
                One senior team across product thinking, interface design, engineering, and AI.
                Small enough to move quickly. Experienced enough to get it right.
              </p>
              <button
                type="button"
                onClick={() => setShowCaps((value) => !value)}
                aria-expanded={showCaps}
                aria-controls="capability-index"
                className="group inline-flex h-10 items-center gap-2.5 rounded-[8px] border border-ink/20 px-4 text-[12.5px] font-medium text-ink transition duration-300 hover:border-ink/40 hover:bg-white/60"
              >
                {showCaps ? "Hide capabilities" : "All capabilities"}
                <PlusIcon
                  className={cn("size-3.5 transition-transform duration-300", showCaps && "rotate-45")}
                />
              </button>
            </div>
          </Reveal>
        </div>

        <div className="mt-11 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <article className="group flex h-full flex-col rounded-[20px] border border-ink/[0.07] bg-[#fcfbf6] p-4 transition-shadow duration-300 hover:shadow-[0_18px_50px_-30px_rgba(25,25,27,0.35)] sm:p-5 lg:min-h-[470px]">
              <CardMeta index="01" tag="Product design" />
              <div className="relative mt-4 h-[240px] overflow-hidden rounded-xl bg-[#eeebe2] sm:h-[260px]">
                <img
                  src="/images/wireframe.jpg"
                  alt="Sketchbook showing a journey map and mobile wireframes"
                  loading="lazy"
                  className="size-full object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/70 px-2.5 py-1.5 text-[10px] font-medium text-ink/70 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-sun" />
                  Research → prototype → validate
                </span>
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <CardTitle>Clarity before you commit a single sprint.</CardTitle>
                <p className="mt-2.5 max-w-[400px] text-[12.5px] leading-[1.6] text-muted">
                  We design the thing worth building — user journeys, prototypes, and product
                  decisions grounded in evidence, not opinion.
                </p>
                <div className="mt-auto">
                  <CardLink onClick={() => onContact("Product design")} />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-7">
            <article className="group flex h-full flex-col rounded-[20px] bg-[#f5e5a6] p-4 sm:p-5 lg:min-h-[470px]">
              <CardMeta index="02" tag="Mobile apps" />
              <div className="relative mt-4 h-[245px] overflow-hidden rounded-xl bg-[#f6e7af] sm:h-[270px]">
                <img
                  src="/images/mobile-app.jpg"
                  alt="Two smartphones showing an editorial commerce app interface"
                  loading="lazy"
                  className="size-full object-cover object-[50%_55%] transition duration-700 ease-out group-hover:scale-[1.035]"
                />
                <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/65 px-2.5 py-1.5 text-[10px] font-medium text-ink/70 backdrop-blur-md">
                    <CheckIcon className="size-3" /> App Store ready
                  </span>
                  <span className="rounded-full bg-ink/85 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wide text-white/85 backdrop-blur">
                    iOS + Android
                  </span>
                </div>
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <CardTitle>Apps your customers keep coming back to.</CardTitle>
                <p className="mt-2.5 max-w-[440px] text-[12.5px] leading-[1.6] text-ink/60">
                  Consumer-grade polish with enterprise-grade foundations. One codebase, both
                  stores, and a release process your team can actually run.
                </p>
                <div className="mt-auto">
                  <CardLink onClick={() => onContact("Mobile applications")} />
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-7">
            <article className="group flex h-full flex-col overflow-hidden rounded-[20px] bg-[#e7e9e1] p-4 sm:p-5 lg:min-h-[460px]">
              <CardMeta index="03" tag="Web platforms" />
              <div className="mt-5 flex flex-1 flex-col">
                <CardTitle>Complex software that feels remarkably simple.</CardTitle>
                <p className="mt-2.5 max-w-[460px] text-[12.5px] leading-[1.6] text-ink/55">
                  Customer portals, internal tools, and data-heavy SaaS — built to make the
                  complicated part disappear.
                </p>
              </div>

              <div aria-hidden="true" className="relative mt-6 h-[235px] overflow-hidden rounded-xl bg-[#d9dfd2] sm:h-[255px]">
                <div className="mx-auto mt-5 w-[88%] max-w-[480px] overflow-hidden rounded-t-lg bg-white shadow-[0_20px_50px_-18px_rgba(20,30,15,0.45)] ring-1 ring-ink/10 transition-transform duration-700 ease-out group-hover:-translate-y-1">
                  <div className="flex items-center gap-2 border-b border-ink/[0.07] bg-white px-3 py-2">
                    <div className="flex gap-1">
                      <span className="size-1.5 rounded-full bg-[#e6a69c]" />
                      <span className="size-1.5 rounded-full bg-[#e6d193]" />
                      <span className="size-1.5 rounded-full bg-[#b0c9a8]" />
                    </div>
                    <span className="mx-auto flex items-center gap-1 rounded-[3px] bg-ink/[0.04] px-6 py-1 font-mono text-[6px] text-ink/50">
                      <span className="size-1 rounded-full bg-[#87a37b]" />
                      atlas.northbeam.studio
                    </span>
                    <span className="size-3 rounded-full bg-ink/10" />
                  </div>
                  <div className="grid grid-cols-[42px_1fr]">
                    <div className="flex flex-col items-center gap-3 bg-[#1e1f1b] py-3">
                      <span className="mb-1 flex size-4 items-center justify-center rounded-[3px] bg-white/90 text-[7px] font-bold text-ink">
                        A
                      </span>
                      {[0, 1, 2, 3].map((i) => (
                        <span
                          key={i}
                          className={cn("size-3.5 rounded-[3px]", i === 0 ? "bg-white/25" : "bg-white/[0.09]")}
                        />
                      ))}
                    </div>
                    <div className="bg-[#f8f8f6] p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[7px] font-semibold tracking-tight text-ink/80">
                            Pipeline overview
                          </p>
                          <p className="mt-0.5 text-[5.5px] text-ink/50">Last 30 days · All teams</p>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="rounded-[2px] bg-white px-2 py-1 text-[5.5px] text-ink/50 ring-1 ring-ink/10">
                            Filter
                          </span>
                          <span className="rounded-[2px] bg-[#2c3a26] px-2 py-1 text-[5.5px] text-white">
                            + New
                          </span>
                        </div>
                      </div>
                      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                        {[
                          ["Active value", "$4.2m", "+18.4%"],
                          ["Win rate", "64.8%", "+6.1%"],
                          ["Cycle time", "12d", "−2.3d"],
                        ].map(([label, value, delta]) => (
                          <div key={label} className="rounded-[4px] bg-white p-2 ring-1 ring-ink/[0.06]">
                            <p className="text-[5px] uppercase tracking-wide text-ink/50">{label}</p>
                            <p className="mt-0.5 text-[9px] font-semibold tracking-tight text-ink/80">{value}</p>
                            <p className="text-[5px] text-[#6b8b5f]">{delta}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-2 flex h-[76px] gap-1.5 rounded-[4px] bg-white p-2.5 ring-1 ring-ink/[0.06]">
                        {[36, 52, 44, 68, 57, 78, 63, 88, 74, 96, 84, 104].map((height, i) => (
                          <div key={i} className="flex flex-1 flex-col justify-end gap-[2px]">
                            <span
                              className={cn("w-full rounded-[1px]", i > 8 ? "bg-[#2f3c28]" : "bg-[#c3d3b5]")}
                              style={{ height: `${Math.max(12, height * 0.52)}%` }}
                            />
                            <span className="w-full rounded-[1px] bg-[#e7ecde]" style={{ height: "12%" }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/75 px-2.5 py-1.5 text-[10px] font-medium text-ink/70 backdrop-blur-md">
                  <span className="size-1.5 rounded-full bg-[#7c9a6f]" /> Live in production
                </span>
              </div>
              <CardLink onClick={() => onContact("Web platforms")} label="See platform work" />
            </article>
          </Reveal>

          <Reveal delay={80} className="lg:col-span-5">
            <article className="group flex h-full flex-col rounded-[20px] bg-[#dceaf6] p-4 sm:p-5 lg:min-h-[460px]">
              <CardMeta index="04" tag="Applied AI" />
              <div className="relative mt-4 h-[210px] overflow-hidden rounded-xl bg-[#d7e8f7] sm:h-[224px]">
                <img
                  src="/images/ai-folder.jpg"
                  alt="Soft blue folder with a friendly AI speech bubble and floating shapes"
                  loading="lazy"
                  className="size-full object-cover object-[50%_54%] transition duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute right-3 top-3 rounded-full border border-white/70 bg-white/70 px-2.5 py-1.5 font-mono text-[8.5px] uppercase tracking-wide text-ink/60 backdrop-blur-md">
                  Human in the loop
                </span>
              </div>
              <div className="mt-5 flex flex-1 flex-col">
                <CardTitle>Make AI genuinely useful, not just present.</CardTitle>
                <p className="mt-2.5 text-[12.5px] leading-[1.6] text-ink/60">
                  We start with a workflow that hurts, then add AI with evaluations, guardrails,
                  and a clear path to production.
                </p>
                <div className="mt-auto">
                  <CardLink onClick={() => onContact("AI & automation")} />
                </div>
              </div>
            </article>
          </Reveal>
        </div>

        <div
          className={cn(
            "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            showCaps ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          )}
        >
          <div className="overflow-hidden">
            <div id="capability-index" className="mt-10 border-t border-line pt-8">
              <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
                {capabilityGroups.map((group, index) => (
                  <div key={group.label}>
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-ink/50">
                      0{index + 1} / {group.label}
                    </p>
                    <ul className="mt-3.5 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item}>
                          <button
                            type="button"
                            onClick={() => onContact(item)}
                            className="text-left text-[13px] text-ink/65 transition hover:text-ink"
                          >
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-1.5 border-t border-line pt-6">
                <span className="eyebrow mr-2 text-ink/45">Typical stack</span>
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-ink/10 bg-white/40 px-2.5 py-1 font-mono text-[10px] text-ink/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-4 rounded-[14px] border border-line bg-[#fbfaf6] px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[13px] text-ink/60">
            Not sure which service you need? Most good relationships start with a 30-minute call.
          </p>
          <button
            type="button"
            onClick={() => onContact("Not sure yet")}
            className="group inline-flex shrink-0 items-center gap-2 text-[12.5px] font-semibold text-ink"
          >
            <span className="border-b border-ink/25 pb-0.5 transition group-hover:border-ink/60">
              Talk to a human
            </span>
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
