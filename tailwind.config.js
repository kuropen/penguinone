/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
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
  purge: {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./content/**/*.md"],
    options: {
      safelist: [
        /data-theme$/,
      ]
    }
  },
  darkMode: 'media',
  theme: {
    extend: {
      'fontFamily': {
        sans: generateFontFamilyArray(defaultTheme.fontFamily.sans)
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui'),
  ],
  daisyui: {
    theme: [
      'light',
      'dark',
    ]
  }
}
