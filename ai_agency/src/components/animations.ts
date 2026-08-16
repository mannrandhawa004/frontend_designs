import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.config({ nullTargetWarn: false });

const REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/*                              Text splitting                                */
/* -------------------------------------------------------------------------- */

function splitWords(el: HTMLElement) {
  if (el.dataset.split === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>(".anim-word-inner"));
  }
  const html = el.innerHTML;
  const parts = html.split(/<br\s*\/?>/i);
  el.innerHTML = parts
    .map((line) => {
      const words = line
        .replace(/<[^>]+>/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map(
          (w) =>
            `<span class="anim-word"><span class="anim-word-inner">${w}</span></span>`
        )
        .join(" ");
      return `<span class="anim-line">${words}</span>`;
    })
    .join("");
  el.dataset.split = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".anim-word-inner"));
}

function splitChars(el: HTMLElement) {
  if (el.dataset.chars === "1") {
    return Array.from(el.querySelectorAll<HTMLElement>(".anim-char"));
  }
  const text = el.textContent || "";
  el.innerHTML = "";
  Array.from(text).forEach((ch) => {
    const span = document.createElement("span");
    span.className = "anim-char";
    span.style.display = "inline-block";
    span.style.willChange = "transform, opacity";
    span.textContent = ch === " " ? "\u00a0" : ch;
    el.appendChild(span);
  });
  el.dataset.chars = "1";
  return Array.from(el.querySelectorAll<HTMLElement>(".anim-char"));
}

/* -------------------------------------------------------------------------- */
/*                               Hero timeline                                */
/* -------------------------------------------------------------------------- */

export function useHeroAnimation() {
  useEffect(() => {
    if (REDUCED) return;

    const ctx = gsap.context(() => {
      const title = document.querySelector<HTMLElement>(".hero-title");
      const words = title ? splitWords(title) : [];

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-badge",
        { y: 20, autoAlpha: 0, scale: 0.9, filter: "blur(6px)" },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        0.05
      );

      if (words.length) {
        tl.fromTo(
          words,
          { yPercent: 130, autoAlpha: 0, rotate: 6 },
          {
            yPercent: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 1.05,
            stagger: 0.06,
          },
          0.2
        );
      }

      tl.fromTo(
        ".hero-sub",
        { y: 26, autoAlpha: 0, filter: "blur(6px)" },
        { y: 0, autoAlpha: 1, filter: "blur(0px)", duration: 0.85 },
        0.6
      );

      tl.fromTo(
        ".hero-cta > *",
        { y: 22, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.08 },
        0.78
      );

      tl.fromTo(
        ".hero-trust",
        { y: 18, autoAlpha: 0, scale: 0.96 },
        { y: 0, autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(1.5)" },
        0.9
      );

      tl.fromTo(
        ".hero-scroll",
        { autoAlpha: 0, y: 10 },
        { autoAlpha: 1, y: 0, duration: 0.55 },
        1.0
      );

      tl.fromTo(
        ".hero-float",
        { autoAlpha: 0, scale: 0.6, y: 24, rotate: -12 },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "back.out(1.6)",
        },
        0.5
      );

      /* Hero background parallax with subtle scale */
      gsap.fromTo(".hero-bg-img",
        { yPercent: 0, scale: 1 },
        {
          yPercent: 14,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-stage",
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      /* Floating orbit for hero icons using Lissajous curves */
      document.querySelectorAll<HTMLElement>(".hero-float").forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 === 0 ? 30 : -30,
          duration: 3 + i * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(el, {
          y: i % 3 === 0 ? -40 : 40,
          duration: 4.5 + i * 0.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        gsap.to(el, {
          rotate: i % 2 === 0 ? 25 : -25,
          duration: 5.2 + i * 0.3,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      /* Hero content upward drift as user scrolls */
      gsap.fromTo(".hero-content-inner",
        { yPercent: 0, autoAlpha: 1 },
        {
          yPercent: -8,
          autoAlpha: 0.85,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-stage",
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = window.setTimeout(refresh, 220);
    return () => {
      window.removeEventListener("load", refresh);
      window.clearTimeout(t);
      ctx.revert();
    };
  }, []);
}

/* -------------------------------------------------------------------------- */
/*                         Page-wide scroll animations                        */
/* -------------------------------------------------------------------------- */

export function usePageMotion(pathname = "") {
  useEffect(() => {
    if (REDUCED) return;

    const ctx = gsap.context(() => {
      /* -------- Section titles: mask + word reveal -------- */
      gsap.utils.toArray<HTMLElement>(".anim-title").forEach((el) => {
        const words = splitWords(el);
        gsap.fromTo(
          words,
          { yPercent: 115, autoAlpha: 0, rotate: 4 },
          {
            yPercent: 0,
            autoAlpha: 1,
            rotate: 0,
            duration: 0.95,
            ease: "power4.out",
            stagger: 0.05,
            overwrite: "auto",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      /* -------- Character-by-character eyebrow reveal -------- */
      gsap.utils.toArray<HTMLElement>(".anim-chars").forEach((el) => {
        const chars = splitChars(el);
        gsap.fromTo(
          chars,
          { yPercent: 100, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.5,
            ease: "power3.out",
            stagger: 0.025,
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });

      /* -------- Card batches (staggered lift) -------- */
      ScrollTrigger.batch(".anim-item", {
        start: "top 92%",
        once: true,
        interval: 0.1,
        batchMax: 6,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              y: 40,
              autoAlpha: 0,
              scale: 0.97,
              filter: "blur(4px)",
            },
            {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.09,
              overwrite: "auto",
            }
          );
        },
      });

      /* -------- Image reveal with clip-path mask -------- */
      gsap.utils.toArray<HTMLElement>(".reveal-mask").forEach((el) => {
        const img = el.querySelector("img");
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      });

      /* -------- Number counters -------- */
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count || 0);
        const obj = { n: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              n: end,
              duration: 1.8,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.n)}`;
              },
            });
          },
        });
      });

      /* -------- Parallax images (data-par="0.15") -------- */
      gsap.utils.toArray<HTMLElement>("[data-par]").forEach((el) => {
        const speed = parseFloat(el.dataset.par || "0.1");
        gsap.to(el, {
          yPercent: -speed * 100,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      });

      /* -------- Tilt on hover -------- */
      gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
        const onMove = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(el, {
            rotateY: px * 8,
            rotateX: -py * 6,
            duration: 0.6,
            ease: "power3.out",
            transformPerspective: 900,
            transformOrigin: "center",
          });
        };
        const onLeave = () =>
          gsap.to(el, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.55)",
          });
        el.addEventListener("mousemove", onMove as EventListener);
        el.addEventListener("mouseleave", onLeave as EventListener);
      });

      /* -------- Magnetic buttons -------- */
      gsap.utils
        .toArray<HTMLElement>(
          ".btn-dark, .btn-light, [data-magnetic]"
        )
        .forEach((el) => {
          const onMove = (e: MouseEvent) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - (r.left + r.width / 2);
            const y = e.clientY - (r.top + r.height / 2);
            gsap.to(el, {
              x: x * 0.22,
              y: y * 0.26,
              duration: 0.4,
              ease: "power3.out",
            });
          };
          const onLeave = () =>
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: "elastic.out(1, 0.45)",
            });
          el.addEventListener("mousemove", onMove as EventListener);
          el.addEventListener("mouseleave", onLeave as EventListener);
        });

      /* -------- Marquee (auto-scroll) -------- */
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((el) => {
        const speed = parseFloat(el.dataset.marquee || "30");
        gsap.to(el, {
          xPercent: -50,
          ease: "none",
          duration: speed,
          repeat: -1,
        });
      });

      /* -------- Scroll velocity skew on marquee text -------- */
      gsap.utils.toArray<HTMLElement>("[data-skew]").forEach((el) => {
        const proxy = { skew: 0 };
        const clamp = gsap.utils.clamp(-10, 10);
        const setSkew = gsap.quickSetter(el, "skewX", "deg");
        ScrollTrigger.create({
          onUpdate: (self) => {
            const skew = clamp(self.getVelocity() / -300);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.6,
                ease: "power3",
                overwrite: true,
                onUpdate: () => setSkew(proxy.skew),
              });
            }
          },
        });
      });

      /* -------- Sticky pinned section (for pinned scroll effects) -------- */
      gsap.utils.toArray<HTMLElement>("[data-pin]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top top+=80",
          end: "+=200",
          pin: false,
        });
      });
    });

    /* -------- Spotlight cursor glow on dark/premium cards -------- */
    const spotlightEls = Array.from(
      document.querySelectorAll<HTMLElement>(".spotlight")
    );
    const spotlightHandlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];
    spotlightEls.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      };
      el.addEventListener("mousemove", onMove);
      spotlightHandlers.push([el, onMove]);
    });

    /* -------- Route entrance fade for main content -------- */
    const main = document.querySelector("main");
    if (main && !REDUCED) {
      gsap.fromTo(
        main,
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }
      );
    }

    const refresh = () => ScrollTrigger.refresh();
    const t = window.setTimeout(refresh, 180);
    return () => {
      window.clearTimeout(t);
      spotlightHandlers.forEach(([el, fn]) => el.removeEventListener("mousemove", fn));
      ctx.revert();
    };
  }, [pathname]);
}

/* -------------------------------------------------------------------------- */
/*                          Custom cursor + progress                          */
/* -------------------------------------------------------------------------- */

export function useCursor() {
  useEffect(() => {
    if (REDUCED) return;
    if (window.matchMedia("(hover: none)").matches) return;

    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    document.body.append(dot, ring);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: target.x, y: target.y };
    const dotPos = { x: target.x, y: target.y };

    const setDot = gsap.quickSetter(dot, "css");
    const setRing = gsap.quickSetter(ring, "css");

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onHoverStart = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el?.closest) return;
      const interactive = el.closest(
        "a, button, [data-magnetic], .service-item, .faq-item, .anim-item[role='button']"
      );
      if (interactive) {
        ring.classList.add("cursor-ring--big");
      }
    };
    const onHoverEnd = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!el?.closest) return;
      const interactive = el.closest(
        "a, button, [data-magnetic], .service-item, .faq-item"
      );
      if (interactive) {
        ring.classList.remove("cursor-ring--big");
      }
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("mouseover", onHoverStart);
    document.addEventListener("mouseout", onHoverEnd);

    let raf = 0;
    const tick = () => {
      dotPos.x += (target.x - dotPos.x) * 0.55;
      dotPos.y += (target.y - dotPos.y) * 0.55;
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      setDot({ transform: `translate3d(${dotPos.x}px, ${dotPos.y}px, 0)` } as gsap.TweenVars);
      setRing({ transform: `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)` } as gsap.TweenVars);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    /* Scroll progress bar */
    const bar = document.createElement("div");
    bar.className = "scroll-progress";
    document.body.appendChild(bar);
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        bar.style.transform = `scaleX(${self.progress})`;
      },
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onHoverStart);
      document.removeEventListener("mouseout", onHoverEnd);
      dot.remove();
      ring.remove();
      bar.remove();
      st.kill();
    };
  }, []);
}

/* -------------------------------------------------------------------------- */
/*                     Optional convenience default hooks                     */
/* -------------------------------------------------------------------------- */

export function useFadeInUp() {
  usePageMotion();
}
