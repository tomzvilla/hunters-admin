import React from 'react'
import { useState } from 'react';
import { axiosPrivate } from '../../api/api';
import { Box, Button, TextField } from '@mui/material'
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const CaliberRegistrationForm = (props) => {
    const [caliber, setCaliber] = useState('');
    const [error, setError] = useState({
        show: false,
        message: ''
    });

    const queryClient = useQueryClient();

    const handleCaliberChange = (event) => {
        setCaliber(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(caliber === '') {
            setError({
                show: true,
                message: 'El campo no puede estar vacío'
            });
        } else {
            setError({
                show: false,
                message: ''
            });
        }

        try {
            const response = await axiosPrivate.post('/v1/caliber', {
                size: caliber,
            });
            queryClient.invalidateQueries(['caliber']);
            if(response.status === 200) {
                await Swal.fire({
                    title: 'Calibre insertado con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                    target: document.getElementById('modal'),
                });
                setCaliber('');
                props.handleCancel();
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
                        target: document.getElementById('modal'),
                    });
                    break;
                case 403:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'No estás autorizado para ingresar',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                        target: document.getElementById('modal'),
                    });
                    break;
                case 409:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'El calibre ingresado ya existe',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                        target: document.getElementById('modal'),
                    });
                    break;
                default:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'El servidor no responde',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                        target: document.getElementById('modal'),
                    });
                    break;
            }
        }
    }

    return (
            <Box sx={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, minWidth: 350 }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="caliber"
                        label="Nombre del calibre"
                        name="caliber"
                        autoComplete="off"
                        error={error.show}
                        helperText={error.message}
                        autoFocus
                        value={caliber}
                        onChange={handleCaliberChange}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button
                            type="button"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={props.handleCancel}
                        >
                            Cancelar
                        </Button>
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
            </Box>
    )
}

export default CaliberRegistrationForm;