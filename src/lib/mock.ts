export type Offer = {
  id: string;
  lender: string;
  product: string;
  amount: number;
  tenureMonths: number;
  roi: number;
  processingFee: string;
  emi: number;
  disbursal: string;
  highlights: string[];
  why?: string;
  productSlug?: string;
  recommended?: boolean;
};

export type TimelineEvent = {
  at: string;
  title: string;
  detail: string;
  state: "done" | "current" | "upcoming";
};

export type Application = {
  id: string;
  product: string;
  amount: number;
  status: "In review" | "Offers ready" | "Disbursed" | "Closed" | "No offer";
  updated: string;
  lender?: string;
};

export const mockOffers: Offer[] = [
  {
    id: "off_01",
    lender: "Aarohan Finance",
    product: "Short Term Personal Loan",
    amount: 80_000,
    tenureMonths: 12,
    roi: 18.5,
    processingFee: "2% + GST",
    emi: 7_346,
    disbursal: "24–48 hrs after KYC",
    highlights: ["No foreclosure in first 45 days", "NACH optional"],
    why: "Income and pincode match this lender’s short-term book.",
    productSlug: "short-term-personal",
    recommended: true,
  },
  {
    id: "off_02",
    lender: "Northstar NBFC",
    product: "Personal Loan",
    amount: 1_20_000,
    tenureMonths: 24,
    roi: 16.99,
    processingFee: "₹1,999 flat",
    emi: 5_912,
    disbursal: "3 working days",
    highlights: ["Insurance optional", "Part-prepay after 3 EMIs"],
    why: "Lower ROI for 24-month tenure on this profile.",
    productSlug: "personal",
  },
  {
    id: "off_03",
    lender: "Kaveri Capital",
    product: "Payday Loan",
    amount: 25_000,
    tenureMonths: 1,
    roi: 24,
    processingFee: "1.5% + GST",
    emi: 25_500,
    disbursal: "Same day",
    highlights: ["Bullet repayment on salary date"],
    why: "Small ticket, salary-cycle repayment.",
    productSlug: "payday",
  },
];

export const mockApplications: Application[] = [
  {
    id: "SU-240918-1842",
    product: "Short Term Personal Loan",
    amount: 80_000,
    status: "Offers ready",
    updated: "Today, 2:14 PM",
    lender: "Aarohan Finance",
  },
  {
    id: "SU-240102-0091",
    product: "Gold Loan",
    amount: 1_50_000,
    status: "Closed",
    updated: "12 Jan 2026",
    lender: "Hillgold NBFC",
  },
];

export const mockTimeline: TimelineEvent[] = [
  {
    at: "Today, 1:02 PM",
    title: "Application started",
    detail: "Mobile and PAN captured.",
    state: "done",
  },
  {
    at: "Today, 1:03 PM",
    title: "OTP verified",
    detail: "Mobile ownership confirmed.",
    state: "done",
  },
  {
    at: "Today, 1:08 PM",
    title: "Profile completed",
    detail: "Pincode, income, employment, and DOB saved.",
    state: "done",
  },
  {
    at: "Today, 1:09 PM",
    title: "Consents recorded",
    detail: "Bureau, lender share, and T&Cs accepted.",
    state: "done",
  },
  {
    at: "Today, 1:11 PM",
    title: "Eligibility run",
    detail: "Matched against partner credit policies.",
    state: "done",
  },
  {
    at: "Today, 2:14 PM",
    title: "Offers ready",
    detail: "3 lenders returned a price. Select one to continue KYC.",
    state: "current",
  },
  {
    at: "Pending you",
    title: "Lender KYC & e-sign",
    detail: "You will leave LoanSparrow for the partner’s regulated journey.",
    state: "upcoming",
  },
];

export const mockProfile = {
  name: "Riya Sharma",
  mobile: "9876543210",
  email: "riya.sharma@email.com",
  pan: "FQRPS1234L",
  dob: "1994-06-12",
  pincode: "400051",
  employment: "Salaried",
  income: 72000,
};

export const mockCredit = {
  score: 746,
  band: "Good",
  updated: "2 Sep 2026",
  utilisation: 28,
  accounts: 6,
  onTime: 0.97,
};
