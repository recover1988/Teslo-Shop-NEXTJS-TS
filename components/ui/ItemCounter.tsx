import { FC } from "react"
import { Box, IconButton, Typography } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material'

interface Props {

}

export const ItemCounter: FC<Props> = () => {
    return (
        <Box>
            <IconButton>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: 40, textAlign: 'center' }} >1</Typography>
            <IconButton>
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
