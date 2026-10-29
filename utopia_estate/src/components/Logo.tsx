import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <path
        d="M15 15v18.5a13 13 0 0 0 26 0V29.5L50 20.5"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M40.5 19.5H51V30"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoBadge({
  className,
  markClassName,
}: {
  className?: string;
  markClassName?: string;
}) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]",
        className
      )}
      style={{
        backgroundImage:
          "radial-gradient(120% 120% at 28% 18%, #4a37b2 0%, #2a1d6f 52%, #1b1250 100%)",
      }}
    >
      <LogoMark className={markClassName} />
    </span>
  );
}
