import { LegalDoc } from "@/components/layout/legal-doc";
import { site } from "@/lib/site";

export default function GrievancePage() {
    return (
        <LegalDoc eyebrow="Legal" title="Grievance Redressal" updated="8 September 2026">
            <p>
                If something is wrong — a consent you did not give, an offer that vanished, a rude call, a payment
                dispute we can route — start here so the complaint is logged.
            </p>
            <h2>Level 1 — Support</h2>
            <p>
                Email {site.supportEmail} or use dashboard Support. Mention your application ID and mobile. We aim to
                acknowledge within 3 working days and resolve within 15 working days where LoanSparrow controls the
                issue.
            </p>
            <h2>Level 2 — Nodal officer</h2>
            <p>
                {site.nodalOfficer.name}, {site.nodalOfficer.designation}
                <br />
                {site.grievanceEmail} · {site.nodalOfficer.phone}
                <br />
                {site.address.line1}, {site.address.line2}
            </p>
            <p>Escalate if Level 1 is missed or you are unsatisfied. Target: 15 additional working days.</p>
            <h2>Lender complaints</h2>
            <p>
                Sanction, EMI bounce, foreclosure quotes, and gold custody are the partner NBFC/bank’s responsibility.
                We forward the complaint and share their grievance contacts. Their TAT applies.
            </p>
            <h2>RBI Ombudsman</h2>
            <p>{site.rbiOmbudsman} File at cms.rbi.org.in. Keep our ticket number.</p>
        </LegalDoc>
    );
}
