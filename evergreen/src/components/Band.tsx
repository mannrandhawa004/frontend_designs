import { IMG } from "../data";
import { Eyebrow, Flower, Sparkle } from "./ui";

export function Efficient() {
  return (
    <section className="bg-cream px-5 py-20 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center">
          <Eyebrow>We love the work we do</Eyebrow>
        </div>
        <h2 className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
          Efficient Landscaping So You Can
          <br className="hidden sm:block" /> Get to Living
        </h2>
        <div className="mt-12 grid gap-8 text-[13px] text-ink/65 sm:grid-cols-2 sm:divide-x sm:divide-forest/10">
          <p className="flex items-start justify-center gap-2 px-4">
            <Sparkle className="mt-1 h-3 w-3 shrink-0 text-lime" />
            We provide customized solutions to your landscape needs
          </p>
          <p className="flex items-start justify-center gap-2 px-4">
            <Sparkle className="mt-1 h-3 w-3 shrink-0 text-lime" />
            We communicate with our clients every step of the way
          </p>
        </div>
      </div>
    </section>
  );
}

export function QuoteBanner() {
  return (
    <section className="relative overflow-hidden">
      <img src={IMG.banner} alt="Lush garden" className="h-[220px] w-full object-cover md:h-[280px]" />
      <div className="absolute inset-0 bg-forest-dark/10" />
      <a
        href="#contact"
        className="group absolute left-1/2 top-0 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center"
      >
        <Flower className="absolute inset-0 h-full w-full text-lime transition-transform duration-700 group-hover:rotate-45" />
        <span className="relative grid h-24 w-24 place-items-center rounded-full bg-white text-center text-[12px] font-semibold leading-tight text-forest shadow-lg">
          Request a
          <br />
          Quote
        </span>
      </a>
    </section>
  );
}
