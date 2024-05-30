import React from 'react';
import Dialog from '@mui/material/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { supplierActions } from '../store/supplierSlice';

const FormDialog = ({ submitHandler, children }) => {
    const dispatch = useDispatch();
    const showDialog = useSelector(state => state.supplier.dialogOpen);

    const toggleDialogWindow = () => () => {
        
    };

    return (
        <>
        <Dialog
            open={showDialog}
            onClose={() => dispatch(supplierActions.toggleDialog())}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    dispatch(supplierActions.toggleDialog());
                    submitHandler();
                },
            }}
        >
            {children}
        </Dialog>
        </>
    );
}

export default FormDialog;
