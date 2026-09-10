"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button-link";

type MenuItem = { href: string; label: string; hint?: string };

const sections: { id: string; label: string; items: MenuItem[] }[] = [
  { id: "loans", label: "Loans", items: nav.loans.map((p) => ({ href: p.href, label: p.label, hint: p.hint })) },
  { id: "credit", label: "Credit", items: nav.credit.map((t) => ({ href: t.href, label: t.label, hint: t.hint })) },
  { id: "help", label: "Help", items: nav.help.map((t) => ({ href: t.href, label: t.label })) },
  { id: "partners", label: "Partners", items: nav.partners.map((t) => ({ href: t.href, label: t.label })) },
  { id: "legal", label: "Legal", items: nav.legal.map((t) => ({ href: t.href, label: t.label })) },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>("loans");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-navy/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ivory shadow-lift">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <p className="font-serif text-2xl text-navy">Menu</p>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2">
          {sections.map((section) => {
            const isOpen = expanded === section.id;
            return (
              <div key={section.id} className="border-b border-line/80">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-3 py-4 text-left"
                  onClick={() => setExpanded(isOpen ? null : section.id)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.14em] text-gold-deep">
                    {section.label}
                  </span>
                  <ChevronDown className={cn("h-4 w-4 text-navy transition", isOpen && "rotate-180")} />
                </button>
                {isOpen && (
                  <ul className="space-y-1 pb-4">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block rounded-xl px-3 py-2.5 hover:bg-white"
                        >
                          <span className="block text-base font-medium text-navy">{item.label}</span>
                          {item.hint && (
                            <span className="text-[15px] text-ink">{item.hint}</span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-line p-5">
          <ButtonLink
            href="/credit-score"
            size="lg"
            className="w-full bg-spark-gold text-[#5c3d08] hover:bg-[#c48a10] hover:text-white"
            onClick={onClose}
          >
            Check credit score
          </ButtonLink>
          <ButtonLink href="/apply" variant="gold" size="lg" className="w-full" onClick={onClose}>
            Apply now
          </ButtonLink>
          <ButtonLink href="/login" variant="outline" size="lg" className="w-full" onClick={onClose}>
            Customer login
          </ButtonLink>
          <ButtonLink href="/help/contact" variant="navy" size="lg" className="w-full" onClick={onClose}>
            Contact us
          </ButtonLink>
          <ButtonLink href="/partner-with-us" variant="soft" size="lg" className="w-full" onClick={onClose}>
            Partner with us
          </ButtonLink>
        </div>
      </aside>
    </div>
  );
}
