export const APPLY_KEY = "loansparrow.apply";
export const AUTH_KEY = "loansparrow.auth";

export type EmploymentType =
  | "salaried"
  | "self_employed"
  | "business"
  | "student"
  | "homemaker"
  | "other";

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
  consents?: {
    bureau: boolean;
    shareLenders: boolean;
    terms: boolean;
    whatsapp: boolean;
  };
  termsAccepted?: boolean;
  applicationId?: string;
  status?: "draft" | "processing" | "eligible" | "no_offer";
};

export type AuthState = {
  mobile: string;
  name?: string;
  loggedIn: boolean;
};

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
  return /^[6-9]\d{9}$/.test(mobile.replace(/\D/g, "").slice(-10));
}

export function isValidPincode(pincode: string) {
  return /^[1-9][0-9]{5}$/.test(pincode);
}
