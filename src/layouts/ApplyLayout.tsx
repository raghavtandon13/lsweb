import { Outlet } from "react-router-dom";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { FinanceBackdrop } from "@/components/brand/finance-backdrop";

const steps = [
  { href: "/apply", label: "Name & mobile" },
  { href: "/apply/verify", label: "OTP" },
  { href: "/apply/details", label: "Details" },
  { href: "/apply/consent", label: "Consent" },
  { href: "/apply/processing", label: "Offers" },
];

export default function ApplyLayout() {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-white">
      <FinanceBackdrop />
      <header className="relative z-10 border-b border-line bg-white/90">
        <div className="mx-auto flex h-16 max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Logo />
          <div className="flex items-center gap-3">
            <ThemeSwitcher />
            <Link href="/" className="text-sm text-muted hover:text-navy">
              Back to home
            </Link>
          </div>
        </div>
        <div className="mx-auto flex max-w-[1760px] gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-10">
          {steps.map((s, i) => (
            <div key={s.href} className="flex items-center gap-2 text-xs text-muted">
              <span className="whitespace-nowrap rounded-full border border-line bg-white px-3 py-1">{s.label}</span>
              {i < steps.length - 1 && <span className="text-line">/</span>}
            </div>
          ))}
        </div>
      </header>
      <main className="relative z-10 mx-auto w-full max-w-xl flex-1 px-4 py-10 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
