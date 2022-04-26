import { SxProps } from '@mui/material';
import { ReactElement } from 'react';

export type GuardProps = {
    children: ReactElement | null;
};

export interface AuthWrapperProps {
    sx?: SxProps;
    children: ReactElement | null;
}
