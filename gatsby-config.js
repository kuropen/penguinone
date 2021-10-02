module.exports = {
  siteMetadata: {
    siteUrl: "https://penguinone.kuropen.org",
    title: "Penguinone",
    siteDescription: "Kuropen's Personal Website",
    ogpBucket: "https://ogp-img.kuropen.org",
    menuContent: [
      {
        path: '/about',
        caption: 'where is this',
        back: false,
      },
      {
        path: '/profile',
        caption: 'who I am',
        back: false,
      },
      {
        path: '/posts',
        caption: 'my note',
        back: false,
      },
      {
        path: '/gallery',
        caption: 'my picture',
        back: false,
      },
      {
        path: '/projects',
        caption: 'my project',
        back: false,
      },
      {
        path: '/',
        caption: 'main',
        back: true,
      },
    ]
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "content",
        path: "./content/",
      },
      __key: "content",
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 590,
            },
          },
        ],
      },
    },
    "gatsby-plugin-catch-links",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-typegen",
    "gatsby-plugin-typescript",
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        allPageHeaders: [
          'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload',
          'Permissions-Policy: interest-cohort=()',
        ]
      }
    },
    {
      resolve: `gatsby-plugin-react-intl`,
      options: {
        // language JSON resource path
        path: `${__dirname}/src/i18n/locales`,
        languages: [`en`, `ja`],
        defaultLanguage: `ja`,
        redirect: true,
        redirectDefaultLanguageToRoot: false,
        // paths that you don't want to genereate locale pages, example: ["/dashboard/","/test/**"], string format is from micromatch https://github.com/micromatch/micromatch
        ignoredPaths: [],
        // option to fallback to the defined language instead of the `defaultLanguage` if the user langauge is not in the list
        fallbackLanguage: `en`,
      },
    },
  ],
};
