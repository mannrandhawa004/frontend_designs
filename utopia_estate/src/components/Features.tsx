import { BadgePercent, Headset, Play, Rotate3d, ShieldCheck, Star } from "lucide-react";
import { useStore } from "@/store";

const FEATURES = [
  { icon: ShieldCheck, title: "Verified listings", text: "Every home is inspected and verified by our local experts." },
  { icon: Rotate3d, title: "Immersive 3D tours", text: "Walk through every room in high fidelity before you visit." },
  { icon: BadgePercent, title: "Smart financing", text: "Pre-approval in 24h with rates from trusted partner lenders." },
  { icon: Headset, title: "24/7 concierge", text: "A dedicated advisor for viewings, paperwork and move-in." },
];

const STATS = [
  { value: "10K+", label: "Properties" },
  { value: "120+", label: "Cities" },
  { value: "4.9", label: "Client rating", star: true },
];

export function Features() {
  const { openProperty } = useStore();

  return (
    <section className="mx-auto max-w-[88rem] px-4 py-16 lg:px-[3rem] lg:py-[5rem]">
      <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr]">
        <div className="relative min-h-[26rem] overflow-hidden rounded-[2.25rem] lg:min-h-[36rem]">
          <img
            src="images/interior.jpg"
            alt="Living room of the Celeste Sky Penthouse"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(18,14,50,0.55),transparent_55%)]" />
          <div className="glass absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-[1.6rem] p-4 ring-1 ring-white/40 sm:inset-x-auto sm:left-5 sm:bottom-5 sm:max-w-[25rem] sm:p-5">
            <button
              type="button"
              aria-label="Open virtual tour"
              onClick={() => openProperty("celeste-sky")}
              className="group grid size-14 shrink-0 place-items-center rounded-full bg-white text-[#16153a] shadow-lg transition-transform hover:scale-105"
            >
              <Play className="ml-0.5 size-5 fill-current" />
            </button>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.14em] opacity-70">Virtual tour</p>
              <p className="mt-0.5 font-semibold">Celeste Sky Penthouse</p>
              <p className="text-sm opacity-75">Park City · 380m² · 2 bedrooms</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 rounded-[2.25rem] lg:py-4 lg:pl-8">
          <div>
            <p className="eyebrow">Why Utopia</p>
            <h2 className="mt-4 text-[2.4rem] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[3rem]">
              Designed around the way you want to live
            </h2>
            <p className="mt-4 max-w-lg text-muted">
              From first search to final signature, we pair architectural gems with a concierge team
              that handles every detail — so finding home feels effortless.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-[1.75rem] bg-surface p-5 ring-1 ring-line transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-pop)]"
              >
                <span className="grid size-11 place-items-center rounded-full bg-chip text-ink transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <f.icon className="size-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 divide-x divide-line rounded-[1.75rem] bg-surface py-5 ring-1 ring-line">
            {STATS.map((s) => (
              <div key={s.label} className="px-5 text-center">
                <p className="flex items-center justify-center gap-1.5 text-3xl font-medium tracking-tight">
                  {s.value}
                  {s.star && <Star className="size-5 fill-accent text-accent" />}
                </p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
