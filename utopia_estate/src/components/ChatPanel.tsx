import { useEffect, useRef, useState, type FormEvent } from "react";
import { SendHorizontal, X } from "lucide-react";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";
import { LogoBadge } from "./Logo";

interface Msg {
  id: number;
  from: "agent" | "me";
  text: string;
}

const QUICK = ["Is Lunar Oasis available?", "Book a tour", "Financing options"];

function reply(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("lunar") || t.includes("oasis") || t.includes("available"))
    return "Yes — Lunar Oasis Villa is available ✨ 695m², 3 bedrooms and panoramic desert views. Want me to reserve a private viewing?";
  if (t.includes("tour") || t.includes("visit") || t.includes("viewing"))
    return "Happy to help! Open any home and pick a slot under “Schedule a tour” — most times this week are still open.";
  if (t.includes("financ") || t.includes("mortgage") || t.includes("loan") || t.includes("price"))
    return "Our partner lenders offer pre-approval within 24 hours, with rates from 5.9% APR. Shall I connect you with an advisor?";
  if (t.includes("rent"))
    return "Every home is also available to rent — switch to “Rent” at the top right to see monthly prices.";
  return "Thanks for your message! A concierge will follow up shortly. Meanwhile, try the filters at the top to narrow down your perfect place.";
}

export function ChatPanel() {
  const { panel, setPanel } = useStore();
  const open = panel === "chat";
  const [messages, setMessages] = useState<Msg[]>([
    { id: 1, from: "agent", text: "Hi Emma 👋 I'm Ava from Utopia Concierge. Looking for something extraordinary today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const send = (text: string) => {
    const value = text.trim();
    if (!value) return;
    setMessages((m) => [...m, { id: Date.now(), from: "me", text: value }]);
    setInput("");
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { id: Date.now() + 1, from: "agent", text: reply(value) }]);
    }, 1100);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed bottom-24 left-3 right-3 z-[65] flex h-[min(34rem,70vh)] flex-col overflow-hidden rounded-[2rem] bg-frame text-ink shadow-[var(--shadow-pop)] ring-1 ring-line transition-all duration-300 sm:left-auto sm:right-6 sm:w-[24rem] lg:bottom-[2rem] lg:left-[9rem] lg:right-auto lg:w-[25rem]",
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center gap-3 border-b border-line p-4">
        <LogoBadge className="size-11" markClassName="size-6" />
        <div className="flex-1">
          <p className="font-semibold">Utopia Concierge</p>
          <p className="flex items-center gap-1.5 text-xs text-muted">
            <span className="size-2 rounded-full bg-emerald-500" /> Ava is online
          </p>
        </div>
        <button
          type="button"
          aria-label="Close chat"
          onClick={() => setPanel(null)}
          className="grid size-10 place-items-center rounded-full bg-chip transition-colors hover:bg-ink hover:text-frame"
        >
          <X className="size-4" />
        </button>
      </div>

      <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto p-4">
        {messages.map((m) => (
          <div key={m.id} className={cn("animate-rise flex", m.from === "me" ? "justify-end" : "justify-start")}>
            <p
              className={cn(
                "max-w-[82%] rounded-[1.25rem] px-4 py-2.5 text-sm leading-relaxed",
                m.from === "me" ? "rounded-br-md bg-ink text-frame" : "rounded-bl-md bg-surface ring-1 ring-line"
              )}
            >
              {m.text}
            </p>
          </div>
        ))}
        {typing && (
          <div className="flex">
            <span className="flex gap-1 rounded-[1.25rem] rounded-bl-md bg-surface px-4 py-3.5 ring-1 ring-line">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="animate-typing size-1.5 rounded-full bg-muted"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="no-scrollbar flex gap-1.5 overflow-x-auto px-4 pb-2">
        {QUICK.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => send(q)}
            className="whitespace-nowrap rounded-full bg-chip px-3 py-1.5 text-xs font-medium transition-colors hover:bg-line"
          >
            {q}
          </button>
        ))}
      </div>
      <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 pt-1">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message…"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-full bg-surface px-4 py-3 text-sm outline-none ring-1 ring-line placeholder:text-muted focus:ring-accent/60"
        />
        <button
          type="submit"
          aria-label="Send"
          className="grid size-11 shrink-0 place-items-center rounded-full bg-accent text-white transition-transform hover:scale-105"
        >
          <SendHorizontal className="size-4" />
        </button>
      </form>
    </div>
  );
}
