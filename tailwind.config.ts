import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Palette: Primary #0F766E, Accent #14B8A6, Background #F8FAFC, Text #0F172A.
        // brand.dark/light and muted aren't in that 4-color list — they're
        // derived teal/slate companions for hover states, pale-wash
        // backgrounds, and secondary text, since the app needs those roles
        // and the given palette didn't specify them. Swap the hex values
        // below directly to restyle site-wide — every file references these
        // names, never a raw hex.
        brand: {
          DEFAULT: "#0F766E", // Primary
          dark: "#115E59",    // derived — darker teal, hover state
          light: "#F0FDFA",   // derived — pale teal, wash backgrounds
        },
        accent: "#14B8A6",     // Accent — defined, not yet applied anywhere (see chat)
        background: "#F8FAFC", // Background
        ink: "#0F172A",         // Text
        muted: "#64748B",      // derived — secondary/muted text
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
