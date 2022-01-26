import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isAuthReady: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthReady = true;
            state.currentUser = action.payload;
        },
        logout(state) {
            state.currentUser = null;
        },
    },
});

const { actions, reducer } = authSlice;

export const { login, logout } = actions;

export default reducer;
