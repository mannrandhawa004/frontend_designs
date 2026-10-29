"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const SLICES = 16;
const CAMERA = 1.6;
const MAX_WIDTH = 55;

function arc(bend: number) {
  return (CAMERA - 1 + Math.cos(bend)) / (2 * CAMERA * Math.sin(bend));
}

function measure(
  width: number,
  height: number,
  tile: number,
  aspect: number,
  gap: number,
  bend: number,
) {
  const h = Math.min(
    (tile / 100) * height,
    ((MAX_WIDTH / 100) * width) / aspect,
  );
  const radius = width * arc(bend);
  if (!(h > 0) || !(radius > 0)) {
    return { columns: 2, sweep: 0, unit: 0, limit: 0 };
  }

  const deg = (rad: number) => (rad * 180) / Math.PI;
  const unit = deg(h / radius);
  const pitch = (aspect + gap / 100) * unit;
  const limit = deg(bend) + (aspect * unit) / 2;
  const columns = Math.min(60, Math.max(2, Math.ceil((2 * limit) / pitch)));
  const round = (n: number) => +n.toFixed(4);
  const sweep = round((columns * pitch) / 2);

  return {
    columns,
    sweep,
    unit: round(unit),
    limit: round(Math.min(sweep, limit)),
  };
}

export type TiltedGridImage = {
  src: string;
  alt?: string;
};

export type TiltedGridHeroProps = {
  images: TiltedGridImage[];
  speed?: number;
  tileHeight?: number;
  aspectRatio?: number;
  gap?: number;
  axis?: number;
  curve?: number;
  fade?: number;
  paused?: boolean;
  children?: React.ReactNode;
  className?: string;
};

/**
 * A continuous image row that is split into facets to create a true curved
 * 3D cylinder motion. Tiles are reassigned only after they wrap off screen.
 */
export function TiltedGridHero({
  images,
  speed = 4,
  tileHeight = 26,
  aspectRatio = 16 / 9,
  gap = 6,
  axis = 56,
  curve = 80,
  fade = 12,
  paused = false,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & TiltedGridHeroProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const orbit = `tgh-o-${id}`;
  const tile = `tgh-t-${id}`;
  const bend = (Math.min(85, Math.max(5, curve)) * Math.PI) / 180;
  const [layout, setLayout] = React.useState<ReturnType<typeof measure> | null>(null);
  const [shown, setShown] = React.useState<Record<number, number>>({});
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const next = measure(width, height, tileHeight, aspectRatio, gap, bend);
      setLayout((previous) =>
        previous?.columns === next.columns &&
        previous.sweep === next.sweep &&
        previous.unit === next.unit
          ? previous
          : next,
      );
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [tileHeight, aspectRatio, gap, bend]);

  React.useEffect(() => {
    images.forEach(({ src }) => {
      new Image().src = src;
    });
  }, [images]);

  const { columns, sweep, unit, limit } =
    layout ?? measure(1200, 560, tileHeight, aspectRatio, gap, bend);
  const unitSize = (n: number) =>
    `calc(${+n.toFixed(4)} * min(${tileHeight}cqh, ${+(MAX_WIDTH / aspectRatio).toFixed(4)}cqw))`;
  const radiusPercent = 100 * arc(bend);
  const radius = `${+radiusPercent.toFixed(3)}cqw`;
  const turn = (degrees: number) =>
    `translateZ(${radius}) rotateY(${+degrees.toFixed(4)}deg) translateZ(-${radius})`;
  const hiddenAt = +(((sweep - limit) / (2 * sweep || 1)) * 100).toFixed(4);
  const duration = columns * Math.max(0.25, speed);
  const share = aspectRatio / SLICES;
  const mask = `linear-gradient(90deg, transparent, #000 ${fade}%, #000 ${100 - fade}%, transparent)`;
  const keyframes =
    `@keyframes ${orbit}{` +
    `from{transform:${turn(-sweep)}}to{transform:${turn(sweep)}}` +
    `0%,${hiddenAt}%,${100 - hiddenAt}%,100%{visibility:hidden}` +
    `${hiddenAt + 0.001}%,${100 - hiddenAt - 0.001}%{visibility:visible}}` +
    `@media(prefers-reduced-motion:reduce){.${tile}{animation-play-state:paused!important}}`;

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "size", ...props.style }}
    >
      <style>{keyframes}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: layout ? 1 : 0,
          perspective: `${+(radiusPercent * CAMERA).toFixed(3)}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      >
        {Array.from({ length: images.length ? columns : 0 }, (_, tileIndex) => {
          const first = columns - 1 - tileIndex;
          const image = images[(shown[tileIndex] ?? first) % Math.max(images.length, 1)];

          return (
            <div
              key={tileIndex}
              className={cn(tile, "absolute")}
              style={{
                left: `calc(50% - ${unitSize(aspectRatio / 2)})`,
                top: `calc(${axis}% - ${unitSize(0.5)})`,
                width: unitSize(aspectRatio),
                height: unitSize(1),
                transformStyle: "preserve-3d",
                animation: `${orbit} ${duration}s linear ${-tileIndex * speed}s infinite`,
                animationPlayState: paused || !visible ? "paused" : "running",
              }}
              onAnimationIteration={(event) => {
                const lap = Math.round(event.elapsedTime / duration);
                setShown((previous) => {
                  const next = lap * columns + first;
                  return previous[tileIndex] === next ? previous : { ...previous, [tileIndex]: next };
                });
              }}
            >
              {Array.from({ length: SLICES }, (_, sliceIndex) => (
                <div
                  key={sliceIndex}
                  className={cn(
                    "absolute top-0 overflow-hidden bg-muted",
                    sliceIndex === 0 && "rounded-l-md",
                    sliceIndex === SLICES - 1 && "rounded-r-md",
                  )}
                  style={{
                    left: unitSize((aspectRatio - share) / 2),
                    width: sliceIndex === SLICES - 1 ? unitSize(share) : `calc(${unitSize(share)} + 1px)`,
                    height: unitSize(1),
                    transform: turn((aspectRatio / 2 - (sliceIndex + 0.5) * share) * unit),
                  }}
                >
                  {image ? (
                    <img
                      src={image.src}
                      alt={sliceIndex === 0 ? (image.alt ?? "") : ""}
                      draggable={false}
                      decoding="async"
                      className="absolute top-0 max-w-none object-cover"
                      style={{
                        left: unitSize(-sliceIndex * share),
                        width: unitSize(aspectRatio),
                        height: unitSize(1),
                      }}
                    />
                  ) : null}
                </div>
              ))}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
}

export default TiltedGridHero;