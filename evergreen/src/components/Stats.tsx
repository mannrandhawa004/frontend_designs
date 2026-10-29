import { useCountUp, useReveal } from "../hooks";
import { Leaf } from "./ui";

const stats = [
  { n: 1240, suffix: "+", label: "Gardens Delivered" },
  { n: 12, suffix: " yrs", label: "Years in Business" },
  { n: 98, suffix: "%", label: "Client Retention" },
  { n: 42, suffix: "", label: "Design Awards" },
];

const marquee = [
  "Garden Design",
  "Turf & Lawns",
  "Hardscaping",
  "Irrigation",
  "Tree Care",
  "Lighting",
  "Pergolas",
  "Planting Plans",
];

function Stat({ n, suffix, label, active }: (typeof stats)[0] & { active: boolean }) {
  const v = useCountUp(n, active);
  return (
    <div className="text-center">
      <div className="text-4xl font-semibold tracking-tight text-forest md:text-5xl">
        {v.toLocaleString()}
        <span className="text-lime">{suffix}</span>
      </div>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/45">{label}</p>
    </div>
  );
}

export default function Stats() {
  const { ref, shown } = useReveal<HTMLDivElement>(0.3);

  return (
    <>
      <section ref={ref} className="px-5 pb-6 pt-4">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 rounded-[32px] border border-forest/10 bg-cream px-6 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} active={shown} />
          ))}
        </div>
      </section>

      <div className="marquee-wrap mt-10 overflow-hidden border-y border-forest/10 bg-forest py-4">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
              {m}
              <Leaf className="h-3.5 w-3.5 text-lime" />
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
