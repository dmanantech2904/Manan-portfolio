import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        green: { DEFAULT: "#123D33", deep: "#0D2E26" },
        cream: "#F3EADB",
        ivory: "#FBF7EE",
        gold: "#C3A268",
        goldink: "#7A5F28",
        ink: "#17251F",
        char: "#222B28",
      },
      fontFamily: {
        display: ['"Bebas Neue"', "Impact", "sans-serif"],
        sans: ['"DM Sans Variable"', "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
