import React, { useEffect } from 'react'
import { ShopLayout } from '../../components/layouts';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../context';
import { countries } from '../../utils';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const SummaryPage = () => {
    const router = useRouter()
    const { shippingAddress, numberOfItems } = useContext(CartContext)

    useEffect(() => {
        if (!Cookies.get('firstName')) {
            router.push('/checkout/address')
        }
    }, [router])


    if (!shippingAddress) { //si es nulo que muestre un fragmento y no continuee
        return <></>
    }
    const { address, city, country, firstName, lastName, phone, zip, address2 } = shippingAddress;

    // const countryName = countries.filter(c => c.code === country)[0].name

    return (
        <ShopLayout title={'Resumen de orden'} pageDescription={'Resumen de la orden'} >
            <Typography variant='h1' component='h1' >Resumen de la Orden</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    {/* Cartlist */}
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                                <Typography variant='subtitle1' >Dirección de Entrega</Typography>
                                <NextLink href='/checkout/address' passHref legacyBehavior>
                                    <Link underline='always' >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <Typography >{firstName}, {lastName}</Typography>
                            <Typography >{address}{address2 ? `, ${address2}` : ''}</Typography>
                            <Typography >{city}, {zip}</Typography>
                            {/* <Typography >{countries.find(c => c.code === country)?.name}</Typography> */}
                            <Typography >{country}</Typography>
                            <Typography >{phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='end' >
                                <NextLink href='/cart' passHref legacyBehavior>
                                    <Link underline='always' >
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Button color='secondary' className='circular-btn' fullWidth >
                                    Confirmar Orden
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default SummaryPage