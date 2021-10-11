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
import { PageWithListLayout, TypePageListBox, TypePageList, TypePageListTitle, Divider, SectionBox, generateTypePageList } from "../components/subPageLayout"

const mdPageAbout: React.FC<PageProps<GatsbyTypes.MakeAboutPageQuery>> = ({data}) => {
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
    const {title, slug, lang} = frontmatter
    if (!data.site?.siteMetadata) {
      return null
    }
    const ogpBucket = data.site?.siteMetadata?.ogpBucket || ''

    let pageImage = `${ogpBucket}/${slug}_${lang}.png`

    let fallbackInfo = null
    if (fallbacked) {
      const FallbackAlert = tw.div`alert alert-info`
      fallbackInfo = (<FallbackAlert><FormattedMessage id="notTranslated" /></FallbackAlert>)
    }

    const typePages = generateTypePageList(data.allMarkdownRemark.nodes, slug || '')

    return (
        <Layout pageTitle={title} pageDescription={excerpt} pageSlug={slug} pageImage={pageImage}>
          <PageWithListLayout>
            <TypePageListBox>
              <TypePageList>
                <TypePageListTitle><span><FormattedMessage id="siteinfo" /></span></TypePageListTitle>
                {typePages}
              </TypePageList>
            </TypePageListBox>
            <Divider />
            <SectionBox key={id}>
              <h2>{title}</h2>
              {fallbackInfo}
              <SRLWrapper>
                <article dangerouslySetInnerHTML={{__html: html || ''}} />
              </SRLWrapper>
            </SectionBox>
          </PageWithListLayout>
        </Layout>
    )
}

export const query = graphql`
  query MakeAboutPage ($slug: String!, $language: String!) {
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "about"}, lang: {eq: $language}}}
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
      }
    }
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

export default mdPageAbout
