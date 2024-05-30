import { configureStore } from "@reduxjs/toolkit";

//slices
import uiSlice from './uiSlice'
import supplierSlice from './supplierSlice'

const store = configureStore({
    reducer: { 
        ui: uiSlice.reducer,
        supplier: supplierSlice.reducer,
    }
})

export default store