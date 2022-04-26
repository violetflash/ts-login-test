import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import { GuardProps } from 'types';

const GuestGuard: FC<GuardProps> = ({ children }) => {
    const isLoggedIn = false;
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/', { replace: true });
        }
    }, [isLoggedIn, navigate]);

    return children;
};

export default GuestGuard;
