import { useState } from "react";
import { Eyebrow, Reveal } from "./ui";
import { cn } from "../utils/cn";

const faqs = [
  {
    q: "How much does a full garden redesign cost?",
    a: "Most residential projects land between $15k and $80k depending on square footage, hardscape and planting density. We give a fixed written quote after the site visit — no hourly surprises.",
  },
  {
    q: "How long will the project take?",
    a: "Design takes 2–3 weeks. Build ranges from one week for planting-only work to roughly eight weeks for pools, patios and structures. You get a schedule before we break ground.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. Every installation includes 90 days of establishment care, and most clients continue on a monthly or seasonal plan covering pruning, feeding and irrigation checks.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Fully licensed in New York State and carrying general liability plus workers' comp. Certificates are provided with every contract.",
  },
  {
    q: "Can you work with drought-tolerant or native planting?",
    a: "It's our favourite brief. We build native-forward plant palettes that cut irrigation demand substantially while still looking lush year round.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-cream px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
            Questions,
            <br />
            Answered
          </h2>
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-ink/60">
            Still unsure about something? Call us on{" "}
            <a href="tel:3228208200" className="font-semibold text-forest link-u">
              (322) 820 820
            </a>{" "}
            and talk to a designer, not a call centre.
          </p>
        </Reveal>

        <div className="divide-y divide-forest/10 border-y border-forest/10">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span
                    className={cn(
                      "text-[15px] font-semibold transition-colors",
                      isOpen ? "text-forest" : "text-ink/75",
                    )}
                  >
                    {f.q}
                  </span>
                  <span
                    className={cn(
                      "grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-lime bg-lime text-forest-dark"
                        : "border-forest/20 text-forest",
                    )}
                  >
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-12 text-[13px] leading-relaxed text-ink/60">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
