"use client";

import { type FormEvent, useState } from "react";
import { DashHead } from "@/components/dashboard/bits";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Field } from "@/components/ui/field";

export default function SupportPage() {
    const [sent, setSent] = useState(false);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        setSent(true);
    }

    return (
        <div className="max-w-xl">
            <DashHead
                body="Application questions land here. Statutory complaints go to Grievance Redressal."
                title="Support"
            />
            {sent ? (
                <p className="card mt-6 p-5 font-serif text-xl text-navy sm:p-6 sm:text-2xl">
                    Ticket captured on this device. The support API will give you a number.
                </p>
            ) : (
                <form className="card mt-6 space-y-5 p-5 sm:p-6" onSubmit={onSubmit}>
                    <Field label="Application ID (optional)">
                        <input className="input" name="applicationId" placeholder="SU-…" />
                    </Field>
                    <Field label="Message">
                        <textarea className="input min-h-32" name="message" required />
                    </Field>
                    <Button className="w-full" size="lg" type="submit">
                        Send
                    </Button>
                </form>
            )}
            <ButtonLink className="mt-4 w-full sm:w-auto" href="/grievance-redressal" size="md" variant="outline">
                Grievance redressal
            </ButtonLink>
        </div>
    );
}
