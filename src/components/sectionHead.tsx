import * as React from "react"
import { useTheme, Container, Typography } from "@mui/material"

const SectionHead: React.FC = ({children}) => {
    const theme = useTheme()
    const baseColor = theme.palette.background.default
    return (
        <Container sx={{
            m: 2,
            p: 1,
            textAlign: 'center',
            borderImage: `linear-gradient(to right, ${baseColor}, #119988 5%, #119988 95%, ${baseColor})`,
            borderImageSlice: 1,
            borderTop: '2px solid',
            borderBottom: '2px solid',
        }}>
            <Typography variant="h5" component="h2">
                {children}
            </Typography>
        </Container>
    )
}

export default SectionHead
