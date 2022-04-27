import { SxProps } from '@mui/material';
import { ReactElement } from 'react';
import { IAccountUser } from '../models/IAccountUser';
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
    user: IAccountUser | null;
}

export interface UsersState {
    users: IUser[];
}

export interface LoginProps {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
    remember: boolean;
}
