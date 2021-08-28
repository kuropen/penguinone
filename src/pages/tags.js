import * as React from "react"
import Layout from "../components/layout"
import { graphql, Link } from 'gatsby'

const PostsPage = ({data}) => {
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
                <nav className="posts-index">
                    <ul>
                        {tagLinks}
                    </ul>
                </nav>
            </section>
        </Layout>
    )
}

export default PostsPage

export const query = graphql`
query TagListQuery {
  allSitePage(filter: {path: {regex: "/^\\/tags/"}}) {
    edges {
      node {
        path
      }
    }
  }
}
`