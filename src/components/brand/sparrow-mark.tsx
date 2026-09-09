import { cn } from "@/lib/cn";

/** Side-view sparrow in flight. Fill with `currentColor`. */
export function SparrowMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 64" className={cn("overflow-visible", className)} fill="none" aria-hidden>
      <g fill="currentColor">
        <path d="M4 18c8 4 16 10 20 14L6 30c6 2 14 4 18 6L3 46c10-4 22-8 28-12 1.2 0 1.5-4 0-6C22 24 12 20 4 18Z" />
        <ellipse cx="40" cy="34" rx="20" ry="12" transform="rotate(-22 40 34)" />
        <circle cx="58" cy="24" r="10" />
        <path d="M66 21 79 16 67 29Z" />
      </g>
      <g className="sparrow-wing" fill="currentColor">
        <path d="M34 30C16 8 32-6 54 8 42 12 38 22 40 32 38 32 36 31 34 30Z" />
      </g>
      <circle cx="61" cy="22" r="2.1" fill="white" />
      <circle cx="61.6" cy="21.6" r="1" fill="var(--gold-deep)" />
    </svg>
  );
}
