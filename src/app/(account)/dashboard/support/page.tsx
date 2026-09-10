"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { ButtonLink } from "@/components/ui/button-link";
import { DashHead } from "@/components/dashboard/bits";

export default function SupportPage() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className="max-w-xl">
      <DashHead
        title="Support"
        body="Application questions land here. Statutory complaints go to Grievance Redressal."
      />
      {sent ? (
        <p className="card mt-6 p-5 font-serif text-xl text-navy sm:p-6 sm:text-2xl">
          Ticket captured on this device. The support API will give you a number.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="card mt-6 space-y-5 p-5 sm:p-6">
          <Field label="Application ID (optional)">
            <input className="input" name="applicationId" placeholder="SU-…" />
          </Field>
          <Field label="Message">
            <textarea className="input min-h-32" name="message" required />
          </Field>
          <Button type="submit" size="lg" className="w-full">
            Send
          </Button>
        </form>
      )}
      <ButtonLink href="/grievance-redressal" variant="outline" size="md" className="mt-4 w-full sm:w-auto">
        Grievance redressal
      </ButtonLink>
    </div>
  );
}
