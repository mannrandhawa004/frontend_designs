import { useRef } from "react";
import { projects } from "../data";
import { Button } from "./ui";

function Arrow({ dir, onClick }: { dir: "l" | "r"; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === "l" ? "Previous" : "Next"}
      className="grid h-11 w-11 place-items-center rounded-full border border-forest/15 bg-white text-forest shadow-lg transition hover:bg-forest hover:text-white"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => ref.current?.scrollBy({ left: d * 340, behavior: "smooth" });

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto mb-10 flex max-w-6xl flex-wrap items-end justify-between gap-4 px-5">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-forest md:text-4xl">
          Each Project is Made
          <br />
          with Love
        </h2>
        <Button variant="lime">View All Projects</Button>
      </div>

      <div className="relative">
        <div ref={ref} className="no-scrollbar flex snap-x gap-5 overflow-x-auto px-5 pb-2">
          {projects.map((p) => (
            <article key={p.title} className="group w-[300px] shrink-0 snap-start md:w-[330px]">
              <div className="relative overflow-hidden rounded-3xl">
                <img
                  src={p.img}
                  alt={p.title}
                  className="h-56 w-full object-cover transition-transform duration-[900ms] group-hover:scale-110 md:h-64"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/85 via-forest-dark/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-4 left-4 translate-y-3 rounded-full bg-lime px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-forest-dark opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  View Case Study
                </span>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-forest">{p.title}</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40">{p.tag}</p>
            </article>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-24 hidden justify-between px-4 md:flex">
          <div className="pointer-events-auto">
            <Arrow dir="l" onClick={() => scroll(-1)} />
          </div>
          <div className="pointer-events-auto">
            <Arrow dir="r" onClick={() => scroll(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}
