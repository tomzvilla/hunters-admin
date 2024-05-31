import { configureStore } from "@reduxjs/toolkit";

//slices
import uiSlice from './uiSlice'
import supplierSlice from './supplierSlice'
import authSlice from './authSlice'

const store = configureStore({
    reducer: { 
        ui: uiSlice.reducer,
        supplier: supplierSlice.reducer,
        auth: authSlice.reducer,
    }
})

export default store