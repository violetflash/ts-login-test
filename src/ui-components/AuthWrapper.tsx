import { Stack } from '@mui/material';
import { FC } from 'react';
import { AuthWrapperProps } from '../types';

const AuthWrapper: FC<AuthWrapperProps> = ({ children, sx }) => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 8, p: 2, maxWidth: { tablet: '400px', mobile: '100%' }, mx: 'auto', ...sx }}
        >
            {children}
        </Stack>
    );
};

export default AuthWrapper;
