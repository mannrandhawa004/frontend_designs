import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------- Custom Cursor ------------------------- */
export const Cursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' });

    const move = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hit = target.closest('a, button, [data-cursor]') as HTMLElement | null;
      if (hit) {
        setIsHovering(true);
        setLabel(hit.getAttribute('data-cursor-label') || '');
      } else {
        setIsHovering(false);
        setLabel('');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', onOver);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <div className={`hidden md:block pointer-events-none fixed inset-0 z-[999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-ink rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isHovering ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-[width,height,background-color,border-color] duration-300 ease-out ${
          label
            ? 'w-20 h-20 bg-lime border-transparent'
            : isHovering
            ? 'w-14 h-14 bg-lime/25 border border-transparent backdrop-blur-[1px]'
            : 'w-9 h-9 border border-ink/30'
        }`}
      >
        {label && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink">{label}</span>
        )}
      </div>
    </div>
  );
};

/* ------------------------- Preloader ------------------------- */
export const Preloader: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onComplete?.();
      },
    });

    tl.to(counter, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.floor(counter.val)),
    })
      .to('.preloader-word', { yPercent: -120, duration: 0.6, ease: 'power4.inOut', stagger: 0.05 }, '-=0.3')
      .to(panelRef.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.2')
      .to(wrapRef.current, { autoAlpha: 0, duration: 0.2 }, '-=0.1');

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={wrapRef} className="fixed inset-0 z-[1000] pointer-events-none">
      <div ref={panelRef} className="absolute inset-0 bg-ink flex flex-col items-center justify-center pointer-events-auto overflow-hidden">
        {/* faint radial glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-lime/10 blur-[120px]" />

        <div className="relative flex flex-col items-center gap-8">
          <div className="overflow-hidden">
            <span className="preloader-word block text-cream text-5xl md:text-7xl font-display font-light tracking-tight italic">
              spaciaz<span className="text-lime">.</span>
            </span>
          </div>
          <div className="overflow-hidden">
            <span className="preloader-word block text-white/40 text-[11px] font-bold tracking-[0.5em] uppercase">
              A new standard of excellence
            </span>
          </div>
        </div>

        <div className="absolute bottom-10 left-0 right-0 px-8 md:px-14 flex items-end justify-between">
          <span className="text-white/40 text-[11px] font-bold tracking-[0.3em] uppercase">Loading Experience</span>
          <span className="text-lime text-6xl md:text-8xl font-display font-light leading-none tabular-nums">
            {progress}
            <span className="text-2xl align-top">%</span>
          </span>
        </div>
        <div className="absolute bottom-0 left-0 h-[3px] bg-lime" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

/* ------------------------- Magnetic Button ------------------------- */
export const Magnetic: React.FC<{ children: React.ReactNode; className?: string; strength?: number }> = ({
  children,
  className,
  strength = 0.4,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={cnLocal('inline-block will-change-transform', className)}>
      {children}
    </div>
  );
};

function cnLocal(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/* ------------------------- Animated Counter ------------------------- */
export const Counter: React.FC<{ value: string; className?: string }> = ({ value, className }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = value.match(/([\d.]+)(.*)/);
    if (!match) return;
    const num = parseFloat(match[1]);
    const suffix = match[2] || '';
    const decimals = (match[1].split('.')[1] || '').length;

    const obj = { val: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: num,
          duration: 2,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = obj.val.toFixed(decimals) + suffix;
          },
        });
      },
    });

    return () => st.kill();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
};

/* ------------------------- Reveal Text (word-by-word mask) ------------------------- */
export const RevealText: React.FC<{
  text: string;
  as?: React.ElementType;
  className?: string;
  delay?: number;
}> = ({ text, as = 'h2', className, delay = 0 }) => {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as any;
  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targets = el.querySelectorAll('.reveal-word');
    const anim = gsap.fromTo(
      targets,
      { yPercent: 115, rotate: 2 },
      {
        yPercent: 0,
        rotate: 0,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.06,
        delay,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      }
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span className="reveal-word inline-block will-change-transform">{w}&nbsp;</span>
        </span>
      ))}
    </Tag>
  );
};

/* ------------------------- Tilt Card (3D hover) ------------------------- */
export const TiltCard: React.FC<{ children: React.ReactNode; className?: string; intensity?: number }> = ({
  children,
  className,
  intensity = 10,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(pointer: coarse)').matches) return;

    const rotX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      rotY(px * intensity);
      rotX(-py * intensity);
    };
    const onLeave = () => {
      rotX(0);
      rotY(0);
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [intensity]);

  return (
    <div ref={ref} className={cnLocal('will-change-transform', className)} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
};
