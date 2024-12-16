module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT:  'rgb(var(--primary))',
          light: 'rgb(var(--primary-light))',
          text: 'rgb(var(--primary-text))',
        },
        card: {
          DEFAULT:  'rgb(var(--card))',
          text: 'rgb(var(--card-text))',
          shadow: 'rgb(var(--card-shadow))',
        },
        background: {
          DEFAULT:  'rgb(var(--background))',
          text: 'rgb(var(--background-text))',
        },
        button: {
          DEFAULT:  'rgb(var(--button))',
          hover: 'rgb(var(--button-hover))',
          text: 'rgb(var(--button-text))',
          colored: {
            DEFAULT: 'rgb(var(--primary-light))',
            text: 'rgb(var(--primary-text))',
            hover: 'rgb(var(--primary))',
          },
          negative: {
            DEFAULT: 'rgb(var(--negative-light))',
            text: 'rgb(var(--negative-text))',
            hover: 'rgb(var(--negative))',
          },
        },
        input: {
          DEFAULT: 'rgb(var(--input))',
          text: 'rgb(var(--input-text))',
          placeholder: 'rgb(var(--input-placeholder))',
        },
      },
    },
  },
  plugins: [],
  darkMode: "selector",
};
