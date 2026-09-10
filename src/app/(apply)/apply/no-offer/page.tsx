"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadApply } from "@/lib/session";
import { trackFunnel } from "@/lib/analytics";
import { ButtonLink } from "@/components/ui/button-link";
import { EditDetailsBar } from "@/components/apply/edit-details-bar";

export default function NoOfferPage() {
  const router = useRouter();

  useEffect(() => {
    const s = loadApply();
    if (s?.status !== "no_offer") router.replace("/apply");
    else trackFunnel(7, "no_offer_shown");
  }, [router]);

  return (
    <>
      <EditDetailsBar />
    <div className="card p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Outcome</p>
      <h1 className="mt-2 font-serif text-3xl text-navy">No offer available right now</h1>
      <p className="mt-4 text-sm leading-7 text-muted">
        Partner lenders could not price this profile. This can be due to income, pincode or employment type.
      </p>
      <p className="mt-4 text-sm leading-7 text-muted">
        You can try a gold loan, a card against FD, or improve credit health and apply again later.
      </p>
      <div className="mt-8 flex flex-col gap-3">
        <ButtonLink href="/loans/gold" className="w-full">
          See gold loans
        </ButtonLink>
        <ButtonLink href="/loans/card-against-fd" variant="outline" className="w-full">
          Card against FD
        </ButtonLink>
        <ButtonLink href="/credit-health" variant="ghost" className="w-full">
          Credit health guide
        </ButtonLink>
      </div>
    </div>
    </>
  );
}
