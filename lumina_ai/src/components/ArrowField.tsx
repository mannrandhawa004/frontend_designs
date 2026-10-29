import { useEffect, useRef } from "react";

export default function ArrowField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => (mouseRef.current = { x: -9999, y: -9999 });
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);

    const GAP = 22;
    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / GAP);
      const rows = Math.ceil(h / GAP);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * GAP + (j % 2 === 0 ? 0 : GAP / 2);
          const y = j * GAP;

          const nx = x / w; // 0..1
          const ny = y / h;

          // distance from hero text center (protect readability)
          const cx = 0.5;
          const cy = 0.42;
          const dx = (nx - cx) * (w / h);
          const dy = ny - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // arch / edge emphasis — dense at sides + top
          const edge = Math.pow(Math.abs(nx - 0.5) * 2, 1.6);
          const topBias = Math.max(0, 1 - ny * 1.25);
          const centerHole = smoothstep(0.08, 0.55, dist);

          // bottom fade into glow
          const bottomFade = 1 - smoothstep(0.55, 0.98, ny);

          // subtle wave shimmer
          const shimmer = 0.72 + 0.28 * Math.sin(t * 2 + nx * 9 + ny * 7);

          let alpha = (0.08 + edge * 0.55 + topBias * 0.28) * centerHole * bottomFade * shimmer;
          alpha = Math.max(0, Math.min(0.92, alpha));

          // mouse glow
          const mdx = x - mouseRef.current.x;
          const mdy = y - mouseRef.current.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          const mGlow = Math.max(0, 1 - mdist / 180);
          if (mGlow > 0) alpha = Math.min(1, alpha + mGlow * 0.7);

          if (alpha < 0.02) continue;

          // two-tone: brighter arrows scattered
          const hash = fract(Math.sin(i * 127.1 + j * 311.7) * 43758.5453);
          const bright = hash > 0.82;
          const s = bright ? 5.2 : 4.1;

          ctx.save();
          ctx.translate(x, y);
          ctx.globalAlpha = alpha;
          ctx.strokeStyle = bright ? "#dbeafe" : "#8fb0d8";
          ctx.lineWidth = bright ? 1.4 : 1.05;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // shaft: bottom-left -> top-right (NE)
          ctx.beginPath();
          ctx.moveTo(-s * 0.7, s * 0.7);
          ctx.lineTo(s * 0.7, -s * 0.7);
          // head
          ctx.moveTo(s * 0.7, -s * 0.7);
          ctx.lineTo(s * 0.7 - s * 0.75, -s * 0.7);
          ctx.moveTo(s * 0.7, -s * 0.7);
          ctx.lineTo(s * 0.7, -s * 0.7 + s * 0.75);
          ctx.stroke();
          ctx.restore();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}

function smoothstep(a: number, b: number, x: number) {
  const tt = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return tt * tt * (3 - 2 * tt);
}
function fract(x: number) {
  return x - Math.floor(x);
}
