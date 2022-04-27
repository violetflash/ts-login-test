import { useNavigate } from 'react-router-dom';
import { FC, useEffect } from 'react';
import { GuardProps } from 'types';
import useAuth from '../../hooks/useAuth';

export const AuthGuard: FC<GuardProps> = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    });

    return children;
};
