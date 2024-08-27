import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchAmmo } from '../api/api';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';

const columns = [
    { field: 'description', headerName: 'Descripción', width: 450 },
    { field: 'brand', headerName: 'Marca', width: 100 },
    { field: 'caliber', headerName: 'Calibre', width: 170 },
    { field: 'ammoType', headerName: 'Tipo', width: 80 },
    { field: 'grammage', headerName: 'Gramaje', width: 70 },
    { field: 'amountPerBox', headerName: 'Caja', width: 70 },
    { field: 'unitPrice', headerName: 'USD Unit.', width: 100 },
    { field: 'finalPrice', headerName: 'USD Final', width: 100 },
    { field: 'argPrice', headerName: 'ARG Final', width: 100 },
];

const AmmoList = () => {
    const defaultPageSize = useSelector(state => state.ui.defaultPageSize);
    const { isPending, error, data } = useQuery({
        queryKey: ['ammo'],
        queryFn: fetchAmmo,
        select: data => {return data.map(row => ({
            id: row._id,
            description: `${row.description} ${row.brand.name} ${row.caliber.size} ${row.ammoType.type}`,
            brand: row.brand.name,
            caliber: row.caliber.size,
            ammoType: row.ammoType.type,
            grammage: row.grammage,
            amountPerBox: row.amountPerBox,
            unitPrice: row.unitPrice,
            finalPrice: row.finalPrice,
            argPrice: row.argPrice,
        }))}
    })
    
    if(isPending) {
        return <Spinner loading={isPending} />;
    }
    if(error) {
        return <p>ERROR</p>
    }
    return (
        <div style={{ height: '80vh', width: '95%', maxWidth: '100vw' }}>
            <Typography variant="h4" component="div" style={{lineHeight: '1.5'}}>
                Lista de precios | Municiones
            </Typography>
            <DataGrid
                sx={{ fontSize: '1.2rem'}}
                rows={data}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: defaultPageSize },
                    },
                }}
                pageSizeOptions={[10, 20]}
            />
        </div>
    )
}

export default AmmoList