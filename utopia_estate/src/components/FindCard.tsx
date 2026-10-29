import { ArrowUpRight } from "lucide-react";
import { FEATURED_IDS, getProperty } from "@/data/properties";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";
import { FRAME } from "@/lib/shapes";

export function FindCard({ variant }: { variant: "desktop" | "mobile" }) {
  const { featuredId, setFeaturedId } = useStore();
  const thumbs = FEATURED_IDS.map(getProperty);
  const ring = variant === "desktop" ? "ring-frame" : "ring-surface";

  const goListings = () =>
    document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });

  const content = (
    <>
      <h3 className="text-[1.5rem] font-semibold tracking-[-0.01em] text-ink">
        Find The Perfect Place
      </h3>
      <p className="mt-[0.8rem] text-[0.9rem] leading-[1.55] text-muted">
        Our platform connects you with extraordinary homes in the most sought-after locations.
        Start your journey to discovering the perfect match for your lifestyle.
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        <div>
          <p className="text-[2.75rem] font-medium leading-[0.9] tracking-[-0.035em] text-ink sm:text-[3.5rem]">10K+</p>
          <p className="mt-[0.45rem] text-[0.8rem] font-medium text-ink/80">Properties</p>
        </div>
        <div className="flex items-center">
          {thumbs.map((p, i) => {
            const on = p.id === featuredId;
            return (
              <button
                key={p.id}
                type="button"
                title={p.name}
                aria-label={`Feature ${p.name}`}
                aria-pressed={on}
                onClick={() => setFeaturedId(p.id)}
                className={cn(
                  "relative size-[3.4rem] overflow-hidden rounded-full ring-[3px] transition-all duration-300 hover:z-20 hover:-translate-y-1",
                  i > 0 && "-ml-[1.1rem]",
                  on ? "z-10 ring-accent" : ring
                )}
                style={{ zIndex: on ? 10 : 3 - i }}
              >
                <img src={p.image} alt="" className="size-full object-cover" />
              </button>
            );
          })}
          <button
            type="button"
            aria-label="Browse all properties"
            onClick={goListings}
            className={cn(
              "group relative z-0 -ml-[0.45rem] grid size-[3.4rem] place-items-center rounded-full bg-chip text-ink ring-[3px] transition-colors duration-300 hover:bg-ink hover:text-frame",
              ring
            )}
          >
            <ArrowUpRight
              className="size-[1.2rem] transition-transform duration-300 group-hover:rotate-45"
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </>
  );

  if (variant === "desktop") {
    return (
      /* transparent: the hero mask cuts this card out of the photo */
      <div
        className="absolute bottom-0 z-10 hidden flex-col pb-[2.3rem] pl-[5.15rem] pr-[3rem] pt-[3.3rem] lg:flex"
        style={{
          left: `${FRAME.rail.w}rem`,
          width: `${FRAME.find.right - FRAME.rail.w}rem`,
          height: `${FRAME.find.h}rem`,
        }}
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex flex-col rounded-[1.75rem] bg-surface p-6 ring-1 ring-line lg:hidden">
      {content}
    </div>
  );
}
