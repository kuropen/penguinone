/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { SRLWrapper } from 'simple-react-lightbox'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import tw from "tailwind-styled-components"

const format = require('date-format')

const mdPage: React.FC<PageProps<GatsbyTypes.MakeMDPageQuery>> = ({data}) => {
    let doc = data.markdownRemark
    let fallbacked = false
    if (!doc) {
      doc = data.fallbackMd
      fallbacked = true
      if (!doc) {
        return null
      }
    }
    const {frontmatter, html, id, excerpt} = doc
    if (!frontmatter) {
      return null
    }
    const {type, title, date, showDate, slug, tags, lang} = frontmatter
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

    const NavTagSection = tw.span`my-1 mr-2`
    let tagList = null
    if (tags) {
      const tagListInner = tags.map((tag) => {
        return (
          <NavTagSection key={tag}><Link to={`/tags/${tag}`}>{tag}</Link></NavTagSection>
        )
      })
      tagList = (
        <nav className="tags">{tagListInner}</nav>
      )
    }

    let pageImage = `${ogpBucket}/${slug}_${lang}.png`

    let ogpSlug = (type === 'posts' ? `posts/${slug}` : slug)
    
    let fallbackInfo = null
    if (fallbacked) {
      fallbackInfo = (<div className="border rounded m-2 p-2 bg-yellow-300 text-black mb-2"><FormattedMessage id="notTranslated" /></div>)
    }

    return (
        <Layout pageTitle={title} pageDescription={excerpt} pageSlug={ogpSlug} pageImage={pageImage}>
            <section className="prose mx-auto" key={id}>
                {fallbackInfo}
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
  query MakeMDPage ($slug: String!, $language: String!) {
    markdownRemark(frontmatter: {slug: {eq: $slug}, lang: {eq: $language}}) {
      id
      frontmatter {
        slug
        type
        date
        showDate
        title
        image {
          childImageSharp {
            fixed {
              src
            }
            gatsbyImageData(layout: FIXED, width: 590)
          }
        }
        tags
        lang
      }
      html
      excerpt(truncate: true, pruneLength: 80)
    }
    fallbackMd: markdownRemark(frontmatter: {slug: {eq: $slug}}) {
      id
      frontmatter {
        slug
        type
        date
        showDate
        title
        image {
          childImageSharp {
            fixed {
              src
            }
            gatsbyImageData(layout: FIXED, width: 590)
          }
        }
        tags
        lang
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
