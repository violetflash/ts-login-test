import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.username = action.payload['username'];
        },
        logout: () => initialState
    }
})

export const { login, logout } = userSlice.actions;