import React from 'react'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/uiSlice';

const drawerWidth = 300;

const Sidebar = () => {
    const dispatch = useDispatch();
    const showNavbarMenu = useSelector(state => state.ui.sidebar);

    const toggleDrawer = () => () => {
        dispatch(uiActions.showSidebar())
    };

    const DrawerList = (
        <Box sx={{ overflow: 'auto' }} onClick={toggleDrawer()}>
            <List>
                {['Inicio', 'Listado Municiones'].map((text, index) => (
                <ListItem key={text} disablePadding>
                    <ListItemButton>
                    <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <Link to='/ammoList'>
                        <ListItemText primary={text} />
                    </Link>
                    </ListItemButton>
                </ListItem>
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