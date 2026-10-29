import { ArrowUpRight } from "lucide-react";
import { LuminaMark } from "./Navbar";

const cols = [
  { title: "PLATFORM", links: ["Automation", "MCP Servers", "SDKs", "Integrations", "Changelog"] },
  { title: "SOLUTIONS", links: ["GTM", "Support", "Engineering", "Finance", "Operations"] },
  { title: "RESOURCES", links: ["Documentation", "API Reference", "Templates", "Blog", "Status"] },
  { title: "COMPANY", links: ["About", "Careers", "Security", "Privacy", "Contact"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-[#02040b]">
      <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1fr_2fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.05]">
                <LuminaMark className="h-5 w-5 text-[#d8e9ff]" />
              </span>
              <span className="text-[16px] font-semibold text-white">Lumina</span>
            </div>
            <p className="mt-4 max-w-[260px] text-[14px] leading-relaxed text-white/45">
              AI that connects your tools and gets work done. Built for teams that ship.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/[0.06] px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] text-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[10px] tracking-[0.18em] text-white/35">{c.title}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#home" className="group inline-flex items-center gap-1 text-[14px] text-white/60 transition hover:text-white">
                        {l}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-60" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] pt-7 sm:flex-row">
          <p className="font-mono text-[11px] text-white/30">© 2026 LUMINA LABS, INC. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6 font-mono text-[11px] text-white/30">
            <a href="#home" className="hover:text-white/70">PRIVACY</a>
            <a href="#home" className="hover:text-white/70">TERMS</a>
            <a href="#home" className="hover:text-white/70">SECURITY</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
