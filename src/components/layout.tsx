/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useIntl, Link } from "gatsby-plugin-react-intl"
import "@fontsource/orbitron"
import "../css/main.css"
import PenguinImage from "../images/penguin.png"
import { FiMenu, FiGlobe } from "react-icons/fi"
import tw from "tailwind-styled-components"
import styled from "styled-components"
import BaseLocaleButton from "./localeButton"
import { StaticImage } from "gatsby-plugin-image";
import PrivacyNotice from "./privacyNotice"

interface LayoutProps {
    pageTitle?: string | null
    hideMenu?: boolean
    /**
     * @deprecated parent link is removed
     */
    parent?: string | null
    pageDescription?: string | null
    pageType?: string | null
    pageImage?: string | null
    pageSlug?: string | null
    licenseNotCC?: boolean
}

interface MenuContentShown {
    path: string,
    caption: string
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({children, pageTitle, pageDescription, pageType, pageImage, pageSlug, licenseNotCC}) => {
    const intl = useIntl()

    const siteTitleQuery: GatsbyTypes.SiteTitleQuery = useStaticQuery<GatsbyTypes.SiteTitleQuery>(graphql`
query SiteTitle {
  site {
    siteMetadata {
      title
      siteUrl
      siteDescription
      menuContent {
        caption
        path
      }
    }
  }
}
`)
    //const {title, menuContent, siteUrl, siteDescription} = siteMetadata
    const title = siteTitleQuery.site?.siteMetadata?.title,
        menuContent = siteTitleQuery.site?.siteMetadata?.menuContent,
        siteUrl = siteTitleQuery.site?.siteMetadata?.siteUrl,
        siteDescription = siteTitleQuery.site?.siteMetadata?.siteDescription

    const fullTitle = pageTitle ? `${pageTitle} - ${title}` : title

    const originalMenuContent: MenuContentShown[] = menuContent ? menuContent.map(content => ({
        caption: content?.caption || '',
        path: content?.path || ''
    })) : []
    let menuContentShown = originalMenuContent
    const menuElements = menuContentShown.map((content) => (
        <li key={content.path}><Link to={content.path}>{content.caption}</Link></li>
    ))

    const MenuBtnContainer = tw.nav`dropdown dropdown-right mr-2 flex-none`
    const MenuBtn = tw.button`btn btn-ghost`
    const DropdownMenu = tw.ul`p-2 shadow menu dropdown-content bg-base-100 text-base-content rounded-box w-48`

    const Container = tw.div`container mx-auto px-2 md:px-0 drawer`
    const AppBar = tw.header`navbar mt-0 mb-2 shadow-lg bg-neutral text-neutral-content rounded-b-lg`
    const SiteLogo = tw(styled.h1`
        font-family: Orbitron, sans-serif;
    `)`text-2xl flex-1 font-bold`

    const LocaleButton = tw(BaseLocaleButton)`btn btn-ghost`

    const Footer = tw.footer`mt-2 p-2 bg-neutral text-neutral-content rounded-lg flex flex-row items-center`
    const Credit = tw.address`not-italic flex-1`
    const LicenseBox = tw.div`flex-none`

    return (
        <Container>
            <Helmet title={fullTitle} htmlAttributes={{lang: intl.locale}}>
                <link rel="shortcut icon" type="image/png" href={PenguinImage} />
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={pageImage ? pageImage : PenguinImage} />
                <meta name="twitter:title" content={pageTitle ? pageTitle : title} />
                <meta name="twitter:description" content={pageDescription ? pageDescription : siteDescription} />
                <meta property="og:title" content={pageTitle ? pageTitle : title} />
                <meta property="og:description" content={pageDescription ? pageDescription : siteDescription} />
                <meta property="og:type" content={pageType ? pageType : 'website'} />
                <meta property="og:url" content={`${siteUrl}/${pageSlug || ''}`} />
                <meta property="og:image" content={pageImage ? pageImage : PenguinImage} />
            </Helmet>
            <AppBar>
                <MenuBtnContainer>
                    <MenuBtn><FiMenu /></MenuBtn>
                    <DropdownMenu>
                        {menuElements}
                    </DropdownMenu>
                </MenuBtnContainer>
                <SiteLogo><Link to="/">{title}</Link></SiteLogo>
                <div><LocaleButton><FiGlobe /></LocaleButton></div>
            </AppBar>
            <PrivacyNotice />
            <section className="main">
                {children}
            </section>
            <Footer>
                <Credit>
                    Copyright &copy; Kuropen.
                </Credit>
                { licenseNotCC ? <React.Fragment /> : (
                    <LicenseBox>
                        <a href="https://creativecommons.org/licenses/by-sa/4.0/" rel="license">
                            <StaticImage src="../images/cc-by-sa.svg" width={88} height={31} 
                                alt="Licensed under Creative Commons Attribution-ShareAlike 4.0, unless otherwise noted." />
                        </a>
                    </LicenseBox>
                )}
            </Footer>
        </Container>
    )
}

export default Layout;
