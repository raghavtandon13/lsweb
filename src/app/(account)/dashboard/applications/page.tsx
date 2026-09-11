"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { mockApplications } from "@/lib/mock";
import { inr } from "@/lib/format";
import { sessionHasLoanOffers } from "@/lib/demo-customers";
import { DashHead, StatusPill } from "@/components/dashboard/bits";
import { ButtonLink } from "@/components/ui/button-link";

export default function ApplicationsPage() {
  const [hasOffers, setHasOffers] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setHasOffers(sessionHasLoanOffers());
    setReady(true);
  }, []);

  const apps = hasOffers ? mockApplications : [];

  return (
    <div>
      <DashHead
        title="My applications"
        body="Every file opened for this mobile, including closed ones."
      />

      {ready && apps.length === 0 && (
        <div className="card mt-6 p-5 sm:p-6">
          <p className="font-serif text-xl text-navy">No applications on this mobile</p>
          <p className="mt-2 text-sm leading-6 text-muted">
            Logout clears the previous customer. Start a new check with a different number, or build credit first.
          </p>
          <ButtonLink href="/apply" size="md" className="mt-4 w-full sm:w-auto">
            Check eligibility
          </ButtonLink>
        </div>
      )}

      <div className="mt-6 space-y-3 md:hidden">
        {apps.map((a) => (
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

      {apps.length > 0 && (
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
              {apps.map((a) => (
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
      )}
    </div>
  );
}
