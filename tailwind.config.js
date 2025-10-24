import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        bullish: "#10B981",
        bearish: "#EF4444",
        neutral: "#6B7280",
        background: "#F9FAFB",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
});