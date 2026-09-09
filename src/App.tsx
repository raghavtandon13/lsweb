import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SiteLayout from "@/layouts/SiteLayout";
import ApplyLayout from "@/layouts/ApplyLayout";
import DashboardLayout from "@/layouts/DashboardLayout";
import HomePage from "@/app/(site)/page";
import HowItWorksPage from "@/app/(site)/how-it-works/page";
import AboutPage from "@/app/(site)/about/page";
import FaqsPage from "@/app/(site)/faqs/page";
import ContactPage from "@/app/(site)/contact/page";
import PrivacyPage from "@/app/(site)/privacy-policy/page";
import TermsPage from "@/app/(site)/terms/page";
import DisclaimerPage from "@/app/(site)/disclaimer/page";
import GrievancePage from "@/app/(site)/grievance-redressal/page";
import ProductPage from "@/app/(site)/loans/[slug]/page";
import CreditScorePage from "@/app/(site)/credit-score/page";
import CreditReportPage from "@/app/(site)/credit-report/page";
import CreditHealthPage from "@/app/(site)/credit-health/page";
import SmallTicketPage from "@/app/(site)/small-ticket-loans/page";
import EmiPage from "@/app/(site)/emi-calculator/page";
import PartnerWithUsPage from "@/app/(site)/partner-with-us/page";
import PartnerRegisterPage from "@/app/(site)/partners/register/page";
import DsaRegisterPage from "@/app/(site)/dsa/register/page";
import ApplyStartPage from "@/app/(apply)/apply/page";
import VerifyPage from "@/app/(apply)/apply/verify/page";
import DetailsPage from "@/app/(apply)/apply/details/page";
import ConsentPage from "@/app/(apply)/apply/consent/page";
import ProcessingPage from "@/app/(apply)/apply/processing/page";
import OffersPage from "@/app/(apply)/apply/offers/page";
import NoOfferPage from "@/app/(apply)/apply/no-offer/page";
import LoginPage from "@/app/(account)/login/page";
import DashboardHomePage from "@/app/(account)/dashboard/page";
import ApplicationsPage from "@/app/(account)/dashboard/applications/page";
import ApplicationDetailPage from "@/app/(account)/dashboard/applications/[id]/page";
import DashboardOffersPage from "@/app/(account)/dashboard/offers/page";
import ProfilePage from "@/app/(account)/dashboard/profile/page";
import SupportPage from "@/app/(account)/dashboard/support/page";
import NotFound from "@/app/not-found";
import { PageTracker } from "@/components/analytics/page-tracker";
import { ThemeBoot } from "@/components/layout/theme-switcher";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/faqs" element={<FaqsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/grievance-redressal" element={<GrievancePage />} />
        <Route path="/loans/:slug" element={<ProductPage />} />
        <Route path="/credit-score" element={<CreditScorePage />} />
        <Route path="/credit-report" element={<CreditReportPage />} />
        <Route path="/credit-health" element={<CreditHealthPage />} />
        <Route path="/small-ticket-loans" element={<SmallTicketPage />} />
        <Route path="/emi-calculator" element={<EmiPage />} />
        <Route path="/partner-with-us" element={<PartnerWithUsPage />} />
        <Route path="/partners/register" element={<PartnerRegisterPage />} />
        <Route path="/dsa/register" element={<DsaRegisterPage />} />
      </Route>

      <Route element={<ApplyLayout />}>
        <Route path="/apply" element={<ApplyStartPage />} />
        <Route path="/apply/verify" element={<VerifyPage />} />
        <Route path="/apply/details" element={<DetailsPage />} />
        <Route path="/apply/consent" element={<ConsentPage />} />
        <Route path="/apply/processing" element={<ProcessingPage />} />
        <Route path="/apply/offers" element={<OffersPage />} />
        <Route path="/apply/no-offer" element={<NoOfferPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<DashboardHomePage />} />
        <Route path="/dashboard/applications" element={<ApplicationsPage />} />
        <Route path="/dashboard/applications/:id" element={<ApplicationDetailPage />} />
        <Route path="/dashboard/offers" element={<DashboardOffersPage />} />
        <Route path="/dashboard/profile" element={<ProfilePage />} />
        <Route path="/dashboard/support" element={<SupportPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
  );
}
