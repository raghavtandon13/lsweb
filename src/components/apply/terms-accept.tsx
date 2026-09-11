import Link from "next/link";
import { cn } from "@/lib/cn";

export const TERMS_REQUIRED_MESSAGE = "Accept the Terms, Privacy Policy, and Disclaimer to send OTP.";

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
                checked={checked}
                className="mt-1 h-4 w-4 shrink-0 accent-navy"
                onChange={(e) => onChange(e.target.checked)}
                type="checkbox"
            />
            <span>
                I accept the{" "}
                <Link className="font-semibold text-gold-deep underline" href="/terms" rel="noreferrer" target="_blank">
                    Terms
                </Link>
                ,{" "}
                <Link
                    className="font-semibold text-gold-deep underline"
                    href="/privacy-policy"
                    rel="noreferrer"
                    target="_blank"
                >
                    Privacy Policy
                </Link>
                , and{" "}
                <Link
                    className="font-semibold text-gold-deep underline"
                    href="/disclaimer"
                    rel="noreferrer"
                    target="_blank"
                >
                    Disclaimer
                </Link>
                .
            </span>
        </label>
    );
}
