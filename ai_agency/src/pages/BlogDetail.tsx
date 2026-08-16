import { Link, useParams } from "react-router-dom";
import { ContactBlock } from "../components/sections";
import { LimeBadge } from "../components/ui";
import { posts } from "../data";

export default function BlogDetail() {
  const { id } = useParams();
  const p = posts.find((x) => x.id === id) || posts[0];
  const more = posts.filter((x) => x.id !== p.id).slice(0, 3);
  return (
    <>
      <article className="pt-[140px]">
        <div className="container-site max-w-[820px] text-center">
          <LimeBadge>{p.category}</LimeBadge>
          <h1 className="mt-5 text-[40px] font-semibold leading-[1.08] tracking-[-0.045em] md:text-[56px]">
            {p.title}
          </h1>
          <p className="mt-4 text-[15px] text-[#71717a]">
            {p.date} · {p.read} read
          </p>
        </div>
        <div className="container-site mt-8">
          <img src={p.image} alt="" className="aspect-[16/8] w-full rounded-[32px] object-cover" />
        </div>
        <div className="container-site mt-10 max-w-[740px] text-[16px] leading-8 text-[#3f3f46]">
          <p>{p.excerpt}</p>
          <p className="mt-5">
            Sed vitae nulla eu velit fringilla hendrerit. Fusce luctus rhoncus
            blandit. Nulla vel varius felis. Integer felis urna, auctor
            hendrerit ante vitae, scelerisque bibendum quam. Proin libero leo,
            pulvinar nec iaculis ac, sodales nec tellus.
          </p>
          <blockquote className="my-8 rounded-[24px] bg-white p-7 text-[22px] font-medium leading-8 tracking-[-0.03em] text-[#111]">
            “A little universe of inspiration — where passion meets
            professionalism and creativity knows no bounds.”
          </blockquote>
          <p>
            We partner closely with organizations to identify opportunities
            where AI can drive tangible results—streamlining operations,
            reducing costs, and uncovering new sources of growth. Through
            collaborative workshops, iterative prototyping, and continuous
            optimization, we ensure every solution evolves with your business
            needs.
          </p>
        </div>
      </article>
      <section className="py-14">
        <div className="container-site">
          <h3 className="mb-6 text-[24px] font-semibold tracking-[-0.03em]">More from the journal</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {more.map((m) => (
              <Link key={m.id} to={`/blog/${m.id}`} className="rounded-[24px] bg-white p-5">
                <div className="text-[12px] text-[#a1a1aa]">{m.category}</div>
                <div className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">{m.title}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactBlock />
    </>
  );
}
