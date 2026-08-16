import { Link } from "react-router-dom";
import { ContactBlock } from "../components/sections";
import { LimeBadge, PageHero } from "../components/ui";
import { posts } from "../data";

export default function Blog() {
  const [hero, ...rest] = posts;
  return (
    <>
      <PageHero
        kicker="Journal"
        title="Notes from the"
        title2="sprint room"
        copy="Playbooks, evals, and production stories from the Aigocy squad — written for teams shipping AI users actually trust."
      />
      <section className="py-8 md:py-14">
        <div className="container-site">
          <Link
            to={`/blog/${hero.id}`}
            className="anim-item lift group grid overflow-hidden rounded-[32px] bg-white lg:grid-cols-2"
          >
            <div className="reveal-mask relative min-h-[280px] overflow-hidden">
              <img
                src={hero.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
              />
            </div>
            <div className="p-8 md:p-10">
              <LimeBadge>{hero.category}</LimeBadge>
              <h2 className="mt-4 text-[34px] font-semibold leading-[1.1] tracking-[-0.045em]">
                {hero.title}
              </h2>
              <p className="mt-4 text-[15px] leading-7 text-[#71717a]">{hero.excerpt}</p>
              <div className="mt-6 flex items-center gap-3 text-[13px] text-[#a1a1aa]">
                {hero.date} · {hero.read}
                <span className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#111] transition-transform group-hover:translate-x-1">
                  Read article →
                </span>
              </div>
            </div>
          </Link>

          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.id}`}
                className="anim-item lift group overflow-hidden rounded-[28px] bg-white"
              >
                <div className="reveal-mask relative overflow-hidden">
                  <img
                    src={p.image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                </div>
                <div className="p-6">
                  <div className="text-[12px] font-medium text-[#71717a]">
                    {p.category} · {p.date}
                  </div>
                  <h3 className="mt-2 text-[20px] font-semibold leading-snug tracking-[-0.03em]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-6 text-[#71717a]">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactBlock />
    </>
  );
}
