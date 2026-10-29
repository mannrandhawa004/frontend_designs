import { posts } from "../data";
import { Button, Eyebrow, Reveal } from "./ui";

export default function Blog() {
  return (
    <section id="blog" className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Blog</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
              We Know a Lot
              <br />
              About The Garden
            </h2>
          </div>
          <Button variant="lime">Read More</Button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <article className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-3xl">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-56 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-forest backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-forest">
                  <span className="link-u">{p.title}</span>
                </h3>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink/40 transition-colors group-hover:text-forest">
                  Read article
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
