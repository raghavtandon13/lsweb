"use client";

import { FormEvent, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { Accordion } from "@/components/ui/accordion";
import { BtnRow } from "@/components/ui/btn-row";
import { Button } from "@/components/ui/button";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { Field } from "@/components/ui/field";
import { faqs } from "@/lib/faqs";
import { site } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const tabs = [
  { id: "how-it-works", label: "How it works", path: "/help" },
  { id: "faqs", label: "FAQs", path: "/help/faqs" },
  { id: "contact", label: "Contact us", path: "/help/contact" },
  { id: "about", label: "About us", path: "/help/about" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const copy: Record<TabId, { eyebrow: string; title: string; body: string }> = {
  "how-it-works": {
    eyebrow: "Help",
    title: "How it works",
    body: "Check eligibility in a few steps. Pause anytime and continue after login.",
  },
  faqs: {
    eyebrow: "Help",
    title: "FAQs",
    body: "Eligibility, offers, repayment and how LoanSparrow works with partner lenders.",
  },
  contact: {
    eyebrow: "Help",
    title: "Contact us",
    body: `Email ${site.supportEmail} on working days. For a formal complaint, use Grievance Redressal.`,
  },
  about: {
    eyebrow: "Help",
    title: "About us",
    body: `${site.legalName} helps you compare offers from partner banks and NBFCs. We are not the lender.`,
  },
};

const beats = [
  {
    t: "Enter name and mobile",
    d: "We send an OTP to confirm your number. No documents on this step. No credit check yet.",
  },
  {
    t: "Share basic details",
    d: "Email, PAN, pincode, monthly income, amount needed, purpose, employment and date of birth. You can edit these later.",
  },
  {
    t: "CIBIL OTP and consents",
    d: "A soft CIBIL OTP plus one-line checkboxes. It will not affect your score. WhatsApp is optional.",
  },
  {
    t: "See CIBIL and lenders",
    d: "Your score snapshot first, then eligible partner offers — or other options if none match.",
  },
  {
    t: "Complete KYC with the lender",
    d: "You sign with the NBFC or bank. EMIs are paid to that lender. LoanSparrow keeps your history.",
  },
];

const hues = [
  "text-spark-gold",
  "text-spark-mint",
  "text-spark-sky",
  "text-spark-coral",
  "text-spark-lilac",
];

function HowItWorksTab() {
  return (
    <>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {beats.map((b, i) => (
          <li key={b.t} className="rounded-2xl border border-line bg-white p-5">
            <p className={`font-serif text-2xl ${hues[i]}`}>{String(i + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 font-serif text-lg text-navy">{b.t}</h2>
            <p className="mt-1.5 text-sm leading-6 text-muted">{b.d}</p>
          </li>
        ))}
      </ol>
      <BtnRow className="mt-8">
        <ButtonLink href="/apply" size="md" className="w-full sm:w-auto">
          Check eligibility
        </ButtonLink>
        <ButtonLink href="/help/faqs" variant="outline" size="md" className="w-full sm:w-auto">
          FAQs
        </ButtonLink>
      </BtnRow>
    </>
  );
}

function FaqsTab() {
  return (
    <div className="space-y-8">
      {faqs.map((group) => (
        <section key={group.category}>
          <h2 className="mb-3 font-serif text-xl text-navy">{group.category}</h2>
          <Accordion items={group.items} />
        </section>
      ))}
    </div>
  );
}

function ContactTab() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    track("generate_lead", { lead_source: "contact" });
    setSent(true);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <form onSubmit={onSubmit} className="card space-y-5 p-5 sm:p-6 lg:col-span-7">
        {sent ? (
          <p className="font-serif text-2xl text-navy">Thank you. We have received your message.</p>
        ) : (
          <>
            <Field label="Name">
              <input className="input" name="name" required />
            </Field>
            <Field label="Email">
              <input className="input" type="email" name="email" required />
            </Field>
            <Field label="Mobile">
              <input className="input" name="mobile" inputMode="numeric" required />
            </Field>
            <Field label="Topic">
              <select className="input" name="topic" defaultValue="application">
                <option value="application">My application</option>
                <option value="offer">An offer / lender</option>
                <option value="partner">Partnership</option>
                <option value="other">Something else</option>
              </select>
            </Field>
            <Field label="Message">
              <textarea className="input min-h-32" name="message" required />
            </Field>
            <Button type="submit" size="lg" className="w-full sm:w-auto">
              Send message
            </Button>
          </>
        )}
      </form>
      <aside className="lg:col-span-5">
        <div className="rounded-2xl border border-line bg-white p-5 sm:p-6">
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
          <ButtonLink href="/grievance-redressal" variant="outline" size="sm" className="mt-5 w-full sm:w-auto">
            Grievance redressal
          </ButtonLink>
        </div>
      </aside>
    </div>
  );
}

function AboutTab() {
  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="prose-legal lg:col-span-7">
        <p>
          LoanSparrow lets you check eligibility for payday, personal, gold, FD, mutual fund, business loans and credit
          cards in one place. You see named offers before you continue with a lender.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>Collect basic details with your consent</li>
          <li>Match you with partner lender policies</li>
          <li>Show offers, or tell you if none are available</li>
          <li>Keep your application status in the dashboard</li>
        </ul>
        <h2>What we do not do</h2>
        <p>
          We do not ask you to send gold, cash or “processing” money to an individual. Insurance is optional. Any lender
          fee is shown on the offer before you accept.
        </p>
      </div>
      <aside className="h-fit rounded-2xl border border-line bg-white p-5 sm:p-6 lg:col-span-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-deep">Registered office</p>
        <h2 className="mt-2 font-serif text-2xl text-navy">{site.legalName}</h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          {site.address.line1}
          <br />
          {site.address.line2}
          <br />
          CIN {site.cin}
        </p>
        <p className="mt-5 text-sm text-muted">
          {site.email}
          <br />
          {site.phone}
          <br />
          {site.hours}
        </p>
      </aside>
    </div>
  );
}

export default function HelpPage() {
  const { tab } = useParams<{ tab?: string }>();
  const active: TabId =
    tab === "faqs" || tab === "contact" || tab === "about" || tab === "how-it-works" ? tab : "how-it-works";

  if (tab && tab !== "faqs" && tab !== "contact" && tab !== "about" && tab !== "how-it-works") {
    return <Navigate to="/help" replace />;
  }

  const hero = copy[active];

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} body={hero.body} />
      <Container className="py-6 lg:py-8">
        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const on = t.id === active || (active === "how-it-works" && t.path === "/help" && !tab);
            return (
              <Link
                key={t.id}
                href={t.path}
                className={cn(
                  "inline-flex min-h-10 shrink-0 items-center rounded-full border px-4 py-2 text-sm font-semibold",
                  on
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-white text-navy hover:border-spark-gold hover:bg-[#fff8e4]",
                )}
              >
                {t.label}
              </Link>
            );
          })}
        </div>
        <div className="pt-6 lg:pt-8">
          {active === "how-it-works" && <HowItWorksTab />}
          {active === "faqs" && <FaqsTab />}
          {active === "contact" && <ContactTab />}
          {active === "about" && <AboutTab />}
        </div>
      </Container>
    </>
  );
}
