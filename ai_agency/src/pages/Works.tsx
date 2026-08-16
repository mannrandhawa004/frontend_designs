import { ContactBlock, FaqBlock, PricingBlock, WorksBlock } from "../components/sections";
import { LimeBadge, PageHero } from "../components/ui";

const delays = [
  { n: "01", t: "Manual Operations Slow Progress", k: "/Workload" },
  { n: "02", t: "Competitors Outpace Innovation", k: "/Growth" },
  { n: "03", t: "Automation Potential Remains Untapped", k: "/Opportunities" },
  { n: "04", t: "Repetition Replaces Creativity", k: "/Draining Time" },
];

export default function Works() {
  return (
    <>
      <PageHero
        kicker="Works"
        title="Explore Our Finest"
        title2="AI Work"
        copy="Where innovation meets intelligence. Discover data-driven solutions, smart automation, and transformative projects shaping the future of businesses worldwide."
      />
      <WorksBlock />
      <section className="py-10 md:py-16">
        <div className="container-site">
          <LimeBadge>Why Delay Hurts</LimeBadge>
          <h2 className="section-title mt-4">
            The longer you wait, the harder
            <br />
            it is to catch up.
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {delays.map((d) => (
              <div key={d.n} className="flex items-start justify-between rounded-[28px] bg-white p-6">
                <div>
                  <h3 className="max-w-[260px] text-[22px] font-semibold tracking-[-0.03em]">{d.t}</h3>
                  <p className="mt-6 text-[13px] text-[#a1a1aa]">{d.k}</p>
                </div>
                <div className="text-[18px] text-[#a1a1aa]">/ {d.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PricingBlock />
      <FaqBlock />
      <ContactBlock />
    </>
  );
}
