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
  ],
};