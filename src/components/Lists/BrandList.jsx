import React, { useState } from 'react';
import { fetchBrand } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import BrandRegistrationForm from '../Registrations/BrandRegistrationForm';
import Spinner from '../Spinner';
import CustomToolbar from './CustomToolbar';

const columns = [
    { field: 'name', headerName: 'Nombre', width: 300 },
];

const BrandList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['brand'],
        queryFn: fetchBrand,
        select: data => { return data.map(row => ({ id: row._id, ...row })).sort((a, b) => a.name.localeCompare(b.name)) },
    })

    const [showCreateForm, setShowCreateForm] = useState(false);

    if(isPending) {
        return <Spinner loading={isPending} />
    }
    if(error) {
        return <p>ERROR</p>
    }
    return (
        <div style={{ height: '80%', width: 500, maxWidth: '100vw' }}>
            <Typography variant="h5" component="div" style={{ lineHeight: '1.5', marginBottom: '1rem' }}>
                Lista de marcas 
            </Typography>
            <DataGrid
                sx={{ fontSize: '1.2rem' }}
                rows={data}
                columns={columns}
                initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                pageSizeOptions={[10,15,20]}
                disableColumnResize={true}
                disableRowSelectionOnClick={true}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{
                    toolbar: {
                        title: 'Marcas',
                        onButtonClick: () => setShowCreateForm(true),
                    },
                }}
            />
            <Dialog id='modal' open={showCreateForm} onClose={() => setShowCreateForm(false)}>
                <DialogTitle>Crear marca </DialogTitle>
                <DialogContent>
                    <BrandRegistrationForm handleCancel={() => setShowCreateForm(false)}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BrandList;