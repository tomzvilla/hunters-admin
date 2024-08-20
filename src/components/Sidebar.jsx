import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';
import HomeIcon from '@mui/icons-material/Home';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AddBoxIcon from '@mui/icons-material/AddBox';
const drawerWidth = 300;

const list = [
    { text: 'Inicio', to: '/', icon: HomeIcon },
    { text: 'Listado Municiones', to: '/ammoList', icon: AttachMoneyIcon },
    { text: 'Proveedores', to: '/supplierList', icon: HomeWorkIcon },
    { text: 'Marcas', to: '/brandList', icon: AddBoxIcon },
    { text: 'Calibres', to: '/caliberList', icon: AddBoxIcon },
    { text: 'Tipos Municiones', to: '/ammoTypeList', icon: AddBoxIcon },
    { text: 'Municiones', to: '/createAmmo', icon: AddBoxIcon },
];

const Sidebar = () => {
    const dispatch = useDispatch();
    const showNavbarMenu = useSelector(state => state.ui.sidebar);

    const toggleDrawer = () => () => {
        dispatch(uiActions.showSidebar())
    };

    const DrawerList = (
        <Box sx={{ overflow: 'auto' }} onClick={toggleDrawer()}>
            <List>
                {list.map((item, index) => (
                    <Link to={item.to} key={item.text}>
                        <ListItem  disablePadding>
                            <ListItemButton>
                            <ListItemIcon>
                                <item.icon />
                            </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
        </Box>
    );
    return (
        <div>
            <Drawer 
            open={showNavbarMenu} 
            onClose={toggleDrawer()} 
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: '4rem' },
            }}
            >
                {DrawerList}
            </Drawer>
        </div>
    )
}

export default Sidebar