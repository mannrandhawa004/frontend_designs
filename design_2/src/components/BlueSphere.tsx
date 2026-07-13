import { useId, useEffect, useMemo, useRef } from "react";

type Seg = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  z: number;
  w: number;
};

type Ribbon = {
  offset: number;
  turns: number;
  hue: string;
  segs: Seg[];
  els: SVGLineElement[];
};

export default function BlueSphere({
  className = "",
}: {
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const bodyId = `bs-body-${uid}`;
  const shadeId = `bs-shade-${uid}`;
  const glossId = `bs-gloss-${uid}`;
  const rimId = `bs-rim-${uid}`;
  const shadowId = `bs-drop-${uid}`;
  const svgRef = useRef<SVGSVGElement>(null);

  const R = 94;
  const cx = 100;
  const cy = 100;

  // Build ribbon skeletons once; animation only updates attrs.
  const ribbons = useMemo<Ribbon[]>(() => {
    const palette = ["#ffffff", "#dff3ff", "#b6e3ff", "#eaffff", "#cfeaff"];
    return Array.from({ length: 5 }, (_, i) => ({
      offset: (i / 5) * Math.PI * 2,
      turns: 2.6,
      hue: palette[i % palette.length],
      segs: [],
      els: [],
    }));
  }, []);

  useEffect(() => {
    // collect line refs
    const groups = svgRef.current?.querySelectorAll("g.ribbon");
    if (groups) {
      groups.forEach((g, i) => {
        ribbons[i].els = Array.from(g.querySelectorAll("line"));
      });
    }

    const SEGS = 90;
    let raf = 0;
    let phase = 0;

    const tick = () => {
      // Gentle ambient spin combined with the direct roll angle
      phase += 0.0035;
      const style = svgRef.current ? getComputedStyle(svgRef.current) : null;
      const rollAngle = style ? Number.parseFloat(style.getPropertyValue("--roll-angle")) || 0 : 0;
      const rollX = style ? Number.parseFloat(style.getPropertyValue("--roll-x")) || 0 : 0;
      const rollY = style ? Number.parseFloat(style.getPropertyValue("--roll-y")) || 1 : 1;
      const rollPhase = (rollAngle * Math.PI) / 180 * (rollY < 0 ? -1 : 1);
      const tilt = rollX * Math.sin((rollAngle * Math.PI) / 360) * 0.09;

      for (const rib of ribbons) {
        // build segments in 3D
        for (let s = 0; s < SEGS; s++) {
          const t1 = s / SEGS;
          const t2 = (s + 1) / SEGS;
          const lat1 = -Math.PI / 2 + t1 * Math.PI + tilt * Math.cos(t1 * Math.PI * 2);
          const lat2 = -Math.PI / 2 + t2 * Math.PI + tilt * Math.cos(t2 * Math.PI * 2);
          const lon1 = t1 * rib.turns * Math.PI * 2 + rib.offset + phase + rollPhase;
          const lon2 = t2 * rib.turns * Math.PI * 2 + rib.offset + phase + rollPhase;

          const x1 = Math.cos(lat1) * Math.sin(lon1);
          const y1 = Math.sin(lat1);
          const z1 = Math.cos(lat1) * Math.cos(lon1);
          const x2 = Math.cos(lat2) * Math.sin(lon2);
          const y2 = Math.sin(lat2);
          const z2 = Math.cos(lat2) * Math.cos(lon2);

          const seg = rib.segs[s] || (rib.segs[s] = { x1: 0, y1: 0, x2: 0, y2: 0, z: 0, w: 0 });
          seg.x1 = cx + x1 * R;
          seg.y1 = cy - y1 * R;
          seg.x2 = cx + x2 * R;
          seg.y2 = cy - y2 * R;
          seg.z = (z1 + z2) / 2;
          seg.w = 1.1 + 2.6 * Math.max(0, seg.z);

          const el = rib.els[s];
          if (!el) continue;
          const z = seg.z;
          el.setAttribute("x1", seg.x1.toFixed(2));
          el.setAttribute("y1", seg.y1.toFixed(2));
          el.setAttribute("x2", seg.x2.toFixed(2));
          el.setAttribute("y2", seg.y2.toFixed(2));
          el.setAttribute("stroke-width", seg.w.toFixed(2));
          el.setAttribute("opacity", (0.12 + 0.88 * Math.max(0, z)).toFixed(3));
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ribbons]);

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <div
          className="absolute left-1/2 top-[91%] h-[12%] w-[74%] -translate-x-1/2 rounded-[50%] blur-xl"
          style={{ background: "rgba(6, 20, 72, 0.55)" }}
        />
        <svg ref={svgRef} viewBox="0 0 200 200" className="h-full w-full overflow-visible" aria-hidden="true">
          <defs>
            <radialGradient id={bodyId} cx="33%" cy="28%" r="85%">
              <stop offset="0%" stopColor="#8fd1ff" />
              <stop offset="32%" stopColor="#3a8df2" />
              <stop offset="68%" stopColor="#1854c9" />
              <stop offset="100%" stopColor="#06185c" />
            </radialGradient>
            <radialGradient id={shadeId} cx="30%" cy="24%" r="88%">
              <stop offset="52%" stopColor="#02103f" stopOpacity="0" />
              <stop offset="86%" stopColor="#02103f" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#00071f" stopOpacity="0.82" />
            </radialGradient>
            <radialGradient id={glossId} cx="34%" cy="22%" r="42%">
              <stop offset="0%" stopColor="white" stopOpacity="0.75" />
              <stop offset="55%" stopColor="#d6f1ff" stopOpacity="0.18" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={rimId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#bfeaff" stopOpacity="0" />
              <stop offset="60%" stopColor="#cdeeff" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
            </linearGradient>
            <filter id={shadowId} x="-40%" y="-30%" width="180%" height="180%">
              <feDropShadow dx="0" dy="11" stdDeviation="10" floodColor="#04103a" floodOpacity="0.58" />
            </filter>
          </defs>

          <g filter={`url(#${shadowId})`}>
            {/* The base sphere body */}
            <circle cx={cx} cy={cy} r={R + 2} fill={`url(#${bodyId})`} />

            {/* Pattern movement is calculated directly in SVG coordinates to avoid disappearing during scroll. */}
            <g>
              {/* faint meridian hint so the curvature reads even between ribbons */}
              <g opacity="0.18" stroke="#bfe6ff" strokeWidth="0.7" fill="none">
                <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.32} />
                <ellipse cx={cx} cy={cy} rx={R} ry={R * 0.68} />
                <ellipse cx={cx} cy={cy} rx={R * 0.32} ry={R} />
                <ellipse cx={cx} cy={cy} rx={R * 0.68} ry={R} />
              </g>

              {/* helical ribbons wrap the sphere — back faces dim, front faces crisp */}
              {ribbons.map((rib, i) => (
                <g key={i} className="ribbon" stroke={rib.hue} strokeLinecap="round" fill="none">
                  {Array.from({ length: 90 }).map((_, s) => (
                    <line key={s} x1={0} y1={0} x2={0} y2={0} />
                  ))}
                </g>
              ))}
            </g>

            {/* shading + gloss on top to sell the volume */}
            <circle cx={cx} cy={cy} r={R + 2} fill={`url(#${shadeId})`} />
            <ellipse cx={70} cy={56} rx={70} ry={58} fill={`url(#${glossId})`} />

            {/* crisp rim light on lower-right edge */}
            <path
              d={`M ${cx + R * 0.92} ${cy + R * 0.42} A ${R + 2} ${R + 2} 0 0 1 ${cx - R * 0.32} ${cy + R * 0.95}`}
              fill="none"
              stroke={`url(#${rimId})`}
              strokeWidth="2.2"
              strokeLinecap="round"
            />

            {/* tiny top-left specular */}
            <ellipse cx="68" cy="48" rx="14" ry="7" fill="white" opacity="0.7" />
            <ellipse cx="68" cy="48" rx="6" ry="3" fill="white" opacity="0.95" />

            <circle cx={cx} cy={cy} r={R + 2} fill="none" stroke="#bfeaff" strokeWidth="1.2" strokeOpacity="0.45" />
          </g>
        </svg>
      </div>
    </div>
  );
}
