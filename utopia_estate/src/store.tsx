import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import {
  DEFAULT_FILTERS,
  FEATURED_IDS,
  PRICE_DEFAULT,
  type Filters,
  type Mode,
} from "@/data/properties";
import type { Units } from "@/lib/format";

export type Theme = "light" | "dark";
export type Panel = "search" | "chat" | null;

interface Store {
  theme: Theme;
  setTheme: (t: Theme) => void;
  units: Units;
  setUnits: (u: Units) => void;
  autoplay: boolean;
  setAutoplay: (v: boolean) => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  filters: Filters;
  setFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  resetFilters: () => void;
  clearFilters: () => void;
  featuredId: string;
  setFeaturedId: (id: string) => void;
  nextFeatured: (dir?: 1 | -1) => void;
  liked: string[];
  toggleLike: (id: string) => void;
  saved: string[];
  toggleSave: (id: string) => void;
  openPropertyId: string | null;
  openProperty: (id: string | null) => void;
  panel: Panel;
  setPanel: (p: Panel) => void;
  toast: { id: number; message: string } | null;
  notify: (message: string) => void;
}

const Ctx = createContext<Store | null>(null);

function readLS<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeLS(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );
  const [units, setUnits] = useState<Units>(() => readLS<Units>("utopia:units", "m2"));
  const [autoplay, setAutoplay] = useState(false);
  const [mode, setModeState] = useState<Mode>("buy");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [featuredId, setFeaturedId] = useState(FEATURED_IDS[0]);
  const [liked, setLiked] = useState<string[]>(() => readLS<string[]>("utopia:liked", []));
  const [saved, setSaved] = useState<string[]>(() => readLS<string[]>("utopia:saved", []));
  const [openPropertyId, setOpenPropertyId] = useState<string | null>(null);
  const [panel, setPanel] = useState<Panel>(null);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => writeLS("utopia:units", units), [units]);
  useEffect(() => writeLS("utopia:liked", liked), [liked]);
  useEffect(() => writeLS("utopia:saved", saved), [saved]);

  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    meta?.setAttribute("content", theme === "dark" ? "#0f0e1f" : "#f3f2f9");
  }, [theme]);

  const setTheme = useCallback((t: Theme) => {
    const apply = () => {
      document.documentElement.classList.toggle("dark", t === "dark");
      try {
        localStorage.setItem("utopia-theme", t);
      } catch {
        /* ignore */
      }
      flushSync(() => setThemeState(t));
    };
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (doc.startViewTransition && !reduce) doc.startViewTransition(apply);
    else apply();
  }, []);

  const setMode = useCallback((m: Mode) => {
    setModeState(m);
    setFilters((f) => ({ ...f, maxPrice: PRICE_DEFAULT[m] }));
  }, []);

  const setFilter = useCallback(<K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters((f) => ({ ...f, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({ ...DEFAULT_FILTERS, maxPrice: PRICE_DEFAULT[mode] });
  }, [mode]);

  const clearFilters = useCallback(() => {
    setFilters({ location: "Any", type: "Any", maxPrice: null });
  }, []);

  const nextFeatured = useCallback((dir: 1 | -1 = 1) => {
    setFeaturedId((id) => {
      const i = FEATURED_IDS.indexOf(id);
      return FEATURED_IDS[(i + dir + FEATURED_IDS.length) % FEATURED_IDS.length];
    });
  }, []);

  const toggleLike = useCallback((id: string) => {
    setLiked((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  }, []);

  const toggleSave = useCallback((id: string) => {
    setSaved((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id]));
  }, []);

  const notify = useCallback((message: string) => {
    window.clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message });
    toastTimer.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const value = useMemo<Store>(
    () => ({
      theme,
      setTheme,
      units,
      setUnits,
      autoplay,
      setAutoplay,
      mode,
      setMode,
      filters,
      setFilter,
      resetFilters,
      clearFilters,
      featuredId,
      setFeaturedId,
      nextFeatured,
      liked,
      toggleLike,
      saved,
      toggleSave,
      openPropertyId,
      openProperty: setOpenPropertyId,
      panel,
      setPanel,
      toast,
      notify,
    }),
    [
      theme,
      setTheme,
      units,
      autoplay,
      mode,
      setMode,
      filters,
      setFilter,
      resetFilters,
      clearFilters,
      featuredId,
      nextFeatured,
      liked,
      toggleLike,
      saved,
      toggleSave,
      openPropertyId,
      panel,
      toast,
      notify,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
