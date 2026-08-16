import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Logo } from "./ui";
import { useCursor, usePageMotion } from "./animations";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/works", label: "Works" },
  { to: "/blog", label: "Blog" },
  { to: "/consult", label: "Consult" },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  usePageMotion(loc.pathname);
  useCursor();

  useEffect(() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [loc.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-wrap min-h-screen bg-[#edecec]">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 md:pt-5">
        <div
          className={`pointer-events-auto flex w-full max-w-[920px] items-center justify-between rounded-full border border-black/5 px-3 py-2 backdrop-blur-md transition-all duration-300 md:px-4 ${
            scrolled
              ? "bg-white/90 shadow-[0_10px_40px_rgba(15,15,20,0.14)]"
              : "bg-white/70 shadow-[0_8px_40px_rgba(15,15,20,0.06)]"
          }`}
        >
          <Link to="/" className="flex items-center pl-1">
            <Logo size={30} dark />
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/consult" className="btn-dark !h-10 !px-5 text-[14px]">
              Buy Now
            </Link>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className="flex flex-col gap-1.5">
                <i className="block h-[1.5px] w-4 bg-[#111]" />
                <i className="block h-[1.5px] w-4 bg-[#111]" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 animate-[fadeIn_0.25s_ease] bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="glass absolute inset-x-3 top-[78px] animate-[dropIn_0.35s_cubic-bezier(0.2,0.8,0.2,1)] rounded-[28px] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-1">
              {nav.map((item, i) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className="animate-[dropIn_0.4s_cubic-bezier(0.2,0.8,0.2,1)_backwards] rounded-2xl px-3 py-3 text-[16px] font-medium transition-colors hover:bg-black/5"
                  style={{ animationDelay: `${i * 0.05}s` }}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <Link
              to="/consult"
              className="btn-dark mt-3 w-full justify-center"
              onClick={() => setOpen(false)}
            >
              Buy Now
            </Link>
          </div>
        </div>
      )}

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#edecec] pt-16">
      <div className="orb orb--red" style={{ width: 320, height: 320, top: -60, left: -60, opacity: 0.18 }} />
      <div className="orb orb--lime" style={{ width: 260, height: 260, bottom: 0, right: -40, opacity: 0.16 }} />

      <div className="container-site relative z-10">
        <div className="grid gap-10 border-b border-black/5 pb-14 md:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <Logo size={34} dark />
            <p className="mt-5 max-w-[280px] text-[14px] leading-6 text-[#71717a]">
              Your AI sprint team on demand — strategy, design, and
              engineering that ships production copilots in weeks, not
              quarters.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                ["Twitter / X", "https://x.com"],
                ["Facebook", "https://facebook.com"],
                ["Instagram", "https://instagram.com"],
                ["Linkedin", "https://linkedin.com"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white text-[#111] transition-colors hover:bg-[#111] hover:text-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Explore</div>
            <div className="flex flex-col gap-3 text-[14px] text-[#3f3f46]">
              <Link to="/about" className="w-max transition-colors hover:text-[#111]">About</Link>
              <Link to="/services" className="w-max transition-colors hover:text-[#111]">Services</Link>
              <Link to="/works" className="w-max transition-colors hover:text-[#111]">Works</Link>
              <Link to="/blog" className="w-max transition-colors hover:text-[#111]">Blog</Link>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Company</div>
            <div className="flex flex-col gap-3 text-[14px] text-[#3f3f46]">
              <Link to="/consult" className="w-max transition-colors hover:text-[#111]">Contact</Link>
              <a href="#pricing" className="w-max transition-colors hover:text-[#111]">Pricing</a>
              <a href="#faq" className="w-max transition-colors hover:text-[#111]">FAQs</a>
              <span className="w-max text-[#a1a1aa]">Careers — soon</span>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-4">Stay in the loop</div>
            <p className="mb-4 text-[13px] leading-6 text-[#71717a]">
              Playbooks and eval notes, once a month. No spam.
            </p>
            <form
              className="newsletter-input"
              onSubmit={(e) => e.preventDefault()}
            >
              <input type="email" required placeholder="you@company.com" />
              <button type="submit" className="btn-dark !h-10 !px-4 text-[13px]">
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="pointer-events-none select-none text-center">
        <div className="watermark -mb-6 md:-mb-10">Aigocy</div>
      </div>

      <div className="container-site relative z-10 flex flex-col items-center justify-between gap-4 border-t border-black/5 py-5 text-[13px] text-[#71717a] md:flex-row">
        <div>© 2026 Aigocy. All Rights Reserved</div>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8fe01a]" />
          All systems operational
        </div>
        <button
          type="button"
          data-magnetic
          className="inline-flex items-center gap-2"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Back to top
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-black/10">↑</span>
        </button>
      </div>
    </footer>
  );
}
