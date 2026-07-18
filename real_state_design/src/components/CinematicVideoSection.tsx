import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDownRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SOURCE = 'https://videos.pexels.com/video-files/7169059/7169059-uhd_3840_2160_25fps.mp4';
const VIDEO_POSTER = 'https://images.pexels.com/videos/7169059/pexels-photo-7169059.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=1920';

export const CinematicVideoSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const utilityRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const frame = frameRef.current;
    const overlay = overlayRef.current;
    const copy = copyRef.current;
    const utility = utilityRef.current;
    const progress = progressRef.current;

    if (!container || !video || !frame || !overlay || !copy || !utility || !progress) return;

    const playVideo = () => {
      if (!isPaused) video.play().catch(() => undefined);
    };
    const pauseVideo = () => video.pause();

    const ctx = gsap.context(() => {
      gsap.set([frame, copy, utility], { transformOrigin: '50% 50%' });
      gsap.set(progress, { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(copy.querySelectorAll('[data-copy-part]'), { y: 26, autoAlpha: 0 });

      // Begin playback while the film enters the viewport, before the pin starts.
      ScrollTrigger.create({
        trigger: container,
        start: 'top 82%',
        end: 'bottom 18%',
        onEnter: playVideo,
        onEnterBack: playVideo,
        onLeave: pauseVideo,
        onLeaveBack: pauseVideo,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=240%',
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: playVideo,
          onEnterBack: playVideo,
        },
      });

      // Caption reveals, then both text and film contract into and out of view.
      timeline
        .to(progress, { scaleX: 0.22, duration: 0.18, ease: 'none' })
        .to(copy.querySelectorAll('[data-copy-part]'), {
          y: 0,
          autoAlpha: 1,
          duration: 0.2,
          stagger: 0.045,
          ease: 'power2.out',
        }, 0.05)
        .to(frame, {
          width: () => (window.innerWidth < 768 ? '88vw' : '70vw'),
          height: () => (window.innerWidth < 768 ? '58vh' : '68vh'),
          borderRadius: () => (window.innerWidth < 768 ? '28px' : '44px'),
          boxShadow: '0 40px 100px rgba(0, 0, 0, 0.4)',
          duration: 0.47,
          ease: 'none',
        }, 0.22)
        .to(overlay, { opacity: 0.18, duration: 0.47, ease: 'none' }, 0.22)
        .to(copy, { scale: 0.68, y: -24, duration: 0.47, ease: 'none' }, 0.22)
        .to(utility, { scale: 0.78, autoAlpha: 0.75, duration: 0.47, ease: 'none' }, 0.22)
        .to(progress, { scaleX: 0.74, duration: 0.47, ease: 'none' }, 0.22)
        .to(frame, {
          scale: 0.13,
          autoAlpha: 0,
          borderRadius: '999px',
          duration: 0.28,
          ease: 'power2.in',
        }, 0.73)
        .to(copy, {
          scale: 0.14,
          y: -120,
          autoAlpha: 0,
          filter: 'blur(10px)',
          duration: 0.28,
          ease: 'power2.in',
        }, 0.73)
        .to(utility, { autoAlpha: 0, duration: 0.2, ease: 'none' }, 0.77)
        .to(progress, { scaleX: 1, duration: 0.27, ease: 'none' }, 0.73)
        .to(container, { backgroundColor: '#f4f2ec', duration: 0.12, ease: 'none' }, 0.88);
    }, container);

    return () => ctx.revert();
  }, [isPaused]);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
      videoRef.current.play().catch(() => undefined);
    }
  };

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setIsPaused(false);
      video.play().catch(() => undefined);
    } else {
      setIsPaused(true);
      video.pause();
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[680px] w-full overflow-hidden bg-ink"
      aria-label="Spaciaz cinematic architecture film"
    >
      <div ref={frameRef} className="absolute inset-0 h-full w-full overflow-hidden bg-black">
        <img
          src="/luxury-night.jpg"
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${videoError ? 'opacity-100' : 'opacity-0'}`}
        />
        <video
          ref={videoRef}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="metadata"
          poster={VIDEO_POSTER}
          onError={() => setVideoError(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${videoError ? 'opacity-0' : 'opacity-100'}`}
        >
          <source src={VIDEO_SOURCE} type="video/mp4" />
        </video>
        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/15 to-ink/80" />

        {/* A light drafting grid retains the architectural visual language. */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
            backgroundSize: 'clamp(54px, 8vw, 116px) clamp(54px, 8vw, 116px)',
          }}
        />
      </div>

      <div ref={utilityRef} className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between p-6 md:p-10 text-cream">
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.32em]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
          Spaciaz Film No. 01
        </div>
        <div className="hidden items-center gap-3 text-[10px] font-bold uppercase tracking-[0.28em] text-cream/65 md:flex">
          <span>Captured in Dubai</span>
          <span className="h-px w-10 bg-cream/40" />
          <span>00:15</span>
        </div>
      </div>

      <div ref={copyRef} className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-cream">
        <div data-copy-part className="mb-6 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.42em] text-lime md:text-xs">
          <span className="h-px w-8 bg-lime" />
          The Future of Living
          <span className="h-px w-8 bg-lime" />
        </div>
        <h2 data-copy-part className="max-w-5xl text-5xl font-bold leading-[0.88] tracking-tight md:text-8xl lg:text-9xl">
          Where ambition <br />
          <span className="font-display font-light italic text-lime">meets architecture.</span>
        </h2>
        <p data-copy-part className="mt-7 max-w-xl text-sm font-medium leading-relaxed text-cream/70 md:text-lg">
          A study in light, proportion, and the quiet confidence of spaces built to outlast every trend.
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 p-6 md:p-10">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6">
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.25em] text-cream/70">
            <ArrowDownRight className="h-4 w-4 text-lime" />
            Scroll to frame the story
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={togglePlayback}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 bg-ink/30 text-cream backdrop-blur-md transition-colors hover:bg-lime hover:text-ink"
              data-cursor="hover"
              data-cursor-label={isPaused ? 'Play' : 'Pause'}
              aria-label={isPaused ? 'Play architecture film' : 'Pause architecture film'}
            >
              {isPaused ? <Play className="ml-0.5 h-4 w-4 fill-current" /> : <Pause className="h-4 w-4 fill-current" />}
            </button>
            <button
              type="button"
              onClick={toggleSound}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 bg-ink/30 text-cream backdrop-blur-md transition-colors hover:bg-lime hover:text-ink"
              data-cursor="hover"
              data-cursor-label={muted ? 'Sound' : 'Mute'}
              aria-label={muted ? 'Enable video sound' : 'Mute video sound'}
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
        </div>
        <div className="mx-auto mt-5 h-px max-w-7xl overflow-hidden bg-cream/20">
          <div ref={progressRef} className="h-full w-full bg-lime" />
        </div>
      </div>
    </section>
  );
};