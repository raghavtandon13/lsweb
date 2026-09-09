"use client";

import { FormEvent, useState } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { track } from "@/lib/analytics";

export default function DsaRegisterPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    track("generate_lead", { lead_source: "dsa_register" });
    setSent(true);
  }

  return (
    <>
      <PageHero
        eyebrow="DSA"
        title="DSA registration"
        body="For agents who source loan applications. Lending partners should use NBFC registration from Partner with us."
      />
      <Container className="py-16">
        {sent ? (
          <p className="card mx-auto max-w-xl p-8 font-serif text-2xl text-navy">
            Registration received. We will contact you after review.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="card mx-auto max-w-xl space-y-5 p-8">
            <Field label="Full name">
              <input className="input" name="name" required />
            </Field>
            <Field label="PAN">
              <input className="input uppercase" name="pan" maxLength={10} required />
            </Field>
            <Field label="Mobile">
              <input className="input" name="mobile" required />
            </Field>
            <Field label="Email">
              <input className="input" type="email" name="email" required />
            </Field>
            <Field label="City / pincode">
              <input className="input" name="city" required />
            </Field>
            <Field label="GSTIN (optional)">
              <input className="input" name="gstin" />
            </Field>
            <Field label="Experience / current affiliation">
              <textarea className="input min-h-28" name="notes" />
            </Field>
            <Button type="submit" size="lg" className="w-full">
              Submit DSA registration
            </Button>
          </form>
        )}
      </Container>
    </>
  );
}
