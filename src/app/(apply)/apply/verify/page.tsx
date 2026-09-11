"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { trackFunnel } from "@/lib/analytics";
import { getDemoCustomerByMobile } from "@/lib/demo-customers";
import { maskMobile } from "@/lib/format";
import { loadApply, saveApply, saveAuthForMobile } from "@/lib/session";

export default function VerifyPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [mobile, setMobile] = useState("");

    useEffect(() => {
        const s = loadApply();
        if (!s?.mobile || !s.termsAccepted) {
            router.replace("/apply");
            return;
        }
        setMobile(s.mobile);
    }, [router]);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!/^\d{6}$/.test(otp)) {
            setError("Enter the 6-digit OTP.");
            return;
        }
        const s = loadApply();
        if (!s) return;
        const demo = getDemoCustomerByMobile(s.mobile);
        saveApply({ ...s, verified: true, demoCustomerId: demo?.id });
        saveAuthForMobile(s.mobile, demo?.name ?? s.name);
        trackFunnel(2, "otp_verified");
        router.push("/apply/details");
    }

    return (
        <form className="card p-5 sm:p-8" onSubmit={onSubmit}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 2</p>
            <h1 className="mt-2 font-serif text-3xl text-navy">Enter OTP</h1>
            <p className="mt-2 text-sm leading-6 text-muted">
                Sent to {mobile ? maskMobile(mobile) : "your mobile"}. For this demo, any 6 digits work.
            </p>
            <Field className="mt-8" label="OTP">
                <input
                    className="input tracking-[0.4em]"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    value={otp}
                />
            </Field>
            {error && <p className="mt-3 text-sm text-danger">{error}</p>}
            <Button className="mt-6 w-full" size="lg" type="submit">
                Verify
            </Button>
            <p className="mt-4 text-center text-sm text-muted">
                Wrong number?{" "}
                <button
                    className="font-semibold text-spark-gold hover:underline"
                    onClick={() => router.push("/apply")}
                    type="button"
                >
                    Edit mobile
                </button>
            </p>
        </form>
    );
}
