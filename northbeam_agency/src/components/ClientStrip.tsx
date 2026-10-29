import { Reveal } from "./ui";

const brands = [
  { name: "verna", className: "font-serif text-[24px] tracking-[-0.02em]", glyph: "○" },
  { name: "openly", className: "font-semibold text-[20px] tracking-[-0.04em]", glyph: "◎" },
  { name: "fathom", className: "font-serif italic text-[23px] tracking-[-0.01em]", glyph: "—" },
  { name: "SABLE", className: "font-mono text-[15px] tracking-[0.22em]", glyph: "▚" },
  { name: "lattice", className: "font-medium text-[20px] tracking-[-0.035em]", glyph: "✳" },
  { name: "WAYFARER", className: "font-mono text-[12px] tracking-[0.14em]", glyph: "◈" },
  { name: "alto", className: "font-serif text-[25px] tracking-[-0.025em]", glyph: "◒" },
  { name: "quartz", className: "font-semibold text-[19px] tracking-[-0.03em]", glyph: "✦" },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pr-14 sm:gap-20 sm:pr-20" aria-hidden={hidden || undefined}>
      {brands.map((brand) => (
        <li key={brand.name} className="shrink-0">
          <span className="group inline-flex cursor-default items-center gap-1.5 whitespace-nowrap text-ink/50 transition duration-300 hover:text-ink">
            <span aria-hidden="true" className="text-[10px] leading-none text-ink/30 transition group-hover:text-sun">
              {brand.glyph}
            </span>
            <span className={`${brand.className} leading-none`}>{brand.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export function ClientStrip() {
  return (
    <section aria-label="Selected clients" className="border-b border-line/80 bg-paper">
      <div className="mx-auto max-w-[1440px] py-10 sm:py-12">
        <Reveal className="flex items-center justify-center gap-4 px-5 sm:gap-6 sm:px-8 lg:px-12">
          <span className="hidden h-px flex-1 bg-line sm:block" />
          <p className="eyebrow shrink-0 text-center text-ink/50">Trusted by product teams at 40+ companies</p>
          <span className="hidden h-px flex-1 bg-line sm:block" />
        </Reveal>

        <div className="marquee group/marquee relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="marquee-track flex w-max">
            <Row />
            <Row hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
