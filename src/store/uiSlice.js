import { createSlice } from "@reduxjs/toolkit";

// const getViewportWidth = () => window.innerWidth;

const initialState = {
    sidebar: false,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        showSidebar(state) {
            state.sidebar = !state.sidebar
        },
    }
})

export const uiActions = uiSlice.actions

export default uiSlice