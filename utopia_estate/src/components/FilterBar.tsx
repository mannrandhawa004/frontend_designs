import { useState } from "react";
import { Building, Check, ChevronDown, MapPin, Wallet, type LucideIcon } from "lucide-react";
import {
  LOCATIONS,
  PRICE_OPTIONS,
  PROPERTIES,
  TYPES,
  matchesFilters,
  type Filters,
} from "@/data/properties";
import { formatMoney } from "@/lib/format";
import { useDismiss } from "@/hooks/useDismiss";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";
import { FRAME } from "@/lib/shapes";

type Key = keyof Filters;
type OptionValue = string | number | null;
interface Option {
  value: OptionValue;
  label: string;
}
interface Group {
  key: Key;
  label: string;
  icon: LucideIcon;
  value: string;
  current: OptionValue;
  options: Option[];
}

export function FilterBar({ variant }: { variant: "desktop" | "mobile" }) {
  const { filters, setFilter, mode, notify } = useStore();
  const [open, setOpen] = useState<Key | null>(null);
  const ref = useDismiss<HTMLDivElement>(open !== null, () => setOpen(null));

  const priceLabel = (v: number | null) =>
    v === null
      ? mode === "buy"
        ? "Any price"
        : "Any rent"
      : mode === "buy"
        ? formatMoney(v)
        : `${formatMoney(v)}/mo`;

  const groups: Group[] = [
    {
      key: "location",
      label: "Location",
      icon: MapPin,
      value: filters.location === "Any" ? "Anywhere" : filters.location,
      current: filters.location,
      options: LOCATIONS.map((l) => ({ value: l, label: l === "Any" ? "Anywhere" : l })),
    },
    {
      key: "type",
      label: "Property Type",
      icon: Building,
      value: filters.type === "Any" ? "Any type" : filters.type,
      current: filters.type,
      options: TYPES.map((t) => ({ value: t, label: t === "Any" ? "Any type" : t })),
    },
    {
      key: "maxPrice",
      label: mode === "buy" ? "Max Price" : "Max Rent",
      icon: Wallet,
      value: priceLabel(filters.maxPrice),
      current: filters.maxPrice,
      options: PRICE_OPTIONS[mode].map((v) => ({ value: v, label: priceLabel(v) })),
    },
  ];

  const select = (key: Key, value: OptionValue) => {
    setFilter(key, value as never);
    setOpen(null);
    const next = { ...filters, [key]: value } as Filters;
    const count = PROPERTIES.filter((p) => matchesFilters(p, next, mode)).length;
    notify(
      count
        ? `${count} ${count === 1 ? "home matches" : "homes match"} your search`
        : "No exact matches — try widening your filters"
    );
  };

  if (variant === "desktop") {
    return (
      <div
        ref={ref}
        className="absolute left-1/2 top-0 z-30 hidden -translate-x-1/2 lg:block"
        style={{ width: `${FRAME.tab.w}rem`, height: `${FRAME.tab.h}rem` }}
      >
        {/* transparent: the hero mask cuts this tab out of the photo, revealing the frame colour */}
        <div className="grid h-full grid-cols-3 items-center gap-[1.5rem] px-[2.6rem] pt-[0.35rem]">

          {groups.map((g) => (
            <div key={g.key} className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={open === g.key}
                onClick={() => setOpen(open === g.key ? null : g.key)}
                className="group flex w-full flex-col items-start rounded-xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
              >
                <span className="flex items-center gap-[0.4rem] text-[0.75rem] text-muted">
                  <g.icon className="size-[0.85rem]" strokeWidth={1.8} />
                  {g.label}
                </span>
                <span className="mt-[0.3rem] flex w-full items-center justify-between gap-[0.75rem] pl-[1.25rem] text-[1rem] font-semibold text-ink">
                  <span className="min-w-0 truncate">{g.value}</span>
                  <ChevronDown
                    className={cn(
                      "size-[1.05rem] transition-transform duration-300 group-hover:translate-y-px",
                      open === g.key && "rotate-180"
                    )}
                    strokeWidth={2.2}
                  />
                </span>
              </button>
              {open === g.key && (
                <Menu
                  options={g.options}
                  current={g.current}
                  onSelect={(v) => select(g.key, v)}
                  className="left-[-0.75rem] top-[calc(100%+2rem)]"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="relative grid gap-1 rounded-[1.75rem] bg-surface p-2 ring-1 ring-line sm:grid-cols-3 lg:hidden"
    >
      {groups.map((g) => (
        <div key={g.key} className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={open === g.key}
            onClick={() => setOpen(open === g.key ? null : g.key)}
            className="flex w-full items-center gap-3 rounded-[1.25rem] px-3 py-2.5 text-left transition-colors hover:bg-chip/70"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-chip text-ink">
              <g.icon className="size-4" strokeWidth={1.8} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs text-muted">{g.label}</span>
              <span className="block truncate font-semibold text-ink">{g.value}</span>
            </span>
            <ChevronDown
              className={cn("size-4 text-ink transition-transform", open === g.key && "rotate-180")}
            />
          </button>
          {open === g.key && (
            <Menu
              options={g.options}
              current={g.current}
              onSelect={(v) => select(g.key, v)}
              className="inset-x-0 top-[calc(100%+0.4rem)]"
            />
          )}
        </div>
      ))}
    </div>
  );
}

function Menu({
  options,
  current,
  onSelect,
  className,
}: {
  options: Option[];
  current: OptionValue;
  onSelect: (v: OptionValue) => void;
  className?: string;
}) {
  return (
    <div
      role="listbox"
      className={cn(
        "animate-pop absolute z-50 min-w-[14rem] rounded-[1.4rem] bg-frame p-[0.4rem] shadow-[var(--shadow-pop)] ring-1 ring-line",
        className
      )}
    >
      {options.map((o) => {
        const selected = o.value === current;
        return (
          <button
            key={String(o.value)}
            type="button"
            role="option"
            aria-selected={selected}
            onClick={() => onSelect(o.value)}
            className={cn(
              "flex w-full items-center justify-between gap-6 rounded-[1rem] px-[0.9rem] py-[0.65rem] text-left text-[0.92rem] text-ink transition-colors hover:bg-chip",
              selected && "bg-chip font-semibold"
            )}
          >
            {o.label}
            {selected && <Check className="size-4 text-accent" strokeWidth={2.6} />}
          </button>
        );
      })}
    </div>
  );
}
