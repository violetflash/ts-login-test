import { createContext, ReactElement, useEffect } from 'react';
import { AuthState, LoginProps } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { LS_ACCOUNT_KEY, userCredentials } from '../store/constants';
import { clearAccountState, setAccountState } from 'store/slices/authSlice';
import { addAccountToLS, deleteDataFromLS, getDataFromLS } from '../utils/functions';
import { RootState } from '../store';

const initialState: AuthState = {
    isLoggedIn: false,
    user: null
};

const AuthContext = createContext({
    ...initialState,
    login: async (values: LoginProps) => {},
    logout: () => {},
    checkAuthentication: () => {}
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
    const dispatch = useAppDispatch();
    const authState = useAppSelector((state: RootState) => state.account);

    const login = ({ remember, email, password }: LoginProps): Promise<void> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (email === userCredentials.email && password === userCredentials.password) {
                    dispatch(setAccountState(email));
                    if (remember) {
                        addAccountToLS(email);
                    }
                    resolve();
                } else {
                    reject();
                }
            }, 1000);
        });
    };

    const logout = () => {
        dispatch(clearAccountState());
        deleteDataFromLS(LS_ACCOUNT_KEY);
    };

    const checkAuthentication = async (): Promise<void> => {
        const email = getDataFromLS(LS_ACCOUNT_KEY);
        if (email) {
            const rawEmail = email.replace(/"/g, '');
            dispatch(setAccountState(rawEmail));
        }
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    return <AuthContext.Provider value={{ ...authState, login, logout, checkAuthentication }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
