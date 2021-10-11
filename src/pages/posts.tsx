/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import BlogListLayout from "../components/blogListLayout"

const format = require('date-format')

const PostsPage: React.FC<PageProps<GatsbyTypes.PostsIndexQuery>> = ({data}) => {
    const {nodes} = data.allMarkdownRemark

    return (
        <Layout pageTitle="My Note">
            {/* @ts-ignore */}
            <BlogListLayout tagData={data.allSitePage.edges} blogData={nodes} currentPath="posts" />
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query PostsIndex {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}
      filter: {frontmatter: {type: {eq: "posts"}}}
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