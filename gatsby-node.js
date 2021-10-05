const fs = require('fs/promises')

exports.createPages = async function ({ actions, graphql }) {
  const { createRedirect, createPage } = actions
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
            id
            frontmatter {
                slug
                tags
                type
                lang
            }
        }
      }
    }
  `)
  const allTags = []
  data.allMarkdownRemark.nodes.forEach(node => {
    const {type, slug, tags, lang} = node.frontmatter
    let fullPath = slug
    if (type === 'posts') {
      fullPath = `posts/${slug}`
      createRedirect({
        fromPath: `/blog/${slug}`,
        toPath: `/posts/${slug}`
      })
      createRedirect({
        fromPath: `/articles/${slug}`,
        toPath: `/posts/${slug}`
      })
    }
    createPage({
      path: fullPath,
      component: require.resolve(`./src/templates/md_page.tsx`),
      context: { slug: node.frontmatter.slug },
    })
    if (tags) {
      tags.forEach((val) => allTags.push(val))
    }
  })
  allTags.forEach(tag => {
    createPage({
      path: `tags/${tag}`,
      component: require.resolve(`./src/templates/tag.tsx`),
      context: { tag: tag }
    })
    createRedirect({fromPath: `/category/${tag}`, toPath: `/tags/${tag}`})
  })

  const prismicIdJson = await fs.readFile('./prismic_id.json')
  const prismicIds = JSON.parse(prismicIdJson)
  for (const id in prismicIds) {
    createRedirect({
      fromPath: `/blog/${id}`,
      toPath: `/posts/${prismicIds[id]}`
    })
    createRedirect({
      fromPath: `/articles/${id}`,
      toPath: `/posts/${prismicIds[id]}`
    })
  }

  createRedirect({fromPath: '/polaris', toPath: 'https://xiv.kuropen.org/polaris/'})
}