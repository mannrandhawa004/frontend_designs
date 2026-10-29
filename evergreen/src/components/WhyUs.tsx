import { advantages, IMG } from "../data";
import { Button, Eyebrow, Flower, Reveal, Sparkle } from "./ui";

export default function WhyUs() {
  const left = advantages.slice(0, 3);
  const right = advantages.slice(3);

  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center">
          <Eyebrow>Advantages</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-forest md:text-4xl">Why Choose us?</h2>
        </div>

        <div className="mt-16 grid items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <ul className="space-y-14 md:text-right">
            {left.map((a, i) => (
              <Reveal key={a.t} delay={i * 120}>
                <li className="group">
                  <h3 className="text-sm font-semibold text-forest transition-colors group-hover:text-lime">
                    {a.t}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/55">{a.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <div className="group relative mx-auto h-[320px] w-[320px] md:h-[380px] md:w-[380px]">
            <Flower className="absolute inset-0 h-full w-full animate-spin-slow text-lime" />
            <div className="mask-flower absolute inset-[14%] overflow-hidden">
              <img
                src={IMG.why}
                alt="Gardener trimming a hedge"
                className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
              />
            </div>
            <Sparkle className="animate-float absolute -left-2 top-1/2 h-5 w-5 text-forest" />
            <Sparkle className="animate-float absolute -right-2 top-1/3 h-5 w-5 text-forest [animation-delay:1.5s]" />
            <Sparkle className="animate-float absolute bottom-2 left-1/4 h-4 w-4 text-forest [animation-delay:3s]" />
          </div>

          <ul className="space-y-14">
            {right.map((a, i) => (
              <Reveal key={a.t} delay={i * 120}>
                <li className="group">
                  <h3 className="text-sm font-semibold text-forest transition-colors group-hover:text-lime">
                    {a.t}
                  </h3>
                  <p className="mt-1.5 text-[11.5px] leading-relaxed text-ink/55">{a.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex justify-center">
          <Button as="a" href="#contact">
            Request a Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
