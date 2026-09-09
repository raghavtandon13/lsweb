"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ButtonLink } from "@/components/ui/button-link";

export default function SupportPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-serif text-4xl text-navy">Support</h1>
      <p className="mt-2 text-sm text-muted">
        Application questions land here. Complaints that need a statutory clock should go to Grievance Redressal.
      </p>
      {sent ? (
        <p className="card mt-8 p-6 font-serif text-2xl text-navy">
          Ticket captured on this device. The support API will give you a number.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="card mt-8 space-y-5 p-6">
          <Field label="Application ID (optional)">
            <input className="input" name="applicationId" placeholder="SU-…" />
          </Field>
          <Field label="Message">
            <textarea className="input min-h-32" name="message" required />
          </Field>
          <Button type="submit" size="lg">
            Send
          </Button>
        </form>
      )}
      <ButtonLink href="/grievance-redressal" variant="ghost" className="mt-4">
        Grievance redressal →
      </ButtonLink>
    </div>
  );
}
