import { LegalDoc } from "@/components/layout/legal-doc";
import { site } from "@/lib/site";

export default function PrivacyPage() {
    return (
        <LegalDoc eyebrow="Legal" title="Privacy Policy" updated="8 September 2026">
            <p>
                This policy explains how {site.legalName} (“LoanSparrow”, “we”) handles personal data when you use the
                website, application journey, dashboard, partner forms, and related support channels.
            </p>
            <h2>1. What we collect</h2>
            <ul>
                <li>Identity: name, PAN, date of birth, photographs / liveness as required by lenders</li>
                <li>Contact: mobile, email, address, pincode</li>
                <li>
                    Financial: declared income, employment type, banking and GST artefacts you upload or fetch via
                    Account Aggregator
                </li>
                <li>Bureau and CKYC data after explicit consent</li>
                <li>Device, logs, and cookies needed to run the site and prevent fraud</li>
            </ul>
            <h2>2. Why we collect it</h2>
            <p>
                To create and progress loan applications, match you to partner lenders, operate your account, detect
                fraud, meet KYC/AML and IT Act / DPDP obligations, and respond to grievances.
            </p>
            <h2>3. Sharing</h2>
            <p>
                We share data with partner banks/NBFCs you apply to, credit bureaus, KYC / VKYC / AA / payment
                infrastructure, and professional advisers or authorities when law requires. We do not sell personal
                data.
            </p>
            <h2>4. Retention</h2>
            <p>
                Application and KYC artefacts are retained as required by lending partners and applicable law (typically
                years, not days). You may request access or correction at {site.grievanceEmail}.
            </p>
            <h2>5. Cookies</h2>
            <p>
                Essential cookies keep you logged in and remember an in-progress application. Analytics cookies, if
                enabled, are used in aggregate. You can block non-essential cookies in the browser.
            </p>
            <h2>6. Contact</h2>
            <p>
                Privacy requests: {site.email}. Grievances: {site.nodalOfficer.name}, {site.nodalOfficer.designation},{" "}
                {site.grievanceEmail}.
            </p>
        </LegalDoc>
    );
}
