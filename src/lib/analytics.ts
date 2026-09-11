const CLIENT_KEY = "loansparrow.analytics.client_id";
const SESSION_KEY = "loansparrow.analytics.session_id";
const QUEUE_KEY = "loansparrow.analytics.events";
const QUEUE_MAX = 200;

const FUNNEL = "loan_apply";

export const FUNNEL_STEPS = {
    1: "apply_start",
    2: "otp",
    3: "profile",
    4: "consent",
    5: "cibil",
    6: "offers",
    7: "no_offer",
} as const;

const PATH_FUNNEL: Record<string, { step: number; name: string }> = {
    "/apply": { step: 1, name: "apply_start_view" },
    "/apply/verify": { step: 2, name: "otp_view" },
    "/apply/details": { step: 3, name: "profile_view" },
    "/apply/consent": { step: 4, name: "consent_view" },
    "/apply/processing": { step: 4, name: "cibil_fetch_view" },
    "/apply/cibil": { step: 5, name: "cibil_view" },
    "/apply/cibil/details": { step: 5, name: "cibil_details_view" },
    "/apply/addons": { step: 7, name: "addons_view" },
    "/apply/demo": { step: 0, name: "demo_cast_view" },
    "/apply/offers": { step: 6, name: "offers_view" },
    "/apply/no-offer": { step: 7, name: "no_offer_view" },
};

export type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

export type AnalyticsEvent = {
    event: string;
    event_name: string;
    client_id: string;
    session_id: string;
    timestamp_micros: number;
    params: {
        funnel_name?: string;
        funnel_step?: number;
        funnel_step_name?: string;
        page_location: string;
        page_path: string;
        page_title: string;
        engagement_time_msec: number;
        [key: string]: string | number | boolean | null | undefined;
    };
};

declare global {
    interface Window {
        dataLayer?: Record<string, unknown>[];
        gtag?: (...args: unknown[]) => void;
    }
}

function uid() {
    return `${crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`}`;
}

function clientId() {
    let id = localStorage.getItem(CLIENT_KEY);
    if (!id) {
        id = `${uid()}.${Math.floor(Date.now() / 1000)}`;
        localStorage.setItem(CLIENT_KEY, id);
    }
    return id;
}

function sessionId() {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
        id = String(Math.floor(Date.now() / 1000));
        sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
}

function enqueue(event: AnalyticsEvent) {
    try {
        const raw = localStorage.getItem(QUEUE_KEY);
        const list: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
        list.push(event);
        localStorage.setItem(QUEUE_KEY, JSON.stringify(list.slice(-QUEUE_MAX)));
    } catch {
        /* quota */
    }
}

function pushDataLayer(event: AnalyticsEvent) {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
        event: event.event_name,
        event_name: event.event_name,
        client_id: event.client_id,
        session_id: event.session_id,
        ...event.params,
    });
}

function pushGtag(event: AnalyticsEvent) {
    if (typeof window.gtag !== "function") return;
    window.gtag("event", event.event_name, {
        ...event.params,
        send_to: import.meta.env.VITE_GA_MEASUREMENT_ID || undefined,
    });
}

function postCrm(event: AnalyticsEvent) {
    const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT as string | undefined;
    if (!endpoint) return;
    const body = JSON.stringify(event);
    try {
        if (navigator.sendBeacon) {
            navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
            return;
        }
    } catch {
        /* fall through */
    }
    void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
    }).catch(() => undefined);
}

export function track(eventName: string, params: AnalyticsParams = {}) {
    if (typeof window === "undefined") return;

    const event: AnalyticsEvent = {
        event: "analytics",
        event_name: eventName,
        client_id: clientId(),
        session_id: sessionId(),
        timestamp_micros: Date.now() * 1000,
        params: {
            page_location: window.location.href,
            page_path: window.location.pathname,
            page_title: document.title,
            engagement_time_msec: 1,
            ...params,
        },
    };

    enqueue(event);
    pushDataLayer(event);
    pushGtag(event);
    postCrm(event);
}

export function trackFunnel(step: number, stepName: string, extra: AnalyticsParams = {}) {
    track("funnel_step", {
        funnel_name: FUNNEL,
        funnel_step: step,
        funnel_step_name: stepName,
        ...extra,
    });
}

export function trackPageView(path: string) {
    const mapped = PATH_FUNNEL[path];
    track("page_view", {
        page_path: path,
        ...(mapped
            ? {
                  funnel_name: FUNNEL,
                  funnel_step: mapped.step,
                  funnel_step_name: mapped.name,
              }
            : {}),
    });
}

export function initAnalytics() {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer ?? [];
    const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
    if (!id || document.getElementById("ga4-src")) return;

    const src = document.createElement("script");
    src.id = "ga4-src";
    src.async = true;
    src.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(src);

    window.gtag = function gtag() {
        window.dataLayer!.push(arguments as unknown as Record<string, unknown>);
    };
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false });
}

export function getAnalyticsQueue(): AnalyticsEvent[] {
    try {
        const raw = localStorage.getItem(QUEUE_KEY);
        return raw ? (JSON.parse(raw) as AnalyticsEvent[]) : [];
    } catch {
        return [];
    }
}
