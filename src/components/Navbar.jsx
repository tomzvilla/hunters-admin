import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import { logout } from '../api/api';
const Navbar = () => {
    const dispatch = useDispatch()
    const toggleDrawer = () => () => {
        dispatch(uiActions.showSidebar())
    };
    const auth = useSelector(state => state.auth.auth)
    
    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={toggleDrawer()}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hunter's Gallery
                </Typography>
                {auth && <Button onClick={() => logout()} color="inherit">Salir</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Navbar;