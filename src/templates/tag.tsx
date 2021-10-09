import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import BlogListLayout from "../components/blogListLayout"

const format = require('date-format')

const PostsPage: React.FC<PageProps<GatsbyTypes.TagIndexQuery, GatsbyTypes.TagIndexQueryVariables>> = ({data, pageContext}) => {
    const tag: string = pageContext.tag
    const {nodes} = data.allMarkdownRemark

    return (
        <Layout pageTitle={tag} parent="/tags">
            {/* @ts-ignore */}
            <BlogListLayout tagData={data.allSitePage.edges} blogData={nodes} currentPath={`tags/${tag}`} />
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
                image {
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
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