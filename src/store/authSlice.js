import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    auth: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            state.auth = Object.keys(state.user).length > 0;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice;