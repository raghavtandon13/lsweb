"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { TERMS_REQUIRED_MESSAGE, TermsAccept } from "@/components/apply/terms-accept";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ApiError, sendOtp } from "@/lib/api";
import { track, trackFunnel } from "@/lib/analytics";
import { isValidMobile, loadApply, loadAuth, normaliseMobile, saveApply } from "@/lib/session";

export default function ApplyStartPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);

    useEffect(() => {
        const existing = loadApply();
        if (existing?.mobile) {
            setName(existing.name ?? "");
            setMobile(existing.mobile);
            if (existing.termsAccepted) setTermsAccepted(true);
            return;
        }
        const auth = loadAuth();
        if (auth?.loggedIn && auth.mobile) {
            setMobile(auth.mobile);
            setName(auth.name ?? "");
        }
    }, []);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        const n = name.trim();
        const m = normaliseMobile(mobile);
        if (n.length < 2) {
            setError("Enter your full name.");
            return;
        }
        if (!isValidMobile(m)) {
            setError("Enter a valid 10-digit Indian mobile.");
            return;
        }
        if (!termsAccepted) {
            setError(TERMS_REQUIRED_MESSAGE);
            return;
        }
        setSending(true);
        setError("");
        try {
            await sendOtp({ phone: m, name: n, utmSource: "loansparrow_web" });
            const existing = loadApply();
            const base = existing && normaliseMobile(existing.mobile) === m ? existing : {};
            saveApply({
                ...base,
                name: n,
                mobile: m,
                otpSentAt: new Date().toISOString(),
                termsAccepted: true,
                verified: false,
                status: "draft",
            });
            track("generate_lead", { lead_source: "apply_form" });
            trackFunnel(1, "apply_start", { lead_source: "apply_form" });
            router.push("/apply/verify");
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Could not send OTP. Try again.");
        } finally {
            setSending(false);
        }
    }

    return (
        <form className="card p-5 sm:p-8" onSubmit={onSubmit}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 1</p>
            <h1 className="mt-2 font-serif text-3xl text-navy">Enter name and mobile</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
                We will send an OTP to this number. No credit check on this step.
            </p>
            <div className="mt-8 space-y-5">
                <Field label="Name">
                    <input
                        autoComplete="name"
                        className="input"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name (as per PAN)"
                        value={name}
                    />
                </Field>
                <Field hint="OTP will be sent here." label="Mobile number">
                    <input
                        autoComplete="tel"
                        className="input"
                        inputMode="numeric"
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="10-digit mobile"
                        value={mobile}
                    />
                </Field>
                <TermsAccept
                    checked={termsAccepted}
                    className="mt-0"
                    onChange={(next) => {
                        setTermsAccepted(next);
                        if (next) setError("");
                    }}
                />
                {error && <p className="text-sm text-danger">{error}</p>}
                <Button className="w-full" disabled={!termsAccepted || sending} size="lg" type="submit">
                    {sending ? "Sending…" : "Send OTP"}
                </Button>
            </div>
        </form>
    );
}
