"use client";

import { Palette } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import {
    applyCustomHex,
    applyTheme,
    bootTheme,
    getSavedHex,
    getTheme,
    hexToHsl,
    hslToHex,
    normalizeHex,
    readSavedThemeId,
    type ThemeId,
    themes,
} from "@/lib/theme";

export function ThemeBoot() {
    useLayoutEffect(() => {
        bootTheme();
    }, []);
    return null;
}

export function ThemeSwitcher({ className }: { className?: string }) {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState<ThemeId>("pine");
    const [hex, setHex] = useState("#0d3b3f");
    const [hexDraft, setHexDraft] = useState("#0d3b3f");
    const box = useRef<HTMLDivElement>(null);

    function syncFromHex(next: string, preset?: ThemeId) {
        const clean = normalizeHex(next);
        if (!clean) return;
        setHex(clean);
        setHexDraft(clean);
        if (preset && preset !== "custom") {
            applyTheme(preset);
            setActive(preset);
            return;
        }
        applyCustomHex(clean);
        setActive("custom");
    }

    useLayoutEffect(() => {
        const id = readSavedThemeId();
        const saved = getSavedHex();
        setActive(id);
        setHex(saved);
        setHexDraft(saved);
    }, []);

    useEffect(() => {
        function onDoc(e: MouseEvent) {
            const el = e.target as HTMLElement | null;
            if (box.current?.contains(el)) return;
            if (el?.closest?.("input[type='color']")) return;
            setOpen(false);
        }
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    const hsl = hexToHsl(hex);
    const current = active === "custom" ? { name: "Custom", navy: hex } : getTheme(active);

    return (
        <div className={cn("relative", className)} ref={box}>
            <button
                aria-expanded={open}
                aria-label="Change site colour"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white shadow-sm sm:h-11 sm:w-11"
                onClick={() => setOpen((v) => !v)}
                type="button"
            >
                <span className="relative grid h-5 w-5 place-items-center">
                    <span className="h-5 w-5 rounded-full" style={{ background: hex }} />
                    <Palette className="absolute h-3 w-3 text-white" strokeWidth={2.4} />
                </span>
            </button>
            {open && (
                <div className="absolute right-0 top-full z-[80] mt-2 w-[min(260px,calc(100vw-1.5rem))] rounded-2xl border border-line bg-white p-3 shadow-lift max-sm:fixed max-sm:left-3 max-sm:right-3 max-sm:top-[3.6rem] max-sm:mt-0 max-sm:w-auto">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Presets</p>
                    <div className="grid grid-cols-6 gap-1.5">
                        {themes.map((t) => (
                            <button
                                className={cn(
                                    "h-7 w-7 rounded-full border border-black/10 transition hover:scale-105",
                                    active === t.id && "ring-2 ring-navy ring-offset-1",
                                )}
                                key={t.id}
                                onClick={() => syncFromHex(t.navy, t.id)}
                                style={{ background: t.navy }}
                                title={t.name}
                                type="button"
                            />
                        ))}
                    </div>

                    <p className="mb-2 mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                        Your colour
                    </p>
                    <div className="flex items-center gap-2">
                        <label className="relative h-9 w-9 shrink-0 cursor-pointer overflow-hidden rounded-full border border-line">
                            <input
                                aria-label="Pick any colour"
                                className="absolute inset-[-8px] h-[calc(100%+16px)] w-[calc(100%+16px)] cursor-pointer"
                                onChange={(e) => syncFromHex(e.target.value)}
                                type="color"
                                value={hex}
                            />
                        </label>
                        <input
                            className="input h-9 py-0 font-mono text-sm uppercase"
                            maxLength={7}
                            onBlur={() => setHexDraft(hex)}
                            onChange={(e) => {
                                const v = e.target.value;
                                setHexDraft(v);
                                const clean = normalizeHex(v);
                                if (clean) syncFromHex(clean);
                            }}
                            spellCheck={false}
                            value={hexDraft}
                        />
                    </div>

                    <label className="mt-3 block">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Hue
                        </span>
                        <input
                            className="theme-scale theme-scale-hue"
                            max={360}
                            min={0}
                            onChange={(e) => syncFromHex(hslToHex(Number(e.target.value), hsl.s, hsl.l))}
                            type="range"
                            value={hsl.h}
                        />
                    </label>
                    <label className="mt-2 block">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Saturation
                        </span>
                        <input
                            className="theme-scale"
                            max={90}
                            min={8}
                            onChange={(e) => syncFromHex(hslToHex(hsl.h, Number(e.target.value), hsl.l))}
                            style={{
                                background: `linear-gradient(90deg, ${hslToHex(hsl.h, 8, hsl.l)}, ${hslToHex(hsl.h, 90, hsl.l)})`,
                            }}
                            type="range"
                            value={hsl.s}
                        />
                    </label>
                    <label className="mt-2 block">
                        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                            Lightness
                        </span>
                        <input
                            className="theme-scale"
                            max={55}
                            min={8}
                            onChange={(e) => syncFromHex(hslToHex(hsl.h, hsl.s, Number(e.target.value)))}
                            style={{
                                background: `linear-gradient(90deg, ${hslToHex(hsl.h, hsl.s, 8)}, ${hslToHex(hsl.h, hsl.s, 55)})`,
                            }}
                            type="range"
                            value={hsl.l}
                        />
                    </label>
                    <p className="mt-2 text-center text-xs font-medium text-navy">{current.name}</p>
                </div>
            )}
        </div>
    );
}
