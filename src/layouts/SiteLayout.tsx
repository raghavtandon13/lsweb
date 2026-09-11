import { Outlet } from "react-router-dom";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export default function SiteLayout() {
    return (
        <>
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
