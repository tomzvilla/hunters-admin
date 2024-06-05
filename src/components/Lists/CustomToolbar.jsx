import React from 'react';
import { GridToolbarContainer } from '@mui/x-data-grid';
import { IconButton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const CustomToolbar = ({ title, onButtonClick }) => {
  return (
    <GridToolbarContainer>
      <Typography variant="h6" component="div" sx={{ flex: 1, m: 2 }}>
        {title}
      </Typography>
      <IconButton onClick={onButtonClick} color="primary" sx={{ m: 2 }}>
        <AddCircleOutlineIcon  sx={{ fontSize: '35px' }}/>
      </IconButton>
    </GridToolbarContainer>
  );
};

export default CustomToolbar;