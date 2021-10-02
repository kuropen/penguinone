import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"

// markup
const IndexPage: React.FC<PageProps<GatsbyTypes.IndexQuery>> = ({data}) => {
  const menu = data.site?.siteMetadata?.menuContent?.map((content) => {
    if (content?.back) {
      return null
    }
    return (<Link key={content?.path} to={content?.path || ''}>{content?.caption}</Link>)
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
query Index {
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
