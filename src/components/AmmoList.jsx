import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchAmmo from '../fetchData/fetchAmmo';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'description', headerName: 'Descripción', width: 450 },
    { field: 'brand', headerName: 'Marca', width: 100 },
    { field: 'caliber', headerName: 'Calibre', width: 170 },
    { field: 'ammoType', headerName: 'Tipo', width: 80 },
    { field: 'grammage', headerName: 'Gramaje', width: 70 },
    { field: 'ammountPerBox', headerName: 'Caja', width: 70 },
    { field: 'unitPrice', headerName: 'Precio USD', width: 100 },
    { field: 'argPrice', headerName: 'Precio ARG', width: 100 },
];

const AmmoList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['ammo'],
        queryFn: fetchAmmo,
    })

    const [formattedData, setFormattedData] = useState([]);

    useEffect(() => {
        if (data) {
            console.log(data)
            const newData = data.map(row => ({
                id: row._id,
                description: `${row.description} ${row.brand.name} ${row.caliber.size} ${row.ammoType.type}`,
                brand: row.brand.name,
                caliber: row.caliber.size,
                ammoType: row.ammoType.type,
                grammage: row.grammage,
                ammountPerBox: row.ammountPerBox,
                unitPrice: row.unitPrice,
                argPrice: row.argPrice,
            }));
            setFormattedData(newData);
        }
    }, [data]);
    
    if(isPending) {
        return <p>Loading...</p>
    }
    if(error) {
        return <p>ERROR</p>
    }
    return (
        <div style={{ height: 700, width: 1200, maxWidth: '100vw' }}>
            <h2>Lista de precios | Municiones </h2>
            <DataGrid
                sx={{ fontSize: '1.2rem'}}
                rows={formattedData}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 20 },
                    },
                }}
                pageSizeOptions={[10, 20]}
            />
        </div>
    )
}

export default AmmoList