exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
            id
            frontmatter {
                slug
                type
                date
                showDate
            }
            html
        }
      }
    }
  `)
  data.allMarkdownRemark.nodes.forEach(node => {
    const {type, slug} = node.frontmatter
    let fullPath = slug
    if (type === 'posts') {
        fullPath = `posts/${slug}`
    }
    console.log(`${slug} (${type})`)
    actions.createPage({
      path: fullPath,
      component: require.resolve(`./src/templates/md_page.js`),
      context: { id: node.id },
    })
  })
}