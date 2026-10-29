import { useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight, PlusIcon, Reveal, SectionLabel } from "./ui";

const faqs = [
  {
    q: "How quickly can a team start?",
    a: "Usually within 2–3 weeks of our first call. Discovery takes a week, and you'll have a named senior team and a fixed scope before any build work begins.",
  },
  {
    q: "What does an engagement typically cost?",
    a: "Most projects land between €40k and €180k depending on scope and team size. We price per fixed scope rather than open-ended hours, so you know the number before we start.",
  },
  {
    q: "Do you work with our existing engineering team?",
    a: "Yes — that's our preferred model. We work in your repo, on your tools, and pair with your engineers so the knowledge stays with you after we leave.",
  },
  {
    q: "Who owns the code and IP?",
    a: "You do, completely, from the first commit. There's no licensing, no lock-in, and no proprietary framework you'll need us to maintain.",
  },
  {
    q: "How do you approach AI projects responsibly?",
    a: "We start with one painful workflow, not a platform. Every AI feature ships with evaluations, guardrails, human review where it matters, and clear metrics for whether it's actually helping.",
  },
  {
    q: "What happens after launch?",
    a: "Every engagement includes 30 days of post-launch support, documentation, and runbooks. Many partners keep a smaller team on for ongoing iteration — it's entirely optional.",
  },
];

export function FAQ({ onContact }: { onContact: (interest?: string) => void }) {
  const [open, setOpen] = useState<Set<number>>(new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <section id="faq" className="scroll-mt-20 border-t border-line/70 bg-paper py-20 sm:py-24 lg:py-28">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12 lg:px-12">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionLabel className="text-ink">Questions</SectionLabel>
            <h2 className="mt-5 text-[clamp(2.3rem,3.8vw,3.25rem)] font-medium leading-[1] tracking-[-0.05em]">
              Good questions,{" "}
              <span className="font-serif font-normal italic text-ink/70">straight answers.</span>
            </h2>
            <p className="mt-5 max-w-[300px] text-[13.5px] leading-[1.65] text-ink/60">
              Can't find what you're looking for? A founder reads every message.
            </p>
            <div className="mt-7 flex items-center gap-3 rounded-2xl border border-line bg-white/60 p-3 pr-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#d9c9a4] text-[10px] font-semibold text-[#4b3e22]">
                MC
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[12.5px] font-semibold text-ink">Talk to Mikkel</p>
                <p className="text-[11px] text-ink/50">Co-founder · usually replies in hours</p>
              </div>
              <button
                type="button"
                onClick={() => onContact("A question")}
                aria-label="Ask a question"
                className="flex size-9 items-center justify-center rounded-full bg-ink text-paper transition hover:bg-[#333336]"
              >
                <ArrowUpRight className="size-4" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <ul className="border-t border-line">
            {faqs.map((item, i) => {
              const isOpen = open.has(i);
              return (
                <Reveal as="li" key={item.q} delay={i * 40} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={`faq-trigger-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => toggle(i)}
                      className="group flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6"
                    >
                      <span className="text-[16px] font-medium tracking-[-0.02em] text-ink transition group-hover:text-ink/70 sm:text-[18px]">
                        {item.q}
                      </span>
                      <span
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full border transition duration-300",
                          isOpen ? "border-ink bg-ink text-paper" : "border-ink/15 text-ink group-hover:border-ink/40",
                        )}
                      >
                        <PlusIcon className={cn("size-3.5 transition-transform duration-300", isOpen && "rotate-45")} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="max-w-[640px] pb-6 pr-12 text-[14px] leading-[1.7] text-ink/65">{item.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
