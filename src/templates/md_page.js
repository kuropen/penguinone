import * as React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import { SRLWrapper } from 'simple-react-lightbox'

const format = require('date-format')

const mdPage = ({data}) => {
    const doc = data.markdownRemark
    if (!doc) {
        return null
    }
    const {frontmatter, html, id, excerpt} = doc
    const {type, title, date, showDate, slug} = frontmatter
    const {siteUrl} = data.site.siteMetadata
    const dateObj = new Date(date)
    let dateShown = null
    if (showDate) {
        dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)
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

    return (
        <Layout pageTitle={title} parent={parent} pageDescription={excerpt} pageSlug={slug} pageImage={pageImage}>
            <section className="prose mx-auto" key={id}>
                <h1>{title}</h1>
                {dateShown}
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
