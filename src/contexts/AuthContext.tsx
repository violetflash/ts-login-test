import { createContext, ReactElement } from 'react';
import { AuthState, LoginPayload } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { userCredentials } from '../store/constants';
import { setAccountState } from 'store/slices/authSlice';
import { addUserToLS } from '../utils/functions';

const initialState: AuthState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const AuthContext = createContext({
    ...initialState,
    login: async () => {},
    logout: () => {},
    checkAuthentication: async () => {}
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state) => state.account);

    const login = ({ remember, email, password }: LoginPayload) => {
        new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === userCredentials.email && password === userCredentials.password) {
                    dispatch(setAccountState(email))
                    if (remember) {
                        addUserToLS(email);
                    }
                    resolve({ email, password });
                } else {
                    reject();
                }
            }, 500)
        }
    }

    return <AuthContext.Provider value={{ ...authState, login, logout, checkAuthentication }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
