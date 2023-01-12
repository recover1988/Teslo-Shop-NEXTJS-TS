import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid/models';
import NextLink from 'next/link'

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
        sortable:false,
        renderCell: (params) => {
            return (
                <NextLink href={`/orders/${params.row.id}`} passHref legacyBehavior>
                    <Link>
                        <Chip color='info' label='Ver Orden' variant='outlined' />
                    </Link>
                </NextLink>
            )
        }
    }
]

const rows = [
    { id: 1, paid: true, fullname: 'Fernando Herrera' },
    { id: 2, paid: false, fullname: 'Eric Denis' },
    { id: 3, paid: true, fullname: 'miguel Granados' },
    { id: 4, paid: true, fullname: 'Alistar Vegar' },
    { id: 5, paid: true, fullname: 'Lizeth Copa' },
    { id: 6, paid: true, fullname: 'Leady Gut' },
]

const HistoryPage = () => {
    return (
        <ShopLayout title={'Historial de Ordenes'} pageDescription={'Historial de ordenes del Cliente'} >
            <Typography variant='h1' component='h1' >Historial de Ordenes</Typography>
            <Grid container>
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

export default HistoryPage