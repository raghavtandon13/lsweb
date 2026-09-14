"use client";

import { Headset, Home, LogOut, Sparkles, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { cn } from "@/lib/cn";
import { clearSession, loadAuth } from "@/lib/session";

const links = [
    { href: "/dashboard", label: "Home", icon: Home },
    { href: "/dashboard/offers", label: "Offers", icon: Sparkles },
    { href: "/dashboard/profile", label: "Profile", icon: UserRound },
    { href: "/dashboard/support", label: "Support", icon: Headset },
];

function isActive(pathname: string, href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardLayout() {
    const pathname = usePathname();
    const router = useRouter();
    const [name, setName] = useState("Customer");

    useEffect(() => {
        const auth = loadAuth();
        if (!auth?.loggedIn) {
            router.replace("/login");
            return;
        }
        if (auth.name) setName(auth.name.split(" ")[0]);
    }, [router]);

    function logout() {
        clearSession();
        router.push("/");
    }

    return (
        <div className="flex min-h-dvh bg-ivory">
            <aside className="hidden w-[240px] shrink-0 flex-col border-r border-line bg-white lg:flex">
                <div className="flex h-14 items-center justify-between gap-2 border-b border-line px-4">
                    <Logo compact />
                    <ThemeSwitcher />
                </div>
                <p className="px-5 pt-5 text-xs font-medium text-muted">Hi, {name}</p>
                <nav className="mt-3 flex-1 space-y-1 px-3">
                    {links.map((l) => {
                        const active = isActive(pathname, l.href);
                        return (
                            <Link
                                className={cn(
                                    "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium",
                                    active ? "bg-navy text-white" : "text-navy hover:bg-gold-wash",
                                )}
                                href={l.href}
                                key={l.href}
                            >
                                <l.icon className="h-4 w-4 shrink-0" />
                                {l.label}
                            </Link>
                        );
                    })}
                </nav>
                <button
                    className="m-4 inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted hover:bg-ivory hover:text-navy"
                    onClick={logout}
                    type="button"
                >
                    <LogOut className="h-4 w-4" /> Log out
                </button>
            </aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-14 items-center gap-2 border-b border-line bg-white px-3 lg:hidden">
                    <Logo compact />
                    <div className="ml-auto flex items-center gap-1.5">
                        <ThemeSwitcher />
                        <button
                            aria-label="Log out"
                            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
                            onClick={logout}
                            type="button"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </header>
                <nav className="flex gap-2 overflow-x-auto border-b border-line bg-white px-3 py-2 lg:hidden">
                    {links.map((l) => (
                        <Link
                            className={cn(
                                "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium",
                                isActive(pathname, l.href) ? "bg-navy text-white" : "bg-ivory text-navy",
                            )}
                            href={l.href}
                            key={l.href}
                        >
                            {l.label}
                        </Link>
                    ))}
                </nav>
                <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
