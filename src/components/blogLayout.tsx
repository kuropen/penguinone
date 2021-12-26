/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import * as React from "react"
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import { PageWithListLayout, TypePageListBox, TypePageList, TypePageListTitle, generateTypePageList, TypePageListSource } from "../components/subPageLayout"
import tw from "tailwind-styled-components"
import { FiArrowLeft } from "react-icons/fi"

export interface BlogLayoutProps {
    readonly tagData: ReadonlyArray<{
        node: Pick<GatsbyTypes.SitePage, "path">
    }>
    currentPath?: string
}

const BlogLayout: React.FC<BlogLayoutProps> = (props) => {
    const intl = useIntl()
    const typePageListSource: TypePageListSource = [
        {
            frontmatter: {
                slug: 'posts',
                title: intl.formatMessage({id: 'allArticles'})
            }
        }
    ]
    props.tagData.forEach((edge) => {
        const tagName = edge.node.path.split('/')[2]
        if (tagName == "") {
            return
        }
        typePageListSource.push({
            frontmatter: {
                slug: `tags/${tagName}`,
                title: tagName
            }
        })
    })
    const typePages = generateTypePageList(typePageListSource, props.currentPath || '')

    const MobileHidden = tw.div`hidden md:block`
    const MobileShown = tw.div`md:hidden`
    const BlogPageLayout = tw(PageWithListLayout)`md:flex-row-reverse`
    const BackBtn = tw(Link)`btn btn-block`

    return (
        <BlogPageLayout>
            <div>
                {props.children}
            </div>
            <MobileHidden>
                <TypePageListBox>
                    <TypePageList>
                        <TypePageListTitle>
                            <span>
                                <FormattedMessage id="tagList" />
                            </span>
                        </TypePageListTitle>
                        {typePages}
                    </TypePageList>
                </TypePageListBox>
            </MobileHidden>
            { props.currentPath === 'posts' ? null :
                <MobileShown>
                    <BackBtn to="/posts">
                        <FiArrowLeft />
                        <FormattedMessage id="backToArticles" />
                    </BackBtn>
                </MobileShown>
            }
        </BlogPageLayout>
    )
}

export default BlogLayout
