"use client";

import { BadgeCheck, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { TERMS_REQUIRED_MESSAGE, TermsAccept } from "@/components/apply/terms-accept";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { track, trackFunnel } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { beginApplyLead } from "@/lib/demo-customers";
import { isValidMobile } from "@/lib/session";

export function QuickApply({ embedded = false }: { embedded?: boolean }) {
    const router = useRouter();
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [error, setError] = useState("");

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        const n = name.trim();
        const m = mobile.replace(/\D/g, "").slice(-10);
        if (n.length < 2) {
            setError("Enter your full name.");
            return;
        }
        if (!isValidMobile(m)) {
            setError("Enter a valid 10-digit mobile number.");
            return;
        }
        if (!termsAccepted) {
            setError(TERMS_REQUIRED_MESSAGE);
            return;
        }
        beginApplyLead({ name: n, mobile: m, termsAccepted: true });
        track("generate_lead", { lead_source: "home_quick_apply" });
        trackFunnel(1, "apply_start", { lead_source: "home_quick_apply" });
        router.push("/apply/verify");
    }

    return (
        <div
            className={cn(
                "overflow-hidden border border-line bg-white/95 shadow-lift backdrop-blur-sm",
                !embedded && "rounded-3xl",
            )}
        >
            <div className="h-1.5 bg-gradient-to-r from-spark-gold via-spark-mint to-navy" />
            <form className="p-5 sm:p-8" onSubmit={onSubmit}>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold-deep">Get your loan offer</p>
                <h2 className="mt-3 font-serif text-3xl text-navy">Start in 2 minutes</h2>
                <p className="mt-2 text-base text-ink">Enter your name and mobile. We send an OTP next.</p>

                <Field className="mt-7" label="Name">
                    <input
                        autoComplete="name"
                        className="input"
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full name"
                        value={name}
                    />
                </Field>

                <Field className="mt-4" label="Mobile number">
                    <div className="flex overflow-hidden rounded-[0.85rem] border border-line bg-white focus-within:border-gold focus-within:shadow-[0_0_0_4px_rgba(13,59,63,0.16)]">
                        <span className="grid place-items-center border-r border-line bg-ivory px-3 text-base font-semibold text-navy">
                            +91
                        </span>
                        <input
                            autoComplete="tel"
                            className="w-full bg-transparent px-3 py-3.5 text-base outline-none"
                            inputMode="numeric"
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="10-digit mobile"
                            value={mobile}
                        />
                    </div>
                </Field>

                <TermsAccept
                    checked={termsAccepted}
                    onChange={(next) => {
                        setTermsAccepted(next);
                        if (next) setError("");
                    }}
                />

                {error && <p className="mt-3 text-base text-danger">{error}</p>}

                <Button className="mt-6 w-full" disabled={!termsAccepted} size="lg" type="submit" variant="gold">
                    Get OTP & continue
                </Button>

                <div className="mt-5 flex items-center justify-center gap-5 text-[15px] text-navy">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="h-4 w-4 text-gold" /> Secure
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                        <BadgeCheck className="h-4 w-4 text-gold" /> Free to check
                    </span>
                </div>
            </form>
        </div>
    );
}
