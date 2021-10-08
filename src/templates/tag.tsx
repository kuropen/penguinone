import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import PostsIndex from "../components/postsIndex"

const format = require('date-format')

const PostsPage: React.FC<PageProps<GatsbyTypes.TagIndexQuery, GatsbyTypes.TagIndexQueryVariables>> = ({data, pageContext}) => {
    const tag: string = pageContext.tag
    const {nodes} = data.allMarkdownRemark

    const articleLinks = nodes.map((node) => {
        const dateObj = node.frontmatter?.date ? new Date(node.frontmatter.date) : new Date()
        const dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)

        return (
            <li key={node.id}>{dateShown} -- <Link to={`/posts/${node.frontmatter?.slug}`}>{node.frontmatter?.title}</Link></li>
        )
    })
    return (
        <Layout pageTitle={tag} parent="/tags">
            <section>
                <div className="prose mx-auto">
                    <h1>{tag}</h1>
                </div>
                <PostsIndex>
                    <ul>
                        {articleLinks}
                    </ul>
                </PostsIndex>
            </section>
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query TagIndex ($tag: String!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
    nodes {
      id
      frontmatter {
        slug
        title
        date
      }
    }
  }
}
`