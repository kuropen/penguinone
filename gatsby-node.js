exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
            id
            frontmatter {
                slug
                tags
                type
            }
        }
      }
    }
  `)
  const allTags = []
  data.allMarkdownRemark.nodes.forEach(node => {
    const {type, slug, tags} = node.frontmatter
    let fullPath = slug
    if (type === 'posts') {
        fullPath = `posts/${slug}`
    }
    actions.createPage({
      path: fullPath,
      component: require.resolve(`./src/templates/md_page.js`),
      context: { id: node.id },
    })
    if (tags) {
      tags.forEach((val) => allTags.push(val))
    }
  })
  allTags.forEach(tag => {
    actions.createPage({
      path: `tags/${tag}`,
      component: require.resolve(`./src/templates/tag.js`),
      context: { tag: tag }
    })
  })
}