"use client";

import { type FormEvent, useState } from "react";
import { TERMS_REQUIRED_MESSAGE, TermsAccept } from "@/components/apply/terms-accept";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { track } from "@/lib/analytics";
import { isValidMobile } from "@/lib/session";

export function CreditScoreCheck() {
    const [mobile, setMobile] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState("");
    const [checked, setChecked] = useState(false);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        const m = mobile.replace(/\D/g, "").slice(-10);
        if (!isValidMobile(m)) {
            setError("Enter a valid 10-digit mobile number.");
            return;
        }
        if (!termsAccepted) {
            setError(TERMS_REQUIRED_MESSAGE);
            return;
        }
        setError("");
        setChecked(true);
        track("generate_lead", { lead_source: "credit_score_check" });
    }

    if (checked) {
        return (
            <div className="card p-5 sm:p-8">
                <p className="text-[11px] uppercase tracking-wider text-muted">Your score</p>
                <p className="mt-2 font-serif text-5xl text-navy sm:text-7xl">746</p>
                <p className="mt-2 text-sm text-sage">Good · illustrated demo</p>
                <div className="mt-8 h-2 overflow-hidden rounded-full bg-ivory">
                    <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-gold to-sage" />
                </div>
                <p className="mt-6 text-sm leading-7 text-muted">
                    Sample score for this mobile. Live bureau score will replace this once the credit API is connected.
                </p>
                <Button
                    className="mt-6 w-full sm:w-auto"
                    onClick={() => setChecked(false)}
                    type="button"
                    variant="outline"
                >
                    Check another number
                </Button>
            </div>
        );
    }

    return (
        <form className="card p-5 sm:p-8" onSubmit={onSubmit}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Free check</p>
            <h2 className="mt-2 font-serif text-3xl text-navy">Check your credit score</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
                Enter your mobile. We show a sample score here until the bureau API is live.
            </p>
            <Field className="mt-8" label="Mobile number">
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
                onChange={(next) => {
                    setTermsAccepted(next);
                    if (next) setError("");
                }}
            />
            {error && <p className="mt-3 text-sm text-danger">{error}</p>}
            <Button className="mt-6 w-full" disabled={!termsAccepted} size="lg" type="submit">
                Check my credit score
            </Button>
        </form>
    );
}
