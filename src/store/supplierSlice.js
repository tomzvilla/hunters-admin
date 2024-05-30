import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    dialogOpen: false,
    selectedSupplier: {},
}

const supplierSlice = createSlice({
    name: 'supplier',
    initialState: initialState,
    reducers: {
        toggleDialog(state) {
            state.dialogOpen = !state.dialogOpen;
        },
        setSelectedSupplier(state, action) {
            state.selectedSupplier = action.payload;
        },
    }
})

export const supplierActions = supplierSlice.actions

export default supplierSlice;