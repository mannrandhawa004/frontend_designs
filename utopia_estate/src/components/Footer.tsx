import { LogoBadge } from "./Logo";

const COLUMNS = [
  { title: "Explore", links: ["Buy a home", "Rent a home", "New developments", "Virtual tours"] },
  { title: "Company", links: ["About us", "Careers", "Press", "Contact"] },
  { title: "Support", links: ["Help center", "Financing", "Privacy", "Terms"] },
];

export function Footer() {
  return (
    <footer className="mx-auto max-w-[88rem] px-4 pb-28 pt-12 lg:px-[3rem] lg:pb-12">
      <div className="flex flex-col gap-12 border-t border-line pt-12 lg:flex-row lg:justify-between">
        <div className="max-w-xs">
          <a href="#top" className="flex items-center gap-3">
            <LogoBadge className="size-11" markClassName="size-6" />
            <span className="text-xl font-semibold tracking-tight">Utopia Estates</span>
          </a>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Extraordinary architecture for purchase or rent. A new way of living, curated worldwide.
          </p>
          <div className="mt-5 flex gap-2">
            {["Instagram", "Dribbble", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#top"
                className="rounded-full bg-surface px-3.5 py-1.5 text-xs font-medium ring-1 ring-line transition-colors hover:bg-ink hover:text-frame"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:gap-20">
          {COLUMNS.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a href="#listings" className="text-sm text-muted transition-colors hover:text-ink">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:justify-between">
        <p>© 2026 Utopia Estates. All rights reserved.</p>
        <p>Crafted with care for a new way of living.</p>
      </div>
    </footer>
  );
}
