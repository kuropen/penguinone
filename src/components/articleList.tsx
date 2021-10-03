import { useTheme, useMediaQuery, Card, CardActionArea, CardContent, CardMedia, Grid, Typography, Box, Button, Container } from "@mui/material"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { useIntl, Link, FormattedMessage } from "gatsby-plugin-react-intl"
import * as React from "react"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import SectionHead from "./sectionHead"

const format = require('date-format')

type ArticleListData = 
    Pick<GatsbyTypes.IndexQuery, "allMarkdownRemark">
    | Pick<GatsbyTypes.PostsIndexQuery, "allMarkdownRemark">
    | Pick<GatsbyTypes.TagIndexQuery, "allMarkdownRemark">

interface ArticleListProps {
    data: ArticleListData
    title?: string
    withMoreLink?: boolean
    limit?: number
    offset?: number
}

const ArticleList: React.FC<ArticleListProps> = (props) => {
    const intl = useIntl()
    const theme = useTheme()
    const isNarrowDisplay = useMediaQuery(theme.breakpoints.down('sm'))
    const articles = props.data.allMarkdownRemark.nodes.map((article, index) => {
        if ((props.offset && index < props.offset) || (props.limit && index >= props.limit)) {
            return <React.Fragment />
        }
        let image: JSX.Element
        let imagePath = `https://ogp-img.kuropen.org/${article.frontmatter?.slug}_${article.frontmatter?.lang}.png`
        if (article.frontmatter?.image && article.frontmatter?.image?.childImageSharp) {
            image = (<GatsbyImage image={article.frontmatter.image.childImageSharp.gatsbyImageData} alt="" />)
            imagePath = getSrc(article.frontmatter.image.childImageSharp.gatsbyImageData) || imagePath
        }

        const date = article.frontmatter?.date
        const dateObj = date ? new Date(date) : new Date()
        const dateShown = (<Typography component="aside" variant="body2">{format('yyyy/MM/dd', dateObj)}</Typography>)
        return (
            <Grid key={article.frontmatter?.slug} item>
                <Card sx={{ maxWidth: isNarrowDisplay ? 325 : 345 }}>
                    <CardActionArea component={Link} to={`/posts/${article.frontmatter?.slug}`}>
                        <CardMedia component="img" image={imagePath} alt="" />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {article.frontmatter?.title}
                            </Typography>
                            {dateShown}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
        )
    })

    const moreAction = props.withMoreLink ? (
        <Box sx={{textAlign: 'right'}}>
            <Button component={Link} to="/posts" endIcon={<ArrowForwardIcon />}><FormattedMessage id="olderArticles" /></Button>
        </Box>
    ) : <React.Fragment />

    const title = props.title || intl.formatMessage({id: 'blogArticles'})

    return (
        <Box>
            <SectionHead>
                {title}
            </SectionHead>
            <Container>
                <Grid container spacing={3} columns={isNarrowDisplay ? 1 : 3}>
                    {articles}
                </Grid>
            </Container>
            {moreAction}
        </Box>
    )
}

export default ArticleList
