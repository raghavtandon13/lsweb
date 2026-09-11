"use client";

import { type FormEvent, useState } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { track } from "@/lib/analytics";
import { site } from "@/lib/site";

export default function ContactPage() {
    const [sent, setSent] = useState(false);

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        track("generate_lead", { lead_source: "contact" });
        setSent(true);
    }

    return (
        <>
            <PageHero
                body={`Email ${site.supportEmail} on working days. For a formal complaint, use Grievance Redressal.`}
                eyebrow="Contact"
                title="Contact us"
            />
            <Container className="grid gap-8 py-10 lg:grid-cols-12 lg:py-12">
                <form className="card space-y-5 p-5 sm:p-7 lg:col-span-7" onSubmit={onSubmit}>
                    {sent ? (
                        <p className="font-serif text-2xl text-navy">Thank you. We have received your message.</p>
                    ) : (
                        <>
                            <Field label="Name">
                                <input className="input" name="name" required />
                            </Field>
                            <Field label="Email">
                                <input className="input" name="email" required type="email" />
                            </Field>
                            <Field label="Mobile">
                                <input className="input" inputMode="numeric" name="mobile" required />
                            </Field>
                            <Field label="Topic">
                                <select className="input" defaultValue="application" name="topic">
                                    <option value="application">My application</option>
                                    <option value="offer">An offer / lender</option>
                                    <option value="partner">Partnership</option>
                                    <option value="other">Something else</option>
                                </select>
                            </Field>
                            <Field label="Message">
                                <textarea className="input min-h-32" name="message" required />
                            </Field>
                            <Button className="w-full sm:w-auto" size="lg" type="submit">
                                Send message
                            </Button>
                        </>
                    )}
                </form>
                <aside className="lg:col-span-5">
                    <div className="rounded-2xl border border-line bg-white p-5 sm:p-7">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Reach</p>
                        <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                            <li>Phone {site.phone}</li>
                            <li>Hello {site.email}</li>
                            <li>Support {site.supportEmail}</li>
                            <li>Grievance {site.grievanceEmail}</li>
                            <li>{site.hours}</li>
                            <li>
                                {site.address.line1}, {site.address.line2}
                            </li>
                        </ul>
                    </div>
                </aside>
            </Container>
        </>
    );
}
