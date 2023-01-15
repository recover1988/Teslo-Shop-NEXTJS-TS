import { Grid, Link, Typography, CardActionArea, CardMedia, Box, Button } from '@mui/material';
import { initialData } from "../../database/products"
import NextLink from 'next/link'
import { ItemCounter } from '../ui/ItemCounter';
import { FC, useContext } from 'react';
import { CartContext } from '../../context';

interface Props {
    editable?: boolean
}

export const CartList: FC<Props> = ({ editable = false }) => {

    const { cart, addProductToCart } = useContext(CartContext)

    return (
        <>
            {
                cart.map(product => {
                    <Grid container key={product.slug + product.size} spacing={2} sx={{ mb: 1 }} >
                        <Grid item xs={3} >
                            {/* TODO: llevar a la pagina del producto */}
                            <NextLink href={`/product/${product.slug}`} passHref legacyBehavior >
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            // image={`/products/${product.images[0]}`}
                                            image={`/products/${product.image}`}
                                            component='img'
                                            sx={{ borderRadius: '5px' }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7} >
                            <Box display='flex' flexDirection='column' >
                                <Typography variant='body1' >{product.title}</Typography>
                                <Typography variant='body1' >Talla: <strong>M</strong></Typography>
                                {
                                    editable
                                        ? <ItemCounter
                                            currentValue={product.quantity}
                                            maxValue={10}
                                            updateQuantity={() => { }}
                                        />
                                        : (<Typography variant='h4' >{product.quantity}{product.quantity > 1 ? 'productos' : 'producto'} </Typography>)
                                }

                            </Box>
                        </Grid>
                        <Grid item xs={5} display='flex' alignItems='center' flexDirection='column' >
                            <Typography variant='subtitle1' >{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button variant='text' color='secondary' >
                                        Remover
                                    </Button>
                                )
                            }

                        </Grid>
                    </Grid>

                })
            }
        </>
    )
}
