import { useState } from "react";
import { gallery } from "../data";
import { Leaf } from "./ui";

export function Gallery() {
  return (
    <section className="px-5 py-10">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold text-ink/50">@evergreen</p>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {gallery.slice(0, 4).map((g, i) => (
            <div key={i} className="overflow-hidden rounded-3xl">
              <img
                src={g}
                alt=""
                className="h-48 w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [ok, setOk] = useState(false);
  return (
    <section className="px-5 py-10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-semibold tracking-tight text-forest">
          Latest Bl<span className="text-lime">🌼</span>gs & Tips
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setOk(true);
          }}
          className="flex flex-1 items-center justify-end gap-3"
        >
          <input
            required
            type="email"
            placeholder="e.g. john@evergreen.com"
            className="w-full max-w-xs rounded-full border border-forest/15 bg-cream px-5 py-3 text-[13px] outline-none focus:border-forest"
          />
          <button className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-forest-dark transition hover:bg-lime-soft">
            {ok ? "Subscribed!" : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}

const links = ["About us", "Services", "Gallery", "Blog", "FAQ", "Reviews"];

export default function Footer() {
  return (
    <footer className="px-3 pb-3">
      <div className="mx-auto max-w-[1400px] rounded-[32px] bg-forest px-6 py-12 text-white md:px-12">
        <div className="flex items-center gap-2 text-lg font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-lime text-forest-dark">
            <Leaf className="h-4 w-4" />
          </span>
          evergreen
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Ready to Transform Your
              <br />
              Outdoor Space?
            </h2>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-forest-dark transition hover:bg-lime-soft"
              >
                Request a Quote
              </a>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Call us</p>
                <a href="tel:3228208200" className="text-lg font-semibold">
                  (322) 820 820
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Address</p>
            <p className="mt-3 text-[13px] text-white/70">
              200 5th Ave, New York,
              <br />
              NY 10018
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime">Business hours</p>
            <p className="mt-3 text-[13px] text-white/70">Mon–Sun: 7:00 a.m. – 7:00 p.m.</p>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/15 pt-6">
          <nav className="flex flex-wrap gap-6 text-[13px] text-white/70">
            {links.map((l) => (
              <a key={l} href="#home" className="transition hover:text-lime">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex gap-2">
            {["in", "f", "ig", "x"].map((s) => (
              <a
                key={s}
                href="#home"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-[11px] font-semibold transition hover:bg-lime hover:text-forest-dark"
              >
                {s}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[11px] text-white/40">© 2026 Evergreen. All rights reserved.</p>
      </div>
    </footer>
  );
}
