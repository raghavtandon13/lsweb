"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ApiError, resendOtp, verifyOtp } from "@/lib/api";
import { trackFunnel } from "@/lib/analytics";
import { maskMobile } from "@/lib/format";
import { loadApply, saveApply, saveAuthForMobile } from "@/lib/session";

const OTP_LENGTH = 4;

export default function VerifyPage() {
    const router = useRouter();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [mobile, setMobile] = useState("");
    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        const s = loadApply();
        if (!s?.mobile || !s.termsAccepted) {
            router.replace("/apply");
            return;
        }
        setMobile(s.mobile);
    }, [router]);

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp)) {
            setError(`Enter the ${OTP_LENGTH}-digit OTP.`);
            return;
        }
        const s = loadApply();
        if (!s) return;
        setVerifying(true);
        setError("");
        try {
            const { token } = await verifyOtp(s.mobile, otp);
            saveApply({ ...s, verified: true });
            saveAuthForMobile(s.mobile, s.name, token);
            trackFunnel(2, "otp_verified");
            router.push("/apply/details");
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Could not verify OTP. Try again.");
        } finally {
            setVerifying(false);
        }
    }

    async function onResend() {
        setResending(true);
        setError("");
        try {
            await resendOtp(mobile);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Could not resend OTP.");
        } finally {
            setResending(false);
        }
    }

    return (
        <form className="card p-5 sm:p-8" onSubmit={onSubmit}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Step 2</p>
            <h1 className="mt-2 font-serif text-3xl text-navy">Enter OTP</h1>
            <p className="mt-2 text-sm leading-6 text-muted">Sent to {mobile ? maskMobile(mobile) : "your mobile"}.</p>
            <Field className="mt-8" label="OTP">
                <input
                    className="input tracking-[0.4em]"
                    inputMode="numeric"
                    maxLength={OTP_LENGTH}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))}
                    value={otp}
                />
            </Field>
            {error && <p className="mt-3 text-sm text-danger">{error}</p>}
            <Button className="mt-6 w-full" disabled={verifying} size="lg" type="submit">
                {verifying ? "Verifying…" : "Verify"}
            </Button>
            <div className="mt-4 flex items-center justify-between text-sm">
                <button
                    className="font-semibold text-spark-gold hover:underline"
                    onClick={() => router.push("/apply")}
                    type="button"
                >
                    Edit mobile
                </button>
                <button
                    className="font-semibold text-navy hover:underline disabled:opacity-50"
                    disabled={resending}
                    onClick={onResend}
                    type="button"
                >
                    {resending ? "Resending…" : "Resend OTP"}
                </button>
            </div>
        </form>
    );
}
