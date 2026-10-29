import { services } from "../data";
import { Button, Eyebrow, Reveal, Sparkle } from "./ui";

export default function Services() {
  return (
    <section id="services" className="bg-cream px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Our Services</Eyebrow>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
            Landscaping Solutions for Homes and Businesses
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <article className="group h-full overflow-hidden rounded-[999px_999px_28px_28px] bg-lime p-5 pt-10 transition-all duration-500 hover:-translate-y-2.5 hover:bg-lime-soft hover:shadow-[0_30px_60px_-28px_rgba(22,92,34,0.55)]">
                <Sparkle className="mx-auto h-5 w-5 text-forest-dark/60 transition-transform duration-700 group-hover:rotate-180" />
                <h3 className="mt-5 text-center text-xl font-semibold text-forest-dark">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-[22ch] text-center text-[11.5px] leading-relaxed text-forest-dark/70">
                  {s.desc}
                </p>
                <div className="mask-services mt-6 overflow-hidden">
                  <img
                    src={s.img}
                    alt={s.title}
                    className="h-48 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                </div>
                <span className="mt-5 flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-forest-dark opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  Learn more
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button as="a" href="#projects">
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
}
