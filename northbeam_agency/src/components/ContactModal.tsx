import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { cn } from "@/utils/cn";
import { ArrowRight, ArrowUpRight, Button, CheckIcon, CloseIcon } from "./ui";

const projectTypes = [
  "Product design",
  "Mobile application",
  "Web platform",
  "AI & automation",
  "Platform modernization",
  "Not sure yet",
];

const budgets = ["Under €25k", "€25k–€75k", "€75k–€150k", "€150k+", "Not sure yet"];
const timelines = ["ASAP", "Within 3 months", "Exploring"];

const aliases: Record<string, string> = {
  "Mobile applications": "Mobile application",
  "Web platforms": "Web platform",
  "AI & automation": "AI & automation",
  "Applied AI": "AI & automation",
  "Platform modernization": "Platform modernization",
};

const fieldClass =
  "w-full rounded-lg border bg-white px-3.5 py-3 text-[14px] text-ink placeholder:text-ink/30 transition focus:outline-none focus:ring-4";

const labelClass = "mb-2 block text-[12px] font-medium text-ink/70";

function Chip({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-[12.5px] font-medium transition duration-200 active:scale-[0.97]",
        selected
          ? "border-ink bg-ink text-paper"
          : "border-ink/15 bg-white text-ink/70 hover:border-ink/35 hover:text-ink",
      )}
    >
      {selected && <CheckIcon className="size-3.5" />}
      {children}
    </button>
  );
}

export function ContactModal({
  open,
  interest,
  onClose,
}: {
  open: boolean;
  interest: string;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [type, setType] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement as HTMLElement;
    const mapped = aliases[interest] ?? (projectTypes.includes(interest) ? interest : "");
    setStep(1);
    setType(mapped);
    setBudget("");
    setTimeline("");
    setName("");
    setEmail("");
    setCompany("");
    setMessage(mapped || !interest ? "" : `Re: ${interest}\n`);
    setTouched(false);
    setSending(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      returnFocus.current?.focus?.();
    };
  }, [open, interest, onClose]);

  if (!open) return null;

  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const errors = {
    name: !name.trim() ? "Please add your name" : "",
    email: !email.trim() ? "We need an email to reply" : !emailValid ? "That email doesn't look right" : "",
    message: message.trim().length < 10 ? "A sentence or two helps us prepare" : "",
  };
  const hasErrors = Object.values(errors).some(Boolean);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (hasErrors) {
      const firstInvalid = dialogRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setStep(3);
    }, 900);
  };

  const firstName = name.trim().split(" ")[0] || "there";
  const fieldState = (err: string) =>
    touched && err
      ? "border-[#d27a6a] focus:border-[#c0614f] focus:ring-[#d27a6a]/15"
      : "border-ink/15 focus:border-ink/45 focus:ring-ink/[0.06]";

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close contact form"
        className="animate-fade-in absolute inset-0 cursor-default bg-[#19191b]/50 backdrop-blur-[6px]"
        onClick={onClose}
        tabIndex={-1}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        tabIndex={-1}
        onKeyDown={trapFocus}
        className="animate-fade-up relative flex max-h-[94svh] w-full max-w-[580px] flex-col overflow-hidden rounded-t-[22px] border border-white/60 bg-paper shadow-[0_40px_100px_-30px_rgba(20,20,25,0.6)] outline-none sm:rounded-[22px]"
      >
        <div className="mx-auto mt-2.5 h-1 w-10 rounded-full bg-ink/15 sm:hidden" aria-hidden="true" />

        <div className="relative overflow-hidden bg-[linear-gradient(125deg,#fbf1d9_0%,#f0e8f7_48%,#e7eff9_100%)] px-5 pb-5 pt-4 sm:px-7 sm:pb-6 sm:pt-6">
          <div className="relative flex items-center justify-between gap-4">
            {step < 3 ? (
              <ol className="flex items-center gap-2" aria-label="Progress">
                {["Project", "Details"].map((label, i) => {
                  const n = i + 1;
                  const done = step > n;
                  const current = step === n;
                  return (
                    <li key={label} className="flex items-center gap-2">
                      <span
                        aria-current={current ? "step" : undefined}
                        className={cn(
                          "flex size-6 items-center justify-center rounded-full text-[10.5px] font-semibold transition",
                          current && "bg-ink text-paper",
                          done && "bg-[#7d9c64] text-white",
                          !current && !done && "border border-ink/20 bg-white/50 text-ink/45",
                        )}
                      >
                        {done ? <CheckIcon className="size-3.5" /> : n}
                      </span>
                      <span className={cn("text-[12px] font-medium", current ? "text-ink" : "text-ink/45")}>{label}</span>
                      {i === 0 && <span className="mx-1 h-px w-6 bg-ink/20" aria-hidden="true" />}
                    </li>
                  );
                })}
              </ol>
            ) : (
              <span className="eyebrow text-ink/55">Enquiry received</span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/60 text-ink/60 transition hover:bg-white hover:text-ink"
            >
              <CloseIcon className="size-4" />
            </button>
          </div>

          <h2 id="contact-title" className="relative mt-5 max-w-[420px] text-[clamp(1.6rem,3.6vw,2.1rem)] font-medium leading-[1.05] tracking-[-0.045em]">
            {step === 1 && (
              <>
                What are we <span className="font-serif font-normal italic">building?</span>
              </>
            )}
            {step === 2 && (
              <>
                Where can we <span className="font-serif font-normal italic">reach you?</span>
              </>
            )}
            {step === 3 && <>Thanks, {firstName}.</>}
          </h2>
          {step < 3 && (
            <p className="relative mt-1.5 text-[12.5px] text-ink/55">
              {step === 1 ? "Takes under a minute. Pick what fits best — you can change it later." : "We reply within one business day, from a real person."}
            </p>
          )}
        </div>

        <div className="overflow-y-auto p-5 sm:p-7">
          {step === 1 && (
            <div className="animate-fade-in flex flex-col gap-6">
              <fieldset>
                <legend className={labelClass}>What do you need?</legend>
                <div role="radiogroup" className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <Chip key={t} selected={type === t} onClick={() => setType(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className={labelClass}>
                  Budget range <span className="font-normal text-ink/40">(optional)</span>
                </legend>
                <div role="radiogroup" className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <Chip key={b} selected={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                      {b}
                    </Chip>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className={labelClass}>
                  Timeline <span className="font-normal text-ink/40">(optional)</span>
                </legend>
                <div role="radiogroup" className="flex flex-wrap gap-2">
                  {timelines.map((t) => (
                    <Chip key={t} selected={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <a href="mailto:hello@northbeam.studio" className="text-center text-[12px] text-ink/50 underline-offset-4 hover:text-ink hover:underline">
                  Prefer email? hello@northbeam.studio
                </a>
                <Button
                  type="button"
                  disabled={!type}
                  onClick={() => setStep(2)}
                  className="h-12 w-full sm:w-auto"
                  icon={<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />}
                >
                  {type ? "Continue" : "Select a service"}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} noValidate className="animate-fade-in flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-1.5 rounded-xl bg-paper-deep/70 px-3 py-2.5">
                {[type, budget, timeline].filter(Boolean).map((v) => (
                  <span key={v} className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink/70 ring-1 ring-ink/10">
                    {v}
                  </span>
                ))}
                <button type="button" onClick={() => setStep(1)} className="ml-auto text-[11.5px] font-medium text-ink/55 underline underline-offset-4 hover:text-ink">
                  Edit
                </button>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className={labelClass}>Your name</label>
                  <input
                    id="contact-name"
                    autoComplete="name"
                    placeholder="Alex Morgan"
                    value={name}
                    aria-invalid={touched && !!errors.name}
                    aria-describedby="err-name"
                    onChange={(e) => setName(e.target.value)}
                    className={cn(fieldClass, fieldState(errors.name))}
                  />
                  {touched && errors.name && <p id="err-name" className="mt-1.5 text-[11.5px] text-[#b45545]">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelClass}>Work email</label>
                  <input
                    id="contact-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    value={email}
                    aria-invalid={touched && !!errors.email}
                    aria-describedby="err-email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(fieldClass, fieldState(errors.email))}
                  />
                  {touched && errors.email && <p id="err-email" className="mt-1.5 text-[11.5px] text-[#b45545]">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-company" className={labelClass}>
                  Company <span className="font-normal text-ink/40">(optional)</span>
                </label>
                <input
                  id="contact-company"
                  autoComplete="organization"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={cn(fieldClass, "border-ink/15 focus:border-ink/45 focus:ring-ink/[0.06]")}
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <label htmlFor="contact-message" className={labelClass}>A little context</label>
                  <span className="text-[10.5px] tabular-nums text-ink/35">{message.length}/600</span>
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  maxLength={600}
                  placeholder="What are you trying to build, fix, or modernize? What does a win look like?"
                  value={message}
                  aria-invalid={touched && !!errors.message}
                  aria-describedby="err-message"
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(fieldClass, "min-h-[104px] resize-y", fieldState(errors.message))}
                />
                {touched && errors.message && <p id="err-message" className="mt-1.5 text-[11.5px] text-[#b45545]">{errors.message}</p>}
              </div>

              <div className="mt-1 flex flex-col-reverse gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
                <button type="button" onClick={() => setStep(1)} className="inline-flex h-11 items-center justify-center gap-2 rounded-[9px] px-3 text-[13px] font-medium text-ink/60 transition hover:bg-ink/[0.04] hover:text-ink">
                  <ArrowRight className="size-4 rotate-180" /> Back
                </button>
                <Button
                  type="submit"
                  disabled={sending}
                  className="h-12 w-full sm:w-auto"
                  icon={
                    sending ? (
                      <span className="size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                    ) : (
                      <ArrowUpRight className="size-4" />
                    )
                  }
                >
                  {sending ? "Sending…" : "Send enquiry"}
                </Button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="animate-fade-in pb-2 text-center" role="status">
              <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e5eed8] text-[#577247]">
                <CheckIcon className="size-7" />
              </span>
              <p className="mx-auto mt-5 max-w-[380px] text-[14px] leading-[1.65] text-ink/60">
                Your note about <span className="font-medium text-ink">{type.toLowerCase()}</span> is with our team.
                We'll reply to <span className="font-medium text-ink">{email}</span> within one business day.
              </p>
              <ol className="mx-auto mt-6 grid max-w-[420px] gap-2 text-left">
                {["We read your note and prepare questions", "30-minute call with a founder", "Honest recommendation within a week"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 ring-1 ring-ink/[0.07]">
                    <span className="flex size-6 items-center justify-center rounded-full bg-paper-deep font-mono text-[10px] text-ink/60">{i + 1}</span>
                    <span className="text-[12.5px] text-ink/70">{s}</span>
                  </li>
                ))}
              </ol>
              <Button onClick={onClose} className="mt-6 h-12 w-full max-w-[260px]">
                Back to the site
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
