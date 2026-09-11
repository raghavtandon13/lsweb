import type { CibilReport } from "@/lib/cibil";
import type { LenderResponse } from "@/lib/lender-outcomes";

export const APPLY_KEY = "loansparrow.apply";
export const AUTH_KEY = "loansparrow.auth";

export type EmploymentType = "salaried" | "self_employed" | "business" | "student" | "homemaker" | "other";

export const employmentLabel: Record<EmploymentType, string> = {
    salaried: "Salaried",
    self_employed: "Self-employed",
    business: "Business / MSME",
    student: "Student",
    homemaker: "Homemaker",
    other: "Other",
};

export type ApplyState = {
    mobile: string;
    name?: string;
    pan?: string;
    otpSentAt?: string;
    verified?: boolean;
    pincode?: string;
    city?: string;
    income?: string;
    employment?: EmploymentType;
    dob?: string;
    email?: string;
    amount?: string;
    purpose?: string;
    consents?: {
        bureau: boolean;
        shareLenders: boolean;
        terms: boolean;
        whatsapp: boolean;
    };
    termsAccepted?: boolean;
    applicationId?: string;
    status?: "draft" | "processing" | "eligible" | "no_offer";
    cibilOtpVerified?: boolean;
    cibil?: CibilReport;
    demoCustomerId?: string;
    purchasedAddons?: string[];
    /** Full lender push log. UI shows only outcome === "accept". */
    lenderResponses?: LenderResponse[];
};

export type AuthState = {
    mobile: string;
    name?: string;
    loggedIn: boolean;
};

export function normaliseMobile(mobile: string) {
    return mobile.replace(/\D/g, "").slice(-10);
}

export function loadApply(): ApplyState | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = sessionStorage.getItem(APPLY_KEY);
        return raw ? (JSON.parse(raw) as ApplyState) : null;
    } catch {
        return null;
    }
}

export function saveApply(state: ApplyState) {
    sessionStorage.setItem(APPLY_KEY, JSON.stringify(state));
}

export function clearApply() {
    sessionStorage.removeItem(APPLY_KEY);
}

export function loadAuth(): AuthState | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? (JSON.parse(raw) as AuthState) : null;
    } catch {
        return null;
    }
}

export function saveAuth(state: AuthState) {
    localStorage.setItem(AUTH_KEY, JSON.stringify(state));
}

export function clearAuth() {
    localStorage.removeItem(AUTH_KEY);
}

export function isValidPan(pan: string) {
    return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase());
}

export function isValidMobile(mobile: string) {
    return /^[6-9]\d{9}$/.test(normaliseMobile(mobile));
}

export function clearSession() {
    clearAuth();
    clearApply();
}

/** Login / OTP: bind this mobile and drop another customer's apply file. */
export function saveAuthForMobile(mobile: string, name?: string) {
    const m = normaliseMobile(mobile);
    const apply = loadApply();
    if (apply && normaliseMobile(apply.mobile) !== m) {
        clearApply();
    }
    saveAuth({ mobile: m, name, loggedIn: true });
}

export function isValidPincode(pincode: string) {
    return /^[1-9][0-9]{5}$/.test(pincode);
}

export function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim().toLowerCase());
}
