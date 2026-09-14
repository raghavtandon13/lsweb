"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { FinanceBackdrop } from "@/components/brand/finance-backdrop";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ApiError, sendOtp, verifyOtp } from "@/lib/api";
import { track } from "@/lib/analytics";
import { isValidMobile, normaliseMobile, saveAuthForMobile } from "@/lib/session";

const OTP_LENGTH = 4;

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<"mobile" | "otp">("mobile");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [busy, setBusy] = useState(false);

    async function send(e: FormEvent) {
        e.preventDefault();
        const m = normaliseMobile(mobile);
        if (!isValidMobile(m)) {
            setError("Enter a valid mobile.");
            return;
        }
        setBusy(true);
        setError("");
        try {
            await sendOtp({ phone: m });
            setMobile(m);
            setStep("otp");
        } catch (err) {
            // Never confirm or deny whether this number is registered.
            setError(err instanceof ApiError ? err.message : "Could not send OTP. Try again.");
        } finally {
            setBusy(false);
        }
    }

    async function verify(e: FormEvent) {
        e.preventDefault();
        if (!new RegExp(`^\\d{${OTP_LENGTH}}$`).test(otp)) {
            setError(`Enter the ${OTP_LENGTH}-digit OTP.`);
            return;
        }
        setBusy(true);
        setError("");
        try {
            const { token } = await verifyOtp(mobile, otp);
            saveAuthForMobile(mobile, undefined, token);
            track("login", { method: "otp" });
            router.push("/dashboard");
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Incorrect or expired OTP.");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="relative flex min-h-full flex-col items-center justify-center overflow-x-clip bg-white px-4 py-10 sm:px-5 sm:py-16">
            <FinanceBackdrop />
            <div className="relative z-10 flex w-full max-w-md flex-col items-center">
                <div className="flex w-full items-center justify-between">
                    <Logo />
                    <ThemeSwitcher />
                </div>
                <form
                    className="card mt-8 w-full max-w-md p-5 sm:mt-10 sm:p-8"
                    onSubmit={step === "mobile" ? send : verify}
                >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                        Customer login
                    </p>
                    <h1 className="mt-2 font-serif text-3xl text-navy">
                        {step === "mobile" ? "Login with mobile OTP" : "Enter OTP"}
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        {step === "mobile" ? "We send an OTP to your mobile. No password needed." : "Sent to your mobile."}
                    </p>
                    {step === "mobile" ? (
                        <Field className="mt-8" label="Mobile">
                            <input
                                className="input"
                                inputMode="numeric"
                                onChange={(e) => setMobile(e.target.value)}
                                value={mobile}
                            />
                        </Field>
                    ) : (
                        <Field className="mt-8" label="OTP">
                            <input
                                className="input tracking-[0.4em]"
                                inputMode="numeric"
                                maxLength={OTP_LENGTH}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, OTP_LENGTH))}
                                value={otp}
                            />
                        </Field>
                    )}
                    {error && <p className="mt-3 text-sm text-danger">{error}</p>}
                    <Button className="mt-6 w-full" disabled={busy} size="lg" type="submit" variant="gold">
                        {busy ? "Please wait…" : step === "mobile" ? "Send OTP" : "Enter dashboard"}
                    </Button>
                    <p className="mt-5 text-center text-sm text-muted">
                        Partner or DSA?{" "}
                        <Link className="font-semibold text-gold-deep" href="/partner-with-us">
                            Partner with us
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
