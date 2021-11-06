/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')

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
    }
    let typeTemplate = `./src/templates/${type}.tsx`
    const isTypeTemplateAvailable = fs.existsSync(path.resolve(typeTemplate))
    if (!isTypeTemplateAvailable) {
      typeTemplate = `./src/templates/md_page.tsx`
    }
    createPage({
      path: fullPath,
      component: require.resolve(typeTemplate),
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
  })
}