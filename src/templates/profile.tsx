import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { SRLWrapper } from 'simple-react-lightbox'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import tw from "tailwind-styled-components"
import { StaticImage } from "gatsby-plugin-image"

const mdPageProfile: React.FC<PageProps<GatsbyTypes.MakeAboutPageQuery>> = ({data}) => {
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

    const TypePageList = tw.ul`menu items-stretch px-3 shadow-lg rounded-box`
    const TypePageListTitle = tw.li`menu-title`
    const typePages = data.allMarkdownRemark.nodes.map((node) => {
      return (
        <li className={node.frontmatter?.slug === slug ? 'bordered' : ''} key={node.frontmatter?.slug}>
          <Link to={`/${node.frontmatter?.slug}`}>{node.frontmatter?.title}</Link>
        </li>
      )
    })
    const TypePageListBox = tw.nav`md:flex-none mr-2 md:w-56`
    const PageWithListLayout = tw.div`mx-auto md:w-max md:flex`
    const SectionBox = tw.section`md:flex-1 prose`
    const Divider = tw.div`divider w-full md:hidden`

    const KuropenBox = tw.figure`text-center rounded-box shadow-lg mb-2 p-4 bg-gradient-to-br from-green-400 to-indigo-400 dark:from-green-700 dark:to-indigo-800`
    const PenguinBox = tw.div`avatar`
    const PenguinImage = tw.div`mask mask-squircle`
    const NamePlate = tw.figcaption`mt-2 text-lg`

    return (
        <Layout pageTitle={title} pageDescription={excerpt} pageSlug={slug} pageImage={pageImage}>
          <PageWithListLayout>
            <TypePageListBox>
              <KuropenBox>
                <PenguinBox>
                  <PenguinImage>
                    <StaticImage src="../images/penguin.png" alt="" width={64} height={64} />
                  </PenguinImage>
                </PenguinBox>
                <NamePlate>Kuropen</NamePlate>
              </KuropenBox>
              <TypePageList>
                <TypePageListTitle><span><FormattedMessage id="profile" /></span></TypePageListTitle>
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
  query MakeProfilePage ($slug: String!, $language: String!) {
    allMarkdownRemark(
      filter: {frontmatter: {type: {eq: "profile"}, lang: {eq: $language}}}
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

export default mdPageProfile
