import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl, Link, changeLocale } from "gatsby-plugin-react-intl"
import "../css/main.css"
import PenguinImage from "../images/penguin.png"
import CssBaseline from "@mui/material/CssBaseline"
import { useMediaQuery, createTheme, ThemeProvider, AppBar, Toolbar, Typography, Container, Link as MUILink, IconButton, Tooltip, styled, Drawer, Divider, List, ListItemText, ListItem, ListItemButton } from "@mui/material"
import TranslateIcon from '@mui/icons-material/Translate'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MenuIcon from '@mui/icons-material/Menu'
import { Box } from "@mui/system"

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
    captionTranslate: string,
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}))

const DRAWER_WIDTH = 240 as const

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({children, pageTitle, hideMenu, parent, pageDescription, pageType, pageImage, pageSlug}) => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const intl = useIntl()
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
                typography: {
                    fontFamily: "'Roboto', 'Helvetica', 'Arial', 'Noto Sans JP', sans-serif"
                }
            }),
        [prefersDarkMode],
    )
    const [open, setOpen] = React.useState(false)

    const siteTitleQuery: GatsbyTypes.SiteTitleQuery = useStaticQuery<GatsbyTypes.SiteTitleQuery>(graphql`
query SiteTitle {
  site {
    siteMetadata {
      title
      siteUrl
      siteDescription
      menuContent {
        captionTranslate
        path
      }
    }
  }
}
`)
    const title = siteTitleQuery.site?.siteMetadata?.title,
        menuContent = siteTitleQuery.site?.siteMetadata?.menuContent,
        siteUrl = siteTitleQuery.site?.siteMetadata?.siteUrl,
        siteDescription = siteTitleQuery.site?.siteMetadata?.siteDescription

    const fullTitle = pageTitle ? `${pageTitle} - ${title}` : title
    const originalMenuContent: MenuContentShown[] = menuContent ? menuContent.map(content => ({
        captionTranslate: content?.captionTranslate || '',
        path: content?.path || ''
    })) : []
    let menuContentShown = originalMenuContent

    const footerMenuElements = menuContentShown.map((content) => (
        <ListItem key={content.path}>
            <ListItemButton component={Link} to={content.path}>
                <ListItemText primary={intl.formatMessage({id: content.captionTranslate})} />
            </ListItemButton>
        </ListItem>
    ))
    const footerMenu = (
        <List>{footerMenuElements}</List>
    )
    return (
        <ThemeProvider theme={theme}>
            <Helmet title={fullTitle} htmlAttributes={{lang: intl.locale}}>
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
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box component={Link} to="/" sx={{flexGrow: 1, color: 'inherit', textDecoration: 'none'}}>
                        <Typography variant="h5" component="h1" sx={{fontFamily: 'Orbitron'}}>
                            {title}
                        </Typography>
                    </Box>
                    <Tooltip title={intl.formatMessage({id: 'oppositeLanguage'})}>
                        <IconButton aria-label={intl.formatMessage({id: 'oppositeLanguage'})}
                            onClick={() => {changeLocale(intl.formatMessage({id: 'oppositeLanguageCode'}))}}>
                            <TranslateIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <Drawer
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: DRAWER_WIDTH,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={() => setOpen(false)}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {footerMenu}
            </Drawer>
            <Container sx={{mt: 10, mb: 5}}>
                <Box component="section">
                    {children}
                </Box>
            </Container>
            <AppBar component="footer" position="static" sx={{ top: 'auto', bottom: 0, p: 2 }}>
                <Typography component="address" sx={{flexGrow: 1, fontStyle: 'normal'}}>
                    Copyright &copy; Kuropen.
                </Typography>
            </AppBar>
        </ThemeProvider>
    )
}

export default Layout;
