import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, SearchX } from "lucide-react";
import { PROPERTIES } from "@/data/properties";
import { formatPrice } from "@/lib/format";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";

export function SearchOverlay() {
  const { panel, setPanel } = useStore();
  if (panel !== "search") return null;
  return <SearchBody onClose={() => setPanel(null)} />;
}

function SearchBody({ onClose }: { onClose: () => void }) {
  const { mode, openProperty } = useStore();
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PROPERTIES;
    return PROPERTIES.filter((p) =>
      [p.name, p.address, p.region, p.type, ...p.amenities].some((v) => v.toLowerCase().includes(s))
    );
  }, [q]);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const choose = (id: string) => {
    onClose();
    openProperty(id);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) choose(results[cursor].id);
  };

  return (
    <div
      className="animate-fade fixed inset-0 z-[70] flex items-start justify-center bg-[#0c0a24]/45 p-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-label="Search properties"
        className="animate-pop w-full max-w-[40rem] rounded-[2rem] bg-frame p-2.5 text-ink shadow-[var(--shadow-pop)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-16 items-center gap-3 rounded-[1.5rem] bg-surface px-5 ring-1 ring-line">
          <Search className="size-5 text-muted" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setCursor(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search by name, city, state or amenity…"
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted"
          />
          <kbd className="rounded-lg bg-chip px-2 py-1 text-xs text-muted">Esc</kbd>
        </div>

        <div className="mt-2 max-h-[55vh] overflow-y-auto p-1">
          {results.length === 0 ? (
            <div className="flex flex-col items-center py-12 text-center">
              <SearchX className="size-8 text-muted" />
              <p className="mt-3 font-medium">No results for “{q}”</p>
              <p className="text-sm text-muted">Try “Arizona”, “pool” or “chalet”.</p>
            </div>
          ) : (
            <>
              <p className="px-3 pb-1 pt-2 text-xs font-medium uppercase tracking-[0.12em] text-muted">
                {q ? `${results.length} results` : "All properties"}
              </p>
              {results.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => choose(p.id)}
                  className={cn(
                    "group flex w-full items-center gap-4 rounded-[1.25rem] p-2 text-left transition-colors",
                    i === cursor && "bg-chip"
                  )}
                >
                  <img src={p.image} alt="" className="size-14 rounded-[1rem] object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{p.name}</span>
                    <span className="block truncate text-sm text-muted">
                      {p.address} · {p.type}
                    </span>
                  </span>
                  <span className="hidden text-sm font-semibold sm:block">{formatPrice(p, mode)}</span>
                  <ArrowUpRight
                    className={cn(
                      "mr-2 size-4 text-muted transition-all",
                      i === cursor && "rotate-45 text-ink"
                    )}
                  />
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
