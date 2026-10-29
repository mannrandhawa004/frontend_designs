import type { CSSProperties } from "react";

/**
 * Shape + mask toolkit.
 *
 * Every curved container in the hero is clipped with ONE SVG `mask-image` whose outline
 * already contains all of its curves (outer corners, inner fillets, tab corners). That means
 * each edge is rasterised by the browser exactly once, at device resolution — no stacked
 * overlays, no gradient halos, no seams between neighbouring pieces.
 */

/** Hero frame geometry, in rem. Layout components read the same numbers so they always agree. */
export const FRAME = {
  radius: 2.5, // outer corners of the stage
  mobileRadius: 2, // outer corners on small screens
  fillet: 1.75, // photo corners where a tab meets an edge / another tab
  tabCorner: 2, // rounded corners of the tabs themselves
  tab: { w: 40, h: 6 }, // filter bar hanging from the top edge (centred)
  rail: { w: 7.25, h: 32 }, // sidebar column at the bottom-left
  find: { right: 35.75, h: 21.5 }, // "Find the perfect place" card (its left edge is the rail)
} as const;

export interface Vertex {
  x: number;
  y: number;
  r: number;
}

const n = (v: number) => Math.round(v * 1000) / 1000;

/**
 * Closed outline through axis-aligned vertices with a tangent arc at every corner.
 * Vertices must be listed clockwise (screen space). Convex corners and concave corners
 * are detected automatically, so a "tab" cut-out is just a list of points.
 */
export function roundedPath(vs: Vertex[]): string {
  const count = vs.length;
  let d = "";
  vs.forEach((v, i) => {
    const p = vs[(i + count - 1) % count];
    const q = vs[(i + 1) % count];
    // unit vectors pointing from this corner to its neighbours
    const ax = Math.sign(p.x - v.x);
    const ay = Math.sign(p.y - v.y);
    const bx = Math.sign(q.x - v.x);
    const by = Math.sign(q.y - v.y);
    const lenP = Math.abs(p.x - v.x) + Math.abs(p.y - v.y);
    const lenQ = Math.abs(q.x - v.x) + Math.abs(q.y - v.y);
    const r = Math.max(0, Math.min(v.r, lenP / 2, lenQ / 2));
    // turning direction: clockwise turn -> sweep 1, counter-clockwise -> sweep 0
    const sweep = ay * bx - ax * by > 0 ? 1 : 0;

    d += `${i === 0 ? "M" : "L"}${n(v.x + ax * r)} ${n(v.y + ay * r)}`;
    if (r > 0) d += `A${n(r)} ${n(r)} 0 0 ${sweep} ${n(v.x + bx * r)} ${n(v.y + by * r)}`;
  });
  return `${d}Z`;
}

/** Outline of the hero photo: full stage minus the top tab and the bottom-left L-shaped cut-out. */
export function stagePath({
  W,
  H,
  u,
  desktop,
}: {
  W: number;
  H: number;
  u: number; // px per rem
  desktop: boolean;
}): string {
  if (!desktop) {
    const r = FRAME.mobileRadius * u;
    return roundedPath([
      { x: 0, y: 0, r },
      { x: W, y: 0, r },
      { x: W, y: H, r },
      { x: 0, y: H, r },
    ]);
  }

  const R = FRAME.radius * u;
  const fil = FRAME.fillet * u;
  const tc = FRAME.tabCorner * u;

  const tx0 = (W - FRAME.tab.w * u) / 2;
  const tx1 = tx0 + FRAME.tab.w * u;
  const th = FRAME.tab.h * u;

  const rw = FRAME.rail.w * u;
  const rt = H - FRAME.rail.h * u;

  const fr = FRAME.find.right * u;
  const ft = H - FRAME.find.h * u;

  return roundedPath([
    { x: 0, y: 0, r: R },
    // top tab
    { x: tx0, y: 0, r: fil },
    { x: tx0, y: th, r: tc },
    { x: tx1, y: th, r: tc },
    { x: tx1, y: 0, r: fil },
    { x: W, y: 0, r: R },
    { x: W, y: H, r: R },
    // bottom-left "L": find card, then the taller rail
    { x: fr, y: H, r: fil },
    { x: fr, y: ft, r: tc },
    { x: rw, y: ft, r: fil },
    { x: rw, y: rt, r: tc },
    { x: 0, y: rt, r: fil },
  ]);
}

/** Glass property card: a card with a tab hanging from its bottom-right. Units = px at 16px/rem. */
export const GLASS = { w: 456, h: 460 } as const;

export const GLASS_PATH = roundedPath([
  { x: 0, y: 0, r: 32 },
  { x: 456, y: 0, r: 32 },
  { x: 456, y: 460, r: 32 },
  { x: 212, y: 460, r: 32 },
  { x: 212, y: 312, r: 28 },
  { x: 0, y: 312, r: 32 },
]);

/** Turns a path into CSS mask properties (SVG image stretched 1:1 over the element). */
export function svgMask(d: string, w: number, h: number): CSSProperties {
  const W = n(w);
  const H = n(h);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${W}' height='${H}' viewBox='0 0 ${W} ${H}'><path d='${d}' fill='#000'/></svg>`;
  const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  return {
    WebkitMaskImage: url,
    maskImage: url,
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "0 0",
    maskPosition: "0 0",
  };
}
