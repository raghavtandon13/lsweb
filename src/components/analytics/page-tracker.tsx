"use client";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initAnalytics, trackPageView } from "@/lib/analytics";

export function PageTracker() {
    const { pathname } = useLocation();

    useEffect(() => {
        initAnalytics();
    }, []);

    useEffect(() => {
        trackPageView(pathname);
    }, [pathname]);

    return null;
}
