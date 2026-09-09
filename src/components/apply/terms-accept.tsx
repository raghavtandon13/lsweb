import Link from "next/link";
import { cn } from "@/lib/cn";

export const TERMS_REQUIRED_MESSAGE =
  "Accept the Terms, Privacy Policy, and Disclaimer to send OTP.";

export function TermsAccept({
  checked,
  onChange,
  className,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  className?: string;
}) {
  return (
    <label className={cn("mt-3 flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-ink", className)}>
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 shrink-0 accent-navy"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span>
        I accept the{" "}
        <Link href="/terms" target="_blank" rel="noreferrer" className="font-semibold text-gold-deep underline">
          Terms
        </Link>
        ,{" "}
        <Link href="/privacy-policy" target="_blank" rel="noreferrer" className="font-semibold text-gold-deep underline">
          Privacy Policy
        </Link>
        , and{" "}
        <Link href="/disclaimer" target="_blank" rel="noreferrer" className="font-semibold text-gold-deep underline">
          Disclaimer
        </Link>
        .
      </span>
    </label>
  );
}
