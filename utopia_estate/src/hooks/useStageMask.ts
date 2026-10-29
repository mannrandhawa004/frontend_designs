import { useLayoutEffect, useState, type CSSProperties, type RefObject } from "react";
import { stagePath, svgMask } from "@/lib/shapes";

/**
 * Builds the hero mask at the element's real pixel size, so the SVG is never stretched and
 * every radius stays a perfect circle. Rebuilt on resize (and when the root font-size, which
 * drives all rem units, changes).
 */
export function useStageMask(ref: RefObject<HTMLElement | null>): CSSProperties {
  const [style, setStyle] = useState<CSSProperties>({});

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(min-width: 1024px)");
    let raf = 0;
    let last = "";

    const update = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      if (!w || !h) return;
      const u = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const d = stagePath({ W: w, H: h, u, desktop: mq.matches });
      const key = `${w}|${h}|${d}`;
      if (key === last) return;
      last = key;
      setStyle(svgMask(d, w, h));
    };

    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return style;
}
