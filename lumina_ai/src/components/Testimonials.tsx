import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const quotes = [
  {
    quote: "We replaced 47 zaps and 3 internal tools with Lumina in a week. Lead response went from 22 minutes to 40 seconds.",
    name: "Maya Chen",
    role: "VP Growth, Meridian",
    initials: "MC",
  },
  {
    quote: "The MCP servers are unreal. Our support agent now resolves tickets end-to-end — refunds, credits, all audited.",
    name: "Jonas Weber",
    role: "Head of Eng, Oslo",
    initials: "JW",
  },
  {
    quote: "First automation platform our security team actually approved on first review. SOC 2, SSO, EU residency — done.",
    name: "Priya Nair",
    role: "COO, Lattice",
    initials: "PN",
  },
];

export default function Testimonials() {
  return (
    <section className="relative border-t border-white/[0.07] bg-[#04070f]">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-24">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-[480px] text-[30px] font-[380] leading-[1.08] tracking-tight text-white md:text-[44px]">
            Loved by operators, <span className="font-serif italic text-[#bcd8ff]">trusted by security.</span>
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-300 text-amber-300" />
              ))}
            </div>
            <span className="font-mono text-[11px] text-white/45">4.9 · 2,400+ REVIEWS</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <motion.figure
              key={q.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-7"
            >
              <div>
                <Quote className="h-5 w-5 text-[#7aa8ff]/60" />
                <blockquote className="mt-4 text-[15px] leading-relaxed text-white/80">“{q.quote}”</blockquote>
              </div>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-white/[0.08] pt-5">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#7aa8ff]/40 to-[#1d4ed8]/40 font-mono text-[11px] text-white">
                  {q.initials}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-white">{q.name}</p>
                  <p className="font-mono text-[11px] text-white/40">{q.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
