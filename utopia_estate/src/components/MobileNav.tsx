import { House, LayoutGrid, MessageSquareText, Search, type LucideIcon } from "lucide-react";
import { useStore } from "@/store";
import { cn } from "@/utils/cn";

export function MobileNav() {
  const { panel, setPanel } = useStore();

  const items: { id: string; label: string; icon: LucideIcon; onClick: () => void; on: boolean }[] = [
    {
      id: "home",
      label: "Home",
      icon: House,
      on: panel === null,
      onClick: () => {
        setPanel(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    { id: "search", label: "Search", icon: Search, on: panel === "search", onClick: () => setPanel(panel === "search" ? null : "search") },
    {
      id: "grid",
      label: "Listings",
      icon: LayoutGrid,
      on: false,
      onClick: () => {
        setPanel(null);
        document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    { id: "chat", label: "Chat", icon: MessageSquareText, on: panel === "chat", onClick: () => setPanel(panel === "chat" ? null : "chat") },
  ];

  return (
    <nav
      aria-label="Mobile"
      className="fixed inset-x-3 bottom-3 z-[60] flex items-center justify-between rounded-full bg-frame/85 p-1.5 shadow-[var(--shadow-pop)] ring-1 ring-line backdrop-blur-xl lg:hidden"
    >
      {items.map((it) => (
        <button
          key={it.id}
          type="button"
          onClick={it.onClick}
          className={cn(
            "flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium transition-all",
            it.on ? "bg-ink text-frame" : "text-muted"
          )}
        >
          <it.icon className="size-5" strokeWidth={1.9} />
          {it.on && <span>{it.label}</span>}
        </button>
      ))}
    </nav>
  );
}
