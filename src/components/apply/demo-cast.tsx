"use client";

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DEMO_CUSTOMERS_FILE, demoCustomers, startDemoJourney } from "@/lib/demo-customers";
import { loadApply } from "@/lib/session";
import { cn } from "@/lib/cn";

export function DemoCast() {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string | undefined>();

  useEffect(() => {
    setActive(loadApply()?.demoCustomerId);
  }, [location.pathname]);

  function pick(id: string) {
    const c = startDemoJourney(id);
    if (!c) return;
    setActive(id);
    navigate("/apply");
  }

  return (
    <div className="border-t border-line bg-white px-3 py-3 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted">
          Dummy users · JSON files in <span className="font-mono text-navy">{DEMO_CUSTOMERS_FILE}</span>
        </p>
        <p className="mt-0.5 text-[11px] text-muted">Pick a person — journey starts from name &amp; OTP like a real user.</p>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-0.5">
          {demoCustomers.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => pick(c.id)}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-left text-xs font-semibold",
                active === c.id ? "border-navy bg-navy text-white" : "border-line bg-ivory text-navy",
              )}
            >
              {c.name.split(" ")[0]} · {c.hasLoanOffer ? "Loan" : "Cure"}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
