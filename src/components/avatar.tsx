import * as React from "react"
import { Avatar as MUIAvatar } from "@mui/material"
import { StaticImage } from "gatsby-plugin-image"

export const AvatarInList = () => {
    // Important: This should NOT be moved outside function nor declare "as const"
    // due to StaticImage component's restriction
    const P_ICON_SIZE = 40
    
    return (
      <StaticImage src="../images/penguin.png" alt="" width={P_ICON_SIZE} height={P_ICON_SIZE} />
    )
}

const Avatar = () => {
    // Important: This should NOT be moved outside function nor declare "as const"
    // due to StaticImage component's restriction
    const P_ICON_SIZE = 64
    
    return (
      <MUIAvatar sx={{width: P_ICON_SIZE, height: P_ICON_SIZE}}>
        <StaticImage src="../images/penguin.png" alt="" width={P_ICON_SIZE} height={P_ICON_SIZE} />
      </MUIAvatar>
    )
}

export default Avatar