"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { FinanceBackdrop } from "@/components/brand/finance-backdrop";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { track } from "@/lib/analytics";
import { getDemoCustomerByMobile, hydrateDemoSession } from "@/lib/demo-customers";
import { isValidMobile, saveAuthForMobile } from "@/lib/session";

export default function LoginPage() {
    const router = useRouter();
    const [step, setStep] = useState<"mobile" | "otp">("mobile");
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");

    function send(e: FormEvent) {
        e.preventDefault();
        const m = mobile.replace(/\D/g, "").slice(-10);
        if (!isValidMobile(m)) {
            setError("Enter a valid mobile.");
            return;
        }
        setMobile(m);
        setError("");
        setStep("otp");
    }

    function verify(e: FormEvent) {
        e.preventDefault();
        if (!/^\d{6}$/.test(otp)) {
            setError("Enter 6-digit OTP.");
            return;
        }
        const demo = getDemoCustomerByMobile(mobile);
        saveAuthForMobile(mobile, demo?.name ?? "Customer");
        if (demo) hydrateDemoSession(mobile);
        track("login", { method: "otp" });
        router.push("/dashboard");
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
                        {step === "mobile"
                            ? "We send an OTP to your mobile. No password needed."
                            : "For this demo, any 6 digits work. Dummy users load by mobile number."}
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
                                maxLength={6}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                value={otp}
                            />
                        </Field>
                    )}
                    {error && <p className="mt-3 text-sm text-danger">{error}</p>}
                    <Button className="mt-6 w-full" size="lg" type="submit" variant="gold">
                        {step === "mobile" ? "Send OTP" : "Enter dashboard"}
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
