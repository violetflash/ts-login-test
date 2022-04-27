import { SxProps } from '@mui/material';
import React, { ReactElement } from 'react';
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
    searchTerm: string;
}

export interface LoginProps {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
    remember: boolean;
}

export interface ConfirmDialogData {
    onConfirm?: () => void;
    onClose?: () => void;
    text: React.ReactNode;
    confirmText?: string;
}

export interface ConfirmDialogProps {
    isOpened: boolean;
    confirmData: ConfirmDialogData;
}
