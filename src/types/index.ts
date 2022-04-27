import { SxProps } from '@mui/material';
import { ReactElement } from 'react';
import { IUser } from '../models/IUser';

export type GuardProps = {
    children: ReactElement | null;
};

export interface AuthWrapperProps {
    sx?: SxProps;
    children: ReactElement | null;
}

export interface AuthState {
    isLoggedIn: boolean;
    isInitialized: boolean;
    user: IUser | null;
}

export interface LoginProps {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
    remember: boolean;
}
