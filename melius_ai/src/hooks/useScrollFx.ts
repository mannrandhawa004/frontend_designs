import { useLayoutEffect } from "react";
import { gsap } from "../lib/gsap";

const all = <T extends Element = HTMLElement>(sel: string) =>
  Array.from(document.querySelectorAll<T>(sel));

/**
 * Every scroll-driven animation on the page lives here.
 * All of it is additive/decorative — content stays visible if GSAP never runs.
 */
export function useScrollFx() {
  useLayoutEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mm: ReturnType<typeof gsap.matchMedia> | null = null;

    const ctx = gsap.context(() => {
      /* ---------- global scroll progress rail ---------- */
      const bar = document.querySelector<HTMLElement>('[data-fx="progress"]');
      if (bar) {
        gsap.set(bar, { scaleX: 0, transformOrigin: "left center" });
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.25 },
        });
      }

      if (reduce) return;

      /* ---------- hero ---------- */
      gsap.from(all('[data-fx="hero-word"]'), {
        yPercent: 118,
        opacity: 0,
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.085,
      });

      const hero = document.querySelector<HTMLElement>('[data-fx="hero"]');
      if (hero) {
        gsap.to('[data-fx="hero-title"]', {
          letterSpacing: "-0.055em",
          y: -34,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to('[data-fx="hero-ring"]', {
          yPercent: 15,
          scale: 0.89,
          rotateZ: -1.4,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 },
        });
        gsap.to('[data-fx="hero-copy"]', {
          y: -86,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "35% top", end: "bottom top", scrub: 0.6 },
        });
        gsap.to('[data-fx="marquee"]', {
          xPercent: -9,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 0.8 },
        });
      }

      /* ---------- node canvas steps ---------- */
      all("[data-fx-step]").forEach((step) => {
        const nodes = step.querySelectorAll('[data-fx="node"]');
        if (nodes.length) {
          gsap.from(nodes, {
            y: 46,
            opacity: 0,
            scale: 0.92,
            duration: 0.95,
            ease: "power3.out",
            stagger: 0.13,
            scrollTrigger: { trigger: step, start: "top 74%", once: true },
          });
        }
        step.querySelectorAll<SVGPathElement>('[data-fx="connector"]').forEach((p) => {
          gsap.fromTo(
            p,
            { strokeDashoffset: 28 },
            {
              strokeDashoffset: 0,
              ease: "none",
              scrollTrigger: { trigger: step, start: "top 88%", end: "bottom 32%", scrub: 0.5 },
            },
          );
        });
        const bar2 = step.querySelector<HTMLElement>('[data-fx="step-progress"]');
        if (bar2) {
          gsap.fromTo(
            bar2,
            { scaleX: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: { trigger: step, start: "top 80%", end: "bottom 45%", scrub: 0.4 },
            },
          );
        }
      });

      // parallax inside the sticky output frames
      all('[data-fx="out-img"]').forEach((im) => {
        gsap.fromTo(
          im,
          { yPercent: -8, scale: 1.16 },
          {
            yPercent: 8,
            scale: 1.16,
            ease: "none",
            scrollTrigger: {
              trigger: im.closest("section") as HTMLElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.4,
            },
          },
        );
      });

      /* ---------- models band ---------- */
      const row = document.querySelector<HTMLElement>('[data-fx="models-row"]');
      if (row) {
        gsap.fromTo(
          row,
          { xPercent: 6 },
          {
            xPercent: -14,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: 0.9 },
          },
        );
      }

      /* ---------- scroll-counted statistics ---------- */
      all<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count ?? "0");
        const o = { v: 0 };
        gsap.to(o, {
          v: end,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 94%", end: "top 52%", scrub: 0.6 },
          onUpdate: () => {
            el.textContent = Math.round(o.v).toLocaleString("en-US");
          },
        });
      });

      /* ---------- full-bleed statement band ---------- */
      const st = document.querySelector<HTMLElement>('[data-fx="statement"]');
      if (st) {
        gsap.fromTo(
          st,
          { xPercent: 3 },
          {
            xPercent: -27,
            ease: "none",
            scrollTrigger: {
              trigger: st.parentElement as HTMLElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
            },
          },
        );
      }

      /* ---------- personas ---------- */
      mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        all('[data-fx="persona-card"]').forEach((card) => {
          const speed = Number(card.dataset.speed ?? "1");
          gsap.fromTo(
            card,
            { y: 70 * speed, rotate: speed > 1 ? 2 : -2 },
            {
              y: -85 * speed,
              rotate: 0,
              ease: "none",
              scrollTrigger: {
                trigger: card.closest("section") as HTMLElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
              },
            },
          );
        });
      });

      const strips = all('[data-fx="persona-strip"]');
      if (strips.length) {
        gsap.from(strips, {
          scaleX: 0,
          transformOrigin: "center center",
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-fx="persona-stack"]', start: "top 82%", once: true },
        });
      }

      const ph = document.querySelector<HTMLElement>('[data-fx="persona-hero"]');
      if (ph) {
        gsap.fromTo(
          ph,
          { scale: 1.16, yPercent: -6 },
          {
            scale: 1.02,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: ph.closest("section") as HTMLElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      }

      /* ---------- pricing ---------- */
      const grid = document.querySelector<HTMLElement>('[data-fx="pricing-grid"]');
      if (grid) {
        gsap.from(all('[data-fx="pricing-card"]'), {
          y: 72,
          opacity: 0,
          rotateX: -9,
          transformOrigin: "top center",
          duration: 1.05,
          ease: "power3.out",
          stagger: 0.13,
          scrollTrigger: { trigger: grid, start: "top 80%", once: true },
        });
      }

      const pt = document.querySelector<HTMLElement>('[data-fx="pricing-title"]');
      if (pt) {
        gsap.fromTo(
          pt,
          { letterSpacing: "0.02em", opacity: 0.25, y: 30 },
          {
            letterSpacing: "-0.035em",
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: { trigger: pt, start: "top 96%", end: "top 42%", scrub: 0.5 },
          },
        );
      }

      const glow = document.querySelector<HTMLElement>('[data-fx="glow"]');
      if (glow) {
        gsap.fromTo(
          glow,
          { scaleY: 0.55, opacity: 0.3, transformOrigin: "top center" },
          {
            scaleY: 1.2,
            opacity: 0.95,
            ease: "none",
            scrollTrigger: {
              trigger: glow.closest("section") as HTMLElement,
              start: "top bottom",
              end: "center center",
              scrub: 0.6,
            },
          },
        );
      }

      /* ---------- faq ---------- */
      const fh = document.querySelector<HTMLElement>('[data-fx="faq-heading"]');
      if (fh) {
        gsap.fromTo(
          fh,
          { xPercent: -3, opacity: 0.3 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: { trigger: fh, start: "top 95%", end: "top 50%", scrub: 0.5 },
          },
        );
      }
      const rule = document.querySelector<HTMLElement>('[data-fx="faq-rule"]');
      if (rule) {
        gsap.fromTo(
          rule,
          { scaleX: 0, transformOrigin: "left center" },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: rule, start: "top 92%", end: "top 55%", scrub: 0.5 },
          },
        );
      }

      /* ---------- footer ---------- */
      const word = document.querySelector<HTMLElement>('[data-fx="footer-word"]');
      if (word) {
        gsap.fromTo(
          word,
          { yPercent: 26, opacity: 0.45 },
          {
            yPercent: -4,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: word.closest("footer") as HTMLElement,
              start: "top bottom",
              end: "bottom bottom",
              scrub: 0.7,
            },
          },
        );
      }
      const panel = document.querySelector<HTMLElement>('[data-fx="footer-panel"]');
      if (panel) {
        gsap.from(panel, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 92%", once: true },
        });
      }

      ScrollTrigger.refresh();
    });

    // late-loading imagery shifts document height — recompute trigger positions
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});

    return () => {
      window.removeEventListener("load", refresh);
      mm?.revert();
      ctx.revert();
    };
  }, []);
}
