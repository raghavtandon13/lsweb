"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  isValidEmail,
  isValidPan,
  isValidPincode,
  loadApply,
  saveApply,
  type EmploymentType,
} from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";

const PURPOSES = [
  { value: "medical", label: "Medical" },
  { value: "travel", label: "Travel" },
  { value: "education", label: "Education" },
  { value: "wedding", label: "Wedding" },
  { value: "home", label: "Home / renovation" },
  { value: "business", label: "Business" },
  { value: "other", label: "Other" },
];

function safeReturn(from: string | null) {
  if (!from || !from.startsWith("/apply")) return "/apply/consent";
  if (from.startsWith("/apply/details")) return "/apply/consent";
  return from;
}

export default function DetailsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from");
  const editing = Boolean(from);

  const [pincode, setPincode] = useState("");
  const [pan, setPan] = useState("");
  const [income, setIncome] = useState("");
  const [employment, setEmployment] = useState<EmploymentType>("salaried");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("other");
  const [hadCibil, setHadCibil] = useState(false);
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
    setEmail(s.email ?? "");
    setAmount(s.amount ?? "");
    setPurpose(s.purpose ?? "other");
    setHadCibil(Boolean(s.cibil));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Enter a valid email ID.");
      return;
    }
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
    if (!amount || Number(amount) < 5000) {
      setError("Enter the loan amount you need (minimum ₹5,000).");
      return;
    }
    if (!dob) {
      setError("Date of birth is required.");
      return;
    }
    const s = loadApply();
    if (!s) return;

    const panNext = pan.toUpperCase();
    const materialChanged =
      s.pincode !== pincode ||
      s.pan !== panNext ||
      s.income !== income ||
      s.employment !== employment ||
      s.dob !== dob ||
      s.amount !== amount;

    saveApply({
      ...s,
      pincode,
      pan: panNext,
      income,
      employment,
      dob,
      email: email.trim().toLowerCase(),
      amount,
      purpose,
      ...(materialChanged && s.cibil
        ? {
            cibil: undefined,
            cibilOtpVerified: false,
            consents: undefined,
            status: "draft" as const,
          }
        : {}),
    });
    trackFunnel(3, "profile_submitted", {
      employment_type: employment,
      income_bucket: Number(income) < 25000 ? "lt_25k" : Number(income) < 50000 ? "25k_50k" : "gt_50k",
      edited: editing,
    });

    if (materialChanged && s.cibil) {
      router.push("/apply/consent");
      return;
    }
    router.push(editing ? safeReturn(from) : "/apply/consent");
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
        {editing ? "Edit details" : "Step 3"}
      </p>
      <h1 className="mt-2 font-serif text-3xl text-navy">{editing ? "Update your details" : "Your details"}</h1>
      <p className="mt-2 text-sm text-muted">
        Email, PAN, pincode, income, amount needed and date of birth.
        {editing && hadCibil
          ? " Changing PAN, income, pincode, amount or employment re-runs CIBIL matching."
          : ""}
      </p>
      <div className="mt-8 space-y-5">
        <Field label="Email ID" hint="Offer copies and lender updates go here.">
          <input
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
        </Field>
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
        <Field label="Loan amount needed (₹)">
          <input
            className="input"
            inputMode="numeric"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            placeholder="50000"
          />
        </Field>
        <Field label="Purpose">
          <select className="input" value={purpose} onChange={(e) => setPurpose(e.target.value)}>
            {PURPOSES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
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
          {editing ? "Save details" : "Continue to CIBIL"}
        </Button>
      </div>
    </form>
  );
}
