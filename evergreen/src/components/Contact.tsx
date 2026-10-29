import { useState } from "react";
import { IMG } from "../data";

const perks = [
  "Complete Garden Makeovers",
  "Professional Landscaping",
  "Premium Turf Installation",
  "Garden Design & Planting",
];

const field =
  "w-full rounded-xl border border-forest-dark/15 bg-white/80 px-4 py-3 text-[13px] text-forest-dark outline-none transition placeholder:text-forest-dark/40 focus:border-forest focus:bg-white";

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="px-5 py-10 md:py-16">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[32px]">
        <img src={IMG.quote} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-forest-dark/70" />

        <div className="relative grid gap-8 p-6 md:grid-cols-2 md:p-12">
          <div className="text-white">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Free Quote &<br />
              Consultation
            </h2>
            <p className="mt-4 max-w-sm text-[13px] text-white/70">
              We're here to help with all your urban landscape design needs.
            </p>
            <ul className="mt-8 space-y-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[13px] font-medium">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-forest-dark">
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Call us</p>
              <a href="tel:3228208200" className="text-2xl font-semibold">
                (322) 820 820
              </a>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-3xl bg-lime p-6 md:p-8"
          >
            <p className="text-[13px] font-medium leading-relaxed text-forest-dark">
              We'll schedule a visit and provide a free, no-obligation quote tailored to your needs
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-forest-dark/60">Your name</label>
                <input required placeholder="e.g. John Smith" className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-forest-dark/60">
                  Email address
                </label>
                <input required type="email" placeholder="e.g. john@evergreen.com" className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-forest-dark/60">Phone</label>
                <input placeholder="+1 (213) 440 100" className={`${field} mt-1.5`} />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-forest-dark/60">
                  Select a service
                </label>
                <select className={`${field} mt-1.5`} defaultValue="">
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option>Gardering</option>
                  <option>Landscaping</option>
                  <option>Turfing</option>
                  <option>Tree Care</option>
                </select>
              </div>
            </div>

            <div className="mt-3">
              <label className="text-[10px] font-bold uppercase tracking-wider text-forest-dark/60">Message</label>
              <textarea rows={3} placeholder="Describe your project" className={`${field} mt-1.5 resize-none`} />
            </div>

            <button
              type="submit"
              className="mt-5 rounded-full bg-forest px-7 py-3 text-sm font-semibold text-white transition hover:bg-forest-dark"
            >
              {sent ? "Thanks — we'll be in touch!" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
