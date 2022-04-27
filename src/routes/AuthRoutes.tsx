import { Outlet } from 'react-router-dom';
import NavMotion from '../ui-components/animations/NavMotion';
import GuestGuard from '../utils/routeGuard/GuestGuard';
import Login from '../views/Login';
import ForgotPassword from '../views/ForgotPassword';

const AuthRoutes = [
    {
        path: 'login',
        element: (
            <>
                <Outlet />
            </>
        ),
        children: [
            {
                path: '/login',
                element: (
                    <NavMotion>
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    </NavMotion>
                )
            }
        ]
    },
    {
        path: 'forgot-password',
        element: (
            <>
                <Outlet />
            </>
        ),
        children: [
            {
                path: '/forgot-password',
                element: (
                    <NavMotion>
                        <GuestGuard>
                            <ForgotPassword />
                        </GuestGuard>
                    </NavMotion>
                )
            }
        ]
    }
];

export default AuthRoutes;
