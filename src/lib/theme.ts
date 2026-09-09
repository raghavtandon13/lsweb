const THEME_KEY = "loansparrow.theme";
const THEME_HEX_KEY = "loansparrow.theme.hex";

export type ThemeId =
  | "pine"
  | "teal"
  | "ocean"
  | "marine"
  | "ink"
  | "indigo"
  | "slate"
  | "forest"
  | "wine"
  | "cocoa"
  | "olive"
  | "plum"
  | "custom";

export type Theme = {
  id: ThemeId;
  name: string;
  navy: string;
  navySoft: string;
  gold: string;
  goldDeep: string;
  goldWash: string;
  sage: string;
  ivory: string;
  line: string;
  rgb: string;
};

export type Hsl = { h: number; s: number; l: number };

function hexToRgb(hex: string) {
  const h = normalizeHex(hex)?.replace("#", "") ?? "0d3b3f";
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)] as const;
}

export function normalizeHex(input: string): string | null {
  const raw = input.trim().replace("#", "");
  if (/^[0-9a-fA-F]{3}$/.test(raw)) {
    return `#${raw[0]}${raw[0]}${raw[1]}${raw[1]}${raw[2]}${raw[2]}`.toLowerCase();
  }
  if (/^[0-9a-fA-F]{6}$/.test(raw)) return `#${raw.toLowerCase()}`;
  return null;
}

function mix(a: string, b: string, t: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  const c = A.map((v, i) => Math.round(v * (1 - t) + B[i] * t));
  return `#${c.map((n) => n.toString(16).padStart(2, "0")).join("")}`;
}

function darken(hex: string, t: number) {
  return mix(hex, "#000000", t);
}

export function hexToHsl(hex: string): Hsl {
  const [r0, g0, b0] = hexToRgb(hex);
  const r = r0 / 255;
  const g = g0 / 255;
  const b = b0 / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: Math.round(h * 60), s: Math.round(s * 100), l: Math.round(l * 100) };
}

export function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const light = l / 100;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = light - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function makeTheme(id: ThemeId, name: string, navy: string): Theme {
  const hex = normalizeHex(navy) ?? "#0d3b3f";
  return {
    id,
    name,
    navy: hex,
    navySoft: darken(hex, 0.12),
    gold: hex,
    goldDeep: darken(hex, 0.22),
    goldWash: mix("#ffffff", hex, 0.12),
    sage: hex,
    ivory: mix("#ffffff", hex, 0.055),
    line: mix("#d9e0e0", hex, 0.22),
    rgb: hexToRgb(hex).join(", "),
  };
}

export const themes: Theme[] = [
  makeTheme("pine", "Pine", "#0d3b3f"),
  makeTheme("teal", "Teal", "#0f766e"),
  makeTheme("ocean", "Ocean", "#0c4a6e"),
  makeTheme("marine", "Marine", "#1b3a4b"),
  makeTheme("ink", "Ink", "#12263a"),
  makeTheme("indigo", "Indigo", "#2d3a6b"),
  makeTheme("slate", "Slate", "#3d4c54"),
  makeTheme("forest", "Forest", "#1b4332"),
  makeTheme("wine", "Wine", "#6b3040"),
  makeTheme("cocoa", "Cocoa", "#4c3828"),
  makeTheme("olive", "Olive", "#3e4a32"),
  makeTheme("plum", "Plum", "#4a3048"),
];

export const defaultThemeId: ThemeId = "pine";

function paintTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.style.setProperty("--navy", theme.navy);
  root.style.setProperty("--navy-soft", theme.navySoft);
  root.style.setProperty("--gold", theme.gold);
  root.style.setProperty("--gold-deep", theme.goldDeep);
  root.style.setProperty("--gold-wash", theme.goldWash);
  root.style.setProperty("--sage", theme.sage);
  root.style.setProperty("--ivory", theme.ivory);
  root.style.setProperty("--line", theme.line);
  root.style.setProperty("--navy-rgb", theme.rgb);
  root.style.setProperty("--ring", `rgba(${theme.rgb}, 0.16)`);
  root.style.setProperty("--shadow", `0 22px 50px -24px rgba(${theme.rgb}, 0.28)`);
}

export function getSavedHex(): string {
  if (typeof window === "undefined") return themes[0].navy;
  return normalizeHex(localStorage.getItem(THEME_HEX_KEY) ?? "") ?? getTheme(localStorage.getItem(THEME_KEY)).navy;
}

export function getTheme(id?: string | null) {
  if (id === "custom") return makeTheme("custom", "Custom", getSavedHex());
  return themes.find((t) => t.id === id) ?? themes[0];
}

export function applyTheme(id: string) {
  const theme = getTheme(id);
  paintTheme(theme);
  localStorage.setItem(THEME_KEY, theme.id);
  localStorage.setItem(THEME_HEX_KEY, theme.navy);
  return theme;
}

export function applyCustomHex(hex: string) {
  const clean = normalizeHex(hex);
  if (!clean) return getTheme(readSavedThemeId());
  const theme = makeTheme("custom", "Custom", clean);
  paintTheme(theme);
  localStorage.setItem(THEME_KEY, "custom");
  localStorage.setItem(THEME_HEX_KEY, clean);
  return theme;
}

export function bootTheme() {
  if (typeof window === "undefined") return getTheme(defaultThemeId);
  const id = localStorage.getItem(THEME_KEY) ?? defaultThemeId;
  if (id === "custom") return applyCustomHex(getSavedHex());
  return applyTheme(id);
}

export function readSavedThemeId(): ThemeId {
  if (typeof window === "undefined") return defaultThemeId;
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "custom") return "custom";
  return getTheme(saved).id;
}
