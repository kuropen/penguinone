/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { Link } from "gatsby-plugin-react-intl"
import * as React from "react"
import tw from "tailwind-styled-components"

const TypePageList = tw.ul`menu items-stretch px-3 shadow-lg rounded-box`
const TypePageListTitle = tw.li`menu-title`

const TypePageListBox = tw.nav`md:flex-none mr-2 md:w-56`
const PageWithListLayout = tw.div`mx-auto md:w-max md:flex`
const SectionBox = tw.section`md:flex-1 prose`
const Divider = tw.div`divider w-full md:hidden`

type TypePageListSource = {
    frontmatter: {
        title: string,
        slug: string
    }
}[]
type TypePageListSourceMaybeReadonly = ReadonlyArray<{
    readonly frontmatter?: Pick<GatsbyTypes.MarkdownRemarkFrontmatter, "title" | "slug">
}> | TypePageListSource

const generateTypePageList = (nodes: TypePageListSourceMaybeReadonly, slug: string) => {
    return nodes.map((node) => {
        return (
            <li className={node.frontmatter?.slug === slug ? 'bordered' : ''} key={node.frontmatter?.slug}>
                <Link to={`/${node.frontmatter?.slug}`}>{node.frontmatter?.title}</Link>
            </li>
        )
    })
}

export {
    TypePageList,
    TypePageListBox,
    TypePageListTitle,
    PageWithListLayout,
    SectionBox,
    Divider,
    TypePageListSource,
    generateTypePageList
}
