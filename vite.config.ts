import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(root, "src"),
            "next/link": path.resolve(root, "src/compat/next-link.tsx"),
            "next/navigation": path.resolve(root, "src/compat/next-navigation.ts"),
        },
    },
    server: {
        // 5173 (Vite's default) — relaycore's own backend already owns :3000, and its
        // CORS allowlist is keyed to 5173 for local dev. The app calls the API directly
        // (VITE_API_BASE_URL) over CORS rather than through a dev proxy.
        port: 5173,
    },
});
