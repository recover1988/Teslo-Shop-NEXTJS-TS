import React from 'react'
import { ShopLayout } from '../../components/layouts';
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material';
import { CartList, OrderSummary } from '../../components/cart';
import NextLink from 'next/link';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import CreditScoreOutlined from '@mui/icons-material/CreditScoreOutlined';
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

interface Props {
    order: IOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
    return (
        <ShopLayout title={'Resumen de la orden'} pageDescription={'Resumen de la orden'} >
            <Typography variant='h1' component='h1' >Orden: {order._id}</Typography>
            {
                order.isPaid
                    ? (
                        <Chip
                            sx={{ my: 2 }}
                            label='Orden ya fue pagada'
                            variant='outlined'
                            color='success'
                            icon={<CreditScoreOutlined />}
                        />
                    )
                    : (
                        <Chip
                            sx={{ my: 2 }}
                            label='Pendiente de pago'
                            variant='outlined'
                            color='error'
                            icon={<CreditCardOffOutlined />}
                        />
                    )
            }



            <Grid container className='fadeIn'>
                <Grid item xs={12} sm={7}>
                    {/* Cartlist */}
                    <CartList products={order.orderItems} />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen ({order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display='flex' justifyContent='space-between' >
                                <Typography variant='subtitle1' >Dirección de Entrega</Typography>
                            </Box>

                            <Typography >{order.shippingAddress.firstName} {order.shippingAddress.lastName}</Typography>
                            <Typography >{order.shippingAddress.address} {order.shippingAddress.address2 ? `, ${order.shippingAddress.address2}` : ''}</Typography>
                            <Typography >{order.shippingAddress.city}</Typography>
                            <Typography >{order.shippingAddress.country}</Typography>
                            <Typography >{order.shippingAddress.phone}</Typography>

                            <Divider sx={{ my: 1 }} />

                            <OrderSummary
                                orderValues={{
                                    numberOfItems: order.numberOfItems,
                                    subTotal: order.subTotal,
                                    tax: order.tax,
                                    total: order.total,
                                }}
                            />
                            <Box sx={{ mt: 3 }} display='flex' flexDirection='column' >
                                {/* TODO */}
                                {
                                    order.isPaid
                                        ? (
                                            <Chip
                                                sx={{ my: 2 }}
                                                label='Orden ya fue pagada'
                                                variant='outlined'
                                                color='success'
                                                icon={<CreditScoreOutlined />}
                                            />
                                        )
                                        : (
                                            <h1>Pagar</h1>
                                        )
                                }


                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { id = '' } = query

    const session: any = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false,
            }

        }
    }

    const order = await dbOrders.getOrderById(id.toString());
    if (!order) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }

    if (order.user !== session.user._id) {
        return {
            redirect: {
                destination: '/orders/history',
                permanent: false
            }
        }
    }
    return {
        props: {
            order
        }
    }
}

export default OrderPage