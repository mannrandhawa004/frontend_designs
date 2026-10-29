import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Bath,
  BedDouble,
  Bookmark,
  CalendarDays,
  Check,
  Forward,
  Heart,
  MapPin,
  Scan,
  Trees,
  X,
} from "lucide-react";
import { getProperty } from "@/data/properties";
import { copyPropertyLink, formatArea, formatCompact, formatPrice } from "@/lib/format";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";

const TIMES = ["10:00", "12:30", "15:00", "17:30"];

export function PropertyModal() {
  const { openPropertyId, openProperty } = useStore();
  if (!openPropertyId) return null;
  return <ModalBody key={openPropertyId} id={openPropertyId} onClose={() => openProperty(null)} />;
}

function ModalBody({ id, onClose }: { id: string; onClose: () => void }) {
  const { mode, units, liked, saved, toggleLike, toggleSave, notify } = useStore();
  const p = getProperty(id);
  const [img, setImg] = useState(0);
  const [day, setDay] = useState(0);
  const [time, setTime] = useState(TIMES[0]);
  const [name, setName] = useState("Emma Larsen");
  const [email, setEmail] = useState("emma@utopia.homes");
  const [booked, setBooked] = useState(false);
  const isLiked = liked.includes(p.id);
  const isSaved = saved.includes(p.id);

  const days = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        return d;
      }),
    []
  );

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      notify("Please add your name and a valid email");
      return;
    }
    setBooked(true);
    const label = days[day].toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
    notify(`Tour requested for ${label} at ${time}`);
  };

  const share = async () => {
    const r = await copyPropertyLink(p);
    if (r === "copied") notify("Link copied to clipboard");
  };

  const specs = [
    { icon: Scan, label: "Living area", value: formatArea(p.area, units) },
    { icon: Trees, label: p.outdoorLabel === "yard" ? "Yard" : "Terrace", value: formatArea(p.yard, units) },
    { icon: BedDouble, label: "Bedrooms", value: String(p.beds) },
    { icon: Bath, label: "Bathrooms", value: String(p.baths) },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
      className="animate-fade fixed inset-0 z-[80] flex items-end justify-center bg-[#0c0a24]/55 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="animate-rise relative max-h-[94vh] w-full max-w-[66rem] overflow-y-auto rounded-t-[2rem] bg-frame p-2.5 text-ink shadow-[var(--shadow-pop)] sm:rounded-[2.25rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="grid gap-2.5 lg:grid-cols-[1.2fr_1fr]">
          {/* Gallery */}
          <div className="relative min-h-[17rem] overflow-hidden rounded-[1.75rem] sm:min-h-[22rem] lg:min-h-full">
            {p.gallery.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={`${p.name} photo ${i + 1}`}
                className={cn(
                  "absolute inset-0 size-full object-cover transition-opacity duration-700",
                  i === img ? "opacity-100" : "opacity-0"
                )}
              />
            ))}
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(15,12,45,0.45),transparent_40%)]" />
            <span className="glass-chip absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-xs font-medium">
              {p.type} · Built {p.year}
            </span>
            <div className="absolute bottom-4 left-4 flex gap-2">
              {p.gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setImg(i)}
                  className={cn(
                    "size-14 overflow-hidden rounded-2xl ring-2 transition-all",
                    i === img ? "ring-white" : "opacity-70 ring-transparent hover:opacity-100"
                  )}
                >
                  <img src={src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                type="button"
                aria-label="Like"
                onClick={() => toggleLike(p.id)}
                className={cn("glass-btn flex h-11 items-center gap-1.5 rounded-full px-4 text-sm font-medium ring-1 ring-white/40", isLiked && "!bg-white !text-[#16153a]")}
              >
                <Heart className={cn("size-4", isLiked && "fill-accent text-accent")} />
                {formatCompact(p.likes + (isLiked ? 1 : 0))}
              </button>
              <button
                type="button"
                aria-label="Save"
                onClick={() => {
                  toggleSave(p.id);
                  notify(isSaved ? "Removed from saved homes" : "Saved to your collection");
                }}
                className={cn("glass-btn grid size-11 place-items-center rounded-full ring-1 ring-white/40", isSaved && "!bg-white !text-[#16153a]")}
              >
                <Bookmark className={cn("size-4", isSaved && "fill-current")} />
              </button>
              <button type="button" aria-label="Share" onClick={share} className="glass-btn grid size-11 place-items-center rounded-full ring-1 ring-white/40">
                <Forward className="size-4" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col p-3 sm:p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[1.9rem] font-semibold leading-tight tracking-[-0.02em]">{p.name}</h2>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin className="size-4" /> {p.address}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                onClick={onClose}
                className="grid size-11 shrink-0 place-items-center rounded-full bg-chip transition-colors hover:bg-ink hover:text-frame"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-[2rem] font-medium tracking-tight">{formatPrice(p, mode)}</span>
              <span className="text-sm text-muted">{mode === "buy" ? "asking price" : "per month, utilities incl."}</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {specs.map((s) => (
                <div key={s.label} className="rounded-[1.25rem] bg-surface p-3 ring-1 ring-line">
                  <s.icon className="size-4 text-muted" strokeWidth={1.8} />
                  <p className="mt-2 font-semibold">{s.value}</p>
                  <p className="text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">{p.description}</p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.amenities.map((a) => (
                <span key={a} className="rounded-full bg-chip px-3 py-1.5 text-xs font-medium">
                  {a}
                </span>
              ))}
            </div>

            <form onSubmit={submit} className="mt-6 rounded-[1.5rem] bg-surface p-4 ring-1 ring-line">
              <p className="flex items-center gap-2 font-semibold">
                <CalendarDays className="size-4 text-accent" /> Schedule a tour
              </p>
              {booked ? (
                <div className="mt-4 flex items-center gap-3 rounded-[1.1rem] bg-chip p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-white">
                    <Check className="size-5" />
                  </span>
                  <p className="text-sm">
                    Request sent! Our concierge will confirm your visit on{" "}
                    <b>{days[day].toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}</b> at{" "}
                    <b>{time}</b>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto">
                    {days.map((d, i) => (
                      <button
                        key={d.toISOString()}
                        type="button"
                        onClick={() => setDay(i)}
                        className={cn(
                          "flex min-w-[3.6rem] flex-col items-center rounded-2xl px-2 py-2 text-xs transition-colors",
                          i === day ? "bg-ink text-frame" : "bg-chip hover:bg-line"
                        )}
                      >
                        <span className="opacity-70">{d.toLocaleDateString("en-US", { weekday: "short" })}</span>
                        <span className="text-base font-semibold">{d.getDate()}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-4 gap-1.5">
                    {TIMES.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTime(t)}
                        className={cn(
                          "rounded-full py-2 text-xs font-medium transition-colors",
                          t === time ? "bg-accent text-white" : "bg-chip hover:bg-line"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      aria-label="Full name"
                      className="rounded-full bg-chip px-4 py-2.5 text-sm outline-none ring-accent/50 placeholder:text-muted focus:ring-2"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      aria-label="Email"
                      className="rounded-full bg-chip px-4 py-2.5 text-sm outline-none ring-accent/50 placeholder:text-muted focus:ring-2"
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-3 w-full rounded-full bg-ink py-3 text-sm font-semibold text-frame transition-opacity hover:opacity-90"
                  >
                    Request tour
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
