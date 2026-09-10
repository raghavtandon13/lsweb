import Link from "next/link";
import { useParams } from "next/navigation";
import { mockApplications, mockTimeline } from "@/lib/mock";
import { inr } from "@/lib/format";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button-link";
import { DashHead, StatusPill } from "@/components/dashboard/bits";

export default function ApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const app = mockApplications.find((a) => a.id === id) ?? mockApplications[0];

  if (!app) {
    return <p className="text-muted">Application not found.</p>;
  }

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/applications" className="text-sm font-semibold text-spark-gold">
        ← All applications
      </Link>
      <div className="mt-3">
        <DashHead eyebrow={app.id} title={app.product} body={`${inr(app.amount)}${app.lender ? ` · ${app.lender}` : ""}`} />
      </div>
      <div className="mt-3">
        <StatusPill status={app.status} />
      </div>

      {app.status === "Offers ready" && (
        <ButtonLink href="/dashboard/offers" size="md" className="mt-5 w-full sm:w-auto">
          View offers
        </ButtonLink>
      )}

      <ol className="mt-8">
        {mockTimeline.map((e, i) => (
          <li key={e.title} className="flex gap-4">
            <div className="flex w-3 shrink-0 flex-col items-center">
              <span
                className={cn(
                  "mt-1.5 h-3 w-3 shrink-0 rounded-full",
                  e.state === "done" && "bg-spark-leaf",
                  e.state === "current" && "bg-spark-gold",
                  e.state === "upcoming" && "bg-line",
                )}
              />
              {i < mockTimeline.length - 1 && <span className="my-1 w-px flex-1 bg-line" />}
            </div>
            <div className={cn("min-w-0", i < mockTimeline.length - 1 && "pb-6")}>
              <p className="text-xs text-muted">{e.at}</p>
              <h2 className="mt-0.5 font-medium text-navy">{e.title}</h2>
              <p className="text-sm leading-6 text-muted">{e.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
