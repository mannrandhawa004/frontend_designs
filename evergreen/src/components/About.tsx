import { IMG } from "../data";
import { Eyebrow, Button, Sparkle } from "./ui";

const points = [
  "Family-Owned & Operated",
  "Licensed & Insured",
  "Custom, Nature-Inspired Designs",
  "Trusted Local Business with Personal Service",
];

export default function About() {
  return (
    <section id="about" className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[1fr_0.9fr_1fr]">
        <div>
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-forest md:text-[2.6rem]">
            Boutique
            <br />
            Landscape
            <br />
            Design & Garden
          </h2>
          <div className="mt-10 flex items-center gap-4">
            <div className="relative grid h-20 w-20 shrink-0 place-items-center rounded-full bg-forest text-[7px] font-bold uppercase tracking-widest text-lime">
              <span className="absolute inset-1.5 rounded-full border border-dashed border-lime/40" />
              <span className="text-center leading-tight">
                Best
                <br />
                Rated
                <br />
                2025
              </span>
            </div>
            <p className="text-[11px] font-bold uppercase leading-relaxed tracking-wider text-ink/50">
              Best Rated Landscaping
              <br />
              Company 2025
            </p>
          </div>
        </div>

        <div className="group relative">
          <Sparkle className="animate-float absolute -right-2 -top-4 h-6 w-6 text-lime" />
          <Sparkle className="animate-float absolute -left-3 top-1/3 h-4 w-4 text-lime [animation-delay:2s]" />
          <div className="overflow-hidden rounded-[999px_999px_28px_28px] bg-cream-2">
            <img
              src={IMG.team}
              alt="Evergreen team"
              className="h-[360px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 md:h-[420px]"
            />
          </div>
          <Button className="mt-5 w-full" variant="outline">
            More About Us
          </Button>
        </div>

        <div>
          <p className="text-[13px] leading-relaxed text-ink/70">
            Locally owned landscape design company since 2012. Licensed and based in New York, with 12+ years of
            experience creating natural, timeless outdoor spaces. Personal approach, honest work, and a passion for
            greenery at the heart of every project.
          </p>
          <ul className="mt-7 space-y-2.5">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-3 rounded-full border border-forest/10 bg-cream px-4 py-3 text-[13px] font-medium text-forest"
              >
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-forest-dark">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5">
                    <path d="M4 12l5 5L20 6" />
                  </svg>
                </span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
