import { ArrowUpRight, Bath, BedDouble, Bookmark, Forward, Heart, MapPin, Scan, Trees } from "lucide-react";
import { getProperty } from "@/data/properties";
import { copyPropertyLink, formatArea, formatCompact } from "@/lib/format";
import { GLASS, GLASS_PATH, svgMask } from "@/lib/shapes";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";
import { LogoBadge } from "./Logo";

// Card (28.5rem × 28.75rem) = viewBox (456 × 460) at 16px/rem, so the mask scales uniformly
// with the rem-based layout and the radii never distort.
const glassMask = svgMask(GLASS_PATH, GLASS.w, GLASS.h);

export function PropertyGlassCard({ variant }: { variant: "desktop" | "mobile" }) {
  const { featuredId, units, liked, saved, toggleLike, toggleSave, openProperty, notify } = useStore();
  const p = getProperty(featuredId);
  const isLiked = liked.includes(p.id);
  const isSaved = saved.includes(p.id);

  const onShare = async () => {
    const r = await copyPropertyLink(p);
    if (r === "copied") notify("Link copied to clipboard");
    else if (r === "failed") notify("Couldn't copy the link");
  };

  const onLike = () => {
    toggleLike(p.id);
    if (!isLiked) notify(`You liked ${p.name}`);
  };
  const onSave = () => {
    toggleSave(p.id);
    notify(isSaved ? "Removed from saved homes" : "Saved to your collection");
  };

  const actions = [
    { key: "like", icon: Heart, label: formatCompact(p.likes + (isLiked ? 1 : 0)), on: isLiked, onClick: onLike, aria: "Like" },
    { key: "save", icon: Bookmark, label: formatCompact(p.saves + (isSaved ? 1 : 0)), on: isSaved, onClick: onSave, aria: "Save" },
    { key: "share", icon: Forward, label: "", on: false, onClick: onShare, aria: "Share" },
  ];

  const header = (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="text-[1.5rem] font-semibold leading-tight tracking-[-0.01em]">{p.name}</h3>
        <p className="mt-[0.55rem] flex items-start gap-[0.45rem] text-[0.85rem] leading-snug opacity-80">
          <MapPin className="mt-[0.12rem] size-[0.95rem] shrink-0" strokeWidth={1.8} />
          <span className="max-w-[10.5rem]">{p.address}</span>
        </p>
      </div>
      <button
        type="button"
        aria-label={`Open ${p.name}`}
        onClick={() => openProperty(p.id)}
        className="group grid size-[3.5rem] shrink-0 place-items-center rounded-full bg-white text-[#16153a] shadow-[0_10px_24px_-12px_rgba(20,16,60,0.5)] transition-transform duration-300 hover:scale-105"
      >
        <ArrowUpRight className="size-[1.25rem] transition-transform duration-300 group-hover:rotate-45" strokeWidth={2} />
      </button>
    </div>
  );

  const stats = (
    <>
      <span className="flex items-center gap-[0.4rem]">
        <Scan className="size-[0.95rem]" strokeWidth={1.8} />
        {formatArea(p.area, units)}
      </span>
      <span className="size-[0.25rem] rounded-full bg-current opacity-60" />
      <span className="flex items-center gap-[0.4rem]">
        <Trees className="size-[0.95rem]" strokeWidth={1.8} />
        {formatArea(p.yard, units)} {p.outdoorLabel}
      </span>
    </>
  );
  const stats2 = (
    <>
      <span className="flex items-center gap-[0.4rem]">
        <BedDouble className="size-[0.95rem]" strokeWidth={1.8} />
        {p.beds} bedrooms
      </span>
      <span className="size-[0.25rem] rounded-full bg-current opacity-60" />
      <span className="flex items-center gap-[0.4rem]">
        <Bath className="size-[0.95rem]" strokeWidth={1.8} />
        {p.baths} baths
      </span>
    </>
  );

  if (variant === "desktop") {
    return (
      <div className="absolute bottom-[1.9rem] right-[1.9rem] z-20 hidden h-[28.75rem] w-[28.5rem] text-[var(--glass-ink)] lg:block">
        {/* frosted fill, masked to the card silhouette */}
        <div aria-hidden="true" className="glass absolute inset-0" style={glassMask} />

        {/* 1px edge highlight, clipped to the inside of the silhouette so it is always crisp */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
          viewBox={`0 0 ${GLASS.w} ${GLASS.h}`}
          preserveAspectRatio="none"
        >
          <defs>
            <clipPath id="glass-clip">
              <path d={GLASS_PATH} />
            </clipPath>
            <linearGradient id="glass-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "#fff", stopOpacity: "var(--edge-a)" }} />
              <stop offset="1" style={{ stopColor: "#fff", stopOpacity: "var(--edge-b)" }} />
            </linearGradient>
          </defs>
          <path
            d={GLASS_PATH}
            fill="none"
            stroke="url(#glass-edge)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
            clipPath="url(#glass-clip)"
          />
        </svg>

        <div key={p.id} className="animate-rise absolute inset-x-0 top-0 h-[19.5rem] p-[2.25rem]">
          {header}
          <p className="mt-[1.4rem] text-[0.85rem] leading-[1.5] opacity-80">{p.description}</p>
          <div className="absolute bottom-[1.7rem] right-[2.25rem] flex flex-col items-end gap-[0.55rem] text-[0.85rem]">
            <div className="flex items-center gap-[0.6rem]">{stats}</div>
            <div className="flex items-center gap-[0.6rem]">{stats2}</div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 flex h-[9.25rem] w-[15.25rem] items-start justify-center gap-[0.9rem] pt-[2.1rem]">
          {actions.map((a) => (
            <div key={a.key} className="flex flex-col items-center gap-[0.4rem]">
              <button
                type="button"
                aria-label={a.aria}
                aria-pressed={a.key === "share" ? undefined : a.on}
                onClick={a.onClick}
                className={cn(
                  "glass-btn grid size-[3.4rem] place-items-center rounded-full ring-1 ring-white/40 transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
                  a.on && "!bg-white !text-[#16153a]"
                )}
              >
                <a.icon
                  className={cn(
                    "size-[1.15rem] transition-transform",
                    a.on && a.key === "like" && "scale-110 fill-accent text-accent",
                    a.on && a.key === "save" && "fill-[#16153a]"
                  )}
                  strokeWidth={1.8}
                />
              </button>
              <span className="h-[1rem] text-[0.72rem] font-medium opacity-90">{a.label}</span>
            </div>
          ))}
        </div>

        <a
          href="#top"
          aria-label="Utopia Estates"
          className="group absolute bottom-0 left-0 block size-[9rem] rounded-full shadow-[0_24px_50px_-20px_rgba(20,12,80,0.7)]"
        >
          <LogoBadge
            className="size-full transition-transform duration-500 group-hover:rotate-[-8deg]"
            markClassName="size-[4.4rem]"
          />
        </a>
      </div>
    );
  }

  return (
    <div
      key={p.id}
      className="glass animate-rise relative z-10 m-3 mt-auto rounded-[1.75rem] p-5 ring-1 ring-white/40 lg:hidden"
    >
      {header}
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed opacity-80">{p.description}</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem]">{stats}</div>
      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.8rem]">{stats2}</div>
      <div className="mt-4 flex items-center gap-2 border-t border-white/30 pt-4">
        {actions.map((a) => (
          <button
            key={a.key}
            type="button"
            aria-label={a.aria}
            onClick={a.onClick}
            className={cn(
              "glass-btn flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-medium ring-1 ring-white/40",
              a.on && "!bg-white !text-[#16153a]"
            )}
          >
            <a.icon className={cn("size-4", a.on && a.key === "like" && "fill-accent text-accent")} strokeWidth={1.8} />
            {a.label || "Share"}
          </button>
        ))}
      </div>
    </div>
  );
}
