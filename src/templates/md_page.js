import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from 'gatsby'
import { SRLWrapper } from 'simple-react-lightbox'

const format = require('date-format')

const mdPage = ({data}) => {
    const doc = data.markdownRemark
    if (!doc) {
        return null
    }
    const {frontmatter, html, id, excerpt} = doc
    const {type, title, date, showDate, slug, tags} = frontmatter
    const {siteUrl} = data.site.siteMetadata
    const dateObj = new Date(date)
    let dateShown = null
    if (showDate) {
        dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)
    }
    let tagList = null
    if (tags) {
      const tagListInner = tags.map((tag) => {
        return (
          <span><Link to={`/tags/${tag}`}>{tag}</Link></span>
        )
      })
      tagList = (
        <nav className="tags">{tagListInner}</nav>
      )
    }

    let parent = (type === 'posts' ? '/posts' : null)
    if (frontmatter.parent !== null) {
      parent = frontmatter.parent
    }

    let pageImage = null
    if (frontmatter.image !== null) {
      if (frontmatter.image.childImageSharp !== null) {
        pageImage = siteUrl + "/" + frontmatter.image.childImageSharp.fluid.src.substring(1)
      } else {
        pageImage = frontmatter.image
      }
    }

    let ogpSlug = (type === 'posts' ? `posts/${slug}` : slug)

    return (
        <Layout pageTitle={title} parent={parent} pageDescription={excerpt} pageSlug={ogpSlug} pageImage={pageImage}>
            <section className="prose mx-auto" key={id}>
                <h1>{title}</h1>
                {dateShown}
                {tagList}
                <SRLWrapper>
                  <article dangerouslySetInnerHTML={{__html: html}} />
                </SRLWrapper>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query MakeMDPageQuery ($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        slug
        type
        date
        showDate
        title
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              src
            }
          }
        }
        tags
      }
      html
      excerpt(truncate: true, pruneLength: 80)
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`

export default mdPage
