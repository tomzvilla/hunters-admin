import React, { useState } from 'react';
import { fetchCaliber } from '../../api/api';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';
import CaliberRegistrationForm from '../Registrations/CaliberRegistrationForm';
import Spinner from '../Spinner';
import CustomToolbar from './CustomToolbar';
import { useSelector } from 'react-redux';
const columns = [
    { field: 'size', headerName: 'Nombre', width: 300 },
];

const CaliberList = () => {
    const defaultPageSize = useSelector(state => state.ui.defaultPageSize);
    const { isPending, error, data } = useQuery({
        queryKey: ['caliber'],
        queryFn: fetchCaliber,
        select: data => { return data.map(row => ({ id: row._id, ...row })).sort((a, b) => a.size.localeCompare(b.size)) },
    })

    const [showCreateForm, setShowCreateForm] = useState(false);

    if(isPending) {
        return <Spinner loading={isPending} />
    }
    if(error) {
        return <p>ERROR</p>
    }
    return (
        <div style={{ height: '80vh', width: 500, maxWidth: '100vw' }}>
            <Typography variant="h5" component="div" style={{ lineHeight: '1.5', marginBottom: '1rem' }}>
                Lista de calibres
            </Typography>
            <DataGrid
                sx={{ fontSize: '1.2rem' }}
                rows={data}
                columns={columns}
                initialState={{
                        pagination: {
                        paginationModel: { page: 0, pageSize: defaultPageSize },
                    },
                }}
                pageSizeOptions={[10,15,20]}
                disableColumnResize={true}
                disableRowSelectionOnClick={true}
                slots={{ toolbar: CustomToolbar }}
                slotProps={{
                    toolbar: {
                        title: 'Calibres',
                        onButtonClick: () => setShowCreateForm(true),
                    },
                }}
            />
            <Dialog id='modal' open={showCreateForm} onClose={() => setShowCreateForm(false)}>
                <DialogTitle>Crear calibre </DialogTitle>
                <DialogContent>
                    <CaliberRegistrationForm handleCancel={() => setShowCreateForm(false)}/>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default CaliberList;