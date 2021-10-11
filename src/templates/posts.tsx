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
import styled from "styled-components"
import tw from "tailwind-styled-components"
import BlogLayout from "../components/blogLayout"
import { getSrc } from "gatsby-plugin-image"
import { FiCalendar, FiTag } from "react-icons/fi"

const format = require('date-format')

const mdPage: React.FC<PageProps<GatsbyTypes.MakePostsPageQuery>> = ({data}) => {
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

    const NavTagLink = tw(Link)`link link-hover`
    const NavTagSection = tw.span`my-1 mr-2`
    const NavTag = tw.nav`inline`
    let tagList = null
    if (tags) {
      const tagListInner = tags.map((tag) => {
        return (
          <NavTagSection key={tag}><NavTagLink to={`/tags/${tag}`}>{tag}</NavTagLink></NavTagSection>
        )
      })
      tagList = (
        <NavTag>{tagListInner}</NavTag>
      )
    }

    let pageImage = `${ogpBucket}/${slug}_${lang}.png`

    let ogpSlug = (type === 'posts' ? `posts/${slug}` : slug)
    
    let fallbackInfo = null
    if (fallbacked) {
      fallbackInfo = (<div className="alert alert-info"><FormattedMessage id="notesLocale" /></div>)
    }

    // @ts-ignore
    const coverImage = doc.frontmatter?.image ? getSrc(doc.frontmatter.image) : null
    const BaseInfobox = coverImage ? styled.section`
      background-image: url(${coverImage}); 
    ` : tw(styled.section`
      background-image: none;
    `)`bg-neutral`
    const InfoBox = tw(BaseInfobox)`hero text-neutral-content rounded-lg aspect-w-15 aspect-h-8 shadow-xl`
    const InfoBoxOverlay = tw.div`hero-overlay rounded-lg bg-opacity-70`
    const InfoBoxContent = tw.div`hero-content rounded-lg flex-col items-stretch justify-end filter drop-shadow-lg`
    const InfoElementBox = tw.div`flex flex-row items-center`
    const InfoElementIcon = tw.span`mr-2`
    const ArticleTitle = tw.h2`text-2xl font-bold`
    const ArticleWrapper = tw.div`p-2 md:p-4 rounded-lg shadow-xl`
    const Article = tw.article`prose mx-auto`

    return (
        <Layout pageTitle={title} pageDescription={excerpt} pageSlug={ogpSlug} pageImage={pageImage}>
          <BlogLayout tagData={data.allSitePage.edges}>
            <InfoBox>
              <InfoBoxOverlay />
              <InfoBoxContent>
                <ArticleTitle>{title}</ArticleTitle>
                <aside>
                  <InfoElementBox><InfoElementIcon><FiCalendar /></InfoElementIcon>{dateShown}</InfoElementBox>
                  <InfoElementBox><InfoElementIcon><FiTag /></InfoElementIcon>{tagList}</InfoElementBox>
                </aside>
              </InfoBoxContent>
            </InfoBox>
            {fallbackInfo}
            <ArticleWrapper key={id}>
              <SRLWrapper>
                <Article dangerouslySetInnerHTML={{__html: html || ''}} />
              </SRLWrapper>
            </ArticleWrapper>
          </BlogLayout>
        </Layout>
    )
}

export const query = graphql`
  query MakePostsPage ($slug: String!, $language: String!) {
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
    allSitePage(filter: {path: {regex: "/^\\/tags/"}}) {
        edges {
            node {
                path
            }
        }
    }
  }
`

export default mdPage
