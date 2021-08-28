import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from 'gatsby'

const format = require('date-format')

const PostsPage = ({data, pageContext}) => {
    const {tag} = pageContext
    const {nodes} = data.allMarkdownRemark

    const articleLinks = nodes.map((node) => {
        const dateObj = new Date(node.frontmatter.date)
        const dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)

        return (
            <li key={node.id}>{dateShown} -- <Link to={`/posts/${node.frontmatter.slug}`}>{node.frontmatter.title}</Link></li>
        )
    })
    return (
        <Layout pageTitle={tag} parent="/tags">
            <section>
                <div className="prose mx-auto">
                    <h1>{tag}</h1>
                </div>
                <nav className="posts-index">
                    <ul>
                        {articleLinks}
                    </ul>
                </nav>
            </section>
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query TagIndexQuery ($tag: String!) {
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