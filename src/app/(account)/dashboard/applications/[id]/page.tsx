import Link from "next/link";
import { useParams } from "next/navigation";
import { DashHead, StatusPill } from "@/components/dashboard/bits";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/cn";
import { inr } from "@/lib/format";
import { mockApplications, mockTimeline } from "@/lib/mock";

export default function ApplicationDetailPage() {
    const { id } = useParams<{ id: string }>();
    const app = mockApplications.find((a) => a.id === id) ?? mockApplications[0];

    if (!app) {
        return <p className="text-muted">Application not found.</p>;
    }

    return (
        <div className="max-w-2xl">
            <Link className="text-sm font-semibold text-spark-gold" href="/dashboard/applications">
                ← All applications
            </Link>
            <div className="mt-3">
                <DashHead
                    body={`${inr(app.amount)}${app.lender ? ` · ${app.lender}` : ""}`}
                    eyebrow={app.id}
                    title={app.product}
                />
            </div>
            <div className="mt-3">
                <StatusPill status={app.status} />
            </div>

            {app.status === "Offers ready" && (
                <ButtonLink className="mt-5 w-full sm:w-auto" href="/dashboard/offers" size="md">
                    View offers
                </ButtonLink>
            )}

            <ol className="mt-8">
                {mockTimeline.map((e, i) => (
                    <li className="flex gap-4" key={e.title}>
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
