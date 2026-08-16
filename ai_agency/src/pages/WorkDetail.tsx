import { Link, useParams } from "react-router-dom";
import { ContactBlock, WorksBlock } from "../components/sections";
import { LimeBadge, PageHero } from "../components/ui";
import { works } from "../data";

export default function WorkDetail() {
  const { id } = useParams();
  const w = works.find((x) => x.id === id) || works[0];
  return (
    <>
      <PageHero kicker={w.industry} title={w.title} copy={w.description} />
      <section className="py-8">
        <div className="container-site">
          <div className="reveal-mask anim-item relative overflow-hidden rounded-[32px]">
            <img src={w.image} alt={w.title} data-par="0.08" className="aspect-[16/8] w-full object-cover" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {[
              ["Client", w.client],
              ["Industry", w.industry],
              ["Year", w.year],
              ["Deliverables", w.deliverables.replace("\n", " ")],
            ].map(([k, v]) => (
              <div key={k} className="anim-item lift rounded-[22px] bg-white p-5">
                <div className="text-[12px] uppercase tracking-[0.14em] text-[#a1a1aa]">{k}</div>
                <div className="mt-2 text-[15px] font-medium">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="anim-item lift rounded-[28px] bg-white p-8">
              <LimeBadge>Challenge</LimeBadge>
              <p className="mt-4 text-[16px] leading-8 text-[#52525b]">{w.challenge}</p>
            </div>
            <div className="anim-item lift rounded-[28px] bg-white p-8">
              <LimeBadge>Outcome</LimeBadge>
              <p className="mt-4 text-[16px] leading-8 text-[#52525b]">{w.outcome}</p>
            </div>
          </div>
          <p className="mx-auto mt-10 max-w-[820px] text-[16px] leading-8 text-[#52525b]">
            Catalog Intelligence Engine is an AI-powered platform designed to
            optimize product catalog management for e-commerce and retail
            businesses. It automates product classification, attribute
            extraction, enrichment, and consistency checks, reducing manual
            effort and improving customer experience. Leveraging natural
            language processing, computer vision, and machine learning, the
            engine identifies product categories, extracts key attributes, and
            detects anomalies or missing information.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/consult" className="btn-dark">
              Start a similar project
            </Link>
          </div>
        </div>
      </section>
      <WorksBlock />
      <ContactBlock />
    </>
  );
}
