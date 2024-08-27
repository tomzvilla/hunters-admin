import React from 'react'
import { useState } from 'react';
import { axiosPrivate, fetchBrand, fetchCaliber, fetchAmmoType, fetchSupplier } from '../../api/api';
import { Box, Button, TextField, InputLabel, MenuItem, Select, FormControl, InputAdornment, Chip, Paper, Typography } from '@mui/material'
import { useQueryClient, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Spinner from '../Spinner';

const AmmoRegistrationForm = (props) => {
    // Fetching data
    const brandsQuery = useQuery({ queryKey: ['brand'], queryFn: fetchBrand, select: data => { return data.sort((a, b) => a.name.localeCompare(b.name)) } });
    const calibersQuery = useQuery({ queryKey: ['caliber'], queryFn: fetchCaliber, select: data => { return data.sort((a, b) => a.size.localeCompare(b.size)) }});
    const ammoTypeQuery = useQuery({ queryKey: ['ammoType'], queryFn: fetchAmmoType, select: data => { return data.sort((a, b) => a.type.localeCompare(b.type)) }});
    const supplierQuery = useQuery({ queryKey: ['supplier'], queryFn: fetchSupplier, select: data => { return data.sort((a, b) => a.name.localeCompare(b.name)) }});

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
          },
        },
      };

    const [ammo, setAmmo] = useState({
        selectedBrand: '',
        selectedCaliber: '',
        selectedAmmoType: '',
        grammage: '',
        amountPerBox: '',
        unitPrice: '',
        selectedSuppliers: [],
        description: 'Munición',
    });

    const numericFields = ['grammage', 'unitPrice', 'amountPerBox']

    const handleChange = (e) => {
        let {name, value} = e.target
        if(numericFields.includes(name) && value !== '') {
            value = Math.abs(value);
        }
        if(name === 'selectedSuppliers') {
            value = typeof value === 'string' ? value.split(',') : value
        }
        setAmmo({
            ...ammo,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPrivate.post('/v1/ammunition', {
                brand: ammo.selectedBrand,
                caliber: ammo.selectedCaliber,
                grammage: ammo.grammage,
                ammoType: ammo.selectedAmmoType,
                amountPerBox: ammo.amountPerBox,
                unitPrice: ammo.unitPrice,
                description: ammo.description,
                suppliers: ammo.selectedSuppliers,
            });
            if(response.status === 201) {
                await Swal.fire({
                    title: 'Munición insertada con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                });
                setAmmo({
                    selectedBrand: '',
                    selectedCaliber: '',
                    selectedAmmoType: '',
                    grammage: '',
                    amountPerBox: '',
                    unitPrice: '',
                    selectedSuppliers: [],
                    description: 'Munición',
                });
            }
        } catch (err) {
            const status = err.response.status ?? err.code;
            switch(status) {
                case 400:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'Los campos ingresados no son correctos',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                    break;
                case 403:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'No estás autorizado para ingresar',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                    break;
                case 409:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'La munición ingresada ya existe',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                    break;
                default:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'El servidor no responde',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                    break;
            }
        }
    }

    if(brandsQuery.isPending || calibersQuery.isPending || ammoTypeQuery.isPending || supplierQuery.isPending) {
        return <Spinner loading={brandsQuery.isPending || calibersQuery.isPending || ammoTypeQuery.isPending || supplierQuery.isPending} />
    }
    if(brandsQuery.isError || calibersQuery.isError || ammoTypeQuery.isError || supplierQuery.isError) {
        return <p>ERROR</p>
    }

    return (
            <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center', p: 6, overflow: "hidden" }}>
                <Typography variant="h4" component="h4" style={{ lineHeight: '2.5' }}>
                    Agregar una munición                   
                </Typography>
                <Paper elevation={12} sx={{ p: 4 }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: 500, height: 660 }}>
                        <FormControl fullWidth>
                            <InputLabel id="brand">Marca</InputLabel>
                            <Select
                                labelId="brand"
                                id="selectedBrand"
                                name="selectedBrand"
                                value={ammo.selectedBrand}
                                label="Marca *"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={''} selected>[Seleccione una opción]</MenuItem>
                                {
                                    brandsQuery.data.map(brand => 
                                    <MenuItem key={brand._id} value={brand._id}>
                                        {brand.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="caliber">Calibre</InputLabel>
                            <Select
                                labelId="caliber"
                                id="selectedCaliber"
                                name="selectedCaliber"
                                value={ammo.selectedCaliber}
                                label="Calibre *"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={''} selected>[Seleccione una opción]</MenuItem>
                                {
                                    calibersQuery.data.map(caliber => 
                                    <MenuItem key={caliber._id} value={caliber._id}>
                                        {caliber.size}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="ammoType">Munición</InputLabel>
                            <Select
                                labelId="ammoType"
                                id="selectedAmmoType"
                                name="selectedAmmoType"
                                value={ammo.selectedAmmoType}
                                label="Munición *"
                                onChange={handleChange}
                                required
                            >
                                <MenuItem value={''} selected>[Seleccione una opción]</MenuItem>
                                {
                                    ammoTypeQuery.data.map(ammoType => 
                                    <MenuItem key={ammoType._id} value={ammoType._id}>
                                        {ammoType.type}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 0 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="grammage"
                                label="Gramaje"
                                name="grammage"
                                autoComplete="off"
                                value={ammo.grammage}
                                onChange={handleChange}
                                InputProps={{ endAdornment: <InputAdornment position="end">gr</InputAdornment> }}
                                inputProps={{ type: 'number', pattern: '[0-9]*' }}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 0 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="amountPerBox"
                                label="Cantidad por caja"
                                name="amountPerBox"
                                autoComplete="off"
                                value={ammo.amountPerBox}
                                onChange={handleChange}
                                inputProps={{ type: 'number', pattern: '[0-9]*' }}
                            />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 0 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="unitPrice"
                                label="Precio en USD"
                                name="unitPrice"
                                autoComplete="off"
                                value={ammo.unitPrice}
                                onChange={handleChange}
                                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                inputProps={{ type: 'number', pattern: '[0-9]*' }}
                            />
                        </FormControl>
                        {/* Proveedores */}
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="suppliers">Proveedores</InputLabel>
                            <Select
                                labelId="suppliers"
                                id="selectedSuppliers"
                                name='selectedSuppliers'
                                multiple
                                value={ammo.selectedSuppliers}
                                onChange={handleChange}
                                label='Proveedores'
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => {
                                        const label = supplierQuery.data.find(s => s._id === value)
                                        return <Chip key={value} label={label.name} />
                                    })}
                                    </Box>
                                )}
                                required
                                MenuProps={MenuProps}
                            >
                                <MenuItem value={''} selected>[Seleccione una opción]</MenuItem>
                                {
                                    supplierQuery.data.map(supplier => 
                                    <MenuItem key={supplier._id} value={supplier._id}>
                                        {supplier.name}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="description"
                                label="Descripción"
                                name="description"
                                autoComplete="off"
                                value={ammo.description}
                                onChange={handleChange}
                                placeholder='Colocar "Munición" y otros detalles que no se hayan indicado anteriormente como el modelo...'
                            />
                        </FormControl>
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrar
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
    )
}

export default AmmoRegistrationForm;