import { ArrowUpRight, Button, Reveal, SectionLabel } from "./ui";

const steps = [
  {
    number: "01",
    title: "Diagnose the real problem",
    detail:
      "A short, senior-led discovery. We map the product, the constraints, and the fastest meaningful path — then tell you honestly if you need us at all.",
    meta: "Week 1",
    outputs: "Working session · Technical read · Recommendation",
  },
  {
    number: "02",
    title: "Set a scope worth keeping",
    detail:
      "A clear brief, a fixed team, and a delivery plan you can hold us to. You'll know what ships, when it ships, and what it costs before we start.",
    meta: "Week 1–2",
    outputs: "Fixed scope · Named team · Weekly demos",
  },
  {
    number: "03",
    title: "Build in the open",
    detail:
      "Our designers and engineers work in your repo, on your tools, with your people. Every week ends with something you can click, not a status deck.",
    meta: "Week 2 onward",
    outputs: "Production code · Design system · QA & monitoring",
  },
  {
    number: "04",
    title: "Leave you stronger",
    detail:
      "Documentation, tests, and pairing are part of the work. The goal isn't dependency — it's a team that can keep shipping confidently after we're gone.",
    meta: "Throughout",
    outputs: "Runbooks · Knowledge transfer · 30-day support",
  },
];

const stats = [
  { value: "6 wks", label: "average time to first release" },
  { value: "94%", label: "of partners extend the engagement" },
  { value: "12 yrs", label: "average senior team experience" },
];

export function Process({ onContact }: { onContact: () => void }) {
  return (
    <div className="bg-paper px-3 pb-3 sm:px-4 sm:pb-4 lg:px-6 lg:pb-6">
      <section
        id="process"
        className="relative isolate overflow-hidden rounded-[22px] bg-[#171719] text-paper sm:rounded-[28px]"
      >
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-40 -z-10 size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(202,187,242,0.18),transparent_65%)] blur-2xl"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-48 left-1/4 -z-10 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(244,173,61,0.1),transparent_65%)] blur-2xl"
        />

        <div className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-end md:gap-10">
            <Reveal className="md:col-span-7">
              <SectionLabel className="text-paper">How we work</SectionLabel>
              <h2 className="mt-5 max-w-[590px] text-[clamp(2.4rem,4.7vw,4.1rem)] font-medium leading-[0.98] tracking-[-0.055em]">
                From first call to
                <br />
                <span className="font-serif font-normal italic tracking-[-0.025em] text-paper/75">
                  first release.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={100} className="md:col-span-5">
              <p className="max-w-[340px] text-[13.5px] leading-[1.7] text-paper/50 md:ml-auto">
                No discovery theater. No hand-off chasm. A small, senior team with a clear scope
                and a weekly rhythm you can see.
              </p>
              <div className="mt-6 md:flex md:justify-end">
                <Button
                  variant="light"
                  onClick={onContact}
                  className="h-11 bg-paper text-ink hover:bg-white"
                >
                  Book a discovery call
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <dl className="mt-14 grid grid-cols-1 gap-y-7 border-y border-white/15 py-7 sm:grid-cols-3 sm:gap-x-8">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1.5 sm:border-l sm:border-white/15 sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="text-[clamp(1.9rem,3.2vw,2.65rem)] font-medium leading-none tracking-[-0.05em]">
                    {stat.value}
                  </dd>
                  <dd className="mt-1 text-[11.5px] leading-[1.45] text-paper/55">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 50}>
                <article className="group grid grid-cols-1 gap-4 border-b border-white/12 py-6 transition-colors duration-300 hover:bg-white/[0.025] md:grid-cols-12 md:items-start md:gap-6 md:px-2 md:py-7">
                  <div className="flex items-center gap-3 md:col-span-1 md:block">
                    <span className="font-mono text-[10px] text-paper/50">[{step.number}]</span>
                    <span className="h-px w-6 bg-white/15 md:hidden" aria-hidden="true" />
                  </div>
                  <h3 className="text-[21px] font-medium leading-[1.15] tracking-[-0.03em] md:col-span-4 md:text-[23px]">
                    {step.title}
                  </h3>
                  <p className="max-w-[460px] text-[12.5px] leading-[1.7] text-paper/60 md:col-span-4">
                    {step.detail}
                  </p>
                  <div className="flex flex-row items-center justify-between gap-3 md:col-span-3 md:flex-col md:items-end md:justify-start md:gap-2">
                    <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[9.5px] uppercase tracking-[0.08em] text-paper/55">
                      {step.meta}
                    </span>
                    <span className="max-w-[210px] text-right text-[10.5px] leading-[1.5] text-paper/60">
                      {step.outputs}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-7 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="eyebrow text-paper/60">Fixed scope · Weekly demos · Your repo, your IP</p>
            <a
              href="mailto:hello@northbeam.studio"
              className="group inline-flex items-center gap-2 text-[12px] font-medium text-paper/70 transition hover:text-paper"
            >
              Or just send us a note
              <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
