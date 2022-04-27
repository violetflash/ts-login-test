import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { apiService } from '../services/usersService';
import { usersSlice } from './slices/usersSlice';

export const appReducer = combineReducers({
    account: authSlice.reducer,
    users: usersSlice.reducer,
    [apiService.reducerPath]: apiService.reducer
});

export const store = configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
