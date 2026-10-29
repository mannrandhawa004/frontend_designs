import { useMemo, useState } from "react";
import { ArrowUpRight, Bath, BedDouble, Heart, MapPin, Scan, SearchX, X } from "lucide-react";
import {
  DEFAULT_FILTERS,
  PRICE_DEFAULT,
  PROPERTIES,
  matchesFilters,
  priceFor,
  type Property,
} from "@/data/properties";
import { formatArea, formatMoney, formatPrice } from "@/lib/format";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";

type Sort = "recommended" | "price-asc" | "price-desc" | "area";

const SORTS: { id: Sort; label: string }[] = [
  { id: "recommended", label: "Recommended" },
  { id: "price-asc", label: "Lowest price" },
  { id: "price-desc", label: "Highest price" },
  { id: "area", label: "Largest" },
];

export function Listings() {
  const { filters, mode, setMode, setFilter, resetFilters, clearFilters } = useStore();
  const [sort, setSort] = useState<Sort>("recommended");

  const { results, others } = useMemo(() => {
    const matched = PROPERTIES.filter((p) => matchesFilters(p, filters, mode));
    const sorted = [...matched].sort((a, b) => {
      if (sort === "price-asc") return priceFor(a, mode) - priceFor(b, mode);
      if (sort === "price-desc") return priceFor(b, mode) - priceFor(a, mode);
      if (sort === "area") return b.area - a.area;
      return b.likes - a.likes;
    });
    return { results: sorted, others: PROPERTIES.filter((p) => !matched.includes(p)) };
  }, [filters, mode, sort]);

  const chips = [
    filters.location !== "Any" && { key: "location", label: filters.location, clear: () => setFilter("location", "Any") },
    filters.type !== "Any" && { key: "type", label: filters.type, clear: () => setFilter("type", "Any") },
    filters.maxPrice !== null && {
      key: "price",
      label: `≤ ${formatMoney(filters.maxPrice)}${mode === "rent" ? "/mo" : ""}`,
      clear: () => setFilter("maxPrice", null),
    },
  ].filter(Boolean) as { key: string; label: string; clear: () => void }[];

  const isDefault =
    filters.location === DEFAULT_FILTERS.location &&
    filters.type === DEFAULT_FILTERS.type &&
    filters.maxPrice === PRICE_DEFAULT[mode];

  return (
    <section id="listings" className="mx-auto max-w-[88rem] scroll-mt-4 px-4 pb-10 pt-16 lg:px-[3rem] lg:pt-[6rem]">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Curated listings</p>
          <h2 className="mt-4 text-[2.5rem] font-medium leading-[1] tracking-[-0.03em] sm:text-[3.25rem]">
            Homes that match
            <br />
            your search
          </h2>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex rounded-full bg-chip p-1">
              {(["buy", "rent"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-all",
                    mode === m ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
                  )}
                >
                  {m === "buy" ? "For sale" : "For rent"}
                </button>
              ))}
            </div>
            {chips.map((c) => (
              <span
                key={c.key}
                className="flex items-center gap-1.5 rounded-full bg-surface py-1.5 pl-3.5 pr-1.5 text-sm font-medium ring-1 ring-line"
              >
                {c.label}
                <button
                  type="button"
                  aria-label={`Remove ${c.label}`}
                  onClick={c.clear}
                  className="grid size-6 place-items-center rounded-full text-muted transition-colors hover:bg-chip hover:text-ink"
                >
                  <X className="size-3.5" />
                </button>
              </span>
            ))}
            {!isDefault && (
              <button type="button" onClick={resetFilters} className="px-2 text-sm font-medium text-accent hover:underline">
                Reset
              </button>
            )}
          </div>
          <div className="no-scrollbar flex gap-1 overflow-x-auto">
            {SORTS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSort(s.id)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm transition-colors",
                  sort === s.id ? "bg-ink text-frame" : "text-muted hover:bg-chip hover:text-ink"
                )}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-muted">
        <span className="font-semibold text-ink">{results.length}</span>{" "}
        {results.length === 1 ? "home" : "homes"} {mode === "buy" ? "for sale" : "for rent"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {results.map((p, i) => (
            <PropertyCard key={p.id} p={p} index={i} />
          ))}
        </div>
      ) : (
        <div className="mt-4 flex flex-col items-center rounded-[2rem] bg-surface px-6 py-16 text-center ring-1 ring-line">
          <span className="grid size-14 place-items-center rounded-full bg-chip">
            <SearchX className="size-6 text-muted" />
          </span>
          <h3 className="mt-5 text-xl font-semibold">No homes match these filters</h3>
          <p className="mt-2 max-w-sm text-sm text-muted">
            Try another location, a different property type, or raise your budget.
          </p>
          <div className="mt-6 flex gap-2">
            <button type="button" onClick={resetFilters} className="rounded-full bg-chip px-5 py-2.5 text-sm font-medium hover:bg-line">
              Reset filters
            </button>
            <button type="button" onClick={clearFilters} className="rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-frame">
              Show all homes
            </button>
          </div>
        </div>
      )}

      {others.length > 0 && (
        <div className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h3 className="text-2xl font-medium tracking-tight">Explore beyond your filters</h3>
            <button type="button" onClick={clearFilters} className="shrink-0 text-sm font-medium text-accent hover:underline">
              Show all
            </button>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {others.map((p, i) => (
              <PropertyCard key={p.id} p={p} index={i} compact />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function PropertyCard({ p, index, compact }: { p: Property; index: number; compact?: boolean }) {
  const { mode, units, liked, toggleLike, openProperty } = useStore();
  const isLiked = liked.includes(p.id);

  return (
    <article
      className="group animate-rise cursor-pointer rounded-[2rem] bg-surface p-2.5 ring-1 ring-line transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-pop)]"
      style={{ animationDelay: `${index * 70}ms` }}
      onClick={() => openProperty(p.id)}
    >
      <div className={cn("relative overflow-hidden rounded-[1.6rem]", compact ? "aspect-[4/3]" : "aspect-[5/4]")}>
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
        />
        <span className="glass-chip absolute left-3 top-3 rounded-full px-3 py-1.5 text-xs font-medium">
          {p.type}
        </span>
        <button
          type="button"
          aria-label={isLiked ? "Unlike" : "Like"}
          aria-pressed={isLiked}
          onClick={(e) => {
            e.stopPropagation();
            toggleLike(p.id);
          }}
          className="glass-chip absolute right-3 top-3 grid size-10 place-items-center rounded-full transition-transform active:scale-90"
        >
          <Heart className={cn("size-[18px]", isLiked && "fill-accent text-accent")} strokeWidth={1.8} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-frame/90 px-3.5 py-1.5 text-sm font-semibold text-ink backdrop-blur">
          {formatPrice(p, mode)}
        </span>
      </div>
      <div className={cn("px-3 pt-4", compact ? "pb-2" : "pb-3")}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className={cn("truncate font-semibold tracking-tight", compact ? "text-base" : "text-lg")}>{p.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 truncate text-sm text-muted">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{p.address}</span>
            </p>
          </div>
          {!compact && (
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-chip text-ink transition-all duration-300 group-hover:bg-ink group-hover:text-frame">
              <ArrowUpRight className="size-[18px] transition-transform duration-300 group-hover:rotate-45" />
            </span>
          )}
        </div>
        <div className={cn("flex items-center gap-4 border-t border-line text-sm text-muted", compact ? "mt-3 pt-3" : "mt-4 pt-4")}>
          <span className="flex items-center gap-1.5">
            <Scan className="size-4" strokeWidth={1.8} />
            {formatArea(p.area, units)}
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble className="size-4" strokeWidth={1.8} />
            {p.beds}
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="size-4" strokeWidth={1.8} />
            {p.baths}
          </span>
        </div>
      </div>
    </article>
  );
}
