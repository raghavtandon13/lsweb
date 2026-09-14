"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ApiError, getMe, patchMe } from "@/lib/api";
import { trackFunnel } from "@/lib/analytics";
import {
    authToken,
    type EmploymentType,
    isValidEmail,
    isValidPan,
    isValidPincode,
    loadApply,
    saveApply,
} from "@/lib/session";

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
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const s = loadApply();
        const token = authToken();
        if (!s?.verified || !token) {
            router.replace("/apply");
            return;
        }

        // Local, in-progress edits win over what's saved — the saved profile only fills in
        // what this tab doesn't already have, so the user only has to touch what's wrong.
        setPincode(s.pincode ?? "");
        setPan(s.pan ?? "");
        setIncome(s.income ?? "");
        setEmployment(s.employment ?? "salaried");
        setDob(s.dob ?? "");
        setEmail(s.email ?? "");
        setAmount(s.amount ?? "");
        setPurpose(s.purpose ?? "other");
        setHadCibil(Boolean(s.cibil));

        getMe(token)
            .then((profile) => {
                if (!s.pincode && profile.pincode) setPincode(profile.pincode);
                if (!s.pan && profile.pan) setPan(profile.pan);
                if (!s.income && profile.income) setIncome(profile.income);
                if (!s.employment && profile.employment) setEmployment(profile.employment as EmploymentType);
                if (!s.dob && profile.dob) setDob(profile.dob);
                if (!s.email && profile.email) setEmail(profile.email);
            })
            .catch(() => {
                // Autofill is a convenience — a failed fetch just leaves the form blank.
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit(e: FormEvent) {
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
        const token = authToken();
        if (!s || !token) {
            router.replace("/apply");
            return;
        }

        const panNext = pan.toUpperCase();
        const emailNext = email.trim().toLowerCase();
        const materialChanged =
            s.pincode !== pincode ||
            s.pan !== panNext ||
            s.income !== income ||
            s.employment !== employment ||
            s.dob !== dob ||
            s.amount !== amount;

        setSaving(true);
        setError("");
        try {
            await patchMe(token, { email: emailNext, pan: panNext, pincode, income, employment, dob });
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Could not save your details. Try again.");
            setSaving(false);
            return;
        }
        setSaving(false);

        saveApply({
            ...s,
            pincode,
            pan: panNext,
            income,
            employment,
            dob,
            email: emailNext,
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
        <form className="card p-5 sm:p-8" onSubmit={onSubmit}>
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
                <Field hint="Offer copies and lender updates go here." label="Email ID">
                    <input
                        autoComplete="email"
                        className="input"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        type="email"
                        value={email}
                    />
                </Field>
                <Field label="PAN">
                    <input
                        className="input uppercase"
                        maxLength={10}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        value={pan}
                    />
                </Field>
                <Field label="Pincode">
                    <input
                        className="input"
                        inputMode="numeric"
                        maxLength={6}
                        onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        value={pincode}
                    />
                </Field>
                <Field label="Monthly income (₹)">
                    <input
                        className="input"
                        inputMode="numeric"
                        onChange={(e) => setIncome(e.target.value.replace(/\D/g, ""))}
                        value={income}
                    />
                </Field>
                <Field label="Loan amount needed (₹)">
                    <input
                        className="input"
                        inputMode="numeric"
                        onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
                        placeholder="50000"
                        value={amount}
                    />
                </Field>
                <Field label="Purpose">
                    <select className="input" onChange={(e) => setPurpose(e.target.value)} value={purpose}>
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
                        onChange={(e) => setEmployment(e.target.value as EmploymentType)}
                        value={employment}
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
                    <input className="input" onChange={(e) => setDob(e.target.value)} type="date" value={dob} />
                </Field>
                {error && <p className="text-sm text-danger">{error}</p>}
                <Button className="w-full" disabled={saving} size="lg" type="submit">
                    {saving ? "Saving…" : editing ? "Save details" : "Continue to CIBIL"}
                </Button>
            </div>
        </form>
    );
}
