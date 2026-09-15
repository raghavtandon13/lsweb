/**
 * Thin client for relaycore's public API. Every route replies
 * `{ type: "success" | "error", message?, data? }` — see routes/auth.ts and routes/me.ts.
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "https://api.loansparrow.com").replace(/\/$/, "");

export class ApiError extends Error {
    constructor(
        message: string,
        readonly status: number,
        readonly retryAfter?: number,
    ) {
        super(message);
    }
}

type Envelope<T> =
    | { type: "success"; message?: string; data: T }
    | { type: "error"; message: string; retryAfter?: number };

async function request<T>(path: string, init?: RequestInit & { token?: string }): Promise<T> {
    const { token, headers, ...rest } = init ?? {};
    const res = await fetch(`${BASE_URL}${path}`, {
        ...rest,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...headers,
        },
    });
    const body = (await res.json().catch(() => null)) as Envelope<T> | null;
    if (!res.ok || !body || body.type === "error") {
        const message = body && body.type === "error" ? body.message : `Request failed (${res.status})`;
        throw new ApiError(message, res.status, body && body.type === "error" ? body.retryAfter : undefined);
    }
    return body.data;
}

// --- Auth / OTP — POST /api/v1/auth (send), /verify-otp, /resend-otp ---

export function sendOtp(input: { phone: string; name?: string; utmSource?: string }) {
    return request<{ userId: string }>("/api/v1/auth", { method: "POST", body: JSON.stringify(input) });
}

export function resendOtp(phone: string) {
    return request<{ userId: string }>("/api/v1/auth/resend-otp", {
        method: "POST",
        body: JSON.stringify({ phone }),
    });
}

export function verifyOtp(phone: string, otp: string) {
    return request<{ token: string; userId: string }>("/api/v1/auth/verify-otp", {
        method: "POST",
        body: JSON.stringify({ phone, otp }),
    });
}

// --- Customer profile — /api/v1/me ---

export type CustomerProfile = {
    id: string;
    name: string | null;
    phone: string;
    email: string | null;
    pan: string | null;
    dob: string | null;
    pincode: string | null;
    employment: string | null;
    income: string | null;
};

export function getMe(token: string) {
    return request<CustomerProfile>("/api/v1/me", { token });
}

export function patchMe(
    token: string,
    fields: Partial<Pick<CustomerProfile, "email" | "pan" | "dob" | "pincode" | "employment" | "income" | "name">>,
) {
    return request<{ ok: true }>("/api/v1/me", {
        method: "PATCH",
        token,
        body: JSON.stringify(fields),
    });
}

// --- Offers — GET /api/v1/me/offers (getOffers: accepted outcomes, last 30 days) ---

export type AcceptedOffer = {
    lender: string;
    collection: string;
    respDate: string | null;
    account: Record<string, unknown>;
};

export function getOffers(token: string) {
    return request<{ offers: AcceptedOffer[] }>("/api/v1/me/offers", { token });
}
