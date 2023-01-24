import React from 'react'
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

const DashboardPage = () => {
    return (
        <AdminLayout
            title={'Dashboard'}
            subTitle={'Estadisticas Generales'}
            icon={<DashboardOutlined />}
        >
            <Grid container spacing={2} >
                <SummaryTile
                    title={1}
                    subTitle='Ordenes totales'
                    icon={<CreditCardOffOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={2}
                    subTitle='Ordenes pagadas'
                    icon={<AttachMoneyOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={3}
                    subTitle='Ordenes pendientes'
                    icon={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={4}
                    subTitle='Clientes'
                    icon={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={5}
                    subTitle='Productos'
                    icon={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={6}
                    subTitle='Sin Existencias'
                    icon={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={7}
                    subTitle='Bajo Inventario'
                    icon={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
                />
                <SummaryTile
                    title={8}
                    subTitle='Actualizacion en:'
                    icon={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
                />
            </Grid>
        </AdminLayout>
    )
}

export default DashboardPage