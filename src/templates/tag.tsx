import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import ArticleList from "../components/articleList"

const format = require('date-format')

const PostsPage: React.FC<PageProps<GatsbyTypes.TagIndexQuery, GatsbyTypes.TagIndexQueryVariables>> = ({data, pageContext}) => {
    const intl = useIntl()
    const tag: string = pageContext.tag || ''
    const pageTitle = `${intl.formatMessage({id: 'tag'})}: ${tag}`

    return (
        <Layout pageTitle={pageTitle} parent="/tags">
            <ArticleList title={pageTitle} data={data} />
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query TagIndex($language: String, $tag: String) {
  allMarkdownRemark(
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {tags: {in: [$tag]}, type: {eq: "posts"}, lang: {eq: $language}}}
  ) {
    nodes {
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