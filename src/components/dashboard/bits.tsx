import { cn } from "@/lib/cn";
import type { Application } from "@/lib/mock";

export function DashHead({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div>
      {eyebrow && (
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-deep">{eyebrow}</p>
      )}
      <h1 className={cn("font-serif text-2xl text-navy sm:text-3xl", eyebrow && "mt-1.5")}>{title}</h1>
      {body && <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted">{body}</p>}
    </div>
  );
}

const statusClass: Record<Application["status"], string> = {
  "Offers ready": "bg-[#e8f8ef] text-spark-leaf",
  "In review": "bg-[#e7f4fc] text-spark-sky",
  Disbursed: "bg-[#fff8e4] text-[#c48a10]",
  Closed: "bg-ivory text-muted",
  "No offer": "bg-[#fff1ec] text-spark-coral",
};

export function StatusPill({ status }: { status: Application["status"] }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold", statusClass[status])}>
      {status}
    </span>
  );
}
