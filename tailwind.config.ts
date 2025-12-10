import type { Config } from "tailwindcss"

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "#050505",
                foreground: "#fafafa",
                card: "#0a0a0a",
                border: "#1a1a1a",
                primary: {
                    DEFAULT: "#3b82f6",
                    dark: "#60a5fa",
                },
                secondary: {
                    DEFAULT: "#8b5cf6",
                },
                accent: {
                    DEFAULT: "#f59e0b",
                },
                muted: {
                    DEFAULT: "#171717",
                    foreground: "#a3a3a3",
                },
            },
            fontFamily: {
                sans: ["Outfit", "sans-serif"],
                mono: ["JetBrains Mono", "monospace"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out",
                "slide-up": "slideUp 0.6s ease-out",
                "float": "float 6s ease-in-out infinite",
                "glow-pulse": "glowPulse 4s ease-in-out infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { transform: "translateY(30px)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                glowPulse: {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "0.8" },
                },
            },
        },
    },
    plugins: [],
}

export default config
