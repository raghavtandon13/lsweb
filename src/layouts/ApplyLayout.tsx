"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Outlet } from "react-router-dom";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { cn } from "@/lib/cn";

const steps = [
    { href: "/apply", label: "Name" },
    { href: "/apply/verify", label: "OTP" },
    { href: "/apply/details", label: "Details" },
    { href: "/apply/consent", label: "CIBIL OTP" },
    { href: "/apply/cibil", label: "Score & lenders" },
];

function stepIndex(path: string) {
    if (
        path.startsWith("/apply/cibil") ||
        path.startsWith("/apply/offers") ||
        path.startsWith("/apply/no-offer") ||
        path.startsWith("/apply/addons") ||
        path.startsWith("/apply/demo")
    )
        return 4;
    if (path.startsWith("/apply/processing")) return 4;
    const i = steps.findIndex((s) => s.href === path);
    return i < 0 ? 0 : i;
}

export default function ApplyLayout() {
    const path = usePathname();
    const current = stepIndex(path);
    const wide =
        path.startsWith("/apply/cibil") ||
        path.startsWith("/apply/offers") ||
        path.startsWith("/apply/no-offer") ||
        path.startsWith("/apply/addons") ||
        path.startsWith("/apply/demo");

    return (
        <div className="apply-journey flex min-h-full flex-col bg-ivory">
            <header className="border-b border-line bg-white">
                <div className="mx-auto flex h-14 max-w-[1760px] items-center justify-between gap-2 px-3 sm:h-16 sm:px-6 lg:px-10">
                    <Logo />
                    <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                        <Link className="text-xs font-semibold text-spark-gold" href="/apply/demo">
                            Dummy users
                        </Link>
                        <ThemeSwitcher />
                        <Link className="text-xs text-muted hover:text-navy sm:text-sm" href="/">
                            <span className="sm:hidden">Home</span>
                            <span className="hidden sm:inline">Back to home</span>
                        </Link>
                    </div>
                </div>
                <div className="mx-auto flex max-w-[1760px] gap-2 overflow-x-auto px-4 pb-3 sm:px-6 lg:px-10">
                    {steps.map((s, i) => (
                        <div className="flex items-center gap-2 text-xs" key={s.href}>
                            <span
                                className={cn(
                                    "whitespace-nowrap rounded-full border px-3 py-1",
                                    i === current
                                        ? "border-navy bg-navy text-white"
                                        : i < current
                                          ? "border-line bg-ivory text-navy"
                                          : "border-line bg-white text-muted",
                                )}
                            >
                                {s.label}
                            </span>
                            {i < steps.length - 1 && <span className="text-line">/</span>}
                        </div>
                    ))}
                </div>
            </header>
            <main
                className={cn(
                    "mx-auto w-full min-w-0 flex-1 px-3 py-4 sm:px-6 sm:py-8",
                    wide ? "max-w-2xl" : "max-w-xl",
                )}
            >
                <Outlet />
            </main>
        </div>
    );
}
