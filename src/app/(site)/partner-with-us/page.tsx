import Link from "next/link";
import { ArrowRight, Briefcase, Building2, Handshake, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, SectionHeading } from "@/components/ui/container";

const paths = [
  {
    href: "/partners/register",
    icon: Building2,
    title: "NBFC / Corporate partner",
    body: "Banks, NBFCs and corporate affiliates who want to offer loans through LoanSparrow.",
    cta: "Register as partner",
  },
  {
    href: "/dsa/register",
    icon: Briefcase,
    title: "DSA / agent",
    body: "Direct selling agents who source loan applications. Approval is after compliance review.",
    cta: "Register as DSA",
  },
];

const perks = [
  {
    icon: Handshake,
    title: "One marketplace",
    body: "Customers already start with mobile and PAN. You receive matched applications.",
  },
  {
    icon: ShieldCheck,
    title: "Consent-first",
    body: "Bureau and data share happen only after the customer ticks consent.",
  },
];

export default function PartnerWithUsPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Partner with us"
        body="Lending partners and DSAs join from this page. Customer login stays separate."
      />
      <Container className="py-14 lg:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {paths.map((p) => (
            <article
              key={p.href}
              className="flex flex-col rounded-3xl border border-line bg-white p-8 shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-wash text-navy">
                <p.icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 font-serif text-3xl text-navy">{p.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{p.body}</p>
              <ButtonLink href={p.href} variant="gold" className="mt-8 w-fit">
                {p.cta} <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Why partner"
            title="Clear split: customers on one side, partners on the other"
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {perks.map((item) => (
              <article key={item.title} className="rounded-2xl border border-line bg-ivory p-6">
                <item.icon className="h-6 w-6 text-gold-deep" />
                <h3 className="mt-3 text-lg font-semibold text-navy">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <p className="mt-12 text-sm text-muted">
          Already a customer? Use{" "}
          <Link href="/login" className="font-semibold text-gold-deep">
            customer login
          </Link>{" "}
          with mobile OTP. Partner and DSA access is issued after your registration is approved.
        </p>
      </Container>
    </>
  );
}
