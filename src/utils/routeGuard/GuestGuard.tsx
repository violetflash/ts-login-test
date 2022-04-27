import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import { GuardProps } from 'types';
import useAuth from '../../hooks/useAuth';

const GuestGuard: FC<GuardProps> = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/users', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
