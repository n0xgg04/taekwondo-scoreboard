/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#1a2034",
                "blue-end": "#302380",
                "blue-start": "#6443fd",
                "red-end": "#9e2433",
                "red-start": "#cd2223",
                "blue-zone": "#a998ff",
                "red-zone": "#fc3f3b",
                round: "#e1fea6",
            },
            fontFamily: {
                default: ["DM Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
}
