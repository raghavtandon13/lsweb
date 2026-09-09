export type Product = {
  slug: string;
  name: string;
  short: string;
  eyebrow: string;
  headline: string;
  summary: string;
  amountMin: number;
  amountMax: number;
  tenure: string;
  rateFrom: string;
  disbursal: string;
  highlights: string[];
  suitedFor: string[];
  eligibility: string[];
  documents: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  caution: string;
};

export const products: Product[] = [
  {
    slug: "payday",
    name: "Payday Loan",
    short: "Cash before salary. ₹5,000 to ₹50,000.",
    eyebrow: "7 – 45 days",
    headline: "Payday loan",
    summary:
      "Short-term loan until your salary is credited. Apply online and get offers from partner NBFCs.",
    amountMin: 5_000,
    amountMax: 50_000,
    tenure: "7 – 45 days",
    rateFrom: "From 1.5% per month*",
    disbursal: "As soon as same day",
    highlights: [
      "Amounts that match a grocery bill, not a car",
      "Repay on or just after salary date",
      "Fully digital KYC with partner lenders",
      "No collateral, no guarantor",
    ],
    suitedFor: [
      "Salaried professionals between pay cycles",
      "Medical or travel spikes under ₹50,000",
      "Borrowers who want a closed-end product, not a revolving line",
    ],
    eligibility: [
      "Indian resident, age 21–55",
      "Salaried with a bank account in your name",
      "Valid PAN and mobile number",
      "Minimum monthly net pay typically ₹18,000 (lender-specific)",
    ],
    documents: [
      "PAN and Aadhaar (OTP / VKYC as required by lender)",
      "Latest salary credit or payslip",
      "Selfie / liveness check",
    ],
    steps: [
      { title: "Tell us the amount and payday", body: "A 2-minute form. No branch visit." },
      { title: "See only offers that fit", body: "We suppress lenders who will not price this ticket." },
      { title: "e-KYC with the lender", body: "You complete KYC on the partner’s regulated journey." },
      { title: "Repay on the due date", body: "Auto-debit mandate where the lender requires it." },
    ],
    faqs: [
      {
        q: "Is a payday loan the same as a personal loan?",
        a: "No. Tenor is days, not years, and the ticket is smaller. Interest is typically quoted monthly. Always compare APR and total payable, not just the headline rate.",
      },
      {
        q: "Will this show on my bureau?",
        a: "Most partner lenders report to one or more credit bureaus. On-time closure helps; delayed repayment can hurt your score.",
      },
    ],
    caution:
      "Payday products are expensive if rolled over. Borrow only what you can repay from the next salary credit.",
  },
  {
    slug: "short-term-personal",
    name: "Short Term Personal Loan",
    short: "₹10,000 to ₹2 lakh. Close within 12 months.",
    eyebrow: "1 – 12 months",
    headline: "Short term personal loan",
    summary:
      "For expenses you will repay within a year — medical, travel, gadgets or a small event.",
    amountMin: 10_000,
    amountMax: 2_00_000,
    tenure: "1 – 12 months",
    rateFrom: "From 1.2% per month*",
    disbursal: "Typically 24–72 hours",
    highlights: [
      "Fixed EMI, known closing date",
      "Part-prepayment on most partner books",
      "Ticket sizes that banks often ignore",
      "Digital journey end to end",
    ],
    suitedFor: [
      "Salaried and self-employed with 6+ months of banking",
      "Borrowers who want sub-12-month closure",
      "Top-up needs that should not sit on a credit card",
    ],
    eligibility: [
      "Age 21–58, Indian resident",
      "Minimum monthly income typically ₹20,000",
      "Stable employment or 2+ years in business",
      "Cleanish bureau — thin files are considered by select partners",
    ],
    documents: [
      "PAN, Aadhaar",
      "Bank statements (3–6 months) via AA or upload",
      "Employment / GST proof where asked",
    ],
    steps: [
      { title: "Share income and pincode", body: "Eligibility is geography- and bureau-sensitive." },
      { title: "Pick a tenor you can actually finish", body: "We show total interest, not just EMI." },
      { title: "Complete lender KYC", body: "VKYC or biometric as mandated." },
      { title: "Disbursal to your bank account", body: "Same account that received salary / business credits." },
    ],
    faqs: [
      {
        q: "Can I close early?",
        a: "Most partners allow foreclosure after a lock-in (often 1–3 EMIs). Foreclosure fees, if any, are shown on the offer card before you accept.",
      },
    ],
    caution:
      "Shorter tenors mean higher EMIs. Check the EMI against your surplus, not your gross salary.",
  },
  {
    slug: "personal",
    name: "Personal Loan",
    short: "₹50,000 to ₹25 lakh. No collateral.",
    eyebrow: "12 – 60 months",
    headline: "Personal loan",
    summary:
      "Unsecured personal loan for wedding, education, home needs or balance transfer. Compare interest, fees and tenure before you accept.",
    amountMin: 50_000,
    amountMax: 25_00_000,
    tenure: "12 – 60 months",
    rateFrom: "From 10.99% p.a.*",
    disbursal: "2–5 working days after KYC",
    highlights: [
      "Multi-lender offers in one sitting",
      "Balance-transfer options on select books",
      "No collateral",
      "Insurance add-ons are optional — never bundled by default on LoanSparrow",
    ],
    suitedFor: [
      "Salaried with 6+ months in current job",
      "Self-employed with ITR / GST",
      "Borrowers consolidating high-cost card dues",
    ],
    eligibility: [
      "Age 21–60",
      "CIBIL / bureau typically 700+ for best pricing (lower scores may still see offers)",
      "Minimum income typically ₹25,000 / month",
      "Residence and office pincode in lender serviceable list",
    ],
    documents: [
      "PAN, Aadhaar",
      "Salary slips / ITR",
      "Bank statements 3–6 months",
      "Address proof if Aadhaar is outdated",
    ],
    steps: [
      { title: "Soft check of eligibility", body: "A bureau pull happens only after explicit consent." },
      { title: "Compare offers", body: "Rate, fee, insurance, and foreclosure — side by side." },
      { title: "e-sign the lender agreement", body: "You contract with the NBFC, not with LoanSparrow as lender." },
      { title: "Track EMIs in your dashboard", body: "Due dates and support sit in one place." },
    ],
    faqs: [
      {
        q: "Does checking offers hurt my score?",
        a: "LoanSparrow requests a hard bureau enquiry only after you consent. Multiple lender enquiries in a short window can still be visible on your report.",
      },
    ],
    caution:
      "Personal loans are unsecured and priced for risk. A lower EMI over 60 months can cost more interest than a 24-month plan.",
  },
  {
    slug: "gold",
    name: "Gold Loan",
    short: "Loan against jewellery. Same-day options.",
    eyebrow: "Secured",
    headline: "Gold loan",
    summary:
      "Borrow against hallmarked gold without selling it. Valuation and custody stay with the partner NBFC.",
    amountMin: 25_000,
    amountMax: 50_00_000,
    tenure: "6 – 24 months (renewable)",
    rateFrom: "From 8.5% p.a.*",
    disbursal: "Same day after valuation",
    highlights: [
      "LTV as per RBI gold-loan guidelines",
      "Safe custody with the lending partner",
      "Interest-only servicing options on some books",
      "Release of jewellery on full closure",
    ],
    suitedFor: [
      "Households with 22K / 24K jewellery",
      "Business owners needing seasonal working capital",
      "Borrowers who prefer not to touch their bureau much",
    ],
    eligibility: [
      "Age 18+ with KYC",
      "Ownership of gold ornaments / coins as accepted by lender",
      "Purity typically 18K and above",
    ],
    documents: [
      "PAN, Aadhaar",
      "Jewellery for valuation (do not courier gold to LoanSparrow)",
      "Purchase invoice if available — not always mandatory",
    ],
    steps: [
      { title: "Choose a city and branch / doorstep slot", body: "Gold never travels through LoanSparrow." },
      { title: "Valuation by the lender", body: "You receive a written valuation and LTV." },
      { title: "Pledge and disbursal", body: "Funds to your bank account; jewellery in lender custody." },
      { title: "Redeem when ready", body: "Interest + principal as per the scheme you picked." },
    ],
    faqs: [
      {
        q: "Does LoanSparrow take my gold?",
        a: "No. Valuation, custody, and pledge are solely with the partner NBFC. LoanSparrow is a marketplace.",
      },
    ],
    caution:
      "Auction of pledged gold can occur on prolonged default, as disclosed in the lender’s terms. Keep servicing interest.",
  },
  {
    slug: "against-mutual-funds",
    name: "Loan Against Mutual Funds",
    short: "Borrow against MF units. SIPs can continue.",
    eyebrow: "LAMF",
    headline: "Loan against mutual funds",
    summary:
      "Pledge eligible mutual fund units and use an overdraft. You pay interest only on the amount you draw.",
    amountMin: 50_000,
    amountMax: 5_00_00_000,
    tenure: "12 months, typically revolving",
    rateFrom: "From 9.5% p.a.*",
    disbursal: "T+1 after lien marking",
    highlights: [
      "No need to break SIPs or pay capital gains today",
      "Draw only what you use",
      "LTV varies by scheme category",
      "Top-up as folio value grows, subject to lender",
    ],
    suitedFor: [
      "Investors with ₹1L+ in eligible MFs",
      "People bridging a home down-payment or tax outflow",
      "Business owners who want cheaper credit than unsecured PL",
    ],
    eligibility: [
      "PAN, KYC-compliant folio in your name",
      "Schemes on the lender’s approved list",
      "Age 18+ / 21+ as per partner",
    ],
    documents: [
      "PAN, Aadhaar",
      "CAMS / KFin / RTA statement or CAS",
      "Bank account for disbursal (same PAN)",
    ],
    steps: [
      { title: "Share folio / CAS", body: "We check scheme eligibility with partners." },
      { title: "e-NACH / pledge via RTA", body: "Lien is marked digitally in most cases." },
      { title: "Overdraft goes live", body: "Transfer to bank as you draw." },
      { title: "Unpledge on closure", body: "Lien removal after dues are cleared." },
    ],
    faqs: [
      {
        q: "What if NAV falls?",
        a: "Lenders may ask for top-up or partial repayment if LTV breaches the threshold. This is disclosed in the offer.",
      },
    ],
    caution:
      "Pledging equity funds is market-linked. Do not draw 100% of available limit if you cannot top up in a correction.",
  },
  {
    slug: "against-fd",
    name: "Loan Against FD",
    short: "Overdraft against your FD. FD keeps earning.",
    eyebrow: "LAFD",
    headline: "Loan against FD",
    summary:
      "Get a limit against your fixed deposit instead of breaking it. Interest is usually close to your FD rate.",
    amountMin: 25_000,
    amountMax: 2_00_00_000,
    tenure: "Linked to FD maturity",
    rateFrom: "Typically FD rate + 1–2%*",
    disbursal: "Same day to 48 hours",
    highlights: [
      "FD continues to earn interest",
      "Avoid premature-break penalties",
      "Overdraft or term loan structures",
      "High LTV — often up to 80–90%",
    ],
    suitedFor: [
      "Depositors facing a short cash gap",
      "Families who do not want to disturb a tax-saver FD",
      "Borrowers who want bureau-light credit",
    ],
    eligibility: [
      "FD in your name (or as accepted jointly)",
      "KYC current with the deposit-taking entity",
      "Unencumbered deposit",
    ],
    documents: [
      "PAN, Aadhaar",
      "FD receipt / advice",
      "Cancelled cheque of the linked account",
    ],
    steps: [
      { title: "Tell us issuer and amount", body: "Not every FD is lien-markable across institutions." },
      { title: "Offer with LTV and spread", body: "You see the all-in rate before you proceed." },
      { title: "Lien marking", body: "Completed with the FD issuer." },
      { title: "Limit live", body: "Draw via NEFT / cheque / overdraft as offered." },
    ],
    faqs: [
      {
        q: "Can I pledge an FD of another bank?",
        a: "Some partners accept only their own FDs. Others run a lien with a third-party issuer. The offer card states this clearly.",
      },
    ],
    caution:
      "Default can lead to appropriation of the FD. Keep the overdraft within a level you can close from cash flows.",
  },
  {
    slug: "card-against-fd",
    name: "Card Against FD",
    short: "Credit card backed by a fixed deposit.",
    eyebrow: "Secured card",
    headline: "Card against FD",
    summary:
      "A secured credit card with a limit linked to your FD. Useful for first-time card holders or rebuilding credit.",
    amountMin: 10_000,
    amountMax: 10_00_000,
    tenure: "Card validity 3–5 years; FD auto-renews as per issuer",
    rateFrom: "Purchase APR as per card variant*",
    disbursal: "Card dispatch 5–10 days after FD booking",
    highlights: [
      "Approval-friendly for thin bureau files",
      "Limit typically 80–90% of FD",
      "Rewards on select variants",
      "FD remains yours; card is the facility",
    ],
    suitedFor: [
      "First-time card holders",
      "Borrowers repairing a bureau after settlement",
      "People who want a card without an unsecured underwrite",
    ],
    eligibility: [
      "Age 18+ / 21+ as per issuer",
      "PAN, Aadhaar, Indian address",
      "Ability to place a fresh FD or lien an existing one",
    ],
    documents: [
      "KYC",
      "FD booking / lien form",
      "Photograph and signature as required by issuer",
    ],
    steps: [
      { title: "Choose FD amount and card variant", body: "Limit and lounge/rewards differ by issuer." },
      { title: "Place or lien the deposit", body: "Done with the partner bank / NBFC." },
      { title: "Card issued", body: "Activate via app / IVR." },
      { title: "Use and repay like any credit card", body: "FD is touched only on prolonged default." },
    ],
    faqs: [
      {
        q: "Does this help my credit score?",
        a: "Used well — low utilisation, on-time payment — a secured card is a strong bureau builder. It is not a shortcut; it is a habit.",
      },
    ],
    caution:
      "A secured card still charges interest on revolved balances. Pay in full when you can. The FD can be used to recover dues.",
  },
  {
    slug: "unsecured-business",
    name: "Unsecured Business Loan",
    short: "Working capital for MSMEs. No property required.",
    eyebrow: "Business",
    headline: "Unsecured business loan",
    summary:
      "GST-registered businesses can apply for working capital based on banking and GST, not a mortgage.",
    amountMin: 1_00_000,
    amountMax: 50_00_000,
    tenure: "12 – 48 months",
    rateFrom: "From 14% p.a.*",
    disbursal: "3–10 working days",
    highlights: [
      "No property mortgage",
      "GST and banking-based assessment",
      "Term loan or drop-line overdraft on select books",
      "Co-applicant optional depending on lender",
    ],
    suitedFor: [
      "GST-registered proprietors, partnerships, Pvt Ltd",
      "Businesses 1+ year old with visible credits",
      "Working-capital gaps of ₹1L–₹50L",
    ],
    eligibility: [
      "Vintage typically 12 months+",
      "GST returns and current account statements",
      "Promoter age 21–65",
      "Bureau of firm and promoters reviewed",
    ],
    documents: [
      "PAN of entity and promoters",
      "GST certificate and GSTR-1 / 3B",
      "6–12 months current account statements",
      "Partnership deed / COI / shareholding as applicable",
    ],
    steps: [
      { title: "Business profile", body: "GSTIN, vintage, and required amount." },
      { title: "Banking & GST pull", body: "Account Aggregator or upload." },
      { title: "Offers from MSME lenders", body: "Fee, security (if any PDCs), and EMI." },
      { title: "e-sign and disbursal", body: "To the current account of the entity." },
    ],
    faqs: [
      {
        q: "Will you take my shop as security?",
        a: "This product is positioned as unsecured. A partner may still ask for PDCs, a personal guarantee, or a NACH mandate. That is disclosed on the offer.",
      },
    ],
    caution:
      "Unsecured MSME credit is priced higher than a mortgage. Match tenor to the asset you are funding — do not fund a 7-year machine on a 12-month loan.",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
