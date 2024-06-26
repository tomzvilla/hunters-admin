import React, { useState, useEffect } from 'react';
import { axiosPrivate } from '../api/api';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchSupplier } from '../api/api';
import { DataGrid } from '@mui/x-data-grid';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Typography } from '@mui/material';
import FormDialog from './FormDialog';
import Spinner from './Spinner';
import { supplierActions } from '../store/supplierSlice';
import { useDispatch, useSelector } from 'react-redux';

const columns = [
    { field: 'name', headerName: 'Proveedor', width: 240 },
    { field: 'usdExchangeRate', headerName: 'Cotización USD', width: 240, isEditable: true },
];

const SupplierList = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ['supplier'],
        queryFn: fetchSupplier,
    })

    const queryClient = useQueryClient()
    const dispatch = useDispatch();
    const selectedSupplier = useSelector(state => state.supplier.selectedSupplier);

    const [formattedData, setFormattedData] = useState([]);

    const handleRowClick = (params) => {
        dispatch(supplierActions.setSelectedSupplier(params.row));
        dispatch(supplierActions.toggleDialog());
    };

    useEffect(() => {
        if (data) {
            const newData = data.map(row => ({
                id: row._id,
                ...row,
            }));
            setFormattedData(newData);
        }
    }, [data]);

    const saveSupplier = async () => {
        try {
            await axiosPrivate.post('/v1/supplier', {
                _id: selectedSupplier._id,
                usdExchangeRate: selectedSupplier.usdExchangeRate,
            });
            queryClient.invalidateQueries(['supplier']);
        } catch (err) {
            // TODO error handling
            console.log(err)
        }
        
    }
    
    if(isPending) {
        return <Spinner loading={isPending} />
    }
    if(error) {
        return <p>ERROR</p>
    }
    return (
        <div style={{ height: 500, width: 500, maxWidth: '100vw' }}>
            <Typography variant="h5" component="div" style={{lineHeight: '1.5', marginBottom: '1rem'}}>
                Lista de proveedores | Cotización USD 
            </Typography>
            <DataGrid
                sx={{ fontSize: '1.2rem'}}
                rows={formattedData}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                onRowClick={handleRowClick}
                disableColumnResize={true}
                disableRowSelectionOnClick={true}
            />
            {
                selectedSupplier &&
                <FormDialog submitHandler={saveSupplier}>
                    <DialogTitle>Cambiar cotización de proveedor </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Ingresa la nueva cotización
                        </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="usdExchangeRate"
                        name="usdExchangeRate"
                        label="Cotización"
                        type="number"
                        fullWidth
                        variant="standard"
                        onChange={(e) => dispatch(supplierActions.setSelectedSupplier({...selectedSupplier, usdExchangeRate: e.target.value}))}
                        value={selectedSupplier.usdExchangeRate}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => dispatch(supplierActions.toggleDialog())}> Cancelar </Button>
                        <Button type="submit">Guardar</Button>
                    </DialogActions>
                </FormDialog>
            }
        </div>
    )
}

export default SupplierList;