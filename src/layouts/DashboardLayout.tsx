import { Outlet } from "react-router-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { FileText, Headset, Home, LogOut, Sparkles, UserRound } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { clearAuth, loadAuth } from "@/lib/session";
import { cn } from "@/lib/cn";

const links = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/applications", label: "My applications", icon: FileText },
  { href: "/dashboard/offers", label: "Available offers", icon: Sparkles },
  { href: "/dashboard/profile", label: "Profile", icon: UserRound },
  { href: "/dashboard/support", label: "Support", icon: Headset },
];

export default function DashboardLayout() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const auth = loadAuth();
    if (!auth?.loggedIn) router.replace("/login");
  }, [router]);

  return (
    <div className="flex min-h-full bg-ivory">
      <aside className="hidden w-64 shrink-0 border-r border-line bg-paper md:flex md:flex-col">
        <div className="flex items-center justify-between px-5 py-5">
          <Logo />
          <ThemeSwitcher />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm",
                  active ? "bg-navy text-white" : "text-navy/80 hover:bg-gold-wash",
                )}
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          className="m-4 inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted hover:text-navy"
          onClick={() => {
            clearAuth();
            router.push("/");
          }}
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-line bg-paper px-4 py-3 md:hidden">
          <Logo />
          <ThemeSwitcher />
        </header>
        <nav className="flex gap-2 overflow-x-auto border-b border-line bg-white px-3 py-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "whitespace-nowrap rounded-full px-3 py-1.5 text-xs",
                pathname === l.href ? "bg-navy text-white" : "bg-ivory text-navy",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1 px-4 py-8 sm:px-8 lg:px-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
