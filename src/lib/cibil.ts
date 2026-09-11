export type CibilIssue = {
    title: string;
    why: string;
    fix: string;
    weight: "high" | "medium" | "low";
};

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
    issues?: CibilIssue[];
};

export function bandFor(score: number) {
    return score >= 750 ? "Excellent" : score >= 700 ? "Good" : score >= 650 ? "Fair" : "Needs work";
}

export function isNoOfferProfile(s: { income?: string; employment?: string; demoCustomerId?: string }) {
    if (s.demoCustomerId === "riya" || s.demoCustomerId === "meera") return false;
    if (s.demoCustomerId === "aman" || s.demoCustomerId === "kabir") return true;
    const income = Number(s.income ?? 0);
    return income < 15000 || s.employment === "student";
}

export function needsAddons(score: number, noOffer: boolean) {
    return noOffer || score < 700;
}

function defaultIssues(tight: boolean, mid: boolean): CibilIssue[] {
    if (tight) {
        return [
            {
                title: "Thin file + late dues",
                why: "Few accounts and missed BNPL / card payments pull the score down fast.",
                fix: "Pay dues, then add a credit-builder tradeline.",
                weight: "high",
            },
            {
                title: "Too many enquiries",
                why: "Several hard pulls in 90 days look like distress to lenders.",
                fix: "Pause new applications for 90 days. Soft matching here does not add a hard pull.",
                weight: "high",
            },
            {
                title: "High utilisation",
                why: "Revolving balances above ~30% of limit hurt the number.",
                fix: "Pay card down below 30% before the statement date.",
                weight: "medium",
            },
        ];
    }
    if (mid) {
        return [
            {
                title: "Utilisation is elevated",
                why: "Cards sitting near 40% of limit cap the score in the Fair band.",
                fix: "Bring utilisation under 30%. Credit Cure walks you through it.",
                weight: "medium",
            },
            {
                title: "Mix is narrow",
                why: "Mostly unsecured revolving credit, little instalment history.",
                fix: "A small credit-builder loan can add a positive instalment line.",
                weight: "low",
            },
        ];
    }
    return [
        {
            title: "Keep utilisation in check",
            why: "Score is healthy. A spike above 30% is the usual next dip.",
            fix: "Pay statement in full where you can.",
            weight: "low",
        },
    ];
}

export function buildCibilReport(s: { income?: string; employment?: string }): CibilReport {
    const income = Number(s.income ?? 0);
    const tight = s.employment === "student" || income < 15000;
    const mid = !tight && income < 25000;
    const score = tight ? 612 : mid ? 684 : 746;

    return {
        score,
        band: bandFor(score),
        updated: "Today",
        utilisation: tight ? 64 : mid ? 41 : 28,
        accounts: tight ? 2 : mid ? 4 : 5,
        onTime: tight ? 0.82 : mid ? 0.91 : 0.97,
        enquiries90d: tight ? 4 : mid ? 2 : 1,
        paymentHistory: tight ? 72 : mid ? 88 : 96,
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
        issues: defaultIssues(tight, mid),
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
