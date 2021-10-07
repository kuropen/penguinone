import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import "../css/main.css"
import PenguinImage from "../images/penguin.png"

interface LayoutProps {
    pageTitle?: string | null
    hideMenu?: boolean
    parent?: string | null
    pageDescription?: string | null
    pageType?: string | null
    pageImage?: string | null
    pageSlug?: string | null
}

interface MenuContentShown {
    path: string,
    caption: string
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({children, pageTitle, hideMenu, parent, pageDescription, pageType, pageImage, pageSlug}) => {
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
    if (parent) {
        const backMenuEntry: MenuContentShown[] = ([{
            caption: 'back',
            path: parent,
        }])
        menuContentShown = backMenuEntry.concat(originalMenuContent)
    }
    const footerMenuElements = menuContentShown.map((content) => (
        <span key={content.path}><Link to={content.path}>{content.caption}</Link></span>
    ))
    const footerMenu = hideMenu ? null : (
        <nav className="footer-menu">
            <hr />
            <p>{footerMenuElements}</p>
        </nav>
    )
    return (
        <div className="container mx-auto px-2 md:px-0">
            <Helmet title={fullTitle} htmlAttributes={{lang: 'ja'}}>
                <link rel="shortcut icon" type="image/png" href={PenguinImage} />
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:image" content={pageImage ? pageImage : PenguinImage} />
                <meta name="twitter:title" content={pageTitle ? pageTitle : title} />
                <meta name="twitter:description" content={pageDescription ? pageDescription : siteDescription} />
                <meta property="og:title" content={pageTitle ? pageTitle : title} />
                <meta property="og:description" content={pageDescription ? pageDescription : siteDescription} />
                <meta property="og:type" content={pageType ? pageType : 'website'} />
                <meta property="og:url" content={`${siteUrl}/${pageSlug}`} />
                <meta property="og:image" content={pageImage ? pageImage : PenguinImage} />
            </Helmet>
            <header className="text-center">
                <h1 className="site-logo"><Link to="/">{title}</Link></h1>
            </header>
            <section className="main">
                {children}
                {footerMenu}
            </section>
            <footer>
                Copyright &copy; Kuropen.
                Licensed under <a rel='license' href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC-BY-NC-SA 4.0</a> unless otherwise noted.<br />
            </footer>
        </div>
    )
}

export default Layout;
