import React, { useState, useEffect } from 'react';
import { fetchAmmoType } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import AmmoTypeRegistrationForm from '../Registrations/AmmoTypeRegistrationForm';
import Spinner from '../Spinner';
import CustomToolbar from './CustomToolbar';

const columns = [
    { field: 'type', headerName: 'Tipo', width: 300 },
];

const AmmoTypeList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['ammoType'],
        queryFn: fetchAmmoType,
    })

    const [formattedData, setFormattedData] = useState([]);
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        if (data) {
            const newData = data.map(row => ({
                id: row._id,
                ...row,
            })).sort((a, b) => a.type.localeCompare(b.type));
            setFormattedData(newData);
        }
    }, [data]);

    if(isPending) {
        return <Spinner loading={isPending} />
    }
    if(error) {
        return <p>ERROR</p>
    }
    return (
        <div style={{ height: 700, width: 500, maxWidth: '100vw' }}>
            <Typography variant="h5" component="div" style={{lineHeight: '1.5', marginBottom: '1rem' }}>
                Lista de tipos de munición 
            </Typography>
            <DataGrid
                sx={{ fontSize: '1.2rem' }}
                rows={formattedData}
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
                        title: 'Tipos de munición',
                        onButtonClick: () => setShowCreateForm(true),
                    },
                }}
            />
            <Dialog id='modal' open={showCreateForm} onClose={() => setShowCreateForm(false)}>
                <DialogTitle>Crear tipo de munición </DialogTitle>
                <DialogContent>
                    <AmmoTypeRegistrationForm handleCancel={() => setShowCreateForm(false)}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AmmoTypeList;