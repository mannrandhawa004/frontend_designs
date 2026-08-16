import { Link } from "react-router-dom";
import { ContactBlock, FaqBlock, Partners, PricingBlock, ProcessBlock } from "../components/sections";
import { LimeBadge, PageHero } from "../components/ui";
import { services } from "../data";

export default function Services() {
  return (
    <>
      <PageHero
        kicker="Services"
        title="Build Smarter with"
        title2="Full-Stack AI"
        copy="Unlock growth with our full-stack AI services, delivering smart, efficient solutions from strategy to deployment for innovative business success."
      />

      <section className="py-10 md:py-16">
        <div className="container-site">
          <LimeBadge>Services</LimeBadge>
          <h2 className="anim-title section-title mt-4">End-to-End AI Services</h2>
          <p className="anim-item mt-4 max-w-[640px] text-[15px] leading-7 text-[#71717a]">
            We turn ambiguous AI ideas into production features your users
            trust—combining strategy, design, engineering, and rigorous
            evaluation.
          </p>
          <div className="mt-10 flex flex-col gap-5">
            {services.map((s, i) => (
              <Link
                key={s.id}
                to={`/services/${s.id}`}
                className={`anim-item lift group grid overflow-hidden rounded-[32px] bg-white md:grid-cols-[1.1fr_0.9fr] ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="p-7 md:p-10">
                  <div className="text-[13px] text-[#a1a1aa]">{s.num}</div>
                  <h3 className="mt-3 whitespace-pre-line text-[34px] font-semibold leading-[1.1] tracking-[-0.045em]">
                    {s.title}
                  </h3>
                  <p className="mt-4 max-w-[520px] text-[15px] leading-7 text-[#71717a]">{s.long}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full bg-[#f4f4f5] px-3 py-1.5 text-[13px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#111] transition-transform group-hover:translate-x-1">
                    Learn more <span>→</span>
                  </div>
                </div>
                <div className="reveal-mask relative min-h-[240px] overflow-hidden">
                  <img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Partners />
      <ProcessBlock />
      <PricingBlock />
      <FaqBlock />
      <ContactBlock />
    </>
  );
}
