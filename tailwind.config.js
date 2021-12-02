module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        DEFAULT: 'var(--color-fg-default)',
        muted: 'var(--color-fg-muted)',
      },
      borderColor: (theme) => ({
        DEFAULT: 'var(--color-border-default)',
        muted: 'var(--color-border-muted)',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
