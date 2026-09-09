import { useParams } from "next/navigation";
import { mockApplications, mockTimeline } from "@/lib/mock";
import { inr } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const app = mockApplications.find((a) => a.id === id) ?? mockApplications[0];

  if (!app) {
    return <p className="text-muted">Application not found.</p>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-[11px] uppercase tracking-wider text-gold-deep">{app.id}</p>
      <h1 className="mt-2 font-serif text-4xl text-navy">{app.product}</h1>
      <p className="mt-2 text-muted">
        {inr(app.amount)} · {app.status}
        {app.lender ? ` · ${app.lender}` : ""}
      </p>
      <ol className="mt-10 space-y-0">
        {mockTimeline.map((e, i) => (
          <li key={e.title} className="grid grid-cols-[auto_1fr] gap-4">
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "h-3 w-3 rounded-full",
                  e.state === "done" && "bg-sage",
                  e.state === "current" && "bg-gold",
                  e.state === "upcoming" && "bg-line",
                )}
              />
              {i < mockTimeline.length - 1 && <span className="w-px flex-1 bg-line" />}
            </div>
            <div className="pb-8">
              <p className="text-xs text-muted">{e.at}</p>
              <h2 className="font-medium text-navy">{e.title}</h2>
              <p className="text-sm text-muted">{e.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
