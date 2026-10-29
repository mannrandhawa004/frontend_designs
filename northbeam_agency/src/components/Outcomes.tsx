import { useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight, PlusIcon, Reveal, SectionLabel } from "./ui";

type Outcome = {
  number: string;
  label: string;
  tag: string;
  color: string;
  wash: string;
  description: string;
  engagement: string;
  metrics: { value: string; label: string }[];
  caseName: string;
};

const outcomes: Outcome[] = [
  {
    number: "01",
    label: "Accelerated delivery",
    tag: "Delivery velocity",
    color: "#f5be5e",
    wash: "rgba(255,255,255,0.52)",
    description:
      "We stood up two embedded squads around Optiva's existing platform, kept their roadmap intact, and shipped the first release in six weeks. No big-bang rewrite, no six-month discovery phase.",
    engagement: "Optiva · Fintech · 6-person squad · 14 weeks",
    metrics: [
      { value: "2.4×", label: "faster releases" },
      { value: "6 wks", label: "to first release" },
      { value: "−38%", label: "delivery cost" },
    ],
    caseName: "the Optiva story",
  },
  {
    number: "02",
    label: "Modernized platforms",
    tag: "Platform rebuild",
    color: "#cdbdf3",
    wash: "rgba(255,255,255,0.5)",
    description:
      "Fathom's customer portal was drowning in legacy infrastructure. We migrated the product incrementally, retired services one at a time, and kept every customer online through the transition.",
    engagement: "Fathom · Logistics · 4-person squad · 22 weeks",
    metrics: [
      { value: "−43%", label: "cloud spend" },
      { value: "99.99%", label: "uptime during migration" },
      { value: "6", label: "legacy systems retired" },
    ],
    caseName: "the Fathom story",
  },
  {
    number: "03",
    label: "AI that actually ships",
    tag: "Applied AI",
    color: "#bdd8f4",
    wash: "rgba(255,255,255,0.5)",
    description:
      "We found three high-friction workflows inside Lattice's claims team, prototyped AI assistance in a week, and moved it into production with human review, evals, and guardrails baked in.",
    engagement: "Lattice · Insurance · 5-person squad · 9 weeks",
    metrics: [
      { value: "31%", label: "engineering hours saved" },
      { value: "4 wks", label: "to first AI pilot" },
      { value: "9", label: "workflows automated" },
    ],
    caseName: "the Lattice story",
  },
  {
    number: "04",
    label: "Quality by design",
    tag: "Reliability",
    color: "#f1c9d4",
    wash: "rgba(255,255,255,0.5)",
    description:
      "Sable was shipping fast and breaking trust. We rebuilt their release pipeline, introduced contract tests and observability, and made quality something the whole team owns — not a final checkbox.",
    engagement: "Sable · Marketplaces · 3-person squad · 11 weeks",
    metrics: [
      { value: "0", label: "critical incidents since launch" },
      { value: "92%", label: "upgrade in test coverage" },
      { value: "4.9/5", label: "partner satisfaction" },
    ],
    caseName: "the Sable story",
  },
];

export function Outcomes({ onContact }: { onContact: (interest?: string) => void }) {
  const [open, setOpen] = useState<number>(0);

  return (
    <section id="work" className="scroll-mt-20 bg-paper py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <Reveal className="md:col-span-7">
            <SectionLabel className="text-ink">Selected outcomes</SectionLabel>
            <h2 className="mt-5 max-w-[540px] text-[clamp(2.5rem,5vw,4.35rem)] font-medium leading-[0.96] tracking-[-0.055em]">
              See tangible
              <br />
              <span className="inline-flex items-baseline gap-2">
                outcomes
                <span aria-hidden="true" className="mb-1 block size-2 rounded-full bg-sun sm:size-2.5" />
              </span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="md:col-span-5 md:pb-1.5">
            <p className="max-w-[360px] text-[14px] leading-[1.65] text-muted md:ml-auto">
              No vanity metrics. These are the numbers our partners track long after we've handed
              over the keys — delivery speed, cost, stability, and the quality of the work.
            </p>
            <button
              type="button"
              onClick={() => onContact("A reference conversation")}
              className="group mt-5 inline-flex items-center gap-2 border-b border-ink/20 pb-1 text-[12.5px] font-medium text-ink transition hover:border-ink/50 md:ml-auto"
            >
              Ask us for references
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-col gap-2.5 sm:mt-16">
          {outcomes.map((outcome, index) => {
            const isOpen = open === index;
            return (
              <Reveal key={outcome.number} delay={index * 60}>
                <article
                  className="overflow-hidden rounded-[14px] border border-ink/[0.07] transition-shadow duration-300 hover:shadow-[0_10px_36px_-22px_rgba(25,25,27,0.35)]"
                  style={{ backgroundColor: outcome.color }}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={`outcome-panel-${index}`}
                    id={`outcome-trigger-${index}`}
                    className="group flex w-full items-center gap-3 px-4 py-4 text-left sm:gap-5 sm:px-6 sm:py-5"
                  >
                    <span className="font-mono text-[10px] leading-none text-ink/50 sm:text-[11px]">
                      {outcome.number}
                    </span>
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-ink/25 bg-white/25 transition duration-300 group-hover:bg-white/50">
                      <PlusIcon
                        className={cn(
                          "size-3 text-ink transition-transform duration-300",
                          isOpen && "rotate-45",
                        )}
                      />
                    </span>
                    <span className="flex-1 text-[15px] font-semibold tracking-[-0.025em] text-ink sm:text-[17px]">
                      {outcome.label}
                    </span>
                    <span className="eyebrow hidden text-ink/45 lg:inline">{outcome.tag}</span>
                    <span
                      className={cn(
                        "ml-1 flex size-8 shrink-0 items-center justify-center rounded-full bg-ink/[0.08] text-ink transition duration-300 group-hover:bg-ink group-hover:text-white",
                        isOpen && "bg-ink text-white",
                      )}
                    >
                      <ArrowUpRight
                        className={cn(
                          "size-4 transition-transform duration-300",
                          isOpen ? "rotate-90" : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                        )}
                      />
                    </span>
                  </button>

                  <div
                    id={`outcome-panel-${index}`}
                    role="region"
                    aria-labelledby={`outcome-trigger-${index}`}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 pb-3 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6">
                        <div
                          className="grid grid-cols-1 gap-6 rounded-[10px] border border-ink/[0.08] p-5 backdrop-blur-md sm:p-6 lg:grid-cols-[1.2fr_1fr] lg:gap-10 lg:p-7"
                          style={{ backgroundColor: outcome.wash }}
                        >
                          <div className="flex flex-col justify-between gap-6">
                            <div>
                              <p className="max-w-[520px] text-[13.5px] leading-[1.7] text-ink/75">
                                {outcome.description}
                              </p>
                              <p className="eyebrow mt-4 text-[9px] text-ink/40">{outcome.engagement}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => onContact(`Case study: ${outcome.caseName}`)}
                              className="group inline-flex w-fit items-center gap-2 text-[12.5px] font-semibold text-ink"
                            >
                              <span className="border-b border-ink/30 pb-0.5 transition group-hover:border-ink">
                                Read {outcome.caseName}
                              </span>
                              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg bg-ink/15">
                            {outcome.metrics.map((metric) => (
                              <div
                                key={metric.label}
                                className="flex min-h-[94px] flex-col justify-between bg-white/60 px-3 py-3.5 backdrop-blur-sm sm:px-4 sm:py-4"
                              >
                                <p className="text-[clamp(1.15rem,2vw,1.65rem)] font-medium leading-none tracking-[-0.045em] text-ink">
                                  {metric.value}
                                </p>
                                <p className="mt-3 text-[10px] leading-[1.25] text-ink/50">
                                  {metric.label}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={80} className="mt-8 flex flex-col items-start justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <p className="text-[12px] text-muted">
            Curious how we'd measure success for your team?
          </p>
          <button
            type="button"
            onClick={() => onContact("Measuring success")}
            className="group inline-flex items-center gap-2 text-[12px] font-medium text-ink/70 transition hover:text-ink"
          >
            Let's define it together
            <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
