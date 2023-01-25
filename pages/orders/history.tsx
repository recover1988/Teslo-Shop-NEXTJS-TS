import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import NextLink from 'next/link'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react';
import { dbOrders } from '../../database';
import { IOrder } from '../../interfaces';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'fullname', headerName: 'Nombre Completo', width: 300 },
    {
        field: 'paid',
        headerName: 'Pagada',
        description: 'Muestra información si está pagada la orden o no',
        width: 250,
        renderCell: (params) => {
            return (
                params.row.paid
                    ? <Chip color='success' label='Pagada' variant='outlined' />
                    : <Chip color='error' label='No pagada' variant='outlined' />
            )
        }
    },
    {
        field: 'orden',
        headerName: 'Ver orden',
        description: 'Ir a la pagina de la orden',
        width: 250,
        sortable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <NextLink href={`/orders/${params.row.orden}`} passHref legacyBehavior>
                    <Link underline='always'>
                        <Chip color='info' label='Ver Orden' variant='outlined' />
                    </Link>
                </NextLink>
            )
        }
    }
]

// const rows = [
//     { id: 1, paid: true, fullname: 'Fernando Herrera' },
//     { id: 2, paid: false, fullname: 'Eric Denis' },
//     { id: 3, paid: true, fullname: 'miguel Granados' },
//     { id: 4, paid: true, fullname: 'Alistar Vegar' },
//     { id: 5, paid: true, fullname: 'Lizeth Copa' },
//     { id: 6, paid: true, fullname: 'Leady Gut' },
// ]

interface Props {
    orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {

    const rows = orders.map((order, index) => (
        {
            id: index + 1,
            paid: order.isPaid,
            fullname: `${order.shippingAddress.firstName}, ${order.shippingAddress.lastName}`,
            orden: order._id,
        }
    ))

    return (
        <ShopLayout title={'Historial de Ordenes'} pageDescription={'Historial de ordenes del Cliente'} >
            <Typography variant='h1' component='h1' >Historial de Ordenes</Typography>

            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%' }} >
                    <DataGrid
                        columns={columns}
                        rows={rows}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Grid>
            </Grid>
            
        </ShopLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const session: any = await getSession({ req })

    if (!session) {
        return {
            redirect: {
                destination: '/auth/login?p=/orders/history',
                permanent: false,
            }
        }
    }

    const orders = await dbOrders.getOrdersByUser(session.user._id)

    return {
        props: {
            orders
        }
    }
}

export default HistoryPage