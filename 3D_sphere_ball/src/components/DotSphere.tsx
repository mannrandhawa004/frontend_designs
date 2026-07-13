import { useEffect, useMemo, useRef } from "react";

type Dot = { lat: number; lon: number; el: SVGCircleElement | null };

export default function DotSphere({
  className = "",
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);

  // build lat/long grid once
  const dots = useMemo<Dot[]>(() => {
    const arr: Dot[] = [];
    for (let lat = -78; lat <= 78; lat += 13) {
      const lonCount = Math.max(8, Math.round(22 * Math.cos((lat * Math.PI) / 180)));
      for (let k = 0; k < lonCount; k++) {
        const lon = (360 / lonCount) * k + (lat % 26 === 0 ? 0 : 360 / lonCount / 2);
        arr.push({ lat: (lat * Math.PI) / 180, lon: (lon * Math.PI) / 180, el: null });
      }
    }
    return arr;
  }, []);

  useEffect(() => {
    const circles = svgRef.current?.querySelectorAll("circle.dot");
    if (circles) dots.forEach((d, i) => (d.el = circles[i] as SVGCircleElement));

    let raf = 0;
    let phase = 0;
    const R = 92;
    const cx = 100;
    const cy = 100;
    const tick = () => {
      // Gentle ambient spin combined with scroll-based rolls
      phase += 0.003;
      const style = svgRef.current ? getComputedStyle(svgRef.current) : null;
      const rollAngle = style ? Number.parseFloat(style.getPropertyValue("--roll-angle")) || 0 : 0;
      const rollX = style ? Number.parseFloat(style.getPropertyValue("--roll-x")) || 0 : 0;
      const rollY = style ? Number.parseFloat(style.getPropertyValue("--roll-y")) || 1 : 1;
      const rollPhase = (rollAngle * Math.PI) / 180 * (rollY < 0 ? -1 : 1);
      const tilt = rollX * Math.sin((rollAngle * Math.PI) / 360) * 0.08;

      for (const d of dots) {
        const lat = d.lat + tilt * Math.cos(d.lon + rollPhase);
        const lon = d.lon + phase + rollPhase;
        const x = Math.cos(lat) * Math.sin(lon);
        const y = Math.sin(lat);
        const z = Math.cos(lat) * Math.cos(lon);
        if (!d.el) continue;
        if (z < 0.02) {
          d.el.setAttribute("opacity", "0");
          continue;
        }
        const sx = cx + x * R;
        const sy = cy - y * R;
        const size = 3.2 + 5.2 * z;
        d.el.setAttribute("cx", sx.toFixed(2));
        d.el.setAttribute("cy", sy.toFixed(2));
        d.el.setAttribute("r", size.toFixed(2));
        d.el.setAttribute("opacity", (0.35 + 0.65 * z).toFixed(2));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [dots]);

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <div
          className="absolute left-1/2 top-[90%] h-[12%] w-[70%] -translate-x-1/2 rounded-[50%] blur-2xl"
          style={{ background: "rgba(0,0,0,0.35)" }}
        />
        <svg ref={svgRef} viewBox="0 0 200 200" className="h-full w-full overflow-visible">
          <defs>
            <radialGradient id="whiteBody" cx="36%" cy="30%" r="78%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#eef1f7" />
              <stop offset="100%" stopColor="#b9c3d6" />
            </radialGradient>
            <radialGradient id="whiteGloss" cx="32%" cy="26%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="96" fill="url(#whiteBody)" />

          {/* Dot positions are recalculated in SVG space so they stay visible while scrolling. */}
          <g>
            {dots.map((_, i) => (
              <circle key={i} className="dot" fill="#d23a22" cx={100} cy={100} r={4} opacity={0} />
            ))}
          </g>

          <circle cx="100" cy="100" r="96" fill="url(#whiteGloss)" />
        </svg>
      </div>
    </div>
  );
}
