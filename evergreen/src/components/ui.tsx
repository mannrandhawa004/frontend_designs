import type { ElementType, ReactNode } from "react";
import { cn } from "../utils/cn";
import { useReveal } from "../hooks";

export function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2c3 4 8 5 8 10a8 8 0 1 1-16 0c0-5 5-6 8-10Zm0 4.6c-1.8 2.2-4 3.2-4 5.4a4 4 0 0 0 8 0c0-2.2-2.2-3.2-4-5.4Z" />
    </svg>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 0c.6 6.3 5.7 11.4 12 12-6.3.6-11.4 5.7-12 12-.6-6.3-5.7-11.4-12-12C6.3 11.4 11.4 6.3 12 0Z" />
    </svg>
  );
}

const FLOWER_PATH =
  "M536.423 93.4889C536.219 92.0188 535.024 90.853 533.531 90.7388C444.669 82.7082 411.704 97.2088 381.662 150.726C398.031 91.56 384.832 58.0543 316.05 1.20442L316.083 1.21797C314.942 0.247713 313.263 0.211008 312.093 1.13494C241.719 55.6659 227.915 87.7408 245.879 150.085C214.252 93.4352 181.756 80.6517 93.4847 92.2351C92.005 92.4153 90.8488 93.6336 90.7346 95.1269C82.7029 183.987 97.2033 216.951 150.711 246.969C91.5772 230.614 58.0476 243.823 1.20998 312.571C0.239695 313.712 0.226227 315.381 1.1269 316.561C55.6481 386.909 87.7334 400.736 150.055 382.782C93.4271 414.399 80.6533 446.918 92.2262 535.164C92.4297 536.634 93.6151 537.777 95.1181 537.914C183.98 545.945 216.921 531.454 246.987 477.927C230.618 537.093 243.817 570.599 312.599 627.449L312.566 627.435C313.707 628.405 315.376 628.419 316.556 627.518C386.929 572.987 400.734 540.912 382.77 478.568C414.397 535.218 446.893 548.001 535.164 536.418C535.449 536.381 535.714 536.298 535.97 536.191C537.062 535.736 537.81 534.715 537.914 533.526C545.946 444.666 531.455 411.726 477.937 381.684C537.105 398.052 570.601 384.83 627.463 316.072L627.439 316.082C628.4 314.918 628.423 313.272 627.523 312.092C573.001 241.744 540.916 227.916 478.595 245.871C535.222 214.253 547.996 181.735 536.423 93.4887L536.423 93.4889Z";

export function Flower({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 629 629" className={className} fill="none" aria-hidden>
      <path d={FLOWER_PATH} fill="currentColor" />
    </svg>
  );
}

export function Button({
  children,
  variant = "dark",
  className,
  as = "button",
  href,
  ...rest
}: {
  children: ReactNode;
  variant?: "dark" | "lime" | "outline" | "white";
  className?: string;
  as?: "button" | "a";
  href?: string;
  [k: string]: unknown;
}) {
  const styles = {
    dark: "bg-forest text-white hover:bg-forest-dark",
    lime: "bg-lime text-forest-dark hover:bg-lime-soft",
    outline: "border border-forest/25 text-forest hover:bg-forest hover:text-white",
    white: "bg-white text-forest hover:bg-cream",
  }[variant];
  const Cmp: ElementType = as;
  return (
    <Cmp
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 active:scale-95",
        styles,
        className,
      )}
      {...rest}
    >
      {children}
    </Cmp>
  );
}

export function Eyebrow({ children, light }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em]",
        light ? "text-lime" : "text-forest/60",
      )}
    >
      <Leaf className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", shown && "reveal-in", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-5 py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
