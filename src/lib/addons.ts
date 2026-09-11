export type AddonSlug = "sudhar" | "builder" | "report";

export type Addon = {
  slug: AddonSlug;
  name: string;
  price: number;
  tagline: string;
  for: Array<"health" | "report" | "no_offer" | "loan">;
  who: string;
  includes: string[];
};

export const addons: Addon[] = [
  {
    slug: "sudhar",
    name: "Credit Cure",
    price: 99,
    tagline: "4-week plan to fix the habits that drag the score.",
    for: ["health", "no_offer", "report"],
    who: "Late dues, high utilisation, or a score stuck below 700.",
    includes: [
      "Week-by-week pay-down order",
      "Utilisation target under 30%",
      "When to stop applying",
      "WhatsApp-style reminders (demo)",
    ],
  },
  {
    slug: "builder",
    name: "Credit builder loan",
    price: 500,
    tagline: "₹500 reported instalment line to thicken a thin file.",
    for: ["health", "no_offer"],
    who: "Students, new-to-credit, or files with only one card.",
    includes: [
      "₹500 parked as a builder tradeline",
      "6 monthly reports to the bureau (demo)",
      "No extra hard enquiry",
      "Close on time to lift mix and history",
    ],
  },
  {
    slug: "report",
    name: "Full credit report",
    price: 99,
    tagline: "Every factor, why it hurts, and what to fix first.",
    for: ["health", "report", "no_offer", "loan"],
    who: "Anyone who wants the ‘why’ behind the number.",
    includes: [
      "Factor-by-factor analysis",
      "Accounts and enquiries unpacked",
      "Priority order to recover points",
      "Plain-language, not bureau jargon",
    ],
  },
];

export function getAddon(slug: string) {
  return addons.find((a) => a.slug === slug) ?? null;
}

export function addonsFor(opts: { score: number; noOffer: boolean; persona?: string }) {
  const { score, noOffer, persona } = opts;
  if (persona === "loan" && score >= 700 && !noOffer) return addons.filter((a) => a.slug === "report");
  if (persona === "report") return addons.filter((a) => a.slug === "report" || a.slug === "sudhar");
  if (noOffer || score < 650) return addons;
  if (score < 700) return addons.filter((a) => a.slug !== "builder");
  return addons.filter((a) => a.slug === "report");
}
