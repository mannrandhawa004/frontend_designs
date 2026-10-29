import { useState } from "react";
import { LogoMark } from "./Logo";

const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: "Product",
    links: ["Mac app", "Desktop app", "Pricing", "Models", "Enterprise", "Jobs", "MCP"],
  },
  { title: "Company", links: ["About", "Blog", "Manifesto", "Brand", "Careers"] },
  { title: "Community", links: ["X", "LinkedIn", "Instagram", "Discord"] },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <footer className="relative overflow-hidden bg-[#0c0b0a] pt-10">
      {/* giant wordmark */}
      <div className="relative select-none">
        <div
          data-fx="footer-word"
          className="flex items-end justify-center gap-[2vw] px-4 text-[#2a2724]"
        >
          <LogoMark
            className="w-auto"
            style={{ height: "clamp(34px, 10vw, 140px)" }}
          />
          <span
            className="font-display leading-[0.78] tracking-[-0.03em]"
            style={{ fontSize: "clamp(56px, 17vw, 230px)" }}
          >
            Melius
          </span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0c0b0a] to-transparent" />
      </div>

      {/* panel */}
      <div className="relative mx-auto -mt-[7vw] max-w-[1180px] px-5 pb-10">
        <div
          data-fx="footer-panel"
          className="grid gap-10 rounded-[16px] border border-white/[0.07] bg-[#141211]/90 p-7 backdrop-blur-xl sm:p-9 lg:grid-cols-[1.1fr_1.4fr]"
        >
          <div>
            <h3 className="font-display text-[26px] leading-none text-[#efece8]">Don&apos;t miss out</h3>
            <p className="mt-2 text-[12px] text-white/45">Enter your email for news and updates</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.trim()) setSent(true);
              }}
              className="mt-5 flex max-w-[360px] items-center gap-2 rounded-[10px] border border-white/10 bg-white/[0.04] p-1.5 pl-4 focus-within:border-white/25"
            >
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSent(false);
                }}
                type="email"
                placeholder="Enter your email"
                className="h-8 flex-1 bg-transparent text-[12.5px] text-white placeholder:text-white/35 focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-8 w-8 place-items-center rounded-[7px] bg-white/10 text-white transition-colors hover:bg-brand"
                aria-label="Subscribe"
              >
                <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            {sent && <p className="mt-2 text-[11.5px] text-brand">You&apos;re on the list.</p>}
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <div className="text-[9.5px] uppercase tracking-[0.22em] text-white/35">{col.title}</div>
                <ul className="mt-3.5 space-y-2">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#top"
                        className="text-[12px] text-white/55 transition-colors hover:text-white"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-5 text-[11px] text-white/35 sm:flex-row">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Status: Up
            </span>
            <span>© 2026 Melius Inc.</span>
          </div>
          <div className="flex items-center gap-5">
            {["Terms of Service", "Privacy Policy", "Cookie Preferences"].map((l) => (
              <a key={l} href="#top" className="transition-colors hover:text-white/70">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
