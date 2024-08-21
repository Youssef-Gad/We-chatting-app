/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#38C585",
        "light-primary": "#38c586ba",
        "dark-primary": "#2e9f6c",
        "light-gray": "#E9ECEF",
        gray: "#96A1AF",
        "dark-gray": "#39455A",
        warning: "#E75F5F",
      },
    },
  },
  plugins: [],
};
