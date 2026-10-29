import { useEffect, useRef, useState } from "react";
import { ArrowUpLeft, ArrowUpRight, Moon, Sun } from "lucide-react";
import { FEATURED_IDS, getProperty, type Mode } from "@/data/properties";
import { useStageMask } from "@/hooks/useStageMask";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";
import { FilterBar } from "./FilterBar";
import { FindCard } from "./FindCard";
import { LogoBadge } from "./Logo";
import { PropertyGlassCard } from "./PropertyGlassCard";
import { Sidebar } from "./Sidebar";

/**
 * The hero photo. Its whole silhouette — rounded corners, the top tab, the bottom-left "L" —
 * is a single SVG mask, so the tabs placed over the cut-outs need no background of their own.
 */
function Backdrop() {
  const { featuredId } = useStore();
  const ref = useRef<HTMLDivElement>(null);
  const mask = useStageMask(ref);
  const featured = FEATURED_IDS.map(getProperty);

  // Re-mount a layer each time it becomes active so its slow zoom restarts, while the
  // outgoing layer keeps animating as it fades out.
  const [epochs, setEpochs] = useState<Record<string, number>>({});
  useEffect(() => {
    setEpochs((e) => ({ ...e, [featuredId]: (e[featuredId] ?? 0) + 1 }));
  }, [featuredId]);

  return (
    <div ref={ref} aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#b9b5dd]" style={mask}>
      {featured.map((p) => (
        <div
          key={p.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1400ms] ease-out",
            p.id === featuredId ? "opacity-100" : "opacity-0"
          )}
        >
          <div
            key={`${p.id}-${epochs[p.id] ?? 0}`}
            className="animate-kenburns absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${p.image})`,
              backgroundPosition: p.heroPosition ?? "center 60%",
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(40,32,100,0.24)_0%,rgba(40,32,100,0)_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(24,18,66,0.36)_0%,rgba(24,18,66,0)_44%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(24,18,66,0.35),transparent_45%)] lg:hidden" />
    </div>
  );
}

export function Hero() {
  const { mode, setMode, autoplay, nextFeatured, theme, setTheme } = useStore();

  useEffect(() => {
    if (!autoplay) return;
    const t = window.setInterval(() => nextFeatured(1), 7000);
    return () => window.clearInterval(t);
  }, [autoplay, nextFeatured]);

  return (
    <section id="top" className="relative p-3 lg:h-screen lg:min-h-[58rem] lg:p-[0.75rem]">
      {/* Mobile header */}
      <header className="flex items-center justify-between px-1.5 pb-3 pt-1 lg:hidden">
        <a href="#top" className="flex items-center gap-2.5">
          <LogoBadge className="size-10" markClassName="size-6" />
          <span className="text-lg font-semibold tracking-tight">Utopia</span>
        </a>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="grid size-10 place-items-center rounded-full bg-surface text-ink ring-1 ring-line"
          >
            {theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          </button>
          <img src="images/avatar.jpg" alt="Emma Larsen" className="size-10 rounded-full object-cover ring-2 ring-surface" />
        </div>
      </header>

      <div className="relative flex min-h-[44rem] flex-col sm:min-h-[48rem] lg:block lg:h-full lg:min-h-0">
        <Backdrop />

        <ModePill
          label="Buy"
          side="left"
          value="buy"
          mode={mode}
          onSelect={setMode}
          className="left-3 top-3 lg:left-[6.9rem] lg:top-[1.9rem]"
        />
        <ModePill
          label="Rent"
          side="right"
          value="rent"
          mode={mode}
          onSelect={setMode}
          className="right-3 top-3 lg:right-[6.75rem] lg:top-[1.9rem]"
        />

        <h1 className="animate-rise relative z-10 mt-[5.75rem] select-none px-5 text-center text-[3rem] font-medium leading-[0.95] tracking-[-0.035em] text-white/85 [text-shadow:0_4px_40px_rgba(40,30,110,0.25)] min-[400px]:text-[3.4rem] sm:text-[5.25rem] lg:absolute lg:inset-x-0 lg:top-[9.4rem] lg:mt-0 lg:px-0 lg:text-[7.6rem] lg:leading-[0.86]">
          New Way Of
          <br />
          Living
        </h1>

        <p className="animate-rise relative z-10 mx-auto mt-5 max-w-[22rem] px-6 text-center text-[0.95rem] font-light leading-relaxed text-white/90 [animation-delay:120ms] lg:absolute lg:left-[12.4rem] lg:top-[24.9rem] lg:mx-0 lg:mt-0 lg:w-[19.5rem] lg:max-w-none lg:px-0 lg:text-left lg:text-[1.125rem] lg:leading-[1.62]">
          Discover extraordinary properties available for purchase or rent. Whether you're seeking a
          dream home or a unique investment, our curated listings offer the most exceptional
          options worldwide.
        </p>

        <FilterBar variant="desktop" />
        <Sidebar />
        <FindCard variant="desktop" />
        <PropertyGlassCard variant="desktop" />
        <PropertyGlassCard variant="mobile" />
      </div>

      {/* Mobile stack below the hero */}
      <div className="mt-3 space-y-3 lg:hidden">
        <FilterBar variant="mobile" />
        <FindCard variant="mobile" />
      </div>
    </section>
  );
}

function ModePill({
  label,
  side,
  value,
  mode,
  onSelect,
  className,
}: {
  label: string;
  side: "left" | "right";
  value: Mode;
  mode: Mode;
  onSelect: (m: Mode) => void;
  className?: string;
}) {
  const active = mode === value;
  const Icon = side === "left" ? ArrowUpLeft : ArrowUpRight;
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={() => onSelect(value)}
      className={cn(
        "group absolute z-20 flex h-12 w-[8.5rem] items-center rounded-full px-5 text-[0.95rem] font-medium transition-all duration-300 lg:h-[4.2rem] lg:w-[10.5rem] lg:px-[1.6rem] lg:text-[1rem] xl:w-[12.5rem]",
        side === "right" && "flex-row-reverse",
        active
          ? "bg-frame text-ink shadow-[0_16px_34px_-16px_rgba(20,16,60,0.55)]"
          : "bg-frame/70 text-ink/75 backdrop-blur-md hover:bg-frame/90 hover:text-ink",
        className
      )}
    >
      <Icon
        className={cn(
          "size-[1.15rem] text-accent transition-transform duration-300",
          side === "left"
            ? "group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            : "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        )}
        strokeWidth={2}
      />
      <span className={side === "left" ? "ml-4 lg:ml-[1.9rem]" : "mr-4 lg:mr-[1.9rem]"}>{label}</span>
      <span
        className={cn(
          "size-[0.4rem] rounded-full bg-accent transition-all duration-300",
          side === "left" ? "ml-auto" : "mr-auto",
          active ? "scale-100 opacity-100" : "scale-0 opacity-0"
        )}
      />
    </button>
  );
}
