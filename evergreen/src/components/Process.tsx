import { Eyebrow, Reveal } from "./ui";

const steps = [
  { n: "01", t: "Consultation", d: "We walk your site, listen to how you want to live outdoors, and talk budget honestly." },
  { n: "02", t: "Design", d: "You get a planting plan, 3D concept and material palette tailored to your light and soil." },
  { n: "03", t: "Build", d: "Our in-house crew handles hardscape, irrigation and planting — no subcontractor roulette." },
  { n: "04", t: "Care", d: "Seasonal maintenance keeps the garden looking like the day we handed it over." },
];

export default function Process() {
  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
            From First Visit to First Bloom
          </h2>
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-forest/20 to-transparent md:block" />
          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 110}>
                <div className="group relative">
                  <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-forest/15 bg-white text-sm font-bold text-forest transition-all duration-500 group-hover:border-lime group-hover:bg-lime group-hover:text-forest-dark">
                    {s.n}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-forest">{s.t}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
