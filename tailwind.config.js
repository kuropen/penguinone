const defaultTheme = require('tailwindcss/defaultTheme')

/**
 * Generate font set for this site.
 * Method:
 * 1. Remove 'ui-sans-serif' and 'system-ui' on top of Tailwind's definition.
 *    This leads the Meiryo UI preferred in Japanese environment,
 *    but this affects the layout because Meiryo UI is narrow-width.
 * 2. Add Japanese font AFTER Western-European font definition.
 * 3. Finally, 'sans-serif' and Emoji fonts added.
 * @param {array} baseFontFamily
 * @return array
 */
const generateFontFamilyArray = (baseFontFamily) => {
  const japaneseFonts = [
    '"Hiragino Sans"',
    '"Hiragino Kaku Gothic ProN"',
    '"Meiryo"'
  ];
  const baseFontFamilyWithoutUi = baseFontFamily.filter(element => element !== 'ui-sans-serif' && element !== 'system-ui');
  const sansSerifPos = baseFontFamilyWithoutUi.findIndex(element => element === 'sans-serif');
  const westernFonts = baseFontFamilyWithoutUi.slice(0, sansSerifPos);
  const emojis = baseFontFamilyWithoutUi.slice(sansSerifPos);
  const fontFamilyArray = Array.from(westernFonts).concat(japaneseFonts, emojis);
  // console.log(fontFamilyArray);
  return fontFamilyArray;
}

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      'fontFamily': {
        sans: generateFontFamilyArray(defaultTheme.fontFamily.sans)
      },
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
