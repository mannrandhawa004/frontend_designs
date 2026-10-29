import { useState } from "react";
import { IMG, testimonials } from "../data";
import { Button, Eyebrow } from "./ui";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (d: number) => setI((p) => (p + d + testimonials.length) % testimonials.length);

  return (
    <section className="px-5 py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.9fr_0.8fr_1.1fr]">
        <div>
          <Eyebrow>Client Reviews</Eyebrow>
          <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
            Your Stories of
            <br />
            Good Times
          </h2>
          <Button className="mt-8">Read All Testimonial</Button>
        </div>

        <div className="relative overflow-hidden rounded-[999px_999px_28px_28px] bg-cream-2 p-3">
          <div className="overflow-hidden rounded-[999px_999px_20px_20px]">
            <img src={IMG.testimonial} alt="Happy client" className="h-80 w-full object-cover" />
          </div>
          <div className="absolute left-1/2 top-5 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-md">
            <span className="text-sm font-bold text-forest">G</span>
            <div className="text-[9px] leading-tight">
              <div className="font-semibold">252 ★★★★★</div>
              <div className="text-ink/50">Google Reviews</div>
            </div>
          </div>
        </div>

        <div>
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-forest" fill="currentColor">
            <path d="M10 6v6a6 6 0 0 1-6 6V15a3 3 0 0 0 3-3H4V6h6Zm10 0v6a6 6 0 0 1-6 6V15a3 3 0 0 0 3-3h-3V6h6Z" />
          </svg>
          <p className="mt-5 min-h-[140px] text-[13.5px] leading-relaxed text-ink/75">“{t.text}”</p>
          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm font-semibold text-forest">{t.name}</p>
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  onClick={() => go(d)}
                  aria-label={d < 0 ? "Previous review" : "Next review"}
                  className="grid h-10 w-10 place-items-center rounded-full border border-forest/15 text-forest transition hover:bg-forest hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d={d < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
