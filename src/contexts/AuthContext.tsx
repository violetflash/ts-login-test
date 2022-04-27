import { createContext, ReactElement, useEffect } from 'react';
import { AuthState, LoginProps } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { userCredentials } from '../store/constants';
import { clearAccountState, setAccountState } from 'store/slices/authSlice';
import { addUserToLS, getUserFromLS } from '../utils/functions';
import { RootState } from '../store';

const initialState: AuthState = {
    isLoggedIn: false,
    isInitialized: false,
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
                console.log('here!');
                if (email === userCredentials.email && password === userCredentials.password) {
                    dispatch(setAccountState(email));
                    if (remember) {
                        addUserToLS(email);
                    }
                    resolve();
                } else {
                    console.log('error case!');
                    reject();
                }
            }, 1000);
        });
    };

    const logout = () => {
        dispatch(clearAccountState());
    };

    const checkAuthentication = async (): Promise<void> => {
        const email = getUserFromLS();
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
