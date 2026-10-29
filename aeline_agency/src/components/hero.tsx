import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Asterisk, Layers, Orbit, Pause, Play, Wind } from "lucide-react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { ArrowBadge } from "@/components/brand";
import { heroImages } from "@/lib/site-content";

export function Hero({ onContact }: { onContact: () => void }) {
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero" aria-labelledby="hero-heading">
      <div className="hero-sky" aria-hidden="true">
        <img src="/images/aeline-sky.jpg" alt="" fetchPriority="high" />
      </div>
      <div className="hero-content page-width">
        <motion.h1
          id="hero-heading"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero-wordmark">aeline<span className="wordmark-star"><Asterisk strokeWidth={1.6} aria-hidden="true" /></span></span>
          <span className="hero-headline">Human insight. <span>Intelligent impact.</span></span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero-description">We bring people, strategy, and AI together<br className="desktop-break" /> to turn your next big question into real-world progress.</p>
          <div className="hero-actions">
            <button className="button button-lime" onClick={onContact}>Let's build what's next <ArrowBadge /></button>
            <a className="hero-text-link" href="#work">Explore our work <ArrowDown size={14} aria-hidden="true" /></a>
          </div>
        </motion.div>
      </div>
      <motion.div className="hero-reel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }}>
        <TiltedGridHero
          className="hero-grid"
          images={heroImages}
          speed={4.8}
          tileHeight={55}
          aspectRatio={1.2}
          gap={10}
          axis={49}
          curve={72}
          fade={10}
          paused={paused}
        />
      </motion.div>
      {!reduceMotion && (
        <button className="motion-control" onClick={() => setPaused(!paused)} aria-pressed={paused} aria-label={paused ? "Play image reel" : "Pause image reel"}>
          {paused ? <Play size={11} aria-hidden="true" /> : <Pause size={11} aria-hidden="true" />}
          <span>{paused ? "Play motion" : "Pause motion"}</span>
        </button>
      )}
    </section>
  );
}

export function Partners() {
  return (
    <div className="partners" aria-label="A few of the teams in our orbit">
      <div className="partners-inner page-width">
        <p><span>Good people.</span><span>Shared ambition.</span></p>
        <div className="partner-logos">
          <span className="partner-nordwind"><Wind aria-hidden="true" />nordwind</span>
          <span className="partner-layers"><Layers aria-hidden="true" />Layers</span>
          <span className="partner-helios"><Asterisk aria-hidden="true" />HELIOS</span>
          <span className="partner-orbit"><Orbit aria-hidden="true" />orbit</span>
        </div>
      </div>
    </div>
  );
}