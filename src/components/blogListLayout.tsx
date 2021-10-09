import * as React from "react"
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import tw from "tailwind-styled-components"
import BlogLayout, { BlogLayoutProps } from "./blogLayout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// TODO replace
const format = require('date-format')

type BlogDataSource = ReadonlyArray<{
    readonly id: string
    frontmatter?: Pick<GatsbyTypes.MarkdownRemarkFrontmatter, "slug" | "title" | "date" | "image">
}>

interface BlogListLayoutProps extends BlogLayoutProps {
    blogData: BlogDataSource
}

const ArticleLinkListBox = tw.nav`grid grid-cols-1 md:grid-cols-2 gap-4`
const ArticleLinkBox = tw(Link)`card max-w-sm shadow-xl`
const ArticleLinkCardBody = tw.div`card-body`
const ArticleLinkCardTitle = tw.div`card-title`
const ArticleLinkCardFigure = tw.figure`aspect-w-15 aspect-h-8`
const DummyFigureBox = tw.div`glass aspect-w-15 aspect-h-8 flex`
const DummyFigureText = tw.p`text-xl text-center w-auto h-7 my-auto`

const BlogListLayout: React.FC<BlogListLayoutProps> = (props) => {
    const intl = useIntl()

    const nodes = props.blogData

    let fallbackInfo = null
    if (intl.locale !== 'ja') {
        fallbackInfo = (<div className="alert alert-info"><FormattedMessage id="notesLocale" /></div>)
    }
    const articleLinks = nodes.map((node) => {
        const dateObj = node.frontmatter?.date ? new Date(node.frontmatter.date) : new Date()
        const dateShown = (<span>{format('yyyy/MM/dd', dateObj)}</span>)
        console.log(node.frontmatter)
        const figure = node.frontmatter?.image ? (
            <ArticleLinkCardFigure>
                {/* @ts-ignore */}
                <GatsbyImage image={getImage(node.frontmatter?.image)} />
            </ArticleLinkCardFigure>
        ) : (
            <DummyFigureBox><DummyFigureText>No Image</DummyFigureText></DummyFigureBox>
        )

        return (
            <ArticleLinkBox to={`/posts/${node?.frontmatter?.slug}`} key={node.id}>
                {figure}
                <ArticleLinkCardBody>
                    <ArticleLinkCardTitle>{node.frontmatter?.title}</ArticleLinkCardTitle>
                    {dateShown}
                </ArticleLinkCardBody>
            </ArticleLinkBox>
        )
    })
    return (
        <BlogLayout {...props}>
            <ArticleLinkListBox>
                {articleLinks}
            </ArticleLinkListBox>
        </BlogLayout>
    )
}

export default BlogListLayout
