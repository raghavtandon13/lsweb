import { mockProfile } from "@/lib/mock";
import { maskMobile, maskPan, inr } from "@/lib/format";
import { DashHead } from "@/components/dashboard/bits";

const rows = [
  ["Name", mockProfile.name],
  ["Mobile", maskMobile(mockProfile.mobile)],
  ["Email", mockProfile.email],
  ["PAN", maskPan(mockProfile.pan)],
  ["Date of birth", mockProfile.dob],
  ["Pincode", mockProfile.pincode],
  ["Employment", mockProfile.employment],
  ["Declared income", inr(mockProfile.income)],
];

export default function ProfilePage() {
  return (
    <div className="max-w-xl">
      <DashHead
        title="Profile"
        body="Identity fields lenders already saw. PAN edits will need a verified flow once the profile API exists."
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
