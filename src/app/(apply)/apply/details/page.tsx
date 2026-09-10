"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  isValidPan,
  isValidPincode,
  loadApply,
  saveApply,
  type EmploymentType,
} from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";

export default function DetailsPage() {
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [pan, setPan] = useState("");
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState<EmploymentType>("salaried");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const s = loadApply();
    if (!s?.verified) {
      router.replace("/apply");
      return;
    }
    setPincode(s.pincode ?? "");
    setPan(s.pan ?? "");
    setIncome(s.income ?? "");
    setEmployment(s.employment ?? "salaried");
    setDob(s.dob ?? "");
    // Load saved draft once. Do not depend on `router` — a new object would wipe typing.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidPincode(pincode)) {
      setError("Enter a 6-digit pincode.");
      return;
    }
    if (!isValidPan(pan)) {
      setError("PAN should look like ABCDE1234F.");
      return;
    }
    if (!income || Number(income) < 1000) {
      setError("Enter monthly income.");
      return;
    }
    if (!dob) {
      setError("Date of birth is required.");
      return;
    }
    const s = loadApply();
    if (!s) return;
    saveApply({ ...s, pincode, pan: pan.toUpperCase(), income, employment, dob });
    trackFunnel(3, "profile_submitted", {
      employment_type: employment,
      income_bucket: Number(income) < 25000 ? "lt_25k" : Number(income) < 50000 ? "25k_50k" : "gt_50k",
    });
    router.push("/apply/consent");
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 3</p>
      <h1 className="mt-2 font-serif text-3xl text-navy">Your details</h1>
      <p className="mt-2 text-sm text-muted">PAN, pincode, income, work type and date of birth.</p>
      <div className="mt-8 space-y-5">
        <Field label="PAN">
          <input
            className="input uppercase"
            maxLength={10}
            value={pan}
            onChange={(e) => setPan(e.target.value.toUpperCase())}
            placeholder="ABCDE1234F"
          />
        </Field>
        <Field label="Pincode">
          <input
            className="input"
            inputMode="numeric"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
        </Field>
        <Field label="Monthly income (₹)">
          <input
            className="input"
            inputMode="numeric"
            value={income}
            onChange={(e) => setIncome(e.target.value.replace(/\D/g, ""))}
          />
        </Field>
        <Field label="Employment">
          <select
            className="input"
            value={employment}
            onChange={(e) => setEmployment(e.target.value as EmploymentType)}
          >
            <option value="salaried">Salaried</option>
            <option value="self_employed">Self-employed</option>
            <option value="business">Business / MSME</option>
            <option value="student">Student</option>
            <option value="homemaker">Homemaker</option>
            <option value="other">Other</option>
          </select>
        </Field>
        <Field label="Date of birth">
          <input className="input" type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
        </Field>
        {error && <p className="text-sm text-danger">{error}</p>}
        <Button type="submit" size="lg" className="w-full">
          Continue to consent
        </Button>
      </div>
    </form>
  );
}
