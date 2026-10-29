import { Check } from "lucide-react";
import { useStore } from "@/store";

export function Toast() {
  const { toast } = useStore();
  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[90] flex justify-center px-4 lg:bottom-8"
    >
      <div
        key={toast.id}
        className="animate-toast flex items-center gap-2.5 rounded-full bg-ink py-2.5 pl-2.5 pr-5 text-sm font-medium text-frame shadow-[var(--shadow-pop)]"
      >
        <span className="grid size-6 place-items-center rounded-full bg-accent text-white">
          <Check className="size-3.5" strokeWidth={3} />
        </span>
        {toast.message}
      </div>
    </div>
  );
}
