"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { FinanceBackdrop } from "@/components/brand/finance-backdrop";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { isValidMobile, saveAuth } from "@/lib/session";
import { track } from "@/lib/analytics";
import Link from "next/link";

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
    saveAuth({ mobile, loggedIn: true, name: "Riya Sharma" });
    track("login", { method: "otp" });
    router.push("/dashboard");
  }

  return (
    <div className="relative flex min-h-full flex-col items-center justify-center overflow-hidden bg-white px-5 py-16">
      <FinanceBackdrop />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
      <div className="flex w-full items-center justify-between">
        <Logo />
        <ThemeSwitcher />
      </div>
      <form
        onSubmit={step === "mobile" ? send : verify}
        className="card mt-10 w-full max-w-md p-8"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Customer login</p>
        <h1 className="mt-2 font-serif text-3xl text-navy">
          {step === "mobile" ? "Login with mobile OTP" : "Enter OTP"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {step === "mobile"
            ? "We send an OTP to your mobile. No password needed."
            : "For this demo, any 6 digits work."}
        </p>
        {step === "mobile" ? (
          <Field label="Mobile" className="mt-8">
            <input
              className="input"
              inputMode="numeric"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Field>
        ) : (
          <Field label="OTP" className="mt-8">
            <input
              className="input tracking-[0.4em]"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            />
          </Field>
        )}
        {error && <p className="mt-3 text-sm text-danger">{error}</p>}
        <Button type="submit" variant="gold" size="lg" className="mt-6 w-full">
          {step === "mobile" ? "Send OTP" : "Enter dashboard"}
        </Button>
        <p className="mt-5 text-center text-sm text-muted">
          Partner or DSA?{" "}
          <Link href="/partner-with-us" className="font-semibold text-gold-deep">
            Partner with us
          </Link>
        </p>
      </form>
      </div>
    </div>
  );
}
