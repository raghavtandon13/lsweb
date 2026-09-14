import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import DashboardOffersPage from "@/app/(account)/dashboard/offers/page";
import DashboardHomePage from "@/app/(account)/dashboard/page";
import ProfilePage from "@/app/(account)/dashboard/profile/page";
import SupportPage from "@/app/(account)/dashboard/support/page";
import LoginPage from "@/app/(account)/login/page";
import AddonDonePage from "@/app/(apply)/apply/addons/[slug]/done/page";
import AddonPayPage from "@/app/(apply)/apply/addons/[slug]/page";
import AddonsPage from "@/app/(apply)/apply/addons/page";
import CibilDetailsPage from "@/app/(apply)/apply/cibil/details/page";
import CibilPage from "@/app/(apply)/apply/cibil/page";
import ConsentPage from "@/app/(apply)/apply/consent/page";
import DemoCustomersPage from "@/app/(apply)/apply/demo/page";
import DetailsPage from "@/app/(apply)/apply/details/page";
import NoOfferPage from "@/app/(apply)/apply/no-offer/page";
import OffersPage from "@/app/(apply)/apply/offers/page";
import ApplyStartPage from "@/app/(apply)/apply/page";
import ProcessingPage from "@/app/(apply)/apply/processing/page";
import VerifyPage from "@/app/(apply)/apply/verify/page";
import CreditHealthPage from "@/app/(site)/credit-health/page";
import CreditReportPage from "@/app/(site)/credit-report/page";
import CreditScorePage from "@/app/(site)/credit-score/page";
import DisclaimerPage from "@/app/(site)/disclaimer/page";
import DsaRegisterPage from "@/app/(site)/dsa/register/page";
import EmiPage from "@/app/(site)/emi-calculator/page";
import GrievancePage from "@/app/(site)/grievance-redressal/page";
import HelpPage from "@/app/(site)/help/page";
import ProductPage from "@/app/(site)/loans/[slug]/page";
import HomePage from "@/app/(site)/page";
import PartnerWithUsPage from "@/app/(site)/partner-with-us/page";
import PartnerRegisterPage from "@/app/(site)/partners/register/page";
import PrivacyPage from "@/app/(site)/privacy-policy/page";
import SmallTicketPage from "@/app/(site)/small-ticket-loans/page";
import TermsPage from "@/app/(site)/terms/page";
import NotFound from "@/app/not-found";
import { PageTracker } from "@/components/analytics/page-tracker";
import { ThemeBoot } from "@/components/layout/theme-switcher";
import ApplyLayout from "@/layouts/ApplyLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import SiteLayout from "@/layouts/SiteLayout";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function App() {
    return (
        <div className="flex min-h-full flex-col">
            <ThemeBoot />
            <ScrollToTop />
            <PageTracker />
            <Routes>
                <Route element={<SiteLayout />}>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<HelpPage />} path="/help" />
                    <Route element={<HelpPage />} path="/help/:tab" />
                    <Route element={<Navigate replace to="/help" />} path="/how-it-works" />
                    <Route
                        element={<Navigate replace to="/help/faqs" />}
                        element={<Navigate replace to="/help/faqs" />}
                    />
                    <Route
                        element={<Navigate replace to="/help/contact" />}
                        element={<Navigate replace to="/help/contact" />}
                    />
                    <Route element={<Navigate replace to="/help/about" />} path="/about" />
                    <Route element={<PrivacyPage />} path="/privacy-policy" />
                    <Route element={<TermsPage />} path="/terms" />
                    <Route element={<DisclaimerPage />} path="/disclaimer" />
                    <Route element={<GrievancePage />} path="/grievance-redressal" />
                    <Route element={<ProductPage />} path="/loans/:slug" />
                    <Route element={<CreditScorePage />} path="/credit-score" />
                    <Route element={<CreditReportPage />} path="/credit-report" />
                    <Route element={<CreditHealthPage />} path="/credit-health" />
                    <Route element={<SmallTicketPage />} path="/small-ticket-loans" />
                    <Route element={<EmiPage />} path="/emi-calculator" />
                    <Route element={<PartnerWithUsPage />} path="/partner-with-us" />
                    <Route element={<PartnerRegisterPage />} path="/partners/register" />
                    <Route element={<DsaRegisterPage />} path="/dsa/register" />
                </Route>

                <Route element={<ApplyLayout />}>
                    <Route element={<ApplyStartPage />} path="/apply" />
                    <Route element={<VerifyPage />} path="/apply/verify" />
                    <Route element={<DetailsPage />} path="/apply/details" />
                    <Route element={<ConsentPage />} path="/apply/consent" />
                    <Route element={<ProcessingPage />} path="/apply/processing" />
                    <Route element={<CibilPage />} path="/apply/cibil" />
                    <Route element={<CibilDetailsPage />} path="/apply/cibil/details" />
                    <Route element={<AddonsPage />} path="/apply/addons" />
                    <Route element={<AddonDonePage />} path="/apply/addons/:slug/done" />
                    <Route element={<AddonPayPage />} path="/apply/addons/:slug" />
                    <Route element={<DemoCustomersPage />} path="/apply/demo" />
                    <Route element={<OffersPage />} path="/apply/offers" />
                    <Route element={<NoOfferPage />} path="/apply/no-offer" />
                </Route>

                <Route element={<LoginPage />} path="/login" />

                <Route element={<DashboardLayout />}>
                    <Route element={<DashboardHomePage />} path="/dashboard" />
                    <Route element={<DashboardOffersPage />} path="/dashboard/offers" />
                    <Route element={<ProfilePage />} path="/dashboard/profile" />
                    <Route element={<SupportPage />} path="/dashboard/support" />
                </Route>

                <Route element={<NotFound />} path="*" />
            </Routes>
        </div>
    );
}
