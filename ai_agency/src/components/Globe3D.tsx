// @ts-nocheck
import { useEffect, useRef } from "react";
import * as THREE from "three";

const EARTH_MAPS = [
  "https://unpkg.com/three-globe@2.44.1/example/img/earth-dark.jpg",
  "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-dark.jpg",
];

function makeDotTexture() {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 64;
  const g = c.getContext("2d");
  if (!g) return null;
  const grd = g.createRadialGradient(32, 32, 2, 32, 32, 30);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.45, "rgba(255,255,255,0.95)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd;
  g.beginPath();
  g.arc(32, 32, 30, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function sampleEarth(img: HTMLImageElement) {
  const w = 1024;
  const h = 512;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { land: new Float32Array(0), ocean: new Float32Array(0) };
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  const land: number[] = [];
  const ocean: number[] = [];
  const latN = 150;
  const lonN = 300;

  for (let iy = 0; iy <= latN; iy++) {
    const v = iy / latN;
    const lat = (0.5 - v) * Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let ix = 0; ix <= lonN; ix++) {
      const u = ix / lonN;
      const lon = u * Math.PI * 2 - Math.PI;
      const px = Math.min(w - 1, Math.floor(u * w));
      const py = Math.min(h - 1, Math.floor(v * h));
      const i = (py * w + px) * 4;
      const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;

      const x = cosLat * Math.cos(lon);
      const y = sinLat;
      const z = cosLat * Math.sin(lon);

      if (lum > 26) {
        land.push(x, y, z);
      } else if (ix % 4 === 0 && iy % 4 === 0) {
        ocean.push(x * 0.995, y * 0.995, z * 0.995);
      }
    }
  }

  return {
    land: new Float32Array(land),
    ocean: new Float32Array(ocean),
  };
}

function fallbackContinents() {
  const land: number[] = [];
  const ocean: number[] = [];
  const blobs = [
    { lat: 45, lon: -100, rLat: 22, rLon: 38 },
    { lat: 60, lon: -120, rLat: 12, rLon: 22 },
    { lat: -10, lon: -58, rLat: 28, rLon: 18 },
    { lat: 10, lon: 20, rLat: 28, rLon: 18 },
    { lat: 50, lon: 20, rLat: 14, rLon: 28 },
    { lat: 55, lon: 90, rLat: 16, rLon: 40 },
    { lat: -25, lon: 135, rLat: 14, rLon: 18 },
    { lat: 20, lon: 78, rLat: 12, rLon: 14 },
    { lat: 35, lon: 105, rLat: 12, rLon: 16 },
  ];

  const latN = 140;
  const lonN = 280;
  for (let iy = 0; iy <= latN; iy++) {
    const v = iy / latN;
    const lat = (0.5 - v) * Math.PI;
    const latDeg = (lat * 180) / Math.PI;
    const cosLat = Math.cos(lat);
    const sinLat = Math.sin(lat);
    for (let ix = 0; ix <= lonN; ix++) {
      const u = ix / lonN;
      const lon = u * Math.PI * 2 - Math.PI;
      const lonDeg = (lon * 180) / Math.PI;
      const x = cosLat * Math.cos(lon);
      const y = sinLat;
      const z = cosLat * Math.sin(lon);
      const hit = blobs.some((b) => {
        const dLat = (latDeg - b.lat) / b.rLat;
        const dLon = (lonDeg - b.lon) / b.rLon;
        return dLat * dLat + dLon * dLon < 1;
      });
      if (hit) land.push(x, y, z);
      else if (ix % 4 === 0 && iy % 4 === 0) ocean.push(x * 0.995, y * 0.995, z * 0.995);
    }
  }
  return { land: new Float32Array(land), ocean: new Float32Array(ocean) };
}

export default function Globe3D({
  className = "",
  focus = "center",
}: {
  className?: string;
  focus?: "center" | "top";
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const liftY = focus === "top" ? -0.8 : 0;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b0b0d);

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 20);
    camera.position.set(0, 0.08, 2.0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x0b0b0d, 1);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.set(0.22, 4.05, 0.04);
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.985, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x050506 })
    );
    group.add(core);

    const rim = new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0x8eb6ff,
        transparent: true,
        opacity: 0.055,
        side: THREE.BackSide,
        depthWrite: false,
      })
    );
    group.add(rim);

    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.015, 64, 64),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.035,
        depthWrite: false,
      })
    );
    group.add(halo);

    const dotTex = makeDotTexture();
    let landPts: THREE.Points | null = null;
    let oceanPts: THREE.Points | null = null;

    const addPoints = (arr: Float32Array, size: number, opacity: number) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
      const mat = new THREE.PointsMaterial({
        color: 0xffffff,
        size,
        map: dotTex ?? undefined,
        transparent: true,
        opacity,
        depthWrite: false,
        sizeAttenuation: true,
      });
      const pts = new THREE.Points(geo, mat);
      group.add(pts);
      return pts;
    };

    let cancelled = false;
    (async () => {
      let sampled = fallbackContinents();
      for (const src of EARTH_MAPS) {
        try {
          const img = await loadImage(src);
          if (cancelled) return;
          sampled = sampleEarth(img);
          break;
        } catch {
          /* try next */
        }
      }
      if (cancelled) return;
      landPts = addPoints(sampled.land, 0.016, 0.95);
      oceanPts = addPoints(sampled.ocean, 0.007, 0.18);
    })();

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      const r = mount.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width - 0.5) * 0.35;
      pointer.ty = ((e.clientY - r.top) / r.height - 0.5) * 0.2;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    mount.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerleave", onLeave);

    const fit = () => {
      const w = Math.max(1, mount.clientWidth);
      const h = Math.max(1, mount.clientHeight);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, true);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(mount);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      group.rotation.y += dt * 0.00012;
      group.rotation.x = 0.22 + pointer.y;
      group.rotation.z = 0.04 + pointer.x * 0.15;
      group.position.x = pointer.x * 0.08;
      group.position.y = liftY - pointer.y * 0.06;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      mount.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerleave", onLeave);
      landPts?.geometry.dispose();
      oceanPts?.geometry.dispose();
      (landPts?.material as THREE.Material | undefined)?.dispose();
      (oceanPts?.material as THREE.Material | undefined)?.dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      rim.geometry.dispose();
      (rim.material as THREE.Material).dispose();
      halo.geometry.dispose();
      (halo.material as THREE.Material).dispose();
      dotTex?.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`h-full w-full ${className}`}
      style={{ touchAction: "none" }}
    />
  );
}
