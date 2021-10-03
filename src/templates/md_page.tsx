import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { SRLWrapper } from 'simple-react-lightbox'
import { Link, FormattedMessage } from "gatsby-plugin-react-intl"
import { Alert, Paper, Typography, Box, Chip, Button, List, ListItem, ListItemAvatar, Avatar, ListItemText, Link as MUILink } from "@mui/material"
import MDContent from "../components/mdContent"
import TodayIcon from '@mui/icons-material/Today'
import TagIcon from '@mui/icons-material/Tag'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { NoPhotographyTwoTone } from "@mui/icons-material"

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
    const ogpBucket = data.site?.siteMetadata?.ogpBucket || ''
    const dateObj = date ? new Date(date) : new Date()

    let dateShown = null
    if (showDate) {
      dateShown = (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <TodayIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={format('yyyy/MM/dd', dateObj)} />
        </ListItem>
      )
    }

    let tagList = null
    if (tags) {
      const tagListInner = tags.map((tag) => {
        return (
          <span>
            <Chip key={tag} label={tag} component={Link} to={`/tags/${tag}`} clickable />&nbsp;
          </span>
        )
      })
      tagList = (
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <TagIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText>
            {tagListInner}
          </ListItemText>
        </ListItem>
      )
    }

    // TODO conditional generation for another license
    const copyright = (
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CopyrightIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          <MUILink rel='license' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'><FormattedMessage id="ccLicense" /></MUILink>
        </ListItemText>
      </ListItem>
    )

    let returnAnchor = null
    let parent = (type === 'posts' ? '/posts' : null)
    if (frontmatter.parent) {
      parent = frontmatter.parent
    }
    if (parent) {
      const returnMessage = (type === 'posts') ? <FormattedMessage id="returnArticleList" /> : <FormattedMessage id="returnPreviousPage" />
      returnAnchor = (
        <Box sx={{m: 1}}>
          <Button component={Link} to={parent} startIcon={<ArrowBackIcon />}>{returnMessage}</Button>
        </Box>
      )
    }

    let pageImage = `${ogpBucket}/${slug}_${lang}.png`

    let ogpSlug = (type === 'posts' ? `posts/${slug}` : slug)
    
    let fallbackInfo = null
    if (fallbacked) {
      fallbackInfo = (<Paper sx={{m: 1}}><Alert severity="warning"><FormattedMessage id="notTranslated" /></Alert></Paper>)
    }

    let metaDataList = <React.Fragment />
    const metaDataContents = [dateShown, tagList, copyright]
    if (metaDataContents.filter((element) => (element !== null)).length > 0) {
      metaDataList = (
        <List sx={{width: '100%'}}>
          {metaDataContents}
        </List>
      )
    }

    return (
        <Layout key={id} pageTitle={title} parent={parent} pageDescription={excerpt} pageSlug={ogpSlug} pageImage={pageImage}>
            {returnAnchor}
            {fallbackInfo}
            <Box component="section">
              <Paper sx={{m: 1, p: 2}}>
                  <Typography component="h2" variant="h4">{title}</Typography>
                  {metaDataList}
              </Paper>
              <Paper sx={{m: 1, p: 2}}>
                  <SRLWrapper>
                    {/* @ts-ignore */}
                    <MDContent>
                      <article dangerouslySetInnerHTML={{__html: html || ''}} />
                    </MDContent>
                  </SRLWrapper>
              </Paper>
            </Box>
            {returnAnchor}
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
