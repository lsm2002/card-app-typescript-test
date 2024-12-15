function includeOpacity(cssVariable) {
  return `rgb(var(${cssVariable})/ var(--tw-bg-opacity, 1))`;
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: includeOpacity("--primary"),
        card: includeOpacity("--card"),
        border: includeOpacity("--border"),
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
