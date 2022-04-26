import { createContext, ReactElement } from 'react';
import { AuthState, LoginProps } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { userCredentials } from '../store/constants';
import { setAccountState } from 'store/slices/authSlice';
import { addUserToLS } from '../utils/functions';
import { RootState } from '../store';

const initialState: AuthState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const AuthContext = createContext({
    ...initialState,
    login: (values: LoginProps) => {}
    // logout: () => {},
    // checkAuthentication: async () => {}
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state: RootState) => state.account);

    const login = ({ remember, email, password }: LoginProps) => {
        setTimeout(() => {
            if (email === userCredentials.email && password === userCredentials.password) {
                dispatch(setAccountState(email));
                if (remember) {
                    addUserToLS(email);
                }
            }
        }, 500);
    };

    return <AuthContext.Provider value={{ ...authState, login }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
