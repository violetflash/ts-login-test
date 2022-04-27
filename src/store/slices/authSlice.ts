import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '../../types';

const initialState: AuthState = {
    isLoggedIn: false,
    user: null
};

export const authSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountState: (state: AuthState, action: PayloadAction<string>) => {
            state.user = { email: action.payload };
            state.isLoggedIn = true;
        },
        clearAccountState: () => initialState
    }
});

export const { setAccountState, clearAccountState } = authSlice.actions;
