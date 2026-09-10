import Link from "next/link";
import { mockApplications } from "@/lib/mock";
import { inr } from "@/lib/format";
import { DashHead, StatusPill } from "@/components/dashboard/bits";

export default function ApplicationsPage() {
  return (
    <div>
      <DashHead
        title="My applications"
        body="Every file opened for this mobile, including closed ones."
      />

      <div className="mt-6 space-y-3 md:hidden">
        {mockApplications.map((a) => (
          <Link
            key={a.id}
            href={`/dashboard/applications/${a.id}`}
            className="block rounded-2xl border border-line bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-medium text-navy">{a.product}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {a.id} · {inr(a.amount)}
                </p>
              </div>
              <StatusPill status={a.status} />
            </div>
            <p className="mt-2 text-xs text-muted">{a.updated}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 hidden overflow-x-auto rounded-2xl border border-line bg-white md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-ivory text-[11px] uppercase tracking-wider text-muted">
            <tr>
              {["ID", "Product", "Amount", "Status", "Updated"].map((h) => (
                <th key={h} className="px-5 py-3 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((a) => (
              <tr key={a.id} className="border-t border-line">
                <td className="px-5 py-3.5">
                  <Link
                    href={`/dashboard/applications/${a.id}`}
                    className="font-medium text-navy underline-offset-2 hover:underline"
                  >
                    {a.id}
                  </Link>
                </td>
                <td className="px-5 py-3.5 text-navy">{a.product}</td>
                <td className="px-5 py-3.5">{inr(a.amount)}</td>
                <td className="px-5 py-3.5">
                  <StatusPill status={a.status} />
                </td>
                <td className="px-5 py-3.5 text-muted">{a.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
