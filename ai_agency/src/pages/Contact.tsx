import { ContactBlock, FaqBlock } from "../components/sections";
import { PageHero } from "../components/ui";

export default function Contact() {
  return (
    <>
      <PageHero
        kicker="Consult"
        title="Let’s Build Intelligent"
        title2="Things"
        copy="Reach out to our team today and let’s collaborate to turn your ideas into innovative solutions that truly inspire."
      />
      <section className="pb-4">
        <div className="container-site grid gap-4 md:grid-cols-3">
          {[
            ["Our Location", "Montréal, Canada — available worldwide"],
            ["E-mail address", "hello@youraiagency.com"],
            ["Phone number", "+1 (647) 555 0172"],
          ].map(([t, d]) => (
            <div key={t} className="anim-item lift rounded-[24px] bg-white p-6">
              <div className="text-[13px] text-[#a1a1aa]">{t}</div>
              <div className="mt-2 text-[18px] font-semibold tracking-[-0.03em]">{d}</div>
            </div>
          ))}
        </div>
      </section>
      <ContactBlock />
      <FaqBlock />
    </>
  );
}
