import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import { ArrowUpRight } from "./ui";

export function FloatingActions({ onContact }: { onContact: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.85;
      const contact = document.getElementById("contact");
      const nearEnd = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(past && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-x-3 bottom-3 z-40 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] sm:hidden",
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[130%] opacity-0",
        )}
      >
        <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-paper/85 p-2 shadow-[0_18px_40px_-14px_rgba(25,25,27,0.4)] backdrop-blur-xl">
          <div className="min-w-0 flex-1 pl-2">
            <p className="flex items-center gap-1.5 text-[12px] font-semibold text-ink">
              <span className="size-1.5 rounded-full bg-[#7d9c64]" /> 2 slots open
            </p>
            <p className="truncate text-[10.5px] text-ink/50">Reply within 1 business day</p>
          </div>
          <button
            type="button"
            onClick={onContact}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-ink px-4 text-[13px] font-medium text-paper active:scale-[0.98]"
          >
            Start a project <ArrowUpRight className="size-4" />
          </button>
        </div>
      </div>

      <a
        href="#top"
        aria-label="Back to top"
        className={cn(
          "fixed bottom-6 right-6 z-40 hidden size-11 items-center justify-center rounded-full border border-ink/10 bg-paper/85 text-ink shadow-[0_10px_30px_-10px_rgba(25,25,27,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-0.5 hover:bg-white sm:flex",
          show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <ArrowUpRight className="size-4 -rotate-45" />
      </a>
    </>
  );
}
