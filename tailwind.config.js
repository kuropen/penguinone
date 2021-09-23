module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: '#F3F4F6',
            a: {
              color: '#F3F4F6',
              '&:hover': {
                color: '#F3F4F6',
              },
            },
            h1: {
              color: '#F3F4F6',
              fontSize: '1.5rem',
            },
            h2: {
              color: '#F3F4F6',
            },
            h3: {
              color: '#F3F4F6',
            },
            h4: {
              color: '#F3F4F6',
            },
            blockquote: {
              color: '#F3F4F6',
            },
            strong: {
              color: '#F3F4F6',
            },
          },
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
