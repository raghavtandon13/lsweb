export type CibilAccount = {
  name: string;
  type: string;
  status: string;
  opened: string;
};

export type CibilReport = {
  score: number;
  band: string;
  updated: string;
  utilisation: number;
  accounts: number;
  onTime: number;
  enquiries90d: number;
  paymentHistory: number;
  accountsList: CibilAccount[];
};

export function isNoOfferProfile(s: { income?: string; employment?: string }) {
  const income = Number(s.income ?? 0);
  return income < 15000 || s.employment === "student";
}

export function buildCibilReport(s: { income?: string; employment?: string }): CibilReport {
  const income = Number(s.income ?? 0);
  const tight = s.employment === "student" || income < 15000;
  const mid = income < 25000;

  const score = tight ? 612 : mid ? 684 : 746;
  const band = score >= 750 ? "Excellent" : score >= 700 ? "Good" : score >= 650 ? "Fair" : "Needs work";

  return {
    score,
    band,
    updated: "Today",
    utilisation: tight ? 64 : mid ? 41 : 28,
    accounts: tight ? 2 : 5,
    onTime: tight ? 0.82 : 0.97,
    enquiries90d: tight ? 4 : 1,
    paymentHistory: tight ? 72 : 96,
    accountsList: tight
      ? [
          { name: "Campus card", type: "Credit card", status: "Active", opened: "2024" },
          { name: "BNPL", type: "Consumer", status: "Closed", opened: "2025" },
        ]
      : [
          { name: "HDFC Bank", type: "Credit card", status: "Active", opened: "2019" },
          { name: "Aarohan Finance", type: "Personal loan", status: "Closed", opened: "2022" },
          { name: "SBI", type: "Savings linked", status: "Active", opened: "2017" },
        ],
  };
}

export function eligibleCategories(score: number, noOffer: boolean) {
  if (noOffer || score < 650) {
    return [
      { slug: "gold", name: "Gold loan", eligible: true },
      { slug: "card-against-fd", name: "Card against FD", eligible: true },
      { slug: "personal", name: "Personal loan", eligible: false },
      { slug: "payday", name: "Payday loan", eligible: false },
      { slug: "credit-card", name: "Credit cards", eligible: false },
    ];
  }
  if (score < 700) {
    return [
      { slug: "short-term-personal", name: "Short term PL", eligible: true },
      { slug: "payday", name: "Payday loan", eligible: true },
      { slug: "gold", name: "Gold loan", eligible: true },
      { slug: "personal", name: "Personal loan", eligible: false },
      { slug: "credit-card", name: "Credit cards", eligible: false },
    ];
  }
  return [
    { slug: "personal", name: "Personal loan", eligible: true },
    { slug: "short-term-personal", name: "Short term PL", eligible: true },
    { slug: "payday", name: "Payday loan", eligible: true },
    { slug: "credit-card", name: "Credit cards", eligible: true },
    { slug: "gold", name: "Gold loan", eligible: true },
  ];
}
