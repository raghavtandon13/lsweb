import Link from "next/link";
import { mockApplications } from "@/lib/mock";
import { inr } from "@/lib/format";

export default function ApplicationsPage() {
  return (
    <div>
      <h1 className="font-serif text-4xl text-navy">My applications</h1>
      <p className="mt-2 text-sm text-muted">Every file we opened for this mobile, including closed ones.</p>
      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-left text-sm">
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
                <td className="px-5 py-4">
                  <Link href={`/dashboard/applications/${a.id}`} className="font-medium text-navy underline-offset-2 hover:underline">
                    {a.id}
                  </Link>
                </td>
                <td className="px-5 py-4">{a.product}</td>
                <td className="px-5 py-4">{inr(a.amount)}</td>
                <td className="px-5 py-4">{a.status}</td>
                <td className="px-5 py-4 text-muted">{a.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
