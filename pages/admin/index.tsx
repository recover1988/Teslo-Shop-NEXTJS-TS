import React from 'react'
import { AdminLayout } from '../../components/layouts/AdminLayout';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';

const DashboardPage = () => {
    return (
        <AdminLayout
            title={'Dashboard'}
            subTitle={'Estadisticas Generales'}
            icon={<DashboardOutlined />}
        >
            <h3>Hola mundo</h3>
        </AdminLayout>
    )
}

export default DashboardPage