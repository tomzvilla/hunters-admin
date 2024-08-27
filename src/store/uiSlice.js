import { createSlice } from "@reduxjs/toolkit";

// const getViewportWidth = () => window.innerWidth;

const initialState = {
    sidebar: false,
    defaultPageSize: 20,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showSidebar(state) {
            state.sidebar = !state.sidebar
        },
        setDefaultPageSize(state, action) {
            state.defaultPageSize = action.payload;
        },
    }
})

export const uiActions = uiSlice.actions

export default uiSlice