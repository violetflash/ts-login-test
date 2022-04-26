import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';

export const appReducer = combineReducers({
    account: authSlice.reducer
});

export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
