import type { AcceptedOffer } from "@/lib/api";

/**
 * A real "Accepted" account, shaped for the offer card. Amount / ROI / EMI are per-lender
 * fields (see accounts.model.ts on relaycore) with no shared schema yet — this mapper pulls
 * what it can find by common names and leaves the rest blank rather than guessing.
 */
export type DisplayOffer = {
    id: string;
    lender: string;
    amount?: number;
    roi?: number;
    emi?: number;
    tenureMonths?: number;
    /** Outgoing link into the lender's own journey, when the account carries one. */
    link?: string;
};

const LINK_FIELDS = ["offerLink", "link", "redirectUrl", "kycUrl", "applyUrl"];

/**
 * Fallback when the account carries no per-application link (most lenders today — see
 * LENDER_EXTRACTORS above). A static landing page beats no button; swap for a real
 * per-application redirect as each lender integration grows one.
 */
const STATIC_LENDER_LINKS: Record<string, string> = {
    moneyview: "https://moneyview.in",
};
const AMOUNT_FIELDS = ["amount", "loan_amount", "sanctioned_amount", "offer_amount"];
const ROI_FIELDS = ["roi", "roi_percent", "interest_rate"];
const EMI_FIELDS = ["emi", "emi_amount"];
const TENURE_FIELDS = ["tenure", "tenure_months", "tenureMonths"];

function firstString(record: Record<string, unknown>, keys: string[]): string | undefined {
    for (const key of keys) {
        const value = record[key];
        if (typeof value === "string" && value) return value;
    }
    const nested = record.data as Record<string, unknown> | undefined;
    if (nested) {
        for (const key of keys) {
            const value = nested[key];
            if (typeof value === "string" && value) return value;
        }
    }
    return undefined;
}

function firstNumber(record: Record<string, unknown>, keys: string[]): number | undefined {
    for (const key of keys) {
        const value = record[key];
        if (typeof value === "number") return value;
        if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) return Number(value);
    }
    return undefined;
}

function prettyLenderName(lender: string) {
    return lender
        .replace(/[-_]/g, " ")
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

function toNumber(value: unknown): number | undefined {
    if (typeof value === "number") return value;
    if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) return Number(value);
    return undefined;
}

type LenderFields = Pick<DisplayOffer, "amount" | "roi" | "emi" | "tenureMonths">;

/**
 * A generic field-name guess misses this — the offer sits nested under the raw lender API
 * response shape, one per lender. Add a case here as each lender's real shape gets checked;
 * everyone else falls back to the generic guesser below.
 */
const LENDER_EXTRACTORS: Record<string, (account: Record<string, unknown>) => LenderFields> = {
    moneyview: (account) => {
        const response = isRecord(account.response) ? account.response : undefined;
        const offerBlock = isRecord(response?.offer) ? response.offer : undefined;
        const objects = offerBlock?.offerObjects;
        const first = Array.isArray(objects) && isRecord(objects[0]) ? objects[0] : undefined;
        if (!first) return {};
        return {
            amount: toNumber(first.loanAmount),
            roi: toNumber(first.rateOfInterest),
            emi: toNumber(first.loanEmi) != null ? Math.round(toNumber(first.loanEmi) as number) : undefined,
            tenureMonths: toNumber(first.loanTenure),
        };
    },
};

export function toDisplayOffer(offer: AcceptedOffer, index: number): DisplayOffer {
    const specific = LENDER_EXTRACTORS[offer.lender]?.(offer.account) ?? {};
    return {
        id: `${offer.lender}-${index}`,
        lender: prettyLenderName(offer.lender),
        amount: specific.amount ?? firstNumber(offer.account, AMOUNT_FIELDS),
        roi: specific.roi ?? firstNumber(offer.account, ROI_FIELDS),
        emi: specific.emi ?? firstNumber(offer.account, EMI_FIELDS),
        tenureMonths: specific.tenureMonths ?? firstNumber(offer.account, TENURE_FIELDS),
        link: firstString(offer.account, LINK_FIELDS) ?? STATIC_LENDER_LINKS[offer.lender],
    };
}
