import type { Mode, Property } from "@/data/properties";

export type Units = "m2" | "ft2";

export const formatMoney = (n: number) =>
  "$" + Math.round(n).toLocaleString("en-US").replace(/,/g, " ");

export const formatPrice = (p: Property, mode: Mode) =>
  mode === "buy" ? formatMoney(p.price) : `${formatMoney(p.rent)}/mo`;

export const formatCompact = (n: number) => {
  if (n < 1000) return String(n);
  const v = n / 1000;
  return `${v.toFixed(v >= 10 ? 0 : 1).replace(/\.0$/, "")}K`;
};

export const formatArea = (m2: number, units: Units) =>
  units === "m2"
    ? `${m2.toLocaleString("en-US")}m²`
    : `${Math.round(m2 * 10.7639).toLocaleString("en-US")} ft²`;

export async function copyPropertyLink(p: Property): Promise<"copied" | "shared" | "failed"> {
  const url = `${window.location.origin}${window.location.pathname}#${p.id}`;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return "copied";
    }
    if (navigator.share) {
      await navigator.share({ title: p.name, text: p.description, url });
      return "shared";
    }
  } catch {
    /* fall through */
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = url;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok ? "copied" : "failed";
  } catch {
    return "failed";
  }
}
