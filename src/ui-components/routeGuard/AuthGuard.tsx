import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { GuardProps } from 'types';

export const AuthGuard: FC<GuardProps> = ({ children }) => {
    const navigate = useNavigate();
    const isLoggedIn = false;

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    });

    return children;
};
