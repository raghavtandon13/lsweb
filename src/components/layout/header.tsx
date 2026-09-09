"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { nav } from "@/lib/site";
import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { cn } from "@/lib/cn";

function DesktopFlyout({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-1 text-base font-medium text-navy hover:text-gold-deep"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
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
      <div className="mx-auto flex h-[76px] max-w-[1760px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex">
          <DesktopFlyout label="Products">
            <div className="grid grid-cols-2 gap-1">
              {nav.products.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="rounded-xl px-3 py-2.5 hover:bg-ivory"
                >
                  <span className="block text-base font-medium text-navy">{p.label}</span>
                  <span className="text-sm text-ink">{p.hint}</span>
                </Link>
              ))}
            </div>
          </DesktopFlyout>
          <DesktopFlyout label="Tools">
            <div className="grid gap-1">
              {nav.tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-xl px-3 py-2.5 text-base font-medium text-navy hover:bg-ivory"
                >
                  {t.label}
                </Link>
              ))}
            </div>
          </DesktopFlyout>
          <Link href="/how-it-works" className="text-base font-medium text-navy hover:text-gold-deep">
            How it works
          </Link>
          <Link href="/partner-with-us" className="text-base font-medium text-navy hover:text-gold-deep">
            Partner with us
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <ButtonLink href="/credit-score" variant="soft" size="sm" className="sm:hidden">
            Credit score
          </ButtonLink>
          <ButtonLink href="/credit-score" variant="soft" size="sm" className="hidden sm:inline-flex">
            Check credit score
          </ButtonLink>
          <ButtonLink href="/login" variant="outline" size="sm" className="hidden sm:inline-flex">
            Login
          </ButtonLink>
          <ButtonLink href="/apply" variant="gold" size="sm" className="hidden sm:inline-flex">
            Check eligibility
          </ButtonLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white lg:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
