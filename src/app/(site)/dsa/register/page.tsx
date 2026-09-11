"use client";

import { type FormEvent, useState } from "react";
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
                body="For agents who source loan applications. Lending partners should use NBFC registration from Partner with us."
                eyebrow="DSA"
                title="DSA registration"
            />
            <Container className="py-10 lg:py-12">
                {sent ? (
                    <p className="card mx-auto max-w-xl p-8 font-serif text-2xl text-navy">
                        Registration received. We will contact you after review.
                    </p>
                ) : (
                    <form className="card mx-auto max-w-xl space-y-5 p-5 sm:p-8" onSubmit={onSubmit}>
                        <Field label="Full name">
                            <input className="input" name="name" required />
                        </Field>
                        <Field label="PAN">
                            <input className="input uppercase" maxLength={10} name="pan" required />
                        </Field>
                        <Field label="Mobile">
                            <input className="input" name="mobile" required />
                        </Field>
                        <Field label="Email">
                            <input className="input" name="email" required type="email" />
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
                        <Button className="w-full" size="lg" type="submit">
                            Submit DSA registration
                        </Button>
                    </form>
                )}
            </Container>
        </>
    );
}
