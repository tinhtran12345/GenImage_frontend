import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{html,js}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            screens: {
                xs: "475px",
                ...defaultTheme.screens,
            },
            colors: {
                neutral: colors.slate,
            },
            fontFamily: {
                lato: ["Lato", "sans-serif"],
                roboto: ["Roboto", "sans-serif"],
            },
            animation: {
                text: "text 10s ease infinite",
            },
            keyframes: {
                "0%, 100%": {
                    "background-size": "200% 200%",
                    "background-position": "left center",
                },
                "50%": {
                    "background-size": "200% 200%",
                    "background-position": "right center",
                },
            },
        },
    },
    plugins: [],
};
