import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { ButtonLink } from "@/components/ui/button-link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center px-5 py-24 text-center">
      <Logo />
      <h1 className="mt-10 font-serif text-4xl text-navy">This page is not on the map.</h1>
      <p className="mt-3 max-w-md text-muted">
        Check the menu, or start an eligibility check — that journey is always where we left it.
      </p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/apply" variant="outline">
          Check eligibility
        </ButtonLink>
      </div>
      <Link href="/contact" className="mt-6 text-sm text-gold-deep">
        Contact
      </Link>
    </div>
  );
}
