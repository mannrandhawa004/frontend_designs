import type { CSSProperties } from "react";

type Props = { className?: string; style?: CSSProperties };

/** The Melius bowtie mark — two inward-curving blades. */
export function LogoMark({ className = "h-4 w-auto", style }: Props) {
  return (
    <svg viewBox="0 0 40 26" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M2 1.4h13.6c-5.6 5.3-5.6 18 0 23.2H2z"
        fill="currentColor"
        strokeLinejoin="round"
      />
      <path
        d="M38 1.4H24.4c5.6 5.3 5.6 18 0 23.2H38z"
        fill="currentColor"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function LogoLockup({ className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className="h-[14px] w-auto" />
      <span className="text-[15px] font-semibold tracking-[-0.02em]">Melius</span>
    </span>
  );
}
