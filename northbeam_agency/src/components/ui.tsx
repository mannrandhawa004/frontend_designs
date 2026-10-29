import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/utils/cn";

type IconProps = React.SVGProps<SVGSVGElement>;

export function LogoMark({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("size-7 shrink-0", className)}
      {...props}
    >
      <path d="M16 2.5 29.5 9.9 16 29.5 2.5 9.9 16 2.5Z" fill="#19191b" />
      <path d="M16 2.5v13.1L2.5 9.9 16 2.5Z" fill="#5b5b60" />
      <path d="M16 2.5v13.1l13.5-5.7L16 2.5Z" fill="#303034" />
      <path d="M2.5 9.9 16 29.5V15.6L2.5 9.9Z" fill="#f4ad3d" />
      <path d="M29.5 9.9 16 29.5V15.6l13.5-5.7Z" fill="#cabbf2" />
      <path d="M16 15.6 2.5 9.9 16 2.5l13.5 7.4L16 15.6Z" fill="#19191b" fillOpacity=".08" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[18px] font-semibold leading-none tracking-[-0.045em]">northbeam</span>
    </span>
  );
}

export function ArrowUpRight({ className, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M4.5 11.5 11.5 4.5M5.4 4.5h6.1v6.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowRight({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-4", className)} {...props}>
      <path d="M2.8 8h10.1M9.2 4.3 12.9 8l-3.7 3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDown({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-4", className)} {...props}>
      <path d="M8 2.8v10.1M4.3 9.2 8 12.9l3.7-3.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={cn("size-4", className)} {...props}>
      <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function Sparkle({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={cn("size-5", className)} {...props}>
      <path d="M12 1.8c.6 5.7 4.5 9.6 10.2 10.2-5.7.6-9.6 4.5-10.2 10.2C11.4 16.5 7.5 12.6 1.8 12 7.5 11.4 11.4 7.5 12 1.8Z" fill="currentColor" />
    </svg>
  );
}

export function MenuIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("size-5", className)} {...props}>
      <path d="M3 6.5h14M3 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CloseIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("size-5", className)} {...props}>
      <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className={cn("size-5", className)} {...props}>
      <path d="m4.5 10.5 3.6 3.6 7.4-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CopyIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" className={cn("size-4", className)} {...props}>
      <rect x="6.5" y="6.5" width="8" height="8" rx="1.8" stroke="currentColor" strokeWidth="1.3" />
      <path d="M11.5 6V4.3c0-.9-.7-1.6-1.6-1.6H4.3c-.9 0-1.6.7-1.6 1.6v5.6c0 .9.7 1.6 1.6 1.6H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function QuoteMark({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 42 32" fill="none" aria-hidden="true" className={cn("h-8 w-auto", className)} {...props}>
      <path d="M0 32V19.2C0 8.6 5.3 2.2 16 0l2 4.6c-6.3 1.8-9.3 5.1-9.6 9.9H17V32H0Zm24 0V19.2C24 8.6 29.3 2.2 40 0l2 4.6c-6.3 1.8-9.3 5.1-9.6 9.9H41V32H24Z" fill="currentColor" />
    </svg>
  );
}

export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "li";
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={cn("reveal", visible && "is-visible", className)}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

type ButtonVariant = "dark" | "light" | "outline" | "sun";

const variantClasses: Record<ButtonVariant, string> = {
  dark: "bg-ink text-paper hover:bg-[#333336]",
  light: "bg-paper text-ink hover:bg-white",
  outline: "border border-ink/20 bg-transparent text-ink hover:border-ink/40 hover:bg-white/60",
  sun: "bg-sun text-ink hover:bg-[#f8bf61]",
};

export function Button({
  children,
  variant = "dark",
  className,
  icon,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
}) {
  return (
    <button
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2.5 rounded-[9px] px-5 text-[13px] font-medium tracking-[-0.01em] transition duration-300 ease-out active:scale-[0.985] disabled:pointer-events-none disabled:opacity-60",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
      {icon ?? (
        <ArrowUpRight className="size-[15px] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </button>
  );
}

export function SectionLabel({
  children,
  className,
  dot = true,
}: {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2 text-current opacity-55", className)}>
      {dot && <span className="inline-block size-1 rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  );
}
