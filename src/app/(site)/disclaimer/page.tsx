import { LegalDoc } from "@/components/layout/legal-doc";
import { site } from "@/lib/site";

export default function DisclaimerPage() {
  return (
    <LegalDoc eyebrow="Legal" title="Disclaimer" updated="8 September 2026">
      <p>
        LoanSparrow is a technology marketplace operated by {site.legalName}. We are not a bank. We are not, on this website,
        the originator of the loans, gold facilities, or cards described.
      </p>
      <h2>Rates and examples</h2>
      <p>
        APR, processing fees, LTV, and “from” rates are illustrative and can change with bureau, income, scheme, and
        partner policy. Always rely on the Key Fact Statement of the lender you accept.
      </p>
      <h2>No advice</h2>
      <p>
        Content on credit scores, small-ticket loans, and EMI is educational. It is not investment, tax, or legal advice.
        A personal loan may be a poor substitute for an emergency fund; a payday loan is expensive if rolled.
      </p>
      <h2>Third parties</h2>
      <p>
        Partner sites, VKYC, payment, and bureau services have their own terms. LoanSparrow is not responsible for their
        outages or content.
      </p>
      <h2>Past performance</h2>
      <p>Customer stories are illustrative. Your outcome will differ.</p>
    </LegalDoc>
  );
}
