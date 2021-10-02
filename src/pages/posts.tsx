import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"

const format = require('date-format')

const PostsPage: React.FC<PageProps<GatsbyTypes.PostsIndexQuery>> = ({data}) => {
    const {nodes} = data.allMarkdownRemark

    const articleLinks = nodes.map((node) => {
        const dateObj = node.frontmatter?.date ? new Date(node.frontmatter.date) : new Date()
        const dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)

        return (
            <li key={node.id}>{dateShown} -- <Link to={`/posts/${node?.frontmatter?.slug}`}>{node?.frontmatter?.title}</Link></li>
        )
    })
    return (
        <Layout pageTitle="My Note">
            <section>
                <div className="prose mx-auto">
                    <h1>My Note</h1>
                    <article>
                        <p>Kuropenの個人ブログへようこそ。扱っているテーマは技術・社会・ガジェットなど多岐に亘っています。</p>
                        <p>このブログの内容は原則として、<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">クリエイティブ・コモンズ 表示 - 非営利 - 継承 4.0 国際 ライセンス</a>により利用できます。</p>
                        <p><Link to="/tags">タグ一覧</Link></p>
                    </article>
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
      }
    }
  }
}
`