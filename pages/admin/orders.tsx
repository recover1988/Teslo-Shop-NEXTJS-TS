import React from 'react'
import { AdminLayout } from '../../components/layouts/AdminLayout';
import ConfirmationNumberOutlined from '@mui/icons-material/ConfirmationNumberOutlined';

const OrdersPage = () => {
  return (
    
    <AdminLayout 
    title={'Ordenes'}
     subTitle={'Mantenimiento de ordenes'}
     icon={<ConfirmationNumberOutlined />}
      >

    </AdminLayout>
  )
}

export default OrdersPage