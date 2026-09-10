"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { track } from "@/lib/analytics";

export default function PartnerRegisterPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    track("generate_lead", { lead_source: "partner_register" });
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="NBFC / Corporate"
        title="Lending partner registration"
        body="For banks, NBFCs and corporate affiliates. DSAs should use DSA registration from Partner with us."
      />
      <Container className="py-10 lg:py-12">
        {sent ? (
          <p className="card mx-auto max-w-xl p-8 font-serif text-2xl text-navy">
            Intake saved. We will contact you after review.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="card mx-auto max-w-xl space-y-5 p-5 sm:p-8">
            <Field label="Entity name">
              <input className="input" name="legalName" required />
            </Field>
            <Field label="Type">
              <select className="input" name="type" defaultValue="nbfc">
                <option value="nbfc">NBFC</option>
                <option value="bank">Bank</option>
                <option value="corporate">Corporate affiliate</option>
              </select>
            </Field>
            <Field label="RBI / registration no.">
              <input className="input" name="regNo" required />
            </Field>
            <Field label="Work email">
              <input className="input" type="email" name="email" required />
            </Field>
            <Field label="Mobile">
              <input className="input" name="mobile" required />
            </Field>
            <Field label="Cities / products of interest">
              <textarea className="input min-h-28" name="notes" />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Submit onboarding request
            </Button>
          </form>
        )}
      </Container>
    </>
  );
}
