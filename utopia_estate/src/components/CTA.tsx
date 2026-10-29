import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useStore } from "@/store";

export function CTA() {
  const { notify } = useStore();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify("Please enter a valid email address");
      return;
    }
    setDone(true);
    notify("You're on the list — welcome to Utopia ✨");
  };

  return (
    <section className="mx-auto max-w-[88rem] px-4 pb-8 lg:px-[3rem]">
      <div className="relative overflow-hidden rounded-[2.5rem]">
        <img
          src="images/hero-aurora.jpg"
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(22,16,70,0.78)_0%,rgba(22,16,70,0.35)_55%,rgba(22,16,70,0.05)_100%)]" />
        <div className="relative z-10 max-w-[36rem] px-6 py-14 text-white sm:px-12 lg:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium ring-1 ring-white/25 backdrop-blur">
            <Sparkles className="size-3.5" /> Private collection
          </span>
          <h2 className="mt-5 text-[2.4rem] font-medium leading-[1.02] tracking-[-0.03em] sm:text-[3.25rem]">
            Be first to see off-market homes
          </h2>
          <p className="mt-4 text-white/80">
            Join 18,000+ members who receive hand-picked architectural homes before they go public.
          </p>
          {done ? (
            <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-white/15 py-2 pl-2 pr-6 ring-1 ring-white/30 backdrop-blur">
              <span className="grid size-10 place-items-center rounded-full bg-white text-[#16153a]">
                <Check className="size-5" />
              </span>
              <span className="text-sm">We'll be in touch at <b className="font-semibold">{email}</b></span>
            </div>
          ) : (
            <form
              onSubmit={submit}
              className="mt-8 flex max-w-[30rem] items-center gap-2 rounded-full bg-white/15 p-1.5 ring-1 ring-white/30 backdrop-blur-md"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email address"
                className="min-w-0 flex-1 bg-transparent px-4 text-white outline-none placeholder:text-white/60"
              />
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#16153a] transition-transform hover:scale-[1.02]"
              >
                Join
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
