"use client";

import { useEffect, useState } from "react";
import { maskMobile, maskPan, inr } from "@/lib/format";
import { DashHead } from "@/components/dashboard/bits";
import { sessionCustomer } from "@/lib/demo-customers";
import { employmentLabel, type EmploymentType } from "@/lib/session";

type Row = [string, string];

export default function ProfilePage() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    const { auth, demo, apply } = sessionCustomer();
    const d = demo?.details;
    const mobile = d?.mobile ?? apply?.mobile ?? auth?.mobile ?? "";
    const emp = (d?.employment ?? apply?.employment) as EmploymentType | undefined;
    const income = d?.income ?? apply?.income;
    setRows([
      ["Name", d?.name ?? apply?.name ?? auth?.name ?? "—"],
      ["Mobile", mobile ? maskMobile(mobile) : "—"],
      ["Email", d?.email ?? apply?.email ?? "—"],
      ["PAN", d?.pan ? maskPan(d.pan) : apply?.pan ? maskPan(apply.pan) : "—"],
      ["Date of birth", d?.dob ?? apply?.dob ?? "—"],
      ["Pincode", d?.pincode ?? apply?.pincode ?? "—"],
      ["Employment", emp ? employmentLabel[emp] : "—"],
      ["Declared income", income ? inr(Number(income)) : "—"],
    ]);
  }, []);

  return (
    <div className="max-w-xl">
      <DashHead
        title="Profile"
        body="Identity fields for this mobile. Logout clears the session so the next number starts as a new customer."
      />
      <dl className="card mt-6 divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex flex-col gap-0.5 px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted sm:text-sm sm:normal-case sm:tracking-normal">
              {k}
            </dt>
            <dd className="break-all text-sm font-medium text-navy sm:text-right">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
