import { mockProfile } from "@/lib/mock";
import { maskMobile, maskPan, inr } from "@/lib/format";

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
    <div className="mx-auto max-w-xl">
      <h1 className="font-serif text-4xl text-navy">Profile</h1>
      <p className="mt-2 text-sm text-muted">
        Identity fields that lenders already saw. Editing PAN will need a verified flow once the profile API exists.
      </p>
      <dl className="card mt-8 divide-y divide-line">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between px-6 py-4 text-sm">
            <dt className="text-muted">{k}</dt>
            <dd className="font-medium text-navy">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
