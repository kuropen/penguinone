import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import ArticleList from "../components/articleList"

const format = require('date-format')

const PostsPage: React.FC<PageProps<GatsbyTypes.PostsIndexQuery>> = ({data}) => {
    const intl = useIntl()
    return (
        <Layout pageTitle={intl.formatMessage({id: 'blogArticles'})}>
            <ArticleList data={data} />
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query PostsIndex($language: String) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
      filter: {frontmatter: {type: {eq: "posts"}, lang: {eq: $language}}}
    ) {
    nodes {
      id
      frontmatter {
        slug
        title
        date
        image {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1.9, transformOptions: {fit: CONTAIN})
          }
        }
        lang
      }
    }
  }
}
`