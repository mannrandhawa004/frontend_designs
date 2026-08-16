import { Link, useParams } from "react-router-dom";
import { ContactBlock, FaqBlock, ProcessBlock } from "../components/sections";
import { LimeBadge, PageHero } from "../components/ui";
import { services } from "../data";

export default function ServiceDetail() {
  const { id } = useParams();
  const s = services.find((x) => x.id === id) || services[0];
  return (
    <>
      <PageHero kicker={`Service / ${s.num}`} title={s.title.replace("\n", " ")} copy={s.short} />
      <section className="py-10 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <LimeBadge>Overview</LimeBadge>
            <h2 className="section-title mt-4">How we deliver this</h2>
            <p className="mt-5 text-[16px] leading-8 text-[#52525b]">{s.long}</p>
            <p className="mt-4 text-[16px] leading-8 text-[#52525b]">
              We help businesses harness the power of artificial intelligence to
              innovate, automate, and scale efficiently. From idea to execution,
              our team delivers end-to-end AI solutions tailored to your goals.
              We design data-driven strategies, build intelligent systems, and
              integrate AI into your workflows to enhance decision-making,
              customer experience, and operational performance.
            </p>
            <ul className="mt-8 space-y-3">
              {s.tags.map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-[15px]">
                  <span className="h-2 w-2 rounded-full bg-[#FD3A25]" />
                  {t}
                </li>
              ))}
            </ul>
            <Link to="/consult" className="btn-dark mt-8">
              Start this engagement
            </Link>
          </div>
          <img src={s.image} alt="" className="h-full min-h-[360px] rounded-[32px] object-cover" />
        </div>
      </section>
      <ProcessBlock />
      <FaqBlock />
      <ContactBlock />
    </>
  );
}
