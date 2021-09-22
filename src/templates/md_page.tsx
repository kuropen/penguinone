import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link, PageProps } from 'gatsby'
import { SRLWrapper } from 'simple-react-lightbox'

const format = require('date-format')

const mdPage: React.FC<PageProps<GatsbyTypes.MakeMDPageQuery>> = ({data}) => {
    const doc = data.markdownRemark
    if (!doc) {
      return null
    }
    const {frontmatter, html, id, excerpt} = doc
    if (!frontmatter) {
      return null
    }
    const {type, title, date, showDate, slug, tags} = frontmatter
    if (!data.site?.siteMetadata) {
      return null
    }
    const siteUrl = data.site?.siteMetadata?.siteUrl || ''
    const ogpBucket = data.site?.siteMetadata?.ogpBucket || ''
    const dateObj = date ? new Date(date) : new Date()
    let dateShown = null
    if (showDate) {
        dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)
    }
    let tagList = null
    if (tags) {
      const tagListInner = tags.map((tag) => {
        return (
          <span key={tag}><Link to={`/tags/${tag}`}>{tag}</Link></span>
        )
      })
      tagList = (
        <nav className="tags">{tagListInner}</nav>
      )
    }

    let parent = (type === 'posts' ? '/posts' : null)
    if (frontmatter.parent) {
      parent = frontmatter.parent
    }

    let pageImage = `${ogpBucket}/${slug}.png`

    let ogpSlug = (type === 'posts' ? `posts/${slug}` : slug)

    return (
        <Layout pageTitle={title} parent={parent} pageDescription={excerpt} pageSlug={ogpSlug} pageImage={pageImage}>
            <section className="prose mx-auto" key={id}>
                <h1>{title}</h1>
                {dateShown}
                {tagList}
                <SRLWrapper>
                  <article dangerouslySetInnerHTML={{__html: html || ''}} />
                </SRLWrapper>
            </section>
        </Layout>
    )
}

export const query = graphql`
  query MakeMDPage ($id: String!) {
    markdownRemark(id: {eq: $id}) {
      id
      frontmatter {
        slug
        type
        date
        showDate
        title
        parent
        image {
          childImageSharp {
            fixed {
              src
            }
            gatsbyImageData(layout: FIXED, width: 590)
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
        ogpBucket
      }
    }
  }
`

export default mdPage
