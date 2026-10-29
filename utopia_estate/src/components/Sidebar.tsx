import { useState, type ReactNode } from "react";
import {
  Bell,
  Bookmark,
  CalendarCheck,
  Heart,
  House,
  LayoutGrid,
  LogOut,
  MessageSquareText,
  Moon,
  Search,
  Settings,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useDismiss } from "@/hooks/useDismiss";
import { useStore, type Theme } from "@/store";
import { cn } from "@/utils/cn";
import { FRAME } from "@/lib/shapes";

const popover =
  "animate-pop absolute z-50 rounded-[1.5rem] bg-frame p-[0.5rem] text-ink shadow-[var(--shadow-pop)] ring-1 ring-line";

export function Sidebar() {
  const { panel, setPanel } = useStore();
  const [active, setActive] = useState<"home" | "grid">("home");
  const current = panel ?? active;

  const nav: { id: string; label: string; icon: LucideIcon; onClick: () => void }[] = [
    {
      id: "home",
      label: "Home",
      icon: House,
      onClick: () => {
        setActive("home");
        setPanel(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
    {
      id: "search",
      label: "Search  ⌘K",
      icon: Search,
      onClick: () => setPanel(panel === "search" ? null : "search"),
    },
    {
      id: "grid",
      label: "Listings",
      icon: LayoutGrid,
      onClick: () => {
        setActive("grid");
        setPanel(null);
        document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      id: "chat",
      label: "Concierge chat",
      icon: MessageSquareText,
      onClick: () => setPanel(panel === "chat" ? null : "chat"),
    },
  ];

  return (
    <>
      <nav
        aria-label="Primary"
        className="glass-chip absolute left-[1.5rem] z-20 hidden flex-col gap-[0.75rem] rounded-full p-[0.375rem] ring-1 ring-white/30 lg:flex"
        style={{ bottom: `${FRAME.rail.h + 1}rem` }}
      >
        {nav.map((n) => {
          const on = current === n.id;
          return (
            <button
              key={n.id}
              type="button"
              aria-label={n.label}
              aria-current={on ? "page" : undefined}
              onClick={n.onClick}
              className={cn(
                "group relative grid size-[3.5rem] place-items-center rounded-full transition-all duration-300",
                on ? "bg-frame text-ink shadow-[var(--shadow-soft)]" : "glass-btn"
              )}
            >
              <n.icon className="size-[1.2rem]" strokeWidth={on ? 2.2 : 1.8} />
              <Tip>{n.label}</Tip>
            </button>
          );
        })}
      </nav>

      {/* transparent: the hero mask cuts this column out of the photo */}
      <div
        className="absolute bottom-0 left-0 z-20 hidden lg:block"
        style={{ width: `${FRAME.rail.w}rem`, height: `${FRAME.rail.h}rem` }}
      >
        <div className="flex flex-col items-center pt-[1.875rem]">
          <ProfileButton />
          <NotificationsButton />
          <div className="mt-[2.25rem] flex flex-col gap-[0.5rem] rounded-full bg-chip p-[0.375rem]">
            <SettingsButton />
            <ThemeButton value="dark" icon={Moon} label="Dark mode" />
            <ThemeButton value="light" icon={Sun} label="Light mode" />
          </div>
        </div>
      </div>
    </>
  );
}

function Tip({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-[calc(100%+0.9rem)] top-1/2 -translate-x-1 -translate-y-1/2 whitespace-pre rounded-full bg-ink px-3 py-1.5 text-[0.75rem] font-medium text-frame opacity-0 shadow-lg transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
      {children}
    </span>
  );
}

function ProfileButton() {
  const { saved, liked, notify } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Account"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="block size-[3.5rem] overflow-hidden rounded-full shadow-[var(--shadow-soft)] ring-[3px] ring-surface transition-transform hover:scale-105"
      >
        <img src="images/avatar.jpg" alt="Emma Larsen" className="size-full object-cover" />
      </button>
      {open && (
        <div className={cn(popover, "left-[calc(100%+1.4rem)] top-0 w-[17.5rem]")}>
          <div className="flex items-center gap-3 rounded-[1.1rem] bg-surface p-3">
            <img src="images/avatar.jpg" alt="" className="size-11 rounded-full object-cover" />
            <div className="min-w-0">
              <p className="font-semibold">Emma Larsen</p>
              <p className="truncate text-xs text-muted">emma@utopia.homes</p>
            </div>
          </div>
          <div className="mt-1.5 grid grid-cols-2 gap-1.5">
            <div className="rounded-[1rem] bg-chip/70 px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <Bookmark className="size-3.5" /> Saved
              </p>
              <p className="text-lg font-semibold">{saved.length}</p>
            </div>
            <div className="rounded-[1rem] bg-chip/70 px-3 py-2.5">
              <p className="flex items-center gap-1.5 text-xs text-muted">
                <Heart className="size-3.5" /> Liked
              </p>
              <p className="text-lg font-semibold">{liked.length}</p>
            </div>
          </div>
          <div className="mt-1.5">
            <MenuRow icon={CalendarCheck} onClick={() => notify("You have 1 upcoming tour this week")}>
              My tours
            </MenuRow>
            <MenuRow
              icon={LogOut}
              onClick={() => {
                setOpen(false);
                notify("Signed out — see you soon, Emma");
              }}
            >
              Sign out
            </MenuRow>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuRow({
  icon: Icon,
  children,
  onClick,
}: {
  icon: LucideIcon;
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-[1rem] px-3 py-2.5 text-left text-[0.92rem] transition-colors hover:bg-chip"
    >
      <Icon className="size-4 text-muted" />
      {children}
    </button>
  );
}

const NOTIFICATIONS = [
  { id: 1, title: "Price drop", text: "Mirage Dune Pavilion is now 4% lower", time: "2m", propertyId: "mirage-dune" },
  { id: 2, title: "New listing", text: "Aurora Crest Chalet just hit the market in Aspen", time: "1h", propertyId: "aurora-crest" },
  { id: 3, title: "Tour confirmed", text: "Lunar Oasis Villa · Friday at 11:00", time: "1d", propertyId: "lunar-oasis" },
];

function NotificationsButton() {
  const { openProperty } = useStore();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(true);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative mt-[0.85rem]">
      <button
        type="button"
        aria-label="Notifications"
        aria-expanded={open}
        onClick={() => {
          setOpen((o) => !o);
          setUnread(false);
        }}
        className={cn(
          "relative grid size-[3.5rem] place-items-center rounded-full text-ink transition-colors",
          open ? "bg-surface shadow-[var(--shadow-soft)]" : "bg-chip hover:bg-surface"
        )}
      >
        <Bell className="size-[1.2rem]" strokeWidth={1.8} />
        {unread && (
          <span className="absolute right-[0.95rem] top-[0.9rem] size-[0.55rem] rounded-full bg-accent ring-2 ring-chip" />
        )}
      </button>
      {open && (
        <div className={cn(popover, "left-[calc(100%+1.4rem)] top-[-1rem] w-[20rem]")}>
          <div className="flex items-center justify-between px-3 pb-1.5 pt-2">
            <p className="font-semibold">Notifications</p>
            <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
              {NOTIFICATIONS.length} new
            </span>
          </div>
          {NOTIFICATIONS.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => {
                setOpen(false);
                openProperty(n.propertyId);
              }}
              className="flex w-full items-start gap-3 rounded-[1rem] px-3 py-2.5 text-left transition-colors hover:bg-chip"
            >
              <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2 text-[0.9rem] font-medium">
                  {n.title}
                  <span className="text-xs font-normal text-muted">{n.time}</span>
                </span>
                <span className="block text-[0.82rem] leading-snug text-muted">{n.text}</span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SettingsButton() {
  const { units, setUnits, autoplay, setAutoplay } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label="Settings"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "grid size-[3.5rem] place-items-center rounded-full text-ink transition-all duration-300",
          open ? "bg-surface shadow-[var(--shadow-soft)]" : "hover:bg-surface/70"
        )}
      >
        <Settings className={cn("size-[1.2rem] transition-transform duration-500", open && "rotate-90")} strokeWidth={1.8} />
      </button>
      {open && (
        <div className={cn(popover, "left-[calc(100%+1.75rem)] top-[-0.5rem] w-[17.5rem] p-3")}>
          <p className="px-1 pb-2 font-semibold">Preferences</p>
          <p className="px-1 pb-1.5 text-xs text-muted">Area units</p>
          <div className="grid grid-cols-2 gap-1 rounded-full bg-chip p-1">
            {(["m2", "ft2"] as const).map((u) => (
              <button
                key={u}
                type="button"
                onClick={() => setUnits(u)}
                className={cn(
                  "rounded-full py-1.5 text-sm font-medium transition-all",
                  units === u ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
                )}
              >
                {u === "m2" ? "m²" : "ft²"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAutoplay(!autoplay)}
            className="mt-3 flex w-full items-center justify-between rounded-[1rem] px-1 py-1.5 text-left"
          >
            <span>
              <span className="block text-sm font-medium">Showcase autoplay</span>
              <span className="block text-xs text-muted">Rotate featured homes</span>
            </span>
            <span
              className={cn(
                "relative h-6 w-11 rounded-full transition-colors",
                autoplay ? "bg-accent" : "bg-chip"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                  autoplay ? "left-[1.375rem]" : "left-0.5"
                )}
              />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

function ThemeButton({ value, icon: Icon, label }: { value: Theme; icon: LucideIcon; label: string }) {
  const { theme, setTheme } = useStore();
  const on = theme === value;
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={on}
      onClick={() => setTheme(value)}
      className={cn(
        "group relative grid size-[3.5rem] place-items-center rounded-full text-ink transition-all duration-300",
        on ? "bg-surface shadow-[var(--shadow-soft)]" : "hover:bg-surface/70"
      )}
    >
      <Icon className={cn("size-[1.2rem] transition-transform duration-500", on && "rotate-[20deg]")} strokeWidth={on ? 2.1 : 1.8} />
      <Tip>{label}</Tip>
    </button>
  );
}
