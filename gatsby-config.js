module.exports = {
  siteMetadata: {
    siteUrl: "https://penguinone.kuropen.org",
    title: "Penguinone",
    siteDescription: "Kuropen's Personal Website",
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
    {
      resolve: 'gatsby-plugin-ackee-tracker',
      options: {
        domainId: '6e443bc6-17e8-44db-8acf-1d8c7a151ed6',
        server: 'https://ackee.kuropen.org',
        ignoreLocalhost: true,
        ignoreOwnVisits: true,
        detailed: false,
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        allPageHeaders: [
          'Strict-Transport-Security: max-age=31536000'
        ]
      }
    }
  ],
};
