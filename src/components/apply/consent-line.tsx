"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function ConsentLine({
    id,
    checked,
    onChange,
    label,
    more,
}: {
    id: string;
    checked: boolean;
    onChange: (v: boolean) => void;
    label: string;
    more: string;
}) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-line py-3 last:border-b-0">
            <div className="flex items-start gap-2.5 sm:gap-3">
                <input
                    checked={checked}
                    className="mt-[5px] h-4 w-4 shrink-0 accent-navy"
                    id={id}
                    onChange={(e) => onChange(e.target.checked)}
                    type="checkbox"
                />
                <div className="min-w-0 flex-1">
                    <p className="text-[13px] leading-6 text-navy sm:text-sm">
                        <label className="cursor-pointer" htmlFor={id}>
                            {label}{" "}
                        </label>
                        <button
                            aria-expanded={open}
                            className="inline font-semibold text-spark-gold hover:underline"
                            onClick={() => setOpen((v) => !v)}
                            type="button"
                        >
                            {open ? "Less" : "More"}
                        </button>
                    </p>
                    <p className={cn("mt-1.5 text-xs leading-5 text-muted", !open && "hidden")}>{more}</p>
                </div>
            </div>
        </div>
    );
}
