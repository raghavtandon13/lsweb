import { LegalDoc } from "@/components/layout/legal-doc";
import { site } from "@/lib/site";

export default function TermsPage() {
  return (
    <LegalDoc eyebrow="Legal" title="Terms & Conditions" updated="8 September 2026">
      <p>
        By using LoanSparrow you agree to these terms with {site.legalName}. If you do not agree, do not use the website or
        start an application.
      </p>
      <h2>1. Marketplace, not lender</h2>
      <p>
        LoanSparrow displays products of partner banks and NBFCs. The credit facility, KFS, MITC, charges, and recovery are
        of the partner who sanctions the loan. LoanSparrow does not guarantee sanction, rate, or disbursal time.
      </p>
      <h2>2. Eligibility tools</h2>
      <p>
        Eligibility and EMI figures are indicative. A partner may ask for more documents, reduce the amount, or decline
        after VKYC. “No suitable offer” is a valid outcome.
      </p>
      <h2>3. Your responsibilities</h2>
      <p>
        Provide true information. Keep your mobile for OTPs. Do not share OTPs. You contract with the lender; you must
        read their agreement before e-sign.
      </p>
      <h2>4. Prohibited use</h2>
      <p>
        No scraping, reverse engineering of underwriting, impersonation, or applications for persons who have not
        consented. The site is intended for persons in India.
      </p>
      <h2>5. Intellectual property</h2>
      <p>LoanSparrow name, mark, and site content are owned by us or licensors. Partners own their marks.</p>
      <h2>6. Liability</h2>
      <p>
        To the extent permitted by law, LoanSparrow is not liable for lender decisions, bureau inaccuracies originating
        outside us, or downtime. Nothing here limits liability that cannot be limited under Indian law.
      </p>
      <h2>7. Governing law</h2>
      <p>Laws of India. Courts at Mumbai, subject to the RBI Ombudsman and other statutory forums.</p>
    </LegalDoc>
  );
}
