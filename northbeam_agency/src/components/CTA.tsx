import { useState } from "react";
import { ArrowUpRight, Button, CheckIcon, CopyIcon, Reveal, Sparkle } from "./ui";

const facts = [
  { label: "Discovery call", value: "30 minutes, no deck" },
  { label: "First release", value: "From 6 weeks" },
  { label: "Engagement", value: "Fixed scope, senior team" },
];

export function CTA({ onContact }: { onContact: () => void }) {
  const [copied, setCopied] = useState(false);
  const email = "hello@northbeam.studio";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 bg-paper px-3 pb-3 pt-4 sm:px-4 sm:pb-4 lg:px-6">
      <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[22px] bg-[linear-gradient(118deg,#f9f2e3_0%,#f1e9f6_38%,#e8eff8_70%,#f8f4ea_100%)] px-5 py-14 sm:rounded-[28px] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -left-16 top-10 size-64 rotate-[24deg] rounded-[26px] border border-white/60 bg-gradient-to-br from-white/50 via-[#f4d9a0]/25 to-transparent backdrop-blur-sm sm:size-80" />
          <div className="absolute right-[26%] top-[-18%] size-52 rotate-[-14deg] rounded-[22px] border border-white/50 bg-gradient-to-br from-[#cabbf2]/35 to-[#bcd6f2]/20 backdrop-blur-[2px] sm:size-72" />
          <div className="absolute -bottom-24 right-4 size-64 rotate-[15deg] rounded-[30px] border border-white/60 bg-gradient-to-tr from-[#f0c5d0]/25 via-white/25 to-transparent sm:size-80" />
          <div className="absolute right-[12%] bottom-[18%] size-20 rotate-[38deg] rounded-xl border border-white/70 bg-white/30 backdrop-blur-sm sm:size-28" />
        </div>

        <Sparkle
          aria-hidden="true"
          className="animate-float absolute right-[9%] top-[13%] size-5 text-[#a47a21]/70 sm:size-7"
        />

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/35 px-3 py-1.5 backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-[#7d9c64]" />
              <span className="eyebrow text-ink/55">Next step</span>
            </span>
            <h2 className="mt-6 max-w-[680px] text-[clamp(2.6rem,5.8vw,5rem)] font-medium leading-[0.94] tracking-[-0.058em]">
              Ready to ship with{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em]">confidence?</span>
            </h2>
            <p className="mt-5 max-w-[420px] text-[14px] leading-[1.65] text-ink/55">
              Tell us what you're trying to build, fix, or modernize. We'll give you an honest read
              on whether we're the right team — and what a first release could look like.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              <Button onClick={onContact} className="h-12 px-5">
                Start a project
              </Button>
              <button
                type="button"
                onClick={copyEmail}
                className="group inline-flex h-12 items-center gap-2.5 rounded-[9px] border border-ink/15 bg-white/35 px-4 text-[12.5px] font-medium text-ink backdrop-blur-md transition hover:border-ink/30 hover:bg-white/60"
              >
                <span className="text-ink/50">hello@northbeam.studio</span>
                {copied ? (
                  <CheckIcon className="size-4 text-[#5d7a50]" />
                ) : (
                  <CopyIcon className="size-4 text-ink/40 transition group-hover:text-ink/70" />
                )}
              </button>
            </div>
            <p className="mt-3.5 text-[11px] text-ink/50" aria-live="polite">
              {copied ? "Email copied to your clipboard." : "We reply within one business day. Every note reaches a founder."}
            </p>
          </Reveal>

          <Reveal delay={110} className="lg:col-span-5">
            <div className="ml-auto w-full max-w-[360px] rounded-[18px] border border-white/70 bg-white/50 p-5 shadow-[0_22px_60px_-32px_rgba(30,30,40,0.45)] backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="eyebrow text-ink/45">Availability</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7d9c64]/25 bg-[#eef3e6]/80 px-2.5 py-1 text-[9.5px] font-medium text-[#4e6643]">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7d9c64] opacity-50" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-[#7d9c64]" />
                  </span>
                  Open
                </span>
              </div>

              <p className="mt-4 text-[34px] font-medium leading-none tracking-[-0.045em] text-ink">
                2 <span className="text-[16px] font-normal text-ink/40">of 3</span>
              </p>
              <p className="mt-1.5 text-[11.5px] text-ink/45">senior squad slots for Q3 2026</p>

              <div className="my-5 h-px w-full bg-ink/10" />
              <dl className="flex flex-col gap-3">
                {facts.map((fact) => (
                  <div key={fact.label} className="flex items-baseline justify-between gap-4">
                    <dt className="text-[11.5px] text-ink/40">{fact.label}</dt>
                    <dd className="text-right text-[11.5px] font-medium text-ink/70">{fact.value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                onClick={onContact}
                className="group mt-6 flex w-full items-center justify-between rounded-lg bg-ink px-4 py-3 text-left text-[12.5px] font-medium text-paper transition hover:bg-[#333336]"
              >
                Book a discovery call
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <p className="mt-3 text-center text-[10px] text-ink/50">
                Copenhagen · working worldwide
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
