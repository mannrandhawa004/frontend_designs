import { Link } from "react-router-dom";

export function LimeBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="badge-lime">
      <span className="dot" />
      {children}
    </span>
  );
}

export function Logo({
  dark = false,
  word = true,
  size = 28,
}: {
  dark?: boolean;
  word?: boolean;
  size?: number;
}) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden>
        <rect
          width="32"
          height="32"
          rx="9"
          fill={dark ? "#111113" : "#FD3A25"}
        />

        <path
          d="M16.2 8.2c3.8 0 6.4 2.2 6.4 5.4 0 2.4-1.4 4.1-3.7 4.9l3.9 5.3h-3.4l-3.4-4.7h-1.4V23.8h-3V8.2h4.6Zm-.2 2.6h-1.4v5.1h1.5c1.8 0 2.9-1 2.9-2.6 0-1.6-1.1-2.5-3-2.5Z"
          fill="white"
        />
      </svg>
      {word && (
        <span
          className="text-[18px] font-semibold tracking-[-0.03em] text-[#111]"
        >
          Aigocy
        </span>
      )}
    </span>
  );
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="flex h-[86px] w-[86px] items-center justify-center rounded-[26px] bg-[#FD3A25] shadow-[0_18px_50px_rgba(253,58,37,0.35)]">
        <svg width="42" height="42" viewBox="0 0 32 32" fill="none">
          <path
            d="M16.2 6.4c4.4 0 7.4 2.5 7.4 6.2 0 2.8-1.6 4.8-4.3 5.7l4.5 6.2h-4l-3.9-5.5h-1.6v5.5h-3.6V6.4h5.5Zm-.2 3h-1.7v5.9h1.8c2.1 0 3.4-1.1 3.4-3 0-1.8-1.3-2.9-3.5-2.9Z"
            fill="white"
          />
        </svg>
      </div>
      <div className="mt-3 text-[18px] font-semibold tracking-[-0.03em] text-[#111]">
        Aigocy
      </div>
    </div>
  );
}

export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path
        d="M3.53 12.1c.22-.6 1.06-.6 1.29 0l.72 1.96a1 1 0 0 0 .6.6l1.96.72c.6.22.6 1.06 0 1.29l-1.96.72a1 1 0 0 0-.6.6l-.72 1.96c-.22.6-1.06.6-1.29 0l-.72-1.96a1 1 0 0 0-.6-.6l-1.96-.72c-.6-.22-.6-1.06 0-1.29l1.96-.72a1 1 0 0 0 .6-.6l.72-1.96Z"
        fill="#FD3A25"
      />
      <path
        d="M11.4.67c.33-.9 1.59-.9 1.92 0l1.46 3.94c.1.28.33.5.61.61l3.94 1.46c.89.33.89 1.59 0 1.92l-3.94 1.46a1 1 0 0 0-.61.61l-1.46 3.94c-.33.89-1.59.89-1.92 0L9.95 10.67a1 1 0 0 0-.61-.61L5.4 8.6c-.89-.33-.89-1.59 0-1.92l3.94-1.46a1 1 0 0 0 .61-.61L11.4.67Z"
        fill="#FD3A25"
      />
    </svg>
  );
}

export function Socials({ light = false }: { light?: boolean }) {
  const cls = light
    ? "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:bg-white hover:text-black"
    : "flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-[#111] hover:bg-[#111] hover:text-white";
  return (
    <div className="flex items-center gap-2">
      <a className={cls} href="https://x.com" aria-label="X" target="_blank" rel="noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.6l-5.2-6.8L5.4 22H2.3l7.3-8.4L1 2h6.7l4.7 6.2L18.9 2Zm-1.2 18h1.8L6.4 3.9H4.5L17.7 20Z" />
        </svg>
      </a>
      <a className={cls} href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.98h4.52V24H.24V8.98zM8.34 8.98h4.33v2.05h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-6.7c0-1.6-.03-3.66-2.23-3.66-2.23 0-2.57 1.74-2.57 3.54V24H8.34V8.98z" />
        </svg>
      </a>
      <a className={cls} href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </div>
  );
}

export function ArrowBtn({
  dir = "left",
  onClick,
  light = false,
}: {
  dir?: "left" | "right";
  onClick?: () => void;
  light?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
        light
          ? "border-white/15 text-white hover:bg-white hover:text-black"
          : "border-black/10 text-[#111] hover:bg-[#111] hover:text-white"
      }`}
      aria-label={dir === "left" ? "Previous" : "Next"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={dir === "right" ? "rotate-180" : ""}
      >
        <path d="M15 6 9 12l6 6" />
      </svg>
    </button>
  );
}

export function PageHero({
  kicker,
  title,
  title2,
  copy,
}: {
  kicker?: string;
  title: string;
  title2?: string;
  copy?: string;
}) {
  return (
    <section className="hero grain relative overflow-hidden">
      <img
        src="/images/hero-bg.jpg"
        alt=""
        className="hero-bg-img pointer-events-none absolute inset-0 h-[120%] w-full object-cover object-right opacity-80"
        data-par="0.1"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#edecec]/55 via-[#edecec]/80 to-[#edecec]" />
      <div className="orb orb--red" style={{ width: 300, height: 300, top: -60, left: -60, opacity: 0.28 }} />
      <div className="orb orb--lime" style={{ width: 220, height: 220, bottom: -20, right: "10%", opacity: 0.2 }} />
      <div className="page-hero container-site relative">
        {kicker && (
          <div className="anim-item mb-5 flex justify-center">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold">
              <Sparkle />
              {kicker}
            </span>
          </div>
        )}
        <h1 className="anim-title inner-hero-title">
          {title}
          {title2 && (
            <>
              <br />
              {title2}
            </>
          )}
        </h1>
        {copy && (
          <p className="anim-item mx-auto mt-6 max-w-[560px] text-[16px] leading-7 text-[#52525b]">
            {copy}
          </p>
        )}
      </div>
    </section>
  );
}

export function Img({
  src,
  fallback,
  alt,
  className,
}: {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
    />
  );
}

export function CtaLink({
  to,
  children,
  variant = "dark",
}: {
  to: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  return (
    <Link to={to} className={variant === "dark" ? "btn-dark" : "btn-light"}>
      {children}
    </Link>
  );
}
