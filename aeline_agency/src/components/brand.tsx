import { Asterisk, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Brand({ className = "" }: { className?: string }) {
  return (
    <a className={`brand ${className}`} href="#home" aria-label="Aeline home">
      <Asterisk strokeWidth={2.4} aria-hidden="true" />
      <span>aeline</span>
    </a>
  );
}

export function ArrowBadge() {
  return <span className="button-arrow"><ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" /></span>;
}

export function SectionLabel({ number, children }: { number: string; children: ReactNode }) {
  return <p className="section-label"><span>{number}</span><span className="label-rule" />{children}</p>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}