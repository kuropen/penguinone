import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { Link } from "gatsby-plugin-react-intl"
import PostsIndex from "../components/postsIndex"

const PostsPage: React.FC<PageProps<GatsbyTypes.TagListQuery>> = ({data}) => {
    const {edges} = data.allSitePage

    const tagLinks = edges.map((edge) => {
        const tagName = edge.node.path.split('/')[2]
        return (<li key={tagName}><Link to={`/tags/${tagName}`}>{tagName}</Link></li>)
    })

    return (
        <Layout pageTitle="タグ一覧" parent="/posts">
            <section>
                <div className="prose mx-auto">
                    <h1>タグ一覧</h1>
                </div>
                <PostsIndex>
                    <ul>
                        {tagLinks}
                    </ul>
                </PostsIndex>
            </section>
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query TagList {
  allSitePage(filter: {path: {regex: "/^\\/tags/"}}) {
    edges {
      node {
        path
      }
    }
  }
}
`