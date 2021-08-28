import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from 'gatsby'

// markup
const IndexPage = ({data}) => {
  const menu = data.site.siteMetadata.menuContent.map((content) => {
    if (content.back) {
      return null
    }
    return (<Link key={content.path} to={content.path}>{content.caption}</Link>)
  })
  return (
    <Layout hideMenu={true}>
      <nav className="index-nav">
        {menu}
      </nav>
    </Layout>
  )
}

export const query = graphql`
query IndexQuery {
  site {
    siteMetadata {
      menuContent {
        caption
        path
        back
      }
    }
  }
}
`

export default IndexPage
