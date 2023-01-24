import React, { useState,useEffect } from 'react'
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { Grid, CardContent, Typography, Card } from '@mui/material';
import { SummaryTile } from '../../components/admin';

import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import CreditCardOffOutlined from '@mui/icons-material/CreditCardOffOutlined';
import AttachMoneyOutlined from '@mui/icons-material/AttachMoneyOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import CategoryOutlined from '@mui/icons-material/CategoryOutlined';
import AccessTimeOutlined from '@mui/icons-material/AccessTimeOutlined';
import CancelPresentationOutlined from '@mui/icons-material/CancelPresentationOutlined';
import ProductionQuantityLimitsOutlined from '@mui/icons-material/ProductionQuantityLimitsOutlined';
import useSWR from 'swr';
import { DashboardSummaryResponse } from '../../interfaces';

const DashboardPage = () => {


    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000 // 30 segundos
    })

    const [refreshIn, setRefreshIn] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setRefreshIn(refreshIn => refreshIn > 0 ? refreshIn - 1 : 30)
        }, 1000)

        return () => clearInterval(interval)
    }, [])


    if (!error && data) {
        return <></>
    }
    if (error) {
        console.log(error)
        return <Typography>Error al cargar la informacion</Typography>
    }

    const {
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInventory,
        lowInventory,
        notPaidOrders,
    } = data!;


    return (
        <AdminLayout
            title={'Dashboard'}
            subTitle={'Estadisticas Generales'}
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2} >
                <SummaryTile
                    title={numberOfOrders}
                    subTitle='Ordenes totales'
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={paidOrders}
                    subTitle='Ordenes pagadas'
                    icon={<AttachMoneyOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={notPaidOrders}
                    subTitle='Ordenes pendientes'
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfClients}
                    subTitle='Clientes'
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={numberOfProducts}
                    subTitle='Productos'
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={productsWithNoInventory}
                    subTitle='Sin Existencias'
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={lowInventory}
                    subTitle='Bajo Inventario'
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={refreshIn}
                    subTitle='Actualizacion en:'
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage