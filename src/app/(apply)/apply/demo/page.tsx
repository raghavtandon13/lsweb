"use client";

import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DEMO_CUSTOMERS_FILE, demoCustomers, startDemoJourney } from "@/lib/demo-customers";

export default function DemoCustomersPage() {
    const navigate = useNavigate();

    return (
        <div className="space-y-4">
            <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">Dummy users</p>
                <h1 className="mt-1 font-serif text-3xl text-navy">Saved in JSON files</h1>
                <p className="mt-2 text-sm leading-6 text-muted">
                    Each person is a file, matched by mobile. After logout the session is cleared — enter a different
                    number to load a different customer.
                </p>
                <p className="mt-3 rounded-2xl border border-line bg-white px-4 py-3 font-mono text-xs text-navy sm:text-sm">
                    {DEMO_CUSTOMERS_FILE}
                    <br />
                    riya.json · meera.json · aman.json · kabir.json
                </p>
            </div>
            {demoCustomers.map((c) => (
                <article className="card p-4 sm:p-5" key={c.id}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-spark-gold">{c.tag}</p>
                    <h2 className="mt-1 font-serif text-2xl text-navy">{c.name}</h2>
                    <p className="mt-1 text-sm text-muted">{c.blurb}</p>
                    <p className="mt-2 font-mono text-[11px] text-muted">src/data/dummy-users/{c.id}.json</p>
                    <p className="mt-1 text-xs text-muted">
                        Mobile {c.details.mobile} · {c.details.email} · {c.details.employment} · ₹{c.details.income}/mo
                    </p>
                    <Button
                        className="mt-4 w-full"
                        onClick={() => {
                            startDemoJourney(c.id);
                            navigate("/apply");
                        }}
                        type="button"
                    >
                        Start journey as {c.name.split(" ")[0]}
                    </Button>
                </article>
            ))}
        </div>
    );
}
