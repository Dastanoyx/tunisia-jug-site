import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            borderColor: {
                border: "var(--border)",
            },
            outlineColor: {
                ring: "var(--ring)",
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                border: "var(--border)",
                ring: "var(--ring)",
            },
        },
    },
    plugins: [],
};

export default config;
