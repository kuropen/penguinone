import * as React from "react"
import Layout from "../components/layout"
import { graphql, PageProps } from 'gatsby'
import ProfileCard from "../components/profileCard"
import ArticleList from "../components/articleList"

// markup
const IndexPage: React.FC<PageProps<GatsbyTypes.IndexQuery>> = ({data}) => {

  return (
    <Layout hideMenu={true}>
      <ProfileCard />
      <ArticleList data={data} limit={6} withMoreLink={true} />
    </Layout>
  )
}

export const query = graphql`
query Index($language: String) {
  allMarkdownRemark(
    filter: {frontmatter: {type: {eq: "posts"}, lang: {eq: $language}}}
    limit: 6
    sort: {order: DESC, fields: frontmatter___date}
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

export default IndexPage
