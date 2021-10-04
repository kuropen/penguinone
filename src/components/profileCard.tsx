import * as React from "react"
import { Paper, Box, Container, Grid, Typography, List, ListItem, ListItemText, Avatar, ListItemAvatar, useTheme, useMediaQuery, Button, styled } from "@mui/material"
import KPAvatar, { AvatarInList } from "./avatar"
import { useIntl, Link } from "gatsby-plugin-react-intl"
import { visuallyHidden } from '@mui/utils'
import HomeIcon from '@mui/icons-material/Home'
import BusinessIcon from '@mui/icons-material/Business';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode'
import SectionHead from "./sectionHead"

/**
 * Bilingual Profile Card for Kuropen.
 * @returns Profile Card
 */
const ProfileCard: React.FC = () => {
    const theme = useTheme()
    const isNarrowDisplay = useMediaQuery(theme.breakpoints.down('sm'))
    const intl = useIntl()
    const homeTowns = ['saitama', 'aizuwakamatsu'].map((key) => {
        return intl.formatMessage({id: key})
    }).join(intl.formatMessage({id: 'joinGlue'}))

    // Changing font only at hometown field in Japanese.
    // Noto Sans CJK JP should NOT be used here due to glyph designation of Saitama City
    // (https://www.fnn.jp/articles/-/8186)
    const HomeTownBox = styled('div')(({theme}) => ({
       fontFamily: intl.locale === 'ja' ? "'Sawarabi Gothic', sans-serif" : "inherit"
    }))

    return (
    <Box>
      <SectionHead>
        {intl.formatMessage({id: 'profile'})}
      </SectionHead>
      <Container maxWidth="sm" sx={{p: 2}}>
        <Paper sx={{p: 2, pt: 0}}>
            <Grid container spacing={1}>
                <Grid item sx={isNarrowDisplay ? visuallyHidden : undefined}>
                    <Box sx={{mt: 2}}>
                        <KPAvatar />
                    </Box>
                </Grid>
                <Grid item>
                    <List>
                        <ListItem>
                            <ListItemAvatar sx={isNarrowDisplay ? undefined : visuallyHidden}>
                                <Avatar>
                                    <AvatarInList />
                                </Avatar>
                            </ListItemAvatar>
                            <Typography variant="h5" component="h2">
                                Kuropen
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <HomeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={intl.formatMessage({id: 'hometown'})} secondary={<HomeTownBox>{homeTowns}</HomeTownBox>} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BusinessIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={intl.formatMessage({id: 'occupation'})} secondary={intl.formatMessage({id: 'webProgrammer'})} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <DeveloperModeIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={intl.formatMessage({id: 'specialized'})} secondary="PHP, JavaScript" />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Box sx={{textAlign: 'right'}}>
                <Button component={Link} to="/profile">{intl.formatMessage({id: 'detailedProfile'})}</Button>
            </Box>
        </Paper>
      </Container>
    </Box>
    )
}

export default ProfileCard
