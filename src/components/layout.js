import React from "react";
import { Helmet } from "react-helmet";
import { Link, useStaticQuery, graphql } from "gatsby";

import "@fontsource/orbitron/700.css"
import "@ibm/plex/css/ibm-plex-sans-jp.css"
import "@ibm/plex/css/ibm-plex.css"
import "../css/main.css"
import PenguinImage from "../images/penguin.png"

const Layout = ({children, pageTitle, hideMenu, parent, pageDescription, pageType, pageImage, pageSlug}) => {
    const siteTitleQuery = useStaticQuery(graphql`
query SiteTitleQuery {
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
    const {title, menuContent, siteUrl, siteDescription} = siteTitleQuery.site.siteMetadata
    const fullTitle = pageTitle ? `${pageTitle} - ${title}` : title
    let menuContentShown = menuContent
    if (parent) {
        menuContentShown = ([{
            caption: 'back',
            path: parent
        }]).concat(menuContent)
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
        <div className="container mx-auto">
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
