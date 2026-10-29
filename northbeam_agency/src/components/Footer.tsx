import { useState, type FormEvent } from "react";
import { ArrowUpRight, CheckIcon, LogoMark, Reveal, Wordmark } from "./ui";

const serviceLinks = ["Product design", "Mobile applications", "Web platforms", "Applied AI"];
const studioLinks = [
  { label: "Our promise", href: "#promise" },
  { label: "Outcomes", href: "#work" },
  { label: "How we work", href: "#process" },
  { label: "Voices", href: "#voices" },
  { label: "FAQ", href: "#faq" },
];

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
];

export function Footer({ onContact }: { onContact: (interest?: string) => void }) {
  const [subscribed, setSubscribed] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="bg-paper pb-24 pt-16 sm:pb-6 sm:pt-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <a href="#top" aria-label="Northbeam, back to top" className="inline-flex">
              <Wordmark />
            </a>
            <p className="mt-5 max-w-[290px] text-[13px] leading-[1.65] text-muted">
              A senior product engineering studio for teams who care how the work gets made.
              Building, modernizing, and shipping since 2014.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/40 px-3 py-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#7d9c64] opacity-50" />
                <span className="relative inline-flex size-1.5 rounded-full bg-[#7d9c64]" />
              </span>
              <span className="eyebrow text-[9px] text-ink/45">Taking on new work · Q3 2026</span>
            </div>
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[12px] text-ink/50 transition hover:text-ink"
                  >
                    {social.label}
                    <ArrowUpRight className="size-3 opacity-40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-80" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={60} className="lg:col-span-2">
            <p className="eyebrow text-ink/50">Services</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    onClick={() => onContact(service)}
                    className="text-left text-[12.5px] text-ink/60 transition hover:text-ink"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2">
            <p className="eyebrow text-ink/50">Studio</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {studioLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-[12.5px] text-ink/60 transition hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-3">
            <p className="eyebrow text-ink/50">Say hello</p>
            <a
              href="mailto:hello@northbeam.studio"
              className="mt-4 inline-block border-b border-ink/20 pb-0.5 text-[13.5px] font-medium text-ink transition hover:border-ink/50"
            >
              hello@northbeam.studio
            </a>
            <p className="mt-3 text-[12.5px] leading-[1.7] text-ink/50">
              Bredgade 34, 1260
              <br />
              Copenhagen K, Denmark
            </p>
            <button
              type="button"
              onClick={() => onContact()}
              className="group mt-5 inline-flex items-center gap-2 text-[12px] font-medium text-ink/70 transition hover:text-ink"
            >
              <span className="border-b border-ink/20 pb-0.5 transition group-hover:border-ink/50">
                Book a 30-minute call
              </span>
              <ArrowUpRight className="size-3.5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
          </Reveal>
        </div>

        <Reveal className="mt-14 grid grid-cols-1 items-end gap-6 border-t border-line py-8 sm:grid-cols-2">
          <div>
            <p className="eyebrow text-ink/50">Field notes</p>
            <p className="mt-2 text-[14px] text-ink/70">
              One thoughtful email a month. No filler, no funnels.
            </p>
          </div>
          <div className="sm:justify-self-end">
            {subscribed ? (
              <div className="flex items-center gap-2 text-[12.5px] font-medium text-[#4e6643]" role="status">
                <span className="flex size-5 items-center justify-center rounded-full bg-[#e7efdc]">
                  <CheckIcon className="size-3.5" />
                </span>
                You're on the list. First note arrives soon.
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex w-full max-w-[340px] items-center gap-3">
                <label htmlFor="footer-email" className="sr-only">
                  Work email
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 border-b border-ink/20 bg-transparent py-2 text-[13px] text-ink placeholder:text-ink/45 transition focus:border-ink/50 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group flex shrink-0 items-center gap-1.5 rounded-[7px] bg-ink px-3.5 py-2 text-[11.5px] font-medium text-paper transition hover:bg-[#333336]"
                >
                  Join
                  <ArrowUpRight className="size-3.5 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </Reveal>

        <div className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[10px] tracking-[0.02em] text-ink/50">
            © 2026 Northbeam Studio ApS · CVR 38 12 09 47
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-[0.02em] text-ink/45">Privacy</span>
            <span className="font-mono text-[10px] tracking-[0.02em] text-ink/45">Terms</span>
            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.02em] text-ink/45 transition hover:text-ink"
            >
              Back to top
              <span className="flex size-5 items-center justify-center rounded-full border border-ink/15 transition group-hover:border-ink/40">
                <ArrowUpRight className="size-3 -rotate-45" />
              </span>
            </a>
          </div>
        </div>

        <div className="relative flex select-none items-end justify-between gap-4 overflow-hidden pt-4" aria-hidden="true">
          <span className="w-full text-center text-[clamp(3.6rem,14.5vw,13.5rem)] font-semibold leading-[0.7] tracking-[-0.07em] text-ink/[0.055]">
            northbeam
          </span>
          <LogoMark className="absolute bottom-2 right-2 size-7 opacity-30 sm:right-5 sm:size-10" />
        </div>
      </div>
    </footer>
  );
}
