export const site = {
    name: "LoanSparrow",
    legalName: "LoanSparrow Credit Private Limited",
    tagline: "Fast-track your loan approvals...",
    description:
        "LoanSparrow is a digital loan marketplace. Compare personal, gold, payday and business loans from partner NBFCs and check eligibility online.",
    url: "https://loansparrow.in",
    phone: "1800-120-7384",
    phoneHref: "tel:18001207384",
    email: "hello@loansparrow.in",
    supportEmail: "support@loansparrow.in",
    grievanceEmail: "grievance@loansparrow.in",
    hours: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    cin: "U65999MH2024PTC000000",
    address: {
        line1: "8th Floor, One BKC, G Block",
        line2: "Bandra Kurla Complex, Mumbai 400051",
        city: "Mumbai",
    },
    nodalOfficer: {
        name: "Ananya Mehta",
        designation: "Nodal Grievance Officer",
        email: "grievance@loansparrow.in",
        phone: "+91 22 6912 4400",
    },
    rbiOmbudsman:
        "If unresolved in 30 days, you may approach the RBI Ombudsman under the Reserve Bank – Integrated Ombudsman Scheme, 2021.",
};

export const nav = {
    loans: [
        { href: "/loans/payday", label: "Payday Loan", hint: "Salaries between cycles" },
        { href: "/loans/short-term-personal", label: "Short Term Personal Loan", hint: "1–12 months" },
        { href: "/loans/personal", label: "Personal Loan", hint: "Planned expenses" },
        { href: "/loans/gold", label: "Gold Loan", hint: "Against jewellery" },
        { href: "/loans/against-mutual-funds", label: "Loan Against Mutual Funds", hint: "Keep your SIPs invested" },
        { href: "/loans/against-fd", label: "Loan Against FD", hint: "Liquidity without breaking FD" },
        { href: "/loans/card-against-fd", label: "Card Against FD", hint: "A card, secured by deposit" },
        { href: "/loans/unsecured-business", label: "Unsecured Business Loan", hint: "Working capital" },
        { href: "/small-ticket-loans", label: "Small ticket loans", hint: "₹8K – ₹50K" },
    ],
    credit: [
        { href: "/credit-score", label: "Credit Score", hint: "Check your score" },
        { href: "/credit-report", label: "Credit Report", hint: "Accounts and payments" },
        { href: "/credit-health", label: "Credit Health", hint: "Improve your file" },
        { href: "/loans/credit-card", label: "Credit Cards", hint: "Partner bank and NBFC cards" },
        { href: "/emi-calculator", label: "EMI Calculator", hint: "Monthly EMI" },
    ],
    help: [
        { href: "/help", label: "How it works" },
        { href: "/help/faqs", label: "FAQs" },
        { href: "/help/contact", label: "Contact us" },
        { href: "/help/about", label: "About us" },
    ],
    partners: [
        { href: "/partner-with-us", label: "Partner with us" },
        { href: "/partners/register", label: "NBFC / Corporate" },
        { href: "/dsa/register", label: "DSA registration" },
    ],
    legal: [
        { href: "/privacy-policy", label: "Privacy Policy" },
        { href: "/terms", label: "Terms & Conditions" },
        { href: "/disclaimer", label: "Disclaimer" },
        { href: "/grievance-redressal", label: "Grievance Redressal" },
    ],
};

export const trustMarks = [
    "Partner NBFCs",
    "No extra fee to check",
    "Data encrypted",
    "Credit check only with consent",
];
