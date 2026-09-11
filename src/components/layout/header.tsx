"use client";

import { ChevronDown, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { ButtonLink } from "@/components/ui/button-link";
import { cn } from "@/lib/cn";
import { nav } from "@/lib/site";

function DesktopFlyout({ label, children }: { label: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                aria-expanded={open}
                className="inline-flex items-center gap-1 text-base font-medium text-navy hover:text-gold-deep"
                onClick={() => setOpen((v) => !v)}
                type="button"
            >
                {label}
                <ChevronDown className={cn("h-3.5 w-3.5 transition", open && "rotate-180")} />
            </button>
            {open && (
                <div className="absolute left-1/2 top-full z-40 w-[min(720px,calc(100vw-2rem))] -translate-x-1/2 pt-4">
                    <div className="card p-5">{children}</div>
                </div>
            )}
        </div>
    );
}

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-[1760px] items-center justify-between gap-2 px-3 sm:h-16 sm:px-6 lg:h-[76px] lg:px-8 xl:px-10">
                <Logo />

                <nav className="hidden items-center gap-5 xl:flex xl:gap-7">
                    <DesktopFlyout label="Loans">
                        <div className="grid grid-cols-2 gap-1">
                            {nav.loans.map((p) => (
                                <Link className="rounded-xl px-3 py-2.5 hover:bg-ivory" href={p.href} key={p.href}>
                                    <span className="block text-base font-medium text-navy">{p.label}</span>
                                    {p.hint && <span className="text-sm text-ink">{p.hint}</span>}
                                </Link>
                            ))}
                        </div>
                    </DesktopFlyout>
                    <DesktopFlyout label="Credit">
                        <div className="grid gap-1">
                            {nav.credit.map((t) => (
                                <Link className="rounded-xl px-3 py-2.5 hover:bg-ivory" href={t.href} key={t.href}>
                                    <span className="block text-base font-medium text-navy">{t.label}</span>
                                    {t.hint && <span className="text-sm text-ink">{t.hint}</span>}
                                </Link>
                            ))}
                        </div>
                    </DesktopFlyout>
                    <Link className="text-base font-medium text-navy hover:text-gold-deep" href="/partner-with-us">
                        Partner with us
                    </Link>
                    <Link className="text-base font-medium text-navy hover:text-gold-deep" href="/help">
                        Help
                    </Link>
                </nav>

                <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                    <ThemeSwitcher />
                    <div className="hidden items-center gap-2 xl:flex">
                        <ButtonLink
                            className="bg-spark-gold text-[#5c3d08] shadow-sm hover:bg-[#c48a10] hover:text-white"
                            href="/credit-score"
                            size="sm"
                        >
                            Check credit score
                        </ButtonLink>
                        <ButtonLink href="/login" size="sm" variant="outline">
                            Login
                        </ButtonLink>
                        <ButtonLink href="/apply" size="sm" variant="gold">
                            Apply now
                        </ButtonLink>
                    </div>
                    <button
                        aria-label="Open menu"
                        className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white sm:h-11 sm:w-11 xl:hidden"
                        onClick={() => setMobileOpen(true)}
                        type="button"
                    >
                        <Menu className="h-4 w-4" />
                    </button>
                </div>
            </div>
            <MobileMenu onClose={() => setMobileOpen(false)} open={mobileOpen} />
        </header>
    );
}
