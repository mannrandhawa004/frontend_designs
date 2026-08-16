import {
  AwardsBlock,
  ContactBlock,
  FaqBlock,
  Partners,
  StatsBlock,
  TeamBlock,
  TestimonialsBlock,
  ToolsBlock,
} from "../components/sections";
import { LimeBadge, PageHero } from "../components/ui";
import Globe3D from "../components/Globe3D";
import { values } from "../data";

export default function About() {
  return (
    <>
      <PageHero
        kicker="About Aigocy"
        title="Aigocy Empowering"
        title2="Industries"
        copy="We build human-centered AI solutions that transform workflows, enhance decision-making, and accelerate innovation across diverse global industries."
      />

      <section className="py-10 md:py-16">
        <div className="container-site">
          <LimeBadge>About Us</LimeBadge>
          <h2 className="anim-title section-title mt-4">
            Human-Centered AI,
            <br />
            Built for Production
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.9fr]">
            <div
              data-tilt
              className="anim-item gradient-border lift relative min-h-[460px] overflow-hidden rounded-[32px] bg-[#0b0b0d]"
            >
              <div className="absolute inset-x-0 top-0 h-[35%] overflow-hidden">
                <Globe3D focus="top" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#0b0b0d]" />
              </div>
              <div className="pointer-events-none absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-medium text-white/90 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c6f04d] shadow-[0_0_10px_#c6f04d]" />
                Based in Montréal, Canada
              </div>
              <div className="pointer-events-none absolute bottom-6 left-6 right-6 grid grid-cols-3 gap-3 text-white">
                {[
                  ["120+", "Clients"],
                  ["8-10", "Weeks to ship"],
                  ["4", "Industries"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <div className="text-[22px] font-semibold tracking-[-0.04em] text-[#c6f04d]">{n}</div>
                    <div className="text-[11px] text-white/60">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="anim-item lift rounded-[32px] bg-white p-7 md:p-9">
              <div className="eyebrow mb-3">Our mission</div>
              <h3 className="text-[26px] font-semibold tracking-[-0.04em]">
                Practical AI, built to last
              </h3>
              <p className="mt-4 text-[15px] leading-7 text-[#52525b]">
                Based in Montréal, Canada, we build human-centered AI for
                production. Our mission is to create intelligent systems that
                empower people and organizations. By uniting research, design,
                and engineering, we deliver scalable and reliable AI
                solutions—technology that’s practical, trustworthy, and designed
                to make a meaningful impact in the real world.
              </p>
              <div className="reveal-mask mt-8 flex items-center gap-4 rounded-[22px] bg-[#f6f6f7] p-4">
                <img
                  src="/images/ava.jpg"
                  alt="Ava Collins"
                  className="h-20 w-20 shrink-0 rounded-2xl object-cover"
                />
                <div>
                  <p className="text-[16px] font-medium">Good AI feels obvious—because the hard work is hidden.</p>
                  <p className="mt-2 text-[13px] text-[#71717a]">Ava Collins · Aigocy’s Design Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Partners />

      <section className="py-10 md:py-16">
        <div className="container-site">
          <LimeBadge>Core Values</LimeBadge>
          <h2 className="anim-title section-title mt-4">Guided by Principles</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {values.map((v, i) => (
              <article
                key={v.title}
                className="anim-item lift group relative overflow-hidden rounded-[28px] bg-white p-7"
              >
                <div className="absolute right-6 top-4 text-[64px] font-semibold leading-none tracking-[-0.06em] text-[#f4f4f5] transition-colors duration-500 group-hover:text-[#fdece9]">
                  0{i + 1}
                </div>
                <div className="relative">
                  <h3 className="text-[26px] font-semibold tracking-[-0.04em]">{v.title}</h3>
                  <p className="mt-3 max-w-[380px] text-[15px] leading-7 text-[#71717a]">{v.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ToolsBlock />
      <div className="mx-3 overflow-hidden rounded-[36px] bg-[#0b0b0d] md:mx-5">
        <TeamBlock />
        <StatsBlock />
        <AwardsBlock />
        <TestimonialsBlock />
      </div>
      <FaqBlock />
      <ContactBlock />
    </>
  );
}
