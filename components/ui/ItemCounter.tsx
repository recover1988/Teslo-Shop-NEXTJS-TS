import { FC } from "react"
import { Box, IconButton, Typography } from '@mui/material';
import { RemoveCircleOutline, AddCircleOutline } from '@mui/icons-material'

interface Props {
    currentValue: number;
    maxValue: number;

    // Methods
    updateQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({ currentValue, maxValue, updateQuantity }) => {

    const addOrRemove = (value: number) => {
        if (value === -1) {
            if (currentValue === 1) return
            return updateQuantity(currentValue - 1)
        }
        if (currentValue >= maxValue) return

        updateQuantity(currentValue + 1)
    }

    return (
        <Box display='flex' flexDirection='row' alignItems='center' justifyContent='left' >
            {/* {
                currentValue === 1
                    ? (
                        <IconButton
                            onClick={() => updateQuantity(-1)}
                            disabled
                        >
                            <RemoveCircleOutline />
                        </IconButton>
                    )
                    : (
                        <IconButton
                            onClick={() => updateQuantity(-1)}
                        >
                            <RemoveCircleOutline />
                        </IconButton>
                    )
            } */}

            <IconButton
                onClick={() => addOrRemove(-1)}
            >
                <RemoveCircleOutline />
            </IconButton>
            <Typography
                sx={{ width: 40, textAlign: 'center' }}
            >
                {currentValue}
            </Typography>
            <IconButton
                onClick={() => addOrRemove(+1)}
            >
                <AddCircleOutline />
            </IconButton>
            {/* {
                currentValue === maxValue
                    ? (
                        <IconButton
                            onClick={() => updateQuantity(1)}
                            disabled
                        >
                            <AddCircleOutline />
                        </IconButton>
                    )
                    : (
                        <IconButton
                            onClick={() => updateQuantity(1)}
                        >
                            <AddCircleOutline />
                        </IconButton>
                    )
            } */}

        </Box>
    )
}
