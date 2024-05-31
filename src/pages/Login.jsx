import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Avatar, Typography, Container, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from '../api/axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import { useNavigate, useLocation } from 'react-router';
import Swal from 'sweetalert2';

const Login = () => {
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleuserNameChange = (event) => {
        setuserName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('/v1/auth/login', {
                userName,
                password,
            }, { withCredentials: true })
            if(res.status === 200) {
                dispatch(authActions.setUser(res.data));
                // save refresh expiration in local storage
                localStorage.setItem("refreshExpiresIn", res.data.refreshExpiresIn);
                navigate(from, { replace: true })
            }
        } catch (err) {
            //TODO error handling
            console.log(err);
            const status = err.code ?? err.response.code;
            switch(status) {
                case 400:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'Los campos ingresados no son correctos',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                case 401:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'El usuario o la contraseña son incorrectos',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                case 403:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'No estás autorizado para ingresar',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
                default:
                    Swal.fire({
                        title: 'Oops! Hubo un error',
                        text: 'El servidor no responde',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    });
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={6} sx={{ padding: 2, marginTop: 8 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="userName"
                            label="Nombre de Usuario"
                            name="userName"
                            autoComplete="off"
                            autoFocus
                            value={userName}
                            onChange={handleuserNameChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Contraseña"
                            type="password"
                            id="password"
                            autoComplete="off"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;
