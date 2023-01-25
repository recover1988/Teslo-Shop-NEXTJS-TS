import React from 'react'
import { AdminLayout } from '../../components/layouts/AdminLayout';
import PeopleOutline from '@mui/icons-material/PeopleOutline';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid/models';
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, } from '@mui/x-data-grid';
import useSWR from 'swr';
import { IUser } from '../../interfaces';

// los datos se ponen dentro de la funcion para cambiar los estados

const UsersPage = () => {


    const { data, error } = useSWR<IUser[]>('/api/admi/users');

    if (!data && !error) return <></>;

    const columns: GridColDef[] = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'name', headerName: 'Nombre Completo', width: 300 },
        { field: 'role', headerName: 'Rol', width: 300 },
    ]
    const rows = data!.map(user => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
    }))




    return (
        <AdminLayout
            title={'Usuarios'}
            subTitle={'Mantenimiento de usuarios'}
            icon={<PeopleOutline />}
        >
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
        </AdminLayout>
    )
}

export default UsersPage